export const CONFIG = {
    jiraServer: process.env.REACT_APP_JIRA_SERVER,
    BEApiUrl: process.env.REACT_APP_BE_URL,
};

export const USERS: Record<string, string> = {
    alex: '61dc0820bce5e0006981634f',
    fede: '63e119520015d0b19c2339da',
    flavian: '63e11952c3eb74ad8e98a71b',
    amos: '63e11951790148a18096af88',
    andrii: '5c37646913a8bb0b10399870',
    harut: '6155ac2464ff01007112e375',
    kseniya: '557058:25d06df4-ec2d-4105-b088-e7ee05d294d2',
    pavel: '62ff72a32cbfba0566adb831',
    vitalii: '6385f50e2acfad92d7b37b51',
};

export const PROJECTS = {
    all: 'All Projects',
    KRUIDVAT: 'Kruidvat',
    MRN20: 'Marionnaud',
    TPS20: 'TPS',
    EE20: 'Drogas'
} as const;
