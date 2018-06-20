// Actions
import * as types from "./actionTypes";

// Services
import courseApi from "../api/mockCourseApi";

// RxJs
import { Observable, Subscription, Subscriber } from "rxjs";
import { finalize } from "rxjs/operators";
// import { beginAjaxCall, ajaxCallError } from "./ajaxStatusActions";

// Models
import { ICourse } from "../models/models.d";

const createCourseSuccess = course => {
    return { type: types.CREATE_COURSE_SUCCESS, course };
};

const updateCourseSuccess = course => {
    return { type: types.UPDATE_COURSE_SUCCESS, course };
};

const loadCoursesSuccess = courses => {
    return { type: types.LOAD_COURSES_SUCCESS, courses };
};

const loadCourses = dispatch => {
    return Observable.create((subscriber: Subscriber<any>) => {
        const createConsultantSubscription: Subscription = courseApi.getAllCourses().subscribe(
            courses => {
                dispatch(loadCoursesSuccess(courses));
                subscriber.next(courses);
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

const saveCourse = (course: ICourse, dispatch) => {
    return Observable.create((subscriber: Subscriber<any>) => {
        const createConsultantSubscription: Subscription = courseApi
            .saveCourse(course)
            .pipe(
                finalize(() => {
                    subscriber.complete();
                })
            )
            .subscribe(
                (c: ICourse) => {
                    c.id ? dispatch(updateCourseSuccess(c)) : dispatch(createCourseSuccess(c));
                    subscriber.next();
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

export { loadCourses, saveCourse };
