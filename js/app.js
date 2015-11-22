var myApp = angular.module("todoApp",[])

myApp.controller("toDoCtrl",['$scope','lclStorage',function($scope,lclStorage){
		
	if (!lclStorage.getData("toDoLst") || !lclStorage.getData("toDoLst") === ""){
		$scope.toDos = [];
	} else {
		$scope.toDos = lclStorage.getData("toDoLst");
	}

	$scope.$watch('toDos',function(){
		lclStorage.setData("toDoLst",$scope.toDos);
	},true);

	$scope.addTask = function(){
		$scope.toDos.push({item: $scope.task, done: false})
		$scope.task = '';
	};

	$scope.clearAll = function(){
		$scope.toDos = [];
	};

	$scope.clearComplete = function(){
		$scope.toDos = $scope.toDos.filter(function(e){
			return !e.done
		})
	};


	$scope.remaining = function(){
		var complete = 0;
		angular.forEach($scope.toDos, function(item){
			if (item.done){complete++};
		});
		return $scope.toDos.length - complete;
	}
}]);


myApp.factory("lclStorage",['$window',function(win){
	return {
		setData: function(item,data){
			win.localStorage.setItem(item,JSON.stringify(data));
		},
		getData: function(item){
			return JSON.parse(win.localStorage.getItem(item));
		}
};

}]);


myApp.directive("lstChkbox", function(){
	return{
		restrict:'AE',
		replace:true,
		scope: {
			checkId: '@',
			ngModel: '='
		},
		template: '<div class="lstChkbox">' + 
			'<label for="{{checkId}}">label</label> ' +
			'<input type="checkbox" ng-model="ngModel" id={{checkId}} />'+ 
			'</div>'
	};
});