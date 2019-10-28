import React from "react";
import * as userApi from "./api/userApi";
import { Redirect } from "react-router-dom";
import queryString from 'query-string';
import Heading from "@athena/forge/Heading";
import Button from "@athena/forge/Button";
import List from "@athena/forge/List";
import Toast from "@athena/forge/Toast";
import ListItem from "@athena/forge/ListItem";
import UserCard from "./reusable/UserCard";

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

  // The JSX we returned here will be rendered.
  render() {
    const values = queryString.parse(this.props.location.search);
    return (
      <>
        <Heading text="Users" className="fe_u_margin--bottom-medium" />
        {this.state.redirect && <Redirect to="/manage-user" />}
        <Button 
          text="Add User"
          icon="Add" 
          onClick={() => this.setState({ redirect: true })} 
          className="fe_u_margin--bottom-medium"
        />
        <List padded={false} className="ah_c_user-list">
          {this.state.users.map( user => (
            <ListItem key={user.id}>
              <UserCard user={user} onDeleteClick={this.deleteUser} />
            </ListItem>
          ))}
        </List>

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
