import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Modal, Button } from "react-bootstrap";
import {
  createCertificate,
  updateCertificate,
  deleteCertificate,
  createCertificateImage,
} from "../../utils/api";
import { ERROR_STATUS } from "../../utils/constants";

const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;

const ModalCertificate = ({
  isVisible,
  toggleModal,
  certificateEditObj,
  getCertificateDetails,
  userId,
}) => {
  const initialState = {
    userId: userId,
    name: null,
    issuedOrganization: null,
    startDate: null,
    endDate: null,
    image: null,
  };
  const setState = () => {
    if (certificateEditObj != null) {
      setCertificate({
        id: certificateEditObj.id,
        userId: certificateEditObj.userId,
        name: certificateEditObj.name,
        issuedOrganization: certificateEditObj.issuedOrganization,
        startDate: certificateEditObj.startDate,
        endDate: certificateEditObj.endDate,
        convertStartYear: certificateEditObj.convertStartYear,
        convertEndYear: certificateEditObj.convertEndYear,
      });
    } else {
      setCertificate(initialState);
    }
  };
  useEffect(() => {
    setState();
  }, [certificateEditObj]);

  useEffect(() => {
    setState();
  }, [userId]);
  const [error, setError] = useState({ image: "" });
  const handleClose = () => {
    setError({});
    toggleModal();
  };
  const [certificate, setCertificate] = useState({
    userId: userId,
    name: "",
    issuedOrganization: "",
    startDate: "",
    endDate: "",
  });

  const handleImageFile = (e) => {
    let formdata = new FormData();
    formdata.append("image", e.target.files[0]);
    setCertificate({
      ...certificate,
      image: formdata,
    });
  };

  const handleOnchange = (e) => {
    setCertificate({
      ...certificate,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnclick = () => {
    if (certificateEditObj != null) {
      updateCertificate(certificate)
        .then((res) => {
          if (certificate.image) {
            createCertificateImage(certificate.id, certificate.image)
              .then((respons) => {
                getCertificateDetails();
                toggleModal(null);
                setCertificate(initialState);
                setError({});
              })
              .catch(err => {
                localStorage.getItem(ERROR_STATUS) === 500 &&
                  router.push(`/${localStorage.getItem(ERROR_STATUS)}`);
              });
          } else {
            getCertificateDetails();
            toggleModal(null);
            setCertificate(initialState);
            setError({});
          }
        })
        .catch((err) => {
          localStorage.getItem(ERROR_STATUS) === 500 &&
            router.push(`/${localStorage.getItem(ERROR_STATUS)}`);
          setError(err)
        });
    } else if (certificate.image == null) {
      setError({ image: 'please insert certificate image.' });

    } else {
      createCertificate(certificate)
        .then((res) => {
          createCertificateImage(res.certificateId, certificate.image)
            .then((respons) => {
              getCertificateDetails();
              toggleModal(null);
              setCertificate(initialState);
              setError({});
            })
            .catch(err => {
              localStorage.getItem(ERROR_STATUS) === 500 &&
                router.push(`/${localStorage.getItem(ERROR_STATUS)}`);
            });
        })
        .catch((err) => {
          localStorage.getItem(ERROR_STATUS) === 500 &&
            router.push(`/${localStorage.getItem(ERROR_STATUS)}`);
          setError(err)
        });
    }


  };

  const handleDelete = async (e) => {
    e.preventDefault();
    deleteCertificate(certificateEditObj?.id)
      .then((res) => {
        getCertificateDetails();
        toggleModal(null);
        setCertificate(initialState);
        setError({});
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
                <h5 className="text-center ">
                  {certificateEditObj != null
                    ? "Edit certificate"
                    : "Add certificate"}
                </h5>
                <hr />
                <div className="bg-white">
                  <form
                    name="certificate"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                  >
                    {/* You still need to add the hidden input with the form name to your JSX form */}
                    <input type="hidden" name="form-name" value="certificate" />
                    <div className="row">
                      <div className="col-12 mb-7">
                        <label
                          htmlFor="name"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Name <span>&nbsp;*</span>
                        </label>
                        <input
                          className="form-control"
                          placeholder="Enter Name"
                          id="name"
                          name="name"
                          value={certificate.name}
                          onChange={handleOnchange}
                          required
                        />
                        {error?.name && (
                          <span style={{ fontSize: 12, color: "red" }}>
                            {error?.name}
                          </span>
                        )}
                      </div>
                      <div className="col-lg-12 mb-7">
                        <label
                          htmlFor="issuedOrganization"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Issuing organization <span>&nbsp;*</span>
                        </label>
                        <input
                          className="form-control"
                          placeholder="Enter Issuing organization"
                          id="issuedOrganization"
                          name="issuedOrganization"
                          value={certificate.issuedOrganization}
                          onChange={handleOnchange}
                          required
                        />
                        {error?.issuedOrganization && (
                          <span style={{ fontSize: 12, color: "red" }}>
                            {error?.issuedOrganization}
                          </span>
                        )}
                      </div>
                      <div className="col-lg-6 mb-7">
                        <label
                          htmlFor="startDate"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Start Date <span>&nbsp;*</span>
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="startDate"
                          name="startDate"
                          value={certificate.startDate}
                          onChange={handleOnchange}
                          required
                        />
                        {error?.startDate && (
                          <span style={{ fontSize: 12, color: "red" }}>
                            {error?.startDate}
                          </span>
                        )}
                      </div>
                      <div className="col-lg-6 mb-7">
                        <label
                          htmlFor="endDate"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          End Date <span>&nbsp;*</span>
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="endDate"
                          name="endDate"
                          value={certificate.endDate}
                          onChange={handleOnchange}
                          required
                        />
                        {error?.endDate && (
                          <span style={{ fontSize: 12, color: "red" }}>
                            {error?.endDate}
                          </span>
                        )}
                      </div>
                      <div className="col-lg-12 mb-7">
                        <label
                          htmlFor="images"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Certificate Image
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          placeholder="Brylin, USA"
                          id="image"
                          name="image"
                          accept=".jpg, .png, .jpeg"
                          // value={certificate.image}
                          onChange={handleImageFile}
                        />
                        {error?.image && (
                          <span style={{ fontSize: 12, color: "red" }}>
                            {error?.image}
                          </span>
                        )}
                      </div>

                      <div className="col-lg-12 d-flex justify-content-between">
                        {certificateEditObj ? (
                          <Button variant="outline-blue"
                            className="btn text-smoke rounded-8 bg-concrete hover-bg-green font-size-4"
                            onClick={handleDelete}
                          >
                            Delete
                          </Button >
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
export default ModalCertificate;
