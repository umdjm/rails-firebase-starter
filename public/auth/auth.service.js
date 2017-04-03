angular.module('angularfireStarterApp')

  .factory('Auth', ['$firebaseAuth', function($firebaseAuth){
    var auth = $firebaseAuth();

    return auth;
  }]);
