import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as courseActions from "../../actions/courseActions";

interface ICoursesPage {
    actions: any;
    courses: Array<any>;
}

class CoursesPage extends React.Component<ICoursesPage> {
    public state = {
        course: {
            title: ""
        }
    };

    constructor(props, context) {
        super(props, context);
        const self = this;

        self.onTitleChange = self.onTitleChange.bind(self);
        self.onClickSave = self.onClickSave.bind(self);
    }

    public componentDidMount() {
        this.props.actions.loadCourses();
    }

    public onTitleChange(event) {
        const course = this.state.course;
        course.title = event.target.value;
        this.setState({ course: course });
    }

    public onClickSave() {
        this.props.actions.createCourseSuccess(this.state.course);
    }

    public courseRow(course, index) {
        return <div key={index}>{course.title}</div>;
    }

    render() {
        const self = this;

        return (
            <div>
                <h1>Courses</h1>
                {this.props.courses.map(this.courseRow)}
                <h2>Add Course</h2>
                <input type="text" value={self.state.course.title} onChange={self.onTitleChange} />

                <input type="submit" value="Save" className="btn btn-primary" onClick={self.onClickSave} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        courses: state.courses
    };
};

const mapDispachToProps = dispatch => {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispachToProps
)(CoursesPage);
