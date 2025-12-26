const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const twilio = require('twilio');
const { Cashfree, CFEnvironment } = require('cashfree-pg');

const app = express();
// Middleware
app.use(express.json());
app.use(cookieParser());
console.log({ fe: process.env.FRONTEND_URL });
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:8080',
    credentials: true
}));


// Hardcoded admin credentials
const ADMIN_CREDENTIALS = {
    username: 'vedant',
    password: 'V123dant@00' // Change this to a secure password
};

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key-change-this';

// Meeting link configuration
const MEETING_LINK = process.env.MEETING_LINK || 'https://meet.google.com/your-meeting-link';

// Email configuration
const emailTransporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// WhatsApp configuration (using services like Twilio, WhatsApp Business API, or others)
const WHATSAPP_CONFIG = {
    enabled: !!process.env.TWILIO_SID,
    twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER,
    accountSid: process.env.TWILIO_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN
};

// Basic request logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, req.body);
    next();
});

// Initialize Firebase Admin
let firebaseInitialized = false;

const initializeFirebase = () => {
    if (!firebaseInitialized) {
        try {
            const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
                ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
                : require('./firebase-service-account.json');

            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
            firebaseInitialized = true;
            console.log('Firebase initialized successfully');
        } catch (error) {
            console.error('Firebase initialization error:', error);
            throw error;
        }
    }
};

// Initialize Firebase on startup
initializeFirebase();

// ==================== NOTIFICATION FUNCTIONS ====================

// Helper to get meeting link
async function getMeetingLink() {
    try {
        const settingsDoc = await admin.firestore().collection('Settings').doc('general').get();
        if (settingsDoc.exists && settingsDoc.data().meetUrl) {
            return settingsDoc.data().meetUrl;
        }
    } catch (error) {
        console.error('Error fetching meeting link:', error);
    }
    return process.env.MEETING_LINK || 'https://meet.google.com/your-meeting-link';
}

// Send email notification
async function sendEmailNotification(email, name, transactionId) {
    const meetingLink = await getMeetingLink();

    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Course Registration Successful - Meeting Link',
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
            .meeting-link { background: #4CAF50; color: white; padding: 15px 30px; text-decoration: none; display: inline-block; border-radius: 5px; margin: 20px 0; font-weight: bold; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            .details { background: white; padding: 15px; border-left: 4px solid #4CAF50; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Registration Successful!</h1>
            </div>
            <div class="content">
              <p>Dear <strong>${name}</strong>,</p>
              <p>Thank you for registering for our 3d printing live workshop! Your payment has been successfully processed.</p>
              
              <div class="details">
                <p><strong>Transaction ID:</strong> ${transactionId}</p>
                <p><strong>Email:</strong> ${email}</p>
              </div>

              <p>Click the button below to join our meeting:</p>
              <div style="text-align: center;">
                <a href="${meetingLink}" class="meeting-link">Join Meeting</a>
              </div>
              
              <p>Or copy this link: <a href="${meetingLink}">${meetingLink}</a></p>
              
              <p>We look forward to seeing you!</p>
              
              <p>Best regards,<br>Vedant Vaani<br><a href="courses.fantasydecor.net">courses.fantasydecor.net</a></p>
            </div>
            <div class="footer">
              <p>This is an automated email. Please do not reply to this message.</p>
            </div>
          </div>
        </body>
        </html>
      `
        };

        const info = await emailTransporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
}

async function sendContactAcknowledgementEmail(email, name) {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'We’ve received your message',
            html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #2C3E50; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
                .details { background: #ffffff; padding: 15px; border-left: 4px solid #2C3E50; margin: 20px 0; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>📩 Thank you for contacting us</h1>
                </div>
                <div class="content">
                  <p>Dear <strong>${name}</strong>,</p>

                  <p>Thank you for reaching out to us. We’ve received your message and our team will review it shortly.</p>

                  <div class="details">
                    <p><strong>Email:</strong> ${email}</p>
                  </div>

                  <p>One of our team members will get back to you as soon as possible.</p>

                  <p>Best regards,<br>
                  Vedant Vaani<br>
                  <a href="https://courses.fantasydecor.net">courses.fantasydecor.net</a>
                  </p>
                </div>

                <div class="footer">
                  <p>This is an automated acknowledgement. Please do not reply to this email.</p>
                </div>
              </div>
            </body>
            </html>
            `
        };

        const info = await emailTransporter.sendMail(mailOptions);
        console.log('Contact acknowledgement email sent:', info.messageId);

        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending contact acknowledgement email:', error);
        return { success: false, error: error.message };
    }
}

