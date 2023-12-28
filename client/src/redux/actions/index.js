import { createActions , createAction} from 'redux-actions';

// pour un action réalise un side-effect comme appeller API, il y a 3 actions:
// envoyer une requete 
// quand avec success
// quand erreur


export const getType = (reduxAction) => {
    return reduxAction().type;
}


// quand on crée la méthode createActions dans redux/actions, chaque action est une fonction retourne une valeur est un objet
export const getPosts = createActions({
    getPostsRequest : undefined,
    getPostsSuccess: (payload) => payload,
    getPostsFailure: (err) => err,
});

export const createPost = createActions({
    createPostRequest : (payload) => payload,
    createPostSuccess: (payload) => payload,
    createPostFailure: (err) => err,
});

export const updatePost = createActions({
    updatePostRequest : (payload) => payload,
    updatePostSuccess: (payload) => payload,
    updatePostFailure: (err) => err,
});

// action pour show model quand on clique sur le bouton + pour creer new post
export const showModel  = createAction('SHOW_CREATE_POST_MODEL');
export const hideModel  = createAction('HIDE_CREATE_POST_MODEL');



/*
    getType(getPosts.getPostSuccess)
    =>
    {
        type: 'getPostSuccess',
        payload: {
            name: 'Test'
        }
    }
*/