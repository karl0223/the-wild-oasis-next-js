import Logo from '@/app/_components/Logo';
import Navigation from '@/app/_components/Navigation';

import '@/app/_styles/globals.css';
import { Josefin_Sans } from 'next/font/google';

const josefin = Josefin_Sans({
    subsets: ['latin'],
    display: 'swap',
});

export const metadata = {
    title: {
        template: '%s / The Wild Oasis',
        default: 'Welcome / The Wild Oasis',
    },
    description:
        'Luxurious cabin hotel, located at the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests',
};

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body
                className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen`}
            >
                <header>
                    <Logo />
                    <Navigation />
                </header>
                <main>{children}</main>
                <footer>Copyright by The Wilnd Oasis</footer>
            </body>
        </html>
    );
}
