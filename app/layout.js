import { Outfit} from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Providers";

const outfit = Outfit({ subsets: ["latin"], weight:["400","500","600","700"] });

export const metadata = {
  title: "Next Blog App",
  description: "This is my fullstack blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <AuthProvider>
        {children}
        </AuthProvider>
        </body>
    </html>
  );
}
