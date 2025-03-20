
import React from 'react';
import { cn } from "@/lib/utils";

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    delay?: number;
    className?: string;
}
export default function FeatureCard({
    icon,
    title,
    description,
    delay = 0,
    className
}: FeatureCardProps) {
    return (
        <div
            className={cn(
                "group p-8 rounded-2xl glass-card shadow-elegant transition-all duration-300 animate-fade-in hover:translate-y-[-5px]",
                className
            )}
            style={{ animationDelay: `${delay}s` }}
        >
            <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>

            <h3 className="text-xl font-medium mb-3 font-syne">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
    );
};

