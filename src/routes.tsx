// React
import * as React from "react";
import { Route, Switch } from "react-router-dom";

// Components
import { HomePage } from "./components/home/homePage";
import { AboutPage } from "./components/about/aboutPage";
import CoursesPage from "./components/course/coursesPage";
import ManageCoursePage from "./components/course/manageCoursePage";

export default (
    <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/course" component={ManageCoursePage} />
        <Route path="/course/:id" component={ManageCoursePage} />
        <Route path="/about" component={AboutPage} />
    </Switch>
);
