
// This file handles database and email functionality

import { supabase } from '@/lib/supabase';

export const initializeDb = () => {
  console.log("Database initialized");
};

export const sendEmail = async (data: { name: string; email: string; message: string }, recipientEmail: string | null) => {
  try {
    if (!recipientEmail) {
      throw new Error("Recipient email not found");
    }

    // Call Supabase Edge Function for email sending
    const { data: responseData, error } = await supabase.functions.invoke('send-email', {
      body: {
        to: recipientEmail,
        subject: `Contact Form Message from ${data.name}`,
        from_email: data.email,
        name: data.name,
        message: data.message
      }
    });

    if (error) {
      throw error;
    }

    return { success: true, data: responseData };
  } catch (error: any) {
    console.error("Email sending error:", error);
    return { success: false, error: error.message || "Failed to send email" };
  }
};
