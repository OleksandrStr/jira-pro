import React from 'react';
import { IssueTable } from '@/components/tables/IssueTable';
import { UserData, UserType } from '@/types';

interface DefectsPageProps {
    activeUser: UserType;
    userData: UserData | undefined;
    loading: boolean;
}

export const DefectsPage: React.FC<DefectsPageProps> = ({
                                                            activeUser,
                                                            userData,
                                                            loading
                                                        }) => {
    const defectsData = userData?.defects || [];

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Defects</h2>
            </div>
            <IssueTable
                items={defectsData}
                type="defects"
                loading={loading}
            />
        </div>
    );
};
