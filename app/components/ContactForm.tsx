'use client';
import { useActionState, useState } from "react";
import { sendMessage } from "@/app/lib/send_message";
import { send } from "process";

const ContactForm = () => {
    const [ contactEmail, setContactEmail ] = useState('');
    const [ state, formAction, pending ] = useActionState(sendMessage, undefined);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'contact_email') {
            setContactEmail(value);
        }
    };

    return (
        <>
            <form action={formAction} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_email">
                        Contact Email (where you want to receive the message)
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="contact_email"
                        name="contact_email"
                        type="email"
                        placeholder="Your Email"
                        value={contactEmail}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your Name"
                    />
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Your Email"
                        />
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                            Message
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="message"
                            name="message"
                            rows={5}
                            placeholder="Your Message"
                        ></textarea>
                        <input type="hidden" name="contactEmail" value={contactEmail} />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Send Message
                        </button>
                    </div>
                </div>
                {pending && <p className="text-blue-500">Sending message...</p>}
                {state?.success && <p className="text-green-700">Message sent successfully!</p>}
                {state?.error && <p className="text-red-500">Error: {state.error}</p>}
            </form>
        </>
    );
};

export default ContactForm;