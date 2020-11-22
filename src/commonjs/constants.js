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
    RETRIEVE_CLIENT_INFO: '/client/info',
    CREATE_SESSION: '/session/create',
    FETCH_ALL_SESSIONS: '/session/all',
    RETRIEVE_SESSION_INFO: '/session/info',
    UPDATE_SESSION: '/session/update',
    REGISTER_MEMBER: '/member/register',
    UPDATE_MEMBER: '/member/update',
    FETCH_ALL_MEMBERS: '/member/all',
    RETRIEVE_MEMBER_INFO: '/member/info',
}