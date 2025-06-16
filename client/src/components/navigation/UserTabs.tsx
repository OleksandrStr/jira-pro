import {UserType} from "@/types";
import {USERS} from "@/constants";

interface UserTabsProps {
    activeUser: UserType;
    onUserChange: (user: UserType) => void;
}

export const UserTabs: React.FC<UserTabsProps> = ({ activeUser, onUserChange }) => (
    <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
            {(Object.keys(USERS) as UserType[]).map((user) => (
                <button
                    key={user}
                    onClick={() => onUserChange(user)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                        activeUser === user
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                    {user}
                </button>
            ))}
        </nav>
    </div>
);
