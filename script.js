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
players.push(ennemy1, ennemy2, ennemy3);


stats = document.getElementById("stats");

for(let i=0; i < players.length; i++) {
    players[i].hp = 20;
}
for(let i=0; i < ennemies.length; i++) {
    ennemies[i].hp = 20;
}


player1.onmouseover = function() {
    stats.innerHTML = "Magician<br>" + player1.hp + " HP";
}
player2.onmouseover = function() {
    stats.innerHTML = "Sara<br>" + player2.hp + " HP";
}
player3.onmouseover = function() {
    stats.innerHTML = "Bald<br>" + player3.hp + " HP";
}
player4.onmouseover = function() {
    stats.innerHTML = "Possum<br>" + player4.hp + " HP";
}

ennemy1.onmouseover = function() {
    stats.innerHTML = "Goblin<br>" + ennemy1.hp + " HP";
}
ennemy2.onmouseover = function() {
    stats.innerHTML = "Spider<br>" + ennemy2.hp + " HP";
}
ennemy3.onmouseover = function() {
    stats.innerHTML = "Skeleton<br>" + ennemy3.hp + " HP";
}
