import type { Metadata } from "next";
import { Jura } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./providers/ReduxProvider";

const jura = Jura({
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Portfolio Overview",
	description: "",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={jura.className}>
			<body>
				<ReduxProvider>{children}</ReduxProvider>
			</body>
		</html>
	);
}
