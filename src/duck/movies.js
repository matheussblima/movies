import api from "../config/api";

// Actions
const GET_MOVIES_REQUEST = 'movies/GET_MOVIES_REQUEST';
const GET_MOVIES_SUCCESS = 'movies/GET_MOVIES_SUCCESS';
const GET_MOVIES_FAILURE = 'movies/GET_MOVIES_FAILURE';

// Reducer
export default function reducer(state = {}, action = {}) {
    switch (action.type) {
        case GET_MOVIES_REQUEST:
            return Object.assign({}, state, {
                isFetch: action.isFetch,
                isSuccess: action.isSuccess
            });
        case GET_MOVIES_SUCCESS:
            return Object.assign({}, state, {
                isFetch: action.isFetch,
                isSuccess: action.isSuccess,
                status: action.status,
                movies: action.payload
            });
        case GET_MOVIES_FAILURE:
            return Object.assign({}, state, {
                isFetch: action.isFetch,
                isSuccess: action.isSuccess,
                status: action.status,
                message: action.message
            });
        default:
            return state;
    }
}

// Action Creators
export const getMovieRequest = () => ({
    type: GET_MOVIES_REQUEST,
    isSuccess: false,
    isFetch: true
});

export const getMovieSuccess = (json, status) => ({
    type: GET_MOVIES_SUCCESS,
    isSuccess: true,
    isFetch: false,
    payload: json,
    status
});

export const getMovieFailure = (status, message) => ({
    type: GET_MOVIES_FAILURE,
    status,
    message,
    isSuccess: false,
    isFetch: false
});



export const getMovies = (page) => dispatch => {
    dispatch(getMovieRequest());
    return fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api.key}&page=${page || 1}&language=pt-BR`)
        .then(response =>
            response.json().then(json => ({
                json,
                response
            }))
        )
        .then(({ response, json }) => {
            if (response.ok) {
                return dispatch(getMovieSuccess(json, response.status));
            }
            return dispatch(getMovieFailure(response.status));
        })
        .catch(erro => console.error(erro));
};

