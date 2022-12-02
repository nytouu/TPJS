maDiv = document.getElementById("maDiv");
valeurResultat = document.getElementById("valeurResultat");
afficheAction = document.getElementById("afficheAction");

maDiv.onclick = function() {
    valeurResultat.innerHTML = valeurResultat.innerHTML+10;
    afficheAction.innerHTML = "J'ai ajouté 10 !";
}
// Exercice : débuggez ce script :)
