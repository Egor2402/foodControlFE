import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import { white } from 'material-ui/styles/colors';
import * as userActions from '../../actions/UserActions';
import { styles } from './styles';


class Nav extends Component {
  logout() {
    this.props.userActions.logout();
  }

  clickMenu(e) {
    const redirectPath = e.target.innerText.toLowerCase();
    this.props.history.push(redirectPath === 'home' ? '/' : `/${redirectPath}`);
  }

  render() {
    const authMenu = !this.props.user.isSignIn ? (
      <FlatButton disableTouchRipple={true} hoverColor={styles.flatButton.hoverColor}>
        <Link style={styles.link} to={'/signin'}>Sign In</Link>
        <Link style={styles.link} to={'/signup'}>Sign Up</Link>
      </FlatButton>
    ) : (
      <FlatButton onClick={this.logout.bind(this)} disableTouchRipple={true} hoverColor={styles.flatButton.hoverColor}>
        Logout
      </FlatButton>
    );

    const appMenu = (
      <IconMenu iconButtonElement={<IconButton><NavigationMenu color={white} /></IconButton>}>
        <MenuItem primaryText="Home" onClick={this.clickMenu.bind(this)} />
        <MenuItem primaryText="Calendar" onClick={this.clickMenu.bind(this)} />
      </IconMenu>
    );
    return (
        <AppBar
          title={<Link style={styles.link} to={'/'}>Food Control</Link>}
          iconElementLeft={appMenu}
          iconElementRight={authMenu}
        />
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


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav));
