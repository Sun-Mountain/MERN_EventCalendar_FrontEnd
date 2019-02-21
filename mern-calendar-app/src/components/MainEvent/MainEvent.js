import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar/dist/entry.nostyle';
import axios from 'axios';
import './MainEvent.scss';

// images
import lettuce from '../../images/lettuce.png'

class MainEvent extends Component {

    constructor() {
        super()

        this.state = {
            events: []
        }
    }

    componentDidMount(){
        axios.get("http://localhost:3001/events")
            .then(console.log("got"))
            .then((res) => {
                console.log(res)
                this.setState({
                    events: res.data
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    

    render() {
        const events = this.state.events.map((event, index) => {
            return (
                <div key={index} className="event-card">
                    <Link to={`/events/${event._id}`} className="event-link" {...this.events}><h1><img src={lettuce} alt="" className="lettuce" />{event.title}</h1></Link>
                    <div className="date-location-wrapper">
                        <div>{event.date}</div>
                        <div>{event.location}</div>
                    </div>
                    <div className="description-wrapper">{event.description}</div>
                    <div>${event.cover}</div>
                </div>
            )
        })
        return (
            <div className="main-event">
                <div className="calendar-wrapper">
                    <Calendar />
                </div>
                {events}
            </div>
        );
    }
}

export default MainEvent;