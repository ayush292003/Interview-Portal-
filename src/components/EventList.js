import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import EventIcon from "@material-ui/icons/Event";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import RemoveIcon from "@material-ui/icons/Remove";
import { format } from "date-fns";
import { dateFormat } from "../utils/DateUtils";
import img from '../images/profile.png';

const containerStyle = {
  overflowY: "scroll",
  width: "100%",
};

const imageStyle={
  width:'10%',
  height:'40%',
  marginRight:'20px',
  borderRadius:'20px',
  marginTop:'20px'
};

function handleClick(){
  window.open('https://drive.google.com/file/d/1eCCgKIJoX5j9GVS5pxOPitLtTmhg8hgu/view','_blank');
};

export default props => {
  const events = props.events
    .sort((a, b) => {
      return new Date(a.dtstart) > new Date(b.dtend) ? 1 : -1;
    })
    .map((node, index) => {
      const fmtDTStart = format(new Date(node.dtstart), dateFormat);
      const fmtDTEnd = format(new Date(node.dtend), dateFormat);
      return (
        <div key={index} className='container'>
          <ListItem button alignItems="flex-start">
            
            <img src={img} alt="Italian Trulli" style={imageStyle}/>
            
            {/* <ListItemIcon>
              <EventIcon style={{ color: "#FFFF00", fontSize: "2em" }} />
            </ListItemIcon> */}
            <ListItemText 
              primary={
                <React.Fragment>
                  <Typography className="textFont"
                    component="p"
                    //variant="body2"
                    style={{ color: "black", fontWeight: "bold",fontSize:'25px' }}
                  >
                    {node.title}
                  </Typography>
                  <Typography className="textFont"
                    component="p"
                    //variant="body2"
                    style={{ color: "black" }}
                  >
                    <span style={{ fontWeight: "bold", marginRight: ".5em" }}>
                      From:
                    </span>
                    {fmtDTStart}
                  </Typography>
                  <Typography className="textFont"
                    component="p"
                    //variant="body2"
                    style={{ color: "black" }}
                  >
                    <span style={{ fontWeight: "bold", marginRight: ".5em" }}>
                      To:
                    </span>
                    {fmtDTEnd}
                  </Typography>
                  
                  <Typography className="textFont"
                    component="p"
                    //variant="body2"
                    style={{ color: "black" }}
                  >
                    <span style={{ fontWeight: "bold", marginRight: ".5em" }}>
                      Location:
                    </span>
                    {node.location}
                  </Typography>
                  <Typography className="textFont"
                    component="p"
                    //variant="body2"
                    style={{ color: "black" }}
                  >
                    <span style={{ fontWeight: "bold", marginRight: ".5em" }}>
                      Email:
                    </span>
                    {node.email}
    
                  </Typography>
                  <Typography className="textFont"
                    component="p"
                    //variant="body2"
                    style={{ color: "black" }}
                  >
                    <span style={{ fontWeight: "bold", marginRight: ".5em" }}>
                      Phone No:
                    </span>
                    {node.phone}
                  </Typography>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography className="textFont"
                    component="span"
                    //variant="body2"
                    style={{ color: "black", fontSize: "1em" }}
                  >
                    {node.description}
                  </Typography>
                </React.Fragment>
              }
            />
            <div
              style={{
                position: "absolute",
                right: "2em",
                top: "1em",
                display: "flex",
                flexDirection: "column"
              }}
            >  
              <Button
                variant="contained"
                color="green"
                startIcon={<RemoveIcon />}
                onClick={() => props.onRemoveItem(node.uid)}
                title="Cancel (Delete) Appointment"
                disabled={props.formVisible}
                className="deletebutton"
                style={{ marginBottom: "1em" }}
              >
                <span className="buttontext">Cancel (Delete)</span>
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => props.onEditItem(node)}
                title="Edit Appointment"
                disabled={props.formVisible}
                className="editbutton"
              >
                <span className="buttontext">Edit</span>
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={handleClick}
                title="Edit Appointment"
                disabled={props.formVisible}
                className="editResume"
              >
                <span>Resume</span>
              </Button>
            </div>
          </ListItem>
        </div>
      );
    });
  return (
    <>
    {/* <div>
    <input type="text" className="input" onChange={this.handleChange} placeholder="Search..." />
        <ul>
        </ul>
    </div> */}
    <div style={containerStyle}>
      <List>{events}</List>
    </div>
    </>
  );
};
