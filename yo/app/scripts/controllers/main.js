'use strict';

angular.module('musicApp')
  .controller('MainCtrl', function ($scope, Base64, CordovaService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    console.log("Start main");
    CordovaService.ready.then(function() {
	    window.bluetoothle.initialize(initializeSuccess, initializeError);
	});
	var addressKey = "address";

	function initializeSuccess(obj)
	{
	  if (obj.status == "initialized")
	  {
	    
	        console.log("Bluetooth initialized successfully, starting scan for music beacons.");
	        var paramsObj = {"serviceAssignedNumbers":[]};
	        window.bluetoothle.startScan(startScanSuccess, startScanError, paramsObj);
	    
	  }
	  else
	  {
	    console.log("Unexpected initialize status: " + obj.status);
	  }
	}

	function initializeError(obj)
	{
	  console.log("Initialize error: " + obj.error + " - " + obj.message);
	}

	function startScanSuccess(obj)
	{
	    console.log(obj);
	    var temp = Base64.Convert(obj.advertisement);
	    console.log(temp);
	}

	function startScanError(obj)
	{
	  console.log("Start scan error: " + obj.error + " - " + obj.message);
	}

  });
