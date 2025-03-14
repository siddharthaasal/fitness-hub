import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Dashboard() {
    const navigate = useNavigate();

    const [tokenVerified, setTokenVerified] = useState(false);
    const [profileExists, setProfileExists] = useState(false);
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
                setTokenVerified(true);
                if (res.data.profileExists == false) {
                    navigate("/edit-profile");
                } else {
                    setProfileExists(true);
                }

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
            {profileExists ? (
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
