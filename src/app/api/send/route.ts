import { NextResponse } from "next/server";
import { Resend } from "resend";
import * as z from "zod";

const resend = new Resend(process.env.RESEND_API_KEY || "re_123");

const contactFormSchema = z.object({
	name: z.string().min(2, { message: "Name must be at least 2 characters." }),
	email: z.string().email({ message: "Please enter a valid email address." }),
	subject: z
		.string()
		.min(5, { message: "Subject must be at least 5 characters." }),
	message: z
		.string()
		.min(10, { message: "Message must be at least 10 characters." }),
});



export async function POST(req: Request) {
	// const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";

	// if (!limiter(ip)) {
	// 	return NextResponse.json(
	// 		{ error: "Too many requests. Please try again later." },
	// 		{ status: 429 },
	// 	);
	// }

	try {
		if (!process.env.RESEND_API_KEY) {
			throw new Error("Missing Resend API Key");
		}

		const body = await req.json();
		const { name, email, subject, message } = contactFormSchema.parse(body);

		const data = await resend.emails.send({
			from: "Portfolio Contact Form <onboarding@resend.dev>", // Update this if you have a verified domain
			to: ["addysrivats@gmail.com"], // Send to the owner's email
			subject: `New Contact Form Submission: ${subject}`,
			html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; background-color: #ffffff;">
          <h2 style="color: #111827; margin-bottom: 24px; text-align: center; border-bottom: 2px solid #3b82f6; padding-bottom: 12px;">New Contact Form Submission</h2>
          
          <div style="margin-bottom: 16px;">
            <p style="font-size: 14px; color: #6b7280; margin-bottom: 4px; font-weight: 600; text-transform: uppercase;">Name</p>
            <p style="font-size: 16px; color: #1f2937; margin: 0; padding: 8px; background-color: #f9fafb; border-radius: 4px;">${name}</p>
          </div>

          <div style="margin-bottom: 16px;">
            <p style="font-size: 14px; color: #6b7280; margin-bottom: 4px; font-weight: 600; text-transform: uppercase;">Email</p>
            <p style="font-size: 16px; color: #1f2937; margin: 0; padding: 8px; background-color: #f9fafb; border-radius: 4px;">
              <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
            </p>
          </div>

          <div style="margin-bottom: 16px;">
            <p style="font-size: 14px; color: #6b7280; margin-bottom: 4px; font-weight: 600; text-transform: uppercase;">Subject</p>
            <p style="font-size: 16px; color: #1f2937; margin: 0; padding: 8px; background-color: #f9fafb; border-radius: 4px;">${subject}</p>
          </div>

          <div style="margin-bottom: 24px;">
            <p style="font-size: 14px; color: #6b7280; margin-bottom: 4px; font-weight: 600; text-transform: uppercase;">Message</p>
            <div style="font-size: 16px; color: #1f2937; margin: 0; padding: 12px; background-color: #f9fafb; border-radius: 4px; white-space: pre-wrap; line-height: 1.5;">${message}</div>
          </div>

          <div style="text-align: center; font-size: 12px; color: #9ca3af; margin-top: 32px; border-top: 1px solid #e5e7eb; padding-top: 16px;">
            Sent from your Portfolio Website
          </div>
        </div>
      `,
			replyTo: email,
		});

		return NextResponse.json(data);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json({ error: error.issues }, { status: 400 });
		}
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
