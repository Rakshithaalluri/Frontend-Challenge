import React, { useState, useCallback } from 'react';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import './App.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const MAX_MESSAGE_LENGTH = 500;
  const MIN_NAME_LENGTH = 2;
  
  const validateForm = useCallback(() => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < MIN_NAME_LENGTH) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s-']+$/.test(formData.name)) {
      newErrors.name = 'Name can only contain letters, spaces, hyphens, and apostrophes';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length > MAX_MESSAGE_LENGTH) {
      newErrors.message = `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters`;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } catch (error) {
        setErrors({ submit: 'Failed to send message. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  return (
    <div className="form-container">
      <h2 className="form-title">Contact Us</h2>
      
      {isSubmitted && (
        <div className="alert alert-success">
          <CheckCircle2 className="alert-icon" size={16} />
          <div className="alert-content">
            <div className="alert-title">Success!</div>
            <div>Your message has been sent successfully.</div>
          </div>
        </div>
      )}
      
      {errors.submit && (
        <div className="alert alert-error">
          <AlertCircle className="alert-icon" size={16} />
          <div className="alert-content">
            <div className="alert-title">Error</div>
            <div>{errors.submit}</div>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`form-input ${errors.name ? 'error' : ''}`}
          />
          {errors.name && (
            <div className="error-message">
              <AlertCircle size={16} />
              {errors.name}
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`form-input ${errors.email ? 'error' : ''}`}
          />
          {errors.email && (
            <div className="error-message">
              <AlertCircle size={16} />
              {errors.email}
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            disabled={isSubmitting}
            maxLength={MAX_MESSAGE_LENGTH}
            className={`form-textarea ${errors.message ? 'error' : ''}`}
          />
          <div className="char-counter">
            <span className={formData.message.length > MAX_MESSAGE_LENGTH ? 'error' : ''}>
              {formData.message.length}/{MAX_MESSAGE_LENGTH}
            </span>
            {errors.message && (
              <div className="error-message">
                <AlertCircle size={16} />
                {errors.message}
              </div>
            )}
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="submit-button"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="spinner" size={16} />
              Sending...
            </>
          ) : (
            'Submit'
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;