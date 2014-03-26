'use strict'

//Cache renew if files have been renewed 
 


document.observe('dom:loaded', function(){
  window.applicationCache.onnoupdateready = function(evt)
                                                {
                                                  console.log('Swapping files ' + evt);
                                                  window.applicationCache.update();
                                                  window.applicationCache.swapCache();
                                                };
  gameStart();
  if($.jStorage.index().length != 0 || resumeGame() != 1)
  {
    if(resumeGame() === 2)
    {
      alert('Resume Successful');
    }
  }
  else
  {
    randomCardSelect();
  }
  var cards = $$('.card');
  for(var i=0;i<=cards.length-1;i++)
      {
        cards[i].onclick = flipCard;
      }
  $('saveBtn').onclick = function(){var btn =$('saveBtn');
                                    btn.style.backgroundColor = 'black';
                                    window.setTimeout(function(){$('saveBtn').style.backgroundColor ='white'}, 200);
                                    saveGame();
                                   }
});

var suits = []; 
var cardpack = [];
var turns = 0;
var shuffledPack;
var match_audio;
var audio_source;

function turnCounter()//Counts the amount of turns the player has
                      //already expired during their game and stops 
                      //the game when the amount of turns eq
{
  if($$('.flipped').length==2)
  {
    turns+=1;
    if(turns==24)
    {
      var blocker = new Element('blocker',{'class': 'blocker'});
      $$('body')[0].insert({bottom:blocker});
    }
    $('turns').innerHTML = turns;
    console.log('Turns',turns,'completed');
    if(gameLogic()!=-1)
    {
      flipCard($$('.flipped'));
    }
  }
}

