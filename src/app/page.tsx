import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Publications from "@/components/sections/Publications";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";

/**
 * Home Page
 * 
 * The main landing page of the portfolio.
 * It composes various sections (Hero, About, Skills, etc.) into a single scrolling view.
 */
export default function Home() {
	return (
		<main className="max-w-5xl mx-auto">
			<Navbar />
			<Hero />
			<About />
			<Experience />
			<Skills />
			<Projects />
			<Achievements />
			<Publications />
			<Contact />

			<footer className="text-center text-gray-600 text-xs py-8 border-t border-gray-900 mt-10">
				<p>Built with Next.js, Tailwind & Framer Motion</p>
				<p className="mt-1">© {new Date().getFullYear()} Adhithya Srivatsan</p>
			</footer>
		</main>
	);
}
