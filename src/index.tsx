// React
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

// Components
import { App } from "./components/app";

// Utils
import configureStore from "./store/configureStore.dev";

// Styles
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.css";

declare let module: any;

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);

if (module.hot) {
    module.hot.accept();
}