function suitSelect(card, i)
{
  if(card.indexOf('C')>-1)
  {
    switch(card[0])
    {
      case 'A':
          $$('.back')[i].style.backgroundPosition = "0px 0px";
          break;
        case '2':
          $$('.back')[i].style.backgroundPosition = "-127px 0px";
          break;
        case '3':
          $$('.back')[i].style.backgroundPosition = "-254px 0px";
          break;
        case '4':
          $$('.back')[i].style.backgroundPosition = "-381px 0px";
          break;
        case '5':
          $$('.back')[i].style.backgroundPosition = "-508px 0px";
          break;
        case '6':
          $$('.back')[i].style.backgroundPosition = "-635px 0px";
          break;
        case '7':
          $$('.back')[i].style.backgroundPosition = "-762px 0px";
          break;
        case '8':
          $$('.back')[i].style.backgroundPosition = "-889px 0px";
          break;
        case '9':
          $$('.back')[i].style.backgroundPosition = "-1016px 0px";
          break;
        case '1':
          $$('.back')[i].style.backgroundPosition = "-1143px 0px";
          break;
        case 'J':
          $$('.back')[i].style.backgroundPosition = "-1270px 0px";
          break;
        case 'Q':
          $$('.back')[i].style.backgroundPosition = "-1397px 0px";
          break;
        case 'K':
          $$('.back')[i].style.backgroundPosition = "-1524px 0px";
          break;
        default:$$('.back')[i].style.backgroundPosition = "0px 0px";
    }
  }
  if(card.indexOf('D')>-1)
  {
    switch(card[0])
    {
        case 'A':
          $$('.back')[i].style.backgroundPosition = "0px -525px";
          break;
        case '2':
          $$('.back')[i].style.backgroundPosition = "-127px -525px";
          break;
        case '3':
          $$('.back')[i].style.backgroundPosition = "-254px -525px";
          break;
        case '4':
          $$('.back')[i].style.backgroundPosition = "-381px -525px";
          break;
        case '5':
          $$('.back')[i].style.backgroundPosition = "-508px -525px";
          break;
        case '6':
          $$('.back')[i].style.backgroundPosition = "-635px -525px";
          break;
        case '7':
          $$('.back')[i].style.backgroundPosition = "-762px -525px";
          break;
        case '8':
          $$('.back')[i].style.backgroundPosition = "-889px -525px";
          break;
        case '9':
          $$('.back')[i].style.backgroundPosition = "-1016px -525px";
          break;
        case '1':
          $$('.back')[i].style.backgroundPosition = "-1143px -525px";
          break;
        case 'J':
          $$('.back')[i].style.backgroundPosition = "-1270px -525px";
          break;
        case 'Q':
          $$('.back')[i].style.backgroundPosition = "-1397px -525px";
          break;
        case 'K':
          $$('.back')[i].style.backgroundPosition = "-1524px -525px";
          break;
        default:$$('.back')[i].style.backgroundPosition = "0px 0px";
    }
  }
  if(card.indexOf('H')>-1)
  {
    switch(card[0])
    {
       case 'A':
          $$('.back')[i].style.backgroundPosition = "0px -350px";
          break;
        case '2':
          $$('.back')[i].style.backgroundPosition = "-127px -350px";
          break;
        case '3':
          $$('.back')[i].style.backgroundPosition = "-254px -350px";
          break;
        case '4':
          $$('.back')[i].style.backgroundPosition = "-381px -350px";
          break;
        case '5':
          $$('.back')[i].style.backgroundPosition = "-508px -350px";
          break;
        case '6':
          $$('.back')[i].style.backgroundPosition = "-635px -350px";
          break;
        case '7':
          $$('.back')[i].style.backgroundPosition = "-762px -350px";
          break;
        case '8':
          $$('.back')[i].style.backgroundPosition = "-889px -350px";
          break;
        case '9':
          $$('.back')[i].style.backgroundPosition = "-1016px -350px";
          break;
        case '1':
          $$('.back')[i].style.backgroundPosition = "-1143px -350px";
          break;
        case 'J':
          $$('.back')[i].style.backgroundPosition = "-1270px -350px";
          break;
        case 'Q':
          $$('.back')[i].style.backgroundPosition = "-1397px -350px";
          break;
        case 'K':
          $$('.back')[i].style.backgroundPosition = "-1524px -350px";
          break;
        default:$$('.back')[i].style.backgroundPosition = "0px 0px";
    }
  }
  if(card.indexOf('S')>-1)
  {
    switch(card[0])
    {
       case 'A':
          $$('.back')[i].style.backgroundPosition = "0px -175px";
          break;
        case '2':
          $$('.back')[i].style.backgroundPosition = "-127px -175px";
          break;
        case '3':
          $$('.back')[i].style.backgroundPosition = "-254px -175px";
          break;
        case '4':
          $$('.back')[i].style.backgroundPosition = "-381px -175px";
          break;
        case '5':
          $$('.back')[i].style.backgroundPosition = "-508px -175px";
          break;
        case '6':
          $$('.back')[i].style.backgroundPosition = "-635px -175px";
          break;
        case '7':
          $$('.back')[i].style.backgroundPosition = "-762px -175px";
          break;
        case '8':
          $$('.back')[i].style.backgroundPosition = "-889px -175px";
          break;
        case '9':
          $$('.back')[i].style.backgroundPosition = "-1016px -175px";
          break;
        case '1':
          $$('.back')[i].style.backgroundPosition = "-1143px -175px";
          break;
        case 'J':
          $$('.back')[i].style.backgroundPosition = "-1270px -175px";
          break;
        case 'Q':
          $$('.back')[i].style.backgroundPosition = "-1397px -175px";
          break;
        case 'K':
          $$('.back')[i].style.backgroundPosition = "-1524px -175px";
          break;
        default:$$('.back')[i].style.backgroundPosition = "0px 0px";
    }
  }
}

function randomCardSelect()/*Function to return 10 cards chosen 
                             from random and then duplicating 
                             these cards and further shuffling them */
{
  var random10 = [];
  var temp = [];
  for(i=0;i<=9;i++)
  {
    random10[i] = cardpack[Math.floor(Math.random()*(cardpack.length-1))];
  }
  random10=random10.concat(random10);//Duplicating the Array on itself
  console.log('Unshuffled\n',random10);
  for(var j=0;i<=19;i++)
  {
    var random = Math.floor(Math.random()*(random10.length-1));
    var random2 = Math.floor(Math.random()*(random10.length-1));
    temp.push(random10.splice(random,1)[0]);                           //Removes random member from random10 and places in temp
    random10.push(temp[0]);                                            //Pushes the random member to the back of random10
    temp.splice(0,1);                                                  //Empties the Temp folder
  }
  console.log('Shuffled\n',random10);
  shuffledPack = random10;
  for(var i=0;i<=random10.length-1;i++)
  {
      if(random10[i].indexOf('C')>-1)
      {
        $$('.back')[i].className += ' clubs';
      }
      else if(random10[i].indexOf('D')>-1)
      {
        $$('.back')[i].className += ' diamonds';
      }
      else if(random10[i].indexOf('H')>-1)
      {
        $$('.back')[i].className += ' hearts';
      }
      else if(random10[i].indexOf('S')>-1)
      {
        $$('.back')[i].className += ' spades';
      }
      suitSelect(random10[i], i);
  }
}

