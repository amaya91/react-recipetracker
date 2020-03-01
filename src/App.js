/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import './App.css';
import { withRouter } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { appLoad } from './recipes/recipeActions';
import { connect } from 'react-redux';
import Routes from './Routes';

class App extends Component {

  constructor() {
    super();

    this.state = {
      isAuthenticated: false,
      hasError: false,
      createSuccess: false,
    }
  }

  createRecipe = (newRecipe) => {
    this.setState({ recipes: [...this.state.recipes, newRecipe], createSuccess: true });
    
  }

  addIngredient = (id, newIngredient) => {
    let recipe = this.state.recipes.find(r => r.id == id);
    if(!recipe.ingredients) {
      recipe.ingredients = [newIngredient]
    } else recipe.ingredients = [...recipe.ingredients, newIngredient];

    this.setState({ recipes: this.state.recipes });
  }

  render() {
    const childProps = {
      isAuthenticated: this.props.user.isAuthenticated
    }
    return (
    <div className="App container">
      <h2>Recipe Tracker</h2>
      {this.state.hasError ? <Alert onClick={() => this.setState({ hasError: false})} variant="danger">Oops</Alert> : ""}
      {this.state.createSuccess ? 
      <Alert onClick={() => this.setState({ createSuccess: false})} variant="success" >New Recipe Added</Alert> : ""}
      <Routes childProps={childProps}/>
    </div>
    )
  }
}

const mapDispatchToProps = {
  appLoad
}

const mapStateToProps = (state) => ({
  recipes: state.recipes,
  user: state.user
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(App))

