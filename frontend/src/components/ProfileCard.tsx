// import React from 'react';

interface ProfileProps {
    name: string;
    age: number;
    gender: string;
    height: number;
    currentWeight: number;
    goalWeight: number;
}

export default function ProfileCard({ name, age, gender, height, currentWeight, goalWeight }: ProfileProps) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-md max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-gray-800">👤 {name}'s Profile</h2>
            <div className="mt-3 space-y-2">
                <p><strong>Age:</strong> {age} years</p>
                <p><strong>Gender:</strong> {gender}</p>
                <p><strong>Height:</strong> {height} cm</p>
                <p><strong>Current Weight:</strong> {currentWeight} kg</p>
                <p><strong>Goal Weight:</strong> {goalWeight} kg</p>
            </div>
        </div>
    );
}
