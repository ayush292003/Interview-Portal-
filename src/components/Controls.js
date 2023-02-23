import React from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import './style.css'

const containerStyle = {
  backgroundColor: "#FF8196",
  color: "white",
  display: "flex",
  alignItems: "center",
  fontWeight: "bold",
  fontSize: "1em",
  justifyContent: "space-around",
  padding: "1rem",
  width: "100%",
  margin:'10px',
  borderRadius:'70px',
  marginBottom:'50px'
};
const inputStyle = {
  minWidth: "14em"
};

export default props => {
  return (
    <div style={containerStyle}  id="titlebar">
      <div className='textContainer'>Interview Creation Portal</div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={props.onShowFormClick}
        title={props.formVisible ? `Hide Form` : `Show Form`}
        disabled={props.formVisible}
      >
        Add Interview
      </Button>
    </div>
  );
};
