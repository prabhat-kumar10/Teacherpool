import React from "react";
import { Link, Element } from "react-scroll";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import herobanner from "../assets/herobanner.jpeg";
import services from "../assets/services.jpg";
import handbook from "../assets/handbook.svg";
import onboarding from "../assets/onboarding.svg";
import hiring from "../assets/hiring.svg";
import interview from "../assets/interview.svg";
import time from "../assets/time.svg";
import web_devices from "../assets/web_devices.svg";
import social_dashboard from "../assets/social_dashboard.svg";
import personalization from "../assets/personalization.svg";
import absorbed from "../assets/absorbed.svg";
import experts from "../assets/experts.svg";
import "../styles/Home.css";

const Home = () => {
  const handleSetActive = (to) => {
    console.log(to);
  };

  return (
    <>
      <NavBar />

      <div className="herobanner">
        <img src={herobanner} alt={"Introduction"} />
        <h1>Search Talent for your School</h1>
        <span>
          Looking for Teaching, Non Teaching and Administrative staffs for your
          School, Ed-Tech company or College?
        </span>
        <Link
          activeClass="active"
          to="footer"
          spy={true}
          smooth={true}
          onSetActive={handleSetActive}
        >
          <div className="btn-contact"> CONTACT US </div>
        </Link>
      </div>

      <div className="services">
        <section className="bg-light py-3 py-md-5 py-xl-8">
          <div className="container overflow-hidden">
            <h1>Services</h1>
            <div className="row gy-4 gy-md-5 gy-lg-0 align-items-center">
              <div className="col-12 col-lg-5">
                <div className="row">
                  <div className="col-12 col-xl-11">
                    <img src={services} alt={"Services"} />
                    <h2 className="text-center display-5 mb-3 mb-xl-4">
                      We are giving you perfect solutions with our proficient
                      services.
                    </h2>
                    <p className="mb-3 mb-xl-4">
                      Teacher Pool is an educational consultancy for Teaching,
                      Non Teaching and Administrative jobs working with K-12
                      schools, Ed-Tech companies, colleges & universities. We
                      provide you with the best screened and informed
                      candidate(s). Our Team of HR service providers are having
                      combined work experience of 15+ years working closely with
                      international K-12 schools , Ed-Tech companies and
                      colleges for pre primary, primary, middle, high and
                      college levels.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-7 overflow-hidden">
                <div className="row gy-4">
                  <div className="col-12 col-sm-6">
                    <div className="card border-0 border-bottom border-primary shadow-sm">
                      <div className="card-body text-center p-4 p-xxl-5">
                        <img src={hiring} alt={"Hiring"} />
                        <h4 className="mb-4">Teaching/Non Teaching Hiring</h4>
                        <p className="mb-4 text-secondary">
                          Teacher Pool's seasoned recruiters specialize in
                          hiring for (IB, IGCSE, American, ICSE, CBSE, State)
                          curriculum positions in India & abroad, covering a
                          range of academic, non-academic, and administrative
                          roles with extensive expertise.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="card border-0 border-bottom border-primary shadow-sm">
                      <div className="card-body text-center p-4 p-xxl-5">
                        <img src={onboarding} alt={"Onboarding"} />
                        <h4 className="mb-4">
                          Employee On Boarding Assistance
                        </h4>
                        <p className="mb-4 text-secondary">
                          Teacher Pool simplifies onboarding for educational
                          roles, handling documentation, reference checks, and
                          orientation for a seamless start in schools, Ed-Tech
                          companies, and colleges.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="card border-0 border-bottom border-primary shadow-sm">
                      <div className="card-body text-center p-4 p-xxl-5">
                        <img src={handbook} alt={"Handbook"} />
                        <h4 className="mb-4">Employee Handbook</h4>
                        <p className="mb-4 text-secondary">
                          Teacher Pool designs customized employee handbook for
                          all level of staffs like Academic Director, Principal,
                          Vice Principal, Coordinator, Teacher and Non Teaching
                          staff. We also create HRD Manual, Calendar for the
                          academic year.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="card border-0 border-bottom border-primary shadow-sm">
                      <div className="card-body text-center p-4 p-xxl-5">
                        <img src={interview} alt={"interview"} />
                        <h4 className="mb-4">Exit Interview</h4>
                        <p className="mb-4 text-secondary">
                          We conduct exit interview of employees and prepare
                          summarized analytical reports with insights to support
                          the institution for better employee retention,
                          improvement on key parameters to keep employees happy
                          and improve HR policies with time.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="why-us">
          <div className="container">
            <h1>Why Choose Us</h1>

            <div className="row">
              <div className="col-sm-6 col-lg-4">
                <div className="box">
                  <img src={absorbed} alt="" />
                  <div className="box-content">
                    <h4>Client-Centric</h4>
                    <p>
                      Understanding the client, evaluating their requirements
                      and acknowledging them with appropriate response on time.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-lg-4">
                <div className="box">
                  <img src={experts} alt="" />
                  <div className="box-content">
                    <h4>Professionalism and Dedication</h4>
                    <p>
                      Our commitment to professionalism ensures dedicated
                      service to meet your hiring requirements effectively.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-lg-4">
                <div className="box">
                  <img src={time} alt="" />
                  <div className="box-content">
                    <h4>Expat Recruitment Services</h4>
                    <p>
                      Specializing in recruiting international talent, we offer
                      expertise in expatriate placements.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-lg-4">
                <div className="box">
                  <img src={social_dashboard} alt="" />
                  <div className="box-content">
                    <h4>Marketing of your Organization</h4>
                    <p>
                      We enhance your organization's visibility through
                      strategic marketing efforts.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-lg-4">
                <div className="box">
                  <img src={personalization} alt="" />
                  <div className="box-content">
                    <h4>Customized Service Models</h4>
                    <p>
                      Tailoring our services to your unique needs, we provide
                      flexible and personalized recruitment solutions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-lg-4">
                <div className="box">
                  <img src={web_devices} alt="" />
                  <div className="box-content">
                    <h4>Tech-Driven Solutions</h4>
                    <p>
                      We employ cutting-edge technology for a streamlined and
                      efficient hiring process, ensuring top-notch results for
                      your organization.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Element name="footer">
        <Footer />
      </Element>
    </>
  );
};

export default Home;
