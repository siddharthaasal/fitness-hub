import { Button } from "@/components/ui/button";

export default function CTASection() {
    return (
        <section className="w-full py-28 px-6 relative overflow-hidden">
            {/* Improved background with gradient and grid pattern */}
            <div className="absolute inset-0 bg-[#0f0f13] bg-grid mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#0c0c0e]/80 via-[#161619]/90 to-[#0c0c0e]/80"></div>

            {/* Animated accent blobs */}
            <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] bg-accent/5 rounded-full filter blur-[100px] opacity-60 animate-pulse-soft"></div>
            <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-primary/5 rounded-full filter blur-[100px] opacity-60 animate-pulse-soft" style={{ animationDelay: '2s' }}></div>

            <div className="max-w-5xl mx-auto text-center relative z-10">
                <span className="inline-block py-1 px-3 text-xs font-medium bg-accent/20 text-accent rounded-full mb-4 animate-fade-in">
                    Portfolio Project
                </span>

                <h2 className="text-4xl md:text-5xl font-syne font-bold mb-6 tracking-tight text-balance animate-fade-in">
                    <span className="text-gradient">Thoughtfully designed</span> for your resume
                </h2>

                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in">
                    FitHub showcases modern UI/UX principles, frontend engineering, and attention to detail that recruiters look for.
                </p>

                <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
                    <Button size="lg" className="rounded-full bg-accent hover:bg-accent/90 text-white px-8">
                        View Source Code
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full border-accent/20 text-white hover:bg-accent/10 px-8">
                        See More Projects
                    </Button>
                </div>
            </div>
        </section>
    );
};

