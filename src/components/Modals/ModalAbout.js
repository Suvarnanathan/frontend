import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form, Modal } from "react-bootstrap";
import { updatePersonalInfoAbout } from "../../utils/api";
import { ERROR_STATUS } from "../../utils/constants";
import { useRouter } from "next/router";

const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;
const ModalAboutData = ({
  personalData,
  isVisible,
  toggleModal,
  actionName,
  getPersonalInfoData,
  pdfHide,
}) => {
  const router = useRouter()
  const handleClose = () => {
    toggleModal();
    setPersonalInfo(initialState);
  };
  const userId = personalData?.userId;
  const initialState = {
    about: personalData?.about,
  };
  const [personalInfo, setPersonalInfo] = useState(initialState);
  useEffect(() => {
    setPersonalInfo(personalData);
  }, [personalData]);

  const handleOnchange = (e) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnclick = (e) => {
    e.preventDefault();
    updatePersonalInfoAbout({ about: personalInfo.about }, userId).then(
      (res) => {
        getPersonalInfoData();
        toggleModal();
        setPersonalInfo(initialState);
      }
    ).catch(err => {
      localStorage.getItem(ERROR_STATUS) === 500 &&
        router.push(`/${localStorage.getItem(ERROR_STATUS)}`);
    });;
  };
  
  return (
    <ModalStyled size="lg" centered show={isVisible} onHide={toggleModal}>
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
                <h5 className=" text-center ">{actionName} about</h5>
                <hr />
                <div className="bg-white">
                  <form
                    name="personal"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                  >
                    <div className="row">
                      <div className="col-12 mb-7">
                        <label
                          htmlFor="title"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Summary
                        </label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          className="form-control"
                          name="about"
                          value={personalInfo.about}
                          onChange={handleOnchange}
                          required
                        />
                      </div>
                      <div className="col-lg-12 d-flex justify-content-between">
                        {personalInfo ? <a></a> : <a></a>}
                        <a
                          className="btn text-white rounded-8 bg-blue hover-bg-blue font-size-4"
                          onClick={handleOnclick}
                        >
                          Update
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

export default ModalAboutData;
