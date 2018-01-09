import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'font-awesome/css/font-awesome.css'
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pointsLastThirty: [],
      pointsAllTime: [],
      orderedBy: "lastThirty"
    }
  }

  componentDidMount() {
    axios.all([this.setLastThirty(), this.setAllTime()])
      .then(axios.spread((lastThirty, allTime) => {
        this.setState({
          pointsLastThirty: lastThirty.data,
          pointsAllTime: allTime.data
        });
      }));
  }

  setLastThirty() {
    return axios.get("https://fcctop100.herokuapp.com/api/fccusers/top/recent");
  }

  setAllTime() {
    return axios.get("https://fcctop100.herokuapp.com/api/fccusers/top/alltime");
  }

  setOrder(order) {
    this.setState({
      orderedBy: order
    })
  }

  render() {
    const { pointsLastThirty, pointsAllTime, orderedBy } = this.state;
    if(!pointsAllTime.length && !pointsAllTime.length) {
      return <div className="App">
        <h1>Loading...</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    }
    return (
      <div className="App">
        <header>
          <h1>freeCodeCamp leaderBoard <i className="fa fa-free-code-camp" aria-hidden="true"></i></h1>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th></th>
                <th>Camper</th>
                <th onClick={(e) => this.setOrder('lastThirty')}>Points in last 30 days {orderedBy === 'lastThirty' && (<i className="fa fa-caret-down" aria-hidden="true"></i>)}</th>
                <th onClick={(e) => this.setOrder('allTime')}>All time Points {orderedBy === 'allTime' && (<i className="fa fa-caret-down" aria-hidden="true"></i>)}</th>
              </tr>
            </thead>
            <tbody>
              {orderedBy === 'lastThirty' && (
                pointsLastThirty.map((e, i) => (
                  <tr key={e.username}>
                    <td>{i + 1}</td>
                    <td><img src={e.img} alt='User' /></td>
                    <td><a href={`https://www.freecodecamp.org/${e.username}`}>{e.username}</a></td>
                    <td>{e.recent}</td>
                    <td>{e.alltime}</td>
                  </tr>
                ))
              )}
              {orderedBy === 'allTime' && (
                pointsAllTime.map((e, i) => (
                  <tr key={e.username}>
                    <td>{i + 1}</td>
                    <td><img src={e.img} alt='User' /></td>
                    <td><a href={`https://www.freecodecamp.org/${e.username}`}>{e.username}</a></td>
                    <td>{e.recent}</td>
                    <td>{e.alltime}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </header>
      </div>
    );
  }
}

export default App;
