$(function() {
  //Words array
  var gameWrds = ["Allegation", "Idiosyncritic", "Magnanimous" , "Perfunctory", "Paradox", "Tiresome", "Inadequate", "Jargon", "Appraised", "Reprehensible", "Outrageous", "Atrocious", "Scandalous", "Virtuous", "Dazzling", "Unimpeachable","Unassailed", "Insusceptible", "Vulnerable", "Unparagoned", "Conspicuous", "Perfidiousness", "Aggression", "Hypothesis", "Exasperation", "Reincarnation", "Unpredictable", "Parameter", "Mediocre", "Frivolous", "Hippopotamus", "Comprehensive", "Blasphemy", "Psychological", "Sesquipedalian", "Genocide", "Harmony", "Exaggeration", "Jabot", "Circumvallate", "Effulgent", "Ineffable", "Fulguration", "Greensward", "Horripilation", "Lachrymal", "Empyrean", "Crapulent", "Coruscate", "Evanescent", "Fuliginous", "Hymeneal", "Perficious", "Plangent", "Prothalamium", "Suserration", "Temerarious", "Viridescent", "Zephyr", "Hypocrite", "Palaeontology", "Lizard", "Waterfront", "Dysfunctional"];
  //declaring global variables
  var displayWord = random();
  var currentScore = 0;
  var seconds = 140;
  var player = true;
  var time = countdown();

  function countdown() {
    currentScore = 0;
    //setting time interval for gameplay
    var timer = setInterval(function(){
      //counting down
      seconds--;
      $(".time").html(seconds);
      if (seconds === 80) {
        // Player1's turn
        if (player = true) {
        //once timer reached 80, announce
        $(".announce").html("Player1, Your score is " + currentScore);
        //Store Player1's score in localStorage
        localStorage.setItem("score1", currentScore);
        var storedScore = localStorage.getItem("score1");
        //Display score for Player2 to see
        $("#result").html(storedScore);
        $(".score").html("0");
        $(".words").html("");
      }
    }
      if (seconds === 75) {
        //Let Player2 know it's their turn
        $(".announce").html("It's Player2's turn!");
      }
      if (seconds === 70) {
        //Clear string
        $(".announce").html("");
        //Reset score for Player2
        currentScore = 0;
        $(".words").html(displayWord);
        $(".words").html(displayWord.toUpperCase());
        $(".words").html(formatWord());
        //Reset current letter counts
        currentLetterId = 0;
      }
      if (seconds === 10) {
        $(".words").html("");
        $(".announce").html("Player2, Your score is " + currentScore);
        //Store Player2's score in storage
        localStorage.setItem("score2", currentScore);
        var storedScore1 = localStorage.getItem("score2");
        console.log(storedScore1);
      }
      if (seconds === 5) {
        //Get storedScore
        //If score2 is higher than score1, announce Player2 as winner
        if (localStorage.getItem("score2") > localStorage.getItem("score1")) {
          $(".words").html("");
          $(".announce").html("Player2 is the winner!");
        }
        //If score1 is higher than score2, announce Player1 as winner
        if (localStorage.getItem("score1")> localStorage.getItem("score2")) {
          $(".announce").html("Player1 is the winner!");
        }
        if (localStorage.getItem("score2") == localStorage.getItem("score1")) {
          $(".announce").html("It's a draw!");
        }
      }
      //Clear countdown
      if (seconds === 0) {
        clearInterval(timer);
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
});
