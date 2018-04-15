import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class GenderSelector extends Component {
  state = {
    genders: [
      { key: 1, value : 'male' },
      { key: 2, value : 'female' }
    ],
    [this.props.name]: 1
  }

  changeGender(event, index, value) {
    this.setState({ [this.props.name]: value });
    const genderName = this.state.genders.find(gender => gender.key === value).value;
    this.props.onChange({ [this.props.name]: genderName });
  }

  render() {
    return (
      <SelectField
        floatingLabelText="gender"
        onChange={this.changeGender.bind(this)}
        value={this.state[this.props.name]}
      >
        {this.state.genders.map((gender) => {
          return (<MenuItem key={gender.key} value={gender.key} primaryText={gender.value} />);
        })}
      </SelectField>
    );
  }
}

export default GenderSelector;
