import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { VerticalContainer, Title } from '../../shared/styled';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import GenderSelector from './components/GenderSelector';
import ActivitySelector from './components/ActivitySelector';
import TextField from 'material-ui/TextField';
import { InputBlock } from '../../shared/styled';
import * as userActions from '../../actions/UserActions';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.handleChangeSelector = this.handleChangeSelector.bind(this);
    this.handleChangeTextField = this.handleChangeTextField.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  state = {
    physicalActivity: 'never',
    gender: 'male',
    email: '',
    password: '',
    growth: '',
    weight: '',
    age: ''
  }

  handleChangeSelector(state) {
    this.setState(state);
  }

  handleChangeTextField(event, value) {
    this.setState({ [event.target.name]: value });
  }

  signUp() {
    this.props.userActions.signUp(this.state);
  }

  componentWillUnmount() {
    this.props.userActions.resetErrors();
  }

  render() {
    if (this.props.user.isSignIn) return (<Redirect to="/" />);
    const { errors } = this.props.user;

    return (
      <VerticalContainer>
        <Title>Fill all of the fields</Title>
        <InputBlock>
          <TextField errorText={errors.email && errors.email.message}
            value={this.state.email}
            name="email"
            onChange={this.handleChangeTextField}
            hintText="Email"
          />
        </InputBlock>
        <InputBlock>
          <TextField errorText={errors.passwordHash && errors.passwordHash.message}
            type="password"
            value={this.state.password}
            name="password"
            onChange={this.handleChangeTextField}
            hintText="Password"
          />
        </InputBlock>
        <InputBlock>
          <TextField errorText={errors.growth && errors.growth.message}
            type="number"
            value={this.state.growth}
            name="growth"
            onChange={this.handleChangeTextField}
            hintText="Growth"
          />
        </InputBlock>
        <InputBlock>
          <TextField errorText={errors.weight && errors.weight.message}
            type="number"
            value={this.state.weight}
            name="weight"
            onChange={this.handleChangeTextField}
            hintText="Weight" />
        </InputBlock>
        <InputBlock>
          <TextField errorText={errors.age && errors.age.message}
            type="number"
            value={this.state.age}
            name="age"
            onChange={this.handleChangeTextField}
            hintText="Age" />
        </InputBlock>
        <ActivitySelector name="physicalActivity" onChange={this.handleChangeSelector}/>
        <GenderSelector name="gender" onChange={this.handleChangeSelector} />
        <FlatButton label="Sign Up" onClick={this.signUp} primary={true} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
