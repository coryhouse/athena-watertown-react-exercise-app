import React from "react";
import * as userApi from "./api/userApi";
import { Link, Redirect } from "react-router-dom";
import queryString from 'query-string';
import Toast from "@athena/forge/Toast";

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      redirect: false,
      userDeleted: false,
    };

    // bind in ctor
    //  this.deleteUser = this.deleteUser.bind(this); // act sane.
  }

  // Magical lifecycle method that's called after component is mounted on the page.
  // (there are lots of others). Only valid for class components. Function components use Hooks.
  componentDidMount() {
    userApi.getUsers().then(users => this.setState({ users: users }));
  }

  // Class field with an arrow func
  deleteUser = userId => {
    userApi.deleteUser(userId).then(() => {
      // Runs after the delete was successful
      const users = this.state.users.filter(user => user.id !== userId);
      this.setState({ users: users, userDeleted: true });
    });
  };

  renderUser = user => {
    return (
      <li key={user.id}>
        <button onClick={() => this.deleteUser(user.id)}>Delete</button>{" "}
        <Link id={"user-" + user.id} to={`/manage-user/${user.id}`}>
          {user.name} - {user.email}
        </Link>
      </li>
    );
  };

  // The JSX we returned here will be rendered.
  render() {

    const values = queryString.parse(this.props.location.search);

    return (
      <>
        <h1>Users</h1>
        {this.state.redirect && <Redirect to="/manage-user" />}
        <button onClick={() => this.setState({ redirect: true })}>
          Add User
        </button>
        <ul>{this.state.users.map(this.renderUser)}</ul>
        
        {this.state.userDeleted && 
          <Toast
            id={'user-deleted-toast'}
            headerText="User Deleted"
            alertType="success"
            onDismiss={() => {this.setState({userDeleted:false})}}
          >
            User was successfully deleted
          </Toast>
        }

        {values.saved === "success" &&
          <Toast
            id={'user-saved-toast'}
            headerText="User Saved"
            alertType="success"
          >
            {values.name} was saved successfully
          </Toast>
        }
      
      </>
    );
  }
}

export default Users;
