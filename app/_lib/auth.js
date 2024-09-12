import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { createGuest, getGuest } from './data-service';

const authConfig = {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        async authorized({ auth }, request) {
            return !!auth?.user; // convert to boolean
        },
        async signIn({ user, account, profile }) {
            try {
                const existingGuest = await getGuest(user.email);

                if (!existingGuest)
                    await createGuest({
                        email: user.email,
                        fullName: user.name,
                    });

                return true;
            } catch {
                return false;
            }
        },
        async session({ session, token, user }) {
            try {
                // Get guest information by email (from session)
                const guest = await getGuest(session.user.email);

                // Attach guest ID from database to the session object
                if (guest) {
                    session.user.guestId = guest.id;
                } else {
                    // If guest is not found, log an error or handle it
                    console.warn(
                        'Guest not found for session:',
                        session.user.email
                    );
                }

                // Return the modified session
                return session;
            } catch (error) {
                // Log session errors
                console.error('Error in session callback:', error);

                // Return session as is even in case of error
                return session;
            }
        },
    },
    pages: {
        signIn: '/login',
    },
};

export const {
    auth,
    signIn,
    signOut,
    handlers: { GET, POST },
} = NextAuth(authConfig);
