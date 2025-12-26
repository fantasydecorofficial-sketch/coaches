import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { load } from '@cashfreepayments/cashfree-js';

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep", "Delhi", "Puducherry", "Ladakh", "Jammu and Kashmir"
];

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  state: z.string().min(1, "State is required"),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone must be exactly 10 digits"),
  email: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof formSchema>;

const Registration = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [cashfree, setCashfree] = useState<any>(null);

  useEffect(() => {
    const initializeCashfree = async () => {
      const cashfreeInstance = await load({
        mode: import.meta.env.PROD ? "production" : "sandbox"
      });
      setCashfree(cashfreeInstance);
    };
    initializeCashfree();
  }, []);

  useEffect(() => {
    // Track page visit
    api.trackAnalytics('page_visit', { page: 'registration' });
  }, []);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      state: "",
      phone: "",
      email: "",
    },
  });

  const onNextStep = async () => {
    const isValid = await form.trigger(["firstName", "lastName", "state", "phone", "email"]);
    if (isValid) {
      setStep(2);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    // Track registration attempt
    api.trackAnalytics('registration_started', { email: data.email });

    try {
      // 1. Create Order
      const orderResponse = await api.createOrder({
        amount: 199, // Hardcoded for now as per UI
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        address: `${data.state}, India`, // Derived address since UI doesn't have it
      });

      if (!orderResponse.success) {
        throw new Error(orderResponse.error || "Failed to create order");
      }

      if (!cashfree) {
        throw new Error("Cashfree SDK not initialized");
      }

      const checkoutOptions = {
        paymentSessionId: orderResponse.payment_session_id,
        redirectTarget: "_self" // or "_blank",
        // returnUrl: ... (handled in backend creation but good to have)
      };

      cashfree.checkout(checkoutOptions).then(async (result: any) => {
        if (result.error) {
          // This is called if there is an error in initiating checkout
          console.log("User has closed the popup or there is some error", result.error);
          toast({
            title: "Payment Error",
            description: result.error.message,
            variant: "destructive"
          });
          return;
        }
        if (result.redirect) {
          // This will be called if the user is redirected
          console.log("Payment initiated");
        }

        // NOTE: Cashfree redirects by default if redirectTarget is _self or not provided (depending on returnUrl).
        // If we want to verify payment here without redirect, we need to use a different flow or popup.
        // BUT, currently backend sets return_url to frontend/thank-you?order_id={order_id}
        // So we should just let it redirect.
      });

    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header Banner */}
      <div className="bg-black text-white text-center py-2 px-4">
        <p className="text-lg md:text-xl md:text-2xl font-bold">
          Congrats! You are just one step away
          <br />
          from <span className="text-primary uppercase">LAUNCHING YOUR 3D PRINTING BUSINESS</span>
        </p>
      </div>

      <div className="bg-green-50 flex flex-col md:flex-row ">
        <div className="container max-w-lg px-4 py-6 mr-2 pb-0 md:pb-6">
          {/* Green Badge */}
          <div className="relative mb-6">
            <div className="bg-primary text-white px-4 py-2 shadow-sm inline-block w-full">
              <p className="text-md font-medium">Unlock the exclusive bonuses, Now!</p>
            </div>
            <div className="absolute left-6 top-full w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-primary"></div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center w-full border-b-2 bg-gray-50">
            <div
              className={`flex-1 flex items-start gap-2 p-2 cursor-pointer transition-colors ${step === 1 ? 'border-primary bg-white' : 'border-transparent'}`}
              onClick={() => setStep(1)}
            >
              <div className="flex-shrink-0">
                <span className={`text-xl font-bold ${step === 1 ? 'text-black' : 'text-gray-400'}`}>1</span>
              </div>
              <div className="flex flex-col">
                <span className={`text-md font-bold leading-tight ${step === 1 ? 'text-black' : 'text-gray-400'}`}>Contact</span>
                <span className={`text-[12px] leading-tight ${step === 1 ? 'text-gray-600' : 'text-gray-400'}`}>Your Contact Info</span>
              </div>
            </div>
            <div
              className={`flex-1 flex items-start gap-2 p-2 cursor-pointer border-b-2 transition-colors ${step === 2 ? 'border-primary bg-white' : 'border-transparent'}`}
            >
              <div className="flex-shrink-0">
                <span className={`text-xl font-bold ${step === 2 ? 'text-black' : 'text-gray-400'}`}>2</span>
              </div>
              <div className="flex flex-col">
                <span className={`text-md font-bold leading-tight ${step === 2 ? 'text-black' : 'text-gray-400'}`}>Payment</span>
                <span className={`text-[12px] leading-tight ${step === 2 ? 'text-gray-600' : 'text-gray-400'}`}>Of Your Order</span>
              </div>
            </div>
          </div>

          <Form {...form}>
            {step === 1 ? (
              <div className="space-y-4 mb-6 bg-white p-6 shadow-sm border">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-md text-gray-600">
                          First name <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John"
                            className="h-10 text-lg bg-white border-gray-300"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-md text-gray-600">
                          Last name <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Doe"
                            className="h-10 text-lg bg-white border-gray-300"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-md text-gray-600">
                        State <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10 text-lg bg-white border-gray-300 rounded-none">
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-none">
                          {INDIAN_STATES.map((state) => (
                            <SelectItem key={state} value={state} className="rounded-none">
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-md text-gray-600">
                        10 Digit Phone Number <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="98276543210"
                          className="h-10 text-lg bg-white border-gray-300"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-md text-gray-600">
                        Email address <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="youremail@gmail.com"
                          className="h-10 text-lg bg-white border-gray-300"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  onClick={onNextStep}
                  className="w-full bg-primary hover:bg-[#019F52] text-white h-16 text-lg font-bold uppercase mt-4 rounded-none flex-col gap-0"
                >
                  <p>➜ Next Step</p>
                  <p className="text-[12px] font-normal normal-case block w-full">Yes! I want this offer!</p>
                </Button>
              </div>
            ) : (
              <div className="space-y-4 mb-1 bg-white p-6 shadow-sm border">
                {/* Step 2 Content: Product & Payment */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-lg text-gray-900">Product</h3>
                    <h3 className="font-bold text-lg text-gray-900">Subtotal</h3>
                  </div>

                  <div className="flex justify-between items-start mb-4 pb-4 border-b">
                    <div className="flex gap-3">
                      <div className="w-12 h-12 bg-black flex items-center justify-center flex-shrink-0 rounded">
                        <span className="text-white font-bold text-lg">3d</span>
                      </div>
                      <div>
                        <p className="font-medium text-lg text-gray-900">3d Priting Workshop</p>
                        <p className="text-md text-gray-500">× 1</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-lg text-gray-900">₹199</p>
                      <p className="text-md text-gray-500">ex. GST</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-lg text-gray-900">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <div className="text-right">
                        <span className="font-medium">₹168.64</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span>IGST 18%</span>
                      <span>₹30.36</span>
                    </div>
                    <div className="flex justify-between font-bold text-base pt-2 border-t">
                      <span>Total</span>
                      <span>₹199.00</span>
                    </div>
                  </div>
                </div>
                {/* Payment Method */}
                <div className="mb-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-3">UPI/Credit Card/Debit Card/NetBanking</h3>

                  <div className="border-2 border-blue-500 rounded-none p-3 mb-3 bg-blue-50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 bg-blue-600 rounded transform rotate-45"></div>
                      <span className="font-bold text-lg text-gray-900">Pay by Cashfree</span>
                    </div>
                    <p className="text-md text-gray-600 leading-relaxed">
                      Pay securely by UPI, Credit/Debit card or Internet Banking through Cashfree.
                    </p>
                  </div>

                  <p className="text-md text-gray-500 leading-relaxed">
                    Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
                  </p>
                </div>

                <Button
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={isLoading}
                  type="button"
                  className="w-full bg-primary hover:bg-[#019F52] text-white h-12 text-lg font-bold uppercase"
                >
                  {isLoading ? "Processing..." : "Complete Order ➜"}
                  <br />
                  {!isLoading && <span className="text-[12px] font-normal normal-case block w-full">Pay Only ₹199</span>}
                </Button>
                <button
                  onClick={() => setStep(1)}
                  className="w-full text-center text-md text-gray-500 mt-4 underline"
                  type="button"
                >
                  Go back just one step
                </button>
              </div>
            )}
          </Form>
        </div>

        {/* Bonuses Section */}
        <div className="flex-1 bg-[#EBFDF5] p-6 md:max-w-[50%] pt-0 md:pt-6">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Also, register before the<br />
              deadline to unlock <span className="text-primary">Bonuses<br />
                worth Rs. 20,000 for FREE!</span>
            </h2>

            <div className="space-y-4 mt-6">
              <p className="text-lg md:text-2xl text-gray-900">
                <span className="font-bold underline">BONUS 1:</span>{" "}
                Workshop Starter Kit |{" "}
                <span className="italic font-semibold">Value :2000 INR</span>
              </p>

              <p className="text-lg md:text-2xl text-gray-900">
                <span className="font-bold underline">BONUS 2:</span>{" "}
                30 Days 3d Printing<br />
                Challenge Bundle |{" "}
                <span className="italic font-semibold">Value :3000 INR</span>
              </p>

              <p className="text-lg md:text-2xl text-gray-900">
                <span className="font-bold underline">BONUS 3:</span>{" "}
                Chance to win a 3d printer for free <br />
                Products Case Study | <span className="italic font-bold">Value : 15000 INR</span>
              </p>

              <p className="text-lg md:text-2xl text-gray-900">
                <span className="font-bold underline">BONUS 4:</span>{" "}
                Community of Businessmans<br />
                Owners | <span className="italic font-semibold">Value :2000 INR</span>
              </p>

              <p className="text-lg md:text-2xl text-gray-900">
                <span className="font-bold underline">BONUS 5:</span>{" "}
                Live Q&A | <span className="italic font-semibold">Value :3000 INR</span>
              </p>
            </div>

            <div className="mt-6">
              <div className="inline-block shadow-sm transform -rotate-1">
                <p className="text-lg md:text-2xl text-gray-900">
                  <span className="font-bold bg-[#FFF500]">Register Before today midnight</span> to grab
                  all the bonuses
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
