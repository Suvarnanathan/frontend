import React, { useContext, useEffect, useState } from "react";
import { Tab } from "react-bootstrap";
import Link from "next/link";
import PageWrapper from "../../../components/PageWrapper";
import ProfileSidebar from "../../../components/ProfileSidebar";
import Skill from "../../../components/CandidateProfile/Skill";
import WorkExperience from "../../../components/CandidateProfile/WorkExperience";
import CertificatesAndLicense from "../../../components/CandidateProfile/CertificatesAndLicense";
import Education from "../../../components/CandidateProfile/Education";
import {
  getCountries,
  getJobSubCategories,
  getPersonalInfo,
  getSkills,
} from "../../../utils/api";
import { useRouter } from "next/router";
import ModalAboutData from "../../../components/Modals/ModalAbout";
import Loading from "../../../assets/image/loading.gif";
import GlobalContext from "../../../context/GlobalContext";
import { AUTH_USER, ERROR_STATUS } from "../../../utils/constants";
import License from "../../../components/CandidateProfile/License";
import { profileSucess } from "../../../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";

const ApplicantResume = ({ isProfile }) => {
  const dispatch =useDispatch()
  const router = useRouter();
  const authuserId = useSelector(state=>state.auth.authUser?.userId)
  const [countries, setCountries] = useState([]);
  const [jobSubCategories, setJobSubCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [personalInfo, setPersonalInfo] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const actionName = personalInfo?.about ? "Edit" : "Add";
  const gContext = useContext(GlobalContext);
  const [loader, setLoader] = useState(false);
  let userId;

  const Loader = () => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <img src={Loading} style={{ width: 72, height: 72 }} />
      </div>
    );
  };

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const setUserId = () => {
    if (isProfile) {
      userId = authuserId;
    } else {
      userId = router.query.userId;
    }
  };
  setUserId();
  useEffect(() => {
    getCountries()
      .then((res) => setCountries(res))
      .catch((err) => {
          localStorage.getItem(ERROR_STATUS) != 400 &&
          router.push(`/${localStorage.getItem(ERROR_STATUS)}`);
        });
    getJobSubCategories()
      .then((res) => setJobSubCategories(res))
      .catch((err) => {
          localStorage.getItem(ERROR_STATUS) != 400 &&
          router.push(`/${localStorage.getItem(ERROR_STATUS)}`);
        });
    getSkills()
      .then((res) => setSkills(res))
      .catch((err) => {
          localStorage.getItem(ERROR_STATUS) != 400 &&
          router.push(`/${localStorage.getItem(ERROR_STATUS)}`);
        });
  }, []);
  const getPersonalInfoData = () => {
    userId &&
      getPersonalInfo(userId)
        .then((data) => {
          isProfile && dispatch(profileSucess(data))
          setPersonalInfo(data)})
        .catch((err) => {
          localStorage.getItem(ERROR_STATUS) != 400 &&
          router.push(`/${localStorage.getItem(ERROR_STATUS)}`);
        });
  };
  useEffect(() => {
    getPersonalInfoData();
  }, [userId]);
  useEffect(() => {
    setTimeout(function () {
      setLoader(false);
    }, 3000);
  }, []);
  const pdfHide = true;
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <ModalAboutData
            isVisible={isVisible}
            toggleModal={toggleModal}
            personalData={personalInfo}
            actionName={actionName}
            getPersonalInfoData={getPersonalInfoData}
          />

          <PageWrapper
        headerConfig={{
          button: "profile",
          isFluid: true,
          bgClass: "bg-default",
          reveal: false,
        }}
      >
          <div className="dashboard-main-container">
          <div className="container" style={{backgroundColor:'#f4f5f8',minHeight: "100vh"}}>
                {/* <!-- back Button --> */}
                {/* <div className="row justify-content-center">
                  <div className="col-12 dark-mode-texts">
                    <div className="mb-9 mt-15">
                      <Link href="/dashboard-applicants">
                        <a className="d-flex align-items-center ml-4 pt-15">
                          <i className="icon icon-small-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
                          <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                            Back
                          </span>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div> */}
                {/* <!-- back Button End --> */}
                {isProfile ? (
                  <div className="row justify-content-center mt-2 pt-18">
                    <div className="col-xxl-6 mb-lg-10">
                      <ProfileSidebar
                        personalInfo={personalInfo}
                        getPersonalInfoData={getPersonalInfoData}
                        countries={countries}
                        userId={userId}
                        pdfHide={pdfHide}
                        isProfile={isProfile}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="row justify-content-center mt-2 pt-20">
                    <div className="col-9 col-xxl-9 col-lg-9 col-md-9 order-1">
                      <ProfileSidebar
                        personalInfo={personalInfo}
                        getPersonalInfoData={getPersonalInfoData}
                        countries={countries}
                        userId={userId}
                        pdfHide={pdfHide}
                      />
                    </div>
                    <div className="col-9 col-xxl-9 col-lg-9 col-md-9 order-1">
                      <Tab.Container
                        id="left-tabs-example"
                        defaultActiveKey="one"
                      >
                        <div className="bg-white rounded-4 shadow-9">
                          <Tab.Content>
                            <Tab.Pane eventKey="one">
                              <div className="border-top p-5 pl-xs-12 pt-7 pb-5">
                                <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">
                                  About
                                  <a
                                    onClick={toggleModal}
                                    className="text-smoke circle-32 bg-concrete hover-bg-blue font-size-4 mr-11"
                                    style={{ float: "right" }}
                                  >
                                    {personalInfo.about ? (
                                      <i className="fa fa-pen fa-sm"></i>
                                    ) : (
                                      <i className="fa fa-plus fa-sm"></i>
                                    )}
                                  </a>
                                </h4>
                                <p className="font-size-4 mb-8">
                                  {personalInfo.about}
                                </p>
                              </div>
                              <Skill skills={skills} userId={userId} />
                              <WorkExperience
                                jobSubCategories={jobSubCategories}
                                countries={countries}
                                userId={userId}
                                pdfHide={pdfHide}
                              />
                              <Education pdfHide={pdfHide} />
                              <CertificatesAndLicense pdfHide={pdfHide} />
                              <License pdfHide={pdfHide} />
                            </Tab.Pane>
                          </Tab.Content>
                        </div>
                      </Tab.Container>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </PageWrapper>
        </>
      )}
    </>
  );
};
export default ApplicantResume;
