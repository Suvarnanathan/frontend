import axios from "axios";
import { ACCESS_TOKEN, AUTH_ROLE, AUTH_USER, ERROR_STATUS, IS_AUTH, URL } from "./constants";


let accessToken = "";

axios.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem(
      ACCESS_TOKEN
    )}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const getErrorStatus = (status, error) => {
  localStorage.removeItem(status)
  localStorage.setItem(status, error)
}

const getUserExperience = (userId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${URL}/job-experiences/user/${userId}`)
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((err) => {
        getErrorStatus(ERROR_STATUS, err.response.status)
        reject(err)
      });
  });
};
const createUserExperience = (newObject) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${URL}/job-experiences`, newObject)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        getErrorStatus(ERROR_STATUS, err.response.status)
        reject(err.response.data.error)
      });
  });
};
const updateUserExperience = (editObject) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${URL}/job-experiences/${editObject.id}`, editObject)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        getErrorStatus(ERROR_STATUS, err.response.status)
        reject(err.response.data.error)
      });
  });
};
const deleteUserExperience = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${URL}/job-experiences/${id}`)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        getErrorStatus(ERROR_STATUS, err.response.status)
        reject(err.response.data.error);
      });
  });
};

const getCertificateDetailsByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${URL}/certificates/user/${userId}`)
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((err) => {
        getErrorStatus(ERROR_STATUS, err.response.status)
        reject(err)
      });
  });
};

const getUsersByRole = (roleName) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${URL}/users/${roleName}`)
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((err) => {
        getErrorStatus(ERROR_STATUS, err.response.status)
        reject(err)
      });
  });
};

const getUserEducation = (userId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${URL}/educations/user/${userId}`)
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((err) => {
        getErrorStatus(ERROR_STATUS, err.response.status)
        reject(err)
      });
  });
};

const getPersonalInfo = (userId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${URL}/personal-infos/user/${userId}`)
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((err) => {
        getErrorStatus(ERROR_STATUS, err.response.status)
        reject(err)
      });
  });
};
const updatePersonalInfo = (personalInfo, id) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${URL}/personal-infos/${id}`, personalInfo)
      .then((response) => {
        resolve(response.data.message);
      })
      .catch((err) => {
        getErrorStatus(ERROR_STATUS, err.response.status)
        reject(err.response.data.error)
      });
  });
};
const updatePersonalInfoAbout = (aboutUser, userId) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${URL}/personal-infos/user/${userId}`, aboutUser)
      .then((response) => {
        resolve(response.data.message);
      })
      .catch((err) => {
        getErrorStatus(ERROR_STATUS, err.response.status)
        reject(err.response.data.error)
      });
  });
};
const CreatePersonalInfo = (newObject) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${URL}/personal-infos`, newObject)
      .then((response) => {
        resolve(response.data.message);
      })
      .catch((err) => {
        getErrorStatus(ERROR_STATUS, err.response.status)
        reject(err.response.data.error);
      });
  });
};
const createProfileImage = (personalInfoId, image) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${URL}/profile-images/${personalInfoId}`, image, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        getErrorStatus(ERROR_STATUS, err.response.status)
        reject(err)
      });
  });
};
const createUserEducation = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${URL}/educations`, data)
      .then((response) => {
        resolve(response.data.message);
      })
      .catch((err) => {
        getErrorStatus(ERROR_STATUS, err.response.status)
        reject(err.response.data.error);
      });
  });
};

const updateUserEducation = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${URL}/educations/${data.id}`, data)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        getErrorStatus(ERROR_STATUS, err.response.status)
        reject(err.response.data.error);
      });
  });
};

const deleteUserEducation = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${URL}/educations/${id}`)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        getErrorStatus(ERROR_STATUS, err.response.status)
        reject(err.response.data.error);
      });
  });
};

const getUserSkill = (userId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${URL}/skills/user/${userId}`)
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((err) => {
        getErrorStatus(ERROR_STATUS, err.response.status)
        reject(err)
      });
  });
};
const createUserSkills = (newObject) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${URL}/userSkills`, newObject)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        getErrorStatus(ERROR_STATUS, err.response.status)
        reject(err.response.data.error)
      });
  });
};
const getCountries = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${URL}/countries`)
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((err) => {
        getErrorStatus(ERROR_STATUS, err.response.status)
        reject(err)
      });
  });
};
const getJobSubCategories = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${URL}/job-sub-categories`)
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((err) => {
        getErrorStatus(ERROR_STATUS, err.response.status)
        reject(err)
      });
  });
};
const getJobCategories = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${URL}/job-categories`)
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((err) => {
        getErrorStatus(ERROR_STATUS, err.response.status)
        reject(err)
      });
  });
};

