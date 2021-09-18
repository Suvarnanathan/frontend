import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Modal, Button } from "react-bootstrap";
import {
  createUserExperience,
  updateUserExperience,
  deleteUserExperience,
} from "../../utils/api";
import { useRouter } from "next/router";
import { ERROR_STATUS } from "../../utils/constants";

const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;

const ModalExperience = ({
  isVisible,
  toggleModal,
  experienceEditObj,
  countries,
  jobSubCategories,
  getUserExperiences,
  userId,
}) => {
  const router = useRouter();

  const intialState = {
    userId,
    jobSubCategoryId: undefined,
    company: "",
    countryId: undefined,
    city: "",
    startDate: "",
    endDate: "",
    isCurrentlyWork: false,
  };

  const setState = () => {
    if (experienceEditObj != null) {
      setExperience({
        id: experienceEditObj.id,
        userId: experienceEditObj.userId,
        jobSubCategoryId: experienceEditObj.jobSubCategory.id,
        company: experienceEditObj.company,
        countryId: experienceEditObj.country.id,
        city: experienceEditObj.city,
        startDate: experienceEditObj.startDate,
        endDate: experienceEditObj.endDate,
        isCurrentlyWork: experienceEditObj.isCurrentlyWork,
      });
    } else {
      setExperience(intialState);
    }
  };

  useEffect(() => {
    setState();
  }, [experienceEditObj]);

  useEffect(() => {
    setState();
  }, [userId]);

  const [experience, setExperience] = useState(intialState);
  const [error, setError] = useState();

  const handleClose = () => {
    toggleModal(null);
    setError({});
    setExperience(intialState);
  };

  const handleOnchange = (e) => {
    if (e.target.name == "isCurrentlyWork") {
      setExperience({
        ...experience,
        [e.target.name]: e.target.checked,
      });
    } else {
      setExperience({
        ...experience,
        [e.target.name]:
          e.target.value === "Select Country" ||
          e.target.value === "Select Job Title"
            ? null
            : e.target.value,
      });
    }
  };

  const handleOnclick = () => {
    if (experienceEditObj != null) {
      updateUserExperience(experience)
        .then((res) => {
          getUserExperiences();
          toggleModal(null);
          setExperience(intialState);
          setError({});
        })
        .catch((err) => {
          localStorage.getItem(ERROR_STATUS) === 500 &&
            router.push(`/${localStorage.getItem(ERROR_STATUS)}`);
          setError(err);
        });
    } else {
      createUserExperience(experience)
        .then((res) => {
          getUserExperiences();
          toggleModal(null);
          setExperience(intialState);
          setError({});
        })
        .catch((err) => {
          localStorage.getItem(ERROR_STATUS) === 500 &&
            router.push(`/${localStorage.getItem(ERROR_STATUS)}`);
          setError(err);
        });
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    deleteUserExperience(experienceEditObj?.id)
      .then((res) => {
        getUserExperiences();
        toggleModal(null);
        setExperience(intialState);
        setError({});
      })
      .catch((err) => {
        localStorage.getItem(ERROR_STATUS) === 500 &&
          router.push(`/${localStorage.getItem(ERROR_STATUS)}`);
        setError(err);
      });
  };

  return (
    <ModalStyled
      // {...props}
      size="lg"
      centered
      show={isVisible}
      onHide={toggleModal}
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
              <div className="col-xxl-9 col-xl-7 col-lg-9">
                <h5 className="text-center ">
                  {experienceEditObj != null
                    ? "Edit experience"
                    : "Add experience"}
                </h5>
                <hr />
                <div className="bg-white">
                  <form
                    name="contact"
                    method="post"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                  >
                    <input
                      className="form-control"
                      id="userId"
                      name="userId"
                      value={experience.userId}
                      onChange={handleOnchange}
                      hidden
                    />
                    {/* You still need to add the hidden input with the form name to your JSX form */}
                    <div className="row">
                      <div className="col-lg-12 mb-7">
                        <label
                          htmlFor="address"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Job Title <span>&nbsp;*</span>
                        </label>
                        <select
                          className="form-control"
                          placeholder="Select Job Title"
                          name="jobSubCategoryId"
                          required
                          onChange={handleOnchange}
                          value={experience.jobSubCategoryId}
                        >
                          <option value={undefined}>Select Job Title</option>
                          {jobSubCategories.map((jobSubCategory) => (
                            <option
                              value={jobSubCategory.id}
                              key={jobSubCategory.id}
                            >
                              {jobSubCategory.name}
                            </option>
                          ))}
                        </select>
                        {error?.jobSubCategoryId && (
                          <span style={{ fontSize: 12, color: "red" }}>
                            {error?.jobSubCategoryId[0]}
                          </span>
                        )}
                      </div>
                      <div className="col-lg-12 mb-7">
                        <label
                          htmlFor="address"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Company Name <span>&nbsp;*</span>
                        </label>
                        <input
                          className="form-control"
                          placeholder="Enter Company Name"
                          id="company"
                          name="company"
                          value={experience.company}
                          onChange={handleOnchange}
                          required
                        />
                        {error?.company && (
                          <span style={{ fontSize: 12, color: "red" }}>
                            {error?.company[0]}
                          </span>
                        )}
                      </div>
                      <div className="col-lg-12 mb-7">
                        <label
                          htmlFor="address"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Country <span>&nbsp;*</span>
                        </label>
                        <select
                          className="form-control"
                          name="countryId"
                          onChange={handleOnchange}
                          value={experience.countryId}
                        >
                          <option value={undefined}>Select Country</option>
                          {countries.map((country) => (
                            <option value={country.id} key={country.id}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                        {error?.countryId && (
                          <span style={{ fontSize: 12, color: "red" }}>
                            {error?.countryId[0]}
                          </span>
                        )}
                      </div>
                      <div className="col-lg-12 mb-7">
                        <label
                          htmlFor="address"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          City <span>&nbsp;*</span>
                        </label>
                        <input
                          className="form-control"
                          placeholder="Enter City"
                          id="city"
                          name="city"
                          value={experience.city}
                          onChange={handleOnchange}
                          required
                        />
                        {error?.city && (
                          <span style={{ fontSize: 12, color: "red" }}>
                            {error?.city[0]}
                          </span>
                        )}
                      </div>
                      <div className="col-lg-12 mb-7">
                        <input
                          style={{ width: 15 }}
                          type="checkbox"
                          id="isCurrentlyWork"
                          name="isCurrentlyWork"
                          checked={experience.isCurrentlyWork}
                          onChange={handleOnchange}
                        />
                        &nbsp; I am currently working on this role
                      </div>
                      <div className="col-lg-6 mb-7">
                        <label
                          htmlFor="startyear"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Start Date <span>&nbsp;*</span>
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="startDate"
                          name="startDate"
                          value={experience.startDate}
                          onChange={handleOnchange}
                          required
                        />
                        {error?.startDate && (
                          <span style={{ fontSize: 12, color: "red" }}>
                            {error?.startDate[0]}
                          </span>
                        )}
                      </div>
                      <div className="col-lg-6 mb-7">
                        <label
                          htmlFor="endyear"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          End Date{" "}
                          {experience.isCurrentlyWork ? (
                            ""
                          ) : (
                            <span>&nbsp;*</span>
                          )}
                        </label>
                        {experience.isCurrentlyWork ? (
                          <p>Present</p>
                        ) : (
                          <>
                            <input
                              type="date"
                              className="form-control"
                              id="endDate"
                              name="endDate"
                              value={experience.endDate}
                              onChange={handleOnchange}
                              required
                            />
                            {error?.endDate && (
                              <span style={{ fontSize: 12, color: "red" }}>
                                {error?.endDate[0]}
                              </span>
                            )}
                          </>
                        )}
                      </div>

                      <div className="col-lg-12 d-flex justify-content-between">
                        {experienceEditObj ? (
                          <Button
                            variant="outline-blue"
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

export default ModalExperience;