async function sendContactRequestEmail(email, name, message) {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'New Contact Request from: ' + name,
            html: `
            <p>Someone Contacted on LiveWorkshop Website with a query,</p>
            <p>You have received a new contact request from ${name} (${email}).</p>
            <p>Message: ${message}</p>
            `
        };

        const info = await emailTransporter.sendMail(mailOptions);
        console.log('Contact Request email sent:', info.messageId);
        return true;

    } catch (error) {
        console.error('Error sending contact request email:', error);
        return false;
    }
}


const getNextSunday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();

    const daysUntilSunday = dayOfWeek === 0 ? 7 : 7 - dayOfWeek;
    const nextSunday = new Date(today);
    nextSunday.setDate(today.getDate() + daysUntilSunday);

    const day = nextSunday.getDate();
    const month = nextSunday.toLocaleString("en-IN", { month: "long" });

    return `${getOrdinal(day)} ${month}`;
};

const getOrdinal = (n) => {
    const rem10 = n % 10;
    const rem100 = n % 100;

    if (rem100 >= 11 && rem100 <= 13) return `${n}th`;
    if (rem10 === 1) return `${n}st`;
    if (rem10 === 2) return `${n}nd`;
    if (rem10 === 3) return `${n}rd`;
    return `${n}th`;
};

// Send WhatsApp notification
async function sendWhatsAppNotification(phone, name) {
    if (!WHATSAPP_CONFIG.enabled) {
        console.log('WhatsApp notifications not configured');
        return { success: false, error: 'WhatsApp not configured' };
    }

    try {
        const meetingLink = await getMeetingLink();
        const courseName = `Learn 3D Printing Business date: ${getNextSunday()} 10 AM - 12 PM`;

        const client = twilio(
            WHATSAPP_CONFIG.accountSid,
            WHATSAPP_CONFIG.authToken
        );

        const response = await client.messages.create({
            from: `whatsapp:${WHATSAPP_CONFIG.twilioPhoneNumber}`,
            to: `whatsapp:+91${phone}`,

            // Approved template SID
            contentSid: 'HX754008969441548c4b19044919a4f3f1',

            // Template variables MUST match exactly
            contentVariables: JSON.stringify({
                "1": name,
                "2": courseName,
                "3": meetingLink
            })
        });

        console.log('WhatsApp sent successfully:', response.sid);
        return { success: true, data: response };
    } catch (error) {
        console.error('Twilio Error:', {
            code: error.code,
            message: error.message,
            moreInfo: error.moreInfo
        });

        return { success: false, error: error.message };
    }
}

// ==================== HEALTH CHECK ====================
app.get('/api/health', (req, res) => {
    const healthCheck = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        env: {
            has_cashfree: !!(process.env.CASHFREE_APP_ID && process.env.CASHFREE_SECRET_KEY),
            has_firebase: firebaseInitialized,
            node_env: process.env.NODE_ENV
        }
    };
    console.log('Health check:', healthCheck);
    res.json(healthCheck);
});

app.get('/api/health/:phone/:name', async (req, res) => {
    const { phone, name } = req.params;

    await sendWhatsAppNotification(phone, name);

    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        env: {
            has_razorpay: !!process.env.RAZORPAY_KEY_ID,
            has_firebase: firebaseInitialized,
            node_env: process.env.NODE_ENV
        }
    });
});

// ==================== ANALYTICS ENDPOINTS ====================

// POST analytics (track events)
app.post('/api/analytics', async (req, res) => {
    try {
        const { eventType, data } = req.body;

        if (!eventType) {
            return res.status(400).json({
                success: false,
                error: 'Event type is required'
            });
        }

        const analyticsRef = admin.firestore().collection('Analytics');

        await analyticsRef.add({
            eventType, // 'page_visit', 'registration_started', 'button_click', 'payment_success', 'payment_failed'
            data: data || {},
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            createdAt: new Date().toISOString()
        });

        res.json({
            success: true,
            message: 'Analytics event tracked'
        });
    } catch (error) {
        console.error('Error tracking analytics:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to track analytics',
            details: error.message
        });
    }
});

