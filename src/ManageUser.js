import React, { useState, useEffect } from "react";
import Heading from  "@athena/forge/Heading";
import Form from "@athena/forge/Form";
import FormField from "@athena/forge/FormField";
import * as userApi from "./api/userApi";

const newUser = {
  id: null,
  name: "",
  email: ""
};

function ManageUser(props) {
  // Handle state via the useState Hook
  const [user, setUser] = useState(newUser);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    // IOW, if editing.
    let mounted = true;
    if (props.match.params.userId) {
      userApi.getUserById(props.match.params.userId).then(user => {
        if (mounted) {
          setUser(user);
          setIsLoading(false);
        }
      });
    } else {
      // If adding, nothing to load
      setIsLoading(false);
    }

    // Called when component is unmounting.
    return () => (mounted = false);
  }, [props.match.params.userId]);

  function handleSave(savedUser) {
    props.history.push(`/users?saved=success&name=${savedUser.name}`);
  }

  function isValid() {
    // using underscore prefix to avoid naming conflict with state
    const _errors = {};
    if (!user.name) _errors.name = "Name is required.";
    if (!user.email) _errors.email = "Email is required.";
    setErrors(_errors);
    // If errors object still has no properties, then there are no errors.
    return Object.keys(_errors).length === 0;
  }

  function saveUser(event) {
    event.preventDefault(); // Don't post back.
    if (!isValid()) return;
    setIsFormSubmitted(true);
    user.id
      ? userApi.editUser(user).then(handleSave)
      : userApi.addUser(user).then(handleSave);
  }

  function handleChange(event) {
    const userCopy = { ...user };
    // using computed property syntax to set a property using a variable.
    userCopy[event.target.name] = event.target.value;
    setUser(userCopy);
  }

  if (isLoading) return "Loading... 🦄";
  return (
    <>
      <Heading text="Manage User" className="fe_u_margin--bottom-medium" />
      <Form
        nested={true}
        onSubmit={saveUser}
        requiredVariation="allFieldsRequired"
        buttonText={isFormSubmitted ? "Saving..." : "Save User"}
      >
        <FormField
          name="name"
          labelText="Name"
          type="text"
          error={errors.name}
          id="user-name"
          onChange={handleChange}
          value={user.name}
          required
        />

        <FormField
          labelText="Email"
          type="email"
          error={errors.email}
          name="email" // this is the property we wanna set onChange
          id="email"
          onChange={handleChange}
          value={user.email}
          required
        />

      </Form>
    </>
  );
}

export default ManageUser;
