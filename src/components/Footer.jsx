import React from "react";
import { Typography, Link, IconButton, TextField } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SendIcon from "@mui/icons-material/Send";
import logo from "../assets/blogger.png";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-modern-root">
      <div className="footer-modern-main">
        <div className="footer-modern-brand">
          <img
            src={logo}
            alt="Personalized Reader Logo"
            className="footer-modern-logo"
          />
          <Typography variant="h6" className="footer-modern-title">
            Personalized Reader
          </Typography>
          <Typography className="footer-modern-desc">
            Stories for every learner. Every language. Every level.
          </Typography>
          <div className="footer-modern-social">
            <IconButton href="#" aria-label="Facebook" size="small">
              <FacebookIcon />
            </IconButton>
            <IconButton href="#" aria-label="Twitter" size="small">
              <TwitterIcon />
            </IconButton>
            <IconButton href="#" aria-label="Instagram" size="small">
              <InstagramIcon />
            </IconButton>
            <IconButton href="#" aria-label="LinkedIn" size="small">
              <LinkedInIcon />
            </IconButton>
          </div>
        </div>
        <div className="footer-modern-links">
          <div>
            <Typography className="footer-modern-heading">Discover</Typography>
            <ul>
              <li>
                <Link href="#">Features</Link>
              </li>
              <li>
                <Link href="#">Library</Link>
              </li>
              <li>
                <Link href="#">Pricing</Link>
              </li>
              <li>
                <Link href="#">For Schools</Link>
              </li>
            </ul>
          </div>
          <div>
            <Typography className="footer-modern-heading">About</Typography>
            <ul>
              <li>
                <Link href="#">Our Story</Link>
              </li>
              <li>
                <Link href="#">Careers</Link>
              </li>
              <li>
                <Link href="#">Blog</Link>
              </li>
              <li>
                <Link href="#">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <Typography className="footer-modern-heading">Help</Typography>
            <ul>
              <li>
                <Link href="#">Support</Link>
              </li>
              <li>
                <Link href="#">Accessibility</Link>
              </li>
              <li>
                <Link href="#">Terms</Link>
              </li>
              <li>
                <Link href="#">Privacy</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-modern-newsletter">
          <Typography className="footer-modern-heading">Stay Connected</Typography>
          <Typography className="footer-modern-news-desc">
            Get reading tips, updates, and new stories in your inbox.
          </Typography>
          <form className="footer-modern-form" autoComplete="off">
            <TextField
              variant="outlined"
              size="small"
              placeholder="Your email address"
              className="footer-modern-input"
              InputProps={{
                endAdornment: (
                  <IconButton type="submit" sx={{ color: "#fff" }}>
                    <SendIcon />
                  </IconButton>
                ),
              }}
            />
          </form>
        </div>
      </div>
      <div className="footer-modern-bottom">
        <Typography className="footer-modern-copy">
          © {new Date().getFullYear()} Personalized Reader. All rights reserved.
        </Typography>
        <div className="footer-modern-bottom-links">
          <Link href="#">Privacy Policy</Link>
          <span>·</span>
          <Link href="#">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
