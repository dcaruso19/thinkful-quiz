$(document).ready(function () {
    $(".reset").click(function() {
    location.reload(true);
});
    
    $(".start").click(trivia);

    function trivia() {

        $(".scorebox").show();

        var scoreAry = [];
        var questions = [{
            q: "Who was the lead singer of the Doors?",
            s: ["Robert Plant", "Jim Morrison", "Jimi Hendrix", "Janis Joplin"],
            a: "Jim Morrison",
            correct: 0
        }, {
            q: "Who was the former drummer of the Beatles before Ringo Starr?",
            s: ["Pete Best", "Keith Moon", "John Bonham", "George Harrison"],
            a: "Pete Best",
            correct: 0
        }, {
            q: "According to Donovan in his hit song, what do 'they' call him?",
            s: ["The Best Ever", "Mellow Yellow", "Our Savior", "Donnie"],
            a: "Mellow Yellow",
            correct: 0
        }, {
            q: "Where is Jim Morrison buried?",
            s: ["London", "Paris", "Los Angeles", "Dallas"],
            a: "Paris",
            correct: 0
        }, {
            q: "What was controversial about the album cover of John Lennon & Yoko Ono’s 1968 album 'Two Virgins'?",
            s: ["They were holding guns", "They were naked", "They had their backs turned", "They were making obscene gestures"],
            a: "They were naked",
            correct: 0
        }, {
            q: "What country is Led Zeppelin from?",
            s: ["England", "Ireland", "Germany", "Australia"],
            a: "England",
            correct: 0
        }, {
            q: "In which city did bands Jefferson Airplane and The Grateful Dead originate from?",
            s: ["Los Angeles", "New York", "San Francisco", "Seattle"],
            a: "San Francisco",
            correct: 0
        }, {
            q: "Where was Billy Joel born?",
            s: ["Cold Spring Harbor", "The Bronx", "Manhattan", "Westchester"],
            a: "The Bronx",
            correct: 0
        }, {
            q: "Who was the lyricist of the Grateful Dead?",
            s: ["Bob Dylan", "Mickey Hart", "Robbie Krieger", "Robert Hunter"],
            a: "Robert Hunter",
            correct: 0
        }, {
            q: "Who did not die at age 27?",
            s: ["Jim Morrison", "Janis Joplin", "Jimi Hendrix", "John Bonham"],
            a: "John Bonham",
            correct: 0
        }];


       
        var counter = questions.length;

        //This grabs the question and answer data from the questions array and appends it to the #questions div:
        function createQuestion(questions) {
            for (var i = 0; i < questions.length; i++) {
                $(".start").hide();
                $("#questions").append('<form id="' + i + '" class="center-text"><p>Question ' + (i + 1) + ' of ' + questions.length + '</p><h3 class="question">' + questions[i].q + '</h3>' + radioButtons(questions[i].s, i) + '<button type="submit" class="next">SUBMIT &#8594;</button></p></form>');
            }
            //This hides all except the first question:
            for (var k = questions.length - 1; k > 0; k--) {
                $('#' + k).hide();
            }
        }
        //This grabs the answer choices from the questions array and returns them to createQuestion():
        function radioButtons(ary, qNum) {
            var answers = [];
            for (i = 0; i < ary.length; i++) {
                answers.push('<label><input type="radio" name="' + qNum + '" value="' + ary[i] + '">' + ary[i] + '</label>');
            }
            return answers.join(" ");
        }
        
        //This sums the correct values in the questions array:
        function sumScore(questions) {
            return scoreAry.reduce(function (previousValue, currentValue, index, array) {
                return previousValue + currentValue;
            });
        }
        

        var scoretotal = 0

        //logic that updates the score display
        function updateScore(){
            scoretotal = scoretotal + 100;
            $( "#scorebox" ).val(scoretotal);
            }             


            //will highlight in green correct answer
            function showCorrectAnswer(answer,userInput) { 

                if(answer==userInput){

                $("input[type='radio'][value='" + answer + "']").parent().css('color', '#00CE00');
            }
                else {

                $("input[type='radio'][value='" + answer + "']").parent().addClass("correct");
                $("input[type='radio'][value='" + userInput + "']").parent().addClass("incorrect");

            }

        }

        


        //This checks the user's answer and updates the score:
        function checkAnswer(answer, qNum, questions) {
            if (answer == questions[qNum].a) {
                questions[qNum].correct = 1;
                scoreAry.push(questions[qNum].correct);
                updateScore();
            

            } else {
                scoreAry.push(questions[qNum].correct);
                
            }

            var userInput = answer;

            showCorrectAnswer(questions[qNum].a, answer);


        }


        
        createQuestion(questions);


        function showSummary(userInput, qNum, questions) {

                checkAnswer(userInput, qNum, questions);
                $("#questions").find("form").remove();
                $("#questions").append('<h3 class="result"></h3>');
                $(".result").text('You answered ' + sumScore(questions) + ' questions correctly out of 10.');
                   for (j = 0; j < scoreAry.length; j++) {
                        if (scoreAry[j] === 0) {
                            console.log(questions[j].q, questions[j].a);
                            $("#questions").append('<p class="missed-' + j + '">You missed: ' + questions[j].q + ' ' + questions[j].a + '</p>');      
                        }
                    }
        }



        function showNextQuestion(qNum){
                $("#" + qNum).hide();
                $("#" + qNum).next().show();
                counter--;
        }



        
        $(".next").click(function (event) {
            event.preventDefault(); //This stops the form from submitting
            var qNum = $(this).closest("form").attr("id"); //This gives us the question number
            var userInput = $('input[name=' + qNum + ']:radio:checked').val(); //This grabs the user's selected answer
            if (counter > 1) {
                checkAnswer(userInput, qNum, questions);
                $(".next").attr('disabled',true);
                setTimeout(function(){
                    $(".correct").removeClass("correct");
                    $(".incorrect").removeClass("incorrect");
                    $(".next").removeAttr('disabled');
                    showNextQuestion(qNum);
                },3000);
            } else if (counter == 1) {
                 showSummary();
            } else {
                return false;
            }
        });
    }
});
