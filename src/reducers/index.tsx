// Redux
import { combineReducers } from "redux";

// Utils
import courses from "./courseReducer";
import authors from "./authorReduces";

const rootReducer = combineReducers({
    courses,
    authors
});

export default rootReducer;
