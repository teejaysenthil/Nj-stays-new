import { Building2, MapPin, Phone, Mail, Share2, MessageCircle, Ticket } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {/* Main Footer Grid */}
        <div className="mb-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-pink-600 text-white">
                <Building2 size={16} />
              </span>
              <span className="text-lg font-bold text-slate-900 dark:text-white">NJ Stays</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Premium co-living apartments in Bengaluru. Your perfect home away from home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold text-slate-900 dark:text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/" className="hover:text-orange-600 dark:hover:text-amber-400 transition">
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link href="/tenant" className="hover:text-orange-600 dark:hover:text-amber-400 transition">
                  Tenant Portal
                </Link>
              </li>
              <li>
                <a href="mailto:support@njstays.com" className="hover:text-orange-600 dark:hover:text-amber-400 transition">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="mb-4 font-semibold text-slate-900 dark:text-white">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a href="#terms" className="hover:text-orange-600 dark:hover:text-amber-400 transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-orange-600 dark:hover:text-amber-400 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#cookies" className="hover:text-orange-600 dark:hover:text-amber-400 transition">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-semibold text-slate-900 dark:text-white">Contact Us</h4>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-orange-600" />
                <a href="tel:+919483926622" className="hover:text-orange-600 dark:hover:text-amber-400 transition">
                  +91 94839 26622
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-orange-600" />
                <a href="mailto:support@njstays.com" className="hover:text-orange-600 dark:hover:text-amber-400 transition">
                  support@njstays.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-orange-600" />
                <span>BTM 1st Stage, Bengaluru</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-8 border-t border-slate-200 dark:border-slate-800" />

        {/* Bottom Footer */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            &copy; {currentYear} NJ Stays. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/njstays"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-orange-600 dark:text-slate-400 dark:hover:text-amber-400 transition"
              aria-label="Instagram"
            >
              <Share2 size={18} />
            </a>
            <a
              href="https://wa.me/919483926622"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-orange-600 dark:text-slate-400 dark:hover:text-amber-400 transition"
              aria-label="WhatsApp"
            >
              <MessageCircle size={18} />
            </a>
            <a
              href="https://facebook.com/njstays"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-orange-600 dark:text-slate-400 dark:hover:text-amber-400 transition"
              aria-label="Facebook"
            >
              <Ticket size={18} />
            </a>
          </div>
        </div>

        {/* Office Address */}
        <div className="mt-8 rounded-lg bg-slate-50 p-4 text-sm dark:bg-slate-800/50">
          <p className="font-semibold text-slate-900 dark:text-white mb-2">Office Address</p>
          <p className="text-slate-600 dark:text-slate-400">
            Felix 64 Building<br />
            4th Cross Rd, Tavarekere, Ramappa Layout<br />
            BTM 1st Stage, Bengaluru - 560029
          </p>
        </div>
      </div>
    </footer>
  );
}
