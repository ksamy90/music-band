import React from 'react';
import axios from 'axios';
import moment from 'moment';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.changeBand = this.changeBand.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.eventData = this.eventData.bind(this);
        this.state = {
            music: '',
            name: '',
            social: '',
            photo: '',
            events: []
        };
    };
    changeBand(e) {
        const music = e.target.value;
        this.setState(() => ({ music }));
    };
    onSubmit(e) {
        e.preventDefault();
        const rooturl = `https://rest.bandsintown.com/artists/${this.state.music}?app_id=my_app_id`;
        var self = this;
        axios.get(rooturl)
            .then(function(response){
                console.log(response);
                // console.log(self);
                self.setState(() => ({ name: response.data.name }));
                self.setState(() => ({ social: response.data.facebook_page_url }));
                self.setState(() => ({ photo: response.data.image_url }));
            })
            .catch(function(error){
                console.log(error);
            });
    }
    eventData() {
        const rooturl = `https://rest.bandsintown.com/artists/${this.state.music}/events?app_id=my_app_id`;
        var self = this;
        axios.get(rooturl)
            .then(function(response){
                console.log(response);
                self.setState(() => ({ events: response.data }));
            })
            .catch(function(error){
                console.log(error);
            });
    }

    render() {

        return (
            <div>
                <h1>Music Band Events</h1>
                <form onSubmit={this.onSubmit}>
                    <input type="text" value={this.state.music} onChange={this.changeBand} />
                    <button>Show Band</button>
                </form>
                <p>{this.state.name}</p>
                <p>{this.state.social}</p>
                <img src={this.state.photo} alt="Music Band" /><br /><br />
                <button disabled={this.state.photo === ''} onClick={this.eventData}>Show Events</button>
                <ol>
                    {
                        this.state.events.map((event) => {
                            return <li key={event.id}>{event.venue.name}- {event.venue.city}- {event.venue.country}-  {moment(event.datetime).format('MMMM Do, YYYY')}</li>;
                        })
                    }
                </ol>
            </div>
        );
    };
};
