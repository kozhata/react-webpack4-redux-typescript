// Services
import AuthorApi from "../api/mockAuthorApi";

// Actions
import * as types from "./actionTypes";

// RxJs
import { Observable } from "rxjs";

const loadAuthorsSuccess = authors => {
    return { type: types.LOAD_AUTHORS_SUCCESS, authors };
};

const loadAuthors = (dispatch): Observable<void> => {
    return Observable.create(() => {
        const createConsultantSubscription = AuthorApi.getAllAuthors().subscribe(
            authors => {
                dispatch(loadAuthorsSuccess(authors));
            },
            error => {
                throw error;
            }
        );

        return () => {
            if (createConsultantSubscription) {
                createConsultantSubscription.unsubscribe();
            }
        };
    });
};

export { loadAuthors };
