import { redirect } from 'next/navigation';

export default function Page() {
    redirect('/login');
    return (
        <div className="flex h-screen items-center justify-center">
            <h1 className="text-4xl font-bold">Welcome to v0 App!</h1>
        </div>
    );
}
