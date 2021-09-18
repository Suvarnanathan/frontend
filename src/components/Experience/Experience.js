import React from "react";
import imgL from "../../assets/image/svg/icon-loaction-pin-black.svg";
export default function Experience({ userExperience, toggleModal, pdfHide }) {
  return (
    <div className="w-100">
      {pdfHide == 1 && (
        <a
          className="text-smoke circle-32 bg-concrete hover-bg-blue mr-11 font-size-4"
          style={{ float: "right" }}
          onClick={() => toggleModal(userExperience)}
        >
          <i className="fa fa-pen"></i>
        </a>
      )}
      <div
        className={
          pdfHide == 0
            ? "d-flex align-items-center pr-11 mb-5 flex-wrap flex-sm-nowrap"
            : "d-flex align-items-center pr-11 mb-9 flex-wrap flex-sm-nowrap"
        }
      >
        <div className="w-100 mt-n2">
          <a className="font-size-5 text-black-2 font-weight-semibold">
            {userExperience.jobSubCategory.name}
          </a>
          <a className="font-size-4 text-default-color line-height-2"></a>{" "}
          <div className="d-flex align-items-center justify-content-md-between flex-wrap">
            <a className="font-size-4 text-gray mr-5">
              {userExperience.convertStartDate} -{" "}
              {userExperience.isCurrentlyWork
                ? "Present"
                : userExperience.convertEndDate}{" "}
              . {userExperience.experience}
            </a>
          </div>
          <a className="font-size-4 text-default-color line-height-2">
            {pdfHide == 1 && (
              <span
                className="mr-"
                css={`
                  margin-top: -2px;
                  padding-right: 7px;
                `}
              >
                <img src={imgL} alt="" />
              </span>
            )}
            {userExperience.country.name}
          </a>
        </div>
      </div>
    </div>
  );
}
