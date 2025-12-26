import { useState, useEffect } from 'react';
import { FileText, Lock, Shield, AlertCircle, Scale, ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const TermsConditions = () => {
    const [activeSection, setActiveSection] = useState('intro');

    const sections = [
        { id: 'intro', title: 'Introduction', icon: FileText },
        { id: 'access', title: 'Course Access', icon: Lock },
        { id: 'property', title: 'Intellectual Property', icon: Shield },
        { id: 'liability', title: 'Limitation of Liability', icon: AlertCircle },
        { id: 'law', title: 'Governing Law', icon: Scale }
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
                                Terms and Conditions
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
                                                    : 'text-slate-700 hover:bg-primary'
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
                                {/* Section 1: Introduction */}
                                <div id="intro" className="p-8 md:p-12">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="bg-primary p-2.5">
                                            <FileText className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-2xl font-semibold text-slate-900">
                                                1. Introduction
                                            </h2>
                                        </div>
                                    </div>
                                    <p className="text-slate-700 leading-relaxed">
                                        Welcome to Fantasy Decor Courses. By accessing our website and purchasing our courses,
                                        you agree to be bound by these Terms and Conditions. Please read them carefully before
                                        proceeding with any course enrollment or purchase.
                                    </p>
                                </div>

                                {/* Section 2: Course Access */}
                                <div id="access" className="p-8 md:p-12">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="bg-primary p-2.5">
                                            <Lock className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-2xl font-semibold text-slate-900">
                                                2. Course Access
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-slate-700 leading-relaxed">
                                            Upon purchase, you will receive access to the course materials for the duration
                                            specified in the course description. Your access is personal and non-transferable.
                                        </p>
                                        <div className="bg-slate-50 border-l-2 border-slate-900 p-4 rounded-r">
                                            <p className="text-slate-800 text-sm font-medium">
                                                Sharing of login credentials is strictly prohibited and may result in
                                                immediate termination of access without refund.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 3: Intellectual Property */}
                                <div id="property" className="p-8 md:p-12">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="bg-primary p-2.5">
                                            <Shield className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-2xl font-semibold text-slate-900">
                                                3. Intellectual Property
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-slate-700 leading-relaxed">
                                            All content provided in our courses, including but not limited to videos, documents,
                                            images, and resources, is the exclusive property of Fantasy Decor and is protected
                                            by copyright laws.
                                        </p>
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium text-slate-900">You may not:</p>
                                            <ul className="space-y-2 text-white text-sm ml-4">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-slate-400">•</span>
                                                    <span className="text-black">Reproduce or distribute course materials</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-slate-400">•</span>
                                                    <span className="text-black">Create derivative works from our content</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-slate-400">•</span>
                                                    <span className="text-black">Use materials for commercial purposes without express written permission</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 4: Limitation of Liability */}
                                <div id="liability" className="p-8 md:p-12">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="bg-primary p-2.5">
                                            <AlertCircle className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-2xl font-semibold text-slate-900">
                                                4. Limitation of Liability
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-slate-700 leading-relaxed">
                                            We strive to provide accurate and helpful information through our courses. However,
                                            individual results may vary based on numerous factors including effort, experience,
                                            and circumstances.
                                        </p>
                                        <p className="text-slate-700 leading-relaxed">
                                            We make no guarantees regarding the results you may achieve and are not liable for
                                            any direct, indirect, incidental, consequential, or punitive damages arising from
                                            your use of our courses or materials.
                                        </p>
                                    </div>
                                </div>

                                {/* Section 5: Governing Law */}
                                <div id="law" className="p-8 md:p-12">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="bg-primary p-2.5">
                                            <Scale className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-2xl font-semibold">
                                                5. Governing Law
                                            </h2>
                                        </div>
                                    </div>
                                    <p className="text-slate-700 leading-relaxed">
                                        These terms and conditions shall be governed by and construed in accordance with
                                        the laws of India. Any disputes arising from these terms shall be subject to the
                                        exclusive jurisdiction of the courts of India.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Section */}
                        <div className="mt-8 bg-primary p-8 md:p-10 text-white">
                            <h2 className="text-xl font-semibold mb-3">
                                Questions About Our Terms?
                            </h2>
                            <p className="text-white mb-6">
                                If you have any questions or concerns about these terms and conditions,
                                please contact our support team.
                            </p>
                            <Link to="/contact" className="bg-white text-slate-900 px-6 py-2.5 font-medium hover:bg-secondary transition-colors text-sm">
                                Contact Support
                            </Link>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default TermsConditions;