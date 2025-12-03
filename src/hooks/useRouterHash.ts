// hooks/useRouterHash.js
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const useRouterHash = () => {
	const [hash, setHash] = useState("");
	const pathname = usePathname();

	useEffect(() => {
		const getHash = () => {
			if (typeof window !== "undefined") {
				setHash(window.location.hash.substring(1));
			}
		};

		getHash();

		// Listen for standard hash changes
		window.addEventListener("hashchange", getHash);

		// Listen for history navigation (back/forward)
		window.addEventListener("popstate", getHash);

		// Listen for clicks to catch Next.js Link navigation to hashes
		const handleClick = () => {
			// Small timeout to allow the navigation to complete
			setTimeout(getHash, 50);
		};
		window.addEventListener("click", handleClick);

		return () => {
			window.removeEventListener("hashchange", getHash);
			window.removeEventListener("popstate", getHash);
			window.removeEventListener("click", handleClick);
		};
	}, [pathname]); // Re-run if the path changes

	return hash;
};
