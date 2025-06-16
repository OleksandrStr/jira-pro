export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const getStatusClasses = (status: string): string => {
        const baseClasses = "px-2 py-1 rounded-full text-xs font-medium truncate";
        switch (status?.toLowerCase()) {
            case 'done':
                return `${baseClasses} bg-green-100 text-green-800`;
            case 'early testing':
                return `${baseClasses} bg-blue-100 text-blue-800`;
            case 'qa test':
                return `${baseClasses} bg-purple-100 text-purple-800`;
            case 'dev validation blocked':
                return `${baseClasses} bg-red-100 text-red-800`;
            case 'open':
                return `${baseClasses} bg-gray-100 text-gray-800`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800`;
        }
    };

    return <span className={getStatusClasses(status)}>{status}</span>;
};
