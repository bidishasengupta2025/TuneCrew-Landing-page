import "../styles/globals.css";
import "../styles/satoshi.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import GoogleAnalytics from "@/components/GoogleAnalytics";

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang='en' suppressHydrationWarning={true}>
			<body
				className={`${inter.className} flex min-h-screen flex-col dark:bg-[#151F34]`}
			>
				<GoogleAnalytics />
				{children}
			</body>
		</html>
	);
};

export default layout;
