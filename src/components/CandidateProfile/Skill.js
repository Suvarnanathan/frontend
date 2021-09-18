import Link from "next/link";
import React, { useEffect, useState, useContext } from "react";
import { getUserSkill } from "../../utils/api";
import ModalSkill from "../Modals/ModalSkill";
import { useRouter } from "next/router";

export default function Skill({ skills, pdfHide }) {
  const [userSkills, setUserSkills] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const router = useRouter();
  const { userId } = router.query;
  const toggleModal = () => {
    setIsVisible(!isVisible);
  };
  const getUserSkills = () => {
    userId && getUserSkill(userId).then((data) => setUserSkills(data));
  };
  useEffect(() => {
    getUserSkills();
  }, [userId]);
  return (
    <>
      <ModalSkill
        isVisible={isVisible}
        toggleModal={toggleModal}
        skills={skills}
        getUserSkills={getUserSkills}
        userSkills={userSkills}
        userId={userId}
      />
      <div className="border-top p-5 pl-xs-12 pt-7 pb-5">
        <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">
          Skills
          {userSkills.length != 0 ? (
            <a
              className="text-smoke circle-32 bg-concrete hover-bg-blue mr-11 font-size-4"
              style={{ float: "right" }}
              onClick={() => toggleModal()}
            >
              <i className="fa fa-pen"></i>
            </a>
          ) : (
            <a
              className="text-smoke circle-32 bg-concrete hover-bg-blue mr-11 font-size-4"
              style={{ float: "right" }}
              onClick={() => toggleModal()}
            >
              <i className="fa fa-plus fa-sm"></i>
            </a>
          )}
        </h4>
        <ul className="list-unstyled d-flex align-items-center flex-wrap">
          {userSkills.map((userSkill) => (
            <li key={userSkill.id}>
              <a className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center">
                {userSkill.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
