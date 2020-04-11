document.addEventListener('DOMContentLoaded', () =>  {

	const btnReset 					= document.querySelector('.btn__reset');
	const overlay 					= document.getElementById('overlay');
	const keyboard 					= document.getElementById('qwerty');
	const phrase 						= document.getElementById('phrase');
	const scoreboard 				= document.querySelector('#scoreboard ol');
	const title 						= document.querySelector('.title');
	let missed 							= 0;

	const phrases = [
		"covid is the worst",
		"is this working",
		"the wheel of success",
		"right off the bat",
		"long in the tooth"
	]

	btnReset.addEventListener('click', (event) => {
		overlay.style.display = "none";


	});

	function getRandomPhraseArray(arr){   
    randomPhrase = arr[Math.floor(Math.random() * arr.length)];
    return randomPhrase.split('');
	} 

	function addPhraseToDisplay(arr) {
		for(let i = 0; i < arr.length; i += 1) {
			const ul 			= document.querySelector("#phrase ul");
			const li 			= document.createElement('li');
			li.innerHTML 	= arr[i];

			ul.appendChild(li)
			
			if(/\S/.test(arr[i])) {
				li.classList.add("letter");
			}

		}
	}

	const phraseArray = getRandomPhraseArray(phrases);
	addPhraseToDisplay(phraseArray); 

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
      	scoreboard.removeChild(scoreboard.lastElementChild);
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
			
		}

		if(missed >= 5) {
			overlay.classList.add('lose');
			overlay.style.display = "flex";
			title.innerHTML = 'You Lose!';
			
		}
	}



	
});