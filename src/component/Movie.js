import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'


class Movie extends React.Component {

    render(){
        return(
            <>
            {(this.props.addMovie.length !==0 && this.props.display)&& this.props.addMovie.map(item=>{
                return(
                    <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={item.posterPath} />
  <Card.Body>
    <Card.Title>{item.title}</Card.Title>
    <Card.Text>
    Over View: {item.overview}
    </Card.Text>
  </Card.Body>
  <ListGroup className="list-group-flush">
    <ListGroup.Item>Average Votes: {item.averageVotes}</ListGroup.Item>
    <ListGroup.Item>Total Votes: {item.totalVotes}</ListGroup.Item>
    <ListGroup.Item>Popularity: {item.popularity}</ListGroup.Item>
  <ListGroup.Item> Release Date: {item.releaseDate}</ListGroup.Item>
  </ListGroup>
  </Card>
                )
            })}
            </>
        )
    }
}

export default Movie;