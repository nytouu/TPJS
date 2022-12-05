let players = document.getElementsByClassName("player")
let ennemies = document.getElementsByClassName("ennemy")
let buttons = document.getElementsByClassName("button")

let stats = document.getElementById("stats");

for(let i=0; i < players.length; i++) {
    players[i].hp = 20;
	switch(i) {
		case 0:
			players[0].name = "Magician";
		case 1:
			players[1].name = "Sara";
		case 2:
			players[2].name = "Bald";
		case 3:
			players[3].name = "Possum";
	}
	players[i].onmouseover = function() {
        stats.style.color = "green"
		stats.innerHTML = players[i].name + "<br> HP: " + players[i].hp;
	}
}

for(let i=0; i < ennemies.length; i++) {
    ennemies[i].hp = 20;
	switch(i) {
		case 0:
			ennemies[0].name = "Goblin";
		case 1:
			ennemies[1].name = "Spider";
		case 2:
			ennemies[2].name = "Skeleton";
	}
	ennemies[i].onmouseover = function() {
        stats.style.color = "red"
		stats.innerHTML = ennemies[i].name + "<br> HP: " + ennemies[i].hp;
	}
}
