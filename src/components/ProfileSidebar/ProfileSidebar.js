import React, { useEffect, useState } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import imgP from "../../assets/image/l3/png/profile.png";
import ModalpersonalData from "../Modals/ModalPersonalInfo";
import ModalProfile from "../Modals/ModalProfile";
import { getUserSkill } from "../../utils/api";
import { useRouter } from "next/router";
import ModalChangePassword from "../Modals/ModalChangePassword";
import PersonalInfo from "./PersonalInfo";
import ModalViewPersonalInfo from "../Modals/ModalViewPersonalInfo";

const Sidebar = ({
  props,
  personalInfo,
  getPersonalInfoData,
  countries,
  pdfHide,
  skills,
  userId,
  isProfile,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [isVisibleView, setIsVisibleView] = useState(false);

  const toggleViewModal = () => {
    setIsVisibleView(!isVisibleView);
  };

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const togglePasswordModal = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleCreateProfileModal = () => {
    setIsShown(!isShown);
  };

  const [userSkills, setUserSkills] = useState([]);

  const getUserSkills = () => {
    userId && getUserSkill(userId).then((data) => setUserSkills(data));
  };

  useEffect(() => {
    pdfHide && getUserSkills();
  }, [userId]);

  return (
    <>
      <ModalProfile
        isShown={isShown}
        toggleCreateProfileModal={toggleCreateProfileModal}
        userId={personalInfo.userId}
        personalInfo={personalInfo}
        getPersonalInfoData={getPersonalInfoData}
      />
      {!isProfile && (
        <ModalViewPersonalInfo
          isVisible={isVisibleView}
          toggleModal={toggleViewModal}
          personalInfo={personalInfo}
          pdfHide={pdfHide}
          isProfile={isProfile}
        />
      )}
      <div {...props}>
        <div>
          <div
            className="shadow-9 rounded-4"
            style={{ backgroundColor: !pdfHide ? "#535559" : "" }}
          >
            {isProfile && personalInfo?.userId && (
              <a
                onClick={togglePasswordModal}
                className="btn text-white font-size-2 hover-bg-blue"
                style={{ float: "right" }}
              >
                Change password
              </a>
            )}
            <div className="px-10 py-13 text-center border-bottom border-mercury" style={{backgroundColor:'#b0cad0',borderTopLeftRadius:10,borderTopRightRadius:10}}>
              <a
                className="mb-4"
                onClick={toggleCreateProfileModal}
                style={{ float: "left" }}
              >
                <img
                  className=""
                  style={{ width: 120, height: 120, borderRadius: "50%",cursor:'pointer' }}
                  src={
                    personalInfo.profileImage ? personalInfo.profileImage : imgP
                  }
                  alt=""
                />
              </a>
            </div>
            <>
              <ModalpersonalData
                isVisible={isVisible}
                toggleModal={toggleModal}
                personalData={personalInfo}
                getPersonalInfoData={getPersonalInfoData}
                countries={countries}
              />
              {isProfile && (
                <ModalChangePassword
                  isVisible={isPasswordVisible}
                  toggleModal={togglePasswordModal}
                  mailAddress={personalInfo.email}
                />
              )}
              <div className="px-9 pt-lg-5 pt-9 pt-xl-9 pb-5">
                <h4
                  className={
                    !pdfHide
                      ? "text-white font-size-6 "
                      : "text-black-2 font-size-6 "
                  }
                >
                  <div className="mb-0">
                    <a
                      className={
                        !pdfHide
                          ? "text-white font-size-6 "
                          : "text-black-2 font-size-6 "
                      }
                    >
                      {personalInfo?.firstName} {personalInfo?.lastName} 
                      {!isProfile &&personalInfo?.userId && (
                    <span className="btn" style={{minWidth:80}} onClick={toggleViewModal}>
                    &nbsp;.&nbsp; View Info 
                    </span>
                  )}
                    </a>
                   {personalInfo?.userId && <a
              onClick={toggleModal}
              style={{ float: "right" }}
              className="text-smoke circle-32 bg-concrete hover-bg-blue font-size-4 mr-8"
            >
              <i className="fa fa-pen fa-sm"></i>
            </a>}
                  </div>
                  {/* {pdfHide==1 && 'Personal Info' } */}
                </h4>
              </div>
              {isProfile && (
                <PersonalInfo pdfHide={pdfHide} personalInfo={personalInfo} />
              )}
              {pdfHide == 0 && (
                <div className="border-top px-9 pt-lg-5 pt-9 pt-xl-9 pb-5 first-cap">
                  <h5 className="text-white mb-8 font-size-5">Skills</h5>
                  <div className="mb-7">
                    {userSkills.map((userSkill) => (
                      <p className="font-size-4 mb-0 text-white">
                        {userSkill.name}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  toggleModal: PropTypes.func,
};

export default Sidebar;
