import React from "react";
import styles from "./style/footer.module.css";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import {Link} from "react-router-dom";

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        {/* Column 1: About */}
        <div className={styles.footerColumn}>
          <h3>Company</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>

        {/* Column 2: Customer Support */}
        <div className={styles.footerColumn}>
          <h3>Customer Support</h3>
          <ul>
            <li><a href="/help">FAQs</a></li>
            <li><a href="/returns">Returns</a></li>
            <li><a href="/shipping">Shipping Info</a></li>
            <li><a href="/policy">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Column 3: Social Links */}
        <div className={styles.footerColumn}>
          <h3>Stay Connected</h3>
          <div className={styles.socialIcons}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} Neon Mart. All rights reserved.</p>
      </div>
    </footer>
  );
}
