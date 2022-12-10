//
// VARIABLES
//
// listes pour les elements html
const players = document.getElementsByClassName("player");
const ennemies = document.getElementsByClassName("ennemy");
const buttons = document.getElementsByClassName("button");
const actionbuttons = document.getElementsByClassName("buttonaction");

// elements en header pour les messages de jeu et les stats des entitees
let textarea = document.getElementById("textarea");
let stats = document.getElementById("stats");


//
// FONCTIONS
//

function printText(text)
{
    textarea.innerHTML = text;
}

function getRandomInt(max)
{
    return Math.floor(Math.random() * max);
}

function clickButtonPlayer(playersbuttons, selectedButton, selectedPlayer)
{
    // reset les couleurs sur tout les boutons
    for (let i=0; i < playersbuttons.length; i++)
    {
        playersbuttons[i].style.backgroundColor = "#65917B";
        playersbuttons[i].selected = 0;
    }
    if (selectedButton.type == "player")
    {
        selectedButton.style.backgroundColor = "darkgreen";
        selectedPlayer.selected = 1;
    }
}

function clickButtonEnnemy(ennemiesbuttons, selectedButton, selectedEnnemy)
{
    // reset les couleurs sur tout les boutons
    for (let i=0; i < ennemiesbuttons.length; i++)
    {
        ennemiesbuttons[i].style.backgroundColor = "#65917B";
        ennemiesbuttons[i].selected = 0;
    }
    if (selectedButton.type == "ennemy")
    {
        selectedButton.style.backgroundColor = "darkred";
        selectedEnnemy.selected = 1;
    }
}

function clickButtonAction(selected)
{
    // reset les couleurs sur tout les boutons
    for (let i=0; i < actionbuttons.length; i++)
    {
        actionbuttons[i].style.backgroundColor = "#65917B";
        actionbuttons[i].selected = 0;
    }

	// on colore le bouton selon son type
	switch (selected.type)
	{
		case 'attack':
			selected.style.backgroundColor = "#ff0000";
            selected.selected = 1;
			break;
		case 'defend':
			selected.style.backgroundColor = "#0000ff";
            selected.selected = 1;
			break;
		case 'special':
			selected.style.backgroundColor = "#00ff00";
            selected.selected = 1;
			break;
    }
}

function highlightButtonResetAll(buttons)
{
    for (let i=0; i < buttons.length; i++)
    {
        buttons[i].backgroundColor = "#65917B";
    }
    for (let i=0; i < actionbuttons.length; i++)
    {
        actionbuttons[i].style.backgroundColor = "#65917B";
    }
}

function resetSelection(players,ennemies,buttons)
{
    for (let i=0; i < players.length; i++)
    {
        players[i].selected = 0
    }
    for (let i=0; i < ennemies.length; i++)
    {
        ennemies[i].selected = 0
    }
    for (let i=0; i < buttons.length; i++)
    {
        buttons[i].selected = 0
    }
}

function playerAttack(player,ennemy)
{
    console.log(player.state)
    console.log(ennemy.state)
    if (player.state == "alive" && ennemy.state == "alive")
    {
        console.log("both alive")
        if (player.mana > 0)
        {
            console.log("has mana")
            printText(player.name + " is attacking " + ennemy.name);
            player.mana = player.mana - 10;

            if (ennemy.hp > 0)
            {
                ennemy.hp = ennemy.hp - getRandomInt(5)
            }
            if (ennemy.hp <= 0)
            {
                ennemy.hp = 0
                printText(ennemy.name + " was defeated by " + player.name)
                ennemy.state = "dead"
            }
        }
        else if (player.mana <= 0)
        {
            printText(player.name + " couldn't attack, they didn't have enough mana !")
            player.mana = player.max_mana;
        }

    }
}

function playerSpecial(player,ennemy)
{
    if (player.state == "alive" && ennemy.state == "alive")
    {
        if (player.mana > 20)
        {
            printText(player.name + " is attacking " + ennemy.name);
            player.mana = player.mana - 20;

            if (ennemy.hp > 0)
            {
                ennemy.hp = ennemy.hp - 20
            }
            if (ennemy.hp <= 0)
            {
                ennemy.hp = 0
                printText(ennemy.name + " was defeated by " + player.name)
                ennemy.state = "dead"
            }
        }
        else if (player.mana <= 0)
        {
            printText(player.name + " couldn't make their special move, they didn't have enough mana !")
            player.mana = player.max_mana;
        }

    }
}

function ennemyAttack(ennemy,player)
{
    if (ennemy.state == "alive" && player.state == "alive")
    {
        printText(ennemy.name + " is attacking " + player.name);
        if (player.state == "defending")
        {
            let luck = getRandomInt(10)
            if (luck == 0)
            {
                printText(player.name + " failed to block " + ennemy.name + "'s attack !")
            }
            else
            {
                printText(player.name + " blocked " + ennemy.name + "'s attack !")
            }
        }
        if (player.hp > 0)
        {
            player.hp = player.hp - getRandomInt(10)
            if (player.hp <= 0)
            {
                player.hp = 0
                printText(player.name + " was defeated by " + ennemy.name)
                player.state = "dead"
            }
        }
    }
}

function playerDefend(player)
{
    player.state = "defending"
    player.selected = 1
}

