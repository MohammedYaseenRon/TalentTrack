import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#1E1E1E] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Talent Track</h3>
            <p className="text-gray-400 mb-4">Connecting talent with opportunity. Your career journey starts here.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Find Jobs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">For Employers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Career Resources</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Success Stories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="text-gray-400 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-400">123 Innovation Drive, Tech City, TC 10101</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-gray-400 mr-2 flex-shrink-0" />
                <span className="text-gray-400">(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-gray-400 mr-2 flex-shrink-0" />
                <span className="text-gray-400">contact@talenttrack.com</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for job alerts and career tips.</p>
            <form className="flex flex-col space-y-2">
              <input suppressHydrationWarning
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button suppressHydrationWarning
                type="submit" 
                className="px-4 py-2 bg-[#FF6B6B] text-white rounded hover:bg-[FF6B6B] transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">&copy; {currentYear} Talent Track. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-8">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

