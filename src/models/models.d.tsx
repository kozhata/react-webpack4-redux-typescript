// RxJs
import { Observable } from "rxjs";

export interface ICoursesPageProps {
    loadCourses: () => Observable<Array<ICourse>>;
    courses: Array<ICourse>;
}

export interface ICoursesPageState {
    course: ICourse;
}

export interface ICourse {
    id: string;
    title: string;
    authorId: string;
    category: string;
    length: string;
}

export interface ICourseForm {
    course?: ICourse;
    onSave?: (event) => void;
    onChange?: (event) => void;
    saving?: boolean;
}

export interface IManageCoursePageProps {
    authors: Array<IAuthor> | Array<any>;
    loadAuthors: () => Observable<Array<IAuthor>>;
    value: any;
    onChange: (event) => void;
    error: any;
}

export interface IAuthor {}

export interface ISelectInput {
    name: string;
    label: string;
    onChange: (event) => void;
    defaultOption?: string;
    value?: string;
    error?: string;
    options?: Array<any>;
}
export interface ITextInput {
    name: string;
    label: string;
    onChange: (event) => void;
    placeholder?: string;
    value?: string;
    error?: string;
}

export interface IManageCoursePageState {
    course: ICourse;
    errors: any;
    saving: boolean;
}

export interface IManageCoursePageProps {
    course: ICourse;
    saveCourse: (course: ICourse) => Observable<ICourse>;
}
