import React, { Component } from 'react';

class OneEvent extends Component {

  componentDidUpdate(prevProps, prevState) {
    console.log('updated', prevProps, this.props)
  }
  
  renderEvent = (events) => {

    let showEvent
    if(events) {
      console.log('yes events')
      console.log(events)
      showEvent = events.filter( event =>
        event._id === this.props.match.params.id)[0]
      }
        
    if(showEvent) {
      console.log('event matches, showing')
      return (
        <div><h1>{showEvent.title}</h1> by <h3>{showEvent.email}</h3></div>
      )
      }
      else { 
        console.log('no match')
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