// GET analytics (for dashboard)
app.get('/api/analytics', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        const analyticsRef = admin.firestore().collection('Analytics');
        let query = analyticsRef;

        // Apply date filters if provided
        if (startDate) {
            query = query.where('createdAt', '>=', startDate);
        }
        if (endDate) {
            query = query.where('createdAt', '<=', endDate);
        }

        const snapshot = await query.get();

        // Count different event types
        const analytics = {
            totalEvents: snapshot.size,
            pageVisits: 0,
            registrationStarted: 0,
            buttonClicks: 0,
            paymentSuccess: 0,
            paymentFailed: 0,
            events: []
        };

        snapshot.forEach(doc => {
            const data = doc.data();
            analytics.events.push({
                id: doc.id,
                ...data
            });

            switch (data.eventType) {
                case 'page_visit':
                    analytics.pageVisits++;
                    break;
                case 'registration_started':
                    analytics.registrationStarted++;
                    break;
                case 'button_click':
                    analytics.buttonClicks++;
                    break;
                case 'payment_success':
                    analytics.paymentSuccess++;
                    break;
                case 'payment_failed':
                    analytics.paymentFailed++;
                    break;
            }
        });

        res.json({
            success: true,
            analytics
        });
    } catch (error) {
        console.error('Error fetching analytics:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch analytics',
            details: error.message
        });
    }
});

// ==================== ADMIN LOGIN ====================
app.post('/api/admin/login', (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                error: 'Username and password are required'
            });
        }

        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            const token = jwt.sign(
                { username: username, role: 'admin' },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            const isProd = process.env.NODE_ENV === 'production';

            res.cookie('admin_token', token, {
                httpOnly: true,
                secure: isProd,
                sameSite: isProd ? 'none' : 'lax',
                maxAge: 24 * 60 * 60 * 1000 // 24 hours
            });

            res.json({
                success: true,
                message: 'Login successful'
            });
        } else {
            res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({
            success: false,
            error: 'Login failed',
            details: error.message
        });
    }
});

app.post('/api/admin/logout', (req, res) => {
    res.clearCookie('admin_token');
    res.json({
        success: true,
        message: 'Logout successful'
    });
});

// Middleware to verify admin session
const verifyAdmin = (req, res, next) => {
    const token = req.cookies.admin_token;

    if (!token) {
        return res.status(401).json({
            success: false,
            error: 'Unauthorized: No token provided'
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: 'Unauthorized: Invalid token'
        });
    }
};

// ==================== COURSE REGISTRATION ====================

// Initialize Cashfree


const getCashfreeInstance = () => {

    const cashfreeInstance = new Cashfree(
        CFEnvironment.PRODUCTION,
        process.env.CASHFREE_APP_ID,
        process.env.CASHFREE_SECRET_KEY
    );

    console.log("cashfree instance: ", {
        environment: CFEnvironment.PRODUCTION,
        appId: process.env.CASHFREE_APP_ID,
        secretKey: process.env.CASHFREE_SECRET_KEY
    });

    return cashfreeInstance;
};

// Create order for course registration
app.post('/api/create-order', async (req, res) => {
    try {
        console.log('Creating order for course registration:', req.body);

        const { amount, name, email, phone, address } = req.body;

        if (!amount || !name || !email || !phone) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: amount, name, email, phone'
            });
        }

        // Generate unique order ID for Cashfree
        const orderId = `course_${Date.now()}`;

        // Prepare request for Cashfree Order Creation
        const request = {
            order_amount: parseFloat(parseFloat(amount).toFixed(2)),
            order_currency: "INR",
            order_id: orderId,
            customer_details: {
                customer_id: `cust_${phone}`, // Using phone as customer ID
                customer_name: name,
                customer_email: email,
                customer_phone: phone
            },
            order_meta: {
                return_url: `${process.env.FRONTEND_URL || 'http://localhost:8080'}/thank-you?order_id={order_id}`,
                notify_url: `${process.env.BACKEND_URL || 'http://localhost:3000'}/api/webhook`
            },
            order_note: address || ''
        };

        console.log('Cashfree request:', request);

        const cashfree = getCashfreeInstance();
        try {
            const response = await cashfree.PGCreateOrder(request);
            const orderData = response.data;

            console.log('Cashfree order created:', orderData);

            // Store registration in Firebase
            const registrationRef = admin.firestore().collection('Registrations');
            const registrationDoc = await registrationRef.add({
                name,
                email,
                phone,
                address: address || '',
                amount,
                cashfreeOrderId: orderId,
                paymentSessionId: orderData.payment_session_id,
                paymentStatus: 'pending',
                transactionId: null,
                paymentDateTime: null,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                createdAtISO: new Date().toISOString()
            });

            console.log('Registration created in Firebase:', registrationDoc.id);

            res.json({
                success: true,
                payment_session_id: orderData.payment_session_id,
                order_id: orderId,
                registrationId: registrationDoc.id
            });
        } catch (cfError) {
            console.error('Cashfree API Error:', cfError.response?.data || cfError.message);
            throw cfError;
        }

    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create order',
            details: error.message
        });
    }
});

