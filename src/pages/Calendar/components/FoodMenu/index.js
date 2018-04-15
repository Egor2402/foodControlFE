import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Wrapper } from '../../../../shared/styled';
import FlatButton from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import * as foodActions from '../../../../actions/FoodActions';

class FoodMenu extends Component {
  constructor(props) {
    super(props);
    this.handleChangeTerm = this.handleChangeTerm.bind(this);
    this.handleChangeFood = this.handleChangeFood.bind(this);
    this.addFood = this.addFood.bind(this);
    this.searchFood = this.searchFood.bind(this);
  }

  state = {
    foodTerm: '',
    value: 0
  }

  handleChangeTerm(event, value) {
    this.setState({ foodTerm: value });
  }

  handleChangeFood(event, index, value) {
    this.setState({ value });
  }

  componentDidUpdate() {
    if (this.props.food.ingestionAdded && this.state.foodTerm) {
      this.setState({ foodTerm: '', value: 0 });
    }
  }

  addFood() {
    this.props.foodActions.addFood(this.props.food.foundFoods[this.state.value]);
  }

  searchFood() {
    this.props.foodActions.searchFood(this.state.foodTerm);
  }

  render() {
    const { foundFoods } = this.props.food;

    let foodDropDownMenu;
    if (foundFoods.length) {
      foodDropDownMenu = (
        <div>
          <DropDownMenu
            value={this.state.value}
            onChange={this.handleChangeFood}
            autoWidth={false}
          >
            {foundFoods.map((food, index) => {
              return <MenuItem value={index} key={index} primaryText={food.short_desc} />
            })}
          </DropDownMenu><br/>
        <FlatButton label="Add" primary={true} onClick={this.addFood} />
        </div>
      );
    }

    return (
      <Wrapper>
        <TextField value={this.state.foodTerm} onChange={this.handleChangeTerm} hintText="Food" />
        <FlatButton label="Search" onClick={this.searchFood} primary={true} />
        {foodDropDownMenu}
      </Wrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    food: state.food
  };
}

function mapDispatchToProps(dispatch) {
  return {
    foodActions: bindActionCreators(foodActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodMenu);
