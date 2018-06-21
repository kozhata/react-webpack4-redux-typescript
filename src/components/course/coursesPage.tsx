// React
import * as React from "react";
import { connect } from "react-redux";

// Utils
import * as courseActions from "../../actions/courseActions";

// Components
import CourseList from "./courseList";

// RxJs
import { Subscription } from "rxjs";

// Models
import { ICoursesPageProps, ICoursesPageState } from "../../models/models.d";

class CoursesPage extends React.Component<ICoursesPageProps, ICoursesPageState> {
    private _subscription: Subscription;
    
    constructor(props, context) {
        super(props, context);
        const self = this;

        self.redirectToAddCourse = self.redirectToAddCourse.bind(self);
    }

    public componentDidMount() {
        const self = this;
        
        self.unsubscribe();

        self._subscription = self.props.loadCourses().subscribe(x => {
            let a = x;
        });
    }

    public courseRow(course, index) {
        return <div key={index}>{course.title}</div>;
    }

    public componentWillUnmount() {
        const self = this;

        self.unsubscribe();
    }

    public redirectToAddCourse() {
        const self = this;
        
        self.context.router.history.push('/course');
    }

    private unsubscribe() {
        const self = this;

        if (self._subscription) {
            self._subscription.unsubscribe();
            self._subscription = null;
        }
    }

    render() {
        const self = this;

        const { courses } = self.props;

        return (
            <div>
                <h1>Courses</h1>
                <input type="submit" value="Add course" className="btn btn-primary" onClick={self.redirectToAddCourse} />
                <CourseList courses={courses} />
            </div>
        );
    }

    static contextTypes = {
        router: () => null
    };
}

const mapStateToProps = (state, ownProps) => {
    return {
        courses: state.courses
    };
};

const mapDispachToProps = dispatch => {
    return {
        loadCourses: () => courseActions.loadCourses(dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispachToProps
)(CoursesPage);
