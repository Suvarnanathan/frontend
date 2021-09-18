import React, { useEffect, useState } from "react";
import Link from "next/link";
import imgP from "../../assets/ILogomid.png";
import { forgotPassword } from "../../utils/api";
import { useRouter } from "next/router";

const ForgetPassword = () => {
  const router = useRouter();

  const [email, setMail] = useState({ email: "" })
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState({});

  const handleClick = (e) => {
    e.preventDefault();
    setError({})
    
    forgotPassword(email)
      .then((res) => {
        console.log(res)
        res && setMsg(res?.data?.message)
        res && setShow(true)
      })
      .catch((err) => {
        console.log(err)
        err.error ? setError(err.error) : setError(err);
      });
  }

  const handleBack=(e)=>{
    e.preventDefault();
    router.push("/")
  }

  return (
    <div className="login d-flex justify-content-center flex-column border-3">
      {show && <div className="alert alert-success alert-dismissible ">
        <a href="#" onClick={() => setShow(false)} className="close" data-dismiss="alert" aria-label="close">&times;</a>
        <strong>{msg}</strong>
      </div>}
      <div className="login-logo">
        <img className="login-img" src={imgP} alt="logo" />
      </div>
      <div className="login-body shadow-4">
        <div className="font-size-6 pb-5 text-black-2 font-weight-semibold">
          Forgot your password?
        </div>
        <form>
          <div className="form-group">
            <label
              htmlFor="email"
              className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
            >
              E-mail *
            </label>
            <input
              type="email"
              value={email.email}
              className="form-control"
              placeholder="example@gmail.com"
              id="email"
              name="email"
              onChange={e => setMail({ email: e.target.value })}
            />
            {error?.email && (
              <span style={{ fontSize: 12, color: "red" }}>{error?.email}:{console.log(error)}</span>
            )}
          </div>
          <div className=" form-group mb-8 text-center">
            <button
              className="btn btn-link btn-xs rounded-8 font-size-4"
              onClick={handleBack}
            >
              Cancel
            </button>&nbsp;&nbsp;
            <button
              className="btn btn-secondary btn-sm rounded-8 font-size-4"
              onClick={handleClick}
            >
              Click
            </button>
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

export default ForgetPassword;
