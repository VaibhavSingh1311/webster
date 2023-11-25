//quiz ques


const quizDB=[
    {
    question:"Q1:What is my name a?",
    a:"aryan",
    b:"adeeb",
    c:"vaibhav",
    d:"none",
    ans:"ans1"
},
{
    question:"Q2:What is your name b?",
    a:"aryan",
    b:"adeeb",
    c:"vaibhav",
    d:"none",
    ans:"ans2"
},
{
    question:"Q3:select ans name c?",
    a:"aryan",
    b:"adeeb",
    c:"vaibhav",
    d:"none",
    ans:"ans3"
},
{
    question:"Q4:whya re is my name d?",
    a:"aryan",
    b:"adeeb",
    c:"vaibhav",
    d:"none",
    ans:"ans4"
},

]

const question=document.querySelector('.question');
const option1=document.querySelector('#option1');
const option2=document.querySelector('#option2');
const option3=document.querySelector('#option3');
const option4=document.querySelector('#option4');
const answers=document.querySelectorAll('.answer');
const next=document.querySelector('#next');
const previous=document.querySelector('#prev');
const showScore=document.querySelector('#showScore');

const resultDisplay=document.querySelector('.resultDisplay');


let questionCount=0;
let score=0;
const loadQuestion=()=>{
   
    const quesList=quizDB[questionCount];
   question.innerText=quesList.question;

   option1.innerText=quesList.a;
   option2.innerText=quesList.b;
   option3.innerText=quesList.c;
   option4.innerText=quesList.d;
}

loadQuestion();

const getCheckAns=()=>{
    let answer;

    answers.forEach((currAnsElem) => {
        if(currAnsElem.checked){
            answer=currAnsElem.id;
        }
    
    });
    return answer;

}
const correctAnswers = []; // Array to store indices of correctly answered questions
const wrongAnswers = [];
const deselectALL=(curr) =>{
    answers.forEach((curr)=>curr.checked=false);
}
// function madefunct(){
//     const resultb=document.querySelector('#result');
//    resultb.style.display='block';
// }
function closeresult() {
    const resultDisplay = document.querySelector('.resultDisplay');
    resultDisplay.style.display = 'none';
    showScore.classList.remove('scoreArea');
}
function madefunct() {
    const resultDisplay = document.querySelector('.resultDisplay');
    resultDisplay.style.display = 'block';
    showScore.classList.add('scoreArea');

    let resultHTML = '<h2>Correct Answers:</h2><ul>';
    correctAnswers.forEach((index) => {
        resultHTML += `<li>${index}</li>`;
    });
    resultHTML += '</ul><h2>Wrong Answers:</h2><ul>';
    wrongAnswers.forEach((index) => {
        resultHTML += `<li>${index}</li>`;
    });
    resultHTML += '</ul>';

    resultDisplay.innerHTML = resultHTML;
    resultDisplay.innerHTML+=`
    <button class="btn3" onclick="closeresult()">Back</button>`;
}


next.addEventListener('click', () => {
    const checkAns = getCheckAns();
    if (checkAns === quizDB[questionCount].ans) {
        score++;
        correctAnswers.push(questionCount+1);
    } else {
        wrongAnswers.push(questionCount+1);
    }
    questionCount++;
    deselectALL();
    if (questionCount < quizDB.length) {
        loadQuestion();
    } else {
        showScore.innerHTML = `
            <h3>You scored ${score}/${quizDB.length} ✌️</h3>
            <div>
                
                <button class="btn2" onclick="madefunct()">Result</button>
            </div>`;
        showScore.classList.remove('scoreArea');
    }
});

prev.addEventListener('click', () => {
    const checkAns = getCheckAns();
    if (checkAns === quizDB[questionCount].ans) {
        score++;
    }else{
        score--;
    }
    questionCount--;
    deselectALL();
    if (questionCount >=0) {
        loadQuestion();
    } else{
        questionCount=0;
    }
});




const start_btn = document.querySelector('.inbutton');
//const inner = document.querySelector('.inner');
let timestart=quizDB.length * 5;
start_btn.onclick = () => {
    inner.classList.add('active_info');
    start_btn.style.opacity=0;
    startTimer(timestart-1);
};

const timeText = document.querySelector('.time_left_txt');
const timeCount = document.querySelector('.timer_sec');
const time_line = document.querySelector(".time_line");
timeCount.innerText=timestart;
let counter;

function startTimer(time) {
    counter = setInterval(timer, 1000);

    function timer() {
        timeCount.textContent = time;
        time--; 

        if (time < 10) {
            timeCount.textContent = "0" + time;
        }

        if (time < 0) {
            clearInterval(counter);
            timeText.textContent = "Time Off";

            // Add code to handle the time being off, such as submitting the quiz or showing results.
            // Example:
            showScore.innerHTML = `
                <h3>You scored ${score}/${quizDB.length} ✌️</h3>
                <div>
                    <button class="btn2" onclick="madefunct()">Result</button>
                </div>`;
            showScore.classList.remove('scoreArea');
        }
        if (questionCount >= quizDB.length) {
            clearInterval(counter); // Stop the timer
            return;
        }
    }
}

  //line
  function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width of time_line with px by time value
        if(time > 549){ //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}