import React, { useState } from 'react';
import { Home, CheckSquare, AlertTriangle, User, ChevronRight, Building, BarChart3 } from 'lucide-react';
import {ProjectType, UserType} from "@/types";
import {PROJECTS, USERS} from "@/constants";

type SidebarItem = 'home' | 'myTasks' | 'defects' | 'statistics';

interface UserData {
    tasksInProgress?: any[];
    tasksDone?: any[];
    storiesToMove?: any[];
    storiesInQA?: any[];
    devValidationBlocked?: any[];
    defects?: any[];
}

interface SidebarProps {
    activeUser: UserType;
    onUserChange: (user: UserType) => void;
    activeProject: ProjectType;
    onProjectChange: (project: ProjectType) => void;
    activeItem: SidebarItem;
    onItemChange: (item: SidebarItem) => void;
    userData: UserData | undefined;
}

export const Sidebar: React.FC<SidebarProps> = ({
                                                    activeUser,
                                                    onUserChange,
                                                    activeProject,
                                                    onProjectChange,
                                                    activeItem,
                                                    onItemChange,
                                                    userData
                                                }) => {
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);

    const sidebarItems = [
        { id: 'home' as SidebarItem, label: 'Home', icon: Home },
        {
            id: 'myTasks' as SidebarItem,
            label: 'My Tasks',
            icon: CheckSquare,
            count: userData ?
                (userData.tasksInProgress?.length || 0) +
                (userData.tasksDone?.length || 0) +
                (userData.storiesToMove?.length || 0) +
                (userData.storiesInQA?.length || 0) +
                (userData.devValidationBlocked?.length || 0) : 0
        },
        {
            id: 'defects' as SidebarItem,
            label: 'Defects',
            icon: AlertTriangle,
            count: userData?.defects?.length || 0
        },
        {
            id: 'statistics' as SidebarItem,
            label: 'Statistics',
            icon: BarChart3
        },
    ];

    return (
        <div className="w-64 min-w-64 bg-white shadow-lg h-screen flex flex-col flex-shrink-0">
            {/* User Selection */}
            <div className="p-4 border-b border-gray-200">
                <div className="relative mb-3">
                    <button
                        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                        className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-medium text-gray-900 capitalize">{activeUser}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 text-gray-500 transition-transform ${isUserDropdownOpen ? 'rotate-90' : ''}`} />
                    </button>

                    {isUserDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                            {(Object.keys(USERS) as UserType[]).map((user) => (
                                <button
                                    key={user}
                                    onClick={() => {
                                        onUserChange(user);
                                        setIsUserDropdownOpen(false);
                                    }}
                                    className={`w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                                        activeUser === user ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                                    }`}
                                >
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                        activeUser === user ? 'bg-blue-500' : 'bg-gray-400'
                                    }`}>
                                        <User className="w-3 h-3 text-white" />
                                    </div>
                                    <span className="capitalize">{user}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Project Selection */}
                <div className="relative">
                    <button
                        onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
                        className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <Building className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-medium text-gray-900">{PROJECTS[activeProject]}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 text-gray-500 transition-transform ${isProjectDropdownOpen ? 'rotate-90' : ''}`} />
                    </button>

                    {isProjectDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                            {(Object.keys(PROJECTS) as ProjectType[]).map((project) => (
                                <button
                                    key={project}
                                    onClick={() => {
                                        onProjectChange(project);
                                        setIsProjectDropdownOpen(false);
                                    }}
                                    className={`w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                                        activeProject === project ? 'bg-green-50 text-green-600' : 'text-gray-700'
                                    }`}
                                >
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                        activeProject === project ? 'bg-green-500' : 'bg-gray-400'
                                    }`}>
                                        <Building className="w-3 h-3 text-white" />
                                    </div>
                                    <span>{PROJECTS[project]}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.id}>
                                <button
                                    onClick={() => onItemChange(item.id)}
                                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                                        activeItem === item.id
                                            ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <Icon className="w-5 h-5" />
                                        <span className="font-medium">{item.label}</span>
                                    </div>
                                    {item.count !== undefined && item.count > 0 && (
                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                            activeItem === item.id
                                                ? 'bg-blue-100 text-blue-600'
                                                : 'bg-gray-100 text-gray-600'
                                        }`}>
                                            {item.count}
                                        </span>
                                    )}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};
