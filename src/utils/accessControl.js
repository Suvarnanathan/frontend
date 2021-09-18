import { ADMIN, USER } from "./constants";

const adminAccess = [
  "/",
  "/dashboard-applicants",
  // "/dashboard-main",
  "/dashboard-applicants/[userId]",
  "/dashboard-applicants/mail",
  "/candidates/[userId]/resume",
  "/profile",
  "/password/forgetPassword",
  // "/password/reset",
  "/password/test/[...mytest]",
  "/password/reset/[token]/[mail]",
  "/401",
  "/403",
  "/404",
  "/500",

];
const userAccess = [
  "/",
  "/candidates/[userId]",
  "/password/forgetPassword",
  // "/password/reset",
  "/password/test/[...mytest]",
  "/password/reset/[token]/[mail]",
  "/profile",
  "/401",
  "/403",
  "/404",
  "/500",
];
let isAccess = false
export const accessControl = (path, role) => {
  if (role === ADMIN) {
    adminAccess.find(ad => ad === path) && adminAccess.find(ad => ad === path) != undefined ? isAccess = true : isAccess = false
  }
  if (role === USER) {
    userAccess.find(ad => ad === path) && userAccess.find(ad => ad === path) != undefined ? isAccess = true : isAccess = false
  }
  return isAccess
}