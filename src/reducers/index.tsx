// React
import { combineReducers } from "redux";

// Utils
import courses from "./courseReducer";

const rootReducer = combineReducers({
    courses
});

export default rootReducer;
