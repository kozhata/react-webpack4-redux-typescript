import * as types from "./actionTypes";
import courseApi from "../api/mockCourseApi";
// import { beginAjaxCall, ajaxCallError } from "./ajaxStatusActions";

const createCourseSuccess = course => {
    return { type: types.CREATE_COURSE_SUCCESS, course };
};

export function updateCourseSuccess(course) {
    return { type: types.UPDATE_COURSE_SUCCESS, course };
}

const loadCoursesSuccess = courses => {
    return { type: types.LOAD_COURSES_SUCCESS, courses };
};

const loadCourses = () => {
    return function(dispatch) {
        return courseApi.getAllCourses().subscribe(
            courses => {
                dispatch(loadCoursesSuccess(courses));
            },
            error => {
                throw error;
            }
        );
    };
};

// export function saveCourse(course) {
//     return function(dispatch, getState) {
//         dispatch(beginAjaxCall());
//         return courseApi
//             .saveCourse(course)
//             .then(course => {
//                 course.id ? dispatch(updateCourseSuccess(course)) : dispatch(createCourseSuccess(course));
//             })
//             .catch(error => {
//                 dispatch(ajaxCallError(error));
//                 throw error;
//             });
//     };
// }

export { createCourseSuccess, loadCourses };
