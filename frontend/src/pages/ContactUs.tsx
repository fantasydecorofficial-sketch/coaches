import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import { ABOUT } from "@/lib/utils";
import { Home, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { Link, redirect } from "react-router-dom";

const ContactUs = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await api.contact(formData);

            if (!response.success) {
                throw new Error(response.message);
            }

            setSuccess(response.message || 'Message sent successfully!');
            setError('');
            redirect('/');
            setFormData({
                name: '',
                email: '',
                message: ''
            });
        } catch (error) {
            setError(error.message || 'Failed to send message');
            setSuccess('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundImage: `url(/contact-bg.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-6 max-w-6xl" style={{ backgroundBlendMode: "overlay" }}>
                    <div className="flex items-center justify-between">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Contact Us
                        </h1>
                        <Link to="/">
                            <Button className="rounded-none">
                                <Home className="w-5 h-5" />
                                Back to Home
                            </Button>
                        </Link>
                    </div>
                    <p className="text-gray-600">
                        Get in touch with our team. We're here to help.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12 max-w-6xl">
                <div className="grid md:grid-cols-5 gap-8">

                    {/* Contact Form */}
                    <div className="md:col-span-3">
                        <div className="bg-white border border-gray-200 p-8">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                                Send a Message
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Message *
                                    </label>
                                    <Textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={6}
                                        placeholder="How can we help you?"
                                    />
                                </div>

                                {success && (
                                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                                        <p className="text-sm text-green-800 dark:text-green-200">{success}</p>
                                    </div>
                                )}

                                {error && (
                                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                                        <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                                    </div>
                                )}

                                <Button
                                    onClick={handleSubmit}
                                    disabled={loading || !formData.name || !formData.email || !formData.message}
                                    className="w-full disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2 rounded-none"
                                >
                                    {loading ? (
                                        <span>Sending...</span>
                                    ) : (
                                        <>
                                            <span>Send Message</span>
                                            <Send className="w-4 h-4" />
                                        </>
                                    )}
                                </Button>

                                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                    We'll respond to your inquiry within 24 hours during business days.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="md:col-span-2">
                        <div className="bg-white border border-gray-200 p-6">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                                Contact Information
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                            Email
                                        </h3>
                                        <a
                                            href={`mailto:${ABOUT.email}`}
                                            className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                        >
                                            {ABOUT.email}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                            Phone
                                        </h3>
                                        <a
                                            href={`tel:${ABOUT.phone}`}
                                            className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                        >
                                            {ABOUT.phone}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                            Address
                                        </h3>
                                        <p className="text-gray-900 dark:text-white leading-relaxed">
                                            {ABOUT.address}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Business Hours: Monday - Friday, 9:00 AM - 6:00 PM IST
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
