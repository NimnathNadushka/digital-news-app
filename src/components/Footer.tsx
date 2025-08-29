import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-4">
              <div className="footer-info">
                <Link href="/" className="footer-logo d-flex">
                  <span>Digital News</span>
                </Link>
                <p className="footer-description">
                  Delivering the latest news and insightful stories from around the world.
                  Stay informed with our comprehensive coverage on politics, business,
                  technology, health, and more.
                </p>
                <div className="social-links mt-3">
                  <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                  <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                  <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                  <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>

            <div className="col-lg-2">
              <div className="footer-links">
                <h4>Categories</h4>
                <ul>
                  <li><Link href="/category/politics">Politics</Link></li>
                  <li><Link href="/category/business">Business</Link></li>
                  <li><Link href="/category/health">Health</Link></li>
                  <li><Link href="/category/technology">Technology</Link></li>
                  <li><Link href="/category/entertainment">Entertainment</Link></li>
                </ul>
              </div>
            </div>

            <div className="col-lg-2">
              <div className="footer-links">
                <h4>Useful Links</h4>
                <ul>
                  <li><Link href="/about">About Us</Link></li>
                  <li><Link href="/contact">Contact Us</Link></li>
                  <li><Link href="/privacy">Privacy Policy</Link></li>
                  <li><Link href="/terms">Terms of Service</Link></li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="footer-newsletter">
                <h4>Subscribe to Our Newsletter</h4>
                <p>Stay updated with our latest news and articles delivered straight to your inbox.</p>
                <form>
                  <input type="email" name="email" placeholder="Your Email" />
                  <button type="submit">Subscribe</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="copyright">
          &copy; {currentYear} <strong><span>Digital News</span></strong>. All Rights Reserved
        </div>
        <div className="credits">
          <div className="row">
            <div className="col-md-6 text-center text-md-start">
              Designed with <i className="bi bi-heart-fill"></i> for informed readers
            </div>
            <div className="col-md-6 text-center text-md-end">
              <a href="#">Back to top <i className="bi bi-arrow-up"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}