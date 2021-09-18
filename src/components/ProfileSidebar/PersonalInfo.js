import React, { useEffect } from "react";

export default function PersonalInfo({ pdfHide, personalInfo }) {
  useEffect(() => {}, []);
  return (
    <div className="px-9 pt-lg-5 pt-9 pt-xl-9 pb-5">
      {personalInfo.email && (
        <div className="mb-7">
          <p
            className={
              !pdfHide
                ? "font-size-4 mb-0 text-white"
                : "font-size-4 mb-0 text-black-2"
            }
          >
            Email Address
          </p>
          <div
            className={
              !pdfHide
                ? "font-size-3 text-white mr-5"
                : "font-size-3 text-gray mr-5"
            }
          >
            {personalInfo.email}
          </div>
        </div>
      )}
      {personalInfo.dob && (
        <div className="mb-7">
          <p
            className={
              !pdfHide
                ? "font-size-4 mb-0 text-white"
                : "font-size-4 mb-0 text-black-2"
            }
          >
            Date of Birth
          </p>
          <div
            className={
              !pdfHide
                ? "font-size-3 text-white mr-5"
                : "font-size-3 text-gray mr-5"
            }
          >
            {personalInfo.dob}
          </div>
        </div>
      )}
      {personalInfo.gender && (
        <div className="mb-7">
          <p
            className={
              !pdfHide
                ? "font-size-4 mb-0 text-white"
                : "font-size-4 mb-0 text-black-2"
            }
          >
            Gender
          </p>
          <div
            className={
              !pdfHide
                ? "font-size-3 text-white mr-5"
                : "font-size-3 text-gray mr-5"
            }
          >
            {personalInfo.gender}
          </div>
        </div>
      )}
      {personalInfo.city && (
        <div className="mb-7">
          <p className="font-size-4 mb-0 text-black-2">Address</p>
          <p className="font-size-3 text-gray">
            {personalInfo?.streetName && (
              <>
                <span>{personalInfo.streetName}</span>
                <br />
              </>
            )}

            <span>{personalInfo.city}</span>
            {personalInfo?.postalCode && (
              <span>,{personalInfo.postalCode}</span>
            )}
            <br />
            <span>{personalInfo.country?.name}</span>
          </p>
        </div>
      )}
    </div>
  );
}
