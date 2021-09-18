import React, { useEffect, useState } from "react";
import Link from "next/link";
import imgP from "../../../../../assets/ILogomid.png";
import { resetPassword } from "../../../../../utils/api";
import { useRouter } from "next/router";

const ResetPassword = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(true);
  const [showCPassword, setShowCPassword] = useState(true);
  const [data, setData] = useState({token: "", email: "", password: "", password_confirmation: "" })
  const [error, setError] = useState({});

  const handleOnChange=(e)=>{
    setData({
      ...data,
      [e.target.name]:e.target.value
    })
  }


  const handleClick = (e) => {
    e.preventDefault();
    setError({})
    matchPassword(data.password,data.password_confirmation)
    const {token,mail}=router.query
    resetPassword({...data,token,email:mail})
      .then((res) => {
        console.log(res)
        res && router.push("/")
      })
      .catch((err) => {
        console.log(err)
        err.error ? setError(err.error) : setError(err);
      });
  }

  const matchPassword=(pwd,cpwd)=>{
    if(pwd!=cpwd) {return false}  return true
  }

  return (
    <div className="login d-flex justify-content-center flex-column border-3">
      <div className="login-logo">
        <img className="login-img" src={imgP} alt="logo" />
      </div>
      <div className="login-body shadow-4">
        <div className="font-size-6 pb-5 text-black-2 font-weight-semibold">
          Reset your password
        </div>
        <form>
        <div className="form-group">
            <label
              htmlFor="email"
              className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
            >
              E-mail
            </label>
            <input
              type="email"
              value={router.query.mail}
              className="form-control"
              placeholder="example@gmail.com"
              id="email"
              name="email"
              disabled
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="password"
              className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
            >
              Password *
            </label>
            <div className="position-relative">
              <input
                type={showPassword ? "password" : "text"}
                value={data?.password}
                className="form-control"
                id="password"
                placeholder="Enter password"
                name="password"
                onChange={handleOnChange}
              />
              <a
                href="#"
                className="show-password pos-abs-cr fas mr-6 text-black-2"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
              >
                {/* <span className="d-none">none</span> */}
              </a>
            </div>
            {error?.password && (
              <span style={{ fontSize: 12, color: "red" }}>{error?.password}</span>
            )}
          </div>
          <div className="form-group">
            <label
              htmlFor="confirmPassword"
              className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
            >
              Confirm Password *
            </label>
            <div className="position-relative">
              <input
                type={showCPassword ? "password" : "text"}
                value={data?.password_confirmation}
                className="form-control"
                id="confirmPassword"
                placeholder="Enter confirm password"
                name="password_confirmation"
                onChange={handleOnChange}
              />
              <a
                href="#"
                className="show-password pos-abs-cr fas mr-6 text-black-2"
                onClick={(e) => {
                  e.preventDefault();
                  setShowCPassword(!showCPassword);
                }}
              >
                {/* <span className="d-none">none</span> */}
              </a>
            </div>
            {error?.cpwd && (
              <span style={{ fontSize: 12, color: "red" }}>{error?.cpwd}</span>
            )}
          </div>
          <div className=" form-group mb-8 text-center">
            {/* <Link href='dashboard-applicants'> */}
            <button
              className="btn btn-secondary btn-sm btn-block rounded-8 font-size-4"
              onClick={handleClick}
            >
              Reset Password
            </button>
            {/* </Link> */}
          </div>
        </form>
      </div>
      <div>
        <p className="font-size-4 text-center pt-5">
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
