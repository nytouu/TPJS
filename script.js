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

function highlightButtonPlayer(playersbuttons, selected)
{
    // reset les couleurs sur tout les boutons
    for (let i=0; i < playersbuttons.length; i++)
    {
        playersbuttons[i].style.backgroundColor = "#65917B";
    }
    if (selected.type == "player")
    {
        selected.style.backgroundColor = "darkgreen";
    }
}

function highlightButtonEnnemy(ennemiesbuttons, selected)
{
    // reset les couleurs sur tout les boutons
    for (let i=0; i < ennemiesbuttons.length; i++)
    {
        ennemiesbuttons[i].style.backgroundColor = "#65917B";
    }
    if (selected.type == "ennemy")
    {
        selected.style.backgroundColor = "darkred";
    }
}

function highlightButtonAction(selected)
{
    // reset les couleurs sur tout les boutons
    for (let i=0; i < actionbuttons.length; i++)
    {
        actionbuttons[i].style.backgroundColor = "#65917B";
    }

	// on colore le bouton selon son type
	switch (selected.type)
	{
		case 'attack':
			selected.style.backgroundColor = "#ff0000";
			break;
		case 'defend':
			selected.style.backgroundColor = "#0000ff";
			break;
		case 'special':
			selected.style.backgroundColor = "#00ff00";
			break;
    }
}

function highlightButtonReset(buttons)
{
    for (let i=0; i < buttons.length; i++)
    {
        buttons[i].backgroundColor = "#65917B";
    }
}

function playerAttack(player,ennemy)
{
    if (player.state == "alive" && ennemy.state == "alive")
    {
        if (player.mana > 0)
        {
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
			break;
		case 1:
			players[1].name = "Sara";
            players[1].hp = 20;
            players[1].mana = 60;
            players[1].max_mana = 60;
            players[1].state = "alive"
			break;
		case 2:
			players[2].name = "Bald";
            players[2].hp = 30;
            players[2].mana = 30;
            players[2].max_mana = 30;
            players[2].state = "alive"
			break;
		case 3:
			players[3].name = "Possum";
            players[3].hp = 20;
            players[3].mana = 0;
            players[3].max_mana = 0;
            players[3].state = "alive"
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
			break;
		case 1:
			ennemies[1].name = "Spider";
            ennemies[1].hp = 30;
            ennemies[1].state = "alive";
			break;
		case 2:
			ennemies[2].name = "Skeleton";
            ennemies[2].hp = 30;
            ennemies[2].state = "alive";
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
            highlightButtonPlayer(arr.filter(button => button.type == "player"), buttons[i]);
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
            highlightButtonEnnemy(arr.filter(button => button.type == "ennemy"), buttons[i]);
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
            actionbuttons[0].onclick = function()
            {
                highlightButtonAction(actionbuttons[i]);
                playerAttack(players[1],ennemies[1])
            }
			break;
		case 1:
			actionbuttons[1].type = "defend";
			break;
		case 2:
			actionbuttons[2].type = "special";
			break;
	}
}
