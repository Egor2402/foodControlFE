import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const styles = {
  table: {
    backgroundColor: 'initial'
  }
}

class TableFoods extends Component {
  render() {
    const { foods } = this.props.food.buildingIngestion;
    return (
      <Table style={styles.table}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Kcal(100g)</TableHeaderColumn>
            <TableHeaderColumn>Protein(100g)</TableHeaderColumn>
            <TableHeaderColumn>Lipid(100g)</TableHeaderColumn>
            <TableHeaderColumn>Carbohydrates(100g)</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {foods.map((food) => {
            return (
              <TableRow key={food.ndb_no}>
                <TableRowColumn>{food.short_desc}</TableRowColumn>
                <TableRowColumn>{food.energ_kcal}</TableRowColumn>
                <TableRowColumn>{food.protein}</TableRowColumn>
                <TableRowColumn>{food.lipid}</TableRowColumn>
                <TableRowColumn>{food.carbohydrates}</TableRowColumn>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
}

function mapStateToProps(state) {
  return {
    food: state.food
  };
}

export default connect(mapStateToProps)(TableFoods);
