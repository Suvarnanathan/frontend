import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Modal } from "react-bootstrap";
import {
  createLicense,
  updateLicense,
  deleteLicense,
  createLicenseImage,
} from "../../utils/api";
import { ERROR_STATUS } from "../../utils/constants";
import { useRouter } from "next/router";

const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;

const ModalLicense = ({
  isVisible,
  toggleModal,
  licenseEditObj,
  getLicenseDetails,
  userId,
}) => {
  const initialState = {
    userId: userId,
    title: null,
    image:null
    

  };
  const router = useRouter();
  const setState = () => {
    if (licenseEditObj != null) {
      setLicense({
        id: licenseEditObj.id,
        userId: licenseEditObj.userId,
        title: licenseEditObj.title,
      });
    } else {
      setLicense(initialState);
    }
  };

  useEffect(() => {
    setState();
  }, [licenseEditObj]);

  useEffect(() => {
    setState();
  }, [userId]);

  const [error, setError] = useState({image:"",title:""});

  const handleClose = () => {
    setError({});
    toggleModal();
  };
  const [license, setLicense] = useState({
    userId: userId,
    title: "",
    image:""
  });

  const handleImageFile = (e) => {
    let formdata = new FormData();
    formdata.append("image", e.target.files[0]);
    setLicense({
      ...license,
      image: formdata,
    });
  };
  const handleOnchange = (e) => {
    
    setLicense({
      ...license,
      [e.target.name]: e.target.value,
    });
    
  };

  const handleOnclick = () => {
   if (licenseEditObj != null) {
     updateLicense(license)
        .then((res) => {
          if (license.image) {
            createLicenseImage(license.id, license.image)
              .then((respons) => {
                getLicenseDetails();
                toggleModal();
                setLicense(initialState);
                setError({});
              })
              .catch(err => {
                localStorage.getItem(ERROR_STATUS) != 400 &&
                  router.push(`/${localStorage.getItem(ERROR_STATUS)}`);
              });
          } else {
            getLicenseDetails();
            toggleModal();
            setLicense(initialState);
            setError({});
          }
        })
        .catch((err) => {
          localStorage.getItem(ERROR_STATUS) != 400 &&
            router.push(`/${localStorage.getItem(ERROR_STATUS)}`);
          setError(err)
        });
    } else if( license.title === null && license.image === null){
          setError({title:'Please enter license title.',image:'Please insert license image.'});
      }else if(license.title === null){
        setError({title:'Please enter license title.'});
      }
      else if(license.image === null){
        setError({image:'Please insert license image.'});
      }
          // setError({...error,title:'please enter license title.'});
        
        else{

          createLicense(license)
          .then((res) => {
            createLicenseImage(res.licenseId, license.image)
            .then((respons) => {
              getLicenseDetails();
              toggleModal();
              setLicense(initialState);
              setError({});
            })
            .catch((err) => {
              localStorage.getItem(ERROR_STATUS) === 500 &&
              router.push(`/${localStorage.getItem(ERROR_STATUS)}`);
            });
          })
          .catch((err) => {
            setError(err)
            localStorage.getItem(ERROR_STATUS) === 500 &&
            router.push(`/${localStorage.getItem(ERROR_STATUS)}`);
          });
        }
    // }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    deleteLicense(licenseEditObj?.id)
      .then((res) => {
        getLicenseDetails();
        toggleModal(null);
        setLicense(initialState);
        setError({});
      })
      .catch((err) => {
        localStorage.getItem(ERROR_STATUS) != 400 &&
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
                  {licenseEditObj != null
                    ? "Edit license"
                    : "Add license"}
                </h5>
                <hr />
                <div className="bg-white">
                  <form
                    name="license"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                  >
                    {/* You still need to add the hidden input with the form name to your JSX form */}
                    <input type="hidden" name="form-name" value="license" />
                    <div className="row">
                      <div className="col-12 mb-7">
                        <label
                          htmlFor="name"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Title <span>&nbsp;*</span>
                        </label>
                        <input
                          className="form-control"
                          placeholder="Enter Title"
                          id="title"
                          name="title"
                          value={license.title}
                          onChange={handleOnchange}
                          required
                        />
                        {error?.title && (
                          <span style={{ fontSize: 12, color: "red" }}>
                            {error?.title}
                          </span>
                        )}
                      </div>


                      <div className="col-lg-12 mb-7">
                        <label
                          htmlFor="images"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          License Image
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          placeholder="Brylin, USA"
                          id="image"
                          name="image"
                          accept=".jpg, .png, .jpeg"
                          // value={license.image}
                          onChange={handleImageFile}
                          required
                        />
                         {/* {license.image ==null && (
                          <span style={{ fontSize: 12, color: "red" }}>
                            {/* {'Please insert license image.'} */}
                            {/* {license.image} */}
                          {/* </span> */}
                        {/* )} */} 
                        {error?.image && (
                          <span style={{ fontSize: 12, color: "red" }}>
                            {error?.image}
                          </span>
                        )}
                      </div>
                      <div className="col-lg-12 d-flex justify-content-between">
                        {licenseEditObj ? (
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
export default ModalLicense;
