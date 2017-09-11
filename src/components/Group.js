import React from 'react';

import controller from '../controller.js';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      group: this.props.data,
      users: [],
    }

    this.deleteGroup = this.deleteGroup.bind(this);
    this.displayUsers = this.displayUsers.bind(this);
    this.renderUserRow = this.renderUserRow.bind(this);
    this.deleteUserFromGroup = this.deleteUserFromGroup.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      group: nextProps.data
    });
  }

  displayUsers() {
    controller.getUsersFromList(this.state.group.users).then(
      users => this.setState({users})
    );
  }

  deleteGroup() {
    controller.deleteGroup(this.state.group)
    .then(_ => window.location.reload())
  }

  deleteUserFromGroup(userId) {
    controller.deleteUserFromGroup(userId, this.state.group._id)
    .then(_ => window.location.reload());
  }

  renderUserRow(user) {
    return <li key={user.id}>
      {user.doc.fullname}
      <button onClick={() => this.deleteUserFromGroup(user.id)}>delete</button>
    </li>
  }

  render() {
    const group = this.state.group;
    const users = this.state.users;

    return <div>
      {group.name}
      { group.users.size > 0 && <button onClick={this.displayUsers}>users</button> }
      { !group.users.size > 0 && <button onClick={this.deleteGroup}>delete</button> }
        <ul>
          {users.map(this.renderUserRow)}
        </ul>
    </div>
  }
}