import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import { useRouter } from "next/router";

const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;

const ModalAlert = ({isAlertVisible, toggleAlertModal, modalContent}) => {
  
    const router = useRouter();

  const handleOnclick = () => {
        toggleAlertModal();
        router.push("/dashboard-applicants");
  };

  return (
    <ModalStyled
      size="m"
      centered
      show={isAlertVisible}
      onHide={toggleAlertModal}
    >
      <Modal.Body className="p-0 ">
        <div className=" pb-6 ">
          <div className="container">
            <div className="row justify-content-center mt-6">
              <div className="col-xxl-9 col-xl-7 col-lg-8">
              {modalContent==false ?(
                <h4 className="text-center ">
                 Please Wait!
                </h4>
              ):(
                <h4 className="text-center ">
                 Awesome!
                </h4>
              )}
                <hr />
                <div className="bg-white">
                  <form>
                    <div className="row">
                      <div className="col-lg-12 ">
                        {modalContent==false ?(
                      <p className="text-center text-black">
                     Mail is Sending....
                     </p>
                        ):(
                          <p className="text-center text-black">
                      Mail has been sent successfully 
                     </p>
                        )
                      }
                      </div>
                      {modalContent!==false &&
                      <div className="col-lg-12 d-flex justify-content-center">
                        <a
                          className="btn text-white rounded-8 bg-blue hover-bg-blue font-size-4"
                          onClick={(e) => {
                            e.preventDefault();
                            handleOnclick();
                          }}
                        >
                          Okay
                        </a> 
                      </div>
                        } 
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

export default ModalAlert;
