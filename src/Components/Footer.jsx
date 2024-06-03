import React from 'react';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 border-top text-white">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h4>About Movie<span className='fst-italic fw-bold text-warning'>M</span>arket</h4>
            <p>Welcome to our Movies Website Movie<span className='fst-italic fw-bold text-warning'>M</span>arket, Explore the latest movies, reviews, and news from the world of cinema.</p>
          </div>
          <div className="col-md-3">
            <h4>Social Links</h4>
            <ul className="list-unstyled d-flex gap-3">
              <li><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook fs-4"></i></a></li>
              <li><a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin fs-4"></i></a></li>
              <li><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram fs-4"></i></a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h4>Contact <span className='fst-italic fw-bold text-warning'>U</span>s</h4>
            <p>Email: Ejada.com</p>
            <p>Phone: 0123456789</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
