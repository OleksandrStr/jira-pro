import {AlertCircle, CheckCircle, Clock} from "lucide-react";

export const PriorityIcon: React.FC<{ priority: string }> = ({ priority }) => {
    switch (priority?.toLowerCase()) {
        case 'critical':
            return <AlertCircle className="w-4 h-4 text-red-600" />;
        case 'high':
            return <AlertCircle className="w-4 h-4 text-red-500" />;
        case 'medium':
            return <Clock className="w-4 h-4 text-yellow-500" />;
        case 'low':
            return <CheckCircle className="w-4 h-4 text-green-500" />;
        default:
            return <Clock className="w-4 h-4 text-gray-500" />;
    }
};
