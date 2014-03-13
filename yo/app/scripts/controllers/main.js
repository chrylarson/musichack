'use strict';

angular.module('musicApp')
  .controller('MainCtrl', function ($rootScope, $scope, $http, $localStorage, $sessionStorage, Base64, CordovaService) {

  	$scope.$storage = $localStorage;
  	$scope.modalBeacon = {};
  	$scope.modal = false;

  	$scope.timeline = [{"headline":"Hey","advertisement":"sfdsfsadfsaf","uuid":"asdf","major":"adsf","minor":"adsf","power":"adsff"}];

  	//timeline();

    console.log("Woot Start main");
    CordovaService.ready.then(function() {
	    window.bluetoothle.initialize(initializeSuccess, initializeError);
	});
	var addressKey = "address";
	var paramsObj = {"serviceAssignedNumbers":[]};
	var scanTimer = null;

	function initializeSuccess(obj)
	{
	  if (obj.status == "initialized")
	  {
        console.log("Bluetooth initialized successfully, starting scan for music beacons.");
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
	  if (obj.status == "scanResult")
	  {
	    console.log("Stopping scan..");
	    window.bluetoothle.stopScan(stopScanSuccess, stopScanError);
	    clearScanTimeout();

	    var hexUuid = Base64.Convert(obj.advertisement);
	    var uuid = hexUuid.substring(18,50);
	    var major = hexUuid.substring(50,54);
	    var minor = hexUuid.substring(54,58);
	    var power = hexUuid.substring(58,62);

	    console.log(uuid + ":" + major + ":" + minor + ":" + power);

		obj.uuid = uuid;
		obj.major = major;
		obj.minor = minor;
		obj.power = power;

		console.log(uuid);
		var exists = false;
		if( Number(major) < 4 && Number(minor) < 4 ){
			console.log(major);
	        $scope.beacons.forEach(function (d, index) {
	            if (d.advertisement === obj.advertisement) {
	                exists = true;
	            }
	        });
			if(exists === false ) {
				$scope.beacons.push(obj);
				visit(obj);
				timeline();
			}

			$scope.$apply();
		}

	  }
	  else if (obj.status == "scanStarted")
	  {
	    console.log("Scan was started successfully, stopping in 10");
	    scanTimer = setTimeout(scanTimeout, 10000);
	  }
	  else
	  {
	    console.log("Unexpected start scan status: " + obj.status);
	  }
	}

	function startScanError(obj)
	{
	  console.log("Start scan error: " + obj.error + " - " + obj.message);
	  window.bluetoothle.initialize(initializeSuccess, initializeError);
	}

	function stopScanSuccess(obj)
	{
	  if (obj.status == "scanStopped")
	  {
	    console.log("Scan was stopped successfully");
	    window.bluetoothle.startScan(startScanSuccess, startScanError, paramsObj);
	  }
	  else
	  {
	    console.log("Unexpected stop scan status: " + obj.status);
	  }
	}

	function stopScanError(obj)
	{
	  console.log("Stop scan error: " + obj.error + " - " + obj.message);
	}

	function scanTimeout()
	{
	  console.log("Scanning time out, stopping");
	  window.bluetoothle.stopScan(stopScanSuccess, stopScanError);
	}

	function clearScanTimeout()
	{ 
	  console.log("Clearing scanning timeout");
	  if (scanTimer != null)
	  {
	    clearTimeout(scanTimer);
	  }
	}

    function visit(beacon) {
		$http({
	        url: $rootScope.url + "user/" + $scope.$storage.email + "/visited/" +  beacon.major + "-" + beacon.minor,
	        method: "PUT",
	        timeout: 10000,
	        headers: {'Content-Type': 'application/json'}
	    }).success(function(data) {
	    	console.log("visited: " + beacon.major + "-" + beacon.minor);

	        }).error(function(data, status) {
	        	console.log("failed visit");

	        });
    };

    function band(beacon) {
		$http({
	        url: $rootScope.url + "band/" +  beacon.major + "-" + beacon.minor,
	        method: "GET",
	        timeout: 10000,
	        headers: {'Content-Type': 'application/json'}
	    }).success(function(data) {
	    	console.log(data);

	        }).error(function(data, status) {
	        	console.log("failed visit");

	        });
    };

    $scope.liked = function(beacon) {
    	console.log("liked");
		$http({
	        url: $rootScope.url + "user/" + $scope.$storage.email + "/liked/" +  beacon.major + "-" + beacon.minor,
	        method: "PUT",
	        timeout: 10000,
	        headers: {'Content-Type': 'application/json'}
	    }).success(function(data) {
	    	console.log(data);
	        }).error(function(data, status) {
	        	console.log("failed visit");
	        });
    };

    function timeline() {
		$http({
	        url: $rootScope.url + "user/" +  $scope.$storage.email + "/timeline",
	        method: "GET",
	        timeout: 10000,
	        headers: {'Content-Type': 'application/json'}
	    }).success(function(data) {
	    	console.log(data);
	    	$scope.timeline = data;
	        }).error(function(data, status) {
	        	console.log("failed visit");
	        });
    };

    $scope.modalOpen = function(beacon) {
    	console.log(beacon);
		$scope.modalBeacon = beacon;
		$scope.modal = true;
    };

    $scope.modalClose = function() {
		$scope.modalBeacon = {};
		$scope.modal = false;
    };

  });
