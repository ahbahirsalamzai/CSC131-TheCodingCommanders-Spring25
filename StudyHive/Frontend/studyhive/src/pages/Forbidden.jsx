import React from "react";

export default function Forbidden() {
    return (
    <div className="min-h-screen flex items-center justify-center text-center">
        <div>
        <h1 className="text-5xl font-bold">403</h1>
        <p className="text-2xl mt-4">Access Denied</p>
        <p className="mt-2">You do not have permission to view this page.</p>
    </div>
    </div>
    );
}