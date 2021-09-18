import React, { useEffect, useState } from "react";
import { Modal, Tab } from "react-bootstrap";
import Link from "next/link";
import PageWrapper from "../../../components/PageWrapper";
import ProfileSidebar from "../../../components/ProfileSidebar";
import WorkExperience from "../../../components/CandidateProfile/WorkExperience";
import CertificatesAndLicense from "../../../components/CandidateProfile/CertificatesAndLicense";
import Education from "../../../components/CandidateProfile/Education";
import {
  getCountries,
  getJobSubCategories,
  getPersonalInfo,
  getSkills,
  sendMail,
} from "../../../utils/api";
import { useRouter } from "next/router";
import { jsPDF, HTMLOptionImage } from "jspdf";
const PdfInfo = () => {

  const generatePdf = () => {
    const pdfElement = document.querySelector("div#pdf-element");
      const pdf = new jsPDF({ unit: "px", format: "A4", userUnit: "px" });
    pdf.html(pdfElement, {
      html2canvas: { scale: 0.60 },
        "onrendered": function(canvas) {
          document.body.appendChild(canvas);
        }
    })
      .then(() => {
        pdf.save("test.pdf");
        // window.open(pdf.output('pdf'));
        var binary = pdf.output();
        let formData = new FormData();
        formData.append("resume", binary ? btoa(binary) : "");
        sendMail(formData).then(res => console.Console).catch(err => console.log(err));
      });

  };

  const [countries, setCountries] = useState([]);
  const [jobSubCategories, setJobSubCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [personalInfo, setPersonalInfo] = useState({});
  const router = useRouter();
  const { userId } = router.query;
  
  useEffect(() => {
    getCountries()
      .then((res) => setCountries(res))
      .catch((err) => console.log(err));
    getJobSubCategories()
      .then((res) => setJobSubCategories(res))
      .catch((err) => console.log(err));
    getSkills()
      .then((res) => setSkills(res))
      .catch((err) => console.log(err));
  }, []);
  const getPersonalInfoData = () => {
    userId &&
      getPersonalInfo(userId)
        .then((data) => setPersonalInfo(data))
        .catch((err) => console.log(err));
  }
 
  useEffect(() => {
    getPersonalInfoData()
  }, [userId]);

  const pdfHide = false;
  return (
    <>
    <Modal.Body className="p-0" style={{ width: '800px', marginLeft:"auto", marginRight:"auto"}}>
      <PageWrapper headerConfig={{ button: "profile" }}>
        <div className="bg-default-2 pt-22 pt-lg-25 pb-13 pb-xxl-32" style={{overflow: "auto"}}>
          <div className="container">
            {/* <!-- back Button --> */}
            <div className="row justify-content-center">
              <div className="col-12 dark-mode-texts">
                <div className="mb-9">
                  <Link href="/dashboard-applicants">
                    <a className="d-flex align-items-center ml-4">
                      <i className="icon icon-small-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
                      <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                        Back
                      </span>
                    </a>
                  </Link>
                  <button className="btn btn-outline-gray btn-xl mb-7 d-block mx-auto text-uppercase" onClick={generatePdf}>
                    Get PDF
                    </button>
                </div>

              </div>

            </div>
            {/* <!-- back Button End --> */}
            <div className="row" id="pdf-element">
              {/* <!-- Left Sidebar Start --> */}
              <div className="col-4" style={{ backgroundColor:"#535559"}}>
                <ProfileSidebar personalInfo={personalInfo} 
                getPersonalInfoData={getPersonalInfoData} 
                countries={countries} 
                userId={userId} 
                skills={skills} 
                pdfHide={pdfHide}/>

              </div>
              {/* <!-- Left Sidebar End --> */}
              {/* <!-- Middle Content --> */}
              <div className="col-8 order-2" style={{marginLeft:"-27px", marginTop:"-12px", width:"300px"}}>
                <Tab.Container id="left-tabs-example" defaultActiveKey="one">
                  <div className="shadow-9" style={{width:"520px", backgroundColor:"#e4e6eb"}}>
                    <Tab.Content>
                      <Tab.Pane eventKey="one">
                        {/* <!-- Excerpt Start --> */}
                        <div style={{width:"480px", paddingLeft:"30px"}}>
                          <h4 className="font-size-6 mb-2 mt-5 text-black-2 font-weight-semibold">
                            <br/>
                            Summary
                          </h4>
                          <p className="font-size-4 mb-4">
                            {personalInfo.about}
                          </p>
                        </div>
                        
                        <div className="ml-xxs-0 ml-xs-n6" style={{width:"480px"}}>
                        {/* <Skill skills={skills} userId={userId} pdfHide={pdfHide}/> */}
                        
                        <WorkExperience
                          jobSubCategories={jobSubCategories}
                          countries={countries}
                          userId={userId}
                          pdfHide={pdfHide}
                        />
                        <Education 
                        pdfHide={pdfHide}/>
                        <CertificatesAndLicense 
                        pdfHide={pdfHide}/>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </div>
                </Tab.Container>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
      </Modal.Body>
    </>
  );
};
export default PdfInfo;
