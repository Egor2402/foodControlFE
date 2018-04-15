import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';
import moment from 'moment';
import { IngestionWrapper, IngestionBlock, IngestionTime, FoodsTitle, IngestionFoods, TotalBlock } from './styled';
import * as foodActions from '../../../../actions/FoodActions';
import DatePicker from 'material-ui/DatePicker';

class MyIngestionsTab extends Component {
  constructor(props) {
    super(props);
    this.setFilter = this.setFilter.bind(this);
  }

  componentWillMount() {
    this.props.foodActions.getIngestions(this.props.user.userData._id);
  }

  setFilter(event, value) {
    this.props.foodActions.setFilters({ date_time: value });
  }

  render() {
    const { ingestions, filteredIngestions } = this.props.food;
    const displayedIngestions = filteredIngestions ? filteredIngestions : ingestions;
    return (
      <div>
        <IngestionWrapper>
          <DatePicker onChange={this.setFilter} hintText="Select Date" mode="landscape" />
        </IngestionWrapper>
        {displayedIngestions.map((ingestion) => {
          return (
            <IngestionWrapper key={ingestion._id}>
              <Paper style={{padding: 10}} zDepth={2}>
                <IngestionBlock>
                  <IngestionTime>
                    <FoodsTitle>Time:</FoodsTitle>
                    {moment(ingestion.date_time).format('dddd, MMMM Do YYYY, h:mm a')}
                  </IngestionTime>
                  <IngestionFoods>
                    <FoodsTitle>Foods:</FoodsTitle>
                    {ingestion.foods.map((food) => {
                      return <div key={food._id}>{food.short_desc}</div>
                    })}
                    <TotalBlock>
                      Total Kcal: {ingestion.total_kcal}<br/>
                      Total Protein: {ingestion.total_protein}<br/>
                      Total Lipid: {ingestion.total_lipid}<br/>
                      Total Carbohydrates: {ingestion.total_carbohydrates}<br/>
                    </TotalBlock>
                  </IngestionFoods>
                </IngestionBlock>
              </Paper>
            </IngestionWrapper>
          );
        })}
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    food: state.food,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    foodActions: bindActionCreators(foodActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyIngestionsTab);
