import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import Navbar from './Components/Navbar';
import BMI_Calculate from './Components/BMI_Calculate';
import Weather from './Components/Weather';
import { CounterProvider } from './Context/CounterContext';
import UserList from './Components/userLIst'; // ✅ Check file name casingim
import Todo from './Components/Todo';


interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const Home: React.FC = () => {
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });

  const [contactEmailError, setContactEmailError] = useState<string>('');
  const [isContactSubmitting, setIsContactSubmitting] = useState<boolean>(false);

  const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === 'email' && contactEmailError) {
      setContactEmailError('');
    }
  };

  const validateContactEmail = (email: string): boolean => {
    return email.endsWith('@csod.com');
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsContactSubmitting(true);
    if (!validateContactEmail(contactForm.email)) {
      setContactEmailError('Please enter a valid email ending with @csod.com');
      setIsContactSubmitting(false);
      return;
    }
    setContactEmailError('');
    console.log('Contact form submitted:', contactForm);
    setTimeout(() => {
      alert('Message sent successfully!');
      setContactForm({ name: '', email: '', message: '' });
      setIsContactSubmitting(false);
    }, 1000);
  };

  return (
    <>
      {/* Welcome Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-5xl font-bold mb-4">Welcome to MySite!</h1>
        <p className="text-lg mb-6 max-w-2xl">This is a simple homepage built using React and Tailwind CSS.</p>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Link to="/bmi-calculate">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              BMI Calculator
            </button>
          </Link>

          <Link to="/weather">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Weather App
            </button>
          </Link>

          <Link to="/user-list">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              User List
            </button>
          </Link>

          <Link to="/todo">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              To-Do
            </button>
          </Link>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">About Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
                Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus
                rhoncus ut eleifend nibh porttitor.
              </p>
              <p className="text-lg">
                Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl
                tempor. Suspendisse dictum feugiat nisl ut dapibus.
              </p>
            </div>
            <div className="bg-gray-200 rounded-lg flex items-center justify-center p-6 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="About Us - Team Collaboration"
                className="rounded-lg w-full h-auto shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl font-bold mb-6 text-center">Contact Us</h2>
          <form onSubmit={handleContactSubmit} className="bg-white shadow-md rounded-lg p-8">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={contactForm.name}
                onChange={handleContactInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={contactForm.email}
                onChange={handleContactInputChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 ${contactEmailError ? 'border-red-500' : ''}`}
                placeholder="your.email@csod.com"
                required
              />
              {contactEmailError && (
                <p className="text-red-500 text-sm mt-2">{contactEmailError}</p>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={contactForm.message}
                onChange={handleContactInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                placeholder="Your message here..."
                rows={4}
                required
              ></textarea>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                disabled={isContactSubmitting}
                className={`font-bold py-2 px-4 rounded focus:outline-none text-white ${
                  isContactSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isContactSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </section>

      <footer className="bg-gray-800 text-white text-center p-6">
        <p>© 2023 MySite. All rights reserved.</p>
      </footer>
    </>
  );
};

// ✅ Main App Component
const App: React.FC = () => {
  return (
    <CounterProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bmi-calculate" element={<BMI_Calculate />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/user-list" element={<UserList />} />
            <Route path="/todo" element={<Todo />} /> ✅ Added To-Do route
          </Routes>
        </div>
      </Router>
    </CounterProvider>
  );
};

export default App;
