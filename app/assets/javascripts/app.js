'use strict';

angular
    .module('angularfireStarterApp', [
        'firebase',
        'angular-md5',
        'ui.router'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'assets/home/home.html',
                requireNoAuth: function($state, Auth){
                    return Auth.$requireSignIn().then(function(auth){
                        $state.go('profile');
                    }, function(error){
                        return;
                    });
                }
            })
            .state('login', {
                url: '/login',
                controller: 'AuthCtrl as authCtrl',
                templateUrl: 'assets/auth/login.html',
                resolve: {
                    requireNoAuth: function($state, Auth){
                        return Auth.$requireSignIn().then(function(auth){
                            $state.go('profile');
                        }, function(error){
                            return;
                        });
                    }
                }
            })
            .state('register', {
                url: '/register',
                controller: 'AuthCtrl as authCtrl',
                templateUrl: 'assets/auth/register.html',
                resolve: {
                    requireNoAuth: function($state, Auth){
                        return Auth.$requireSignIn().then(function(auth){
                            $state.go('profile');
                        }, function(error){
                            return;
                        });
                    }
                }
            })
            .state('profile', {
                url: '/profile',
                controller: 'ProfileCtrl as profileCtrl',
                templateUrl: 'assets/users/profile.html',
                resolve: {
                    auth: function($state, Users, Auth){
                        return Auth.$requireSignIn().catch(function(){
                            $state.go('home');
                        });
                    },
                    profile: function(Users, Auth){
                        return Auth.$requireSignIn().then(function(auth){
                            return Users.getProfile(auth.uid).$loaded();
                        });
                    }
                }
            });

        $urlRouterProvider.otherwise('/');
    })
    .config(function(){
        var config = {
            apiKey: "AIzaSyCIeDwx6RcPyxoNZ3Z6tfHERrgpn9fK-Bs",
            authDomain: "fire-slack-b8b47.firebaseapp.com",
            databaseURL: "https://fire-slack-b8b47.firebaseio.com",
            storageBucket: "fire-slack-b8b47.appspot.com",
            messagingSenderId: "660994729534"
        };
        firebase.initializeApp(config);
    });
