import { useState, useEffect } from 'react';
import { CheckCircle, Clock, XCircle, Mail, ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const RefundPolicy = () => {
    const [activeSection, setActiveSection] = useState('guarantee');

    const sections = [
        { id: 'guarantee', title: 'Satisfaction Guarantee', icon: CheckCircle },
        { id: 'eligibility', title: 'Refund Eligibility', icon: Clock },
        { id: 'non-refundable', title: 'Non-Refundable Items', icon: XCircle },
        { id: 'processing', title: 'Processing Time', icon: Clock },
        { id: 'contact', title: 'Contact Us', icon: Mail }
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveSection(id);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200;

            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetBottom = offsetTop + element.offsetHeight;

                    if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                        setActiveSection(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center justify-between">
                            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
                                Refund Policy
                            </h1>
                            <Link to="/">
                                <Button className="rounded-none">
                                    <Home className="w-5 h-5" />
                                    Back to Home
                                </Button>
                            </Link>
                        </div>
                        <p className="text-slate-600">
                            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-6xl mx-auto flex gap-12">
                    {/* Sidebar Navigation */}
                    <aside className="hidden lg:block w-72 flex-shrink-0">
                        <div className="sticky top-8">
                            <div className="bg-white border border-slate-200 p-6">
                                <h3 className="text-xs font-semibold text-slate-500 mb-4 uppercase tracking-wider">
                                    Table of Contents
                                </h3>
                                <nav className="space-y-1">
                                    {sections.map((section) => {
                                        const Icon = section.icon;
                                        const isActive = activeSection === section.id;
                                        return (
                                            <button
                                                key={section.id}
                                                onClick={() => scrollToSection(section.id)}
                                                className={`w-full flex items-center gap-3 px-3 py-2.5 transition-colors text-left ${isActive
                                                    ? 'bg-primary text-white'
                                                    : 'text-slate-700 hover:bg-slate-50'
                                                    }`}
                                            >
                                                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                                                <span className="text-sm font-medium">{section.title}</span>
                                                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                                            </button>
                                        );
                                    })}
                                </nav>
                            </div>
                        </div>
                    </aside>

                    {/* Content */}
                    <main className="flex-1 min-w-0">
                        <div className="bg-white border border-slate-200">
                            <div className="divide-y divide-slate-200">
                                {/* Section 1: Satisfaction Guarantee */}
                                <div id="guarantee" className="p-8 md:p-12">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="bg-slate-100 p-2.5">
                                            <CheckCircle className="w-5 h-5 text-slate-700" />
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-2xl font-semibold text-slate-900">
                                                100% Satisfaction Guarantee
                                            </h2>
                                        </div>
                                    </div>
                                    <p className="text-slate-700 leading-relaxed">
                                        We are committed to providing high-quality educational content. We want you to be
                                        completely satisfied with your purchase. If our course does not meet your expectations,
                                        we offer a straightforward refund process subject to the conditions outlined below.
                                    </p>
                                </div>

                                {/* Section 2: Refund Eligibility */}
                                <div id="eligibility" className="p-8 md:p-12">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="bg-slate-100 p-2.5">
                                            <Clock className="w-5 h-5 text-slate-700" />
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-2xl font-semibold text-slate-900">
                                                Refund Eligibility
                                            </h2>
                                        </div>
                                    </div>
                                    <p className="text-slate-700 leading-relaxed mb-6">
                                        To ensure fairness and prevent misuse, refund requests must meet the following criteria:
                                    </p>
                                    <div className="space-y-4">
                                        <div className="flex gap-3">
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center mt-0.5">
                                                <span className="text-xs font-semibold text-slate-700">1</span>
                                            </div>
                                            <div>
                                                <p className="text-slate-900 font-medium mb-1">Time Frame</p>
                                                <p className="text-slate-700 text-sm">
                                                    You may request a refund within <strong>7 days</strong> of your initial purchase date.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center mt-0.5">
                                                <span className="text-xs font-semibold text-slate-700">2</span>
                                            </div>
                                            <div>
                                                <p className="text-slate-900 font-medium mb-1">Course Progress</p>
                                                <p className="text-slate-700 text-sm">
                                                    You must have completed less than <strong>20%</strong> of the course content to be eligible for a refund.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center mt-0.5">
                                                <span className="text-xs font-semibold text-slate-700">3</span>
                                            </div>
                                            <div>
                                                <p className="text-slate-900 font-medium mb-1">Request Submission</p>
                                                <p className="text-slate-700 text-sm">
                                                    Refund requests must be submitted via email to our support team with your order details and reason for refund.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 3: Non-Refundable Items */}
                                <div id="non-refundable" className="p-8 md:p-12">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="bg-slate-100 p-2.5">
                                            <XCircle className="w-5 h-5 text-slate-700" />
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-2xl font-semibold text-slate-900">
                                                Non-Refundable Items
                                            </h2>
                                        </div>
                                    </div>
                                    <p className="text-slate-700 leading-relaxed mb-4">
                                        Certain components of our offerings are non-refundable due to their nature and the immediate value they provide:
                                    </p>
                                    <div className="bg-slate-50 border-l-2 border-slate-900 p-4 rounded-r">
                                        <ul className="space-y-2 text-slate-800 text-sm">
                                            <li className="flex items-start gap-2">
                                                <span className="text-slate-400">•</span>
                                                <span>Downloadable assets, templates, or resources once accessed or downloaded</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-slate-400">•</span>
                                                <span>One-on-one consultation calls once scheduled or completed</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-slate-400">•</span>
                                                <span>Courses where more than 20% of content has been accessed</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-slate-400">•</span>
                                                <span>Purchases made more than 7 days prior to the refund request</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Section 4: Processing Time */}
                                <div id="processing" className="p-8 md:p-12">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="bg-slate-100 p-2.5">
                                            <Clock className="w-5 h-5 text-slate-700" />
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-2xl font-semibold text-slate-900">
                                                Processing Time
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-slate-700 leading-relaxed">
                                            Once your refund request has been reviewed and approved by our team, the refund
                                            will be processed according to the following timeline:
                                        </p>
                                        <div className="bg-slate-50 p-5 space-y-3">
                                            <div className="flex items-start gap-3">
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center">
                                                    <span className="text-xs font-bold text-slate-700">1</span>
                                                </div>
                                                <div>
                                                    <p className="text-slate-900 font-medium text-sm">Review Period</p>
                                                    <p className="text-slate-600 text-sm">1-2 business days to verify eligibility</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center">
                                                    <span className="text-xs font-bold text-slate-700">2</span>
                                                </div>
                                                <div>
                                                    <p className="text-slate-900 font-medium text-sm">Processing</p>
                                                    <p className="text-slate-600 text-sm">5-7 business days for refund to be initiated</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center">
                                                    <span className="text-xs font-bold text-slate-700">3</span>
                                                </div>
                                                <div>
                                                    <p className="text-slate-900 font-medium text-sm">Payment Method Credit</p>
                                                    <p className="text-slate-600 text-sm">3-10 business days depending on your bank or payment provider</p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-slate-700 text-sm">
                                            The refund will be credited back to your original payment method. Total processing time
                                            may vary depending on your financial institution.
                                        </p>
                                    </div>
                                </div>

                                {/* Section 5: Contact Us */}
                                <div id="contact" className="p-8 md:p-12">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="bg-slate-100 p-2.5">
                                            <Mail className="w-5 h-5 text-slate-700" />
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-2xl font-semibold text-slate-900">
                                                Contact Us
                                            </h2>
                                        </div>
                                    </div>
                                    <p className="text-slate-700 leading-relaxed mb-6">
                                        If you have any questions about our Refund Policy or need to submit a refund request,
                                        our support team is here to help.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <Link
                                            to="/contact"
                                            className="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-white font-medium hover:bg-primary/80 transition-colors text-sm"
                                        >
                                            Contact Support
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Info Box */}
                        <div className="mt-8 bg-primary p-8 md:p-10 text-white">
                            <h2 className="text-xl font-semibold mb-3">
                                Need Help With Your Purchase?
                            </h2>
                            <p className="text-white mb-6">
                                Before requesting a refund, consider reaching out to our support team. We may be able to
                                address your concerns or provide additional assistance to help you get the most value from your course.
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" />
                                    <span className="text-white">Technical support available</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" />
                                    <span className="text-white">Course guidance provided</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" />
                                    <span className="text-white">Quick response time</span>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default RefundPolicy;