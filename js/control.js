class Control{
	constructor(){
		this.scoresTable = document.querySelector(".scores-table");
		this.outsideList = document.querySelector(".view");
		this.levelsList = document.querySelector(".level");
		this.cardsContainer = document.querySelector(".cards-field");

		this.createOutsideStyleList();
		this.createScoresTable();

		this.startGameButton = document.querySelector(".start");
		this.stopGameButton = document.querySelector(".menu-game");
    this.stopGameButtonModal = document.querySelector(".menu-modal");
    this.restartGameButton = document.querySelector(".restart-game");
		this.restartGameButtonModal = document.querySelector(".restart-modal");
		this.leftSideBlock = document.querySelector(".left-side-block");
		this.centralBlock = document.querySelector(".central-block");
		this.rightSideBlock = document.querySelector(".right-side-block");
		this.playArea = document.querySelector(".play-zone");
		this.intro = document.querySelector(".intro");
		this.modal = document.querySelector('.modal');
		this.closeButton = document.querySelector(".close");
		this.addEventsListeners();
	}

	addEventsListeners(){
		/*closing of modal window by close icon*/

		this.closeButton.addEventListener("click", function(){
			this.modal.style.display = "none";
		});
		this.levelsList.addEventListener("click", this.highlightChoice.bind(this));
		this.outsideList.addEventListener("click", this.highlightChoice.bind(this));
		/*start game by click button Play in main menu*/
		this.startGameButton.addEventListener("click", this.startGame.bind(this));
		/*finish game by click the button Menu*/
		this.stopGameButton .addEventListener("click", this.finishGame.bind(this));
		this.stopGameButtonModal.addEventListener("click", this.finishGame.bind(this));	
		/*restart game and loose the progress*/
		this.restartGameButton.addEventListener("click", this.restartGame.bind(this));
		this.restartGameButtonModal.addEventListener("click", this.restartGame.bind(this));
		this.cardsContainer.addEventListener("click", this.rotateCard.bind(this));
	}

	highlightChoice(event){
    	let level = event.target;
    	if(level === event.currentTarget){
    		return;  
    	}
  		if(level.parentElement !== event.currentTarget){
    		level = level.parentElement;
  		}
  		var allLevels = event.currentTarget.children;
  		if(!level.classList.contains("active")){
    		for(let i = 0; i < allLevels.length; i++){
      			if(allLevels[i].classList.contains("active")){
        			allLevels[i].classList.toggle("active");
      			}
    		}
    		level.classList.toggle("active");
 		}
	}

	startGame(){
    	player.playerName = document.querySelector("#name").value;

        this.intro.classList.toggle("opacity");
        this.leftSideBlock.classList.toggle("opacity");
        this.rightSideBlock.classList.toggle("opacity");

 		var that = this;
        window.setTimeout(function(){

        	that.leftSideBlock.classList.toggle("hide");
        	that.rightSideBlock.classList.toggle("hide");
        	that.intro.classList.toggle("hide");
        	that.centralBlock.classList.toggle("width-wide");
        }, 1000);

     	window.setTimeout(function(){
      		var difficulty = that.createGameField();
        	that.playArea.classList.toggle("hide");
      		player.playerDifficulty = difficulty;
    	}, 1500);
    	timer.startTimer();
	}

/*stoper == finishgame*/
	finishGame(e){
  		this.hideModalWindow();
  		document.querySelector("#name").value = "";

    	this.playArea.classList.toggle("hide");
    	this.deliteGameField();
    	this.centralBlock.classList.toggle("width-wide");

    	var that = this;
    	window.setTimeout(function(){
     		that.leftSideBlock.classList.toggle("hide");
     		that.rightSideBlock.classList.toggle("hide"); 
     		that.intro.classList.toggle("hide");
    	}, 500);
     	window.setTimeout(function(){
     		that.leftSideBlock.classList.toggle("opacity");
     		that.rightSideBlock.classList.toggle("opacity");
     		that.intro.classList.toggle("opacity");
    	}, 550);

    	timer.cancelTimer();  
    	steps.refreshSteps();
    	this.deliteScoresTable();
    	this.createScoresTable();
	}
/*restartion = restartGame*/
	restartGame(){
  		this.hideModalWindow();
  		
  		var cards = this.cardsContainer.children;
  		for(let i = 0; i < cards.length; i++){
    		if(cards[i].classList.contains("invisible")){
      			cards[i].classList.toggle("invisible");
    		}  
  		}
  		timer.refreshTimer();
  		timer.startTimer();
    	steps.refreshSteps();
	}

	createGameField(){
		var gameLevel = _findSelectedElement(this.levelsList).dataset.level;
		var gameStyle = _findSelectedElement(this.outsideList).firstElementChild.style.backgroundImage;
		var numberOfCards = _defineNumberOfCards(gameLevel);
		console.log(gameLevel + " : " + gameStyle);

	    var setOfCards = [];
		for(let i = 0; i < numberOfCards/2; i++){
			var card = document.createElement("div");
			card.setAttribute("class", `card ${gameLevel}`);
			card.setAttribute("data-number", `${i}`);

			var cardFont= document.createElement("div");
			cardFont.setAttribute("class", "pic pic-back");
			cardFont.style.backgroundImage = `url('img/cards_logo/${i+1}.png')`;
	
			var cardBack= document.createElement("div");
			cardBack.setAttribute("class", "pic pic-font");
			cardBack.style.backgroundImage = gameStyle;

			card.append(cardFont);
			card.append(cardBack);

			setOfCards.push(card);
			setOfCards.push(card.cloneNode(true));
		}

		setOfCards = _shuffleArray(setOfCards);

		function _shuffleArray(array) {
   			array = array.sort((a,b) => Math.random() - 0.5);
    		return array;
		}  

		function _findSelectedElement(elem){
  			var allElems = elem.children;
    		for(let i = 0; i < allElems.length; i++){
        		if(allElems[i].classList.contains("active")){
            		return allElems[i];
        		}
    		}
		}

		function _defineNumberOfCards(level){
			switch (level) {
  				case "easy-mode":
    				return 6;
    				break;
  				case "normal-mode":
    				return 12;
    				break;
  				case "hard-mode":
    				return 20;
    				break;
    			case "extreme-mode":
    				return 36;
    				break;
			}
		}

		for(let i = 0; i < setOfCards.length; i++) {
			this.cardsContainer.append(setOfCards[i])
		}

		return gameLevel;
	}

	deliteGameField(){
		this.cardsContainer.innerHTML = "";
	}

	rotateCard(event){
  		var card = event.target;
  		if(card === event.currentTarget){
    		return;  
  		}
  		if(card.parentElement !== event.currentTarget){
    		card = card.parentElement;
  		}
  		if (card.classList.contains("rotate")){
    		return;
  		}
  		if (_numberOfRotatedCards(event.currentTarget.children) < 2) {
    		card.classList.toggle("rotate");
  		}
  		if(_numberOfRotatedCards(event.currentTarget.children) == 2){
    		var element = event.currentTarget;

    		var that = this;
    		window.setTimeout(function(){
      			_compareCards(element.children);

      			if(!_isCardsStillExist(element.children)){
        			player.playerTime = timer.getTime(); 
        			timer.stopTimer();
        			player.playerSteps = steps.getSteps();
        			save.savePlayerResult(player);
        			that.showModalWindow();
      			}
   			}, 1000);
  		}

  		function _numberOfRotatedCards(container){
  			var count = 0;
  			for(let i = 0; i < container.length; i++){
    			if (container[i].classList.contains("rotate")) {
      				count++;
    			}
  			}
  			return count;
		}

		function _compareCards(container){
  			steps.addSteps();
  			var pair = [];
  			for(let i = 0; i < container.length; i++){
    		  	if (container[i].classList.contains("rotate")) {
      				pair.push(container[i]);
    			}
  			}
  			if(pair[0].dataset.number == pair[1].dataset.number){
    			pair[0].classList.toggle("invisible");
    			pair[1].classList.toggle("invisible");
    			pair[0].classList.toggle("rotate");
    			pair[1].classList.toggle("rotate");
  			}else{
    			pair[0].classList.toggle("rotate");
    			pair[1].classList.toggle("rotate");
  			}  
		}

		function _isCardsStillExist(container){
  			var isExist = false;
  			for(let i = 0; i < container.length; i++){
    			if (!container[i].classList.contains("invisible")) {
      				isExist = true;
    			}
  			}
  			return isExist;
		}
    }

	createOutsideStyleList(){
		var numberOfOutsideStyles = 6;

		for(let i = 0; i < numberOfOutsideStyles; i++){
  			var card = document.createElement("div");
  			card.setAttribute("class", "view-style");

  			if(i == 0){card.classList.toggle("active")}

  			var cardStyle = document.createElement("div");
  			cardStyle.setAttribute("class", "pic-one");
  			cardStyle.style.backgroundImage = `url('img/cards_back/${i+1}.png')`;
  			card.append(cardStyle);
  			this.outsideList.append(card);
		}
	}

	createScoresTable(){
		var players = save.getAllSavedPlayersResults();
		for (var i = 0; i < 10; i++) {
    		var row = document.createElement("tr");
    		var cell1 = document.createElement("td");
    		var cell2 = document.createElement("td"); 
    		var cell3 = document.createElement("td"); 
    		var cell4 = document.createElement("td"); 
   			if(players[i]){
        		cell1.innerHTML = players[i].name;
        		cell2.innerHTML = players[i].difficulty;
        		cell3.innerHTML = players[i].time;
        		cell4.innerHTML = players[i].steps;
    		} else{
        		cell1.innerHTML = "-";
        		cell2.innerHTML = "-";
        		cell3.innerHTML = "-";
        		cell4.innerHTML = "-";
    		} 
   			row.append(cell1);
    		row.append(cell2);
    		row.append(cell3);
    		row.append(cell4);
    		this.scoresTable.append(row);
    	}	
	}

	deliteScoresTable(){
		var elements = this.scoresTable.children;
		

		for (var i = 0; i < 10; i++) {
			elements[elements.length-1].remove();
		}
	}

	showModalWindow(){
		this.modal.style.display = "block";
	}

	hideModalWindow(){
		this.modal.style.display = "none";
	}
}