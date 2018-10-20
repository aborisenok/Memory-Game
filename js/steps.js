class Steps{
	constructor(){
		this.stepsNumber = 0;
		this.stepsNode = document.querySelector(".steps");
	}

	addSteps(){
		this.stepsNumber++;
		this.updateSteps();
	}

	refreshSteps(){
		this.stepsNumber = 0;
		this.updateSteps();
	}

	
	getSteps(){
		return this.stepsNumber;
	}

	updateSteps(){
		this.stepsNode.innerHTML = `Steps: ${this.stepsNumber}`;
	}
}