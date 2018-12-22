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
                  <p>Platform for mentors & mentees</p>
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
            <h2>
              Knowledge is foundation when diverse mentors and mentees share
              experiences
            </h2>
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
            <div className="row text-center">
              <div className="col-md-4">
                <div className="card-xl">
                  <div className="card-body mb-10">
                    <h4>MENTORSHIP</h4>
                    <i className="far fa-thumbs-up card-icon" />
                    <p className="overlay">
                      If you want to learn the ins and outs of your industry, a
                      mentor from the industry can help speed up your next
                      career moves.
                      <br />
                      Mentorship brings out the best in you that you otherwise
                      don't know.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card-xl">
                  <div className="card-body mb-10">
                    <h4>OBJECTIVES</h4>
                    <i className="fas fa-tasks card-icon" />
                    <p className="overlay">
                      Mentorship enables you to discuss your career aspirations,
                      for example in software engineering/development,
                      marketing, product management, etc. This creates a purpose
                      for you on the platform moving forward.{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card-xl">
                  <div className="card-body mb-10">
                    <h4>MASTERMIND</h4>
                    <i className="fas fa-users card-icon" />
                    <p className="overlay">
                      Find groups or anyone on the platform that wants to help
                      or work on a particular project so that you can both be
                      accountable to each others success. Brainstorm ideas and
                      start crafting meaningful thoughts as a team of learners.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card-xl">
                  <div className="card-body mb-10">
                    <h4>PORTFOLIO</h4>
                    <i className="fas fa-book card-icon" />
                    <p className="overlay">
                      Normally, you want to choose a project to start. The
                      projects allows for mistakes while improving your skills.
                      Make use of the diverse experiences on the platform to get
                      feedback.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card-xl">
                  <div className="card-body mb-10">
                    <h4>KNOWLEDGE</h4>
                    <i className="far fa-lightbulb card-icon" />
                    <p className="overlay">
                      Experience skills growth while working on the projects you
                      created and chat with your mastermind teams. Knowledge can
                      increase if do the difficult things you are scared of
                      learning. Let your curiosity drive you forward.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card-xl">
                  <div className="card-body mb-10 ">
                    <h4>SUCCESS</h4>
                    <i className="fas fa-trophy card-icon" />
                    <p className="overlay">
                      Your success comes with time when you do all the above
                      while being a passionate problem solver. Continue to
                      challenge yourself and ask mentors to help you in areas of
                      unfamiliarity so you succeed at work and outside of work.
                      Make it a habit and develop with passion.
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
