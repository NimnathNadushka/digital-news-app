'use client';

import React from 'react';
import './contact.css';

export default function ContactPage() {
  return (
    <main id="main">
      {/* Contact Intro */}
      <section className="contact-intro">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h1 className="page-title">Contact Us</h1>
              <p className="intro-text">
                We&apos;d love to hear from you! Whether you have a news tip, feedback, or just want to say hello, 
                don&apos;t hesitate to reach out to our team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="contact-info-section py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="contact-info">
                <h2 className="section-header mb-4">Get in Touch</h2>
                <div className="contact-item d-flex align-items-start mb-4">
                  <div className="icon-box me-3">
                    <i className="bi bi-geo-alt"></i>
                  </div>
                  <div>
                    <h5>Address</h5>
                    <p>123 News Street, Media City<br />New York, NY 10001</p>
                  </div>
                </div>
                
                <div className="contact-item d-flex align-items-start mb-4">
                  <div className="icon-box me-3">
                    <i className="bi bi-telephone"></i>
                  </div>
                  <div>
                    <h5>Phone</h5>
                    <p>+1 (555) 123-4567<br />+1 (555) 123-4568</p>
                  </div>
                </div>
                
                <div className="contact-item d-flex align-items-start mb-4">
                  <div className="icon-box me-3">
                    <i className="bi bi-envelope"></i>
                  </div>
                  <div>
                    <h5>Email</h5>
                    <p>info@digitalnews.com<br />news@digitalnews.com</p>
                  </div>
                </div>
                
                <div className="contact-item d-flex align-items-start">
                  <div className="icon-box me-3">
                    <i className="bi bi-clock"></i>
                  </div>
                  <div>
                    <h5>Business Hours</h5>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM<br />Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="contact-form-container">
                <h3 className="mb-4">Send us a Message</h3>
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" required />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" required />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mb-3">
                        <label htmlFor="subject" className="form-label">Subject</label>
                        <input type="text" className="form-control" id="subject" required />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mb-3">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea className="form-control" id="message" rows={5} required></textarea>
                      </div>
                    </div>
                    
                    <div className="col-12">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="newsletter" />
                        <label className="form-check-label" htmlFor="newsletter">
                          Subscribe to our newsletter to receive the latest news and updates
                        </label>
                      </div>
                    </div>
                    
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary">Send Message</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="map-section">
        <div className="container-fluid p-0">
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1619524992238!5m2!1sen!2s" 
              width="100%" 
              height="450" 
              style={{border:0}} 
              allowFullScreen 
              loading="lazy"
              title="Digital News Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="text-center mb-5">
                <h2 className="section-header">Frequently Asked Questions</h2>
                <p>Find answers to common questions about Digital News.</p>
              </div>
              
              <div className="accordion" id="faqAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="faq1">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="true" aria-controls="collapse1">
                      How can I submit a news tip?
                    </button>
                  </h2>
                  <div id="collapse1" className="accordion-collapse collapse show" aria-labelledby="faq1" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      You can submit news tips by emailing us at tips@digitalnews.com or using our contact form above. Please provide as much detail as possible, including sources and verification when available.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="faq2">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
                      Do you accept guest articles?
                    </button>
                  </h2>
                  <div id="collapse2" className="accordion-collapse collapse" aria-labelledby="faq2" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Yes, we welcome high-quality guest contributions. Please send your article proposals to editorial@digitalnews.com with a brief synopsis and your credentials.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="faq3">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
                      How do I report an error in an article?
                    </button>
                  </h2>
                  <div id="collapse3" className="accordion-collapse collapse" aria-labelledby="faq3" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      We strive for accuracy in all our reporting. If you spot an error, please email corrections@digitalnews.com with the article title, the error you&apos;ve identified, and any supporting information.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}