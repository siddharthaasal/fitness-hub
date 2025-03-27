
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import ProfileCard from "../components/ProfileCard";
import NutritionStats from "../components/NutritionStats";

export default function Dashboard() {
    const navigate = useNavigate();

    const [tokenVerified, setTokenVerified] = useState(false);
    const [profileExists, setProfileExists] = useState(false);
    const [response, setResponse] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    async function loadDashboard() {
        try {
            const res = await axios.get(
                "http://localhost:3001/api/auth/profile",
                { withCredentials: true }
            );

            if (res.status === 200) {
                setResponse(res.data);
                setTokenVerified(true);
                setProfileExists(res.data.profileExists);
                if (!res.data.profileExists) {
                    navigate("/edit-profile");
                }
            }
        } catch (error: any) {
            console.error("Error fetching profile:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadDashboard();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <h2 className="text-2xl font-bold mb-4">👋 Welcome to FitHub</h2>
            
            {loading ? (
                <p className="text-gray-600">Loading your profile...</p>
            ) : profileExists ? (
                <div className="space-y-6">
                    <ProfileCard {...response.profile} />
                    <NutritionStats {...response.nutritionData} />
                </div>
            ) : (
                <p className="text-red-500">Profile not found. Redirecting...</p>
            )}
        </div>
    );
}