function gameLogic() /*Contains the code that manages 
                       the matching logic of the game */
{
  var c2bc = $$('.flipped');    //Cards to be checked(Same)
  var cardsMatched = $$('flipped2');
    if(c2bc[1].childElements()[1].style.backgroundPosition == c2bc[0].childElements()[1].style.backgroundPosition)
      {
        if(c2bc[1].className.indexOf('matched') == -1)
          {
            c2bc[1].className += ' matched';
            //trigger the Match sound here 
            match_audio.load();
            match_audio.play();
            c2bc[1].className = c2bc[1].className.replace(' flipped',' flipped2'); // 'flipped2' is a marker to show that the card is flipped bu the card is matched 
          }
        if(c2bc[0].className.indexOf('matched') == -1)
          {
            c2bc[0].className += ' matched';
            c2bc[0].className = c2bc[0].className.replace(' flipped', ' flipped2');
          }
      }
}
  

function flipCard(cards)
{
  if(cards.length===2)
  {
    //Triggers both card flips after an intervalof 500 milliseconds
    window.setTimeout(function(){cards[1].className =cards[1].className.replace(' flipped' ,'');
                                 cards[0].className =cards[0].className.replace(' flipped','');},500);
    return;
  }
    
    if(this!=undefined && this.className.indexOf('flipped')>-1)
      {
        if(this.className.indexOf('flipped2')>-1)
          {
            alert('Already Matched');
          }
        else
          {
            this.className = this.className.replace(' flipped','');
          }
      }
  else
  {
    this.className += ' flipped';
    $('flipAudio').load();
    $('flipAudio').play();
  }
  turnCounter();
}

function resumeGame() /*Resumes the game from the state that it was 
                      in when last saved using localStorage*/
{
  var gameState = [];
  var currentCards; 
  //Checks if there are localStorage keys to get gamedata from 
  if($.jStorage.index()!= 0)
  {
    gameState.push($.jStorage.get('gameCards',"Key retrieve Error"));
    gameState[0] = JSON.parse(gameState[0]);
    currentCards = $$('.card'); //Get the cards current game that is loaded
    for(var i=0;i<=currentCards.length-1;i++)
    {
      if(gameState[0][i].indexOf('C')>-1)
        {
          currentCards[i].className += ' clubs';
        }
      if(gameState[0][i].indexOf('D')>-1)
        {
          currentCards[i].className += ' diamonds';
        }
      if(gameState[0][i].indexOf('H')>-1)
        {
          currentCards[i].className += ' hearts';
        }
      if(gameState[0][i].indexOf('S')>-1)
        {
          currentCards[i].className += ' spades';
        }
      suitSelect(gameState[0][i], i);
   }
   if($.jStorage.index().indexOf('matchedCardsPos')>-1)
     {
       gameState.push($.jStorage.get('matchedCardsPos', 'Key retrieve Error'));
       gameState[1] = JSON.parse(gameState[1]);
     }
   for(var i=0;i<=gameState[1].length-1;i++)
     {
        currentCards[gameState[1][i]].className += ' matched flipped2'; /*Adds the matched and flipped classes
                                                                          to show the cards that were flipped 
                                                                          saved game.*/
      }
      gameState.push($.jStorage.get('CTurns', 'Key retrieve Error'));
      turns = JSON.parse(gameState[2]);
      $('turns').replace(turns.toString());
      if($.jStorage.index().indexOf('playerName')>-1)
      {
        $$('form')[0].replace($.jStorage.get('playerName'));
      }
      return 2; // Resume Sucess!!
    }
    else
    {
      return 1;// indicates that this is a totally new game that is being started
    }
}

function acceptName()/*Accepts and binds the name that has been 
                       placed in the form that will be placed 
                       above the turn counter*/
{
 var p_n_s =$('playerName').childElements();
 var name = $$('input')[0].value;
 p_n_s[2].remove();
 $$('form')[0].replace(name);
 $.jStorage.set('playerName', name);
}

