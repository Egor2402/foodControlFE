import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class ActivitySelector extends Component {
  state = {
    physicalActivities: [
      { key: 1, value : 'never' },
      { key: 2, value : 'small' },
      { key: 3, value : 'normal' },
      { key: 4, value : 'strong' }
    ],
    [this.props.name]: 1
  }

  changeActivity(event, index, value) {
    this.setState({ [this.props.name]: value });
    const activityName = this.state.physicalActivities.find(activity => activity.key === value).value;
    this.props.onChange({ [this.props.name]: activityName });
  }

  render() {
    return (
      <SelectField
        floatingLabelText="physical activity"
        onChange={this.changeActivity.bind(this)}
        value={this.state[this.props.name]}
      >
        {this.state.physicalActivities.map((activity) => {
          return (<MenuItem key={activity.key} value={activity.key} primaryText={activity.value} />);
        })}
      </SelectField>
    );
  }
}

export default ActivitySelector;
