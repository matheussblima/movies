import api from "../config/api";

// Actions
const GET_GENRE_REQUEST = 'movies/GET_GENRE_REQUEST';
const GET_GENRE_SUCCESS = 'movies/GET_GENRE_SUCCESS';
const GET_GENRE_FAILURE = 'movies/GET_GENRE_FAILURE';

// Reducer
export default function reducer(state = {}, action = {}) {
    switch (action.type) {
        case GET_GENRE_REQUEST:
            return Object.assign({}, state, {
                isFetch: action.isFetch,
                isSuccess: action.isSuccess
            });
        case GET_GENRE_SUCCESS:
            return Object.assign({}, state, {
                isFetch: action.isFetch,
                isSuccess: action.isSuccess,
                status: action.status,
                genres: action.payload
            });
        case GET_GENRE_FAILURE:
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
export const getGenreRequest = () => ({
    type: GET_GENRE_REQUEST,
    isSuccess: false,
    isFetch: true
});

export const getGenreSuccess = (json, status) => ({
    type: GET_GENRE_SUCCESS,
    isSuccess: true,
    isFetch: false,
    payload: json,
    status
});

export const getGenreFailure = (status, message) => ({
    type: GET_GENRE_FAILURE,
    status,
    message,
    isSuccess: false,
    isFetch: false
});



export const getGenres = (page) => dispatch => {
    dispatch(getGenreRequest());
    return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api.key}&language=pt-BR`)
        .then(response =>
            response.json().then(json => ({
                json,
                response
            }))
        )
        .then(({ response, json }) => {
            if (response.ok) {
                return dispatch(getGenreSuccess(json, response.status));
            }
            return dispatch(getGenreFailure(response.status));
        })
        .catch(erro => console.error(erro));
};

