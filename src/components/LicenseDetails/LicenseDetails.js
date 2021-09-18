import React from "react";
export default function LicenseDetails({ userLicenseDetail,toggleModal, pdfHide }) {

  return (
    <div className="w-100">
        <div className={pdfHide==0?("d-flex align-items-center pr-11 mb-5 flex-wrap flex-sm-nowrap"):("d-flex align-items-center pr-11 mb-9 flex-wrap flex-sm-nowrap")}>
        {pdfHide==1 &&
      <div className="square-72 d-block mr-8 mb-7 mb-sm-0">
          <img src={userLicenseDetail?.image?.thumbPath} alt="new" style={{width:72,height:72,cursor:'pointer'}} onClick={()=> window.open(
              userLicenseDetail?.image?.publicPath, "_blank")}/>
        </div>
        }
        <div className="w-100 mt-n2">
          <h3 className="mb-0">
            <a className="font-size-6 text-black-2 font-weight-semibold">
              {userLicenseDetail.title}
            </a>
            {pdfHide==1 &&
          <a 
            className="text-smoke circle-32 bg-concrete hover-bg-blue font-size-4"
            style={{ float: "right" }}
            onClick={()=>toggleModal(userLicenseDetail)}
          >
            <i className="fa fa-pen fa-sm"></i>
          </a>}
          </h3>
        </div>
      </div>
    </div>
  );
}
