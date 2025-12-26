import { Button } from "@/components/ui/button";
import { CheckCircle, Home, XCircle, Loader2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

const ThankYou = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("order_id");
    const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'idle'>(orderId ? 'loading' : 'idle');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (orderId) {
            const verify = async () => {
                try {
                    const response = await api.verifyPayment({ order_id: orderId });
                    if (response.success) {
                        setStatus('success');
                    } else {
                        setStatus('error');
                        setMessage(response.error || 'Payment verification failed');
                    }
                } catch (error: any) {
                    setStatus('error');
                    setMessage(error.message || 'Something went wrong');
                }
            };
            verify();
        }
    }, [orderId]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800">Verifying Payment...</h2>
                    <p className="text-gray-600">Please wait while we confirm your registration.</p>
                </div>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
                    <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Verification Failed</h2>
                    <p className="text-red-600 mb-6">{message}</p>
                    <div className="flex gap-4 justify-center">
                        <Link to="/contact">
                            <Button variant="outline">Contact Support</Button>
                        </Link>
                        <Link to="/">
                            <Button>Go Home</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4" style={{ backgroundImage: `url(/thank-you-bg.jpg)`, backgroundPosition: 'center' }}>
            <div className="max-w-2xl w-full bg-white overflow-hidden border border-slate-100" >
                <div className="p-2 md:p-4 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600 animate-pulse duration-1000 scale-150" />
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Payment Successful!
                    </h1>

                    <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                        Thank you for enrolling in the <span className="font-semibold text-slate-900">3D Printing Business Workshop</span>.
                        We're excited to have you on board!
                    </p>

                    <div className="bg-slate-50 p-6 mb-8 text-left border border-slate-200">
                        <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs">i</span>
                            Next Steps:
                        </h3>
                        <ul className="space-y-3 text-slate-600">
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <span>Check your email and whatsapp for the payment receipt and workshop details.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <span>Mark your calendar for the workshop date.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/">
                            <Button className="w-full sm:w-auto px-8 py-6 text-lg">
                                <Home className="w-5 h-5 mr-2" />
                                Go to Home
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
                    <p className="text-sm text-slate-500">
                        Need help? <Link to="/contact" className="text-primary hover:underline font-medium">Contact Support</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ThankYou;