// Verify payment and update registration
app.post('/api/verify-payment', async (req, res) => {
    try {
        console.log('=== Starting Payment Verification ===');

        const { order_id } = req.body;

        if (!order_id) {
            return res.status(400).json({
                success: false,
                error: 'Missing order_id'
            });
        }

        const cashfree = getCashfreeInstance();

        // Fetch Order status from Cashfree
        const response = await cashfree.PGOrderFetchPayments(order_id);
        const payments = response.data;

        // Find successful payment
        const successfulPayment = payments.find(p => p.payment_status === 'SUCCESS');

        if (!successfulPayment) {
            console.error('No successful payment found for order:', order_id);
            // Track failed payment in analytics if needed, but usually we track specific events
            return res.status(400).json({
                success: false,
                error: 'Payment not successful'
            });
        }


        // Find and update registration
        const registrationsRef = admin.firestore().collection('Registrations');
        const querySnapshot = await registrationsRef
            .where('cashfreeOrderId', '==', order_id)
            .limit(1)
            .get();

        if (querySnapshot.empty) {
            console.error('Registration not found for order:', order_id);
            return res.status(404).json({
                success: false,
                error: 'Registration not found'
            });
        }

        const registrationDoc = querySnapshot.docs[0];
        const registrationData = registrationDoc.data();

        // Skip if already paid
        if (registrationData.paymentStatus === 'success') {
            return res.json({
                success: true,
                message: 'Payment already verified',
                registration: {
                    id: registrationDoc.id,
                    ...registrationData
                }
            });
        }

        const paymentDateTime = new Date().toISOString();

        // Update registration with payment details
        await registrationDoc.ref.update({
            paymentStatus: 'success',
            transactionId: successfulPayment.cf_payment_id,
            paymentDateTime: paymentDateTime,
            paymentMethod: successfulPayment.payment_group, // 'upi', 'card', etc.
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });

        console.log('Registration updated successfully');

        // Send email notification
        console.log('Sending email notification...');
        const emailResult = await sendEmailNotification(
            registrationData.email,
            registrationData.name,
            successfulPayment.cf_payment_id
        );

        // Send WhatsApp notification
        console.log('Sending WhatsApp notification...');
        const whatsappResult = await sendWhatsAppNotification(
            registrationData.phone,
            registrationData.name,
            successfulPayment.cf_payment_id
        );

        // Track successful payment in analytics
        await admin.firestore().collection('Analytics').add({
            eventType: 'payment_success',
            data: {
                cashfree_order_id: order_id,
                cashfree_payment_id: successfulPayment.cf_payment_id,
                amount: successfulPayment.payment_amount,
                emailSent: emailResult.success,
                whatsappSent: whatsappResult.success
            },
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            createdAt: new Date().toISOString()
        });

        console.log('=== Payment Verification Completed Successfully ===');

        res.json({
            success: true,
            message: 'Payment verified successfully',
            notifications: {
                email: emailResult.success ? 'sent' : 'failed',
                whatsapp: whatsappResult.success ? 'sent' : 'failed'
            },
            registration: {
                id: registrationDoc.id,
                ...registrationData,
                transactionId: successfulPayment.cf_payment_id,
                paymentDateTime
            }
        });
    } catch (error) {
        console.error('=== Payment Verification Failed ===');
        console.error('Error:', error);

        // Track failed payment in analytics
        try {
            await admin.firestore().collection('Analytics').add({
                eventType: 'payment_failed',
                data: {
                    cashfree_order_id: req.body.order_id,
                    error: error.message
                },
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
                createdAt: new Date().toISOString()
            });
        } catch (analyticsError) {
            console.error('Failed to track analytics:', analyticsError);
        }

        res.status(500).json({
            success: false,
            error: 'Failed to verify payment',
            details: error.message
        });
    }
});


// ==================== CONTACT ENDPOINT ====================

