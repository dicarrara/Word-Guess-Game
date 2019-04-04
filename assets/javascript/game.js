        
           
        //  array of words
        var words = ["chicago bulls", "new york knicks", "boston celtics", "golden state warriors", "denver nuggets"];
        // max tries user have
        var maxTries = 10;    
        // storing the letters user have
        var guessedLetters = [];
        // storing selected work in global, so any function can have access   
        var word = [];        
        // word we need to build
        var guessingWord = [];
        // how many tries user have
        var remainingGuesses = 0; 
        // flags for our if else statements
        var gameStarted = false;   
        var hasFinished = false;
        // storing our wins and looses
        var wins = 0;  
        var looses = 0;  


        // Function for reset the game

        function resetGame() {
            remainingGuesses = maxTries;
            gameStarted = false;

            word = words[Math.floor(Math.random() * words.length)];
            console.log("the word is " + word)


            guessedLetters = [];
            guessingWord = [];


            // how to build a guessingWord? using a loop and show it on a screen as "_"
            for (var i = 0; i < word.length; i++) {
                guessingWord.push("_");
            }
                       
            updateDisplay();
        };

        //  update display, so it is showing user progress on a screen.
        function updateDisplay () {

            document.getElementById("directions").innerText="";
            document.getElementById("guessing-word").innerText = "";
            document.getElementById("wins").innerText = "You won " + wins;
            document.getElementById("looses").innerText = "You lose " + looses;

            for (var i = 0; i < guessingWord.length; i++) {
                document.getElementById("guessing-word").innerText += guessingWord[i];
            }

            document.getElementById("remaining-guesses").innerText = "You have " + remainingGuesses + " tries";
            document.getElementById("userLetters").innerText = "You tried " + guessedLetters;

            if(remainingGuesses <= 0) {
                hasFinished = true;
            }

        };


            
        document.onkeyup = function(event) {
            // If we finished a game, so hasFinished === true, than we need to restart the game.
            // we need to check if letter pressed. 
            if(hasFinished) {
                resetGame();
                hasFinished = false;
            } else {
            // How do we know that letter pressed? 
            // Check to make sure a-z was pressed - using keyCode event + toLowerCase
                if(event.keyCode >= 65 && event.keyCode <= 90) {
                makeGuess(event.key.toLowerCase());
                }
            }
        };


        function makeGuess(letter) {
            if (remainingGuesses > 0) {
                if (!gameStarted) {
                    gameStarted = true;
                }            
                // Make sure we didn't use this letter yet
                if (guessedLetters.indexOf(letter) === -1) {
                    guessedLetters.push(letter);
                    evaluateGuess(letter);
                }
            }
                
            updateDisplay();
                
        };

        // How to show correct letter in our guessing word?
        function evaluateGuess(letter) {
        // We need an array to store position of guessed letter in a string
            var positions = [];
            
        // Loop through our word finding position for guessing.
            for (var i = 0; i < word.length; i++) {
                    if(word[i] === letter) {
                        positions.push(i);
                    }
            }
            
        // if letter wrong, remove remaining guesses
            if (positions.length <= 0) {
                remainingGuesses--;
                    
            } else {
            // Loop through and replace the '_' with a letter.
                for(var i = 0; i < positions.length; i++) {
                    guessingWord[positions[i]] = letter;
                }
            }
            checkWin();
        };
            
           
        // and what will happened if user checkWin. We are checkin gif there is no "_" in our word, if not htan WIN++
        function checkWin() { 
            if(guessingWord.indexOf("_") === -1) {
                alert("Good job! The word was " + word + " Press any key to play again");
                wins++;
                hasFinished = true;
            } else if (remainingGuesses === 0) {
                alert("The word was " + word + " Press any key to try one more time ");
                looses++;
            }

        };
            
   