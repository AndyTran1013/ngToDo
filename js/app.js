var myApp = angular.module("todoApp",[]);

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
		$scope.toDos.push({item: $scope.task, done: false});
		$scope.task = '';
	};

	$scope.clearAll = function(){
		$scope.toDos = [];
	};

	$scope.clearComplete = function(){
		$scope.toDos = $scope.toDos.filter(function(e){
			return !e.done;
		});
	};

	$scope.remaining = function(){
		var complete = 0;
		angular.forEach($scope.toDos, function(item){
			if (item.done){complete++;}
		});
		return $scope.toDos.length - complete;
	};
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
		restrict:'E',
		replace:true,
		transclude:true,
		scope: {
			boxSize: '@',
			checkId: '@',
			strokeCol: '@',
			ngModel: '='
		},
		template: '<div class="lstChkbox">' + 
			'<input type="checkbox" ng-model="ngModel" id={{checkId}} />'+ 
			'<label for="{{checkId}}">'+
			'<svg ng-attr-width="{{boxSize}}"+"px" ng-attr-height="{{boxSize}}" + "px" viewBox=" 0 0 40 40">' +
				'<path fill="none" stroke="{{strokeCol}}" d="M17,2C14.763,3.705,5.04,6.792,5.739,9.865' +
	        'c0.525,2.311,19.999,0.851,22.575,0.755c-2.663,0.559-5.151,1.594-7.747,2.382c-3.352,1.017-8.123,1.236-10.839,3.563' +
	        'c4.168,0.508,8.488-0.91,12.503-0.471c-2.804,2.072-12.26,4.851-13.73,8.155c4.163,2.611,20.343-7.723,24.834-6.917' +
	        'C30.395,18.826,10,30.75,7.5,33.083s23.239-7.453,25.667-7.833c-2.007,1.341-12.444,4.937-12.831,7.466' +
	        'c3.796,2.124,9.823-0.316,13.276,1.936c-0.229,0.396-6.344,3.66-6.612,4.099c2.191,0.104,8.943-4.084,11.266-4.363" />' +
   		'</svg><ng-transclude></ng-transclude></label>' +
			'</div>',
		link: function(scope, el, attr){
			var task = el.find("label");
			scope.$watch("ngModel",function(){
				if(scope.ngModel){
					task.css("text-decoration","line-through");
				} else {
					task.css("text-decoration","");
				}
			});
		}
	};
});