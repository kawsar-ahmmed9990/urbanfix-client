import React from "react";
import Logo from "../../components/Logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Logo></Logo>
            <p className="text-sm text-gray-200 leading-relaxed max-w-sm">
              UrbanFix is a smart public infrastructure issue reporting platform
              that connects citizens with city services efficiently.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-200">
              <li className="hover:text-[#F57C00] cursor-pointer transition">
                Report Issue
              </li>
              <li className="hover:text-[#F57C00] cursor-pointer transition">
                Track Status
              </li>
              <li className="hover:text-[#F57C00] cursor-pointer transition">
                Premium Support
              </li>
              <li className="hover:text-[#F57C00] cursor-pointer transition">
                Contact
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-sm text-gray-200 mb-2">
              📧 support@urbanfix.com
            </p>
            <p className="text-sm text-gray-200">
              🏙️ Smart City Service Platform
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 text-center py-4 text-sm text-gray-200">
        © {new Date().getFullYear()} UrbanFix. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
