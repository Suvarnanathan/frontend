import React, { useEffect, useState } from "react";
import Experience from "../Experience/Experience";
import { getUserExperience } from "../../utils/api";
import ModalExperience from "../Modals/ModalExperience";
import { useRouter } from "next/router";
export default function WorkExperience({ jobSubCategories, countries, pdfHide }) {
  const [userExperiences, setUserExperiences] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [experienceEditObj, setExperienceEditObj] = useState(null);
  const router = useRouter();
  const { userId } = router.query;
  const toggleModal = (obj) => {
    setIsVisible(!isVisible);
    setExperienceEditObj(obj);
  };

  const getUserExperiences = () => {
    userId &&
      getUserExperience(parseInt(userId)).then((data) =>
        setUserExperiences(data)
      );
  };
  useEffect(() => {
    getUserExperiences();
  }, [userId]);

  return (
    <>
      <ModalExperience
        isVisible={isVisible}
        toggleModal={toggleModal}
        jobSubCategories={jobSubCategories}
        countries={countries}
        getUserExperiences={getUserExperiences}
        experienceEditObj={experienceEditObj}
        userId={userId}
      />
      <div className={pdfHide==0?("p-5 pl-xs-12 pt-7 pb-5"):("border-top p-5 pl-xs-12 pt-7 pb-5")}>
        <h4 className={pdfHide==0?("font-size-6 mb-2 mt-0 text-black-2 font-weight-semibold"):("font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold")}>
          Experience
          {pdfHide==1 &&
          <a
            className="text-smoke circle-32 bg-concrete hover-bg-blue mr-11 font-size-4"
            style={{ float: "right" }}
            onClick={() => toggleModal(null)}
          >
            <i className="fa fa-plus fa-sm"></i>
          </a>}
        </h4>
        {userExperiences.map((userExperience) => (
          <Experience
            userExperience={userExperience}
            key={userExperience.id}
            toggleModal={(obj) => toggleModal(obj)}
            pdfHide={pdfHide}
          />
        ))}
      </div>
    </>
  );
}
