/* eslint-disable eqeqeq */
/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { appLoad } from '../../recipes/recipeActions';

class Main extends Component {
    constructor(props) {
        super(props);
    }


    navigate = (id) => {
        this.props.history.push("/recipe/" + id);
    }

    componentDidMount() {
        console.log(this.props.user);
        fetch("https://recipetracker-test.new-labs.co/recipetracker/recipe/" + this.props.user.id + "/all")
        .then(res => {
            if(res.status != 200){
                throw new Error();
            }    
            return res.json();
            })
            .then(response => {
                this.props.appLoad(response);
            })
            .catch(err => {
                this.setState({ hasError: true });
            })
    }

    render() {
        return (
            <div>
                <Link to="/create">Create New Recipe</Link>
                {this.props.recipes.recipes.map(r => (
                    <div key={r.id}>
                        <div onClick={() => this.navigate(r.id)}>
                            {r.name}
                        </div>    
                    </div>    
                ))}

            </div>
            // <div>
            //     <div>

            //         {this.props.recipes  ?
            //         <Remove handleRemove={this.handleRemove}></Remove>
            //         : ""}
            //     </div>   
            // </div>
        )
    }
}

const mapStateToProps = state => ({
    recipes: state.recipes,
    user: state.user
})

const mapDispatchToProps = {
    appLoad
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)