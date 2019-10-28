import React from "react";
import Root from  "@athena/forge/Root";
import Team from "@athena/forge/Icon/_autogen/Team";
import { NavLink, Route, Switch } from "react-router-dom";
import Users from "./Users";
import Home from "./Home";
import HomeIcon from "./reusable/HomeIcon";
import ManageUser from "./ManageUser";

import './App.scss';
import leaf from './leaf.svg';

function App() {
  return (
    <Root className="ah_app">
      <header className="ah_app__header">
        <img src={leaf} alt="leaf logo" height="25" className="ah_app__logo"/>
      </header>
      <div className="ah_app__body">
        <nav className="ah_app__navigation">
          <ul className="ah_app__navigation-list">
            <li>
              <NavLink to="/" exact={true} className="ah_app__navigation-link" activeClassName="is-selected">
                <HomeIcon className="ah_app__navigation-icon" />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/users" className="ah_app__navigation-link" activeClassName="is-selected">
                <Team className="ah_app__navigation-icon" />
                Users
              </NavLink>
            </li>
          </ul>
        </nav>
        <main className="ah_app__main">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/users" component={Users} />
            <Route path="/manage-user/:userId" component={ManageUser} />
            <Route path="/manage-user" component={ManageUser} />
          </Switch>
        </main>
      </div>
    </Root>
  );
}

export default App;
