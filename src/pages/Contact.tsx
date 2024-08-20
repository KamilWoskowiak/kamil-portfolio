// src/pages/Contact.tsx
import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const Contact: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="contact-container">
        <h2>Contact Me</h2>
        <form>
          <label>Name:</label>
          <input type="text" name="name" required />
          <label>Email:</label>
          <input type="email" name="email" required />
          <label>Message:</label>
          <textarea name="message" required></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
      <Footer />
    </>
  );
};
