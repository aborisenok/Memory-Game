class Player{
	constructor(){
		this.name;
		this.steps;
		this.time;
		this.difficulty;
	}

	set playerName(name){
		if(!name){
			this.name = "Unknown raccoon"
		} else{
			this.name = name;
		}
	}

	get playerName(){
		return this.name;
	}

	set playerSteps(steps){
		this.steps = steps;
	}

	get playerSteps(){
		return this.steps;
	}

	set playerTime(time){
		this.time = time;
	}

	get playerTime(){
		return this.time;
	}

	set playerDifficulty(difficulty){
		this.difficulty = difficulty.split("-")[0];
	}

	get playerDifficulty(){
		return this.difficulty;
	}

	showResults(){
		return `${this.name} : ${this.steps} : ${this.time} : ${this.difficulty}`;
	}
}