// React
import * as React from "react";

// Components
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
