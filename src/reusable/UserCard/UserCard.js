import React from "react";
import { Link } from "react-router-dom";
import Card from "@athena/forge/Card";
import Button from "@athena/forge/Button";
import PatientImagePlaceholder from "./PaitentImagePlaceholder";

import "./UserCard.scss";

const UserCard = props => {
  const {
    user,
    onDeleteClick
  } = props;

  return (
    <Card padded={false}>
      <div className="ah_c_user-card">
        <div className="ah_c_user-card__image">
          <PatientImagePlaceholder size="medium" />
        </div>
        <div className="ah_c_user-card__link">
          <Link id={"user-" + user.id} to={`/manage-user/${user.id}`}>
            {user.name} - {user.email}
          </Link>
        </div>
        <div className="ah_c_user-card__actions">
          <Button
            text="Delete"
            icon="Delete"
            variant="tertiary"
            onClick={() => onDeleteClick(user.id)}
            className="ah_c_user-card__action-button" 
          />
        </div>
      </div>
    </Card>
  )
};

export default UserCard;