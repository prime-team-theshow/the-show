/*
This Service is currently for user authentication
- it will be used for testing and possible more
*/

myApp.service('AuthService', function ($http) {
    console.log('in AuthService');
    var self = this;




    /************** $http **************/

    // temporary - allows admins to create a new admin login
    self.adminRegister = function (userObj) {
        console.log('in adminRegister');
        $http.post('/register/admin', userObj).then(function (response) {
            console.log('admin registration successful');
        }).catch(function (response) {
            console.log('Registration error: ', response);
        }); // end catch
    }; // end adminRegister

    // allows agencies to create a new login
    self.orgRegister = function (userObj) {
        console.log('in orgRegister');
        $http.post('/register/organization', userObj).then(function (response) {
            console.log('user registration successful');
        }).catch(function (response) {
            console.log('Registration error: ', response);
        }); // end catch
    }; // end orgRegister

    // takes user credentials and authenticates them on the server
    self.login = function (userObj) {
        console.log('in login');
        $http.post('/', userObj).then(function (response) {
            if (response.data.username) {
                console.log('login success: ', response.data);
                console.log('response.data.isadmin', response.data.isadmin);
            } else {
                console.log('login post failure: ', response);
            } // end else
         }).catch(function (response) {
            console.log('login catch - failure: ', response);
         }); // end catch
    }; // end login

    // logout admin and org users
    self.logout = function () {
        console.log('in logout');
        $http.get('/auth/logout').then(function (response) {
            console.log('logged out');
        }); // end GET
    }; // end adminLogout

    // gets user info from the server and logs it on client
    self.getUser = function () {
        console.log(' in getUser');
        $http.get('/auth').then( function(response) {
            console.log('/auth response.data ', response.data);
            // if the user has a current session on the server
            if (response.data.username) {
                // return these values
                return { 
                    id: response.data.id,
                    email : response.data.email,
                    isadmin: response.data.isadmin
                }; // end return object
            } else {
                console.log('getUser failed', response);
            } // end else
        }); // end auth GET
    }; // end getUser



}); // end AuthService