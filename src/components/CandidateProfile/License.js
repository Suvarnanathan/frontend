import React, { useEffect, useState } from "react";
import { getLicenseDetailsByUserId } from "../../utils/api";
import { useRouter } from "next/router";
import ModalLicense from "../Modals/ModalLicense";
import LicenseDetails from "../LicenseDetails/LicenseDetails";

export default function License({ pdfHide }) {
  const router = useRouter();
  const { userId } = router.query;
  const [isVisible, setIsVisible] = useState(false);
  const [userLicenseDetails, setUserLicenseDetails] = useState([]);
  const [licenseEditObj, setLicenseEditObj] = useState(null);
  const toggleModal = (obj) => {
    setIsVisible(!isVisible);
    setLicenseEditObj(obj);
  };
  const getLicenseDetails = () => {
    userId && getLicenseDetailsByUserId(userId).then((data) => setUserLicenseDetails(data));
  }
  useEffect(() => {
    getLicenseDetails();
  }, [userId]);
  return (
    <>
      <ModalLicense
        isVisible={isVisible}
        toggleModal={toggleModal}
        getLicenseDetailsByUserId={getLicenseDetailsByUserId}
        licenseEditObj={licenseEditObj}
        userId={userId}
        getLicenseDetails={getLicenseDetails}
      />
      <div
        className={
          pdfHide == 0
            ? "p-5 pl-xs-12 pt-7 pb-5"
            : "border-top p-5 pl-xs-12 pt-7 pb-5"
        }
      >
        <h4
          className={
            pdfHide == 0
              ? "font-size-6 mb-0 mt-0 text-black-2 font-weight-semibold"
              : "font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold"
          }
        >
          Licenses
          {pdfHide == 1 && (
            <a
              onClick={toggleModal}
              className="text-smoke circle-32 bg-concrete hover-bg-blue mr-11 font-size-4"
              style={{ float: "right" }}
              onClick={() => toggleModal(null)}
            >
              <i className="fas fa-plus center fa-sm"></i>
            </a>
          )}
        </h4>
        {userLicenseDetails?.map((userLicenseDetail) => (
          <LicenseDetails
            userLicenseDetail={userLicenseDetail}
            key={userLicenseDetail.id}
            toggleModal={(obj) => toggleModal(obj)}
            pdfHide={pdfHide}
          />
        ))}
      </div>
    </>
  );
}
