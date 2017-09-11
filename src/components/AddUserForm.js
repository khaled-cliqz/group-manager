import React from 'react';

import controller from '../controller.js';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullname: "",
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateName(name) {
    return name.length;
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({
      fullname: value
    });
  }

  handleSubmit(event) {
    const value = this.state.fullname.trim();
    if (this.validateName(value)) {
      controller.addUser(value).then(_ => {
        alert('User Added');
        window.location.reload();
      });
    } else {
      alert('Name shouldn\'t be empty or spaces');
    }
    event.preventDefault();
  }

  render() {
    return <form onSubmit={this.handleSubmit}>
      <div>Add User</div>
      <label>
        Full Name:
        <input type="text" name="fullname" onChange={this.handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  }
}