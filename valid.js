var app=angular.module("two_way",[]);
app.controller("two_way_control",function($scope,$http,$interval,Utils){
  load_pictures();
  $interval(function(){
    load_pictures();
  },300);
  function load_pictures(){
  $http.get('http://localhost:3000/load').success(function(data){    
    $scope.profile_pictures=data;
  });
  };
//image url check

  // $scope.test = function() { 
       
  //   }; 

$scope.news={};
/* put $http into a service. Keep controllers thin */
$scope.submit = function(newpost){
     Utils.isImage($scope.pics).then(function(result) { 
            $scope.result = result;   }); 
    /* processData:false why do you need this? */
    /* I can see the code behind this $interval */
        console.log("triggering post");
        $http({method:"post", url:"http://localhost:3000/addd", data:newpost})
            .then(function(data){
                /* Success callback */
            sweetAlert("Sucess", "Data hase been entered!", "success");
                // console.log("success");
            },function(err){
                /* Failure callback */
           sweetAlert("Oops...", "Something went wrong!", "error");
            });
    };
}); 

app.factory('Utils', function($q) { 
    return { 
        isImage: function(src) { 
        
            var deferred = $q.defer(); 
        
            var image = new Image(); 
            image.onerror = function() { 
                deferred.resolve(false); 
            }; 
            image.onload = function() { 
                deferred.resolve(true); 
            }; 
            image.src = src; 
        
            return deferred.promise; 
        } 
    }; 
}); 