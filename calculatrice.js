let displayValue = ''; // Cette variable stocke la valeur affichée dans l'écran de la calculatrice

// Ajoutez un gestionnaire d'événements pour détecter les touches du clavier pressées
document.addEventListener("keydown", function (event) {
    const key = event.key;

    // Vérifiez si la touche pressée est un chiffre, une opération valide ou la virgule
    if (/^[0-9+\-*/=.]$/.test(key)) {
        // Si c'est le cas, appelez la fonction appropriée pour gérer la touche
        if (key === "=") {
            calculate();
        } else if (key === ".") {
            // Remplacez "." par la virgule "," si la locale est française
            if (navigator.language === "fr-FR") {
                appendToDisplay(",");
            } else {
                appendToDisplay(key);
            }
        } else {
            appendToDisplay(key);
        }
        event.preventDefault(); // Empêche le comportement par défaut de la touche
    }
});



// Fonction pour ajouter du texte à l'écran de la calculatrice
function appendToDisplay(value) {
    // Vérifie si le dernier caractère de la valeur actuelle est un "=" et si le nouveau caractère est un chiffre
    if (displayValue.endsWith('=') && !isNaN(value)) {
        // Si les conditions sont remplies, réinitialise l'affichage avec la nouvelle valeur
        displayValue = value;
    } else {
        // Sinon, ajoute la nouvelle valeur à la fin de la valeur actuelle
        displayValue += value;
    }
    // Met à jour l'affichage dans l'élément HTML avec l'ID 'display'
    document.getElementById('display').value = displayValue;
}


// Fonction pour calculer la racine carrée
function calculateSquareRoot() {
    if (displayValue !== "") {
        // Vérifie si l'écran n'est pas vide
        const numericValue = parseFloat(displayValue);
        if (numericValue >= 0) {
            // Vérifie si la valeur est positive ou nulle pour éviter une racine carrée négative
            displayValue = Math.sqrt(numericValue).toString(); // Calcule la racine carrée et la convertit en chaîne de caractères
            document.getElementById("display").value = displayValue; // Affiche le résultat
        } else {
            document.getElementById("display").value = "Erreur"; // Affiche une erreur si la valeur est négative
        }
    }
}

// Fonction pour calculer le pourcentage
function calculatePercentage() {
    if (displayValue !== "") {
        // Vérifie si l'écran n'est pas vide
        const numericValue = parseFloat(displayValue);
        displayValue = (numericValue / 100).toString(); // Calcule le pourcentage et le convertit en chaîne de caractères
        document.getElementById("display").value = displayValue; // Affiche le résultat
    }
}

// Fonction pour basculer entre valeurs positives et négatives
function toggleSign() {
    if (displayValue !== "") {
        // Vérifie si l'écran n'est pas vide
        const numericValue = parseFloat(displayValue);
        displayValue = (-numericValue).toString(); // Inverse le signe de la valeur et la convertit en chaîne de caractères
        document.getElementById("display").value = displayValue; // Affiche le résultat
    }
}


// Fonction pour effacer l'écran de la calculatrice
function clearDisplay() {
    displayValue = ''; // Réinitialise la valeur affichée à une chaîne vide
    document.getElementById('display').value = displayValue; // Met à jour l'affichage
}

// Fonction pour effectuer le calcul lorsque le bouton "=" est cliqué
function calculate() {
    try {
        // Utilise la fonction eval() pour évaluer l'expression mathématique stockée dans displayValue
        displayValue = eval(displayValue);
        // Affiche le résultat dans l'élément HTML avec l'ID 'display'
        document.getElementById('display').value = displayValue;
    } catch (error) {
        // En cas d'erreur lors de l'évaluation, affiche 'Erreur' dans l'écran de la calculatrice
        document.getElementById('display').value = 'Erreur de calcul';
    }
}



