// Reac
import * as React from "react";

// Components
import TextInput from "../common/TextInput";
import AuthorsSelectInput from "./authorsSelectInput";

const CourseForm = (props: ICourseForm) => {
    let errors: any = {};
    let { course, onSave, onChange, saving } = props;

    const onChangeLocal = event => {
        onChange(event);
    }

    const courseFormIsValid = () => {
        let formIsValid = true;        

        if (this.state.course.title.length < 5) {
            errors['title'] = "Title must be at least 5 characters.";
            formIsValid = false;
        }

        return formIsValid;
    }
    
    return (
        <form>
            <h1>Manage Course</h1>
            <TextInput name="title" label="Title" value={course.title} onChange={onChangeLocal} error={errors.title} />

            <AuthorsSelectInput
                value={course.authorId}
                onChange={onChangeLocal}
                error={errors.authorId}
            />

            <TextInput
                name="category"
                label="Category"
                value={course.category}
                onChange={onChangeLocal}
                error={errors.category}
            />

            <TextInput name="length" label="Length" value={course.length} onChange={onChangeLocal} error={errors.length} />

            <input
                type="submit"
                //disabled={saving}
                //value={saving ? "Saving..." : "Save"}
                className="btn btn-primary"
                onClick={onSave}
            />
        </form>
    );
};

interface ICourseForm {
    course?: any;
    onSave?: any;
    onChange?: any;
    saving?: any;
}

export default CourseForm;
