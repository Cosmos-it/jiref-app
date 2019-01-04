import React, { Component } from "react";

export default class About extends Component {
  render() {
    return (
      <div>
        <div className="about text-center">
          <h1>Welcome to Jiref</h1>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <h2>What is the meaning of Jiref? </h2>
              <p className="lead">
                A person with the potential to
                succeed if given the right situation. They tend
                to be creative with freedom, generous with their time and enjoy
                learning new things.
              </p>

              <h2>What is this platform?</h2>
              <p className="lead">
                Jiref platform provides a way for mentors and mentees to connect
                with a sole purpose to unleash each other's potentials to allow
                growth that will naturally influence their day to day decisions.
              </p>

              <h2>Who is Jiref for?</h2>
              <ul>

                <li className="lead">
                  Recent grads from colleges, bootcamps who might be lookng for first time job or internship.
                </li>
                <li className="lead">
                  Returning professionals who took long break from their career.
              </li>

                <li className="lead">
                  Individuals with non-traditional background — mostly startups and self-taught individuals.
              </li>
              </ul>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
