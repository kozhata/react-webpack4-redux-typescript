import AuthorApi from "../api/mockAuthorApi";
import * as types from "./actionTypes";

const loadAuthorsSuccess = authors => {
    return { type: types.LOAD_AUTHORS_SUCCESS, authors };
};

const loadAuthors = () => {
    return dispatch => {
        return AuthorApi.getAllAuthors().subscribe(
            authors => {
                dispatch(loadAuthorsSuccess(authors));
            },
            error => {
                throw error;
            }
        );
    };
};

export { loadAuthors };
