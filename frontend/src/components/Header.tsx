
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ease-in-out",
                scrolled ? "bg-[#0c0c0e]/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <span className="text-lg font-display font-semibold tracking-tight">FitHub</span>
                </div>

                <div className="hidden md:flex items-center space-x-8">
                    <a href="#features" className="text-sm font-medium text-white/80 hover:text-primary transition-colors">Features</a>
                    <a href="#how-it-works" className="text-sm font-medium text-white/80 hover:text-primary transition-colors">How it Works</a>
                </div>

                <div className="flex items-center space-x-4">
                    <button className="text-sm font-medium text-white/80 hover:text-primary transition-colors">Sign In</button>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-full shadow-sm hover:opacity-90 transition-all">
                        Get Started
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Header;
