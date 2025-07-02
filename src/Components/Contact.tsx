import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const [emailError, setEmailError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear email error when user starts typing
    if (name === 'email' && emailError) {
      setEmailError('');
    }
  };

  const validateEmail = (email: string): boolean => {
    return email.endsWith('@csod.com');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate email
    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email ending with @csod.com');
      setIsSubmitting(false);
      return;
    }

    // Clear any previous email error
    setEmailError('');

    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);

    // Simulate form submission
    setTimeout(() => {
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };
  return (
    <section id="contact" className="py-24 bg-gray-100 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h2>
        <p className="text-gray-600 mb-8">
          Have questions or want to work with us? Fill out the form below and we’ll get back to you soon.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your Email (must end with @csod.com)"
              className={`w-full border p-3 rounded focus:outline-none focus:ring-2 ${
                emailError
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              required
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-2 text-left">{emailError}</p>
            )}
          </div>
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Your Message"
              rows={5}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 rounded transition ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
