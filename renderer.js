const { ipcRenderer } = require('electron');

document.getElementById('minimize-button').addEventListener('click', function (e) {
    ipcRenderer.send('window-control', 'minimize');
});

document.getElementById('maximize-button').addEventListener('click', function (e) {
    ipcRenderer.send('window-control', 'maximize');
});

document.getElementById('close-button').addEventListener('click', function (e) {
    ipcRenderer.send('window-control', 'close');
}); 

var text = 'In the flood of darkness, hope is the light. It brings comfort, faith, and confidence. It gives us guidance when we are lost, and gives support when we are afraid. And the moment we give up hope, we give up our lives. The world we live in is disintegrating into a place of malice and hatred, where we need hope and find it harder. In this world of fear, hope to find better, but easier said than done, the more meaningful life of faith will make life meaningful.'; // This is the text for the typing test
var wordsArray = text.trim().split(/\s+/);
var wordCount = wordsArray.length;
var correctWords = 0;
var totalWords = wordCount;
var timerStarted = false; // Whether the timer has started
var timer = document.getElementById('timer');
var startTime;

let inputText = document.getElementById('inputText');

inputText.addEventListener('input', autoResize, false);

function autoResize() {
    this.style.height = 'auto';
    if (this.scrollHeight > 200) { // If the height of the content exceeds the maximum height
        this.style.overflowY = 'auto'; // Show Scroll Bar
    } else {
        this.style.height = this.scrollHeight + 'px'; // Otherwise, adjust the height of the input box to fit the content
    }
}

function startTimer() {
    startTime = Date.now();
    timer.textContent = '00:00';
    timer.interval = setInterval(function () {
        var elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        var minutes = Math.floor(elapsedSeconds / 60);
        var seconds = elapsedSeconds % 60;
        timer.textContent = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
    }, 1000);
}

function updateTypingSpeed() {
    var elapsedMinutes = (Date.now() - startTime) / 60000;
    var typingSpeed = Math.round(correctWords / elapsedMinutes);
    document.getElementById('typing-speed').textContent = typingSpeed;
}

function stopTimer() {
    clearInterval(timer.interval);
}

function checkInput() {
    var inputText = document.getElementById('inputText').value;
    var textDisplay = document.getElementById('textDisplay');
    correctWords = 0; // Reset the number of correctly entered words on each entry

    var inputWords = inputText.trim().split(/\s+/);

    // Each time you enter, restore the color and background color of all text
    for (var i = 0; i < textDisplay.children.length; i++) {
        textDisplay.children[i].style.color = '';
        textDisplay.children[i].style.backgroundColor = '';
    }

    for (var i = 0; i < inputText.length; i++) {
        if (inputText[i] === text[i]) {
            textDisplay.children[i].style.color = 'green';
            if (text[i] === ' ' || text[i] === '.' || text[i] === ',') {
                correctWords++;
                textDisplay.children[i].style.backgroundColor = '';
            }
        } else {
            textDisplay.children[i].style.color = 'red';
            if (text[i] === ' ' || text[i] === '.' || text[i] === ',') {
                textDisplay.children[i].style.backgroundColor = 'red';
            }
        }
    }
    document.getElementById('accuracy').textContent = (correctWords / totalWords * 100).toFixed(2) + '%'; // Update accuracy

    // If the user enters the first character, start timing
    if (!timerStarted && inputText.length > 0) {
        timerStarted = true;
        startTimer();
    }

    // If the accuracy reaches 100%, stop timing
    if (correctWords / totalWords === 1) {
        stopTimer();
    }

    // Update typing speed
    updateTypingSpeed();
}


document.getElementById('textDisplay').innerHTML = text.split('').map(c => '<span>' + c + '</span>').join(''); 

setInterval(updateTypingSpeed, 1000);

document.addEventListener("DOMContentLoaded", function() {

    const aboutLink = document.querySelector("#about-button");
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modal-content");


    aboutLink.addEventListener("click", function(event) {
        event.preventDefault(); 
        showAboutModal(); 
    });

    function showAboutModal() {

        modalContent.innerHTML = `
            <h2>Typewriter</h2>
            <p>Welcome to Typewriter!</p>
            <p>A simple typing practice application.</p>
            <p>Copyright © 2023 Typewriter.</p>
            <div id="modal-close-button" title="关闭"></div>
        `;
        // <div><a href="https://github.com/yanyaoli" target="_blank">yanyao</a></div>

        modal.style.display = "block";

        const modalCloseButton = document.getElementById("modal-close-button");
        if (modalCloseButton) {
            modalCloseButton.addEventListener("click", function() {
                modal.style.display = "none";
            });
        }
    }

    document.addEventListener("click", function(event) {
        if (event.target === modal || event.target === modalContent) {
            modal.style.display = "none";
        }
    });    
});
