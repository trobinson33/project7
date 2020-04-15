document.addEventListener('DOMContentLoaded', () =>  {

	const btnReset 			= document.querySelector('.btn__reset');
	const overlay 			= document.getElementById('overlay');
	const keyboard 			= document.getElementById('qwerty');
	const ul 						= document.querySelector("#phrase ul");
	const scoreboard 		= document.querySelector('#scoreboard ol');
	const title 				= document.querySelector('.title');
	const keys      		= document.querySelectorAll('button');
  const hearts 				= document.getElementsByClassName('tries');
	let missed 					= 0;

	const phrases = [
		"ring any bells",
		"quality time",
		"beating a dead horse",
		"a chip on your shoulder",
		"keep your eyes peeled"
	]

	btnReset.addEventListener('click', (event) => {
		overlay.style.display = "none";

		if(event.target.textContent == 'Reset Game' ){
			addPhraseToDisplay(getRandomPhraseArray(phrases));
			const show = document.querySelectorAll('.show');
			
			for(let i = 0; i < show.length; i += 1) {
				ul.removeChild(show[i]);
			}

			for(let i = 0; i < keys.length; i += 1) {
				keys[i].classList.remove("chosen");
				keys[i].disabled = false;
			}

			for(let i = 0; i < hearts.length; i += 1) {
        hearts[i].firstElementChild.src = 'images/liveHeart.png';
        hearts[i].firstElementChild.classList.remove('loseHeart');
    	}
			
			missed = 0; 
			
		}

	});

	function getRandomPhraseArray(arr){   
    randomPhrase = arr[Math.floor(Math.random() * arr.length)];
    return randomPhrase.split('');
	} 

	function addPhraseToDisplay(arr) {
		for(let i = 0; i < arr.length; i += 1) {
			
			const li 			= document.createElement('li');
			li.innerHTML 	= arr[i];

			ul.appendChild(li)
			
			if(/\S/.test(arr[i])) {
				li.classList.add("letter");
			}

		}
	}

	addPhraseToDisplay(getRandomPhraseArray(phrases)); 

	function checkLetter(pressedButton){
		letterFound = false;
    const letters = document.querySelectorAll('.letter');
    for (let i = 0; i < letters.length; i++) {
      if (letters[i].innerHTML.toLowerCase() === pressedButton) {
          letterFound = pressedButton;
          letters[i].classList.add("show");
      }
    }
	}

	keyboard.addEventListener('click', (event) =>  {
		if (event.target.tagName == 'BUTTON') {
      checkLetter(event.target.innerHTML);
      event.target.classList.add("chosen");
      event.target.disabled = true;

      if(!letterFound) {
        let lostLive = hearts[missed].firstElementChild;
        lostLive.setAttribute('src', 'images/lostHeart.png');
      	missed++;
      }

      checkWin();
  	}

	});

	function checkWin() {
		let lettersShow = document.querySelectorAll('.show');
		const letters = document.querySelectorAll('.letter');

		if(lettersShow.length == letters.length) {
			overlay.classList.add('win');
			overlay.style.display = "flex";
			title.innerHTML = 'You Win!';
			btnReset.textContent = 'Reset Game';
		}

		if(missed >= 5) {
			overlay.classList.add('lose');
			overlay.style.display = "flex";
			title.innerHTML = 'You Lose!';
			btnReset.textContent = 'Reset Game';
			
		}
	}



	
});