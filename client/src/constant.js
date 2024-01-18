export const INIT_STATE = {
    posts: {
        isLoading: false, //on n'appelle pas API pour get tous les posts ciations-> false par defaut
        data: [],
    },
    modal: {
        isShow: false,
        id: ""

    },
};

export const API_URL = "http://localhost:5000/api";