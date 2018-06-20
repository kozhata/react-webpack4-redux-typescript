// Reac
import * as React from "react";

// Components
import TextInput from "../common/TextInput";
import AuthorsSelectInput from "./authorsSelectInput";

// Models
import { ICourseForm } from "../../models/models.d";

const CourseForm = ({ course, onSave, onChange, saving }: ICourseForm) => {
    let errors: any = {};

    const onChangeLocal = event => {
        onChange(event);
    };

    return (
        <form>
            <h1>Manage Course</h1>
            <TextInput name="title" label="Title" value={course.title} onChange={onChangeLocal} error={errors.title} />

            <AuthorsSelectInput value={course.authorId} onChange={onChangeLocal} error={errors.authorId} />

            <TextInput
                name="category"
                label="Category"
                value={course.category}
                onChange={onChangeLocal}
                error={errors.category}
            />

            <TextInput
                name="length"
                label="Length"
                value={course.length}
                onChange={onChangeLocal}
                error={errors.length}
            />

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

export default CourseForm;
