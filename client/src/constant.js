export const INIT_STATE = {
    posts: {
        isLoading: false, //on n'appelle pas API pour get tous les posts ciations-> false par defaut
        data: [],
        request: {},
        error: undefined,
        requestDelete: {},
        requestUpdate: {},
        requestGetDetail: "",
        responseDelete: 0,
        responseUpdate: 0,
        responseDetail: {}
    },
    modal: {
        isShow: true,
        id: ""
    },
    auth: {
        request: {},
        error: {},
        response: {}
    },
    likePost: {
        requestSave: {},
        requestDelete: {},
        error: {},
        response: {},
        responseSavePost: "",
        responseDeletePost: "",
        mapLikePost: new Map(),
        mapTotalLikePost: new Map(),
        currentPost: ""
    }
};

export const API_URL = "http://localhost:5000/api";