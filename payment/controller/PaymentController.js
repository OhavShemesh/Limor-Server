const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
require('dotenv').config();

const isDevelopment = process.env.NODE_ENV === 'development';

const PAYPAL_API_URL = isDevelopment
    ? 'https://api.sandbox.paypal.com'
    : 'https://api.paypal.com';

const PAYPAL_CLIENT_ID = isDevelopment
    ? process.env.PAYPAL_CLIENT_ID_DEVELOPER
    : process.env.PAYPAL_CLIENT_ID_PRODUCTION;

const PAYPAL_SECRET = isDevelopment
    ? process.env.PAYPAL_SECRET_DEVELOPER
    : process.env.PAYPAL_SECRET_PRODUCTION;

const getPayPalAccessToken = async () => {
    const auth = `${encodeURIComponent(PAYPAL_CLIENT_ID)}:${encodeURIComponent(PAYPAL_SECRET)}`;
    const base64Auth = Buffer.from(auth).toString('base64');

    const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${base64Auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
    });

    const data = await response.json();

    if (!response.ok) {
        console.error('PayPal Auth Error:', data);
        throw new Error(`PayPal Auth Failed: ${data.error_description || 'Unknown error'}`);
    }

    return data.access_token;
};

const confirmPayPalPayment = async (req, res) => {
    const { orderId } = req.body;

    try {
        // Step 1: Get PayPal access token
        const accessToken = await getPayPalAccessToken();

        // Step 2: Capture the payment
        const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders/${orderId}/capture`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({}),
        });

        const data = await response.json();

        if (data.status === 'COMPLETED') {
            return res.json({ success: true, details: data });
        } else {
            return res.json({ success: false, message: 'Payment capture failed', details: data });
        }
    } catch (err) {
        console.error('Error confirming PayPal payment:', err);
        return res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
    }
};

module.exports = {
    confirmPayPalPayment,
};
