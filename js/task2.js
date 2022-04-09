// Loader
var loader = document.getElementById("preloader");
window.addEventListener("load", function () {
    loader.style.display = "none";
});

// Sounds
function playCorrectSound() {
    // alert('working');
    var correctSound = document.getElementById("correctSound")
    correctSound.play();
};

function playWrongSound() {
    var wrongSound = document.getElementById("wrongSound")
    wrongSound.play();
};

// Task 1
var correctIcon11 = document.getElementById("correctIcon11");
var wrongIcon11 = document.getElementById("wrongIcon11");
var correctAnswer11 = document.getElementById("correctAnswer11");
var wrongAnswer11 = document.getElementById("wrongAnswer11");

var correctIcon12 = document.getElementById("correctIcon12");
var wrongIcon12 = document.getElementById("wrongIcon12");
var correctAnswer12 = document.getElementById("correctAnswer12");
var wrongAnswer12 = document.getElementById("wrongAnswer12");

// Task 2
var correctIcon21 = document.getElementById("correctIcon21");
var wrongIcon21 = document.getElementById("wrongIcon21");
var correctAnswer21 = document.getElementById("correctAnswer21");
var wrongAnswer21 = document.getElementById("wrongAnswer21");

var correctIcon22 = document.getElementById("correctIcon22");
var wrongIcon22 = document.getElementById("wrongIcon22");
var correctAnswer22 = document.getElementById("correctAnswer22");
var wrongAnswer22 = document.getElementById("wrongAnswer22");

var eyeIcon = document.getElementById("eyeIcon");

// Correct and Wrong Answers
function enableEyeIcon(){
    eyeIcon.style.opacity = "1";
    eyeIcon.style.cursor = "pointer";
    eyeIcon.style.pointerEvents = "all";
};

function disableEyeIcon(){
    eyeIcon.style.opacity = "0.6";
    eyeIcon.style.cursor = "default";
    eyeIcon.style.pointerEvents = "none";
};

function correctAction(correctAnswerId, correctIconId, wrongAnswerId, otherQuestionCorrectIconID){
    // playCorrectSound();
    correctIconId.style.display = "inline";
    correctAnswerId.style.cursor = "default";
    correctAnswerId.style.pointerEvents = "none";

    wrongAnswerId.style.cursor = "default";
    wrongAnswerId.style.pointerEvents = "none";
    wrongAnswerId.style.opacity = "0.5";

    if(otherQuestionCorrectIconID.style.display == "inline"){
        disableEyeIcon();
    };
};

function wrongAction(wrongIconId){
    // playWrongSound();
    wrongIconId.style.display = "inline";
    setTimeout(hideWrongIcon, 1000);
    function hideWrongIcon(){
        wrongIconId.style.display = "none";
    };
};


/** this function validates user answer
 *  takes question number and user answer
 *  returns true if correct answer
 *  and false otherwise
 */
// mapping from question number => answer
const modelAnswers = new Map();
modelAnswers.set(1, "this");
modelAnswers.set(2, "It's");
modelAnswers.set(3, "those");
modelAnswers.set(4, "They're");

function validateAnswer(questionIndex, userAnswer) {

    if(modelAnswers.get(questionIndex) == userAnswer){
        playCorrectSound();
        // right answer
        switch(questionIndex) {
            case 1:
                // styles for task 1 question 1
                correctAction(correctAnswer11, correctIcon11, wrongAnswer11, correctIcon12);
                break;
            case 2:
                // styles for task 1 question 2
                correctAction(correctAnswer12, correctIcon12, wrongAnswer12, correctIcon11);
                break;
            case 3:
                // styles for task 2 question 1
                correctAction(correctAnswer21, correctIcon21, wrongAnswer21, correctIcon22);
                break;
            case 4:
                // styles for task 2 question 2
                correctAction(correctAnswer22, correctIcon22, wrongAnswer22, correctIcon21);
                break;
            default:
                // code block
        }
        return true;
    }
    // wrong answer
    playWrongSound();
    switch(questionIndex) {
        case 1:
            // styles for task 1 question 1
            wrongAction(wrongIcon11);
            break;
        case 2:
            // styles for task 1 question 2
            wrongAction(wrongIcon12);
            break;
        case 3:
            // styles for task 2 question 1
            wrongAction(wrongIcon21);

            break;
        case 4:
            // styles for task 2 question 2
            wrongAction(wrongIcon22);

            break;
        default:
            // code block
    }
};


// Show correct answers
function showCorrectAnswers(){
    disableEyeIcon();
    switch(currentIndex) {
        case 1:
            // styles for task 1
            correctAction(correctAnswer11, correctIcon11, wrongAnswer11, correctIcon12);
            correctAction(correctAnswer12, correctIcon12, wrongAnswer12, correctIcon11);
            break;
        case 2:
            // styles for task 2
            correctAction(correctAnswer21, correctIcon21, wrongAnswer21, correctIcon22);
            correctAction(correctAnswer22, correctIcon22, wrongAnswer22, correctIcon21);
            break;
        default:
            // code block
    }
};


