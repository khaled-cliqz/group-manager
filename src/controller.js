import PouchDB from 'pouchdb';
import find from 'pouchdb-find';
PouchDB.plugin(find);

const DB_NAME = 'group-manager-db';
const db = new PouchDB(DB_NAME);
db.createIndex({
  index: {
    fields: ['category']
  }
});

const CATEGORIES = {
  USER: 'user',
  GROUP: 'group'
}

export default {

  addUser(fullname) {
    return db.post({
      fullname: fullname,
      category: CATEGORIES.USER,
    });
  },

  getAllUsers() {
    return db.find({
      selector: { category: CATEGORIES.USER },
    });
  },


  addGroup(name) {
    return db.post({
      name,
      category: CATEGORIES.GROUP,
    });
  },

  getAllGroups() {
    return db.find({
      selector: { category: CATEGORIES.GROUP },
    });
  },
};