app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                error: 'All fields are required'
            });
        }

        // Send email notification
        console.log('Sending email notification...');

        const [emailResult, result] = await Promise.all([
            sendContactAcknowledgementEmail(email, name),
            sendContactRequestEmail(email, name, message)
        ]);

        console.log('=== Contact Form Submission Completed Successfully ===');

        res.json({
            success: true,
            message: 'Contact form submitted successfully',
            notifications: {
                email: emailResult.success ? 'sent' : 'failed',
                sent: result
            }
        });
    } catch (error) {
        console.error('=== Contact Form Submission Failed ===');
        console.error('Error:', error);

        // Track failed contact form submission in analytics
        try {
            await admin.firestore().collection('Analytics').add({
                eventType: 'contact_form_submission_failed',
                data: {
                    error: error.message
                },
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
                createdAt: new Date().toISOString()
            });
        } catch (analyticsError) {
            console.error('Failed to track analytics:', analyticsError);
        }

        res.status(500).json({
            success: false,
            error: 'Failed to submit contact form',
            details: error.message
        });
    }
});


// ==================== ADMIN ENDPOINTS ====================

// Get all registrations (paginated, searchable, filterable)
app.get('/api/admin/registrations', verifyAdmin, async (req, res) => {
    try {
        const {
            page = 1,
            limit = 1000,
            search = '',
            startDate,
            endDate,
            paymentStatus
        } = req.query;

        const registrationsRef = admin.firestore().collection('Registrations');
        let query = registrationsRef;

        // Apply payment status filter
        if (paymentStatus) {
            query = query.where('paymentStatus', '==', paymentStatus);
        }

        // Apply date filters
        if (startDate) {
            query = query.where('createdAtISO', '>=', startDate);
        }
        if (endDate) {
            query = query.where('createdAtISO', '<=', endDate);
        }

        // Order by creation date (descending)
        query = query.orderBy('createdAtISO', 'desc');

        // Get all matching documents
        const snapshot = await query.get();
        let registrations = [];

        snapshot.forEach(doc => {
            const data = doc.data();
            registrations.push({
                id: doc.id,
                ...data
            });
        });

        // Apply search filter (client-side for flexibility)
        if (search) {
            const searchLower = search.toLowerCase();
            registrations = registrations.filter(reg =>
                reg.name?.toLowerCase().includes(searchLower) ||
                reg.email?.toLowerCase().includes(searchLower) ||
                reg.phone?.includes(search) ||
                reg.transactionId?.toLowerCase().includes(searchLower)
            );
        }

        // Calculate pagination
        const totalRecords = registrations.length;
        const totalPages = Math.ceil(totalRecords / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + parseInt(limit);
        const paginatedRegistrations = registrations.slice(startIndex, endIndex);

        res.json({
            success: true,
            data: paginatedRegistrations,
            pagination: {
                currentPage: parseInt(page),
                totalPages,
                totalRecords,
                limit: parseInt(limit),
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        });
    } catch (error) {
        console.error('Error fetching registrations:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch registrations',
            details: error.message
        });
    }
});

// Get single registration details
app.get('/api/admin/registrations/:id', verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        const registrationDoc = await admin.firestore()
            .collection('Registrations')
            .doc(id)
            .get();

        if (!registrationDoc.exists) {
            return res.status(404).json({
                success: false,
                error: 'Registration not found'
            });
        }

        res.json({
            success: true,
            data: {
                id: registrationDoc.id,
                ...registrationDoc.data()
            }
        });
    } catch (error) {
        console.error('Error fetching registration:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch registration',
            details: error.message
        });
    }
});

// Get Meeting URL
app.get('/api/meet-url', async (req, res) => {
    try {
        const link = await getMeetingLink();
        res.json({ success: true, url: link });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch meeting URL' });
    }
});

