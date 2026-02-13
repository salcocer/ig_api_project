import { redirect } from 'next/navigation';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const userLoggedIn = false; // Placeholder until auth store is implemented
    if (userLoggedIn) {
        redirect('/dashboard');
    } else {
        redirect('/login');
    }
    return <>{children}</>;
}
