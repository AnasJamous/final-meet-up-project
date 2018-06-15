import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import './App.css';
import Map from './Map';
import { MapWithUserCoordinates } from "./MapWithUserCoordinates";

const Header = () => (
  <nav>
    <Link to="/" className="brand">
      <img alt="website logo" className="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1pWdhf66Gfa1jgia2I-TYoXfa99sXz7K-0lYBJrVJGJ9M4IJntQ" />
      <span>  Learn Together </span>
    </Link>

    <input id="bmenub" type="checkbox" className="show" />
    <label htmlFor="bmenub" className="burger pseudo button">menu</label>

    <div className="menu">
      <a className="pseudo button icon-picture">Log in</a>
      <a className="button icon-puzzle">Sign Up</a>
    </div>
  </nav>
)
const Footer = () => (
  <div className="footer">
    <h1 style={{ textAlign: 'center', color: 'white' }}>
      <ol>
        <ul> contact list</ul>
      </ol>  
    </h1>
  </div>
)
const Topic = ({ name, topicId, image, meetups }) => (
  <div>
    <h1 style={{ textAlign: 'center', fontSize: '3em', marginTop: '1px' }}>{name}</h1>
    <h1> - Study Groups :</h1>
    <ul>
      {meetups.map((meetup, index) =>
        <li key={meetup.id}>
          <Link to={'/topic/' + topicId + '/meetup/' + meetup.id }>

            {meetup.title} - ({meetup.users.length} users)
          </Link>
        </li>
      )}
    </ul>
    <label style={{ marginTop: '5em' }} for="modal_1" class="button off-two-fifth">New Study Group</label>

    <div class="modal">
      <input id="modal_1" type="checkbox" />
      <label for="modal_1" class="overlay"></label>
      <article>
        <header>
          <h3>schedule a new group study </h3>
          <label for="modal_1" class="close">&times;</label>
        </header>
        <section class="content">
          We'll guide you through a quick process to kick things off ...
        </section>
        <footer>
          <a class="button" href="/topic/0/meetup/add">Create New Group</a>
          <label for="modal_1" class="button dangerous">
            Cancel
          </label>
        </footer>
      </article>
    </div>
  </div>
)

const Meetup = ({ topicId, date, location, topicName, name, description, creator, users, markers }) => (
  <div>
    <Link to={'/topic/' + topicId}>back</Link>

    <h1>{topicName}</h1>
    <h2>{name}</h2>
    <Map className="map" markers={[{
      name: name,
      id: topicId,
      title: name,
      position: { lat: location.lat, lng: location.lng }
    }]} />
    <h3>Date: {date}</h3>
    <h4> <span className="small">Organized by :</span>  {creator.username}</h4>
    <p>{description}</p>
    <div>
      <h5>Attendance</h5>
      <ul>
        {users.map(user => <li key={user.username}>{user.username}</li>)}
      </ul>
    </div>
  </div>
)


const Topics = ({ topicsList, markers }) => (
  <div className="topicsList">
    <div>
      <MapWithUserCoordinates markers={markers} zoom={14} />
    </div>
    <div className="flex four center demo">
      {topicsList.map((topic, index) =>
        <div key={index}>
          <article className="card">
            <img alt={topic.name} style={{ height: '10em' }} src={topic.image} />
            <footer>
              <h3>
                <Link className="topic" to={'/topic/' + index}>{topic.name}</Link>
              </h3>

            </footer>
          </article>
        </div>
      )}
    </div>

  </div>
)

