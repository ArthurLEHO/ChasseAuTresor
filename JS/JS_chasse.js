/*
Auteur : Arthur Le Ho
Version : 0.6
Date : 18/05/2022
Ce code permet de créer le tableau, de pouvoir cliquer sur les cases et d'afficher le résultat obtenu en fonction des évènements
*/
let TableauJeu;
let tresorCarte = "Trésor";
let nbMax = 9;
let CTX;
let CTY;
let score;
let contexte = "";

//Coordonnées des bonus et malus
let malusX;
let malusY;

let malusX2;
let malusY2;

let malusX3;
let malusY3;

let malusX4;
let malusY4;

let bonusX;
let bonusY;

let bonusX2;
let bonusY2;

let bonusX3;
let bonusY3;

let bonusX4;
let bonusY4;

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
	malusX3 = Math.floor(Math.random() * nbMax + 1);
	malusY3 = Math.floor(Math.random() * nbMax + 1);
	malusX4 = Math.floor(Math.random() * nbMax + 1);
	malusY4 = Math.floor(Math.random() * nbMax + 1);

	bonusX = Math.floor(Math.random() * nbMax + 1);
	bonusY = Math.floor(Math.random() * nbMax + 1);
	bonusX2 = Math.floor(Math.random() * nbMax + 1);
	bonusY2 = Math.floor(Math.random() * nbMax + 1);
	bonusX3 = Math.floor(Math.random() * nbMax + 1);
	bonusY3 = Math.floor(Math.random() * nbMax + 1);
	bonusX4 = Math.floor(Math.random() * nbMax + 1);
	bonusY4 = Math.floor(Math.random() * nbMax + 1);
	//Ajout du trésor dans le tableau
	TableauJeu[CTX][CTY] = tresorCarte;

	//Ajout des malus et bonus dans la tableau
	TableauJeu[malusX][malusY]
	TableauJeu[malusX2][malusY2]
	TableauJeu[malusX3][malusY3]
	TableauJeu[malusX4][malusY4]

	TableauJeu[bonusX][bonusY]
	TableauJeu[bonusX2][bonusY2]
	TableauJeu[bonusX3][bonusY3]
	TableauJeu[bonusX4][bonusY4]

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
		contexte = "Vous avez trouvé le trésor";
		let TableauColonne = document.getElementsByClassName("caseCarte");
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
			contexte = "Bonne colonne";
		}
		else if (coordonneeX == CTX) {
			score += 1;
			Case.classList.add("LigneOK");
			contexte = "Bonne ligne";
		}
		else if (coordonneeX == malusX && coordonneeY == malusY) {
			score += 3;
			Case.classList.add("Malus");
			contexte = "Vous vous arrêtez à la taverne pour boire un coup, malheureusement vous finissez saoul (+3 coups)";
		}
		else if (coordonneeX == malusX2 && coordonneeY == malusY2) {
			score += 3;
			Case.classList.add("Malus");
			contexte = "Une mutinerie s'organise parmis votre équipage. Vous devez agir avant de perdre plus de temps (+3 coups)";
		}
		else if (coordonneeX == malusX3 && coordonneeY == malusY3) {
			score += 3;
			Case.classList.add("Malus");
			contexte = "Un perroquet vole la carte du trésor, vous partez à sa poursuite (+3 coups)";
		}
		else if (coordonneeX == malusX4 && coordonneeY == malusY4) {
			score += 3;
			Case.classList.add("Malus");
			contexte = "Une prime est placez sur votre tête. Plusieurs pirates se mettent à votre recherche, vous décidez de vous cachez (+3 coups)";
		}
		else if (coordonneeX == bonusX && coordonneeY == bonusY) {
			score -= 3;
			Case.classList.add("Bonus");
			contexte = "Votre équipage décide de vous venir en aide dans votre recherche (-3 coups)";
		}
		else if (coordonneeX == bonusX2 && coordonneeY == bonusY2) {
			score -= 3;
			Case.classList.add("Bonus");
			contexte = "Un marchand vous propose d'acheter une boussole permettant de retrouver le trésor. Vous hésitez un moment. Finalement, vous décidez de lui faire confiance et de l'acheter (-3 coups)";
		}
		else if (coordonneeX == bonusX3 && coordonneeY == bonusY3) {
			score -= 3;
			Case.classList.add("Bonus");
			contexte = "Durant vos recherches, vous trouvez un indice précisant le lieu où le trésor est caché (-3 coups)";
		}
		else if (coordonneeX == bonusX4 && coordonneeY == bonusY4) {
			score -= 3;
			Case.classList.add("Bonus");
			contexte = "Vous décidez de vous associer avec un autre capitaine, il partage ses trouvailles avec vous (-3 coups)";
		}
		else {
			Case.classList.add("MauvaiseCase");
			score += 1;
			contexte = "Mauvaise case";
		}
	}
	//Affiche le contexte approprié à la case
	document.getElementById("texte").innerHTML = contexte
	//Affiche le nouveau score
	document.getElementById('score').innerHTML = score;
}