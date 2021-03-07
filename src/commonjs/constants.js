export const HttpMethod = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete',
    PATCH: 'patch'
}

export const Url = {
    AUTHENTICATE_USER: '/user/login',
    ISSUE_TOKEN: '/user/jwt/refresh',
    REGISTER_CLIENT: '/client/register',
    UPDATE_CLIENT: '/client/update',
    FETCH_ALL_CLIENTS: '/client/all',
    FETCH_CLIENT_SELECT_LIST: '/client/selectlist',
    FETCH_SESSION_SELECT_LIST: '/session/selectlist',
    RETRIEVE_CLIENT_INFO: '/client/info',
    CREATE_SESSION: '/session/create',
    FETCH_ALL_SESSIONS: '/session/all',
    RETRIEVE_SESSION_INFO: '/session/info',
    UPDATE_SESSION: '/session/update',
    REGISTER_TRAINEE: '/trainee/register',
    UPDATE_TRAINEE: '/trainee/update',
    FETCH_ALL_TRAINEES: '/trainee/all',
    RETRIEVE_TRAINEE_INFO: '/trainee/info',
    CREATE_LEED: '/leed/create',
    FETCH_ALL_LEEDS: '/leed/all',
    RETRIEVE_LEED_INFO: '/leed/info',
    UPDATE_LEED: '/leed/update',
    SAVE_STAGE: '/leed/stage/save'
}

export const StageFlagOptions = [
    // GENERATION 
    [
        { value: 'INPROGRESS', key: 'Inprogress' },
        { value: 'RECORD', key: 'Record' },
    ],
    // CONSULTATION
    [
        { value: 'CANCELLED', key: 'Cancelled' },
        { value: 'INPROGRESS', key: 'Inprogress' },
        { value: 'OVERDUE', key: 'Overdue' },
        { value: 'RECORD', key: 'Record' },
        { value: 'SCHEDULED', key: 'Scheduled' },
    ],
    // TRIAL
    [
        { value: 'CANCELLED', key: 'Cancelled' },
        { value: 'INPROGRESS', key: 'Inprogress' },
        { value: 'OVERDUE', key: 'Overdue' },
        { value: 'RECORD', key: 'Record' },
        { value: 'SCHEDULED', key: 'Scheduled' },
    ],
    // CONVERSION
    [
        { value: 'INPROGRESS', key: 'Inprogress' },
        { value: 'RECORD', key: 'Record' },
    ]
]