angular.module('contactListMgr', [])
	.controller('contactListCtrl', function($scope, $http) {
		$http.get('sample-data.json').success(function(contacts){
			$scope.contacts = contacts;
			$scope.contactsPerPage = 10;
			$scope.currentPage = 1;
			$scope.searchText = "";
			$scope.filteredContacts = contacts;
			$scope.updateStates(contacts);
			$scope.selectedState = "";
			$scope.selectedContact = "";
		});

		$scope.getNumber = function(num){
			console.log((new Array(num)).length);
			return new Array(num);
		}

		$scope.newPage = function(page){
			$scope.currentPage = page;
			var start = (($scope.contactsPerPage*$scope.currentPage)-$scope.contactsPerPage);
			var end = start+parseInt($scope.contactsPerPage);
			// console.log('start: '+start+' - end: '+end);
			$scope.filteredContacts = $scope.contacts.slice(start,end); 
		}

		$scope.setContact = function(contact){
			$scope.selectedContact = contact;
		}

		$scope.unsetContact = function(){
			$scope.selectedContact = "";
		}

		$scope.$watch('contactsPerPage',function(newValue,oldValue){
			if(newValue){
				$scope.currentPage = 1;
				$scope.numberOfPages = Math.ceil($scope.filteredContacts.length/$scope.contactsPerPage);
			}
		});

		$scope.$watch('selectedState',function(newValue,oldValue){
			if(newValue || newValue==''){
				var items = [];
				for (var item, i = 0; item = $scope.contacts[i++];) {
					if(item.state == newValue || newValue==''){
						items.push(item);
					}
				};
				$scope.filteredContacts = items;
				$scope.currentPage = 1;
				$scope.numberOfPages = Math.ceil($scope.filteredContacts.length/$scope.contactsPerPage);	
			}
		});

		$scope.$watch('searchText',function(newValue,oldValue){
			if(newValue || newValue==''){
				var items = [];
				for (var item, i = 0; item = $scope.contacts[i++];){
					var fname = item.first_name.toLowerCase();
					var lname = item.last_name.toLowerCase();
					var search = newValue.toLowerCase();
					if(fname.indexOf(search) != -1 || lname.indexOf(search) != -1){
						items.push(item);
					}
				}
				$scope.filteredContacts = items;
				$scope.currentPage = 1;
				$scope.selectedState = "";
				$scope.numberOfPages = Math.ceil($scope.filteredContacts.length/$scope.contactsPerPage);	
			}
		});

		$scope.updateStates = function(contacts){
			var lookup = {};
			var result = [];

			for (var item, i = 0; item = contacts[i++];) {
			  var state = item.state;

			  if (!(state in lookup)) {
			    lookup[state] = 1;
			    result.push(state);
			  }
			}
			$scope.states = result.sort();
		}		


	});