// Reload
function reloadAction(correctAnswerId, correctIconId, wrongAnswerId){
    correctIconId.style.display = "none";
    correctAnswerId.style.cursor = "pointer";
    correctAnswerId.style.pointerEvents = "all";

    wrongAnswerId.style.cursor = "pointer";
    wrongAnswerId.style.pointerEvents = "all";
    wrongAnswerId.style.opacity = "1";
};

var reloadBtn = document.getElementById("reload");
function reload(){
    enableEyeIcon();
    switch(currentIndex) {
        case 1:
            // styles for task 1
            reloadAction(correctAnswer11, correctIcon11, wrongAnswer11);
            reloadAction(correctAnswer12, correctIcon12, wrongAnswer12);
            break;
        case 2:
            // styles for task 2
            reloadAction(correctAnswer21, correctIcon21, wrongAnswer21);
            reloadAction(correctAnswer22, correctIcon22, wrongAnswer22);
            break;
        default:
            // code block
    }
};


// Replay
$('#replay').click(function () {
    $('.carousel').carousel(0);
    disablePrevBtn();
    enableNextBtn();
    reloadAction(correctAnswer11, correctIcon11, wrongAnswer11);
    reloadAction(correctAnswer12, correctIcon12, wrongAnswer12);
    reloadAction(correctAnswer21, correctIcon21, wrongAnswer21);
    reloadAction(correctAnswer22, correctIcon22, wrongAnswer22);
});


// Check Eye Icon (Show correct answers)
function checkEyeIcon(correctIconID, otherQuestionCorrectIconID){
    if(correctIconID.style.display == "inline" && otherQuestionCorrectIconID.style.display == "inline"){
        disableEyeIcon();
    }
    else {enableEyeIcon();}
};

function checkShowCorrectAnswers(){
    switch(currentIndex) {
        case 1:
            // styles for task 1
            checkEyeIcon(correctIcon11, correctIcon12);
            break;
        case 2:
            // styles for task 2
            checkEyeIcon(correctIcon21, correctIcon22);
            break;
        default:
            // code block
    }
};


// Carousel prev & next
var totalItems = $('.carousel-item').length;
var currentIndex = $('div.active').index() + 1;
$('.pageNumber').html(currentIndex + ' of ' + totalItems);

$('#carousel').on('slid.bs.carousel', function() {
    currentIndex = $('div.active').index() + 1;
    $('.pageNumber').html(currentIndex + ' of ' + totalItems);
});

var prevBtn = document.getElementById("prevBtn");
var nextBtn = document.getElementById("nextBtn");

function disablePrevBtn(){
    prevBtn.style.opacity = "0.5";
    prevBtn.style.cursor = "default";
    prevBtn.style.pointerEvents = "none";
};
function enablePrevBtn(){
    prevBtn.style.opacity = "1";
    prevBtn.style.cursor = "pointer";
    prevBtn.style.pointerEvents = "all";
};
function disableNextBtn(){
    nextBtn.style.opacity = "0.5";
    nextBtn.style.cursor = "default";
    nextBtn.style.pointerEvents = "none";
};
function enableNextBtn(){
    nextBtn.style.opacity = "1";
    nextBtn.style.cursor = "pointer";
    nextBtn.style.pointerEvents = "all";
};

if(currentIndex == 1){
    disablePrevBtn();
    enableNextBtn();
};

$('#prevBtn').click(function () {
    currentIndex = currentIndex-1;
    if(currentIndex == 0){
        currentIndex = totalItems;
    }

    if(currentIndex == 1){
        disablePrevBtn();
        enableNextBtn();
    }
    else if(currentIndex == totalItems){
        disableNextBtn();
        enablePrevBtn();
    }
    else{
        enablePrevBtn();
        enableNextBtn();
    };

    checkShowCorrectAnswers();
});

$('#nextBtn').click(function () {
    currentIndex = currentIndex+1;
    if(currentIndex > totalItems){
        currentIndex = 1;
    }

    if(currentIndex == totalItems){
        disableNextBtn();
        enablePrevBtn();
    }
    else if(currentIndex == 1){
        disablePrevBtn();
        enableNextBtn();
    }
    else{
        enablePrevBtn();
        enableNextBtn();
    };

    checkShowCorrectAnswers();
});
  
// Blur
var blur = document.getElementsByClassName("blur");
var dummyImageDiv = document.getElementById("dummyImageDiv");
var helpContentDiv = document.getElementById("helpContentDiv");

function blurringEffect(){
    carousel.style.display = "none";
    blur[0].style.opacity = "0.2";
    blur[0].style.pointerEvents = "none";
    blur[1].style.opacity = "0.2";
    blur[1].style.pointerEvents = "none";
};
function removeBlurringEffect(){
    carousel.style.display = "block";
    blur[0].style.opacity = "1";
    blur[1].style.opacity = "1";
    blur[0].style.pointerEvents = "all";
    blur[1].style.pointerEvents = "all";
}

function showDummyImage(){
    blurringEffect();
    dummyImageDiv.style.display = "block";
};
function hideDummyImage(){
    removeBlurringEffect();
    dummyImageDiv.style.display = "none";
};

function showHelpContent(){
    blurringEffect();
    helpContentDiv.style.display = "block";
};
function hideHelpContent(){
    removeBlurringEffect();
    helpContentDiv.style.display = "none";
};