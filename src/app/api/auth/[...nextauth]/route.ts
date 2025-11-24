import NextAuth from 'next-auth';

///import { authOptions } from './auth-options';
import { authOptions } from './auth-options-doingdoit';

export const dynamic = 'force-dynamic';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
