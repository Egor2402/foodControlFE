import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { HorizontalContainer, Title } from '../../../../shared/styled';
import TimePicker from 'material-ui/TimePicker';
import FlatButton from 'material-ui/FlatButton';
import FoodMenu from '../../components/FoodMenu';
import FoodsTable from '../../components/FoodsTable';
import { TableContainer, FoodDate, TotalBlock, AddIngestion } from './styled';
import * as foodActions from '../../../../actions/FoodActions';

class AddIngestionTab extends Component {
  constructor(props) {
    super(props);
    this.addIngestion = this.addIngestion.bind(this);
    this.setTime = this.setTime.bind(this);
  }

  addIngestion() {
    const { foods, dateTime } = this.props.food.buildingIngestion;
    const user_id = this.props.user.userData._id;
    this.props.foodActions.addIngestion({ foods: foods, date_time: dateTime, user_id });
  }

  setTime(event, value) {
    this.props.foodActions.setIngestionDateTime(value);
  }

  componentWillUnmount() {
    this.props.foodActions.resetFoodData();
  }

  render() {
    const { dateTime, foods } = this.props.food.buildingIngestion;

    return (
      <HorizontalContainer>
        <div>
          <FoodMenu></FoodMenu>
          <TimePicker hintText="Select Time" value={dateTime} onChange={this.setTime} />
        </div>
        <TableContainer>
          <Title>Your Ingestion</Title>
          <FoodsTable></FoodsTable>
          <TotalBlock>
            {dateTime ? (<FoodDate>Date: {moment(dateTime).format('dddd, MMMM Do YYYY, h:mm a')}</FoodDate>) : ''}
            {dateTime && foods.length ? (<AddIngestion><FlatButton label="Add Ingestion" primary={true} onClick={this.addIngestion} /></AddIngestion>) : ''}
          </TotalBlock>
        </TableContainer>
      </HorizontalContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    food: state.food
  };
}

function mapDispatchToProps(dispatch) {
  return {
    foodActions: bindActionCreators(foodActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddIngestionTab);
