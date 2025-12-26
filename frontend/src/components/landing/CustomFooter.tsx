import { ABOUT } from '@/lib/utils';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const CustomFooter = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-primary text-white border-t">
            {/* Main Footer */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Fantasy Decor</h3>
                        <p className="text-sm mb-4 leading-relaxed">
                            Empowering creativity through professional interior design courses and resources.
                        </p>
                        {/* <div className="flex gap-3">
                            <Link
                                to="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 hover:text-yellow-400 rounded-md flex items-center justify-center transition-colors"
                            >
                                <Facebook className="w-4 h-4" />
                            </Link>
                            <Link
                                to="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 hover:text-yellow-400 rounded-md flex items-center justify-center transition-colors"
                            >
                                <Instagram className="w-4 h-4" />
                            </Link>
                            <Link
                                to="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 hover:text-yellow-400 rounded-md flex items-center justify-center transition-colors"
                            >
                                <Twitter className="w-4 h-4" />
                            </Link>
                            <Link
                                to="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 hover:text-yellow-400 rounded-md flex items-center justify-center transition-colors"
                            >
                                <Linkedin className="w-4 h-4" />
                            </Link>
                        </div> */}
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/" className="hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-white transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/terms" className="hover:text-white transition-colors">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link to="/refund-policy" className="hover:text-white transition-colors">
                                    Refund Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Contact Us</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <Mail className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                                <Link to={`mailto:${ABOUT.email}`} className="hover:text-white transition-colors">
                                    {ABOUT.email}
                                </Link>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                                <Link to={`tel:${ABOUT.phone}`} className="hover:text-white transition-colors">
                                    {ABOUT.phone}
                                </Link>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                                <span>
                                    {ABOUT.address}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800">
                <div className="container mx-auto px-4 py-6">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white">
                        <p>
                            © {currentYear} Fantasy Decor. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <Link to="/terms" className="hover:text-white transition-colors">
                                Terms
                            </Link>
                            <Link to="/refund-policy" className="hover:text-white transition-colors">
                                Refund
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default CustomFooter;