import React from "react";

export const Header: React.FC = () => (
    <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                        <span className="text-white font-bold text-sm">J</span>
                    </div>
                    <h1 className="text-xl font-semibold text-gray-900">
                        Jira Dashboard
                    </h1>
                </div>
            </div>
        </div>
    </div>
);
