import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SignUp from "@/components/SignUp";

export default function Signup() {
    return (
        <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
            <Header />
            <main className="flex items-center justify-center">
                <SignUp />
            </main>
            <Footer />
        </div>
    );
}