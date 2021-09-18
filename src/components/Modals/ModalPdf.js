import React, { useEffect, useState, useRef  } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import { sendMail } from "../../utils/api";
// import { Editor } from 'react-draft-wysiwyg';

const ModalStyled = styled(Modal)`

  /* &.modal {
    z-index: 10050;
  } */
`;
const ModalPdfData = ({ isPdfVisible, togglePdfModal, selectCandidates }) => {
  let candidatesId = selectCandidates;
  const handleClose = () => {
    togglePdfModal(initialState);
    setError({});
    setCcField(false)
    setTags([]);
    setCcTags([]);
    
  };

  const initialState = {
    candidatesId,
    name: null,
    recipients: null,
    cc: null,
    subject: null,
    body: null,
  };

  const [mailDetails, setMailDetails] = useState(initialState);

  const [error, setError] = useState();

  useEffect(() => {
    setMailDetails({ candidatesId })
  }, [candidatesId])
  
  const handleOnchange = (e) => {
    setMailDetails({
      ...mailDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnclick = () => {
    sendMail({ ...mailDetails, recipients: mailTag, cc:ccTag })
      .then((res) => {
        togglePdfModal();
        setMailDetails(initialState);
        setTags([]);
        setCcTags([]);
        setError({});
      })
      .catch((err) => setError(err));
  }
  const [ccField,setCcField]=useState(false)
  const handleAdd = () => {
    setCcField(!ccField)
  }

 
  var mailformat = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
  const [mailTag, setTags] = React.useState([]);
  const removeTags = (indexToRemove) => {
    setTags([...mailTag.filter((_, index) => index !== indexToRemove)]);
  };
  const addTags = event => {
    if (event.target.value.match(mailformat)) {
      setTags([...mailTag, event.target.value]);
      event.target.value = "";
      setError({recipients: ""});
    }else if(event.target.value == ''){
      setError({recipients: "Recipient Email is Empty"});
    }else{
      setError({recipients: "Please Enter Valid E-mail"});
    }
  };

  const [ccTag, setCcTags] = React.useState([]);
  const removeCcTags = indexToRemove => {
    setCcTags([...ccTag.filter((_, index) => index !== indexToRemove)]);
  };
  const addCcTags = event => {
    if (event.target.value.match(mailformat)) {
      setCcTags([...ccTag, event.target.value]);
      event.target.value = "";
      setError({cc: ""});
    }else if(event.target.value == ''){
      setError({cc: "Recipient Email is Empty"});
    }else{
      setError({cc: "Please Enter Valid E-mail"});
    }
  };

 
  return (
    <ModalStyled size="lg" centered show={isPdfVisible} onHide={togglePdfModal}>
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
                <h5 className="text-center "> Send Resume
                </h5>
                <hr />
                <div className="bg-white">
                  <form
                    name="contact"
                    method="post"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                  >
                    {/* You still need to add the hidden input with the form name to your JSX form */}
                    <input
                      type="hidden"
                      name="form-name"
                      onChange={handleOnchange}
                      value={candidatesId}
                    />
                    <div className="row">
                      <div className="col-12 mb-7">
                        <label
                          htmlFor="name"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Your Name <span>&nbsp;*</span>
                        </label>
                        <input
                          className="form-control"
                          placeholder="Enter Your Name"
                          id="name"
                          name="name"
                          onChange={handleOnchange}
                        />
                        {error?.name && (
                          <span style={{ fontSize: 12, color: "red" }}>
                            {error?.name}
                          </span>
                        )}
                      </div>
                      <div className="col-lg-12 mb-7">
                        <label
                          htmlFor="subject"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          To <span>&nbsp;*</span>
                        </label>
                        <div className="tags-input">
                          <ul id="tags">
                            {mailTag.map((tag, index) => (
                              <li key={index} className="tag">
                                <span className="tag-title">{tag}</span>
                                <span
                                  className="tag-close-icon"
                                  onClick={() => removeTags(index)}
                                >
                                  x
                                </span>
                              </li>
                            ))}
                          </ul>
                          <input
                            type="email"
                            name="recipients"
                            
                            onKeyUp={(event) =>
                              event.key === "Enter" ? addTags(event) : null
                            }
                            placeholder="Press Enter to Add E-mail"
                          />

                          <span
                            type="submit"
                            onClick={handleAdd}
                            style={{
                              position: "absolute",
                              top: "45px",
                              right: "30px",
                              color: "black",
                              backgroundColor: "white",
                            }}
                          >
                            Cc
                          </span>
                        </div>
                        {error?.recipients && (
                          <span style={{ fontSize: 12, color: "red" }}>
                            {error?.recipients}
                          </span>
                        )}
                      </div>
                      {ccField && <div className="col-lg-12 mb-7">
                        <label
                          htmlFor="subject"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Cc
                        </label>
                        <div className="tags-input">
                          <ul id="tags">
                            {ccTag.map((tag, index) => (
                              <li key={index} className="tag">
                                <span className='tag-title'>{tag}</span>
                                <span className='tag-close-icon'
                                  onClick={() => removeCcTags(index)}
                                >
                                  x
						                  </span>
                              </li>
                            ))}
                          </ul>
                          <input
                            type="email"
                            name="cc"
                            onKeyUp={event => event.key === "Enter" ? addCcTags(event) : null}
                            placeholder="Press Enter to Add E-mail"
                          />
                        </div>
                        {error?.cc && (
                          <span style={{ fontSize: 12, color: "red" }}>
                            {error?.cc}
                          </span>
                        )}
                      </div>}
                      <div className="col-lg-12 mb-7">
                        <label
                          htmlFor="message"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Subject <span>&nbsp;*</span>
                        </label>
                        <input
                          className="form-control"
                          placeholder="Enter Your Subject"
                          id="subject"
                          name="subject"
                          onChange={handleOnchange}
                        />
                        {error?.subject && (
                          <span style={{ fontSize: 12, color: "red" }}>
                            {error?.subject}
                          </span>
                        )}
                      </div>
                      <div className="col-lg-12 mb-7">
                        <label
                          htmlFor="message"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Body <span>&nbsp;*</span>
                        </label>
                        <textarea
                          className="form-control"
                          placeholder="Enter Your Message"
                          id="body"
                          name="body"
                          onChange={handleOnchange}
                        ></textarea>
                        {error?.body && (
                          <span style={{ fontSize: 12, color: "red" }}>
                            {error?.body}
                          </span>
                        )}
                      </div>
                      {/* <div className="col-lg-12 pt-4">
                      <Editor
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        toolbarClassName="toolbar-class"
                        // wrapperStyle={<wrapperStyleObject/>}
                        // editorStyle={<editorStyleObject/>}
                        // toolbarStyle={<toolbarStyleObject/>}
                      />
                      </div> */}
                      <div className="col-lg-12 pt-4">
                        <a
                          className="btn text-white rounded-8 float-right bg-blue hover-bg-blue font-size-4"
                          onClick={(e) => {
                            e.preventDefault();
                            handleOnclick();
                          }}
                        >
                          Send Now
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

export default ModalPdfData;
