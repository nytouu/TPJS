// listes pour les elements html
const players = document.getElementsByClassName("player")
const ennemies = document.getElementsByClassName("ennemy")
const buttons = document.getElementsByClassName("button")

// elements en header pour les messages de jeu et les stats des entitees
let text = document.getElementById("textarea")
let stats = document.getElementById("stats");


function highlightButtonPlayer(playersbuttons, selected) {
    // reset les couleurs sur tout les boutons
    for (let i=0; i < playersbuttons.length; i++) {
        playersbuttons[i].style.backgroundColor = "#65917B";
    }
    if (selected.type == "player") {
        selected.style.backgroundColor = "#ffffff";
    }
}
function highlightButtonEnnemy(ennemiesbuttons, selected) {
    // reset les couleurs sur tout les boutons
    for (let i=0; i < ennemiesbuttons.length; i++) {
        ennemiesbuttons[i].style.backgroundColor = "#65917B";
    }
    if (selected.type == "ennemy") {
        selected.style.backgroundColor = "#ffffff";
    }
}

// initialisation des joueurs
for(let i=0; i < players.length; i++) {
    // selon leur index on leur donne un nom
	switch(i) {
		case 0:
			players[0].name = "Magician";
            players[0].hp = 15
		case 1:
			players[1].name = "Sara";
            players[1].hp = 20
		case 2:
			players[2].name = "Bald";
            players[2].hp = 30
		case 3:
			players[3].name = "Possum";
            players[3].hp = 20
	}
    // on defini les fonctions callback pour l'affichage des hp
	players[i].onmouseover = function() {
        stats.style.color = "green"
		stats.innerHTML = players[i].name + "<br> HP: " + players[i].hp;
	}
	players[i].onmouseout = function() {
		stats.innerHTML = "";
	}
}

// meme chose pour les ennemis
for(let i=0; i < ennemies.length; i++) {
	switch(i) {
		case 0:
			ennemies[0].name = "Goblin";
            ennemies[0].hp = 30;
		case 1:
			ennemies[1].name = "Spider";
            ennemies[1].hp = 20;
		case 2:
			ennemies[2].name = "Skeleton";
            ennemies[2].hp = 20;
	}
	ennemies[i].onmouseover = function() {
        stats.style.color = "red"
		stats.innerHTML = ennemies[i].name + "<br> HP: " + ennemies[i].hp;
	}
	ennemies[i].onmouseout = function() {
		stats.innerHTML = "";
	}
}

// initialisation des boutons
for(let i=0; i < buttons.length; i++) {
    buttons[i].onclick = function() {
        highlightButton(buttons, buttons[i])
    }

    // on gere les boutons des joueurs en premier
	if (i < players.length) {
        buttons[i].type = "player"
		buttons[i].onmouseover = function() {
			stats.style.color = "green"
			stats.innerHTML = players[i].name + "<br> HP: " + players[i].hp;
		}
		buttons[i].onmouseout = function() {
			stats.innerHTML = "";
		}
        buttons[i].onclick = function() {
            // on converti notre "liste" HTMLCollection en Array afin d'utiliser la methode filter
            let arr = [].slice.call(buttons)
            highlightButtonPlayer(arr.filter(button => button.type == "player"), buttons[i])
        }
	} else {
        // puis ceux des monstres
        buttons[i].type = "ennemy"
		buttons[i].onmouseover = function() {
			stats.style.color = "red"
            // ici l'indice est i-players.length puisque tout les boutons sont dans la meme liste
			stats.innerHTML = ennemies[i-players.length].name + "<br> HP: " + players[i-players.length].hp;
		}
		buttons[i].onmouseout = function() {
			stats.innerHTML = "";
		}
        buttons[i].onclick = function() {
            // on converti notre "liste" HTMLCollection en Array afin d'utiliser la methode filter
            let arr = [].slice.call(buttons)
            highlightButtonEnnemy(arr.filter(button => button.type == "ennemy"), buttons[i])
        }
	}
}
