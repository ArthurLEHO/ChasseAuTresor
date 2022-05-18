/*
Auteur : Arthur Le Ho
Version : 0.4
Date : 15/05/2022
Ce code permet de créer le tableau, de pouvoir cliquer sur les cases et d'afficher le résultat obtenu
*/
let TableauJeu;
let tresorCarte = "Trésor";
let nbMax = 9;
let CTX;
let CTY;
let score;
let malusX;
let malusY;
let malusX2;
let malusY2;
let bonusX;
let bonusY;
let bonusX2;
let bonusY2;
let Malus1 = "Malus1";
let Malus2 = "Malus2";
let Bonus1 = "Bonus1";
let Bonus2 = "Bonus2";

//Création du tableau 
function Tableau2D(x, y) {
	let table = new Array(x);
	for (let i = 0; i < table.length; i++) {
		table[i] = new Array(y);
	}
	return table;
}

//Fonction d'initialisation du jeu
function initTab() {
	document.getElementById("bouttonRejouer").innerHTML = "";
	document.getElementById("tableau").innerHTML = "";
	document.getElementById("score").innerHTML = "0";
	score = 0;
	TableauJeu = Tableau2D(10, 10);

	//Emplacement aléatoire du trésor
	CTX = Math.floor(Math.random() * nbMax + 1);
	CTY = Math.floor(Math.random() * nbMax + 1);

	//Emplacement aléatoire bonus / malus
	malusX = Math.floor(Math.random() * nbMax + 1);
	malusY = Math.floor(Math.random() * nbMax + 1);
	malusX2 = Math.floor(Math.random() * nbMax + 1);
	malusY2 = Math.floor(Math.random() * nbMax + 1);

	bonusX = Math.floor(Math.random() * nbMax + 1);
	bonusY = Math.floor(Math.random() * nbMax + 1);
	bonusX2 = Math.floor(Math.random() * nbMax + 1);
	bonusY2 = Math.floor(Math.random() * nbMax + 1);
	//Ajout du trésor dans le tableau
	TableauJeu[CTX][CTY] = tresorCarte;

	//Ajout des malus et bonus dans la tableau
	TableauJeu[malusX][malusY] = Malus1;
	TableauJeu[malusX2][malusY2] = Malus2;
	TableauJeu[bonusX][bonusY] = Bonus1;
	TableauJeu[bonusX2][bonusY2] = Bonus2;

	//Création des lignes et des colonnes du tableau
	//Les lignes
	let ConstructionTableau = "";
	for (let i = 0; i <= 9; i++) {
		ConstructionTableau += "<tr>"
		for (let z = 0; z <= 9; z++) {
			//Les colonnes
			ConstructionTableau += '<td class="caseCarte" onclick="choix(this.id)" id=' + i + "-" + z + '></td>';
		}
		ConstructionTableau += "</tr>";
	}
	//Affichage du tableau
	document.getElementById("tableau").innerHTML += ConstructionTableau;
}

// choix() récupère les coordonnées de la case et traite l'évènement qui lui est associé
function choix(numCase) {
	CoordonneesTableau = numCase.split("-");
	let coordonneeX = CoordonneesTableau[0];
	let coordonneeY = CoordonneesTableau[1];
	let Case = document.getElementById(coordonneeX + "-" + coordonneeY);

	if (TableauJeu[coordonneeX][coordonneeY] == "Trésor") {
		score += 1;
		Case.classList.add("Tresor");
		let TableauColonne = document.getElementsByClassName("caseCarte");
		//Empêche de recliquer sur la case
		for (let i = 0; i < TableauColonne.length; i++) {
			TableauColonne[i].removeAttribute("onclick");
		}
		//Possibilité de rejouer
		document.getElementById("bouttonRejouer").innerHTML += '<button onclick="initTab()">Rejouer</button>';
	}
	else if (TableauJeu[coordonneeX][coordonneeY] == "Malus1" || "Malus2") {
		score += 3;
		Case.classList.add("Malus");
	}
	else if (TableauJeu[coordonneeX][coordonneeY] == "Bonus1" || "Bonus2") {
		score -= 3;
		Case.classList.add("Malus");
	}
	else {
		//Evènements lorsque ce n'est pas la bonne case
		if (coordonneeY == CTY) {
			score += 1;
			Case.classList.add("ColonneOK");
		}
		else if (coordonneeX == CTX) {
			score += 1;
			Case.classList.add("LigneOK");
		}
		else {
			Case.classList.add("MauvaiseCase");
			score += 1;
		}
	}
	//Afficher le nouveau score
	document.getElementById('score').innerHTML = score;
}