// Update Meeting URL
app.put('/api/meet-url', verifyAdmin, async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ success: false, error: 'URL is required' });

        await admin.firestore().collection('Settings').doc('general').set({
            meetUrl: url,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        res.json({ success: true, message: 'Meeting URL updated' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to update meeting URL' });
    }
});

// Get dashboard summary
app.get('/api/admin/dashboard', verifyAdmin, async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        // Fetch registrations
        const registrationsRef = admin.firestore().collection('Registrations');
        let regQuery = registrationsRef;

        if (startDate) {
            regQuery = regQuery.where('createdAtISO', '>=', startDate);
        }
        if (endDate) {
            regQuery = regQuery.where('createdAtISO', '<=', endDate);
        }

        const registrationsSnapshot = await regQuery.get();

        // Calculate registration stats
        let totalRegistrations = 0;
        let successfulPayments = 0;
        let failedPayments = 0;
        let pendingPayments = 0;
        let totalRevenue = 0;

        registrationsSnapshot.forEach(doc => {
            const data = doc.data();
            totalRegistrations++;

            if (data.paymentStatus === 'success') {
                successfulPayments++;
                totalRevenue += data.amount || 0;
            } else if (data.paymentStatus === 'failed') {
                failedPayments++;
            } else {
                pendingPayments++;
            }
        });

        // Fetch analytics
        const analyticsRef = admin.firestore().collection('Analytics');
        let analyticsQuery = analyticsRef;

        if (startDate) {
            analyticsQuery = analyticsQuery.where('createdAt', '>=', startDate);
        }
        if (endDate) {
            analyticsQuery = analyticsQuery.where('createdAt', '<=', endDate);
        }

        const analyticsSnapshot = await analyticsQuery.get();

        let pageVisits = 0;
        let buttonClicks = 0;

        analyticsSnapshot.forEach(doc => {
            const data = doc.data();
            if (data.eventType === 'page_visit') pageVisits++;
            if (data.eventType === 'button_click') buttonClicks++;
        });

        res.json({
            success: true,
            dashboard: {
                registrations: {
                    total: totalRegistrations,
                    successful: successfulPayments,
                    failed: failedPayments,
                    pending: pendingPayments
                },
                revenue: {
                    total: totalRevenue,
                    currency: 'INR'
                },
                analytics: {
                    pageVisits,
                    buttonClicks
                }
            }
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch dashboard data',
            details: error.message
        });
    }
});

// Webhook endpoint - Handle Cashfree payment notifications
app.post('/api/webhook', async (req, res) => {
    try {
        console.log('=== Webhook Received ===');
        console.log('Headers:', req.headers);
        // req.body might be empty if content-type is not application/json or if parsed differently?
        // But we used express.json(), so it should be fine.
        console.log('Body:', req.body);

        const signature = req.headers['x-webhook-signature'];
        const timestamp = req.headers['x-webhook-timestamp'];

        if (!signature || !timestamp) {
            console.error('Missing webhook signature or timestamp');
            return res.status(400).send('Missing signature or timestamp');
        }

        // Verify webhook signature
        // Note: req.rawBody must be populated by the middleware we added earlier.
        const signatureData = timestamp + req.rawBody;
        const secretKey = process.env.CASHFREE_SECRET_KEY;

        const expectedSignature = crypto
            .createHmac('sha256', secretKey)
            .update(signatureData)
            .digest('base64');

        console.log('Signature verification:', {
            received: signature,
            expected: expectedSignature,
            matches: signature === expectedSignature
        });

        if (signature !== expectedSignature) {
            console.error('Signature mismatch');
            return res.status(400).send('Invalid signature');
        }

        // Initialize Firebase
        if (!firebaseInitialized) {
            await initializeFirebase();
        }

        const webhookData = req.body;
        const eventType = webhookData.type;

        console.log('Webhook event type:', eventType);

        // Handle payment success webhook
        if (eventType === 'PAYMENT_SUCCESS_WEBHOOK') {
            const orderData = webhookData.data.order;
            const paymentData = webhookData.data.payment;

            console.log('Processing successful payment:', {
                order_id: orderData.order_id,
                payment_status: paymentData.payment_status
            });

            // Update order in Firestore
            const ordersRef = admin.firestore().collection('Registrations');
            const querySnapshot = await ordersRef
                .where('cashfreeOrderId', '==', orderData.order_id)
                .limit(1)
                .get();

            if (!querySnapshot.empty) {
                const orderDoc = querySnapshot.docs[0];
                await orderDoc.ref.update({
                    paymentId: paymentData.cf_payment_id.toString(),
                    paymentStatus: 'success',
                    'payment.paymentStatus': 'success',
                    'payment.paymentMethod': paymentData.payment_group,
                    updatedAt: admin.firestore.FieldValue.serverTimestamp()
                });
                console.log('Order updated via webhook');
            }
        }

        res.status(200).send('OK');
    } catch (error) {
        console.error('Webhook processing error:', error);
        res.status(500).send('Webhook processing failed');
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        success: false,
        error: 'Server error',
        details: err.message
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Environment:', {
        has_cashfree_keys: !!process.env.CASHFREE_APP_ID && !!process.env.CASHFREE_SECRET_KEY,
        has_firebase: firebaseInitialized
    });
});
