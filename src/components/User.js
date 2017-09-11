import React from 'react';

import controller from '../controller.js';

export default class extends React.Component {
  constructor(props) {
    super(props);
    const user = this.props.data;
    this.state = {
      user,
      groupsNotIn: [],
    };

    controller.getGroupsExcludingList(user.groups).then(
      groups => this.setState({
        groupsNotIn: groups,
      })
    );
    
    this.addToGroup = this.addToGroup.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  addToGroup(event) {
    const user = this.state.user;
    const groupId = event.target.value;
    if (groupId) {
      controller.addUserToGroup(user._id, groupId).then(
        res => alert(`User ${user.fullname} was added successfully`)
      ).then(_ => window.location.reload());
    }
  }
  
  deleteUser() {
    controller.deleteUser(this.state.user)
    .then(_ => window.location.reload());
  }

  render() {
    const user = this.state.user;
    return <div>
      {user.fullname}
      <select value="" onChange={this.addToGroup}>
        <option value="">Add to group</option>
        { 
          this.state.groupsNotIn.map(
            group => 
              <option key={group.id} value={group.id} selected>
                {group.doc.name}
              </option>
          )
        }
      </select>
      <button onClick={this.deleteUser}>delete</button>
    </div>
  }
}