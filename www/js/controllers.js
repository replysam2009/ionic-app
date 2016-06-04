
angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('PnrController',['$scope','$http','$state',
  function($scope,$http,$state){
    $scope.message = "";  
    $scope.CheckPnr = function(){
        $scope.msgHTML = "<img src='img/loader.gif'> <span style='color:green'>Checking Status.Please Wait...</span>";
        var pnrNumber=$scope.pnr;
        var url="http://api.railwayapi.com/pnr_status/pnr/"+pnrNumber+"/apikey/uawup5915/";
        // Simple GET request example:
        $http({
        method: 'GET',
        url: url
        }).then(function successCallback(response) {
            var err=response.data.error;
            var code=response.data.response_code;
            if(err||code!="200"){
                $scope.pnr='';
                $scope.msgHTML = "";
                alert('Invalid PNR Number');
            }
            else{
                $scope.pnr='';
                $scope.msgHTML = "";   
                var text  = '<div class="card">';
                            text += '<div class="item item-divider">'
                            text += '<b>PNR Status - '+pnrNumber+'</b>';
                            text += '</div>';
                            text += '<div class="item item-text-wrap">';
                            text += '<b>Train:</b> '+ response.data.train_name +' ('+response.data.train_num+')<br/>';
                            text += '<b>Date of Journey:</b> '+ response.data.doj+'<br/>';
                            text += '<b>Chart Prepared:</b> '+ response.data.chart_prepared+'<br/>';
                            text += '<div class="row">';
                                text += '<div class="col"><b>Passenger</b></div>';
                                text += '<div class="col"><b>Booking Status</b></div>';
                                text += '<div class="col"><b>Current Status</b></div>';
                                //text += '<div class="col"><b>Coach Position</b></div>';
                            text += '</div>';
                            response.data.passengers.forEach(function(element) {
                                text += '<div class="row">';
                                    text += '<div class="col">'+element.no+'</div>';
                                    text += '<div class="col">'+element.booking_status+'</div>';
                                    text += '<div class="col">'+element.current_status+'</div>';
                                    //text += '<div class="col">'+element.coach_position+'</div>';
                                text += '</div>';    
                            }, this);    
                            text += '</div>';
                            text += '</div>';
                            $scope.pnrDataHTML = text;
            }
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
           // $scope.msgHTML = "<span class='color:red'>Error ! :(</span>";
            alert("Error Callback: "+response.data);
            $scope.pnr='';
            $scope.msgHTML = "";
        });
    }
  }])
  
  .controller('SeatAvailabilityController',['$scope','$http','$state',
  function($scope,$http,$state){
    $scope.fromStationList = "";
    $scope.GetStation = function(){
        var listFrom='<li id="ww" class="button button-clear button-positive">sss</li>';
        $scope.fromStationList=listFrom; 
        var obj=document.getElementById('ww')
    obj.onclick=function(){alert()};
    }
    $scope.SelectedFromStation = function(){
        alert();
    }
    $scope.SelectedToStation = function(){
        alert($scope.choice);
    }
  }])
  
  .controller('ScheduleController',['$scope','$http','$state',
  function($scope,$http,$state){
    $scope.fromStationList = "";
    $scope.GetStation = function(){
        var listFrom='<li id="ww" class="button button-clear button-positive">sss</li>';
        $scope.fromStationList=listFrom; 
        var obj=document.getElementById('ww')
    obj.onclick=function(){alert()};
    }
    $scope.SelectedFromStation = function(){
        alert();
    }
    $scope.SelectedToStation = function(){
        alert($scope.choice);
    }
  }])
  
  .controller('LiveStatusController',['$scope','$http','$state',
  function($scope,$http,$state){
    $scope.msgHTML = "";
    $scope.msgLiveHTML = "";
    document.getElementById("tlist").style.display="none";
    $scope.CheckLiveStatus = function(){
    var trainNumber=$scope.train; 
    //alert("#"+trainNumber+"$");   
    var d = new Date();
    if($scope.selDay==null){
       alert("Please select a day."); 
    }
    else if(isNaN(trainNumber)||trainNumber.length>5){
        alert("Please enter a valid train number."); 
    }
    else{
        if($scope.selDay=="0")
        d.setDate(d.getDate()-1);
        $scope.msgHTML = "<img src='img/loader.gif'> <span style='color:green'>Checking Status.Please Wait...</span>";
        
        var trainName='';
        var currentPosition='';
        
        var m=d.getMonth();
        var dd=d.getDate();
        var month="";
        var date="";
        switch(m){
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                month='0'+(m+1);
                break;    
            default:
                month=(m+1)+"";
                break;          
        }
        switch(dd){
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
                date='0'+dd;
                break;    
            default:
                date=dd+"";
                break;          
        }
        var datetoday=d.getFullYear()+""+month+""+date;
        //alert(datetoday);
        var url="http://api.railwayapi.com/live/train/"+trainNumber+"/doj/"+datetoday+"/apikey/uawup5915/";
        // Simple GET request example:
        $http({
        method: 'GET',
        url: url
        }).then(function successCallback(response) {
            var err=response.data.response_code;
            if(err=="204"){
                $scope.train='';
                $scope.msgHTML = "";
                $scope.msgLiveHTML = "";
                alert('Error: '+response.data.error);
            }
            else{
                $scope.train='';
                $scope.msgHTML = "";
                $scope.msgLiveHTML = "";
                currentPosition = response.data.position;
                var urlT="http://api.railwayapi.com/name_number/train/"+trainNumber+"/apikey/uawup5915/";
                $http({
                    method: 'GET',
                    url: urlT
                    }).then(function successCallback(resp) {
                        var err=response.data.error;
                        if(err){
                            trainName='';
                            
                        }
                        else{
                            document.getElementById("tlist").style.display="none";
                            trainName=resp.data.train.name;
                            var text  = '<div class="card">';
                            text += '<div class="item item-divider">'
                            text += '<b>Live Running Status <br/>'+trainNumber+' - '+trainName+'</b>';
                            text += '</div>';
                            text += '<div class="item item-text-wrap">';
                            text += '<b>Current position:</b>'+ currentPosition;    
                            text += '</div>';
                            text += '</div>';
                            $scope.msgLiveHTML = text;
                        }
                        
                    }, function errorCallback(resp) {
                        alert("Error Callback (Inner): "+resp.data.error);
                        $scope.msgHTML="";
                        $scope.msgLiveHTML ="";
                        $scope.train='';
                });  
            }
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
           // $scope.msgHTML = "<span class='color:red'>Error ! :(</span>";
            alert("Error Callback (First): "+response.data.error);
            $scope.msgHTML="";
            $scope.msgLiveHTML ="";
            $scope.train='';
        });
    }
    }
  }]);