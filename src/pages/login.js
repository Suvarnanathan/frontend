import React from "react";
import PageWrapper from "../components/PageWrapper";

const Login = () => {
  return (
    <>
        {/* <div className="bg-default-2 pt-16 pb-12 pt-lg-22 pb-lg-27"> */}
          {/* <div className="container" > */}
            <div className="row justify-content-center mt-14">
              <div className="col-xxl-6 col-xl-7 col-lg-8">
                <h2 className="font-size-9 text-center mb-11">Login</h2>
                <div className="bg-white px-9 pt-9 pb-7 shadow-8 rounded-4" style={{borderColor:'black',borderWidth:1}}>
                  <form
                    name="contact"
                    method="post"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                  >
                    {/* You still need to add the hidden input with the form name to your JSX form */}
                    <input type="hidden" name="form-name" value="contact" />
                    <div className="row">
                      <div className="col-12 mb-7">
                        <label
                          htmlFor="name"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          User Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter User name"
                          id="name"
                          name="name"
                          required
                        />
                      </div>
                      <div className="col-12 mb-7">
                        <label
                          htmlFor="name"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Enter Password"
                          id="name"
                          name="name"
                          required
                        />
                      </div>
                     
                      <div className="col-lg-12 pt-4">
                        <a
                          href="/dashboard-applicants"
                          type="submit"
                          className="btn btn-primary text-uppercase w-100 h-px-48"
                        >
                          Login
                        </a>
                      </div>
                    </div>
                  </form>
                 
                </div>
              </div>
            </div>
          {/* </div> */}
        {/* </div> */}
    </>
  );
};
export default Login;
