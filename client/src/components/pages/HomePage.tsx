import React from 'react';
import { CheckSquare, ArrowRight, TestTube, AlertCircle, Bug } from 'lucide-react';
import { UserData, UserType, TabType } from '@/types';

interface HomePageProps {
    activeUser: UserType;
    userData: UserData | undefined;
    loading: boolean;
    onNavigateToTab: (tab: TabType) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
                                                      activeUser,
                                                      userData,
                                                      loading,
                                                      onNavigateToTab
                                                  }) => {
    if (loading) {
        return (
            <div className="p-6">
                <div className="animate-pulse">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-gray-200 rounded-lg h-32"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const statusCards = [
        {
            title: 'Tasks in Progress',
            count: userData?.tasksInProgress?.length || 0,
            icon: CheckSquare,
            color: 'bg-blue-500',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600',
            tab: 'tasksInProgress' as TabType
        },
        {
            title: 'Tasks Done',
            count: userData?.tasksDone?.length || 0,
            icon: CheckSquare,
            color: 'bg-green-500',
            bgColor: 'bg-green-50',
            textColor: 'text-green-600',
            tab: 'tasksDone' as TabType
        },
        {
            title: 'Stories to Move',
            count: userData?.storiesToMove?.length || 0,
            icon: ArrowRight,
            color: 'bg-orange-500',
            bgColor: 'bg-orange-50',
            textColor: 'text-orange-600',
            tab: 'storiesToMove' as TabType
        },
        {
            title: 'Stories in QA Test',
            count: userData?.storiesInQA?.length || 0,
            icon: TestTube,
            color: 'bg-purple-500',
            bgColor: 'bg-purple-50',
            textColor: 'text-purple-600',
            tab: 'storiesInQA' as TabType
        },
        {
            title: 'Dev Validation Blocked',
            count: userData?.devValidationBlocked?.length || 0,
            icon: AlertCircle,
            color: 'bg-yellow-500',
            bgColor: 'bg-yellow-50',
            textColor: 'text-yellow-600',
            tab: 'devValidationBlocked' as TabType
        },
        {
            title: 'Defects',
            count: userData?.defects?.length || 0,
            icon: Bug,
            color: 'bg-red-500',
            bgColor: 'bg-red-50',
            textColor: 'text-red-600',
            tab: 'defects' as TabType
        }
    ];

    const handleCardClick = (tab: TabType) => {
        onNavigateToTab(tab);
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Dashboard Overview
                </h1>
            </div>

            {/* Status Breakdown */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Status Breakdown</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {statusCards.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <button
                                key={index}
                                onClick={() => handleCardClick(card.tab)}
                                className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border border-transparent hover:border-gray-200 text-left"
                            >
                                <div className={`${card.color} rounded-full p-2 mr-4 flex-shrink-0`}>
                                    <Icon className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-600">{card.title}</p>
                                    <p className={`text-xl font-bold ${card.textColor}`}>{card.count}</p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
