class Timer{
	constructor(){
		this.seconds = 0;
		this.minutes = 0;
		this.clock;
		this.timerNode = document.querySelector(".timer");
	}

	startTimer(){
		var that = this;
		this.clock = setInterval(function() {
			that.countTime();
  			that.updateTime(that.seconds, that.minutes);
		}, 1000);
	}

	cancelTimer(){
		this.stopTimer();
		this.refreshTimer();
	}

	stopTimer(){
		clearInterval(this.clock);
	}

	refreshTimer(){
		this.seconds = 0;
		this.minutes = 0;
		this.updateTime(this.seconds, this.minutes)
	}

	countTime(){
		if(this.seconds < 59){
			this.seconds++;
		}else{
			this.seconds = 0;
			this.minutes++;
		}
	}

	getTime(){
		var time = "";
		if (this.minutes > 0) {
			time += `${this.minutes} m`;
		}
		time += `${this.seconds} s`;
		return time;
	}

	updateTime(seconds, minutes){
		if(seconds < 10){
			seconds = `0${seconds}`;
		} 
		if (minutes < 10){
			minutes = `0${minutes}`;
		}
		this.timerNode.innerHTML = `Time: ${minutes}:${seconds}`;
	}
}