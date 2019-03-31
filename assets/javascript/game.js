        
    
        
        //  array of words
        var words = ["atka", "augustine", "baker", "carrizozo", "fisher", "hood"];
        // max tries user have
        var maxTries = 10;    
        // storing the letters user have
        var guessedLetters = [];
        // storing index of our selected word    
        var IndexOfOurWord = [];        
        // word we need to build
        var guessingWord = [];
        // how many tries user have
        var remainingGuesses = 0; 

        var gameStarted = false;   
        var hasFinished = false;            
        var wins = 0;    


        // How will we reset the game at the end ? function for reset

        function resetGame() {
            remainingGuesses = maxTries;
            gameStarted = false;

            IndexOfOurWord = Math.floor(Math.random() * (words.length));

            guessedLetters = [];
            guessingWord = [];


            // how to build a guessingWord? with a loop
            for (var i = 0; i < words[IndexOfOurWord].length; i++) {
                guessingWord.push("_");
            }

                       
            updateDisplay();
        };

        //  update display, so it is showing user progress on a screen
        function updateDisplay () {
            document.getElementById("directions").innerText="";
            
            document.getElementById("guessing-word").innerText = "";

            for (var i = 0; i < guessingWord.length; i++) {
                document.getElementById("guessing-word").innerText += guessingWord[i];
            }

            document.getElementById("remaining-guesses").innerText = "You have " + remainingGuesses + " tries";
            document.getElementById("userLetters").innerText = "You tried " + guessedLetters;

            if(remainingGuesses <= 0) {
                hasFinished = true;
            }

        };
            
        document.onkeydown = function(event) {
            // If we finished a game, so hasFinished === true, than we need to restart the game. And if we are playing, 
            // we need to check if letter pressed. 

            if(hasFinished) {
                resetGame();
                hasFinished = false;
            } else {
            // Check to make sure a-z was pressed.+ toLowerCase, so it match with our array
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
                win();
        };


        function evaluateGuess(letter) {
        // We need an array to store position of guessed letter in a string
            var positions = [];
            
        // Loop through word finding all instances of guessed letter.
            for (var i = 0; i < words[IndexOfOurWord].length; i++) {
                    if(words[IndexOfOurWord][i] === letter) {
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
        };
            
           
        // and what will happened if user win
        function win() {
            if(guessingWord.indexOf("_") === -1) {
                wins++;
                hasFinished = true;
                }
        };
            
   