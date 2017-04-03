angular.module('angularfireStarterApp')
  .controller('ProfileCtrl', ['$state', 'md5', 'Auth', 'profile', 'Users', function($state, md5, Auth, profile, Users){
    var profileCtrl = this;
    profileCtrl.profile = profile;
    profileCtrl.users = Users.all;
    profileCtrl.updateProfile = function(){
      profileCtrl.profile.emailHash = md5.createHash(auth.email);
      profileCtrl.profile.$save();
    };

    profileCtrl.logout = function (){
        Auth.$signOut().then(function (user){
            $state.go('home');
        }, function (error){
            authCtrl.error = error;
        });
      };

  }]);
