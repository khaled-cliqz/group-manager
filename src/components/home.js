import React from 'react';

import controller from '../controller.js';
import User from './user.js';
import Group from './group.js';
import AddUserForm from './AddUserForm.js';
import AddGroupForm from './AddGroupForm.js';

export default class extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      users: null,
      groups: null,
    }

    controller.setOnDataChange(this.getData.bind(this));
  }

  getData() {
    controller.getAllUsers().then(res => this.setState({users: res.rows}));
    controller.getAllGroups().then(res => this.setState({groups: res.rows}));
  }

  displayUser(user) {
    return <li key={user.id}> <User data={user.doc} /> </li>
  }
  
  displayGroup(group) {
    return <li key={group.id}> <Group data={group.doc} /> </li>
  }

  render() {
    const users = this.state.users;
    const groups = this.state.groups;
    return <table style={{width: '100%', verticalAlign: 'top'}}>
      <tbody>
        <tr>
          <td>
            <AddUserForm />
          </td>
          <td>
            <AddGroupForm />
          </td>
        </tr>
        <tr>
          <td>
            <ul>
              { users && users.map(this.displayUser) }
            </ul>
          </td>
          <td>
            <ul>
              { groups && groups.map(this.displayGroup) }
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  }
}