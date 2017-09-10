import React from 'react';

import controller from '../controller.js';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateName(name) {
    return name.length;
  }

  handleChange(event) {
    const value = event.target.value.trim();
    this.setState({
      name: value,
    });
  }
  
  handleSubmit(event) {
    const value = this.state.name.trim();
    if (this.validateName(value)) {
      controller.addGroup(value);
      alert('Group Added');
    } else {
      alert('Group Name shouldn\'t be empty or spaces');
    }
    event.preventDefault();
  }

  render() {
    return <form onSubmit={this.handleSubmit}>
      <div>Add Group</div>
      <label>
        Name:
        <input type="text" name="name" onChange={this.handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  }
}