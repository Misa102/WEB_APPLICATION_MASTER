export const INIT_STATE = {
    posts: {
        isLoading: false, //on n'appelle pas API pour get tous les posts ciations-> false par defaut
        data: [],
        request: {},
        error: undefined
    },
    modal: {
        isShow: true,
        id: ""
    },
    auth: {
        request: {},
        error: {},
        response: {}
    }
};

export const API_URL = "http://localhost:5000/api";