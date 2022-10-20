const deck = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
const  playerHand = [];
const  dealerHand = [];
let playerValue = 0;
let dealerValue = 0;
let playerHandSize = 0;
let dealerHandSize = 0;
let dealerDisplayedValue; 
let newCard;
let newValue;
let rand;
let playerAce = false;
let dealerAce = false;
let playerScore = 0;


function hit(){
    playerHand.push(dealNewCard());
    playerValue = calcPlayerHandValue();
    document.getElementById("playerHand").innerHTML = playerHand;
    document.getElementById("playerValue").innerHTML = playerValue;
    if(checkBust(playerValue) == true){
        document.getElementById("gameUpdate").innerHTML = ("You Bust!");
        document.getElementById("HitBtn").disabled = true;
        document.getElementById("StandBtn").disabled = true;
        playerScore--;
        document.getElementById("playerScore").innerHTML = playerScore;
    }
}

function hasPlayerAce(){
    if(playerAce == true){
        if(playerValue < 12){
            playerValue = playerValue + 10;
        }
    }
    return playerValue;
}

function hasDealerAce(){
    if(dealerAce == true){
        if(dealerValue < 12){
            dealerValue = dealerValue + 10;
        }
    }
    return dealerValue;
}

function checkBust(total){
let bust = false;
    if(total > 21){
        bust = true;
    }
    return bust;
}

function dealNewCard(){
rand = Math.floor(Math.random() * (deck.length - 1));
newCard = deck[rand];
return newCard;
}

function calcPlayerHandValue(){
    let curCard; 
    let totalValue = 0;
    for (let i = 0; i < playerHand.length; i++) {
        curCard = playerHand[i];
        switch(curCard) {
            case "A":
              curCard = 1;
              playerAce = true; 
              break;
            case "J":
                curCard = 10;
              break;
            case "Q":
                curCard = 10;
                break;
            case "K":
                curCard = 10;
                break;
            default:
                parseInt(curCard);
          }
          totalValue += curCard;
      }
    return totalValue;
}

function calcDealerHandValue(){
    let curCard; 
    let totalValue = 0;
    for (let i = 0; i < dealerHand.length; i++) {
        curCard = dealerHand[i];
        switch(curCard) {
            case "A":
              curCard = 1;
              dealerAce = true; 
              break;
            case "J":
                curCard = 10;
              break;
            case "Q":
                curCard = 10;
                break;
            case "K":
                curCard = 10;
                break;
            default:
                parseInt(curCard);
          }
          totalValue += curCard;
      }
    return totalValue;
}

function stand(){
    playerValue = hasPlayerAce();
    document.getElementById("playerHand").innerHTML = playerHand;
    document.getElementById("playerValue").innerHTML = playerValue;
    document.getElementById("HitBtn").disabled = true;
    document.getElementById("StandBtn").disabled = true;
    dealerTurn();
}

function dealerTurn() {
        while(dealerValue < 17){
            dealerHand.push(dealNewCard());
            dealerValue = calcDealerHandValue();
            dealerValue = hasDealerAce();
            document.getElementById("dealerHand").innerHTML = dealerHand;
            document.getElementById("dealerValue").innerHTML = dealerValue;
        }
        getHandResults();
}

function getHandResults(){
    if(playerValue == 21 && playerHand.length == 2){
        document.getElementById("gameUpdate").innerHTML = ("Blackjack! Double points :3");
        playerScore++;
        playerScore++;
    } else {
        if(playerValue == dealerValue){
            document.getElementById("gameUpdate").innerHTML = ("Tie!");
        }
        if(playerValue > dealerValue || dealerValue > 21){
            document.getElementById("gameUpdate").innerHTML = ("You Win!");
            playerScore++;
        }
        if(playerValue < dealerValue && dealerValue <= 21){
            document.getElementById("gameUpdate").innerHTML = ("Sorry, you lost!");
            playerScore--;
        }
    }
    document.getElementById("playerScore").innerHTML = playerScore;
    document.getElementById("dealerHand").innerHTML = dealerHand;
    document.getElementById("dealerValue").innerHTML = dealerValue;
}

function clearHand(){
    playerHand.splice(0,playerHand.length);
    dealerHand.splice(0,dealerHand.length);
    playerValue = 0;
    dealerValue = 0;
}

function newHand(){
    playerAce = false;
    dealerAce = false;
    dealerHand.push(dealNewCard());
    dealerHand.push(dealNewCard());
    dealerValue = calcDealerHandValue();
    document.getElementById("dealerHand").innerHTML = "? " + dealerHand[1];
    document.getElementById("dealerValue").innerHTML = "?";
    playerHand.push(dealNewCard());
    playerHand.push(dealNewCard());
    playerValue = calcPlayerHandValue();
    document.getElementById("playerHand").innerHTML = playerHand;
    document.getElementById("playerValue").innerHTML = playerValue;
}

function init(){
newHand();
playerScore = 0;
document.getElementById("playerScore").innerHTML = playerScore;
}

function reset(){
    document.getElementById("HitBtn").disabled = false;
    document.getElementById("StandBtn").disabled = false;
    document.getElementById("gameUpdate").innerHTML = ("Hand Status");
    clearHand();
    newHand();
    playerScore = 0;
    document.getElementById("playerScore").innerHTML = playerScore;
}

function newDeal(){
    document.getElementById("HitBtn").disabled = false;
    document.getElementById("StandBtn").disabled = false;
    document.getElementById("gameUpdate").innerHTML = ("Hand Status");
    clearHand();
    newHand();
}

