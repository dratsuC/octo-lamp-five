/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

window.addEventListener('DOMContentLoaded', () => {
  let submitBool = false;
  const submitButton = document.querySelector('#btnSubmit')
  const resetButton = document.querySelector('#btnReset')  
  const start = document.querySelector('#start');
  start.addEventListener('click', function (e) {
    document.querySelector('#quizBlock').style.display = 'block';
    start.style.display = 'none';
    if(!submitBool) setTime();
  });
  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [
    {
      q: 'Which is the third planet from the sun?',
      o: ['Saturn', 'Earth', 'Pluto', 'Mars'],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: 'Which is the largest ocean on Earth?',
      o: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      a: 3,
    },
    {
      q: 'What is the capital of Australia',
      o: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
      a: 1,
    },
    {
      q: 'How many burger patties are in a big mac?',
      o: ['One', 'Two', 'Three', 'Four'],
      a: 1,
    },  
    {
      q: 'Who is the best instructor ever?',
      o: ['Albert Einstein', 'Confucius', 'Aristotle', 'Pankaj Alwani'],
      a: 3,
    },      

  ]; 
  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector('#quizWrap');
    let quizDisplay = '';
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   <h4 class='text-light'> Q - ${quizItem.q}</h4>
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };
  // console.log(quizArray)
  // Calculate the score

  //defining counters globally (sorry)
  // to share them between functions
  let answerCounter = 0;
  let score = 0;
  const calculateScore = () => {
    
    
    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        //highlight the li if it is the correct answer
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        // console.log(quizItem, index)
        liElement = document.querySelector('#' + li);
        radioElement = document.querySelector('#' + r);
        // console.log(radioElement)
        // defining necessary elements (
        // id of current radio, and 
        // id of its answer)
        let radioId = radioElement.id;
        let lastChar = radioId.substr(radioId.length - 1);        
        // start of task 1
        if (radioElement.checked) {
          // documenting presence of answer
          answerCounter++;

          // checking if current answer is correct
          if(lastChar == quizItem.a) {
            console.log('correct answer');
            score++
            radioElement.parentElement.classList.add('bg-success');
            console.log(radioElement)
          } else {
            radioElement.parentElement.classList.add('bg-danger');
            console.log(quizArray[index].a)
          }
          
        } else if (submitBool && (lastChar == quizItem.a)) {
            radioElement.parentElement.classList.add('bg-success');
          }
      } //end of loop
    }); //end of .map()
  }; // end of calculateScore
  // if answer counter equals 
  // total number of questions, 
  // display score
  const showScore = () => {
    const scoreSpan = document.querySelector('#score');
    if (answerCounter == quizArray.length) {
      console.log(`score: ${score}`)
      if (score < 3) {scoreSpan.innerHTML = 
        `Bad luck bud, your score was <strong>${score}</strong>.`}
      else {scoreSpan.innerHTML = 
        `Great work champ, your score was <strong>${score}</strong>`}

      // once sufficient answers are given, function finishes
      // submitButton.classList.add('disabled = "disabled"')

      return true;
    }      
  }  


  // controls the timer
  const setTime = () => {

    // Set the date we're counting down to
    var timerLimit = new Date().getTime() + 120000;

    // Update the count down every 1 second
    var x = setInterval(function() {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = timerLimit - now;

      // Time calculations for days, hours, minutes and seconds
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      document.getElementById("time").innerHTML = minutes + "m " + seconds + "s ";
      console.log(submitBool);
      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("time").innerHTML = "Time's Up Pal!";
      } else if (submitBool === true) {
        clearInterval(x);
        document.getElementById("time").innerHTML = "Nice one bud, just in time!";        
      }
    }, 1000);  

  } //end of checkTime

  // function reset()  {
  //   document.getElementById("time").innerHTML = "Just in time, guy!";
  //   // remove 'disabled' class from submit button
  // }
    


  // call the displayQuiz function
  displayQuiz();



  resetButton.addEventListener('click', () => {
    window.location.reload();
  })

  // submit button event listener
  submitButton.addEventListener('click', () => {
  // if submit button is clicked, make sure all
  // radios were picked
    submitBool = true;
    calculateScore();
    showScore();
    answerCounter = 0;
    // reset()
  })



}); //end of DOM listener