class App extends Component {
  state = {
    user: 3,
    users: [
      { username: 'Anas Jamous' },
      { username: 'Basel James' },
      { username: 'Ahmad Khouja' },
      { username: 'Lujin Ibrahim' },
      { username: 'Ely Massouh' },
      { username: 'Abd Al Karim' },
      { username: 'Samah Bassout' },
      { username: 'Nada Akkad' }
    ],
    meetupsList: [
      { id:0,
        title: 'Explore your math skills',
        date: '23rd Sept',
        by: 0,
        position: { lat: 33.8786574, lng: 35.5374814 },
        description: "Find out what's happening in Mathematics Meetup groups around the world and start meeting up with the ones near you.",
        users: [0, 4],
        category: 'Maths'
      },
      { id:1,
        title: 'Open disscutionAlgorithm Design',
        date: '24th Jan',
        by: 2,
        position: { lat: 33.694762, lng: 35.211486 },
        description: "Find out what's happening in Mathematics Meetup groups around the world and start meeting up with the ones near you.",
        users: [1, 2],
        category: 'Maths'
      },
      { id:3,
        title: 'AUB group',
        date: '12th may',
        by: 3,
        position: { lat: 33.881938, lng: 35.541888 },
        description: 'Hello and welcome to the MOST ACTIVE Meetup in the World for Developers and Entrepreneurs!!! ',
        users: [0, 1, 2],
        category: 'Programming Language'
      },
      { id:56,
        title: 'LAU group',
        date: '12th may',
        by: 3,
        position: { lat: 33.894465, lng: 35.494581 },
        description: 'Hello and welcome to the MOST ACTIVE Meetup in the World for Developers and Entrepreneurs!!! ',
        users: [0, 1, 2],
        category: "Fashion and Beauty"
      },
      { id:67,
        title: 'AUST group',
        date: '12th may',
        by: 3,
        position: { lat: 33.89011, lng: 35.508885 },
        description: 'Hello and welcome to the MOST ACTIVE Meetup in the World for Developers and Entrepreneurs!!! ',
        users: [0, 1, 2],
        category: "Books Clubs"
      },
      { id:890,
        title: 'Developers & Entrepreneurs',
        date: '12th may',
        by: 3,
        position: { lat: 234234, lng: 2234324 },
        description: 'Hello and welcome to the MOST ACTIVE Meetup in the World for Developers and Entrepreneurs!!! ',
        users: [0, 1, 2],
        category: 'Physics'
      },
      { id:45,
        title: 'Developers & Entrepreneurs',
        date: '12th may',
        by: 3,
        position: { lat: 234234, lng: 2234324 },
        description: 'Hello and welcome to the MOST ACTIVE Meetup in the World for Developers and Entrepreneurs!!! ',
        users: [0, 1, 2],
        category: "Arts"
      }
    ],
    topicsList: [
      {
        name: 'Maths'
        , image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF-w9Uyh00NyJQKb6CayUva_2mziFo7mmTg2WJOs54C-pmJUss"
      },
      {
        name: 'Programming Language'
        , image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJZ453odkbv9CSX4q_-nk4Ldt7TQ-DzWfkX6wCvXxAieOZSj4R"
      },
      {
        name: 'Fashion and Beauty'
        , image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ25cYqRU1CG2BogopeRkKnqzHKt9eoBgBI4k95TYc_60cHyaU61A"
      },
      {
        name: 'Book Clubs'
        , image: "data:image/jpeg;base64,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"
      },
      {
        name: 'Physics'
        , image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHcAwAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAEAAECAwUGBwj/xAA/EAABAwIFAQUGAwUGBwAAAAABAAIDBBEFBhIhMUEiUWGRoQcTFDJxgUKi0SNSU2KxFUNygrLBFiQnM2Rzkv/EABoBAAMBAQEBAAAAAAAAAAAAAAIDBAEABQb/xAAjEQADAAICAgMAAwEAAAAAAAAAAQIDEQQxIUESEzJCUVIi/9oADAMBAAIRAxEAPwDWA71ILQxWjbTT6Yw4MIu0P5QBC+lmvkto+TqHL0xcpAJwFMBachg1WAJBqm1C2FohZOArC1KyzZxWeEg1TIU2t2WNm6KdKgWohwUCFqZjRToTFiuslpW7M0UhqcNVulOGrtnaK9Kk1isDVKyzZuiu1lEq0qshcmcyBCreFdZRc1aC0DOCqc1Euaqy1MTFtHZYth0eJkzUxtPpuO5y5mqpJqZ+meMsPitOnxF0JDSSGki5HKjiFTHO1wN33N2uJ4UOL5438fRflcZF8vZk2U2pw1TaxUtkyQwCm1qkGq1rEDYaRXp2TWRAZ0USyyzZrkp0q9kd2pgy6Nij/Z38ENVoOI2Z727qBaiZG9sqGndamC58lOlLQr9Kokr6KJ/u31MZl/hsOt5/yi59FztLs5Y2+hxGn0WTCaqlLW02G1J1DsvntC0/Z3a/KrG4bi8wBlqKOlaRuI2Old5mw9Ck1yYXsfPEyP0QDVRUVdLTm09RFGegc8XP2RzMvQPA+JqqupPUvm0tH+Vmkea0aPCqKicBS00ER5JjjA9UmuZ/lD54H9swYZoaiISU8rJWH8THBw9FIhD5nySamR+IYBL8FX/M5sbixk31twfHjv71xMWaMZwqoNLisQe+M2eyZuiQfcfobo45kv8AS0Bk4FLzL2d2QmWJh+asPrCGSCSnkPAeLg/cLaDg5ocxwc0i4I6hWRc0v+SG8dR+kM4Kl7bIhVuCYmKaLSUgnDSVYGGyW2MItarWsumaFdGLoWwpQmsVzGJ+xEwvle1jAN3OcAEN/bWHA2p5X1Z7qSN0vq3YfcpFZEuymMTfQU5lhdRLdkFVYnWiB8rcObS07Bd8+IThjQPozV/ULnXZno5a0UtXmIRXcG6qOkLGfd7w7bxCS+TKHri2zrey0XcQB3nZOMXw5jNDKgVEnHu6Zpmd5MBsuExupqqLMpwbDcLjxSs0Nc19e90+5FzZpOkWHij3U+a6LAcaq8ZkipohSfsIaSQRuY/UN+xxtcfN1Sa5LrpD44iXbOiM1dUPcKPC5G/z1TxE0/YXd5gLKkxWIwYo6bE4/eYawvqIMPh1PaAbEa5OzcEEcdFtez17pcn0L5XOdJ2wXFxJJ1nklcBBDoxzP1IL3moax4Hedeof6kt58j9jZ42NehHMc2InRhOX6/Eidg6rc+Vt+8sZ2P6IrMNbj9JPgOHwTRYTLX00TZYYmCMMlc8tO4uQOOCh8oZ2kwPAG4XSYTPXVQke8aSSCCb8AE96n7RKyuqabLWK1VP8FVujk1xuYQYnh7S3Z3Fud0ptvsepU9I6nLmRZ8LxWHFMSxmesqYS4hpBIJLSDcuJPU9y7HT0K4rAco5iZi1JiuO5gfO6F+v3DZHva7Yi29h17l3VrLjmUxwtFubeKBrMWFLjENAKYyaw03AcXG/dYcDrcrXa24T2tbc7eK4wrc0OFgBz0Xj3tLxmDFsbZR0UcTmUYMbpg0anvvu2/wC6Led12/tDzGcGwz4SjeRX1bS2MjmJnV/6eP0XC5YywZ9NZiDbQcsiPMv1/l8OvXbluPG7fgXlyTjnbZDLOAGpDamrFqboODN9P5PHr9Oe1AFgAAABsBwE+mwAsPsExC9bFjnGtI8TNmrK9sbhRdunv3pFOJwnjhK5SG6tDEpj0hNGyCw+lqMUlqZn188NNHPJEyOn0sJ07buIJ5DuCEeAW7ngK3KzAzAKac7CRr6h/jrcX/7qLl20kkXcPGqbbRRTZboRUiR8QqHN31VDjK4H6uutt8TY2dlmzeAAqsLrqPEWOlo36w3ZxG47xx1RU2408Aleej0dHLZ+aWZOxPUOWMHm9oXneIDB6/LWDYVRxU8OIuP/ADdS6LQGkgjtOt2uQetrL0b2i3bkuvA3u6Ib/wDsauLxt2C0vs8wz3TaRuLyxRO1MDTKL7vLrb8d/Wy4NBOYqmrw/wBpfxGD0nxlW2nYIY+Q8GOxO2/G/K1ayTNNTlzHpcxRQ08Joz8PG0NGl17m9iT5lc7V4k/LOcaCtrYZJjS0MLJADZxcYNNr/dbQzPjGbqDFqGnwOSGnkoJvdSdp3vJLWa0OIDd1pxvezIk5OpWagdMko24+dy5ekj/6k5lpzt76iqG2t3sYUDQ5fzZRUDKWpxiDBqEFxEclWGG53J7O5+5RdFUZcwDFRidVj8lbVCmELmQQktf2AwkvPJ7N+VxyKfZ1m7C8vYHVxYnJMaiWpMkbIYy4uboaOeBuD1T51xpmccApqzCqKqJp650Hu9Gp7iYw69m37/RZEmZsmYYGsoMvsqnt+V1dK6X03CnT+0DM+Kj4XLWGOjZfTpoaSwafE2NvRYce10T3Ggp5JA5pMTS4PFiDYc3QFbmbBKAn4rFKZrhy1rw5w+wuuPpMnYhXUcdRmvFq2SreLvpWS3YzwJN7n6WCPpcpYFSkaMOikcOHT3kt9NV7J8YaomvkzL0Tn9pWFajHhtLXV7x/ChsD9ufRCS5rzdXm2H4DBRxnh9U659SLf/JW8yJkLNELGxt7mAAKJZ3qieMvbJ65lfxRy1LgVZWYm7FMyTRVNSQAI492C3F7gbDoLWvvuugcrnNsqjyq8cTC8EOXJWR7oiB1Kg9WqDmpglgxJS3VuhRtuj2BoujNjujoQHIMbKyJ5CTfkfD0W4w/4bCK2ccxwPcPqGmy1sOhbSYfS0zeIoWR+TQFzmYq2ODA5nTfIXxtfb90vF/RVvzZileT/YWWK2oBNg+ciFo8e1a/mvO5G9pHq8XXxbOtijjhY2OFjWM5sxoA9E5be56DdchLS54q23fU4fhbTv8Aso/fPb57eRUW5M+OsccxrEcQv8zNfu2H7C5HmkqKY6ssp6YRnefCa7BZcOq8apaLW9jnOH7RzQ1wJ7IPWy4/A6fKtJVMmweixfMFTG/Ux4g/Ztd0NgNreIXqGB5Qy5QxsNJhFMJG/ilBld5uJK6RrA1oa0BrRwALAIX4GLyvB5hUyZvrBUYhQ5ToKSfRqL6mRj5pbDYDxtxcD6rj6mT2o4wz3gwyvZDudLiIQB9AWr34RDhQrAI6GoPdE4+iFsJL+z5AllxSuqHhjpZXk2u0b/c/qh5aKricH1MUgv8AicF6rl/D4qY00TIRuWue/ryiayghnphrjaGuZt1+y1Tsz5pHneWcBOYscosMZZvxEga51/lby4/XSDbxX05DSUmE4fHR0MDIKeJoayNgsBZeIezqlbS+0TDw0WaDIfyFe3VJdI7wRY52wM96nwZ815HElVaLmwG6PbTufwFaKcMFyrfsSPP+tvyZnw1tyN1XIwBHzva0chZ0z9R2Rw2xdpSUSKoNuVYb3TdU9MnfkYRhOIQ91g6x6eKkDspaSeOV2zNFMkBBAs4bdVR7vda8T3OZpku63ehZIO2S1dNvpnVHspNO7nlQ0lvIK1mM8FcKdrxZzUp5tdj1gb6MhiOpJ3RuvyES7Cmn5Niq/gJoze1x4IayRQSx3LNamkjmYAk+iDTqYOUDA1zSL7LYppCQAVHe5fgtx6taorpmFpCOG6iGC9wpgbJFVtlUTpCsg8adowiteOW07z+Uo1ZmZXaMv4kf/Gf/AEKENnlGG0zpHUwb+8C4nwRlc2JlDAYmj9n2CQbHV1+quwiMCzt+yBwpTC9HMyUXituSbWNxx5J8yTNnP5Oi1+0LDnC/aa8m/wDgcvZhTXPaXk2SoI2e0HD/AHZu0xyO3/wuXscri1psh20/Axymk2DuayEdLLMq6vlrAr6rXJe5JQhpZH8NsPFPxpLyyTLVPxJnvcXG7ioFaQoLbuUXU7W8BULIiV4q9mYWOPIsm0WR0jLdEO5pTFQtxoUEDpi4MbcgXPgEZT4ZPICdJaAL79Vo4PB7uFpcwDXckn0WkXMJDQ4Bx4F1Jk5DT0ivFxZc7o5+KgqfmczQP5jZG0tBA1rXT2L97jvRj6MucSXpmULGm4cgrN8l5Y2OOpfhGHG66NhXPxVDwjIq145VV4mSxmSOgjsr2gLCjxB4/D6oqLEXH8J81LWKkVznk1TDG7loUmQhpuEFFV6vwlGxSahwUmk0US5ZcE6YJ0scJY+b3act1/jHp8yAthYOeHacs1fiWD84Wrsx9HD4dJaJ1rDxSnYG0PvQ33vaN+8bu33+p80FQOeKZ0rdxuPQpoa50WHOmAuQC5zSbXF7/wC6fvTJdCySAfaDRi3Ecp+nZK9hewELyPJQafaBTFo2EEn9CvXHusOEq/0UT+Sowt/dUHMChNU6ehQU2IAfhcjmaYmrlBUjQhZQB1QkmI3/AAlCy17ugsqIxUTXmkImshS+x2CofVF3RVOlJVM42SXkRpR4nLHH7vkDv6KUdU6WZsxdeRosLrIL08UrmSNcDwVrwoD7q9s7JtSS0E2B03Sgq9TnarW6WWH8a4llm3aBYgJxUlr3OYLA8AqN4C1cryjOZQ1HSL8wREdHP1Z6hMknPNQpYZC4qCY8tHmjoaFw+YBJJT3lopjDIfDThvQIkNskkpqbbLJlJEkkklgYlzHtHlMWV5SPxSxt9Uklq7MfRwtK98NI4WGzePsg8PJdRAP3bqN2nfa9kkk59ky6DPZ+D/xzACbhtNJYnm3C9gIukklX2UT+SiWEOQM9G53ypJI4toVeOWZ89BLvZo80I+hnH92PsQkkqZy0R3gkpdRT2/7fqFU6jqB/dfmCSScs1CHhkiaOp/h/mH6qPwdV/C/MP1SSRfdQt4JCo46kAfsz5j9VYG1F94vUfqmSQ/Yw/qR//9k="
      },
      {
        name: 'Arts'
        , image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcObWctz3DyNlzb9jDAfv8rCJGkpxnd08t_kdu-AuChBXQfU47"
      },
    ]
  }

