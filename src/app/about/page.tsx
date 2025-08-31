import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './about.css';

export default function AboutPage() {
  // Team member data
  const teamMembers = [
    {
      name: "Cameron Williamson",
      role: "Founder & CEO",
      bio: "Founder and editorial lead. Cameron drives editorial strategy and partnerships across the newsroom.",
      image: "/assets/img/person-1.jpg",
    },
    {
      name: "Wade Warren",
      role: "Founder, VP",
      bio: "Co-founder overseeing product and operations, focused on building reader-focused product features.",
      image: "/assets/img/person-2.jpg",
    },
    {
      name: "Jane Cooper",
      role: "Editor Staff",
      bio: "Senior editor covering culture and features; edits long-form stories and special series.",
      image: "/assets/img/person-3.jpg",
    },
    {
      name: "Martin Williamson",
      role: "Editor Staff",
      bio: "Politics and investigations reporter with a focus on public policy and accountability.",
      image: "/assets/img/person-4.jpg",
    },
    {
      name: "Steven Hanbo",
      role: "Editor Staff",
      bio: "Technology and multimedia journalist who manages audio and video storytelling.",
      image: "/assets/img/person-5.jpg",
    },
    {
      name: "Mike Tan",
      role: "Editor Staff",
      bio: "Multimedia editor specializing in social video, photography, and rapid-response coverage.",
      image: "/assets/img/person-6.jpg",
    },
  ];

  // Example news items for the preview section
  const latestNews = [
    {
      title: "Tech Giants Announce New Privacy Standards",
      description: "Major technology companies have agreed on a set of common privacy standards to protect user data.",
      image: "/assets/img/post-landscape-1.jpg",
      category: "Technology",
      date: "Oct 15, 2023"
    },
    {
      title: "Climate Summit Reaches Breakthrough Agreement",
      description: "World leaders commit to ambitious targets after marathon negotiations at global climate conference.",
      image: "/assets/img/post-landscape-2.jpg",
      category: "Politics",
      date: "Oct 12, 2023"
    },
  ];

  return (
    <main id="main">
      {/* About Intro Section - Enhanced with more compelling layout */}
      <section className="about-intro">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 mx-auto text-center">
              <span className="badge-primary">Our Story</span>
              <h1 className="page-title">About Digital News</h1>
              <div className="intro-text">
                <p>Digital News is a digital-first newsroom delivering trustworthy stories and thoughtful analysis across business, culture, sport, and travel. We combine fast reporting with in-depth features to inform and connect communities.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company History Section - With timeline design */}
      <section className="company-history py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="history-timeline">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <span className="timeline-year">Est. 2018</span>
                  <h2 className="section-header">Our Journey</h2>
                  <p>Founded in 2018, Digital News began as a small local newsroom and quickly expanded into a national digital publication. We&apos;ve focused on quality reporting and audience-first storytelling since day one.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section - With enhanced card design */}
      <section className="mission-vision py-5 bg-light">
        <div className="container">
          <div className="row g-4 justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="mission-box h-100">
                <div className="icon-box">
                  <i className="bi bi-bullseye"></i>
                </div>
                <h2>Our Mission</h2>
                <p>To deliver clear, accurate, and relevant news that empowers readers to make informed decisions.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-5">
              <div className="vision-box h-100">
                <div className="icon-box">
                  <i className="bi bi-eye"></i>
                </div>
                <h2>Our Vision</h2>
                <p>To become a leading digital platform known for editorial integrity, innovative storytelling, and community engagement.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section - Modernized with circular images */}
      <section className="our-team py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <span className="badge-primary">The People Behind Digital News</span>
              <h2 className="section-header">Meet Our Team</h2>
              <p className="team-subtitle">Our dedicated journalists and editors work around the clock to bring you the stories that matter.</p>
            </div>
          </div>
          <div className="row g-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="team-card h-100">
                  <div className="team-image-container">
                    <Image 
                      src={member.image} 
                      alt={`Photo of ${member.name} — ${member.role}`} 
                      width={300}
                      height={300}
                      className="img-fluid" 
                      loading="lazy"
                    />
                  </div>
                  <div className="team-content">
                    <h3 className="team-name">{member.name}</h3>
                    <p className="team-role">{member.role}</p>
                    <p className="team-bio">{member.bio}</p>
                    <div className="team-social">
                      <a href="#"><i className="bi bi-twitter"></i></a>
                      <a href="#"><i className="bi bi-linkedin"></i></a>
                      <a href="#"><i className="bi bi-envelope"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section - More modern card design */}
      <section className="latest-news py-5 bg-light">
        <div className="container">
          <div className="row align-items-center mb-4">
            <div className="col-md-8">
              <span className="badge-primary">Stay Updated</span>
              <h2 className="section-header">Latest News</h2>
              <p>Stay updated with our latest headlines and featured stories — hand-picked by our editorial team.</p>
            </div>
            <div className="col-md-4 text-md-end">
              <Link href="#" className="view-all-link">View All Articles <i className="bi bi-arrow-right"></i></Link>
            </div>
          </div>
          <div className="row g-4">
            {latestNews.map((news, index) => (
              <div key={index} className="col-md-6">
                <div className="news-card h-100">
                  <div className="news-image-container">
                    <Image 
                      src={news.image} 
                      alt={news.title} 
                      width={400}
                      height={240}
                      className="img-fluid" 
                      loading="lazy"
                    />
                    <span className="news-category">{news.category}</span>
                  </div>
                  <div className="news-content">
                    <div className="news-meta">
                      <span className="news-date"><i className="bi bi-calendar3"></i> {news.date}</span>
                    </div>
                    <h3>{news.title}</h3>
                    <p>{news.description}</p>
                    <Link href="#" className="read-more">Read More <i className="bi bi-arrow-right"></i></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section - Redesigned with matching colors */}
      <section className="newsletter-section py-5">
        <div className="container">
          <div className="newsletter-container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="newsletter-icon mb-3">
                  <i className="bi bi-envelope-paper"></i>
                </div>
                <h2>Subscribe to Our Newsletter</h2>
                <p>Get the latest news and updates delivered straight to your inbox.</p>
              </div>
              <div className="col-lg-6">
                <form className="newsletter-form">
                  <div className="input-group">
                    <input type="email" className="form-control" placeholder="Your Email Address" aria-label="Your Email Address" />
                    <button className="btn btn-primary" type="submit">Subscribe</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}