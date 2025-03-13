import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SignIn from "@/components/SignIn";

export default function Signin() {
    return (
        <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
            <Header />
            <main className="flex items-center justify-center">
                <SignIn />
            </main>
            <Footer />
        </div>
    );
}