const getSkills = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${URL}/skills`)
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((err) => {
        getErrorStatus(ERROR_STATUS, err.response.status)
        reject(err)
      });
  });
};
const createCertificate = (certificateDetails) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${URL}/certificates`, certificateDetails)
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((err) => {
        getErrorStatus(ERROR_STATUS, err.response.status)
        reject(err.response.data.error)
      });
  });
};
const createCertificateImage = (certificateId, image) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${URL}/certificate-images/${certificateId}`, image, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        getErrorStatus(ERROR_STATUS, err.response.status)
        reject(err)
      });
  });
};
const signUp = (newObject) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${URL}/register`, newObject)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        getErrorStatus(ERROR_STATUS, err.response.status)
        reject(err.response.data.error)
      });
  });
};

const updateCertificate = (editObject) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${URL}/certificates/${editObject.id}`, editObject)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        getErrorStatus(ERROR_STATUS, err.response.status)
        reject(err.response.data.error)
      });
  });
};

const logIn = (data) => {
  localStorage.clear();
  return new Promise((resolve, reject) => {
    axios
      .post(`${URL}/login`, data)
      .then((res) => {
        resolve(res);
        accessToken = (res?.data?.results?.token)
        localStorage.setItem(ACCESS_TOKEN, accessToken)
        localStorage.setItem(AUTH_ROLE, res?.data?.results?.role)
        localStorage.setItem(IS_AUTH, true)
        localStorage.setItem(AUTH_USER, res?.data?.results?.id)
      })
      .catch((err) => {
        getErrorStatus(ERROR_STATUS, err.response?.status)
        reject(err.response.data);
      });
  });
};

const logOut = () => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${URL}/logout`)
      .then((res) => {
        resolve(res);
        localStorage.clear();
      })
      .catch((err) => {
        getErrorStatus(ERROR_STATUS, err.response.status)
        reject(err);
      });
  });
};

const forgotPassword = (data) => {
  console.log(data)
  return new Promise((resolve, reject) => {
    axios
      .post(`${URL}/password/email`,data)
      .then((res) => {
        resolve(res);
        console.log(res)
      })
      .catch((err) => {
        reject(err.response.data);
        console.log(err.response.data)
      });
  });
};

const resetPassword = (data) => {
  console.log(data)
  return new Promise((resolve, reject) => {
    axios
      .post(`${URL}/password/reset`,data)
      .then((res) => {
        resolve(res);
        console.log(res)
      })
      .catch((err) => {
        reject(err.response.data);
        console.log(err.response.data)
      });
  });
};

const searchCandidate = (searchString) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${URL}/user/Candidate/search`, searchString)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        getErrorStatus(ERROR_STATUS, err.response.status)
        reject(err.response);
      });
  });
};

const changePassword = (obj) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${URL}/change-password`, obj)
      .then((response) => {
        resolve(response.data.message);
      })
      .catch((err) => {
        getErrorStatus(ERROR_STATUS, err.response.status)
        reject(err.response.data.error);
      });
  });
};

const deleteCertificate = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${URL}/certificates/${id}`)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        getErrorStatus(ERROR_STATUS, err.response.status)
        reject(err)
      });
  });
};

const sendMail = (mailDetails) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${URL}/sendmail`, mailDetails)
     .then((response) => {
        resolve(response);
      })
      .catch((err) => reject(err.response.data.error));
  });
};

const getLicenseDetailsByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${URL}/licenses/user/${userId}`)
      .then((response) => {
        resolve(response.data.results);
        // console.log(response.data.results);
      })
      .catch((err) => reject(err));
  });
};

const createLicense = (licenseDetails) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${URL}/licenses`, licenseDetails)
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((err) => reject(err.response.data.error));
  });
};
const createLicenseImage = (licenseId, image) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${URL}/licenses/${licenseId}/image`, image, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => reject(err));
  });
};

const updateLicense = (editObject) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${URL}/licenses/${editObject.id}`, editObject)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => reject(err.response.data.error));
  });
};

const deleteLicense = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${URL}/licenses/${id}/delete`)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => reject(err));
  });
};
export {
  getCountries,
  getJobSubCategories,
  getJobCategories,
  signUp,
  logIn,
  logOut,
  forgotPassword,
  resetPassword,
  changePassword,
  searchCandidate,
  // experiences
  getUserExperience,
  createUserExperience,
  updateUserExperience,
  deleteUserExperience,
  // users
  getUsersByRole,
  // educations
  getUserEducation,
  createUserEducation,
  updateUserEducation,
  deleteUserEducation,
  // Personal info
  getPersonalInfo,
  updatePersonalInfo,
  updatePersonalInfoAbout,
  CreatePersonalInfo,
  createProfileImage,
  // skills
  getSkills,
  getUserSkill,
  createUserSkills,
  // certificate
  getCertificateDetailsByUserId,
  createCertificate,
  updateCertificate,
  deleteCertificate,
  sendMail,
  createCertificateImage,

  //licenses
  getLicenseDetailsByUserId,
  createLicense,
  createLicenseImage,
  updateLicense,
  deleteLicense,
};
