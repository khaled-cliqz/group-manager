import PouchDB from 'pouchdb';


const db = new PouchDB('group-manager');
db.destroy();

export default {
  addUser(user) {
    return db.put({
      _id: user.username,
      fullname: user.fullname,
    });
  }
};
