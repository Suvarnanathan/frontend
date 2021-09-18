import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Modal, Button } from "react-bootstrap";
import {
  createUserEducation,
  updateUserEducation,
  deleteUserEducation,
} from "../../utils/api";
import { ERROR_STATUS } from "../../utils/constants";
import { useRouter } from "next/router";

const ModalStyled = styled(Modal)`
  /* &.modal {
z-index: 10050;
} */
`;

const ModalEducation = ({ educationModalVisible, educationEditObj, viewEducationModal, userId, actionName, getEducations, }) => {
  const router = useRouter();

  const initialState = {
    userId,
    courseName: "",
    school: "",
    grade: "",
    description: "",
    duration: 0,
    startDate: "",
    endDate: "",
    fieldOfStudy: "",
    isCurrentlyStudy: false,
    activityAndSociety: "",
  };
  const [educationDetails, setEducationDetails] = useState(initialState);

  const [error, setError] = useState({});

  const setState = () => {
    if (actionName === 'Add') {
      setEducationDetails(initialState);
    } else {
      setEducationDetails(educationEditObj);
    }
  };

  useEffect(() => {
    setState();
  }, [userId]);

  useEffect(() => {
    setState();
  }, [educationEditObj]);

  const handleOnchange = (e) => {
    if (e.target.name == "isCurrentlyStudy") {
      setEducationDetails({
        ...educationDetails,
        userId: parseInt(userId),
        [e.target.name]: e.target.checked,
      });
    } else {
      setEducationDetails({
        ...educationDetails,
        userId: parseInt(userId),
        [e.target.name]: e.target.value,
      });
    }
    if (educationDetails.isCurrentlyStudy == true) {
      educationDetails.endDate = null;
    }
  };

  const handleClose = () => {
    setError({});
    viewEducationModal();
  };

  const handleOnclick = async (e) => {
    e.preventDefault();
    if (actionName === "Add") {
      createUserEducation(educationDetails)
        .then((res) => {
          getEducations();
          setEducationDetails({});
          setError({});
          viewEducationModal();
        })
        .catch((err) => {
          localStorage.getItem(ERROR_STATUS) === 500 && router.push(`/${localStorage.getItem(ERROR_STATUS)}`)
          setError(err)
        });
    } else {
      updateUserEducation(educationDetails)
        .then((res) => {
          getEducations();
          viewEducationModal();
          setEducationDetails({});
          setError({});
        })
        .catch((err) => {
          localStorage.getItem(ERROR_STATUS) === 500 && router.push(`/${localStorage.getItem(ERROR_STATUS)}`)
          setError(err)
        });
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    deleteUserEducation(educationEditObj?.id)
      .then((res) => {
        getEducations();
        viewEducationModal();
        setEducationDetails({});
      })
      .catch((err) => {
        localStorage.getItem(ERROR_STATUS) === 500 && router.push(`/${localStorage.getItem(ERROR_STATUS)}`)
        setError(err)
      });
  };

  return (
    <ModalStyled
      // {...props}
      size="lg"
      centered
      show={educationModalVisible}
      onHide={viewEducationModal}
    >
      <Modal.Body className="p-0">
        <button
          type="button"
          className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
          onClick={handleClose}
        >
          <i className="fas fa-times"></i>
        </button>
        <div className=" pb-6 ">
          <div className="container">
            <div className="row justify-content-center mt-6">
              <div className="col-xxl-9 col-xl-7 col-lg-8">
                <h5 className="text-center ">{actionName} education</h5>
                <hr />
                <div className="bg-white ">
                  <form
                    name="education"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                  >
                    <input type="hidden" name="form-name" value="contact" />
                    <div className="row">
                      <div className="col-lg-12 mb-7">
                        <label
                          htmlFor="school"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          School <span>&nbsp;*</span>
                        </label>
                        <input
                          className="form-control"
                          id="school"
                          name="school"
                          placeholder="Enter School"
                          value={educationDetails?.school}
                          onChange={handleOnchange}
                          required
                        />
                        {error?.school && (
                          <span style={{ fontSize: 12, color: "red" }}>
                            {error?.school[0]}
                          </span>
                        )}
                      </div>

                      <div className="col-12 mb-7">
                        <label
                          htmlFor="courseName"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Course Name <span>&nbsp;*</span>
                        </label>
                        <input
                          className="form-control"
                          id="courseName"
                          name="courseName"
                          placeholder="Enter Course Name"
                          value={educationDetails?.courseName}
                          onChange={handleOnchange}
                          required
                        />
                        {error?.courseName && (
                          <span style={{ fontSize: 12, color: "red" }}>
                            {error?.courseName[0]}
                          </span>
                        )}
                      </div>
                      <div className="col-lg-12 mb-7">
                        <label
                          htmlFor="fieldOfStudy"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Field of Study <span>&nbsp;*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="fieldOfStudy"
                          name="fieldOfStudy"
                          placeholder="Enter Field of Study"
                          value={educationDetails?.fieldOfStudy}
                          onChange={handleOnchange}
                        // required
                        />
                        {error?.fieldOfStudy && (
                          <span style={{ fontSize: 12, color: "red" }}>
                            {error?.fieldOfStudy[0]}
                          </span>
                        )}
                      </div>
                      <div className="col-lg-12 mb-7">
                        {educationDetails.isCurrentlyStudy ? (
                          <input
                            type="checkbox"
                            className="checkbox mr-5"
                            id="isCurrentlyStudy"
                            name="isCurrentlyStudy"
                            // value={educationDetails.isCurrentlyStudy}
                            onChange={handleOnchange}
                            checked={educationDetails.isCurrentlyStudy}
                            required
                          />
                        ) : (
                          <input
                            type="checkbox"
                            className="checkbox mr-5"
                            id="isCurrentlyStudy"
                            name="isCurrentlyStudy"
                            // value={educationDetails.isCurrentlyStudy}
                            onChange={handleOnchange}
                            required
                          />
                        )}
                        <label
                          htmlFor="school"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          &nbsp;I currently study here
                        </label>
                        {error?.isCurrentlyStudy && (
                          <span style={{ fontSize: 12, color: "red" }}>
                            {error?.isCurrentlyStudy[0]}
                          </span>
                        )}
                      </div>
                      <div className="col-lg-6 mb-7">
                        <label
                          htmlFor="startdate"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Start Date <span>&nbsp;*</span>
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          placeholder="Enter Start Date"
                          id="startdate"
                          name="startDate"
                          value={educationDetails?.startDate}
                          onChange={handleOnchange}
                        // required
                        />
                        {error?.startDate && (
                          <span style={{ fontSize: 12, color: "red" }}>
                            {error?.startDate[0]}
                          </span>
                        )}
                      </div>
                      <div className="col-lg-6 mb-7">
                        <label
                          htmlFor="enddate"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          End Date{" "}
                          {educationDetails.isCurrentlyStudy ? (
                            ""
                          ) : (
                            <span>&nbsp;*</span>
                          )}
                        </label>
                        {educationDetails.isCurrentlyStudy ? (
                          <p>Present</p>
                        ) : (
                          <>
                            <input
                              type="date"
                              className="form-control"
                              id="enddate"
                              name="endDate"
                              value={educationDetails?.endDate}
                              onChange={handleOnchange}
                            />
                            {error?.endDate && (
                              <span style={{ fontSize: 12, color: "red" }}>
                                {error?.endDate[0]}
                              </span>
                            )}
                          </>
                        )}
                      </div>

                      <div className="col-lg-12 mb-7">
                        <label
                          htmlFor="grade"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Grade <span>&nbsp;*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Grade"
                          id="grade"
                          name="grade"
                          value={educationDetails?.grade}
                          onChange={handleOnchange}
                        // required
                        />
                        {error?.grade && (
                          <span style={{ fontSize: 12, color: "red" }}>
                            {error?.grade[0]}
                          </span>
                        )}
                      </div>
                      <div className="col-lg-12 mb-7">
                        <label
                          htmlFor="activitiesAndSocieties"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Activities and Societies
                        </label>
                        <textarea
                          id="activityAndSociety"
                          className="form-control h-px-60"
                          name="activityAndSociety"
                          placeholder="Enter Activities and Societies"
                          value={educationDetails?.activityAndSociety}
                          onChange={handleOnchange}
                          required
                        ></textarea>
                      </div>
                      <div className="col-lg-12 mb-7">
                        <label
                          htmlFor="description"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Description
                        </label>
                        <textarea
                          id="description"
                          className="form-control h-px-60"
                          placeholder="Enter Description"
                          name="description"
                          required
                          value={educationDetails?.description}
                          onChange={handleOnchange}
                        ></textarea>
                      </div>
                      <div className="col-lg-12 d-flex justify-content-between">
                        {educationEditObj.id ? (
                          <Button variant="outline-blue"
                            className="btn text-smoke rounded-8 bg-concrete hover-bg-green font-size-4"
                            onClick={handleDelete}
                          >
                            Delete
                          </Button>
                        ) : (
                          <a></a>
                        )}
                        <a
                          className="btn text-white rounded-8 bg-blue hover-bg-blue font-size-4"
                          onClick={handleOnclick}
                        >
                          Save
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </ModalStyled>
  );
};

export default ModalEducation;
