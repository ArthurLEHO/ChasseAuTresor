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

	//Ajouter le trésor dans le tableau
	TableauJeu[CTX][CTY] = tresorCarte;

	//Création du tableau
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
function choix(idCase) {
	CoordonneesTableau = idCase.split("-");
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