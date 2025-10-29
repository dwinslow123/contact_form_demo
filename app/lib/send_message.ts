'use server';
const nodemailer = require('nodemailer');
import { z } from 'zod';

const contactFormSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.email('Invalid email address'),
    message: z.string().min(1, 'Message is required'),
    contact_email: z.email('Invalid contact email address')
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID;
const OAUTH_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
const OAUTH_REFRESH_TOKEN = process.env.OAUTH_REFRESH_TOKEN
const OAUTH_ACCESS_TOKEN = process.env.OAUTH_ACCESS_TOKEN;

export async function sendMessage(initialState: any, formData: FormData) {
    const formDataObj = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        message: formData.get('message') as string,
        contact_email: formData.get('contact_email') as string
    };

    // Validate data
    const validatedData = contactFormSchema.parse(formDataObj);

    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: true,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
            type: 'OAuth2',
            clientId: OAUTH_CLIENT_ID,
            clientSecret: OAUTH_CLIENT_SECRET,
            refreshToken: OAUTH_REFRESH_TOKEN,
            accessToken: OAUTH_ACCESS_TOKEN
        }
    });

    // Set up email data
    const mailOptions = {
        from: `"${validatedData.name}" <${validatedData.email}>`,
        to: validatedData.contact_email,
        subject: 'Demo contact form message',
        text: validatedData.message
    };
    try {
        // Send mail with defined transport object
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error('Error sending email:', error);
        return { error: 'Failed to send message. Please try again later.' };
    }
};
