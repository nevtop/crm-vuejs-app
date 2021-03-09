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

export const ScrapReasons = [
    // GENERATION 
    [
        { value: '0', key: 'Call not picked' },
        { value: '1', key: 'Wrong number' },
        { value: '2', key: 'Requirement already fulfilled' },
        { value: '3', key: 'Requirement can\'t be fulfilled' },
        { value: '4', key: 'Service doesn\'t require anymore' },
        { value: '5', key: 'Service is too expensive' },
        { value: '7', key: 'Other' },
    ],
    // CONSULTATION
    [
        { value: '6', key: 'Call not picked after consultation booked' },
        { value: '8', key: 'Call not picked after consultation done' },
        { value: '9', key: 'Cancelled by relationship manager' },
        { value: '2', key: 'Requirement already fulfilled' },
        { value: '3', key: 'Requirement can\'t be fulfilled' },
        { value: '5', key: 'Service is too expensive' },
        { value: '10', key: 'Cancelled by client' },
        { value: '7', key: 'Other' },
    ],
    // TRIAL
    [
        { value: '11', key: 'Call not picked after trial booked' },
        { value: '12', key: 'Call not picked after trial done' },
        { value: '13', key: 'Cancelled by trainer' },
        { value: '2', key: 'Requirement already fulfilled' },
        { value: '10', key: 'Cancelled by client' },
        { value: '7', key: 'Other' },
    ],
    // CONVERSION
    [
        { value: '5', key: 'Service is too expensive' },
        { value: '10', key: 'Cancelled by client' },
    ]
]