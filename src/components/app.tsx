import * as React from "react";

import Header from "./common/header";

import routes from "../routes";

export class App extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <Header />
                {routes}
            </div>
        );
    }
}
