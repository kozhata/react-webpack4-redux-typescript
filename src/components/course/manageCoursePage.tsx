// React
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Utils
import * as courseActions from "../../actions/courseActions";

// Components
import CourseForm from "./courseForm";

// Models
import { ICourse, IManageCoursePageProps, IManageCoursePageState } from "../../models/models.d";

// import { authorsFormattedForDropdown } from "../../selectors/selectors";
// import toastr from "toastr";

export class ManageCoursePage extends React.Component<IManageCoursePageProps, IManageCoursePageState> {
    constructor(props, context) {
        super(props, context);

        const self = this;

        self.state = {
            course: Object.assign({}, props.course),
            errors: {},
            saving: false
        };

        self.updateCourseState = self.updateCourseState.bind(self);
        self.saveCourse = self.saveCourse.bind(self);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.course.id != nextProps.course.id) {
            // Necessary to populate form when existing course is loaded directly.
            this.setState({ course: Object.assign({}, nextProps.course) });
        }
    }

    updateCourseState(event) {
        const self = this;

        const field = event.target.name;
        let course = Object.assign({}, self.state.course);
        course[field] = event.target.value;
        return self.setState({ course: course });
    }

    courseFormIsValid() {
        const self = this;

        let formIsValid = true;
        let errors = {};

        if (self.state.course.title.length < 5) {
            errors["title"] = "Title must be at least 5 characters.";
            formIsValid = false;
        }

        self.setState({ errors: errors });
        return formIsValid;
    }

    saveCourse(event) {
        event.preventDefault();

        const self = this;

        self.setState({ saving: true });

        self.props.saveCourse(self.state.course).subscribe(
            () => self.redirect(),
            () => {
                self.setState({ saving: false });
            }
        );
    }

    private redirect() {
        const self = this;

        self.setState({ saving: false });        
        self.context.router.history.push('/courses');
    }

    render() {
        const self = this;

        return (
            <CourseForm
                onChange={self.updateCourseState}
                onSave={self.saveCourse}
                course={self.state.course}
                saving={self.state.saving}
            />
        );
    }

    static contextTypes = {
        router: () => null
    };
}

const getCourseById = (courses, id) => {
    const course = courses.filter(course => course.id == id);
    if (course.length) return course[0]; //since filter returns an array, have to grab the first.
    return null;
};

const mapStateToProps = (state, ownProps) => {
    const { match: { params } } = ownProps;

    let course = { id: "", watchHref: "", title: "", authorId: "", length: "", category: "" };

    if (params.id && state.courses.length) {
        course = getCourseById(state.courses, params.id);
    }

    return {
        course: course
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveCourse: (course: ICourse) => courseActions.saveCourse(course, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageCoursePage);
