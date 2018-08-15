$(function() {
  //Words array
  var gameWrds = ["Allegation", "Idiosyncritic", "Magnanimous" , "Perfunctory", "Paradox", "Tiresome", "Inadequate", "Jargon", "Appraised", "Reprehensible", "Outrageous", "Atrocious", "Scandalous", "Virtuous", "Dazzling", "Unimpeachable","Unassailed", "Insusceptible", "Vulnerable", "Unparagoned", "Conspicuous", "Perfidiousness", "Aggression", "Hypothesis", "Exasperation", "Reincarnation", "Unpredictable", "Parameter", "Mediocre", "Frivolous", "Hippopotamus", "Comprehensive", "Blasphemy", "Psychological", "Sesquipedalian", "Genocide", "Harmony", "Exaggeration", "Jabot", "Circumvallate", "Effulgent", "Ineffable", "Fulguration", "Greensward", "Horripilation", "Lachrymal", "Empyrean", "Crapulent", "Coruscate", "Evanescent", "Fuliginous", "Hymeneal", "Perficious", "Plangent", "Prothalamium", "Suserration", "Temerarious", "Viridescent", "Zephyr", "Hypocrite"];
  //declaring global variables
  var displayWord = random();
  var currentScore = 0;
  var seconds = 60;
  var spark = new
  //countdown function is declared
  //Game will run when the the countdown starts
  function countdown() {
    currentScore = 0;
    //setting time interval for gameplay
    var timer = setInterval(function(){
    //counting down
      seconds--;
      $(".time").html(seconds);
      if (seconds === 0) {
        //once timer reached 0, send alert
        $(".announce").html("Game over! Your score is " + currentScore);
        // leaderBoard();
        localStorage.setItem("score", currentScore);
        var storedScore = localStorage.getItem("score");
        $("#result").html(storedScore);
        $(".score").html("0");
        $(".words").html("");
        clearInterval(timer);
        seconds = 60;
        $(".time").html("60");
        playGame();
      }
    }, 1000);

  }

  //Generate random words from array
  function random() {
    $(".words").html("");
    var index = Math.floor(Math.random() * gameWrds.length - 1 );
    var word = gameWrds[index];
    for (var i = 0; i < word.length; i++) {
      return word;
    }
  }
  $(".words").html(displayWord);

  //Split words down into letters
  function getArray(word){
    myLetterArray = word.split("");
    return myLetterArray;
  }

  //Format letters individually
  function formatWord() {
    var theLetters = getArray(displayWord);
    var formattedWord="";
    for (var i = 0; i < theLetters.length; i++) {
      formattedWord += "<span id='letter"+i+"'>"+theLetters[i].toUpperCase()+"</span>";
    }
  //Append span of each letters with unique id
  return formattedWord;
  }

  $(".words").html(formatWord());
  var currentLetterId = 0;


  //Getting keyboard to give inputs
  $(document).keydown(function(e){
    //Getting letter from the appended spans
    var currentLetter = $("#letter" + currentLetterId);
    currentLetter.addClass("bg");
    var keyinput;
    //Making it possible to play the game on other internet browsers
    if(window.event) {
      //Getting keydown through IE
      keyinput = e.keyCode;
    } else if(e.which){
      //Getting keydown through Netscape/Firefox/Opera
      keyinput = e.which;
    }
    //If input letters are the same as letters from array
    if(String.fromCharCode(keyinput) == currentLetter.html()){
      //Increment currentScore
      currentScore++;
      $(".score").html(currentScore);
      currentLetterId++;
    } else {
      currentLetter.removeClass("bg");
    }
    //Once all letters are typedup correctly, reset and display new word
    if (currentLetterId==displayWord.length ) {
      displayWord = random(); //Getting new word
      $(".words").html(displayWord.toUpperCase());
      $(".words").html(formatWord());
      //Reset current letter counts
      currentLetterId = 0;
    }
  });

  // function playGame() {
  //   countdown();
  //   random();
  //   $(".words").html(displayWord);
  //   getArray(word);
  //   formatWord();
  //   $(".words").html(formatWord());
  //   var currentLetterId = 0;
  // }



});
