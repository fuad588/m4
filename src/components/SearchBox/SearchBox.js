import React, { Component } from "react";
import "./SearchBox.css";
import { connect } from "react-redux";

class SearchBox extends Component {
  state = {
    searchLine: "",
  };
  searchLineChangeHandler = (e) => {
    this.setState({ searchLine: e.target.value });
  };
  searchBoxSubmitHandler = (e) => {
    e.preventDefault();
    fetch(`http://www.omdbapi.com/?s=${this.state.searchLine}&apikey=571f431c`)
      .then((response) => response.json())
      .then((data) => this.props.addMovie(data.Search))
      .catch((error)=>{
        return null
      })
  };
  render() {
    const { searchLine } = this.state;

    return (
      <div className="search_box">
        <form
          className="search_box_form"
          onSubmit={this.searchBoxSubmitHandler}
        >
          <label className="search_box_form_label">
            Искать фильм по названию:
            <input
              value={searchLine}
              type="text"
              className="search_box_form_input"
              placeholder="Например, Shawshank Redemption"
              onChange={this.searchLineChangeHandler}
            />
          </label>
          <button
            type="submit"
            className="search_box_form_submit"
            disabled={!searchLine}
          >
            Искать
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  return state.movies;
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMovie: (movies) => dispatch({ type: "ADD_MOVIE", payload: movies}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
