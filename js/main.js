$(function() {
  // Words array
  var gameWrds = ["Allegation", "Idiosyncritic", "Magnanimous" , "Perfunctory", "Paradox", "Tiresome", "Inadequate", "Jargon", "Appraised", "Reprehensible", "Outrageous", "Atrocious", "Scandalous", "Virtuous", "Dazzling", "Unimpeachable","Unassailed", "Insusceptible", "Vulnerable", "Unparagoned", "Conspicuous", "Perfidiousness", "Aggression", "Hypothesis", "Exasperation", "Reincarnation", "Unpredictable", "Parameter", "Mediocre", "Frivolous", "Hippopotamus", "Comprehensive", "Blasphemy", "Psychological", "Sesquipedalian", "Genocide", "Harmony", "Exaggeration", "Jabot", "Circumvallate", "Effulgent", "Ineffable", "Fulguration", "Greensward", "Horripilation", "Lachrymal", "Empyrean", "Crapulent", "Coruscate", "Evanescent", "Fuliginous", "Hymeneal", "Perficious", "Plangent", "Prothalamium", "Suserration", "Temerarious", "Viridescent", "Zephyr", "Hypocrite", "Palaeontology", "Lizard", "Waterfront", "Dysfunctional", "Tautology", "Knowledgeable", "Solemnly", "Sincerity", "Mathematical", "Complication", "Sophisticated", "Elaborate", "Labyrinth", "Enigmatic", "Perplexing", "Impenetrable", "Undecipherable", "Unfathomable", "Explicable", "Convoluted", "Delusional", "Patriarchy", "Ambiguous", "Cabalistic", "Mystifying", "Profound", "Pondering", "Bewilder", "Abysmal", "Illimitable", "Illusion", "Imagination", "Uninterupted", "Immemorial", "Indestructible", "Imperishable", "Unconventional", "Civilisation", "Flux", "Fluidity", "Irregularity", "Integrity", "Honourable", "Unification", "Amalgamation", "Concoction", "Fabrication", "Falsification", "Manipulation", "Unscrupulous", "Exploitative", "Untrustworthy", "Villainous", "Nefarious", "Contemptible", "Heinous", "Nausiating", "Sickening", "Revolting", "Objectionable", "Repugnant", "Obnoxious", "Delightful", "Abomination", "Nattinan Oukongka"];
  // declaring global variables
  var displayWord = random();
  var currentScore = 0;
  var seconds = 40;
  var player = true;
  var time = countdown();

  var winner;
  var loser;
  var highScore;
  var lowScore;

  var titleAudio1 = new Audio("audio/funnysong.mp3");
  var winAudio = new Audio("audio/clapping.mp3");
  //Play title audio
  function audioPlay1() {
    titleAudio1.play();
  }
  function clapping() {
    winAudio.play();
  }

  var seconds1 = 10;
  var myVar = setInterval(myTimer, 1000);
  //Game interval
  function myTimer() {
    seconds1--;
    $(".time").html(seconds1);
    if(seconds1 <=0){
      clearInterval(myVar);
    }
  }
  //Start game
  function countdown() {
    currentScore = 0;
    //setting time interval for gameplay
    var timer = setInterval(function(){
      //counting down
      seconds--;
      audioPlay1();
      if (seconds == 39) {
        $(".header").html("Player 1");
      }
      if (seconds === 30) {
        // Player1's turn
        if (player = true) {
          //once timer reached 80, announce
          $(".header").html("");
          $(".announce").html("Player1, Your score is " + currentScore);
          //Store Player1's score in localStorage
          localStorage.setItem("score1", currentScore);
          var storedScore = localStorage.getItem("score1");
          //Display score for Player2 to see
          $(".playerScore").html(storedScore);
          $(".score").html("0");
          $(".words").html("");
        }
      }
      if (seconds === 25) {
        //Let Player2 know it's their turn
        $(".announce").html("It's Player2's turn!");
      }
      if (seconds === 20) {
        //Clear string
        $(".time").html("10");
        $(".announce").html("");
        $(".header").html("Player 2");
        //Reset score for Player2
        currentScore = 0;
        seconds1=10;
        myVar = setInterval(myTimer, 1000);
        $(".words").html(displayWord);
        $(".words").html(displayWord.toUpperCase());
        $(".words").html(formatWord());
        //Reset current letter counts
        currentLetterId = 0;
      }
      if (seconds === 10) {
        $(".words").html("");
        $(".header").html("");
        $(".announce").html("Player2, Your score is " + currentScore);
        //Store Player2's score in storage
        localStorage.setItem("score2", currentScore);
        var storedScore1 = localStorage.getItem("score2");
      }
      if (seconds === 5) {
        //Get storedScore
        //If score2 is higher than score1, announce Player2 as winner
        if (localStorage.getItem("score2") > localStorage.getItem("score1")) {
          $(".words").html("");
          $(".announce").html("Player2 is the winner!");
          $(".outerbox").addClass("winbg");
          clapping();
          winner = "Player2";
          loser = "Player1";
          highScore = localStorage.getItem("score2");
          lowScore = localStorage.getItem("score1");
        }
        //If score1 is higher than score2, announce Player1 as winner
        if (localStorage.getItem("score1")> localStorage.getItem("score2")) {
          $(".announce").html("Player1 is the winner!");
          $(".outerbox").addClass("winbg");
          clapping();
          winner = "Player1";
          loser = "Player2";
          highScore = localStorage.getItem("score1");
          lowScore = localStorage.getItem("score2");
        }
        if (localStorage.getItem("score2") == localStorage.getItem("score1")) {
          $(".announce").html("It's a draw!");
          winner = "Player1";
          loser = "Player2";
          highScore = localStorage.getItem("score1");
          lowScore = localStorage.getItem("score2");
        }
      }
      //Clear countdown
      if (seconds === 0) {
        $("#leaderboard").append("<h2>LEADERBOARD</h2>")
        $("#leaderboard").append("<table align='center'><th>player</th><th>score</th><tr><td>"+winner+"</td><td>"+highScore+"</td></tr><tr><td>"+loser+"</td><td>"+lowScore+"</td></tr></table>");
        $("#leaderboard").append("<a href='index.html'><button>Restart</button></a>");
        $("#leaderboard").append("<a href='pages/1.html'><button>Home</button></a>");
        $(".time").html("");
        $(".score").html("");
        $(".disp").html("");
        $(".playerScore").html("");
        $("#leaderboard").addClass("winbg");
        clapping();
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
      currentLetter.removeClass("wrongbg");
    } else {
      currentLetter.removeClass("bg");
      currentLetter.addClass("wrongbg");
    }
    //Once all letters are typed up correctly, reset and display new word
    if (currentLetterId==displayWord.length ) {
      displayWord = random(); //Getting new word
      $(".words").html(displayWord.toUpperCase());
      $(".words").html(formatWord());
      //Reset current letter counts
      currentLetterId = 0;
    }
  });
});
