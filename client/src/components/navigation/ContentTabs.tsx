// import {TabType, UserData} from "@/types";
//
// interface ContentTabsProps {
//     activeTab: TabType;
//     onTabChange: (tab: TabType) => void;
//     userData: UserData | undefined;
// }
//
// export const ContentTabs: React.FC<ContentTabsProps> = ({ activeTab, onTabChange, userData }) => {
//     const getTabLabel = (tab: TabType): string => {
//         const count = userData?.[tab]?.length || 0;
//         const labels: Record<any, string> = {
//             tasksInProgress: 'Tasks in progress',
//             tasksDone: 'Tasks done',
//             storiesToMove: 'Stories to Move',
//             storiesInQA: 'Stories in QA Test',
//             devValidationBlocked: 'Dev Validation Blocked',
//             defects: 'Defects',
//         };
//         return `${labels[tab]} (${count})`;
//     };
//
//     const tabs: TabType[] = ['tasksInProgress', 'tasksDone', 'storiesToMove', 'storiesInQA', 'devValidationBlocked', 'defects'];
//
//     return (
//         <div className="border-b border-gray-200">
//             <nav className="-mb-px flex">
//                 {tabs.map((tab) => (
//                     <button
//                         key={tab}
//                         onClick={() => onTabChange(tab)}
//                         className={`py-3 px-6 border-b-2 font-medium text-sm transition-colors ${
//                             activeTab === tab
//                                 ? 'border-blue-500 text-blue-600'
//                                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                         }`}
//                     >
//                         {getTabLabel(tab)}
//                     </button>
//                 ))}
//             </nav>
//         </div>
//     );
// };






////////////////////


// components/navigation/ContentTabs.tsx (Updated)
import { TabType, UserData } from "@/types";

interface ContentTabsProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
    userData: UserData | undefined;
}

export const ContentTabs: React.FC<ContentTabsProps> = ({ activeTab, onTabChange, userData }) => {
    const getTabLabel = (tab: TabType): string => {
        const count = userData?.[tab]?.length || 0;
        const labels: Record<TabType, string> = {
            tasksInToDo: 'Tasks in to do',
            tasksInProgress: 'Tasks in progress',
            tasksDone: 'Tasks done',
            storiesToMove: 'Stories to Move',
            storiesInQA: 'Stories in QA Test',
            devValidationBlocked: 'Dev Validation Blocked',
            defects: 'Defects', // Keep for type compatibility but won't be used here
        };
        return `${labels[tab]} (${count})`;
    };

    // Exclude defects from My Tasks tabs since it has its own sidebar item
    const tabs: TabType[] = ['tasksInToDo', 'tasksInProgress', 'tasksDone', 'storiesToMove', 'storiesInQA', 'devValidationBlocked'];

    return (
        <div className="border-b border-gray-200">
            <nav className="-mb-px flex overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => onTabChange(tab)}
                        className={`py-3 px-6 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                            activeTab === tab
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        {getTabLabel(tab)}
                    </button>
                ))}
            </nav>
        </div>
    );
};
