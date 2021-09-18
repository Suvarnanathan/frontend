import React, { useEffect, useState } from "react";
import { getCertificateDetailsByUserId } from "../../utils/api";
import Certificate from "../Certificate/Certificate";
import ModalCertificate from "../Modals/ModalCertificate";
import { useRouter } from "next/router";
import { ERROR_STATUS } from "../../utils/constants";
export default function CertificatesAndLicense({ pdfHide }) {
  const router = useRouter()
  const { userId } = router.query
  const [isVisible, setIsVisible] = useState(false);
  const [userCertificateDetails, setUserCertificateDetails] = useState([]);
  const [certificateEditObj, setCertificateEditObj] = useState(null);
  const toggleModal = (obj) => {
    setIsVisible(!isVisible);
    setCertificateEditObj(obj);
  };
  const getCertificateDetails = () => {
    userId && getCertificateDetailsByUserId(userId).then((data) => setUserCertificateDetails(data)).catch(err => {
      localStorage.getItem(ERROR_STATUS) != 400 &&
      router.push(`/${localStorage.getItem(ERROR_STATUS)}`);
    });

  }
  useEffect(() => {
    getCertificateDetails();
  }, [userId]);

  return (
    <>
      <ModalCertificate
        isVisible={isVisible}
        toggleModal={toggleModal}
        getCertificateDetailsByUserId={getCertificateDetailsByUserId}
        certificateEditObj={certificateEditObj}
        userId={userId}
        getCertificateDetails={getCertificateDetails}
      />
      <div className={pdfHide == 0 ? ("p-5 pl-xs-12 pt-7 pb-5") : ("border-top p-5 pl-xs-12 pt-7 pb-5")}>
        <h4 className={pdfHide == 0 ? ("font-size-6 mb-0 mt-0 text-black-2 font-weight-semibold") : ("font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold")}>
          Certifications
        {pdfHide == 1 && (
            <a onClick={toggleModal}
              className="text-smoke circle-32 bg-concrete hover-bg-blue mr-11 font-size-4"
              style={{ float: "right" }}
              onClick={() => toggleModal(null)}
            >
              <i className="fas fa-plus center fa-sm"></i>
            </a>)}

        </h4>
        {userCertificateDetails.map((userCertificateDetail) => (
          <Certificate
            userCertificateDetail={userCertificateDetail}
            key={userCertificateDetail.id}
            toggleModal={(obj) => toggleModal(obj)}
            pdfHide={pdfHide}
          />
        ))}
      </div>
    </>
  );
}
