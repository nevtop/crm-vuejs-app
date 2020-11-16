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
    RETRIEVE_CLIENT_INFO: '/client/info',
    CREATE_SESSION: '/session/create',
    FETCH_ALL_SESSIONS: '/session/all',
    RETRIEVE_SESSION_INFO: '/session/info',
}