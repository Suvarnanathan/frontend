// import App from 'next/app'
import Layout from "../components/Layout";
import { GlobalProvider } from "../context/GlobalContext";
import "../assets/fonts/fontawesome-5/webfonts/fa-brands-400.ttf";
import "../assets/fonts/fontawesome-5/webfonts/fa-regular-400.ttf";
import "../assets/fonts/fontawesome-5/webfonts/fa-solid-900.ttf";

import "../assets/fonts/icon-font/fonts/avasta.ttf";
import "../assets/fonts/icon-font/css/style.css";

import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
import "../../node_modules/aos/dist/aos.css";

import "../assets/fonts/icon-font/css/style.css";
import "../assets/fonts/fontawesome-5/css/all.css";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "../scss/bootstrap.scss";
import "../scss/main.scss";
import "../scss/login/login.scss";
import "../scss/profile/profileImages.scss";
import "../scss/bootstrap/utilities/multiInput.scss"
import { useEffect, useState } from "react";
import { accessControl } from "../utils/accessControl";
import { ACCESS_TOKEN, AUTH_ROLE, AUTH_USER, IS_AUTH } from "../utils/constants";
import Login from "../components/Login/Login";
import { Provider, useSelector } from "react-redux";
import store from "../redux/store";
import { createWrapper } from "next-redux-wrapper";
import { fetchAuthDetails, profileSucess } from "../redux/actions/authAction";
import { getPersonalInfo } from "../utils/api";
import { useDispatch } from "react-redux";

const MyApp = ({ Component, pageProps, router }) => {
  const dispatch = useDispatch();
  const authDetails = useSelector(state => state?.auth?.authDetails)

  const [isAllow, setIsAllow] = useState(true);
  const { authUser } = useSelector(state => state.auth)

  useEffect(() => {
    const data = {
      token: localStorage.getItem(ACCESS_TOKEN),
      role: localStorage.getItem(AUTH_ROLE),
      userId: localStorage.getItem(AUTH_USER),
      isAuth: localStorage.getItem(IS_AUTH),
    }
    dispatch(fetchAuthDetails(Object.keys(authDetails).length > 0 ? authDetails : data))
    data.isAuth && getPersonalInfo(data.userId).then((user) => {
          dispatch(profileSucess(user))
        }).catch();
  }, [])

  // useEffect(() => {
  //   router.pathname === "/" && localStorage.clear();
  //   if (!localStorage.getItem(ACCESS_TOKEN)) {
  //     router.pathname === "/password/forgetPassword" ? (setIsAllow(true),router.push("/password/forgetPassword")) : (router.pathname === "/password/reset" ?(setIsAllow(true),router.push("/password/reset")) : router.push("/"));
  //   } else if (
  //     !accessControl(router.pathname, localStorage.getItem(AUTH_ROLE))
  //   ) {
  //     router.push("/404");
  //   } else {
  //     setIsAllow(true);
  //   }
  //   !authUser && localStorage.getItem(IS_AUTH) && getPersonalInfo(localStorage.getItem(AUTH_USER)).then((user) => {
  //     dispatch(profileSucess(user))
  //   }).catch();
  // }, [router.pathname]);

  if (router.pathname.match(/404/)) {
    return (
      <GlobalProvider>
        <Layout pageContext={{ layout: "bare" }}>
          <Component {...pageProps} />
        </Layout>
      </GlobalProvider>
    );
  }
  const ComponentToRender = isAllow ? Component : Login;
  // const ComponentToRender = isAllow ? Component : (router.pathname === "/forgetPassword" ?ForgetPassword:Login);
  if (router.pathname.match(/dashboard/)) {
    return (
      <Provider store={store}>
        <GlobalProvider>
          <Layout pageContext={{ layout: "dashboard" }}>
            <ComponentToRender {...pageProps} />
          </Layout>
        </GlobalProvider>
      </Provider>
    );
  }
  return (
    <Provider store={store}>
      <GlobalProvider>
        <Layout pageContext={{}}>
          <ComponentToRender {...pageProps} />
        </Layout>
      </GlobalProvider>
    </Provider>
  );
};

const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(MyApp);