import React from "react";
import Footer from "../Footer/Footer"; // Import the Footer component
import "./ContactUs.css";

const ContactUs = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container mt-4 flex-grow-1">
        <div className="row">
          <div className="col-md-6 contactForm">
            <h2>Contact Us</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Your Name
                </label>
                <input type="text" className="form-control" id="name" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Your Email
                </label>
                <input type="email" className="form-control" id="email" />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  rows="4"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary sendMsgbtn">
                Send Message
              </button>
            </form>
          </div>
          <div className="col-md-6 maps">
            <h2>Location</h2>
            <div className="mb-3">
              <iframe
                title="Holidaze Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d785051.4603053727!2d10.352571319708248!3d63.42212767851154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4616fc10197b7f7d%3A0x7fb1c57e767d70d7!2sTrondheim%2C%20Norway!5e0!3m2!1sen!2sus!4v1614967790404!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
            <div>
              <h5>Location:</h5>
              <p>Trondheim, Norway</p>
              <h5>Email:</h5>
              <p>Holidaze@venues.com</p>
              <h5>Phone:</h5>
              <p>+4798989898</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
