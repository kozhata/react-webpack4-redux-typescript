// Actions
import * as types from "./actionTypes";

// Services
import courseApi from "../api/mockCourseApi";

// RxJs
import { Observable, Subscription, Subscriber } from "rxjs";
// import { beginAjaxCall, ajaxCallError } from "./ajaxStatusActions";

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

const saveCourse = course => {
    return function(dispatch, getState) {
        return courseApi.saveCourse(course).subscribe(
            course => {
                course.id ? dispatch(updateCourseSuccess(course)) : dispatch(createCourseSuccess(course));
            },
            error => {
                throw error;
            }
        );
    };
};

export { loadCourses, saveCourse };
