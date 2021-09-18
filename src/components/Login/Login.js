import React, { useEffect, useState } from "react";
import Link from "next/link";
import imgP from "../../assets/ILogomid.png";
import { useRouter } from "next/router";
import { getCandidates, getPersonalInfo, logIn } from "../../utils/api";
import { ERROR_STATUS, IS_AUTH } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthDetails, loginError, loginSucess } from "../../redux/actions/authAction";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [loginDetails, setLoginDetails] = useState({
    email: "admin@admin.com",
    password: "password",
  });

  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(true);

  const handleOnChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    logIn(loginDetails)
      .then((res) => {
        getPersonalInfo(res.data.results.id).then((user) => {
          dispatch(loginSucess(user))
        }).catch();
        res?.data?.results?.role === "admin"
          ? router.push("/dashboard-applicants")
          : router.push("/profile")
        const data = res?.data?.results
        dispatch(fetchAuthDetails({ ...res?.data?.results, isAuth: localStorage.getItem(IS_AUTH) }))
      })
      .catch((err) => {
        localStorage.getItem(ERROR_STATUS) != 400 &&
          router.push(`/${localStorage.getItem(ERROR_STATUS)}`);
        err.error ? setError(err.error) : setError(err);
        dispatch(loginError())
      });
  };

  return (
    <div className="login d-flex justify-content-center flex-column border-3">
      <div className="login-logo">
        <img className="login-img" src={imgP} alt="logo" />
      </div>
      <div className="login-body shadow-4">
        <div className="font-size-6 pb-5 text-black-2 font-weight-semibold">
          Sign in
        </div>
        <form>
          {error.message ? (
            <span style={{ fontSize: 12, color: "red" }}>{error.message}</span>
          ) : (
            ""
          )}
          <div className="form-group">
            <label
              htmlFor="email"
              className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
            >
              E-mail
            </label>
            <input
              type="email"
              value={loginDetails?.email}
              className="form-control"
              placeholder="example@gmail.com"
              id="email"
              name="email"
              onChange={handleOnChange}
            />
            {error?.email && (
              <span style={{ fontSize: 12, color: "red" }}>{error?.email}</span>
            )}
          </div>
          <div className="form-group">
            <label
              htmlFor="password"
              className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
            >
              Password
            </label>
            <div className="position-relative">
              <input
                type={showPassword ? "password" : "text"}
                value={loginDetails?.password}
                className="form-control"
                id="password"
                placeholder="Enter password"
                name="password"
                onChange={handleOnChange}
              />
              {error?.password && (
                <span style={{ fontSize: 12, color: "red" }}>
                  {error?.password}
                </span>
              )}
              <a
                href="/#"
                className="show-password pos-abs-cr fas mr-6 text-black-2"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
              >
                {/* <span className="d-none">none</span> */}
              </a>
            </div>
          </div>
          <div className="form-group d-flex flex-wrap justify-content-between">
            {/* <label
              htmlFor="terms-check"
              className=" d-flex  mr-3"
            >
              <input
                className=""
                type="checkbox"
                id="terms-check"
              />
              <span className="checkbox mr-5"></span>
              <span className="font-size-3 mb-0 line-height-reset mb-1 ">Remember password</span>
            </label> */}
            <a href="/password/forgetPassword" className="font-size-3 text-dodger line-height-reset">
              Forgot Password?
            </a>
          </div>
          <div className=" form-group mb-8 text-center">
            {/* <Link href='dashboard-applicants'> */}
            <button
              className="btn btn-secondary btn-sm btn-block rounded-8 font-size-4"
              onClick={handleClick}
            >
              Sign in
            </button>
            {/* </Link> */}
          </div>
        </form>
      </div>
      <div>
        <p className="font-size-4 text-center pt-5">
          {/* <span>New to Ipartner? </span>&nbsp;
          <a href="/#" className="font-size-3 text-dodger line-height-reset">
            {" "}
            Join now{" "}
          </a> */}
        </p>
      </div>
    </div>
  );
};

export default Login;
