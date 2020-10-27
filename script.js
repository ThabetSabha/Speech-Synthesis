const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');


msg.text = document.querySelector('[name="text"]').value; //assigning the text area value to msg;


function populateVoices() {
voices = this.getVoices();
voicesDropdown.innerHTML = voices
.filter(voice => voice.lang.includes('en')) //only English voices
.map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
.join('');
}


function setVoices() //which voice we wanna listen to;
{
msg.voice = voices.find(voice => voice.name === this.value)
}




function toggle(startOver = true) //to start over or stop;
{
speechSynthesis.cancel();
if (startOver) {
speechSynthesis.speak(msg)
}
}


function msgOptions() {
msg[this.name] = this.value;
toggle();
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoices);
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));
options.forEach(option => option.addEventListener('change', msgOptions));