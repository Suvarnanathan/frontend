import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import { signUp } from "../../utils/api";
import { ERROR_STATUS } from "../../utils/constants";
import { useRouter } from "next/router";
const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;

const ModalRegister = ({ isVisible, toggleModal, getApplicants }) => {
  const router = useRouter();
  const intialState = {
    email: null,
    firstName: null,
    lastName: null,
    password: "password",
    password_confirmation: "password",
    roleId: 4,
  };
  const [user, setUser] = useState(intialState);
  const [error, setError] = useState();
  const handleClose = () => {
    toggleModal();
    setError({});
  };
  const handleOnchange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnclick = () => {
    signUp(user)
      .then((res) => {
        getApplicants();
        toggleModal();
        setUser(intialState);
        setError({});
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
                <h5 className="text-center ">Add Candidate</h5>
                <hr />
                <div className="bg-white">
                  <form
                    name="contact"
                    method="post"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                  >
                    {/* You still need to add the hidden input with the form name to your JSX form */}
                    <div className="row">
                      {/* <div className="col-lg-12 mb-7">
                        <label
                          htmlFor="address"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          User Name <span>&nbsp;*</span>
                        </label>
                        <input
                          className="form-control"
                          placeholder="Enter User Name"
                          id="name"
                          name="name"
                          // value={user.address}
                          onChange={handleOnchange}
                        />
                        {error?.name && (
                          <span style={{ fontSize: 12, color: "red" }}>
                            {error?.name}
                          </span>
                        )}
                      </div> */}
                      <div className="col-lg-12 mb-7">
                        <label
                          htmlFor="address"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Email <span>&nbsp;*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter Email"
                          id="email"
                          name="email"
                          // value={user.address}
                          onChange={handleOnchange}
                        />
                        {error?.email && (
                          <span style={{ fontSize: 12, color: "red" }}>
                            {error?.email}
                          </span>
                        )}
                      </div>
                      <div className="col-lg-12 mb-7">
                        <label
                          htmlFor="address"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          First Name <span>&nbsp;*</span>
                        </label>
                        <input
                          className="form-control"
                          placeholder="Enter First Name"
                          id="firstName"
                          name="firstName"
                          // value={user.address}
                          onChange={handleOnchange}
                        />
                        {error?.firstName && (
                          <span style={{ fontSize: 12, color: "red" }}>
                            {error?.firstName}
                          </span>
                        )}
                      </div>
                      <div className="col-lg-12 mb-7">
                        <label
                          htmlFor="address"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Last Name <span>&nbsp;*</span>
                        </label>
                        <input
                          className="form-control"
                          placeholder="Enter Last Name"
                          id="lastName"
                          name="lastName"
                          // value={user.address}
                          onChange={handleOnchange}
                        />
                        {error?.lastName && (
                          <span style={{ fontSize: 12, color: "red" }}>
                            {error?.lastName}
                          </span>
                        )}
                      </div>
                      {/* <div className="col-lg-12 mb-7">
                        <label
                          htmlFor="address"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Role
                        </label>
                        <select className="form-control" name="countryId"  onChange={handleOnchange}>
                        <option disabled>Select Role</option>
                          {
                          // countries.map(country=>(
                          //   <option value={country.id}>{country.name}</option>
                          // ))
                          }
                        </select>
                      </div> */}
                      {/* <div className="col-lg-12 mb-7">
                        <label
                          htmlFor="address"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          PassWord
                        </label>
                        <input
                          className="form-control"
                          placeholder="Enter City"
                          id="city"
                          name="city"
                          // value={user.city}
                          onChange={handleOnchange}
                          required
                        />
                      </div>
                      <div className="col-lg-12 mb-7">
                        <label
                          htmlFor="address"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                         Confirm PassWord
                        </label>
                        <input
                          className="form-control"
                          placeholder="Enter City"
                          id="city"
                          name="city"
                          // value={user.city}
                          onChange={handleOnchange}
                          required
                        />
                      </div> */}


                      <div className="col-lg-12 d-flex justify-content-between">
                        <a></a>
                        <a
                          className="btn text-white rounded-8 bg-blue hover-bg-blue font-size-4"
                          onClick={(e) => {
                            e.preventDefault();
                            handleOnclick();
                          }}
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

export default ModalRegister;
