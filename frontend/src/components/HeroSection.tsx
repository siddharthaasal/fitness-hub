
import { cn } from "@/lib/utils";
import { LineChart, Line, XAxis, ResponsiveContainer, Tooltip } from 'recharts';

export default function HeroSection() {
    // Sample data for the meal tracking widget
    const nutrientData = [
        { day: 'Mon', calories: 2100, protein: 85 },
        { day: 'Tue', calories: 1950, protein: 90 },
        { day: 'Wed', calories: 2200, protein: 95 },
        { day: 'Thu', calories: 2000, protein: 88 },
        { day: 'Fri', calories: 2300, protein: 92 },
        { day: 'Sat', calories: 1800, protein: 75 },
        { day: 'Sun', calories: 2050, protein: 80 },
    ];

    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-[#0c0c0e] bg-noise pt-28 px-6">
            {/* Abstract gradients in background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] -left-[10%] w-[50%] h-[30%] bg-accent/5 rounded-full filter blur-[100px] animate-pulse-soft"></div>
                <div className="absolute bottom-[20%] -right-[5%] w-[40%] h-[40%] bg-primary/5 rounded-full filter blur-[120px] animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto pt-12 pb-24 flex flex-col lg:flex-row items-center relative z-10">
                <div className="w-full lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
                    <div className="space-y-6 max-w-xl">
                        <span className="inline-block py-1 px-3 text-xs font-medium bg-primary/10 text-primary rounded-full animate-fade-in" style={{ animationDelay: '0.1s' }}>
                            AI-Powered Nutrition
                        </span>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight text-balance animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            Track your calories with <span className="text-primary">intelligence</span>
                        </h1>

                        <p className="text-lg text-muted-foreground font-light leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
                            Effortlessly track your nutrition with our AI assistant. Simply describe your meal in natural language, and we'll handle the rest.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                            <button className="px-6 py-3 text-white bg-primary rounded-full shadow-md hover:shadow-lg transition-all">
                                Start Free Trial
                            </button>
                            <button className="px-6 py-3 text-primary bg-white/5 backdrop-blur-sm border border-primary/20 rounded-full shadow-sm hover:shadow-md transition-all">
                                Watch Demo
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 relative">
                    <div className="relative w-full max-w-lg mx-auto animate-scale-in">
                        {/* Background blobs for the card */}
                        <div className="absolute top-1/4 -left-4 w-24 h-24 bg-primary/20 rounded-full filter blur-xl animate-pulse-soft"></div>
                        <div className="absolute bottom-1/3 -right-8 w-32 h-32 bg-accent/20 rounded-full filter blur-xl animate-pulse-soft" style={{ animationDelay: '1s' }}></div>

                        <div className="relative z-10 glass-card rounded-3xl shadow-elegant overflow-hidden animate-float">
                            <div className="aspect-[4/3] w-full bg-[#0b0b0d] rounded-t-3xl p-6">
                                <div className="h-full w-full flex flex-col">
                                    <p className="text-white/70 text-sm mb-2">Describe your meal</p>
                                    <div className="bg-gray-800/50 rounded-xl p-4 border border-white/10 mb-4">
                                        <p className="text-white text-left">I had a grilled chicken breast with quinoa and roasted vegetables for dinner</p>
                                    </div>

                                    {/* Meal tracking widget */}
                                    <div className="mt-4 mb-2">
                                        <p className="text-white/70 text-sm mb-2">This week's nutrition</p>
                                        <div className="h-[100px] w-full bg-black/20 rounded-lg border border-white/5 p-2">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <LineChart data={nutrientData}>
                                                    <XAxis dataKey="day" stroke="#666" tickLine={false} axisLine={false} />
                                                    <Tooltip
                                                        contentStyle={{
                                                            background: 'rgba(16, 16, 20, 0.9)',
                                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                                            borderRadius: '8px',
                                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
                                                        }}
                                                    />
                                                    <Line
                                                        type="monotone"
                                                        dataKey="calories"
                                                        stroke="hsl(var(--primary))"
                                                        strokeWidth={2}
                                                        dot={false}
                                                        animationDuration={1500}
                                                    />
                                                    <Line
                                                        type="monotone"
                                                        dataKey="protein"
                                                        stroke="hsl(var(--accent))"
                                                        strokeWidth={2}
                                                        dot={false}
                                                        animationDuration={1500}
                                                    />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                    <div className="mt-auto">
                                        <div className="w-full bg-primary/20 h-10 rounded-lg flex items-center justify-between px-4">
                                            <span className="text-white/70 text-sm">Send</span>
                                            <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 space-y-4 bg-[#0f0f13]">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-medium">Today's Nutrition</h3>
                                        <p className="text-xs text-muted-foreground">87% of daily goal</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <div className="w-5 h-5 rounded-full bg-primary"></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    {['Protein', 'Carbs', 'Fat'].map((item, i) => (
                                        <div key={i} className="p-3 bg-white/5 backdrop-blur-sm border border-white/5 rounded-xl">
                                            <p className="text-xs text-muted-foreground">{item}</p>
                                            <p className="text-sm font-medium">{(i + 1) * 25}g</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
        </section>
    );
};

