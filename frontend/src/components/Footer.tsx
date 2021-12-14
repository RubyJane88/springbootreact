import React from "react";
import { Avatar, Button } from "antd";
import "./Footer.css";

const Footer = (props) => {
  const handleClickAddStudentClickEvent = () => {
    props.handleAddStudentClickEvent();
  };

  return (
    <div className={"footer"}>
      {props.numberOfStudent !== 0 ? (
        <Avatar
          style={{ backgroundColor: "orange", marginRight: "5px" }}
          size={"large"}
        >
          {props.numberOfStudent ? props.numberOfStudent : 0}
        </Avatar>
      ) : null}
      <Button onClick={handleClickAddStudentClickEvent} type="primary">
        Add new student
      </Button>
    </div>
  );
};

export default Footer;
