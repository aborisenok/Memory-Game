class Save{
	constructor(){

	}

	savePlayerResult(palyer){
		var setNumber = localStorage.length;

  		localStorage.setItem(setNumber, JSON.stringify(player));
	}

	getAllSavedPlayersResults(){
		var results = [];
  		for (var i = 0; i < localStorage.length; i++) {
    		results.push(JSON.parse(localStorage.getItem(i)));
  		}
  		return results;
	}

}
