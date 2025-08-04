import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-pacifico mb-4">The Chronicle</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted source for news, stories, and insights that matter.
              Delivering quality journalism since 2020.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Sections</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-gray-400 hover:text-white">
                Politics
              </a>
              <a href="#" className="block text-gray-400 hover:text-white">
                Sports
              </a>
              <a href="#" className="block text-gray-400 hover:text-white">
                Entertainment
              </a>
              <a href="#" className="block text-gray-400 hover:text-white">
                Daily Life
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-gray-400 hover:text-white">
                About Us
              </a>
              <a href="#" className="block text-gray-400 hover:text-white">
                Contact
              </a>
              <a href="#" className="block text-gray-400 hover:text-white">
                Careers
              </a>
              <a href="#" className="block text-gray-400 hover:text-white">
                Privacy Policy
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <Twitter className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
              <Facebook className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
              <Linkedin className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 The Chronicle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;