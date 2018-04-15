import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { VerticalContainer, Title } from '../../shared/styled';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import * as userActions from '../../actions/UserActions';
import TextField from 'material-ui/TextField';
import { InputBlock } from '../../shared/styled';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    email: '',
    password: ''
  }

  handleChange(event, value) {
    this.setState({ [event.target.name]: value });
  }

  signIn() {
    this.props.userActions.signIn(this.state);
  }

  componentWillUnmount() {
    this.props.userActions.resetErrors();
  }

  render() {
    if (this.props.user.isSignIn) return (<Redirect to="/" />);

    const { errors } = this.props.user;
    return (
      <VerticalContainer>
        <Title>Enter email and password</Title>
        <InputBlock>
          <TextField errorText={errors.email}
            value={this.state.email}
            name="email"
            onChange={this.handleChange}
            hintText="Email"
          />
        </InputBlock>
        <InputBlock>
          <TextField errorText={errors.password}
            type="password"
            value={this.state.password}
            name="password"
            onChange={this.handleChange}
            hintText="Password"
          />
        </InputBlock>
        <FlatButton label="Sign In" onClick={this.signIn.bind(this)} primary={true}/>
      </VerticalContainer>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

function mapDispatchToProps(dispatch) {
  return { userActions: bindActionCreators(userActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
