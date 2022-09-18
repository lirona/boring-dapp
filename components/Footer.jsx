import React from "react";

function Footer() {
  return (
    <footer className="bg-primary bg-opacity-30">
      <div className="container footer p-10 text-base-content">
        <div>
          <span className="footer-title text-2xl">Company</span>
          <a className="link link-hover text-lg">About us</a>
          <a className="link link-hover text-lg">Contact</a>
          <a className="link link-hover text-lg">Support</a>
          <a className="link link-hover text-lg">FAQ</a>
        </div>
        <div>
          <span className="footer-title text-2xl">Social</span>
          <div className="grid grid-flow-col gap-4">
            <a>
              <i className="ri-twitter-fill text-4xl"></i>
            </a>
            <a>
              <i className="ri-discord-fill text-4xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
