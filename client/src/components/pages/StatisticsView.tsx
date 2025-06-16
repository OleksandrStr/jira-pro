import React, { useMemo } from 'react';
import {
    CheckCircle,
    Clock,
    AlertTriangle,
    Target,
    TrendingUp,
    TrendingDown,
    Activity
} from 'lucide-react';
import { UserData } from "@/types";

interface StatisticsPageProps {
    activeUser: string;
    userData: UserData;
    loading: boolean;
}

export const StatisticsPage: React.FC<StatisticsPageProps> = ({
                                                                  activeUser,
                                                                  userData,
                                                                  loading
                                                              }) => {
    const statistics = useMemo(() => {
        if (!userData) return null;

        const allTasks = [
            ...(userData.tasksInProgress || []),
            ...(userData.tasksDone || []),
            ...(userData.storiesToMove || []),
            ...(userData.storiesInQA || []),
            ...(userData.devValidationBlocked || [])
        ];

        const completedTasks = userData.tasksDone || [];
        const defects = userData.defects || [];

        const tasksDone = completedTasks.length;

        const tasksInTime = completedTasks.filter(task =>
            task.originalEstimateSeconds > 0 && task.timeSpentSeconds <= task.originalEstimateSeconds
        ).length;

        const tasksOverEstimation = completedTasks.filter(task =>
            task.originalEstimateSeconds > 0 && task.timeSpentSeconds > task.originalEstimateSeconds
        ).length;

        const tasksWithEstimates = completedTasks.filter(task => task.originalEstimateSeconds > 0);
        const totalEstimated = tasksWithEstimates.reduce((sum, task) => sum + task.originalEstimateSeconds, 0);
        const totalLogged = tasksWithEstimates.reduce((sum, task) => sum + task.timeSpentSeconds, 0);
        const mediumVelocity = totalLogged > 0 ? (totalEstimated / totalLogged) : 0;

        const totalDefects = defects.length;
        const totalDefectTime = defects.reduce((sum, defect) => sum + defect.timeSpentSeconds, 0);
        const avgDefectSolveTime = defects.length > 0 ? totalDefectTime / defects.length / 3600 : 0;

        const uniqueStories = new Set(allTasks.map(task => task.parent).filter(parent => parent));
        const totalStories = uniqueStories.size;
        const avgDefectsPerStory = totalStories > 0 ? (totalDefects / totalStories) : 0;

        const storiesDone = new Set(
            completedTasks.map(task => task.parent).filter(parent => parent)
        ).size;

        return {
            tasksDone,
            tasksInTime,
            tasksOverEstimation,
            mediumVelocity,
            totalDefects,
            avgDefectSolveTime,
            avgDefectsPerStory,
            storiesDone
        };
    }, [userData]);

    if (loading) {
        return (
            <div className="p-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="h-24 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!statistics) {
        return (
            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Statistics</h2>
                <p className="text-gray-500">No data available for statistics.</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Statistics for {activeUser}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Tasks Done */}
                <div className="bg-white p-6 rounded-lg shadow border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Tasks Done</p>
                            <p className="text-3xl font-bold text-green-600">{statistics.tasksDone}</p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                </div>

                {/* Stories Done */}
                <div className="bg-white p-6 rounded-lg shadow border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Stories Done</p>
                            <p className="text-3xl font-bold text-emerald-600">{statistics.storiesDone}</p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-emerald-600" />
                    </div>
                </div>

                {/* Tasks in Time */}
                <div className="bg-white p-6 rounded-lg shadow border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Tasks in Time</p>
                            <p className="text-3xl font-bold text-blue-600">{statistics.tasksInTime}</p>
                            <p className="text-xs text-gray-500">
                                {statistics.tasksDone > 0 ? `${Math.round((statistics.tasksInTime / statistics.tasksDone) * 100)}%` : '0%'}
                            </p>
                        </div>
                        <Clock className="w-8 h-8 text-blue-600" />
                    </div>
                </div>

                {/* Over Estimation */}
                <div className="bg-white p-6 rounded-lg shadow border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Over Estimation</p>
                            <p className="text-3xl font-bold text-orange-600">{statistics.tasksOverEstimation}</p>
                            <p className="text-xs text-gray-500">
                                {statistics.tasksDone > 0 ? `${Math.round((statistics.tasksOverEstimation / statistics.tasksDone) * 100)}%` : '0%'}
                            </p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-orange-600" />
                    </div>
                </div>

                {/* Medium Velocity */}
                <div className="bg-white p-6 rounded-lg shadow border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Medium Velocity</p>
                            <p className="text-3xl font-bold text-cyan-600">{statistics.mediumVelocity.toFixed(2)}</p>
                            <p className="text-xs text-gray-500">Est/Logged Ratio</p>
                        </div>
                        {statistics.mediumVelocity >= 1 ? (
                            <TrendingUp className="w-8 h-8 text-green-600" />
                        ) : (
                            <TrendingDown className="w-8 h-8 text-red-600" />
                        )}
                    </div>
                </div>

                {/* Total Defects */}
                <div className="bg-white p-6 rounded-lg shadow border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Defects</p>
                            <p className="text-3xl font-bold text-red-600">{statistics.totalDefects}</p>
                        </div>
                        <AlertTriangle className="w-8 h-8 text-red-600" />
                    </div>
                </div>

                {/* Avg Defect Solve Time */}
                <div className="bg-white p-6 rounded-lg shadow border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Avg Defect Solve Time</p>
                            <p className="text-3xl font-bold text-indigo-600">{statistics.avgDefectSolveTime.toFixed(1)}h</p>
                        </div>
                        <Activity className="w-8 h-8 text-indigo-600" />
                    </div>
                </div>

                {/* Avg Defects per Story */}
                <div className="bg-white p-6 rounded-lg shadow border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Avg Defects/Story</p>
                            <p className="text-3xl font-bold text-purple-600">{statistics.avgDefectsPerStory.toFixed(2)}</p>
                        </div>
                        <Target className="w-8 h-8 text-purple-600" />
                    </div>
                </div>
            </div>
        </div>
    );
};
