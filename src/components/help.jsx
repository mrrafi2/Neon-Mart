import React from "react";
import styles from "./style/help.module.css";
import { Link } from "react-router-dom";

export default function HelpFAQ() {
  return (
    <div className={styles.helpContainer}>
      <h1 className={styles.title}>Help & Frequently Asked Questions</h1>
      
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>General Information</h2>
        <div className={styles.faqItem}>
          <h3 className={styles.question}>What is Neon-Mart?</h3>
          <p className={styles.answer}>
            Neon-Mart is a modern e-commerce platform that bridges traditional craftsmanship and contemporary design.
            We offer a curated selection of products ranging from traditional attire like sarees and Panjabis to
            the latest in electronics and lifestyle goods. Our mission is to deliver quality, authenticity, and a seamless shopping experience.
          </p>
        </div>
        <div className={styles.faqItem}>
          <h3 className={styles.question}>How do I contact customer support?</h3>
          <p className={styles.answer}>
            You can reach our customer support team via our <Link to="/contact" className={styles.link}>Contact Us</Link> page.
            We’re available through email, phone, and live chat on our website during business hours.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Ordering & Product Information</h2>
        <div className={styles.faqItem}>
          <h3 className={styles.question}>How do I place an order?</h3>
          <p className={styles.answer}>
            Placing an order is easy! Browse our products and add your desired items to your cart. When you’re ready, click on “Buy Now” 
            or proceed to checkout. Fill in your delivery details and complete the payment process. If you’re not logged in, you’ll be prompted to log in or sign up.
          </p>
        </div>
        <div className={styles.faqItem}>
          <h3 className={styles.question}>What information is provided with each product?</h3>
          <p className={styles.answer}>
            Each product page provides detailed information including the product’s name, brand, type, condition, specifications,
            pricing, available stock, and any applicable discounts. Our detailed product descriptions help you make informed decisions.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Shipping & Delivery</h2>
        <div className={styles.faqItem}>
          <h3 className={styles.question}>How long will my order take to arrive?</h3>
          <p className={styles.answer}>
            Delivery times vary by location. Generally, orders are processed within 24 hours and delivered within 3-7 business days.
            Once your order is shipped, you will receive a tracking number to monitor its progress.
          </p>
        </div>
        <div className={styles.faqItem}>
          <h3 className={styles.question}>Do you offer international shipping?</h3>
          <p className={styles.answer}>
            Currently, YourEcom primarily serves domestic orders. However, we are continuously working to expand our shipping options.
            Please check our Shipping Info page for the latest updates.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Payment & Security</h2>
        <div className={styles.faqItem}>
          <h3 className={styles.question}>What payment methods are accepted?</h3>
          <p className={styles.answer}>
            We accept a variety of payment methods including credit/debit cards, online banking, and secure payment gateways.
            All transactions are encrypted and processed securely.
          </p>
        </div>
        <div className={styles.faqItem}>
          <h3 className={styles.question}>Is my personal information secure?</h3>
          <p className={styles.answer}>
            Absolutely. We use state-of-the-art security measures to protect your personal and payment information. 
            Please review our Privacy Policy for more details on how your data is handled.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Account & Seller Information</h2>
        <div className={styles.faqItem}>
          <h3 className={styles.question}>How do I create an account?</h3>
          <p className={styles.answer}>
            You can easily create an account by signing up on our website. Once registered, you can track your orders, save your favorite products,
            and enjoy a personalized shopping experience.
          </p>
        </div>
        <div className={styles.faqItem}>
          <h3 className={styles.question}>I am a seller. How do I list my products?</h3>
          <p className={styles.answer}>
            If you’re approved as a seller, you can navigate to the “Sell” page to list your products.
            Our platform is designed to help you showcase your offerings with detailed descriptions and high-quality images.
          </p>
        </div>
      </section>

      <footer className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} Neon-Mart. All rights reserved.</p>
      </footer>
    </div>
  );
}
