import React from 'react';
import Link from 'next/link';
import './contact.css';

export default function ContactPage() {
  // Contact information
  const contactInfo = {
    address: "123 News Avenue, Media District, NY 10001",
    email: "contact@digitalnews.com",
    phone: "+1 (555) 123-4567",
    hours: "Monday-Friday: 9:00 AM - 5:00 PM"
  };

  // Social media links
  const socialLinks = [
    { icon: "bi-twitter", url: "#", label: "Twitter" },
    { icon: "bi-facebook", url: "#", label: "Facebook" },
    { icon: "bi-instagram", url: "#", label: "Instagram" },
    { icon: "bi-linkedin", url: "#", label: "LinkedIn" }
  ];

  return (
    <main id="main">
      {/* Contact Intro Section */}
      <section className="contact-intro">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 mx-auto text-center">
              <span className="badge-primary">Get In Touch</span>
              <h1 className="page-title">Contact Us</h1>
              <div className="intro-text">
                <p>Have a question, story tip, or feedback? We'd love to hear from you. Reach out to our team using the contact information below or send us a message directly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information & Form Section */}
      <section className="contact-main py-5">
        <div className="container">
          <div className="row g-5">
            {/* Contact Information */}
            <div className="col-lg-4">
              <div className="contact-info">
                <h2 className="section-header">Contact Information</h2>
                <p>Our team is ready to assist you with any questions or inquiries you might have.</p>
                
                <div className="contact-details">
                  <div className="contact-item">
                    <div className="icon-box">
                      <i className="bi bi-geo-alt"></i>
                    </div>
                    <div className="contact-text">
                      <h3>Our Address</h3>
                      <p>{contactInfo.address}</p>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <div className="icon-box">
                      <i className="bi bi-envelope"></i>
                    </div>
                    <div className="contact-text">
                      <h3>Email Us</h3>
                      <p><a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></p>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <div className="icon-box">
                      <i className="bi bi-telephone"></i>
                    </div>
                    <div className="contact-text">
                      <h3>Call Us</h3>
                      <p><a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a></p>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <div className="icon-box">
                      <i className="bi bi-clock"></i>
                    </div>
                    <div className="contact-text">
                      <h3>Office Hours</h3>
                      <p>{contactInfo.hours}</p>
                    </div>
                  </div>
                </div>
                
                <div className="social-links">
                  <h3>Connect With Us</h3>
                  <div className="social-icons">
                    {socialLinks.map((link, index) => (
                      <a key={index} href={link.url} aria-label={link.label}>
                        <i className={`bi ${link.icon}`}></i>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="col-lg-8">
              <div className="contact-form-container">
                <h2 className="section-header">Send Us a Message</h2>
                <p>Have a story idea or feedback? Fill out the form below, and we'll get back to you as soon as possible.</p>
                
                <form className="contact-form">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="name">Your Name</label>
                        <input type="text" className="form-control" id="name" placeholder="Enter your name" required />
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="email">Your Email</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter your email" required />
                      </div>
                    </div>
                    
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input type="text" className="form-control" id="subject" placeholder="Subject of your message" required />
                      </div>
                    </div>
                    
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="message">Your Message</label>
                        <textarea className="form-control" id="message" rows={6} placeholder="Type your message here..." required></textarea>
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343004!2d-74.0059418!3d40.7127779!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus" 
              width="100%" 
              height="450" 
              style={{border:0}} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Digital News Office Location"
            ></iframe>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="faq-section py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <span className="badge-primary">Frequently Asked Questions</span>
              <h2 className="section-header">Common Questions</h2>
              <p className="mb-5">Find answers to frequently asked questions about our services, subscription, and content policies.</p>
            </div>
          </div>
          
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="accordion" id="faqAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      How can I submit a story tip?
                    </button>
                  </h2>
                  <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      You can submit story tips through our contact form above or by emailing tips@digitalnews.com. Please include as much detail as possible, and our editorial team will review your submission.
                    </div>
                  </div>
                </div>
                
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      How do I subscribe to your newsletter?
                    </button>
                  </h2>
                  <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      You can subscribe to our newsletter by checking the newsletter subscription box in our contact form, or by visiting the Newsletter section at the bottom of our homepage.
                    </div>
                  </div>
                </div>
                
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      How can I report an error in an article?
                    </button>
                  </h2>
                  <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      We strive for accuracy in all our reporting. If you spot an error, please email corrections@digitalnews.com with the article title, the error you've identified, and any supporting information.
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