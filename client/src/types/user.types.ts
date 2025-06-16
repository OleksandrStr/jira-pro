import {JiraIssue} from "./jira.types";

export interface UserData {
    tasksInToDo: JiraIssue[];
    tasksInProgress: JiraIssue[];
    tasksDone: JiraIssue[];
    storiesToMove: JiraIssue[];
    storiesInQA: JiraIssue[];
    devValidationBlocked: JiraIssue[];
    defects: JiraIssue[];
}

export type TabType = 'tasksInToDo' | 'tasksInProgress' | 'tasksDone' | 'storiesToMove' | 'storiesInQA' | 'devValidationBlocked' | 'defects';
export type UserType = 'alex' | 'fede' | 'flavian' | 'amos' | 'andrii' | 'harut' | 'kseniya' | 'pavel' | 'vitalii';
