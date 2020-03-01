/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { login } from '../../user/userActions';


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }
    }

    handleEmailChange = event => {
        this.setState({ email: event.target.value });
    }

    handlePasswordChange = event => {
        this.setState({ password: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {"Content-Type": "application/json"}
        }

        fetch("https://recipetracker-test.new-labs.co/recipetracker/login", requestOptions)
            .then(res => {
                if(res.status != 200){
                    throw new Error();
                }    
                return res.json();
            })
            .then(response => {
                this.props.login(response);
                this.props.history.push("/");
            })
            .catch(err => {
                console.log(err);
            })
    }

    render(){
        return (
            <div>
                {this.state.hasError ? <Alert onClick={() => this.setState({ hasError: false})} variant="danger">Oops</Alert> : ""}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>
                            Email
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                        />
                        <br />
                        <Form.Label>
                            Password
                        </Form.Label>
                        <Form.Control
                            type="password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                        />
                        <Button type="submit" variant="outline-success">Login</Button>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = {
    login
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)