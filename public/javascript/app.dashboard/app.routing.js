/**
* dashboard.routing Module*
* Description
*/
angular.module('dashboard.routing', ['ui.router'])
  .config( function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state( 'app', {
          url: '/',
          views: {
            'header':   { templateUrl:  'views/shared/header.html' },
            'sidebar':  { template:  '' },
            'content':  { templateUrl:  'views/dashboard/login.html'},
            'footer':   { template:  '<small> Copyright me </small>' }
        },
        access: true

      })
      .state( 'app.login', {
        url: 'login',
        views: {
          'content@': {
            templateUrl: 'views/dashboard/login.html'
          }
        },
        access: true
      })
      .state( 'app.register', {
        url: 'register',
        views: {
          'content@': {
            templateUrl: 'views/dashboard/register.html'
          }
        },
        access: true
      })
      .state( 'app.guides', {
        url: 'guides',
        views: {
          'content@': {
            templateUrl: 'views/dashboard/guides.html'
          },
          'header@': {
            templateUrl: 'views/dashboard/guides/header.html'
          }
        },
        access: false
      })
      .state( 'app.guides.new', {
        url: '/new',
        views: {
          'content@': {
            templateUrl: 'views/dashboard/new.guide.html'
          }
        },
        access: false
      })
      .state( 'app.profile', {
        url: 'profile',
        views: {
          'content@': {
            templateUrl: 'views/dashboard/profile.html'
          },
          'header@':  {
            templateUrl: 'views/dashboard/profile/header.html'
          }
        },
        access: false
      })
      $urlRouterProvider.otherwise('/');
});
