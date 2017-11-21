myApp.controller('AdminDashController', function (AdminService, NodeMailerService, $location) {
    console.log('in AdminDashController');
    var vm = this;
    vm.showTile = false;
        // object to hold filtered org data
        vm.orgs = {
            //all: AdminService.orgs.all,
            pending: [],
            notPending: []
        }; // end orgs
    
        // org object to be update in DB
        // used for remind and invite
        vm.orgToEmail = {
            // holds org id, email, and message
    
        }; // end orgToEmail
    
        // message object to hold different messages for invite and remind
        // this will be moved to the server
        vm.message = {
            showRemindButton : false,
            showInviteButton : false,
            invite : 'Hello, please follow the link below to create ' +
            'a username and password for your organization.',
            remind : "Hello, we noticed you hadn't created " +
            'an account yet. Please follow the link below ' +
            'to setup a username and password'
        }; // end message 
    
        // filter org get into an array for non-pending orgs
        vm.notPendingOrgs = function () {
            console.log('in notPendingOrgs');
            return vm.orgs.all.filter(function (org) {
                return org.has_password === true || org.has_email === false;
            }); // end return
        }; // end noPendingOrgs
    
        // filter org get into an array for pending orgs
        vm.pendingOrgs = function () {
            console.log('in pendingOrgs');
            return vm.orgs.all.filter(function (org) {
                return org.has_password === false && org.has_email === true;
            }); // end return
        }; // end noPendingOrgs
    
        
        
        // sets up invite before sending
       
        vm.setInvite = function (orgId) {
            vm.showTile = true;
            console.log('in setInvite');
            // show button to send invite
            vm.message.showInviteButton = true;
            vm.message.showRemindButton = false;
            // sets the message to the value of invite message
            vm.orgToEmail.message = vm.message.invite;
            // sets org id to the org being invited
            vm.orgToEmail.orgId = orgId;
            // sets email to blank input
            vm.orgToEmail.email = '';
        }; // end setInvite
        
    
        // sets up reminder values before sending reminder
        vm.setRemind = function (orgId, email) {
            
            console.log('in setRemind');
            // show button to send reminder
            vm.message.showRemindButton = true;
            vm.message.showInviteButton = false;
            // sets the message to the value of remind message
            vm.orgToEmail.message = vm.message.remind;
            // sets org id to the org being reminded
            vm.orgToEmail.orgId = orgId;
            // sets email to email value and shows in the input
            vm.orgToEmail.email = email;
        }; // end setRemind
        
        // redirect to new year view
        vm.newYearView = function () {
            console.log('in newYearView');
            $location.path('/create-year');
        }; // end newYearView
    
    
    
        /************** $http **************/
    
        // gets org info from server and builds arrays to admin view
        vm.getOrgs = function() {
            console.log('in getOrgs');
            AdminService.getOrgs().then(function(){
                vm.orgs.all = AdminService.orgs.all;
                // if the get works and builds org.all array 
                if(vm.orgs.all.length > 0) {
                    vm.orgs.notPending = vm.notPendingOrgs();
                    vm.orgs.pending = vm.pendingOrgs();
                } // end if
            }); // end setting array values
        }; // end getOrgs
    
        // invite an organization to create a profile
        // email the user with a unique link to register
        // add their email to the DB and set invited to true
        vm.inviteOrg = function (email, inviteMessage, orgId) {
            console.log('in inviteOrg');
            // pass client side input to service
            NodeMailerService.inviteOrg(email, inviteMessage, orgId);
        }; // end inviteOrg
    
        // deny a user invite or deactivate an org user
        // removes email and password from DB
        // sets invited to false
        vm.denyOrg = function (orgId) {
            console.log('in denyOrg');
            AdminService.denyOrg(orgId).then(function () {
                vm.getOrgs();
            }); // end AdminService.denyOrg
        }; // end denyOrg
    
        // remind an already invited org to create login credentials
        // email user with a unique link to register
        // add their email to the DB and set invited to true
        vm.remindOrg = function (email, remindMessage, orgId) {
            console.log('in remindOrg');
            // pass client side input to service
            NodeMailerService.inviteOrg(email, remindMessage, orgId);
        }; // end remindOrg
    
         /************** on page load **************/
    
        vm.getOrgs();
    
    
});