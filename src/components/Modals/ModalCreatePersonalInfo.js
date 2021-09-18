import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import { CreatePersonalInfo, getCountries } from "../../utils/api";
import { updatePersonalInfo } from '../../utils/api'
import { useRouter } from "next/router";
import { ERROR_STATUS } from "../../utils/constants";

const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;
const ModalCreatepersonalData = ({ isVisible, toggleCreateModal, getPersonalInfoData, countries }) => {
    const router = useRouter()
    const { userId } = router.query
    const [error, setError] = useState({});

    const handleClose = () => {
        setError({})
        toggleCreateModal();
    };
    const initialState = {
        userId,
        city: "",
        streetName: "",
        postalCode: "",
        gender: "",
        dob: "",
        countryId: "",
    }
    const [personalInfo, setPersonalInfo] = useState(initialState)
    useEffect(() => {
        setPersonalInfo(initialState)
    }, [userId]);


    const handleOnchange = (e) => {
        setPersonalInfo({
            ...personalInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleOnclick = (e) => {
        e.preventDefault();
        CreatePersonalInfo(personalInfo, userId).then(res => {
            getPersonalInfoData()
            toggleCreateModal()
            setPersonalInfo(initialState)
            setError({})
        }).catch((err) => {
            localStorage.getItem(ERROR_STATUS) === 500 &&
                router.push(`/${localStorage.getItem(ERROR_STATUS)}`);
            setError(err)
        });
    }

    return (
        <ModalStyled
            size="lg"
            centered
            show={isVisible}
            onHide={toggleCreateModal}>
            <Modal.Body className="p-0">
                <button
                    type="button"
                    className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
                    onClick={handleClose}>
                    <i className="fas fa-times"></i>
                </button>
                <div className=" pb-6 ">
                    <div className="container">
                        <div className="row justify-content-center mt-6">
                            <div className="col-xxl-9 col-xl-7 col-lg-8">
                                <h5 className=" text-center ">Create Profile</h5>
                                <hr />
                                <div className="bg-white">
                                    <form
                                        name="personal"
                                        data-netlify="true"
                                        data-netlify-honeypot="bot-field"
                                    >
                                        <div className="row">
                                            <div className="col-lg-6 mb-7">
                                                <label
                                                    htmlFor="title"
                                                    className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                                                >
                                                    Date Of Birth
                                                    </label>
                                                <input
                                                    className="form-control"
                                                    type="date"
                                                    className="form-control"
                                                    id="dob"
                                                    name="dob"
                                                    value={personalInfo.dob}
                                                    onChange={handleOnchange}
                                                    required
                                                />
                                                {error?.dob && <span style={{ fontSize: 12, color: 'red' }}>{error?.dob}</span>}
                                            </div>
                                            <div className="col-lg-6 mb-7">
                                                <label
                                                    htmlFor="address"
                                                    className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                                                >
                                                    Gender
                                                </label>
                                                <select value={personalInfo.gender} onChange={handleOnchange} className="form-control" placeholder="Select Job Title" name="gender" required>
                                                    <option value={undefined}>Select Gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                                {error?.gender && <span style={{ fontSize: 12, color: 'red' }}>{error?.gender}</span>}
                                            </div>
                                            <div className="col-lg-6 mb-7">
                                                <label
                                                    htmlFor="streetName"
                                                    className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                                                >
                                                    Street Name
                                                </label>
                                                <input
                                                    className="form-control"
                                                    name="streetName"
                                                    placeholder="Enter Street Name"
                                                    value={personalInfo.streetName}
                                                    onChange={handleOnchange}
                                                    required
                                                />
                                                {error?.streetName && <span style={{ fontSize: 12, color: 'red' }}>{error?.streetName}</span>}
                                            </div>
                                            <div className="col-lg-6 mb-7">
                                                <label
                                                    htmlFor="City"
                                                    className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                                                >
                                                    City
                                                </label>
                                                <input
                                                    className="form-control"
                                                    id="city"
                                                    name="city"
                                                    placeholder="Enter City"
                                                    value={personalInfo.city}
                                                    onChange={handleOnchange}
                                                    required
                                                />
                                                {error?.city && <span style={{ fontSize: 12, color: 'red' }}>{error?.city}</span>}
                                            </div>

                                            <div className="col-lg-6 mb-7">
                                                <label
                                                    htmlFor="postalCode"
                                                    className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                                                >
                                                    Postal Code
                                                </label>
                                                <input
                                                    className="form-control"
                                                    id="postalCode"
                                                    name="postalCode"
                                                    placeholder="Enter Postal Code"
                                                    value={personalInfo.postalCode}
                                                    onChange={handleOnchange}
                                                    required
                                                />
                                                {error?.postalCode && <span style={{ fontSize: 12, color: 'red' }}>{error?.postalCode}</span>}
                                            </div>


                                            <div className="col-lg-6 mb-7">
                                                <label
                                                    htmlFor="address"
                                                    className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                                                >
                                                    Country
                                                    </label>
                                                <select value={personalInfo.countryId} onChange={handleOnchange} className="form-control" placeholder="Select Job Title" name="countryId" required>
                                                    <option value={undefined}>Select Country</option>
                                                    {countries.map((country) => (
                                                        <option className="form-control"
                                                            id="countryId"
                                                            name="countryId"
                                                            value={country.id}
                                                            key={country.id}
                                                            onChange={handleOnchange}
                                                            required>{country.name}</option>
                                                    ))}
                                                </select>
                                                {error?.countryId && <span style={{ fontSize: 12, color: 'red' }}>{error?.countryId}</span>}
                                            </div>
                                            <div className="col-lg-12 pt-4">
                                                <button
                                                    className="btn btn-secondary btn-sm btn-block rounded-8 font-size-4"
                                                    onClick={handleOnclick}
                                                >
                                                    Create
                                             </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </ModalStyled>
    );
};

export default ModalCreatepersonalData;
