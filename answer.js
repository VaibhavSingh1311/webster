
/*const answerInput = document.getElementById('my-text');
const charLimit = 100;

answerInput.addEventListener('input', function () {
    const currentText = answerInput.value;

    answerInput.style.height = 'auto';
    answerInput.style.height = (answerInput.scrollHeight) + 'px';
    if (currentText.length > charLimit) {
        answerInput.value = currentText.substring(0, charLimit);
    }
});*/



const mytext = document.getElementById("my-text");
const result = document.getElementById("result");

const limit  = 100;
result.textContent = 0 + "/" + 100;

mytext.addEventListener("input",function(){
    const length = mytext.value.length;
    result.textContent = length + "/" + limit;

    if(length>limit){
        mytext.style.borderColor = "#ff2851";
        result.style.color = "#ff2851";
    }
    else{
        mytext.style.borderColor = "#b2b2b2";
        result.style.color = "#b2b2b2";
    }
})