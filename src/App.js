import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import './App.css';
import Map from './Map';


const Topic = ({name, topicId, meetups}) => (
  <div >
    <h1>{name}</h1>
    <ul>
      { meetups.map( (meetup, index )=> 
        <li key={index}>
          <Link to={'/topic/'+topicId+'/meetup/'+index}>
            {meetup.name} - ({meetup.users.length} users)
          </Link>
        </li>
      )}
    </ul>
  </div>
)

const markers = [
  {   name:'',
      id:'33',
      position:{ lat: 33.8964022, lng: 35.5281077 }
  },
  {   name:'',
      id:4545,
      position:{ lat: 33.8954022, lng: 35.5271077 }
  }
]

const Meetup = ({topicId, date, location, topicName, name, description, creator, users }) => (
  <div>
    <Link to={'/topic/'+topicId}>back</Link>
    <h1>{topicName}</h1>
    <h2>{name}</h2>
    <h2>Location</h2>
    <Map markers={markers}/>
    <h3>Date: { date }</h3>
    <h4>by { creator.username }</h4>
    <p>{description}</p>
    <div>
      <h5>Attendance</h5>
      <ul>
        { users.map( user => <li key={user.username}>{user.username}</li>)}
      </ul>
    </div>
  </div>
)

class App extends Component {
  state = {
    user:3,
    users:[
      { username:'Anas Jamous'},
      { username:'Basel James'},
      { username:'Ahmad Khouja'},
      { username:'Lujin Ibrahim'},
      { username:'Ely Massouh'},
      { username:'Abd Al Karim'},
      { username:'Samah Bassout'},
      { username:'Nada Akkad'}
    ],
    topicsList:[
      { name:'maths'
      , meetups:[
        { name:'trigonometry',
          date:'23rd Sept',
          by:0,
          location:{lat:234234,lng:2234324},
          description:'Blah blah blah', 
          users:[0,4]
        },
        { name:'trigonometry2',
          date:'24th Jan',
          by:2,
          location:{lat:234234,lng:2234324},
          description:'Blah blah blah',
          users:[1,2]
        }
      ]
      },
      { name:'dev'
      , meetups:[
          { name:'Developers & Entrepreneurs',
            date:'12th may',
            by:3,
            location:{lat:234234,lng:2234324},
            description:'Hello and welcome to the MOST ACTIVE Meetup in the World for Developers and Entrepreneurs!!! ',
            users:[0,1,2]
          }
        ]
      }
    ]
  }
  renderTopic = (props) => {
    const topicId = props.match.params.topicId
    const topic = this.state.topicsList[topicId]
    if(!topic){
      return <div>topic not found</div>
    }
    
    const name = topic.name
    const meetups = topic.meetups
    
    return <Topic name={name} meetups={meetups} topicId={topicId}/>
  }
  onGoingToMeetup = (topicId, meetupId) => {
    const topic = this.state.topicsList[topicId]
    if(!topic){
      console.log('topic not found')
      return false
    }
    const meetup = topic.meetups[meetupId]
    if(!meetup){
      return false;
    }
    const users = [...meetup.users, this.state.user ]
    const newMeetup = { ...meetup, users }
    const meetups = topic.meetups.map( (meetup, index) => {
      if(index === meetupId){
        return newMeetup
      }
      return meetup
    })
    console.log(meetups)
    const newTopic = { ...topic, meetups }
    const topicsList = this.state.topicsList.map( (topic, index)=>{
      if(index === topicId){
        return newTopic
      }
      return topic
    })
    this.setState({topicsList})
  }
  renderMeetup = (props) => {
    const topicId = parseInt(props.match.params.topicId, 10)
    const meetupId = parseInt(props.match.params.meetupId, 10)
    const topic = this.state.topicsList[topicId]
    if(!topic){
      return <div>topic not found</div>
    }
    const meetup = topic.meetups[meetupId]
    if(!meetup){
      return <div>meetup not found</div>
    }
    const creatorId = meetup.by
    const creator = this.state.users[creatorId]
    const users = meetup.users.map(id => this.state.users[id])
    return (
      <div>
        <button onClick={()=>this.onGoingToMeetup(topicId, meetupId)}>I am going</button>
        <Meetup topicId={topicId} date={meetup.date} location={meetup.location} topicName={topic.name} name={meetup.name} description={meetup.description} creator={creator} users={users}/>
      </div>)
  }
  onRenderMeetupAddSubmit = (evt) => {
    evt.preventDefault()
    const form = evt.target;
    const name = form.name.value
    const date = form.date.value
    const lat = form.lat.value
    const lng = form.lng.value
    const description = form.description.value
    const topicId = parseInt(form.topicId.value,10)
    const location = {lat, lng}
    const meetup = {name, date, location, by:this.state.user, description, users:[]}
    const topic = this.state.topicsList[topicId]
    if(!topic){
      console.log('no topic');
      return;
    }
    const meetups = [ ...topic.meetups, meetup ]
    const newTopic = { ...topic, meetups }
    const topicsList = this.state.topicsList.map( (topic, index) =>{
      if( index === topicId ){
        return newTopic
      }
      return topic
    })
    this.setState({ topicsList })
  }
  renderMeetupAdd = (props) => {
    const topicId = props.match.params.topicId
    const topic = this.state.topicsList[topicId]
    if(!topic){
      return <div>topic not found</div>
    }
    return (<form onSubmit={this.onRenderMeetupAddSubmit}>
      <input placeholder="name" type="text" name="name"/><br/>
      <input placeholder="date" type="date" name="date"/><br/>
      <input type="hidden" name="topicId" value={topicId}/><br/>
      <input placeholder="lat" type="number" name="lat"/><br/>
      <input placeholder="lng" type="number" name="lng"/><br/>
      <textarea name="description"/><br/>
      <input type="submit" value="ok"/>
    </form>)
  }
  render() {
    return (
      
      <Router>
        <div>
          
          
          <div className="flex three center demo">
          <div>
            <article className="card">
              <img src="https://www.rd.com/wp-content/uploads/2017/09/01-Can-You-Pass-This-Elementary-School-Math-Test--760x506.jpg" />
              <footer>
                <h3>{ this.state.topicsList.map( (topic, index) => 
                      <Link className="topic" key={index} to={'/topic/'+index}>{topic.name}</Link>
                    )}
                </h3>
                <button>Follow</button>
              </footer>
            </article>
          </div>

            { this.state.topicsList.map( (topic, index) => 
              <Link className="topic" key={index} to={'/topic/'+index}>{topic.name}</Link>
            )}

          </div>
          <Switch>
            <Route exact path={'/'} render={()=><div>
                                                  <h1><span class="label">Meet Up</span></h1>
                                                </div>}/>
            <Route exact path={'/topic/:topicId'} render={this.renderTopic}/>
            <Route exact path={'/topic/:topicId/meetup/add'} render={this.renderMeetupAdd}/>
            <Route exact path={'/topic/:topicId/meetup/:meetupId'} render={this.renderMeetup}/>
          </Switch>  
        </div>
      </Router>
    );
  }
}

export default App;
