import React, { Component } from "react";
import { connect } from "react-redux";
import "./Favorites.css";


class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: "gray",
      value: "",
      list: [],
      link: false,
      id: " ",
    };
  }

  boxClick = (e) => {
    this.setState({
      bgColor: e.target.value ? "green" : "gray",
      value: e.target.value,
    });
  };
  post = (e) => {
    fetch(`https://acb-api.algoritmika.org/api/movies/list`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        "title": this.state.value,
        "movies": this.props.favouriteMovie
      }),
    })
      .then((res) => res.json())
      .then((data) => this.setState({id: data.id, link: true}));
  };

  render() {
    return (
      <div className="favorites">
        <input
          value={this.state.value}
          onChange={this.boxClick}
          className="favorites_name"
        />
        <ul className="favorites_list">
          {this.props.favouriteMovie.map((item, index) =>
             {return item && <div className="favorites_lists">
              <li key={item.imdbID}>
                {item.Title} ({item.Year}){" "}
              <button className="delete_button" onClick={() => this.props.deleteFavorites(item)}>X</button>
              </li>
              </div>  }
          )}
        </ul>
        <a href={`/list/${this.state.id}`} className={this.state.link ? "" : "hidden"}>
          {" "}
          {this.state.value}
        </a>
        <br></br>
        <br></br>
        <button
          type="button"
          className="favorites_save"
          style={{ backgroundColor: this.state.bgColor }}
          disabled={!this.state.value}
          onClick={this.post}
        >
          Сохранить список
        </button>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    favouriteMovie: store.favouriteMovie,
  };
};
const mapDispatchToProps = (dispatch) => { 
  return { 
    deleteFavorites: (movie) => dispatch({ type: "DELETE_FAVORITES", payload:movie}), 
  }; 
}; 

export default connect(mapStateToProps,mapDispatchToProps)(Favorites);
