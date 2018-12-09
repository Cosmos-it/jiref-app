import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import Footer from './Footer';
// import Footer from "./Footer";
import image1 from "../../../src/assets/img/image-1.jpg";

class LandingNew extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    const talent = {
      fontSize: "15px",
      color: "white"
    };

    const color = {
      color: "white"
    };

    const coming = {
      marginTop: "90px",
      textAlign: "center"
    };

    return (
      <div>
        <div className="">
          {/* <!-- Hero--> */}
          <section className="module-cover">
            <div className="container">
              <div className="row">
                <div className="col-md-10 m-auto text-center">
                  <div className="blockquote"
                    style={{ fontWeight: "400", fontSize: "1.5rem" }}><p>Connect and collaborate with mentors and mentees</p></div>
                  <br />
                  <Link to="/waitlist" id="btn" className="btn btn-lg btn-primary button-join">
                    <span style={{ textTransform: 'uppercase' }}>
                      Join beta list now
                   </span>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* <!-- Hero end--> */}

          <div className="row">
            <div className="col-md-12" style={coming}>
              <h2 style={{ fontWeight: "400", fontSize: "30px", textTransform: 'uppercase' }}>Connect with diverse mentors and mentees with diverse experiences. </h2>
            </div>
          </div>
          <div className="row background-center"></div>

          {/* <!-- Posts--> */}
          <section className="module">
            <div className="container">
              <div className="row text-center">
                <div className="col-md-4">
                  <div className="card-xl">
                    <div className="card-body mb-10">
                      <h4>MENTORSHIP</h4>
                      <i className="far fa-thumbs-up card-icon"/>
                      <p className="overlay">
                      If you want to learn the ins and outs of your industry, a mentor from the 
                      industry can help speed up your next career moves. 
                      <br/>             
                      Mentorship brings out the best in you that you otherwise don't know.    
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div
                    className="card-xl">
                    <div className="card-body mb-10">
                      <h4>OBJECTIVES</h4>
                      <i
                        className="fas fa-tasks card-icon"
                      />
                      <p className="overlay">
                      Mentorship enables you to discuss your career aspirations, for example in software engineering/development, marketing, 
                      product management, etc. This creates a purpose for you on the platform moving forward.                        </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div
                    className="card-xl">
                    <div className="card-body mb-10">
                      <h4>MASTERMIND</h4>
                      <i
                        className="fas fa-users card-icon"
                      />
                      <p className="overlay">
                      Find groups or anyone on the platform that wants to help or work on a particular project so that you can both be accountable to each others success. 
                      Brainstorm ideas and start crafting meaningful thoughts as a team of learners.                      
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div
                    className="card-xl">
                    <div className="card-body mb-10">
                      <h4>PORTFOLIO</h4>
                      <i
                        className="fas fa-book card-icon"
                      />
                      <p className="overlay">
                      Normally, you want to choose a project to start. The projects allows for mistakes while improving 
                      your skills. Make use of the diverse experiences on the platform to get feedback. 
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div
                    className="card-xl">
                    <div className="card-body mb-10">
                      <h4>KNOWLEDGE</h4>
                      <i className="far fa-lightbulb card-icon"
                      />
                      <p className="overlay">
                      Experience skills growth while working on the projects you
                      created and chat with your mastermind teams. Knowledge can increase if do the difficult things you are scared of learning. Let your curiosity drive you forward.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card-xl">
                    <div className="card-body mb-10 ">
                      <h4>SUCCESS</h4>
                      <i className="fas fa-trophy card-icon"/>
                      <p className="overlay">
                      Your success comes with time when you do all the above while being a passionate problem solver. Continue to challenge yourself and ask mentors to 
                      help you in areas of unfamiliarity so you succeed at work and outside of work. Make it a habit and develop with passion.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Posts end */}

          {/* Footer  */}
          <footer className="footer bg-dark">
            <div className="footer-widgets">
            </div>

            <div className="footer-bar">
              <div className="container text-center">
                <div className="row">
                  <div className="col-md-12">
                      <Footer />
                  </div>
                </div>
              </div>
            </div>
          </footer>
          {/* <!-- Footer end--> */}
        </div>
      </div>
    );
  }
}

LandingNew.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(LandingNew);
