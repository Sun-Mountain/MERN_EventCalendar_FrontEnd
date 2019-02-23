import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios';

const url = 'https://lettuce-meat-api.herokuapp.com/events/'

class EditEvent extends Component {

    constructor() {
        super()
    
        this.state = {
            redirect: false,
            title: '',
            date: new Date(),
            location: '',
            author: localStorage.getItem('lettuceId'),
            public: false
        };

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      componentDidMount() {
        axios.get(url + localStorage.lettuceId)
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


    handleDateChange(date) {
        this.setState({
            date: date
        });
    }

    handleChange(evt) {
        const variable = evt.target.name
        this.setState({[variable]: evt.target.value}, 
        () => {
            console.log(this.state)
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        axios.post('https://lettuce-meat-api.herokuapp.com/events/edit/' + `${localStorage.lettuceId}`, this.state )
            .then(() => {
                console.log(this.state)
                // console.log('hello')
                console.log('done creating')
                this.props.history.push('/')
                this.props.getLatestEvents()
                // does another axios.get
            })
    }

    handleRedirect() {
        return <Redirect to='/' />
    }


    render() {

        console.log(this.state)
        return (
            <div>
                <form className="form-wrapper" onSubmit={this.handleSubmit}>
                    <div className="label-title"><label htmlFor='title'>Event Name</label></div>
                    <div className="form-title"><input type="text" name="title" value={this.state.value} className="form" onChange={this.handleChange} /></div>
                    <div className="calendar"></div>
                    <div className="date">
                        <label htmlFor='date'>Date</label>
                        <DatePicker
                            selected={this.state.date}
                            onChange={this.handleDateChange} name="date" value={this.state.value}
                        /></div>
                    <div className="location">
                        <label htmlFor='location'>Location</label>
                        <input type="text" name="location" value={this.state.value} className="form" onChange={this.handleChange} /></div>
                    <div className="label-description"><label htmlFor='description'>Description</label></div>
                    <div className="form-description">
                        <textarea type="text" name="description" value={this.state.value} className="form" onChange={this.handleChange} />
                    </div>
                    <div className="label-cover"><label htmlFor='cover'>Cover?</label></div>
                    <div className="form-cover"><input type="text" name="cover" value={this.state.value} className="form" onChange={this.handleChange} /></div>
                    <div className="label-public"><label htmlFor='public'>Public Event</label></div>
                    <div className="form-public"><input type="checkbox" name="public" value={this.state.value} onChange={this.handleChange} /></div>
                    <div name="author" value={this.lettuceId}></div>
                    <div className="button-submit">
                    <Link to='/'><input value='Submit' type='submit' className="button" onClick={this.handleSubmit}/>
                    </Link></div>
                    
                </form>
            </div>
        );
    }
}

export default EditEvent;