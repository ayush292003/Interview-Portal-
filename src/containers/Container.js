import React, { Component } from "react";
import DateTime from "../data/DateTime";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";
import Controls from "../components/Controls";
import './style.css';


const style = {
  background: "rgb(2,0,36)",
  background: " linear-gradient(to bottom right, #efa2b4, #aef1ee)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  padding: "0em 1em",
};


class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dt: "",
      formVisible: false,
      hasSelectedEvent: false,
      selectedEvent: {},
      filtered: [],
      events: [
        {
          uid: 0,
          dtstart: new Date("03/10/2022 23:00"),
          dtend: new Date("03/10/2022 23:45"),
          title: "Ayush Singh",
          location: "google meet",
          description: "SDE Intern",
          email: "AyushSingh123@gmail.com",
          phone: "9680848822",
        },
        {
          uid: 1,
          dtstart: new Date("07/20/2022 21:15"),
          dtend: new Date("07/20/2022 22:15"),
          title: "Nitin Srivastava",
          location: "google meet",
          description: "Business Operations",
          email: "nitin1234@gmail.com",
          phone: "0115524848",
        },
        {
          uid: 2,
          dtstart: new Date("06/19/2021 17:15"),
          dtend: new Date("06/19/2021 19:15"),
          title: "Sourabh Joshi",
          location: "Google Meet",
          description: "Teaching Instructor",
          email: "joshi2359@gmail.com",
          phone: "0177894848",
        },
        {
          uid: 3,
          dtstart: new Date("06/22/2021 17:15"),
          dtend: new Date("06/22/2021 19:15"),
          title: "Aman Singh",
          location: "zoom",
          description: "UI/UX Developer",
          email: "AmanSingh546586@gmail.com",
          phone: "01154674848",
        },
      ],
    };
    this.handleShowFormClick = this.handleShowFormClick.bind(this);
    this.handleFormCancel = this.handleFormCancel.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleEditItem = this.handleEditItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleShowFormClick() {
    this.setState({
      formVisible: !this.state.formVisible,
    });
  }
  handleFormCancel() {
    this.setState({
      formVisible: false,
      hasSelectedEvent: false,
      selectedEvent: {},
    });
  }
  handleChange(e) {
    let currentList = [];
    let newList = [];

    if (e.target.value !== "") {
      currentList = this.props.events;

      newList = currentList.filter((item) => {
        const lc = item.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = this.props.filtered;
    }
    this.setState({
      filtered: newList,
    });
  }
  handleFormSubmit(event) {
    let events = this.state.events;
    const eventIndex = events.findIndex((obj) => {
      return obj.uid === event.uid;
    });
    if (eventIndex === -1) {
      events.push(event);
    } else {
      events[eventIndex] = event;
    }
    this.setState({
      events: events,
      formVisible: false,
    });
  }
  removeEvent(array, uid) {
    const index = array.findIndex((obj) => {
      return obj.uid === uid;
    });
    return index >= 0
      ? [...array.slice(0, index), ...array.slice(index + 1)]
      : array;
  }
  handleRemoveItem(uid) {
    const events = this.removeEvent(this.state.events, uid);
    this.setState({ events: events });
  }
  handleEditItem(node) {
    this.setState({
      selectedEvent: node,
      hasSelectedEvent: true,
      formVisible: true,
    });
  }
  componentDidMount() {
    const dt = new DateTime();
    const currentDateTime = dt.getCurrentDateTime();
    this.setState({
      filtered: this.props.events,
    });
    this.setState({
      dt: currentDateTime,
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: nextProps.events,
    });
  }
  render() {
    return (
      <div id={this.props.id} style={style}>
        <Controls
          onShowFormClick={this.handleShowFormClick}
          formVisible={this.state.formVisible}
        />
        
        {this.state.formVisible ? (
          <EventForm
            formVisible={this.state.formVisible}
            formTitle="Schedule Interview"
            onFormCancel={this.handleFormCancel}
            onFormSubmit={this.handleFormSubmit}
            selectedEvent={this.state.selectedEvent}
            hasSelectedEvent={this.state.hasSelectedEvent}
          />
        ) : null}
        <EventList
          events={this.state.events}
          onRemoveItem={this.handleRemoveItem}
          onEditItem={this.handleEditItem}
        />
      </div>
    );
  }
}

export default Container;
