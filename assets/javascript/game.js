        
        
        
        //  pick the word and return it
        var words = ["atka", "augustine", "baker", "carrizozo", "fisher", "hood"];
        var guessesLeft= 7;
            console.log("guesses left " + guessesLeft);
        var lettersInWord = [];
        // letters user guessed
        var triedLetters = [];

                    

        var pickWord = function () {

        return words[Math.floor(Math.random() * words.length)];

       };
        
        // underscorre_ _ _
      
       var setLettersInWord = function (word) {
           
                for (var i = 0; i < word.length; i++) {
                lettersInWord[i] = "_";
            }

            return lettersInWord;

          
       };

        // Show the progress
       var guessedLetters = function (lettersInWord) {
            alert(lettersInWord.join(" "));
                   
        };




        //  asking user to guess the letter
        var ChooseLetter = function () {
            return prompt("Guess the letter or press cancel to stop playing");
           
        };

        // upgrade after user answer
        var updateGame = function (guess, word, lettersInWord) {
           
            // update lettersInword
            // return guess into the word
            // how many letters left to guess , remainingLetters

            var lettersToGuess = 0;
            for (var j = 0; j < word.length; j++) {
                if (word[j] === guess) {
                lettersInWord[j] = guess;
                lettersToGuess++;
                } else {
                    guessesLeft--;
                }
            }

            return lettersToGuess;
    };
          
        //   if user win show the answer

        var win = function(lettersInWord) {
            guessedLetters(lettersInWord);
            console.log("Good game. It was word " + lettersInWord.join(""));
            
        };
        
        // function updateDisplay() {



        document.onkeyup = function(event) {
            var startGame = event.key;
            console.log("The Game is started  ");

      
            var word = pickWord();
            console.log(word);
         
            var lettersInWord = setLettersInWord(word);

            var remainingLetters = word.length;

         while (remainingLetters > 0 || guessesLeft === 0) {
            guessedLetters(lettersInWord);
            // guess: user answer
            var guess = ChooseLetter();
            console.log("this is guess letter " + guess)

            if (guess === null) {
                break;
            } else if (guess.length !== 1) {
                alert("Please choose 1 letter ");
            } else {
            // correctGuesses: количество открытых букв
                var correctGuesses = updateGame(guess, word, lettersInWord);
                remainingLetters -= correctGuesses;
            }
        }

        win(lettersInWord);

        }