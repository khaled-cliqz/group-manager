SystemJS.config({
  paths: {
    "npm:": "jspm_packages/npm/",
    "github:": "jspm_packages/github/",
    "group-manager/": "src/"
  },
  browserConfig: {
    "baseURL": ".",
    "bundles": {
      "build.js": [
        "scripts/main.js",
        "scripts/group.js",
        "npm:systemjs-plugin-babel@0.0.25/babel-helpers/classCallCheck.js",
        "npm:systemjs-plugin-babel@0.0.25.json",
        "scripts/user.js",
        "scripts/controller.js",
        "github:pouchdb/pouchdb@6.3.4/dist/pouchdb.js",
        "github:pouchdb/pouchdb@6.3.4.json"
      ]
    }
  },
  devConfig: {
    "map": {
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.25"
    }
  },
  transpiler: "plugin-babel",
  packages: {
    "group-manager": {
      "main": "group-manager.js",
      "meta": {
        "*.js": {
          "loader": "plugin-babel"
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "pouchdb": "github:pouchdb/pouchdb@6.3.4"
  },
  packages: {}
});
