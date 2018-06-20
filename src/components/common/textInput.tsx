// React
import * as React from "react";

// Models
import { ITextInput } from "../../models/models.d";

const TextInput = (props: ITextInput) => {
    const { name, label, onChange, placeholder, value, error } = props;

    let wrapperClass = "form-group";

    if (error && error.length > 0) {
        wrapperClass += " " + "has-error";
    }

    return (
        <div className={wrapperClass}>
            <label htmlFor={name}>{label}</label>
            <div className="field">
                <input
                    type="text"
                    name={name}
                    className="form-control"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
    );
};

export default TextInput;
