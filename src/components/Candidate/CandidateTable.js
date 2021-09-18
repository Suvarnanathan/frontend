import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Dropdown } from "react-bootstrap";
import ModalPdfData from "../Modals/ModalPdf";
import CandidateRow from "./CandidateRow";
import { useRouter } from 'next/router'
import { useDispatch } from "react-redux";
import { getRecipientsId } from "../../redux/actions/mailAction";

export default function CandidateTable({ candidates }) {
  const router = useRouter()
  const dispatch = useDispatch();
  const [mainSelect, changeMainSelect] = useState(false)
  const [isShowBtn,setShowBtn] =useState(false)

  const [selectCandidates, setSelectCandidates] = useState([])

  const showBtn =()=>{
      if(selectCandidates.length>0){
        setShowBtn(true)
      }else{
        setShowBtn(false)
      }
  }

  const changeSelectCandidates = (status, candidateId) => {
    if (status) {
      setSelectCandidates([...selectCandidates, candidateId])
    }
    else {
      if (selectCandidates.includes(candidateId)) {
        let checkedArr = selectCandidates
        const index = checkedArr.indexOf(candidateId);
        if (index > -1) {
          checkedArr.splice(index, 1);
          setSelectCandidates(checkedArr)
        }
      }
    }
  }

  const [isPdfVisible, SetPdfVisible] = useState(false);
  const togglePdfModal = () => {
    SetPdfVisible(!isPdfVisible);
  };

  const handleOnclick = () => {
    dispatch(getRecipientsId(selectCandidates));
    router.push("/dashboard-applicants/mail");
  }

  return (
    <>
      <ModalPdfData
        isPdfVisible={isPdfVisible}
        togglePdfModal={togglePdfModal}
        selectCandidates={selectCandidates}
      />
      <div className="bg-white shadow-8 pt-7 rounded pb-8 px-11">
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="  border-0 font-size-4 font-weight-normal"
                >
                  {selectCandidates.length>0 && (
                    <Dropdown as={ButtonGroup} >
                      <Dropdown.Toggle style={{ minWidth: "20px", height: "20px" }} split variant="blue" id="dropdown-split-basic" />
                      <Dropdown.Menu size="sm" className="p-2" >
                          <Button split variant="blue"  onClick={handleOnclick} className="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 text-uppercase">
                            Send Resume
                      </Button >
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </th>
                <th
                  scope="col"
                  className="  border-0 font-size-4 font-weight-normal"
                >
                  Full Name
              </th>
                <th
                  scope="col"
                  className="border-0 font-size-4 font-weight-normal"
                >
                  Mail
              </th>
                <th
                  scope="col"
                  className="border-0 font-size-4 font-weight-normal"
                >
                  Created At
              </th>
                <th
                  scope="col"
                  className="border-0 font-size-4 font-weight-normal"
                ></th>
                <th
                  scope="col"
                  className="border-0 font-size-4 font-weight-normal"
                ></th>
                <th
                  scope="col"
                  className="border-0 font-size-4 font-weight-normal"
                ></th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <CandidateRow key={candidate.id} candidate={candidate} changeSelectCandidates={changeSelectCandidates} selectCandidates={selectCandidates} mainSelect={mainSelect} showBtn={showBtn}/>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pt-2">
          <nav aria-label="Page navigation example">
          </nav>
        </div>
      </div>
    </>
  );
}
