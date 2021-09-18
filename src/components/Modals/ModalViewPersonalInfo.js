import React from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import PersonalInfo from "../ProfileSidebar/PersonalInfo";

export default function ModalViewPersonalInfo({ isVisible, toggleModal,personalInfo, pdfHide,isProfile }) {
    const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;
  const handleClose = () => {
    toggleModal();
  };

  return (
    <>
      <ModalStyled
        // {...props}
        size="md"
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
          <h5 className="text-center pt-5">View personal info</h5>
          <hr/>
          <PersonalInfo
           personalInfo={personalInfo}  
           pdfHide={pdfHide} 
            isProfile={isProfile}
            />
        </Modal.Body>
      </ModalStyled>
    </>
  );
}
