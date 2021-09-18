import React from "react";
import Link from "next/link";
import PageWrapper from "../components/PageWrapper";
import ILogomid from "../assets/ILogomid.png";
import imgError from "../assets/image/404.png";

const Contact = () => {
  return (
    <>
      <PageWrapper>
        <div className="header pt-11 pos-abs-tl w-100">
          <div className="container">
            <div className="row">
              <div className="col-15 text-center">
                <Link href="/">
                  <a className="brand-logo">
                    <img src={ILogomid} alt="" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="401-page bg-default min-h-100vh flex-all-center pt-lg-15 pt-xxl-17 pt-20 pb-lg-0 pb-10">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7 px-lg-9">
                <div
                  className="card-404 text-center"
                  data-aos="zoom-in"
                  data-aos-duration="1000"
                >
                  <img  src={imgError} alt="" className="w-100 px-9" />
                  <div className="404-texts pt-09">
                    <h4 className="card-title font-size-9 font-weight-bold">
                      Not found!
                    </h4>
                    {/* <!-- card-texts start --> */}
                    <p className="card-text font-size-4 px-xxl-28 px-xs-10 px-sm-13 px-lg-13 px-md-28 px-xl-22 px-0 mb-8">
                      The requested page was not found.
                    </p>
                    {/* <!-- card-texts end --> */}
                    <Link href="/">
                      <a className="btn btn-blue btn-h-50 text-white rounded-5 w-180 m-auto text-uppercase">
                        Back to home
                      </a>
                    </Link>
                  </div>
                </div>
                {/* <!-- card end --> */}
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};
export default Contact;
