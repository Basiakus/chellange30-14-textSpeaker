const ssu = new SpeechSynthesisUtterance();
const rangesInput = document.querySelectorAll('input[type="range"]');
const speakersSelect = document.querySelector('select[name="speakers"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
let speakers = [];
console.log(rangesInput);
function getSpeakers() {
	speakers = this.getVoices();
	//console.log(speakers);
	speakersSelect.innerHTML += 
		speakers.map(speaker => {
			return `<option value="${speaker.name}">${speaker.name} ${speaker.lang}</option>`
		}).join('');
}
function setSpeakerName() {
	speechSynthesis.cancel();
	ssu.voice = speakers.find( speaker => {
		return speaker.name === this.value;
	})
}

function speak(speaking = true) {
	speechSynthesis.cancel();
	if(speaking) {
		ssu.text = (document.querySelector('textarea[name="text"]')).value;
		speechSynthesis.speak(ssu);
	}
}

function pitchAndRate(e) {
	ssu[this.name] = parseFloat(this.value);
	console.log(ssu.pitch, ssu.rate);
}
function dontSpeak() {
	speechSynthesis.cancel();
}

speechSynthesis.addEventListener('voiceschanged', getSpeakers);
speakersSelect.addEventListener('change', setSpeakerName);
speakButton.addEventListener('click', speak);
stopButton.addEventListener('click', dontSpeak);
rangesInput.forEach( input => {
	input.addEventListener('change', pitchAndRate);
})



