player1 = document.getElementById("player1");
player2 = document.getElementById("player2");
player3 = document.getElementById("player3");
player4 = document.getElementById("player4");

const players = [];
players.push(player1, player2, player3, player4);

ennemy1 = document.getElementById("ennemy1");
ennemy2 = document.getElementById("ennemy2");
ennemy3 = document.getElementById("ennemy3");

const ennemies = [];
ennemies.push(ennemy1, ennemy2, ennemy3);

stats = document.getElementById("stats");

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
		stats.innerHTML = ennemies[i].name + "<br> HP: " + ennemies[i].hp;
	}
}
