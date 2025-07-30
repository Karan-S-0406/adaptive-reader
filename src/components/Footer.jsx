import React from "react";
import { Typography, Link } from "@mui/material";
import smartzy from "../assets/smartzy.png";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-root">
      <div className="footer-main">
        {/* Brand & Intro */}
        <div className="footer-column brand">
          <div className="footer-logo-wrap">
            <img src={smartzy} alt="Smartzy" className="footer-logo" />
            <Typography variant="h6" className="footer-brand-name">
              Smartzy
            </Typography>
          </div>
          <Typography className="footer-description">
            An adaptive learning platform that understands how children learn, adjusting every story and math problem to their level. Built for the future of learning.
          </Typography>
          <button className="footer-cta">Read. Solve. Win.</button>
        </div>

        {/* Features */}
        <div className="footer-column">
          <h4>Features</h4>
          <ul>
            <li>📖 Adaptive Stories & Reading</li>
            <li>📋 Personalized Math Problems</li>
            <li>🏆 Gamified Learning</li>
            <li>🎯 Level Detection AI</li>
            <li>⏱ Real-time Adjustments</li>
          </ul>
        </div>

        {/* For Everyone */}
        <div className="footer-column">
          <h4>For Everyone</h4>
          <ul>
            <li>🎒 Kindergarten to High School</li>
            <li>👨‍🏫 Educators & Teachers</li>
            <li>👨‍👩‍👧 Families & Parents</li>
            <li>🏫 Schools & Districts</li>
            <li>🌐 Learners Worldwide</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-column">
          <h4>Get In Touch</h4>
          <ul>
            <li>✉️ hello@smartzy.ai</li>
            <li>📞 508-834-0873</li>
            <li>📍 Hopkinton, MA 01748</li>
          </ul>
          <div className="footer-links">
            <Link href="#">Help Center</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Smartzy. All rights reserved. Built with <span style={{ color: "red" }}>❤️</span> for every learner.
        </p>
        <div className="footer-bottom-icons">
          <span>🔒 COPPA Compliant</span>
          <span>🌎 Available Worldwide</span>
          <span>📱 PWA Ready</span>
        </div>
      </div>
    </footer>
  );
}
