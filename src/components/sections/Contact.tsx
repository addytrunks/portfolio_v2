"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, FileText, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import contactData from "@/app/data/contact.json";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	subject: z.string().min(5, {
		message: "Subject must be at least 5 characters.",
	}),
	message: z.string().min(10, {
		message: "Message must be at least 10 characters.",
	}),
});

const Contact = () => {
	const { email, resumeLink, resumeText } = contactData;
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			subject: "",
			message: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsSubmitting(true);
		try {
			const response = await fetch("/api/send", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});

			if (!response.ok) {
				throw new Error("Failed to send message");
			}

			toast.success("Message sent successfully!");
			form.reset();
		} catch (error) {
			toast.error("Failed to send message. Please try again.");
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<section
			id="contact"
			className="py-20 border-t border-gray-900 mb-20 min-h-[60vh] flex flex-col justify-center"
		>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				viewport={{ once: true }}
				className="max-w-2xl mx-auto text-center w-full px-4"
			>
				<h2 className="text-2xl md:text-3xl font-bold mb-8 text-primary">
					<span className="text-secondary">05.</span> Contact
				</h2>

				<div className="flex flex-col items-center space-y-6 mb-12">
					<div className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group">
						<Mail className="w-5 h-5 text-secondary group-hover:animate-bounce" />
						<a href={`mailto:${email}`} className="text-xl font-mono">
							{email}
						</a>
					</div>

				</div>

				<div className="text-left bg-[#111] border border-gray-800 p-6 md:p-8 rounded-lg shadow-lg">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-xs text-gray-500 uppercase tracking-wider">
												Name
											</FormLabel>
											<FormControl>
												<Input
													placeholder="Adhithya Srivatsan"
													{...field}
													className="bg-[#0a0a0a] border-gray-800 text-gray-300 focus:border-primary"
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
										<FormItem>
											<FormLabel className="text-xs text-gray-500 uppercase tracking-wider">
												Email
											</FormLabel>
											<FormControl>
												<Input
													placeholder="adhithya@example.com"
													{...field}
													className="bg-[#0a0a0a] border-gray-800 text-gray-300 focus:border-primary"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name="subject"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-xs text-gray-500 uppercase tracking-wider">
											Subject
										</FormLabel>
										<FormControl>
											<Input
												placeholder="Collaboration Opportunity"
												{...field}
												className="bg-[#0a0a0a] border-gray-800 text-gray-300 focus:border-primary"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="message"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-xs text-gray-500 uppercase tracking-wider">
											Message
										</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Hi, I'm interested in your work on..."
												className="bg-[#0a0a0a] border-gray-800 text-gray-300 focus:border-primary resize-none"
												rows={5}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button
								type="submit"
								disabled={isSubmitting}
								className="w-full bg-primary/10 border border-primary text-primary font-bold py-6 rounded hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 group"
							>
								{isSubmitting ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										<span>Sending...</span>
									</>
								) : (
									<>
										<span>Send Message</span>
										<Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
									</>
								)}
							</Button>
						</form>
					</Form>
				</div>
			</motion.div>
		</section>
	);
};

export default Contact;
