export default function Footer() {
    return (
        <footer className="w-full h-36 flex items-center justify-center mt-auto">
            <div className="container mx-auto px-4 text-center text-gray-600">
                <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
            </div>
        </footer>
    );
}
