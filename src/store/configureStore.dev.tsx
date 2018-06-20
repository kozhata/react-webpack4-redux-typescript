// Redux
import { createStore, applyMiddleware } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

// React
import thunk from "redux-thunk";

// Utils
import rootReducer from "../reducers";

const configureStore = (initialState?) => {
    return createStore(rootReducer, initialState, applyMiddleware(reduxImmutableStateInvariant()));
};

export default configureStore;
