import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { HomeInfo } from './styled';
import { VerticalContainer, BigTitle } from '../../shared/styled';
import * as userActions from '../../actions/UserActions';
import Auth from '../../modules/Auth';

class Home extends Component {
  componentWillMount() {
    if (Auth.getUserToken() && !this.props.user.isSignIn) {
      this.props.userActions.loadUser();
    }
  }

  render() {
    const { email, baseMetabolism } = this.props.user.userData;
    if (!this.props.user.isSignIn) {
      return (
        <VerticalContainer>
          <BigTitle>Please Sign In or Create a new account!</BigTitle>
        </VerticalContainer>
      );
    }
    return (
      <VerticalContainer>
        <BigTitle>Hello, {email}!</BigTitle>
        <HomeInfo>Your base metabolism is { baseMetabolism }.</HomeInfo>
      </VerticalContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
