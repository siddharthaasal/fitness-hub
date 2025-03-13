import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
    const [profileLoaded, setProfileLoaded] = useState(false);
    const [response, setResponse] = useState<any>(null);

    async function loadDashboard() {
        try {
            const res = await axios.get(
                "http://localhost:3001/api/auth/profile",
                { withCredentials: true } // Allows cookies to be sent
            );

            if (res.status === 200) {
                console.log(res.data);
                setResponse(res.data);
                setProfileLoaded(true);
            }
        } catch (error: any) {
            console.error("Error fetching profile:", error.response?.data || error.message);
        }
    }

    useEffect(() => {
        loadDashboard();
    }, []);

    return (
        <div>
            <h2>Hello there, welcome to Fithub</h2>
            {profileLoaded ? (
                <div>
                    <h3>Welcome user! Your profile:</h3>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            ) : (
                <p>Your profile is being fetched...</p>
            )}
        </div>
    );
}
