import PouchDB from 'pouchdb';
import find from 'pouchdb-find';
PouchDB.plugin(find);

const groupsDB = new PouchDB('groups-database');
const usersDB = new PouchDB('users-database');

export default {

  setOnDataChange(fun) {
    groupsDB.changes({live: true})
    .on('change', fun);
    usersDB.changes({live: true})
    .on('change', fun);
  },

  addUser(fullname) {
    return usersDB.post({
      fullname,
      groups: new Set(),
    });
  },

  getAllUsers() {
    return usersDB.allDocs({
      include_docs: true,
    });
  },

  addGroup(name) {
    return groupsDB.post({
      name,
      users: new Set(),
    });
  },

  getAllGroups() {
    return groupsDB.allDocs({
      include_docs: true,
    });
  },

  addUserToGroup(userId, groupId) {
    const addToGroup = groupsDB.get(groupId).then(function(doc) {
      return groupsDB.put({
        _id: groupId,
        _rev: doc._rev,
        name: doc.name,
        users: doc.users.add(userId),
      });
    });
    const addToUser = usersDB.get(userId).then(function(doc) {
      return usersDB.put({
        _id: userId,
        _rev: doc._rev,
        fullname: doc.fullname,
        groups: doc.groups.add(groupId),
      });
    });
    return Promise.all([addToGroup, addToUser]);
  },

  deleteUserFromGroup(userId, groupId, userDeleted) {
    const deleteFromGroup = groupsDB.get(groupId).then(function(doc) {
      doc.users.delete(userId);
      return groupsDB.put({
        _id: groupId,
        _rev: doc._rev,
        name: doc.name,
        users: doc.users,
      });
    });
    let deleteFromUser = true;
    if (!userDeleted) {
      deleteFromUser = usersDB.get(userId).then(function(doc) {
        doc.groups.delete(groupId);
        return usersDB.put({
          _id: userId,
          _rev: doc._rev,
          fullname: doc.fullname,
          groups: doc.groups,
        });
      });
    }
    return Promise.all([deleteFromGroup, deleteFromUser]);
  },

  getUsersFromList(userSet) {
    if (!userSet.size) {
      return Promise.resolve([]);
    }
    return this.getAllUsers().then(users => {
      return users.rows.filter(row => userSet.has(row.id));
    });
  },
  
  getGroupsExcludingList(groupSet) {
    if (!groupSet.size) {
      return this.getAllGroups().then(res => res.rows);
    }
    return this.getAllGroups().then(groups => {
      return groups.rows.filter(row => !groupSet.has(row.id));
    });
  },

  deleteUser(user) {
    return Promise.all(
      [...user.groups].map(
        groupId => this.deleteUserFromGroup(user._id, groupId, true)
      )
    ).then(_ => usersDB.remove(user));
  },

  deleteGroup(group) {
    return groupsDB.remove(group);
  }
  
};
