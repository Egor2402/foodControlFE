import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Wrapper, BigTitle } from '../../shared/styled';
import MyIngestionsTab from './tabs/MyIngestionsTab';
import AddIngestionTab from './tabs/AddIngestionTab';
import { TabContent } from './styled';
import { Tabs, Tab } from 'material-ui/Tabs';

const styles = {
  tabItemContainerStyle: {
    backgroundColor: 'initial'
  },
  buttonStyle: {
    color: 'rgb(158, 158, 158)'
  }
};

class Calendar extends Component {
  render() {
    if (!this.props.user.isSignIn) return (<Redirect to="/" />);

    return (
      <Wrapper>
        <BigTitle>Calendar</BigTitle>
        <Tabs tabItemContainerStyle={styles.tabItemContainerStyle}>
          <Tab buttonStyle={styles.buttonStyle} label="Add Ingestion">
            <TabContent>
              <AddIngestionTab></AddIngestionTab>
            </TabContent>
          </Tab>
          <Tab buttonStyle={styles.buttonStyle} label="My Ingestions">
            <TabContent>
              <MyIngestionsTab></MyIngestionsTab>
            </TabContent>
          </Tab>
        </Tabs>
      </Wrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Calendar);