function saveGame() /*Creates local storage to store the 
                    progress of the player as well as an associated name*/
{
  var matchedCardPositions = [];
  var turns = JSON.stringify($('turns').innerHTML);
  var uS = JSON.stringify(shuffledPack); //Unique shuffling present in game before resume
  $.jStorage.set('gameCards', uS); /*Storing the selected cards in
                                   the order that they appear */
  $.jStorage.set('CTurns', turns);
  
  /*Pull list of cards from the field and get 
    the indexes of the cards that have been
    matched as pairs*/
  var cardsInPlay = $$('.card');
  for(var i=0;i<=cardsInPlay.length-1;i++)
  {
      if(cardsInPlay[i].className.indexOf('flipped2')>-1)
      {
        matchedCardPositions.push(i);
      }
  }
  if(matchedCardPositions != null)
  {
    matchedCardPositions = JSON.stringify(matchedCardPositions);
    $.jStorage.set('matchedCardsPos', matchedCardPositions);
  }
  
  //Get the values for the amount of cards matched 
  var matched_cards = $$('.matched').length;
  
  alert('Progress Saved');
  
}

function createCardPack() //Creates the deck of cards that the game will use.
{
  var faces = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
  var suits = ['H','C','S','D'];
  var cardnum = 0;
  for(var i=0;i<=suits.length-1;i++)
    {
      for(var j=0;j<=faces.length-1;j++)
        {
          cardpack[cardnum] = faces[j] + suits[i];
          cardnum++;
        }
    }
  console.log(cardpack);
}

function gameStart()
{
  var gameArea = $('gamearea');
  for(var i=0;i<=19;i++)
  {
    var flipArea = new Element('div',{'class':'flipArea'});
    var card = new Element('div',{'class':'card'});
    var cardBack = new Element('div', {'class':'back face'});
    var cardFront = new Element('div', {'class':'front'});
    gameArea.insert({top:flipArea});
    flipArea.insert({top:card});
    card.insert({top:cardBack});
    card.insert({top:cardFront});
  }
  createCardPack();
  
  //Setting up the audio tag for match notification 
  var flip_audio = new Element('audio',{'id':'flipAudio', 'preload':'auto'});
  var audio_source2 = new Element('source',{'src':'/static/audio/page-flip-02.mp3', 'type':'audio/mpeg'});
  var body = $$('body')[0];
  var gameDetails  = new Element('div', {'class':'gameDetails'});
  var savebtn = new Element('div',{'id':'saveBtn', 'title':'Saves your current game progress'});
  var resetbtn = new Element('div',{'id':'resetBtn', 'title':'Resets the save file that was set'});
  var playerName = new Element('form', {'id':'playerName', 'action':'!'});
  var a_p_Name = new Element('input',{'type':'text', 'name':'player1'}); //this is the element that would actually accept the players name 
  var saveName = new Element('button',{'type':'button'});
  var label1 = new Element('label',{});
 
  saveName.onclick = acceptName;
  gameDetails.width = '225px';
  label1.innerHTML = 'Player Name';
  
  savebtn.innerHTML = 'save';
  savebtn.style.fontFamily = 'Tower_Ruins, Berlin Sans ';
  savebtn.style.top = '20px';  
  
  resetbtn.innerHTML = 'reset';
  resetbtn.style.fontFamily = 'Tower_Ruins, Berlin Sans';
  resetbtn.style.top = '30px';
  
  saveName.innerHTML = 'Set';
  
  playerName.insert({bottom:a_p_Name});
  playerName.insert({bottom:saveName});
                     
  
  
  match_audio = new Element('audio',{'id':'matchAudio', 'preload':'auto'});
  audio_source = new Element('source',{'src':'/static/audio/magic-chime-02.mp3', 'type':'audio/mpeg'});
  match_audio.insert({top:audio_source});
  //body.insert({bottom:match_audio});
  
  body.insert({bottom:flip_audio});
  flip_audio.insert({top:audio_source2});
 
  gameDetails.innerHTML = "turns:<br/><span id='turns'>0</span>/24";
  playerName.insert({top:label1});
  gameDetails.insert({top:playerName});
  gameDetails.insert({bottom:savebtn});
  gameDetails.insert({bottom:resetbtn});
  body.insert({bottom:gameDetails});
}
