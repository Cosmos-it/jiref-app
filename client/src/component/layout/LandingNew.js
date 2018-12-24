import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import Footer from "./Footer";
import Modal from "../common/Modal";

class LandingNew extends Component {
  
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  showModal = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    const coming = {
      marginTop: "80px",
      marginBottom: "80px",
      padding: '40px',
      textAlign: "center"
    };

    return (
      <div className="">
        {/* <!-- Hero--> */}
        <section className="module-cover">
          <div className="container">
            <div className="row">
              <div className="col-md-10 m-auto text-center">
                <div className="blockquote">
                  <p>Gain invaluable skills on Jiref</p>
                </div>
                <br />
                <Link to="/waitlist" id="btn" className="btn btn-lg btn-primary button-join" onClick={this.showModal}>
                  <span style={{ textTransform: "" }}>Join beta today</span>
                </Link>
                {/* Modal testing */}
                <Modal show={this.state.isOpen}>
                  <p>Modal</p>
                  <p>Data</p>
                </Modal>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- Hero end--> */}

        <div className="row">
          <div className="col-md-12" style={coming}>
            <h5>
              Join the knowledge movement to build mpressive portfolio.
            </h5>

            <p className="lead">Wikipedia definition <br/>
            <i><q>Mentorship is a relationship in which a more experienced or more knowledgeable person helps <br/>to guide a less experienced or less knowledgeable person</q>
            </i></p>
   
          </div>
        </div>

        {/* Display background */}
        <div className="row background-center" />

        <div className="row areas-of-focus">
          <div className="col-md-3 m-auto">
            <h2>Areas of focus</h2>
            <div>
              <ul className="list-group">
                <li className="list-group-item">Software/Application development</li>
                <li className="list-group-item">Product management</li>
                <li className="list-group-item">Product marketing</li>
                <li className="list-group-item">Leadership</li>
                <li className="list-group-item">Interview practice</li>
                <li className="list-group-item">Self development</li>
     
              </ul>
            </div>
          </div>
        </div>

        {/* <!-- Posts--> */}
        <section className="module">
          <div className="container">
          <h2>The process</h2>
          <br/>
            <div className="row text-center">
              <div className="col-md-4">
                <div className="card-xl">
                  <div className="card-body mb-10">
                  <i className="far fa-thumbs-up card-icon" />
                    <h4>Meet a mentor</h4>
                    <p className="overlay">
                      Connect with a mentor to seek guidiance. 
                      Mentorship exposes you to specific skills that might help you nagivate life/career.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card-xl">
                  <div className="card-body mb-10">
                    <i className="fas fa-tasks card-icon" />
                    <h4>Create an objective</h4>
                    <p className="overlay">
                      Discuss your career aspirations in software engineering/development, marketing, product management, coachingetc.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card-xl">
                  <div className="card-body mb-10">
                  <i className="fas fa-users card-icon" />
                    <h4>Join mastermind</h4>
                    <p className="overlay">
                      Join groups to brainstorm ideas and start crafting meaningful thoughts as you learn to be a team of player.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card-xl">
                  <div className="card-body mb-10">
                  <i className="fas fa-book card-icon" />
                    <h4>Build projects</h4>
                    <p className="overlay">
                      Improving your skills requires lots of practice and mistakes. The industry is moving in the "speed of light", don't be left behind.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card-xl">
                  <div className="card-body mb-10">
                  <i className="far fa-lightbulb card-icon" />
                    <h4>Learn new things</h4>
                    <p className="overlay">
                      Keep learning new things and let your curiosity drive you forward. 
                      Don't be too comfortable in one place.
                    </p>
                  </div>
                </div>
              </div>

              {/* <div className="col-md-4">
                <div className="card-xl">
                  <div className="card-body mb-10 ">
                    <h4>BECOME SUCCESSFUL</h4>
                    <i className="fas fa-trophy card-icon" />
                    <p className="overlay">
                      Continue to challenge yourself and ask mentors to help you in areas of
                      unfamiliarity so you succeed at work and outside of work.
                      Make it a habit and develop with passion.
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </section>
        {/* Posts end */}

        {/* Footer  */}
        <footer className="footer bg-dark">
          <div className="footer-widgets" />
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