function playAction(players,ennemies,actions)
{
    let selectedPlayer = 0;
    let selectedEnnemy = 0;
    let selectedAction = 0;

    console.log("button action")

    for(let i=0; i < players.length; i++)
    {
        if (players[i].selected == 1)
        {
            selectedPlayer = players[i];
            console.log("selected player : " + selectedPlayer.name)
        }
    }
        for(let i=0; i < ennemies.length; i++)
    {
        if (ennemies[i].selected == 1)
        {
            selectedEnnemy = ennemies[i];
            console.log("selected ennemy : " + selectedEnnemy.name)
        }
    }
    for(let i=0; i < actions.length; i++)
    {
        if (actions[i].selected == 1)
        {
            selectedAction = actions[i];
            console.log("selected action : " + selectedAction.type)
        }
    }
    console.log(selectedPlayer + selectedEnnemy + selectedAction)
    if (selectedPlayer != 0 && selectedEnnemy != 0 && selectedAction != 0)
    {
        switch (selectedAction.type)
        {
            case "attack":
                playerAttack(selectedPlayer,selectedEnnemy)
                console.log("attack triggered")
                break;
            case "defend":
                playerDefend(selectedPlayer)
                console.log("defense triggered")
                break;
            case "special":
                playerSpecial(selectedPlayer)
                console.log("special triggered")
                break;
        }
    }
}

//
// CODE
//

// initialisation des joueurs
for(let i=0; i < players.length; i++)
{
    // selon leur index on leur donne un nom
	switch(i)
    {
		case 0:
			players[0].name = "Magician";
            players[0].hp = 15;
            players[0].mana = 100;
            players[0].max_mana = 100;
            players[0].state = "alive"
            players[0].selected = 0
			break;
		case 1:
			players[1].name = "Sara";
            players[1].hp = 20;
            players[1].mana = 60;
            players[1].max_mana = 60;
            players[1].state = "alive"
            players[1].selected = 0
			break;
		case 2:
			players[2].name = "Bald";
            players[2].hp = 30;
            players[2].mana = 30;
            players[2].max_mana = 30;
            players[2].state = "alive"
            players[2].selected = 0
			break;
		case 3:
			players[3].name = "Possum";
            players[3].hp = 20;
            players[3].mana = 0;
            players[3].max_mana = 0;
            players[3].state = "alive"
            players[3].selected = 0
			break;
	}

    // on defini les fonctions callback pour l'affichage des hp
	players[i].onmouseover = function()
    {
        stats.style.color = "green";
		stats.innerHTML = players[i].name + "<br> HP: " + players[i].hp + ", Mana: " + players[i].mana;
	}
	players[i].onmouseout = function()
    {
		stats.innerHTML = "";
	}
}

// meme chose pour les ennemis
for(let i=0; i < ennemies.length; i++)
{
	switch(i)
    {
		case 0:
			ennemies[0].name = "Goblin";
            ennemies[0].hp = 40;
            ennemies[0].state = "alive";
            ennemies[0].selected = 0
			break;
		case 1:
			ennemies[1].name = "Spider";
            ennemies[1].hp = 30;
            ennemies[1].state = "alive";
            ennemies[1].selected = 0
			break;
		case 2:
			ennemies[2].name = "Skeleton";
            ennemies[2].hp = 30;
            ennemies[2].state = "alive";
            ennemies[2].selected = 0
			break;
	}

	ennemies[i].onmouseover = function()
    {
        stats.style.color = "red";
		stats.innerHTML = ennemies[i].name + "<br> HP: " + ennemies[i].hp;
	}
	ennemies[i].onmouseout = function()
    {
		stats.innerHTML = "";
	}
}

// initialisation des boutons des entitees
for(let i=0; i < buttons.length; i++)
{
    // on gere les boutons des joueurs en premier
	if (i < players.length)
    {
        // on converti notre "liste" HTMLCollection en Array afin d'utiliser la methode filter
        let arr = [].slice.call(buttons);
        buttons[i].type = "player";

		buttons[i].onmouseover = function()
        {
			stats.style.color = "green";
			stats.innerHTML = players[i].name + "<br> HP: " + players[i].hp;
		}
		buttons[i].onmouseout = function()
        {
			stats.innerHTML = "";
		}
        buttons[i].onclick = function()
        {
            clickButtonPlayer(arr.filter(button => button.type == "player"), buttons[i],players[i]);
        }
	}
    // puis les boutons ennemis
    else if (i > players.length - 1)
    {
        let arr = [].slice.call(buttons);
        buttons[i].type = "ennemy";

		buttons[i].onmouseover = function()
        {
			stats.style.color = "red";
			stats.innerHTML = ennemies[i-players.length].name + "<br> HP: " + players[i-players.length].hp;
		}
		buttons[i].onmouseout = function()
        {
			stats.innerHTML = "";
		}
        buttons[i].onclick = function()
        {
            clickButtonEnnemy(arr.filter(button => button.type == "ennemy"), buttons[i],ennemies[i-players.length]);
        }
	}
}

// boutons actions
for(let i=0; i < actionbuttons.length; i++)
{
	switch (i)
	{
		case 0:
			actionbuttons[0].type = "attack";
			actionbuttons[0].selected = 0;
            actionbuttons[0].onclick = function()
            {
                clickButtonAction(actionbuttons[i]);
                playAction(players,ennemies,actionbuttons)
            }
			break;
		case 1:
			actionbuttons[1].type = "defend";
			actionbuttons[1].selected = 0;
            actionbuttons[1].onclick = function()
            {
                clickButtonAction(actionbuttons[i]);
                playAction(players,ennemies,actionbuttons)
            }
			break;
		case 2:
			actionbuttons[2].type = "special";
			actionbuttons[2].selected = 0;
            actionbuttons[2].onclick = function()
            {
                clickButtonAction(actionbuttons[i]);
                playAction(players,ennemies,actionbuttons)
            }
			break;
	}
}
