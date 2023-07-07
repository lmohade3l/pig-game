'use strict';

//Getting all the elements:
//Since both player's scores are in the class 'score' we distinguish them by their 'IDs' : 2 ways:
const score1 = document.querySelector('#score--0');
const score2 = document.getElementById('score--1');

const dice = document.querySelector('.dice')
const roll_dice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const new_game = document.querySelector('.btn--new');

const curr_score1 = document.getElementById('current--0');
const curr_score2 = document.getElementById('current--1');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

//Set the Conditions to Start:
//Set the total scores to zero:
score1.textContent = 0;
score2.textContent = 0;
//Remove the dice: to do so we have to create a hidden class in CSS.
dice.classList.add('hidden');
//Set a zero current score:
let curr_score = 0;

let active_palyer = 0;
const scores = [0,0];

//Let's keep a variable to hold the state of the game:
let playing = true;


//Roll the dice:
roll_dice.addEventListener('click' , function() {
    if (playing) {
        //Generate a random dice roll:
        let rand_dice = Math.trunc(Math.random() * 6) + 1;

        //Unhide the dice:
        dice.classList.remove('hidden');
    
        //Display dice roll:
        dice.src = `dice-${rand_dice}.png`;

        //Check if it's 1:
        if(rand_dice !== 1){
            //Add dice number to current score:
            curr_score += rand_dice;
            //Let's choose which player to add current score to, dynamicly!
            document.getElementById(`current--${active_palyer}`).textContent = curr_score;
            //OPTIMIZE This always sets the current score to player 1
            //curr_score1.textContent = curr_score;
        } 
        else {
            //Before switching the player we gotta set the current player's current score to zero.
            document.getElementById(`current--${active_palyer}`).textContent = 0;
            curr_score = 0;

            //Switch player: we must know which player is playing as the dice rolls. so we create a variable to hold that.
            active_palyer = active_palyer === 0 ? 1 : 0;

            //Changing the background: By Add/Removing the class 'player--active' :
            player0.classList.toggle('player--active');
            player1.classList.toggle('player--active');
        }
    }
   
});


//Holding the score:
hold.addEventListener('click' , function() {
    if(playing) {
        //1.Add current score to active player:
        //OPTIMIZE you idiot:D
        //scores[active_palyer === 0 ? 0 : 1] += curr_score;
        scores[active_palyer] += curr_score;

        active_palyer === 0 ? score1.textContent=scores[0] : score2.textContent=scores[1];
        
        curr_score = 0;
        document.getElementById(`current--${active_palyer}`).textContent = 0;

        //2.check if the player's scores is >= 100 :
        if(scores[active_palyer]>=20) { 
            //Current player wins!
            playing = false;
            document.querySelector(`.player--${active_palyer}`).classList.add('player--winner');
            document.querySelector(`.player--${active_palyer}`).classList.remove('player--active');
            //Remove the dice picture:
            dice.classList.add('hidden');
        }
        else {
            active_palyer = active_palyer === 0 ? 1 : 0;
            player0.classList.toggle('player--active');
            player1.classList.toggle('player--active');
        }
    }
});


//New Game:
new_game.addEventListener('click' , function() {
    //Set the current scores to zero and display:
    curr_score = 0;
    curr_score1.textContent = 0;
    curr_score2.textContent = 0;
    //OPTIMIZE You had the elements!
    // document.getElementById('current--0').textContent = 0;
    // document.getElementById('current--1').textContent = 0;

    //Set the total scores tozero and display:
    scores[0] = scores[1] = 0;
    score1.textContent = 0;
    score2.textContent = 0;

    //If the game was finished:
    if(!playing){
        playing = true;
        if (player0.classList.contains('player--winner')) {
            player0.classList.remove('player--winner');
            player0.classList.add('player--active');
        } else{
            player1.classList.remove('player--winner');
            player0.classList.add('player--active');
        }
    }
    //If we were in the middle of a game:
    else{
        if(active_palyer === 1){
            active_palyer = 0;
            player0.classList.toggle('player--active');
            player1.classList.toggle('player--active');
        }
    }
});



