import React, { useState } from 'react';
import './ContactUs.scss';

function ContactForm() {
  const [emailStatus, setEmailStatus] = useState(null);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      message: e.target.message.value
    };

    for (const field in formData) {
      if (!formData[field]) {
        setFormError(`Please fill in ${field.replace('_', ' ')}`);
        return;
      }
    }

    try {
      const response = await fetch('http://localhost:8080/api/user/contactUs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setEmailStatus('success');
        console.log('Email sent successfully');
      } else {
        setEmailStatus('error');
        console.log('Email sending failed');
      }
    } catch (error) {
      setEmailStatus('error');
      console.error('Email sending failed:', error);
    }

    e.target.reset();
    setFormError('');
  };

  return (
    <div className="contact-form-container">
      <div className="contact-form-card">
        <h2 className="contact-form-title">Get in Touch</h2>
        <p className="contact-form-subtitle">You can reach us anytime</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form-row">
            <input type="text" name="first_name" placeholder="First name" className="contact-form-input" />
            <input type="text" name="last_name" placeholder="Last name" className="contact-form-input" />
          </div>
          <input type="email" name="email" placeholder="Your email" className="contact-form-input" />
          <input type="tel" name="phone" placeholder="Number +383 49 999 999" className="contact-form-input" />
          <textarea name="message" rows="4" placeholder="Tell us what can we help you..." className="contact-form-textarea"></textarea>
          <div className="contact-form-submit-wrapper">
            <button type="submit" className="contact-form-submit">Submit</button>
            {formError && <p className="error-message">{formError}</p>}
            {emailStatus === 'success' && <p className="success-message">Email sent successfully!</p>}
            {emailStatus === 'error' && <p className="error-message">Email sending failed.</p>}
          </div>
        </form>
        <p className="contact-form-disclaimer">By contacting us, you agree to our Terms of service and Privacy Policy</p>
      </div>
    </div>
  );
}

export default ContactForm;
