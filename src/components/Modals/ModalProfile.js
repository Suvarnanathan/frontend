import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form, Modal } from "react-bootstrap";
import { createProfileImage } from "../../utils/api";
import { ERROR_STATUS } from "../../utils/constants";
import { useRouter } from "next/router";
const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;

const ModalProfile = ({
  isShown,
  toggleCreateProfileModal,
  getPersonalInfoData,
  userId,
  personalInfo,
}) => {
  const handleClose = () => {
    toggleCreateProfileModal();
    setprofileUpload(initialState);
  };
  const router = useRouter();

  const initialState = {
    // about: personalData?.about,
  };

  const [profileUpload, setprofileUpload] = useState(initialState);

  const handleImageFile = (e) => {
    let formdata = new FormData();
    formdata.append("image", e.target.files[0]);
    setprofileUpload({
      ...profileUpload,
      image: formdata,
      file: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleOnclick = (e) => {
    e.preventDefault();
    createProfileImage(userId, profileUpload.image).then((res) => {
      getPersonalInfoData();
      toggleCreateProfileModal();
      setprofileUpload(initialState);
    }).catch((err) => {
      localStorage.getItem(ERROR_STATUS) === 500 && router.push(`/${localStorage.getItem(ERROR_STATUS)}`)
    });
  };

  return (
    <ModalStyled
      size="lg"
      centered
      show={isShown}
      onHide={toggleCreateProfileModal}
    >
      <Modal.Body>
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
                <h5 className=" text-center "> Profile Photo</h5>
                <div>
                  <form>
                    <div className="row">
                      <div class="avatar-upload ">
                        <div class="avatar-edit ">
                          <input
                            type="file"
                            id="imageUpload"
                            accept=".png, .jpg, .jpeg"
                            onChange={handleImageFile}
                          />

                          <label for="imageUpload">
                            <i
                              class="fas fa-camera"
                              style={{
                                color: "#0671e6",
                                marginLeft: 8,
                                lineHeight: 2,
                              }}
                            ></i>
                          </label>
                        </div>
                        <div class="avatar-preview ">
                          {profileUpload.file ? (
                            <img
                              src={profileUpload.file}
                              alt=""
                              className="image-preview"
                              style={{
                                width: 250,
                                height: 250,
                                position: "relative",
                                borderRadius: "100%",
                                boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.1)",
                                width: "100%",
                                height: "100%",
                                borderRadius: "100%",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                              }}
                            />
                          ) : (
                            <img
                              src={personalInfo.profileImage}
                              alt=""
                              className="image-preview"
                              style={{
                                width: 250,
                                height: 250,
                                position: "relative",
                                borderRadius: "100%",
                                boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.1)",
                                borderRadius: "100%",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                              }}
                            />
                          )}
                        </div>
                      </div>
                      {/* <hr
                        style={{
                          backgroundColor: "grey",
                          width: "2500px",
                        }}
                      /> */}
                      <div className="col-lg-12 d-flex justify-content-between">
                        {userId ? <a></a> : <a></a>}
                        <a
                          className="btn text-white rounded-8 bg-blue hover-bg-blue font-size-4"
                          onClick={handleOnclick}
                        >
                          Upload
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

export default ModalProfile;
