import Footer from "@/components/footer/footer";
import Header from "@/components/header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Raleway } from 'next/font/google';

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-raleway',
});
export default function App({ Component, pageProps }: AppProps) {
  return <div className={raleway.variable}>
    <Header />
    <Component {...pageProps} />
    <Footer />
  </div>;
}
