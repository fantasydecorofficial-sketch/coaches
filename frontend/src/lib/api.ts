const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

type RequestOptions = {
    method?: string;
    headers?: Record<string, string>;
    body?: any;
};

async function fetchApi(endpoint: string, options: RequestOptions = {}) {
    const { method = 'GET', headers = {}, body } = options;

    const config: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        credentials: 'include', // Important for sessions
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
    }

    return data;
}

export const api = {
    // Auth
    adminLogin: (credentials: any) => fetchApi('/admin/login', { method: 'POST', body: credentials }),
    adminLogout: () => fetchApi('/admin/logout', { method: 'POST' }),

    // Registration
    createOrder: (data: any) => fetchApi('/create-order', { method: 'POST', body: data }),
    verifyPayment: (data: any) => fetchApi('/verify-payment', { method: 'POST', body: data }),

    // Admin
    getDashboardStats: (params?: any) => {
        const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
        return fetchApi(`/admin/dashboard${queryString}`);
    },
    getRegistrations: (params?: any) => {
        const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
        return fetchApi(`/admin/registrations${queryString}`);
    },
    getRegistration: (id: string) => fetchApi(`/admin/registrations/${id}`),

    // Analytics
    trackAnalytics: (eventType: string, data?: any) => fetchApi('/analytics', { method: 'POST', body: { eventType, data } }),

    // Settings
    getMeetUrl: () => fetchApi('/meet-url'),
    updateMeetUrl: (url: string) => fetchApi('/meet-url', { method: 'PUT', body: { url } }),

    // Contact
    contact: (data: any) => fetchApi('/contact', { method: 'POST', body: data }),
};

