

import React from "react";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Movie from './component/Movie';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchInfo: '',
      cityData: '',
      showMap: false,
      errorData: false,
      forecastArrFront: [],
      movieArr: [],
      showWeather: false,
      showMovie: false
    }

  }
  addLocation = async (event) => {
    event.preventDefault()
    let serverRoute = process.env.REACT_APP_SERVER;

    let cityUrl = `https://eu1.locationiq.com/v1/search.php?key=pk.b6a748ac44a34b8c21ca66ba80183eed&q=${this.state.searchInfo}&format=json`

    try {
      let cityResult = await axios.get(cityUrl);
      console.log(cityResult)

      this.setState({
        cityData: cityResult.data[0],

        showMap: true
      })
    }
    catch {
      this.setState({
        showMap: false,
        errorData: true

      })
    }


    try {
      console.log(serverRoute);
      const url = `${serverRoute}weather?city_name=${this.state.searchInfo}`;

      const weatherData = await axios.get(url);
      console.log(weatherData.data);


      this.setState({
        forecastArrFront: weatherData.data,
        showWeather: true
      })
    }
    catch (errors) {
      // console.log(errors);
      this.setState({

        showWeather: false
      })

    }

    try {
      console.log(serverRoute);
      const movieUrl = `${serverRoute}/movie?city_name=${this.state.searchQuery}`;

      const movieData = await axios.get(movieUrl);
      // console.log(movieData.data);


      this.setState({
        movieArr: movieData.data,
        showMovie: true
      })
      console.log(this.state.movieArr)
    }
    catch (errors) {
      // console.log(errors);
      this.setState({

        showMovie: false
      })
      console.log('error from move')
    }

  }








  searchData = (event) => {
    this.setState({
      searchInfo: event.target.value

    })
    console.log(this.state.searchInfo);
  }

  render() {
    return (
      <>
        <h1>City Explorer</h1>
        <Form onSubmit={this.addLocation}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Add a City</Form.Label>
            <Form.Control type="text" placeholder="Add a City" onChange={this.searchData} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Explore!
           </Button>
        </Form>
        <p>
          {this.state.cityData.display_name}
        </p>
        {this.state.showMap &&

          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=pk.8a6d5abe582c530444a1a198f0341145&q=${this.state.cityData.lat} ${this.state.cityData.lon}`} />
            <Card.Body>
              <Card.Title>{this.state.cityData.display_name}</Card.Title>
              <Card.Text>
                {this.state.cityData.lat} <br></br>
                {this.state.cityData.lon}
              </Card.Text>
            </Card.Body>
          </Card>

        }

        { this.state.errorData &&

          <Alert variant="danger">
            error in getting the data
       </Alert>

        }


        {/* { this.state.forecastArrFront.map((item, idx) => {
         
         return <p key={idx}>{item.date} and {item.description}</p>

        }) }
        <p>{this.state.item}</p> */}

        <div className="movieDiv">
          {this.state.showMovie === true &&
            <Movie display={this.state.showMovie} addMovie={this.state.movieArr} />}
        </div>


      </>
    )
  }
}
export default App;