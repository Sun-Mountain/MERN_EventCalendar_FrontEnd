import React, { Component } from 'react';
import '../MainEvent/MainEvent.scss';
import './OneEvent.scss'

// images
import lettuce from '../../images/lettuce.png'

class OneEvent extends Component {

  componentDidUpdate(prevProps, prevState) {
    console.log('updated', prevProps, this.props)
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