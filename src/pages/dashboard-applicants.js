import React, { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import CandidateTable from "../components/Candidate/CandidateTable";
import ModalRegister from "../components/Modals/ModalRegister";
import { getUsersByRole, searchCandidate } from "../utils/api";
import { CANDIDATE, ERROR_STATUS } from "../utils/constants";
import { useRouter } from "next/router";

const DashboardApplicants = () => {
  const router=useRouter()
  const [candidates, setCandidates] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [searchName, setSearchName] = useState({ userSearch: "" });

  const getApplicants = () => {
    getUsersByRole(CANDIDATE)
      .then((data) => setCandidates(data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getApplicants();
  }, []);

  useEffect(() => {
    searchName?.userSearch && handleSeach(searchName);
  }, [searchName]);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const handleOnChange = (e) => {
    setSearchName({ userSearch: e.target.value });
  };

  const handleSeach = async (searchString) => {
    // e.preventDefault();
    searchCandidate(searchString)
      .then((res) => {
        const arr=res.data.results.filter(db=>db.role.name==="Candidate")
        setSearchData(arr);
      })
      .catch((err) => {
          localStorage.getItem(ERROR_STATUS) != 400 &&
          router.push(`/${localStorage.getItem(ERROR_STATUS)}`);
        });
  };

  return (
    <>
      <ModalRegister
        isVisible={isVisible}
        toggleModal={toggleModal}
        getApplicants={getApplicants}
      />
      <PageWrapper
        headerConfig={{
          button: "profile",
          isFluid: true,
          bgClass: "bg-default",
          reveal: false,
        }}
      >
        <div
          className="dashboard-main-container "
          style={{ minHeight: "100vh" }}
        >
          <div className="container">
            <div className="row mb-11 pt-20 align-items-center">
              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 mb-lg-0 mb-4">
                <h3 className="font-size-6 mb-0">
                  Applicants List [{candidates.length}]
                </h3>
              </div>
              <div className="col-lg-5 col-md-4 col-sm-5 col-xs-4 mb-lg-0 mt-5">
                <input
                  type="text"
                  className="form-control search-user"
                  placeholder="Search..."
                  name="searchName"
                  value={searchName?.userSearch}
                  onChange={handleOnChange}
                />
              </div>
              <div className="col-lg-3 col-md-4 col-sm-3 col-xs-4 mb-lg-0 mt-5">
                <a
                  className="btn text-smoke bg-concrete hover-bg-green mr-11 font-size-4"
                  style={{ float: "right" }}
                  onClick={() => toggleModal()}
                >
                  <span className="mr-5 d-inline-block">+</span>Add New
                </a>
              </div>
            </div>
            <CandidateTable
              candidates={searchName?.userSearch ? searchData : candidates}
            />
          </div>
        </div>
      </PageWrapper>
    </>
  );
};
export default DashboardApplicants;
