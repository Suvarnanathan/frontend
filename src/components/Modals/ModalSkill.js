import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import { createUserSkills } from "../../utils/api";
import Select from "react-select";
import { ERROR_STATUS } from "../../utils/constants";
import { useRouter } from "next/router";

const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;

const ModalSkill = ({
  isVisible,
  toggleModal,
  skills,
  getUserSkills,
  userSkills,
  userId,
}) => {
  const router = useRouter();

  const intialState = {
    userId: userId,
    skillIds: userSkills,
  };
  const [state, setState] = useState(intialState);
  const [error, setError] = useState();
  const validation = "please update skills";
  useEffect(() => {
    setState({ userId: userId, skillIds: userSkills });
  }, [userId]);
  const handleClose = () => {
    setError({});
    toggleModal();
  };
  const data = skills?.map((skill) => ({
    value: skill.id,
    label: skill.name,
  }));
  const handleOnchange = (e) => {
    setState({
      userId,

      skillIds: e?.map((skill) => skill.value),
    });
  };
  const handleOnclick = () => {
    if (userSkills.length != state.skillIds.length) {
      createUserSkills(state)
        .then((res) => {
          getUserSkills();
          setError({});
          toggleModal();
        })
        .catch((err) => {
          localStorage.getItem(ERROR_STATUS) === 500 &&
            router.push(`/${localStorage.getItem(ERROR_STATUS)}`);
          setError(err);
        });
    } else {
      console.log(validation);
      setError({ validation: validation });
    }
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
              <div className="col-xxl-9 col-xl-7 col-lg-8">
                <h5 className="text-center ">
                  {userSkills.length != 0 ? "Edit skills" : "Add skills"}
                </h5>
                <hr />
                <div className="bg-white">
                  <form>
                    <div className="row">
                      <div className="col-lg-12 mb-7">
                        <label
                          htmlFor="name"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Skills
                        </label>
                        <Select
                          isMulti
                          name="skillIds"
                          options={data}
                          defaultValue={userSkills.map((skill) => ({
                            value: skill.id,
                            label: skill.name,
                          }))}
                          onChange={handleOnchange}
                        ></Select>
                        {error?.skillIds && (
                          <span style={{ fontSize: 12, color: "red" }}>
                            {error?.skillIds}
                          </span>
                        )}
                        {error?.validation && (
                          <span style={{ fontSize: 12, color: "red" }}>
                            {error?.validation}
                          </span>
                        )}
                      </div>
                      <div className="col-lg-12 d-flex justify-content-between">
                        {userSkills ? <a></a> : <a></a>}
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

export default ModalSkill;
