import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEducationSuccess } from "../../redux/actions/educationAction";
import { getUserEducation } from "../../utils/api";
import { ERROR_STATUS } from "../../utils/constants";
import ModalEducation from "../Modals/ModalEducation";

const Education = ({ pdfHide }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { userId } = router.query;

  const educationRedux = useSelector(state => state.education)

  const [userEducations, setUserEducation] = useState([]);
  const [educationModalVisible, seteducationModalVisible] = useState(false);
  const [educationEditObj, setEducationEditObj] = useState([]);
  const [actionName, setActionName] = useState("");

  const viewEducationModal = () => {
    seteducationModalVisible(!educationModalVisible);
  };

  const getEducations = () => {
    userId && getUserEducation(userId).then((data) => { dispatch(fetchEducationSuccess(data)); setUserEducation(data) }).catch(err => {
      dispatch(fetchEducationFail(err))
      localStorage.getItem(ERROR_STATUS) === 500 &&
        router.push(`/${localStorage.getItem(ERROR_STATUS)}`);
    });;
  };

  useEffect(() => {
    getEducations();
  }, [userId]);

  return (
    <>
      <ModalEducation
        educationModalVisible={educationModalVisible}
        viewEducationModal={viewEducationModal}
        // getUserEducation={getUserEducations}
        userId={userId}
        educationEditObj={educationEditObj}
        actionName={actionName}
        getEducations={getEducations}
      />
      <div className={pdfHide == 0 ? ("p-5 pl-xs-12 pt-7 pb-3") : ("border-top p-5 pl-xs-12 pt-7 pb-5")}>
        <h4 className={pdfHide == 0 ? ("font-size-6 mb-0 mt-0 text-black-2 font-weight-semibold") : ("font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold")}>
          Education
          {pdfHide == 1 &&
            <a
              className="text-smoke modal-a-hover circle-32 bg-concrete hover-bg-blue mr-11 font-size-4"
              style={{ float: "right" }}
              onClick={(e) => {
                e.preventDefault();
                setActionName("Add");
                setEducationEditObj({});
                viewEducationModal();
              }}
            >
              <i className="fa fa-plus fa-sm"></i>
            </a>}
        </h4>
        <div className="w-100 ">
          {userEducations?.map((userEducation) => (
            <div
              className={pdfHide == 0 ? ("d-flex align-items-center pr-11 mb-5 flex-wrap flex-sm-nowrap") : ("d-flex align-items-center pr-11 mb-9 flex-wrap flex-sm-nowrap")}
              key={userEducation.id}
            >
              <div className="w-100">
                {pdfHide == 1 &&
                  <a
                    className="text-smoke circle-32 bg-concrete hover-bg-blue font-size-4"
                    style={{ float: "right" }}
                    onClick={(e) => {
                      e.preventDefault();
                      setActionName("Edit");
                      viewEducationModal();
                      setEducationEditObj(userEducation);
                    }}
                  >
                    <i className="fa fa-pen fa-sm"></i>
                  </a>}
                <div className="font-size-5 text-black-2 font-weight-semibold">
                  {userEducation.school}
                </div>
                <div className="font-size-4 text-gray">
                  {userEducation.courseName}, {userEducation.grade}
                </div>
                <div className="font-size-4 text-gray mr-5">
                  {userEducation.convertStartDate} -{" "}
                  {userEducation.isCurrentlyStudy
                    ? "Present"
                    : userEducation.convertEndDate}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Education;
