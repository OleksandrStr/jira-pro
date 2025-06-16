import {JiraIssue, TabType} from "@/types";
import {CONFIG} from "@/constants";
import {Loader2, Timer, Bug} from "lucide-react";
import {StatusBadge} from "@/components/common/StatusBadge";
import {PriorityIcon} from "@/components/common/PriorityIcon";

interface TableProps {
    items: JiraIssue[];
    type: TabType;
    loading: boolean;
    defects?: JiraIssue[]; // Defects to calculate counts from
}

export const IssueTable: React.FC<TableProps> = ({ items, type, loading, defects }) => {
    const openJiraTicket = (key: string): void => {
        window.open(`${CONFIG.jiraServer}/browse/${key}`, '_blank');
    };

    const getTimeProgressColor = (spent: number, original: number): string => {
        if (spent > original ) {
            return 'text-red-600';
        } else {
            return 'text-green-600';
        }
    };

    // Calculate defect count for a given task
    const getDefectCount = (taskKey: string): number => {
        if (!defects) return 0;

        return defects.filter(defect => defect.parent === taskKey).length;
    };

    // Check if we should show defect count column (only for done tasks)
    const showDefectCount = type === 'tasksDone'; // Adjust based on your TabType enum

    if (loading) {
        return (
            <div className="text-center py-8">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
                <p className="mt-2 text-gray-600">Loading...</p>
            </div>
        );
    }

    if (!items || items.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">📝</div>
                <p>No data found</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Key</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Summary</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Assignee</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Priority</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Time Spent</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        <div className="flex items-center gap-1">
                            <Timer className="w-4 h-4"/>
                            Estimated
                        </div>
                    </th>
                    {showDefectCount && (
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                            <div className="flex items-center gap-1">
                                <Bug className="w-4 h-4"/>
                                Defects
                            </div>
                        </th>
                    )}
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Created</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item, index) => (
                    <tr
                        key={item.key}
                        className={`border-b border-gray-100 hover:bg-gray-50 ${
                            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        }`}
                    >
                        <td className="py-3 px-4">
                            <span className="font-mono text-sm text-blue-600">{item.key}</span>
                        </td>
                        <td className="py-3 px-4">
                            <div
                                className="font-medium text-gray-900 max-w-xs truncate cursor-pointer hover:text-blue-600 hover:underline transition-colors"
                                onClick={() => openJiraTicket(item.key)}
                                title={item.summary}
                            >
                                {item.summary}
                            </div>
                        </td>
                        <td className="py-3 px-4 text-gray-700">{item.assignee}</td>
                        <td className="py-3 px-4">
                            <StatusBadge status={item.status}/>
                        </td>
                        <td className="py-3 px-4">
                            <div className="flex items-center gap-1">
                                <PriorityIcon priority={item.priority}/>
                                <span className="text-sm">{item.priority}</span>
                            </div>
                        </td>
                        <td className="py-3 px-4">
                            <span className={`text-sm font-mono text-gray-600 flex justify-center ${getTimeProgressColor(item.timeSpentSeconds, item.originalEstimateSeconds)}`}>
                                {item.timeSpent}
                            </span>
                        </td>
                        <td className="py-3 px-4">
                            <span className="text-sm font-mono text-gray-700 flex justify-center">
                                {item.originalEstimate}
                            </span>
                        </td>
                        {showDefectCount && (
                            <td className="py-3 px-4">
                                <div className="flex items-center justify-center gap-1">
                                    {(() => {
                                        const defectCount = getDefectCount(item.parent);
                                        return (
                                            <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                                                defectCount === 0
                                                    ? 'bg-green-100 text-green-800'
                                                    : defectCount <= 2
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-red-100 text-red-800'
                                            }`}>
                                                {defectCount}
                                            </span>
                                        );
                                    })()}
                                </div>
                            </td>
                        )}
                        <td className="py-3 px-4 text-gray-600 text-sm">{item.created}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
