app.run((FIREBASE_CONFIG) => {
	firebase.initializeApp(FIREBASE_CONFIG);
});

app.controller("MushCtrl", ($http, $q, $scope, FIREBASE_CONFIG) => {
	$scope.mushrooms = [];

	let getMushroomList = () => {
		let mushroomz = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/mushrooms.json`)
			.then((fbItems) => {
				var itemCollection = fbItems.data;
				Object.keys(itemCollection).forEach((key) => {
					itemCollection[key].id = key;
					mushroomz.push(itemCollection[key]);
				});
				resolve(mushroomz);
				console.log("mushrooms", mushroomz);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

    let getItems = () => {
        getMushroomList().then((mushroomz) => {
        $scope.mushrooms = mushroomz;
        console.log("mushrooms", $scope.mushrooms);
        }).catch((error) => {
            console.log("get Error", error);
        });
    };
    getItems();










});