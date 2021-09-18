import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form, Modal } from "react-bootstrap";
import { changePassword } from "../../utils/api";
import { ERROR_STATUS } from "../../utils/constants";
import { useRouter } from "next/router";

const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;
const ModalChangePassword = ({ mailAddress, isVisible, toggleModal }) => {
  const router = useRouter()
  const [showPassCurrent, setShowPassFirst] = useState(true);
  const [showPassNew, setShowPassNew] = useState(true);
  const [showPassConfirm, setShowPassConfirm] = useState(true);
  const [error, setError] = useState();

  const togglePasswordCurrent = () => {
    setShowPassFirst(!showPassCurrent);
  };

  const togglePasswordNew = () => {
    setShowPassNew(!showPassNew);
  };
  const togglePasswordConfirm = () => {
    setShowPassConfirm(!showPassConfirm);
  };

  const handleClose = () => {
    toggleModal();
    setError({});
    setPasswordObj({});
  };

  const [passwordObj, setPasswordObj] = useState({});

  const handleOnchange = (e) => {
    setPasswordObj({
      ...passwordObj,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnclick = (e) => {
    e.preventDefault();
    changePassword(passwordObj)
      .then((res) => {
        toggleModal();
        setPasswordObj({});
      })
      .catch((err) => {
        localStorage.getItem(ERROR_STATUS) === 500 &&
          router.push(`/${localStorage.getItem(ERROR_STATUS)}`);
        setError(err)
      });
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
                <h5 className=" text-center ">Change password</h5>
                <hr />
                <div className="bg-white">
                  <form
                    name="personal"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                  >
                    <div className="row">
                      <div className="col-lg-12 mb-7">
                        <label
                          htmlFor="email2"
                          className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                        >
                          E-mail
                        </label>
                        <input
                          value={mailAddress}
                          type="email"
                          className="form-control"
                          id="email2"
                          name="email"
                          onChange={handleOnchange}
                          disabled
                        />
                      </div>

                      <div className="col-lg-12 mb-7">
                        <label
                          htmlFor="password"
                          className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                        >
                          Current Password
                        </label>
                        <div className="position-relative">
                          <input
                            name="currentPassword"
                            type={showPassCurrent ? "password" : "text"}
                            className="form-control"
                            placeholder="Enter Current Password"
                            id="currentPassword"
                            onChange={handleOnchange}
                          />
                          {error?.currentPassword && (
                            <span style={{ fontSize: 12, color: "red" }}>
                              {error?.currentPassword[0]}
                            </span>
                          )}
                          <a
                            href="/#"
                            className="show-password pos-abs-cr fas mr-6 text-black-2"
                            onClick={(e) => {
                              e.preventDefault();
                              togglePasswordCurrent();
                            }}
                          >
                            <span className="d-none">none</span>
                          </a>
                        </div>
                      </div>
                      <div className="col-lg-12 mb-7">
                        <label
                          htmlFor="password"
                          className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                        >
                          New Password
                        </label>
                        <div className="position-relative">
                          <input
                            name="newPassword"
                            type={showPassNew ? "password" : "text"}
                            className="form-control"
                            id="password"
                            placeholder="Enter New Password"
                            onChange={handleOnchange}
                          />
                          {error?.newPassword && (
                            <span style={{ fontSize: 12, color: "red" }}>
                              {error?.newPassword[0]}
                            </span>
                          )}
                          <a
                            href="/#"
                            className="show-password pos-abs-cr fas mr-6 text-black-2"
                            onClick={(e) => {
                              e.preventDefault();
                              togglePasswordNew();
                            }}
                          >
                            <span className="d-none">none</span>
                          </a>
                        </div>
                      </div>
                      <div className="col-lg-12 mb-7">
                        <label
                          htmlFor="password2"
                          className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                        >
                          Confirm Password
                        </label>
                        <div className="position-relative">
                          <input
                            name="confirmPassword"
                            type={showPassConfirm ? "password" : "text"}
                            className="form-control"
                            id="password2"
                            placeholder="Enter Confirm Password"
                            onChange={handleOnchange}
                          />
                          {error?.confirmPassword && (
                            <span style={{ fontSize: 12, color: "red" }}>
                              {error?.confirmPassword[0]}
                            </span>
                          )}
                          <a
                            href="/#"
                            className="show-password pos-abs-cr fas mr-6 text-black-2"
                            onClick={(e) => {
                              e.preventDefault();
                              togglePasswordConfirm();
                            }}
                          >
                            <span className="d-none">none</span>
                          </a>
                        </div>
                      </div>
                      <div className="col-lg-12 d-flex justify-content-between">
                        {passwordObj ? <a></a> : <a></a>}
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

export default ModalChangePassword;
