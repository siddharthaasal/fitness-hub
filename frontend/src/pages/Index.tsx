import { useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeatureCard from '@/components/FeatureCard';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import {
    MessageSquare,
    Bot,
    BarChart3,
    Utensils,
    BadgeCheck,
    LineChart
} from 'lucide-react';

export default function Index() {
    useEffect(() => {
        const initAnimation = () => {
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.reveal').forEach(el => {
                el.classList.remove('animate-fade-in');
                observer.observe(el);
            });
        };

        initAnimation();

        return () => {
            // Cleanup if needed
        };
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main>
                <HeroSection />

                {/* Features Section */}
                <section id="features" className="w-full py-24 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
                            <span className="inline-block py-1 px-3 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4">
                                Smart Features
                            </span>
                            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight">
                                AI-powered nutrition tracking
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Our intelligent system makes calorie tracking effortless with powerful features designed around simplicity.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={<MessageSquare className="w-6 h-6" />}
                                title="Text Description"
                                description="Simply describe your meal in natural language and our AI will calculate nutrition information instantly."
                                delay={0.1}
                            />
                            <FeatureCard
                                icon={<Bot className="w-6 h-6" />}
                                title="AI Assistant"
                                description="Get personalized nutrition advice and meal suggestions based on your goals and preferences."
                                delay={0.2}
                            />
                            <FeatureCard
                                icon={<BarChart3 className="w-6 h-6" />}
                                title="Detailed Analytics"
                                description="Track your nutrition trends over time with beautiful visualizations and actionable insights."
                                delay={0.3}
                            />
                            <FeatureCard
                                icon={<Utensils className="w-6 h-6" />}
                                title="Meal Planning"
                                description="Generate personalized meal plans that fit your nutritional goals and dietary preferences."
                                delay={0.4}
                            />
                            <FeatureCard
                                icon={<BadgeCheck className="w-6 h-6" />}
                                title="Accurate Database"
                                description="Access our extensive food database with verified nutritional information for thousands of items."
                                delay={0.5}
                            />
                            <FeatureCard
                                icon={<LineChart className="w-6 h-6" />}
                                title="Progress Tracking"
                                description="Set goals and track your progress with customizable metrics and milestone celebrations."
                                delay={0.6}
                            />
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section id="how-it-works" className="w-full py-24 px-6 bg-gradient-soft">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
                            <span className="inline-block py-1 px-3 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4">
                                Simple Process
                            </span>
                            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight">
                                How FitHub works
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Our intuitive process makes nutrition tracking simple and effortless.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {[
                                {
                                    step: '01',
                                    title: 'Describe Your Meal',
                                    description: 'Describe what you ate using natural language - "I had a chicken salad with olive oil dressing"',
                                    delay: 0.1
                                },
                                {
                                    step: '02',
                                    title: 'AI Analysis',
                                    description: 'Our AI identifies the food and calculates detailed nutritional information from your description.',
                                    delay: 0.2
                                },
                                {
                                    step: '03',
                                    title: 'Track & Learn',
                                    description: 'Review your nutrition data and get personalized insights and recommendations.',
                                    delay: 0.3
                                },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="text-center p-6 reveal"
                                    style={{ animationDelay: `${item.delay}s` }}
                                >
                                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white border border-border shadow-sm flex items-center justify-center">
                                        <span className="text-xl font-bold text-primary">{item.step}</span>
                                    </div>
                                    <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                                    <p className="text-muted-foreground">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <CTASection />
            </main>

            <Footer />
        </div>
    );
};

