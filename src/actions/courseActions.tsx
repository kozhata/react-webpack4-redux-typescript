import * as types from "./actionTypes";
import courseApi from "../api/mockCourseApi";
import { Subscription, Observable } from "rxjs";
import { finalize } from "rxjs/operators";
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

const loadCourses = (dispatch) => {
    return Observable.create((subscriber) => {

        let createConsultantSubscription = courseApi.getAllCourses().subscribe(
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
        }
    });
    
    
    
    
    // return (dispatch): Subscription => {
    //     return courseApi.getAllCourses().subscribe(
    //         courses => {
    //             dispatch(loadCoursesSuccess(courses));
    //         },
    //         error => {
    //             throw error;
    //         }
    //     );
    // };
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

export { createCourseSuccess, loadCourses, saveCourse };
