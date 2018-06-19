// React
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Utils
import * as authorActions from "../../actions/authorActions";

// Components
import SelectInput from "../common/selectInput";

export class AuthorsSelectInput extends React.Component<IManageCoursePageProps> {
    constructor(props, context) {
        super(props, context);
    }

    public componentDidMount() {
        this.props.actions.loadAuthors();
    }

    render() {
        const self = this;

        const { authors, value, onChange, error } = self.props;

        return (
            <SelectInput
                name="authorId"
                label="Author"
                value={value}
                defaultOption="Select Author"
                options={authors}
                onChange={onChange}
                error={error}
            />
        );
    }
}

interface IManageCoursePageProps {
    authors: any;
    actions: any;
    value: any;
    onChange: any;
    error: any;
}

const mapStateToProps = (state, ownProps) => {
    return {
        authors: state.authors.map(x => {
            return {
                value: x.id,
                key: x.id,
                text: x.firstName
            };
        }),
        ...ownProps
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(authorActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorsSelectInput);
