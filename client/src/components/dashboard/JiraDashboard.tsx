// components/pages/JiraDashboard.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { HomePage } from '@/components/pages/HomePage';
import { MyTasksPage } from '@/components/pages/MyTasksPage';
import { DefectsPage } from '@/components/pages/DefectsPage';
import {
    AppDispatch,
    fetchUserData,
    RootState,
    clearUserData
} from '@/store/slices/jiraSlice';
import { STORAGE_KEYS, TabType, UserType, ProjectType } from '@/types';
import { localStorageService } from '@/services/local-storage';
import {StatisticsPage} from "@/components/pages/StatisticsView";

type SidebarItem = 'home' | 'myTasks' | 'defects' | 'statistics';

const getStoredUser = (): UserType => {
    const activeUser = localStorageService.get<UserType>(STORAGE_KEYS.ACTIVE_USER);
    return activeUser || 'alex';
};

const getStoredProject = (): ProjectType => {
    const activeProject = localStorageService.get<ProjectType>(STORAGE_KEYS.ACTIVE_PROJECT);
    return activeProject || 'all';
};

const getStoredTab = (): TabType => {
    const activeTab = localStorageService.get<TabType>(STORAGE_KEYS.ACTIVE_TAB);
    return activeTab || 'tasksInToDo';
};

const getStoredSidebarItem = (): SidebarItem => {
    const activeItem = localStorageService.get<SidebarItem>('ACTIVE_SIDEBAR_ITEM');
    return activeItem || 'myTasks';
};

const setStoredUser = (user: UserType): void => {
    localStorageService.set(STORAGE_KEYS.ACTIVE_USER, user);
};

const setStoredProject = (project: ProjectType): void => {
    localStorageService.set(STORAGE_KEYS.ACTIVE_PROJECT, project);
};

const setStoredTab = (tab: TabType): void => {
    localStorageService.set(STORAGE_KEYS.ACTIVE_TAB, tab);
};

const setStoredSidebarItem = (item: SidebarItem): void => {
    localStorageService.set('ACTIVE_SIDEBAR_ITEM', item);
};

export const JiraDashboard: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { users, loading, error } = useSelector((state: RootState) => state.jira);

    const [activeUser, setActiveUser] = React.useState<UserType>(() => getStoredUser());
    const [activeProject, setActiveProject] = React.useState<ProjectType>(() => getStoredProject());
    const [activeTab, setActiveTab] = React.useState<TabType>(() => getStoredTab());
    const [activeSidebarItem, setActiveSidebarItem] = React.useState<SidebarItem>(() => getStoredSidebarItem());

    // Fetch data on mount and when activeUser or activeProject changes
    useEffect(() => {
        dispatch(fetchUserData({ userId: activeUser, project: activeProject }));
    }, [activeUser, activeProject, dispatch]);

    const handleUserChange = (user: UserType): void => {
        setActiveUser(user);
        setStoredUser(user);

        // Reset to default states when switching users
        setActiveSidebarItem('home');
        setStoredSidebarItem('home');

        setActiveTab('tasksInToDo');
        setStoredTab('tasksInToDo');

        // Clear existing user data and fetch new data
        dispatch(clearUserData());
        dispatch(fetchUserData({ userId: user, project: activeProject }));
    };

    const handleProjectChange = (project: ProjectType): void => {
        setActiveProject(project);
        setStoredProject(project);

        // Clear existing user data and fetch new data with the new project
        dispatch(clearUserData());
        dispatch(fetchUserData({ userId: activeUser, project }));
    };

    const handleSidebarItemChange = (item: SidebarItem): void => {
        setActiveSidebarItem(item);
        setStoredSidebarItem(item);

        // Set appropriate tab when switching to defects
        if (item === 'defects') {
            setActiveTab('defects');
            setStoredTab('defects');
        } else if (item === 'myTasks') {
            setActiveTab('tasksInProgress');
            setStoredTab('tasksInProgress');
        }
    };

    const handleTabChange = (tab: TabType): void => {
        setActiveTab(tab);
        setStoredTab(tab);
    };

    const handleNavigateToTab = (tab: TabType): void => {
        // Switch to appropriate sidebar item based on tab
        if (tab === 'defects') {
            setActiveSidebarItem('defects');
            setStoredSidebarItem('defects');
        } else {
            setActiveSidebarItem('myTasks');
            setStoredSidebarItem('myTasks');
        }

        // Set the tab
        setActiveTab(tab);
        setStoredTab(tab);
    };

    const currentUserData = users[activeUser];
    const isLoading = loading[activeUser] || false;

    const renderContent = () => {
        switch (activeSidebarItem) {
            case 'home':
                return (
                    <HomePage
                        activeUser={activeUser}
                        userData={currentUserData}
                        loading={isLoading}
                        onNavigateToTab={handleNavigateToTab}
                    />
                );
            case 'myTasks':
                return (
                    <MyTasksPage
                        activeTab={activeTab}
                        onTabChange={handleTabChange}
                        userData={currentUserData}
                        loading={isLoading}
                    />
                );
            case 'defects':
                return (
                    <DefectsPage
                        activeUser={activeUser}
                        userData={currentUserData}
                        loading={isLoading}
                    />
                );
            case 'statistics':
                return (
                    <StatisticsPage
                        activeUser={activeUser}
                        userData={currentUserData}
                        loading={isLoading}
                    />
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar
                activeUser={activeUser}
                onUserChange={handleUserChange}
                activeProject={activeProject}
                onProjectChange={handleProjectChange}
                activeItem={activeSidebarItem}
                onItemChange={handleSidebarItemChange}
                userData={currentUserData}
            />

            <div className="flex-1 flex flex-col">
                <Header />

                <main className="flex-1">
                    <div className="bg-white shadow rounded-lg m-6">
                        {error && (
                            <div className="m-6 mb-0 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
                                {error}
                            </div>
                        )}
                        {renderContent()}
                    </div>
                </main>
            </div>
        </div>
    );
};
