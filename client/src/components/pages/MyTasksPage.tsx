import React from 'react';
import { ContentTabs } from '@/components/navigation/ContentTabs';
import { IssueTable } from '@/components/tables/IssueTable';
import { TabType, UserData } from '@/types';

interface MyTasksPageProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
    userData: UserData | undefined;
    loading: boolean;
}

export const MyTasksPage: React.FC<MyTasksPageProps> = ({
                                                            activeTab,
                                                            onTabChange,
                                                            userData,
                                                            loading
                                                        }) => {
    const currentTabData = userData?.[activeTab] || [];

    return (
        <div>
            <ContentTabs
                activeTab={activeTab}
                onTabChange={onTabChange}
                userData={userData}
            />
            <div className="p-6">
                <IssueTable
                    items={currentTabData}
                    type={activeTab}
                    loading={loading}
                    defects={userData?.defects}
                />
            </div>
        </div>
    );
};