  renderTopic = (props) => {
    const topicId = props.match.params.topicId
    const topic = this.state.topicsList[topicId]
    if (!topic) {
      return <div>topic not found</div>
    }

    const name = topic.name

    const meetups = this.state.meetupsList.filter(meetup => meetup.category === topic.name)

    return <Topic name={name} meetups={meetups} topicId={topicId} />
  }
  onGoingToMeetup = (topicId, meetupId) => {
    const topic = this.state.topicsList[topicId]
    if (!topic) {
      console.log('topic not found')
      return false
    }
    const meetup = this.state.meetupsList.find(meetup => meetup.id === meetupId)
    if (!meetup) {
      return false;
    }
    const users = [...meetup.users, this.state.user]
    const newMeetup = { ...meetup, users }
    const meetups = this.state.meetupsList.map((meetup) => {
      if (meetup.id === meetupId) {
        return newMeetup
      }
      return meetup
    })
    console.log(meetups)
    const newTopic = { ...topic, meetups }
    const topicsList = this.state.topicsList.map((topic, index) => {
      if (index === topicId) {
        return newTopic
      }
      return topic
    })
    this.setState({ topicsList })
  }
  renderMeetup = (props) => {
    const topicId = parseInt(props.match.params.topicId, 10)
    const meetupId = parseInt(props.match.params.meetupId, 10)
    const topic = this.state.topicsList[topicId]
    if (!topic) {
      return <div>topic not found</div>
    }
    const meetup = this.state.meetupsList.find( meetup => meetup.id === meetupId )
    if (!meetup) {
      return <div>meetup not found</div>
    }
    const creatorId = meetup.by
    const creator = this.state.users[creatorId]
    const users = meetup.users.map(id => this.state.users[id])
    return (
      <div>
        <button className="toolip-right" onClick={() => this.onGoingToMeetup(topicId, meetupId)}>I am going</button>
        <Meetup topicId={topicId} date={meetup.date} location={meetup.position} topicName={topic.name} name={meetup.title} description={meetup.description} creator={creator} users={users} markers={this.state.markers} />
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
    const topicId = parseInt(form.topicId.value, 10)
    const location = { lat, lng }
    const meetup = { name, date, location, by: this.state.user, description, users: [] }
    const topic = this.state.topicsList[topicId]
    if (!topic) {
      console.log('no topic');
      return;
    }
    console.log('sdfsfsdfsdf', topic.meetups, meetup)
    const meetups = [...topic.meetups, meetup]
    const newTopic = { ...topic, meetups }
    const topicsList = this.state.topicsList.map((topic, index) => {
      if (index === topicId) {
        return newTopic
      }
      return topic
    })
    this.setState({ topicsList })
  }
  renderMeetupAdd = (props) => {
    const topicId = props.match.params.topicId
    const topic = this.state.topicsList[topicId]
    if (!topic) {
      return <div>topic not found</div>
    }
    return (
      <div className="flex one two-600 three-900">
        <form className="" onSubmit={this.onRenderMeetupAddSubmit}>
          <h2>Details:</h2>
          <input className="stack" placeholder="group study name" type="text" name="name" />
          <input className="" placeholder="date" type="date" name="date" />
          <input type="hidden" name="topicId" value={topicId} />
          <br /><br />
          <h2>Location:</h2>
          <input className="stack" placeholder="latitude" type="number" name="lat" />
          <input className="stack" placeholder="longitude" type="number" name="lng" />
          <textarea className="stack" placeholder="description" name="description" />
          <input className="stack icon-paper-plane" type="submit" value="ok" />
        </form>
      </div>
    )
  }
  renderTopicsList = (props) => {
    return <Topics topicsList={this.state.topicsList} markers={this.state.meetupsList} />
  }
  render() {
    return (
      <Router>
        <div>
          <Header />
          <div className="content">
            <Switch>
              <Route exact path={'/'} render={this.renderTopicsList} />
              <Route exact path={'/topic/:topicId'} render={this.renderTopic} />
              <Route exact path={'/topic/:topicId/meetup/add'} render={this.renderMeetupAdd} />
              <Route exact path={'/topic/:topicId/meetup/:meetupId'} render={this.renderMeetup} />
            </Switch>
          </div>
          {/* <div>
            <Footer />
          </div> */}
        </div>
      </Router>
    );
  }
}

export default App;
