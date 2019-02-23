import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import axios from 'axios'
import '../MainEvent/MainEvent.scss';
import './OneEvent.scss'

// images
import lettuce from '../../images/lettuce.png'

const url = 'https://lettuce-meat-api.herokuapp.com/events/'

class OneEvent extends Component {

  constructor() {
    super()

    this.state = {
      event: {}
    }

    this.deleteHandler = this.deleteHandler.bind(this)
  }

  componentDidMount() {
    axios.get(url + this.props.match.params.id)
        .then(event => {
          console.log('event in state')
        this.setState({
            event: event.data
        })
          console.log(this.state)
    })
        .catch(err => {
        console.log(err)
        })
  }

  deleteHandler() {
    axios.delete(url + this.props.match.params.id, {
      data: {token: localStorage.token}
    })
    .then(res => {
        console.log('deleted')
  })
  .then(() => {
      console.log('has been deleted')
      this.props.history.push('/')
      this.props.getLatestEvents()
      // does another axios.get
  })
    .catch((err) => {
        console.log(err);
    })
  }
  
  
  renderEvent = (events) => {

    let showEvent
    if(events) {
      showEvent = events.filter( event =>
        event._id === this.props.match.params.id)[0]
      }
        
    if(showEvent) {
      return (
        <div className="event-card one-event">
          <h1><img src={lettuce} alt="" className="lettuce" />{showEvent.title}</h1>
          <div className="date-location-wrapper">
            <div>{showEvent.date}</div>
            <div>{showEvent.location}</div>
          </div>
          <div className="description-wrapper">{showEvent.description}</div>
          <div>${showEvent.cover}</div>

          <div className="updel-button-wrapper">
            <button>Update Event</button>
            <button onClick={this.deleteHandler}>Delete Event</button>
          </div>
        </div>
      )
      }
      else {
        return null
      }
  }
  
  render() {
    return (
      <div>
        {this.renderEvent(this.props.events)}
      </div>
    );
  }
}

export default OneEvent;