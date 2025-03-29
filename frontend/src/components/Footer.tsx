export default function Footer() {
    return (
        <footer className="w-full py-6 px-6 bg-white ">
            <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} FitHub. All rights reserved.
                </p>
            </div>


        </footer >
    );
};


