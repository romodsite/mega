// ########### Copy to clipboard #########

const messageTemp = document.querySelector(".message-temp");
const cooldownProgress = document.querySelector(".message-cooldown-progress");
const messageContent = document.querySelector(".message-temp-content");

var hasBeenRemoved = true;

// Function to show the message
function showMessage(txt) {
    if (hasBeenRemoved) {
        hasBeenRemoved = false;
        console.log(txt)
        messageContent.innerHTML = txt;
        messageTemp.classList.add("show");
        messageTemp.classList.remove("hide");

        // Start the cooldown animation
        cooldownProgress.style.transform = "scaleX(0)";

        // Hide the message after a delay
        setTimeout(hideMessage, 3000); // Adjustable duration
    }
}

// Function to hide the message
function hideMessage() {
    if (!hasBeenRemoved) {
        messageTemp.classList.add("hide");
        messageTemp.classList.remove("show");

        // Désactiver la transition, réinitialiser la barre instantanément
        
        setTimeout(() => {
            cooldownProgress.style.transition = "none"; // Désactiver la transition
            cooldownProgress.style.transform = "scaleX(1)";
        }, 100);

        // Réactiver la transition après un court délai
        setTimeout(() => {
            cooldownProgress.style.transition = "transform 3s linear"; // Réactiver avec la durée souhaitée
            hasBeenRemoved = true;
        }, 120);
    }
}


function copy(copyThis) {
    var copyText = document.getElementById(copyThis);

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); 
    
    navigator.clipboard.writeText(copyText.value);

    showMessage("Texte copié !");
}


// ########### linkvertise #########

function transformToPaidLink(originalUrl, apiUrl, apiToken, advertType = 1) {
    // Helper function to encode URL in Base64 format
    function fps_b64_encode(url) {
        return btoa(encodeURIComponent(url).replace(/%([0-9A-F]{2})/g, function(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
    }

    if (!originalUrl || !apiUrl || !apiToken) {
        console.error("Missing parameters: originalUrl, apiUrl, or apiToken");
        return originalUrl;
    }

    // Construct the paid URL
    return `${apiUrl}full?api=${encodeURIComponent(apiToken)}&url=${fps_b64_encode(originalUrl)}&type=${encodeURIComponent(advertType)}`;
}

// Example usage:
const originalUrl = "https://example.com";
const apiUrl = "https://shrtfly.com/";
const apiToken = "a1e3a1bbddfc42bbdfd0eb2a600495bb";
const advertType = 1; // Optional, default is 1

// const paidLink = transformToPaidLink(originalUrl, apiUrl, apiToken, advertType);
// console.log(paidLink); // This will print the transformed paid link


// ########### menu mobile #########

const menu_mobile = document.querySelector(".menu-mobile");
const menu_input = document.getElementById("check");
const nav = document.querySelector(".nav");
const pc_translate = document.querySelector(".pc-translate");

window.onload = (e) => {
    if (window.innerWidth < 600) {
        pc_translate.remove()
        googleTranslateElementInit()
    } else {
        googleTranslateElementInit()
    }
}

menu_mobile.addEventListener("click", () => {
    if (menu_input.checked == true) {
        closeMenu()
    } else {
        menu_input.checked = true;
        nav.style.left = "0"
    }
})

function closeMenu() {
    if (window.innerWidth < 600) {
        menu_input.checked = false;
        nav.style.left = "-200px"
    } 
}

// ########### report client #########

function reportEvent(thisDiv) {
    // Vérifie si l'élément existe déjà pour éviter de le recréer
    if (document.querySelector('.report-box-temp')) return;

    const imageToReport = thisDiv.parentElement.querySelector(".content-img").src;
    const nameToReport = thisDiv.parentElement.querySelector("h3");

    // Création de la structure principale
    const reportContainer = document.createElement('div');
    reportContainer.className = 'report-box-temp';
    reportContainer.style.opacity = '0'; // Commence invisible
    reportContainer.style.pointerEvents = 'none'; // Désactiver les interactions initialement
    reportContainer.style.transition = 'background-color 0.5s ease, opacity 0.5s ease';

    // Création du contenu interne
    const reportContent = `
        <div class="report-temp">
            <img src="${imageToReport}" alt="">
            <div class="report-temp-info">
                <h2>${nameToReport.textContent}</h2>
                <textarea type="text" placeholder="Raison du signalement (min 20 charactères, max 300 charactères)"></textarea>
                <p class="countCharacter" style="color:red;">0/300<p>
                <a href="#leak">Signaler</a>
            </div>
            <p class="close-button-report-temp">X</p>
        </div>
    `;

    // Ajout du contenu HTML à la boîte principale
    reportContainer.innerHTML = reportContent;

    // Ajout au DOM (ajouté à la fin du body)
    document.body.appendChild(reportContainer);

    // Activer l'affichage avec une légère pause pour la transition
    setTimeout(() => {
        reportContainer.classList.add('active');
        reportContainer.style.opacity = '1';
        reportContainer.style.pointerEvents = 'all';
    }, 10);

    // Gestion du bouton pour fermer la boîte
    const closeButton = reportContainer.querySelector('.close-button-report-temp');
    closeButton.addEventListener('click', () => {
        closeReportBox(reportContainer);
    });

    // Gestion du bouton pour fermer la boîte
    // const report_box = reportContainer.parentElement.querySelector('.report-box-temp');
    // report_box.addEventListener('click', () => {
    //     closeReportBox(reportContainer);
    // });

    const textarea = reportContainer.querySelector('textarea');
    const counter = reportContainer.querySelector('.countCharacter');
    const maxChars = 300;
    textarea.addEventListener('input', () => {
        const textLength = textarea.value.length;

        // Empêche d'écrire au-delà de la limite
        if (textLength > maxChars) {
            textarea.value = textarea.value.slice(0, maxChars);
        }

        // Met à jour le compteur
        counter.textContent = `${textarea.value.length} / ${maxChars}`;

        // Mettre le compteur en rouge si moins de 20 caractères
        if (textLength < 20) {
            counter.style.color = 'red';
        } else {
            counter.style.color = 'grey'; // Retour à la couleur normale
        }
    });


    const button = reportContainer.querySelector('a')
    button.addEventListener('click', () => {
        const textToReport = reportContainer.querySelector('textarea').value;

        const dataToSend = {
            image: imageToReport,
            name: nameToReport.textContent,
            reason: textarea.value
        };

        if (textToReport.length <= 20) {
            console.log("Texte trop court")
        } else if (textToReport.length >= 300) {
            console.log("Texte trop long")
        } else {
            fetch(`http://localhost:5000/report`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            })
                .then((response) => response.json())
                .then((responseData) => {
                    showMessage(responseData.message)
                    closeReportBox(reportContainer)
                })
                .catch((error) => console.error("Erreur:", error));
        }
    })
}


function closeReportBox(reportContainer) {
    reportContainer.style.opacity = '0';
    reportContainer.style.pointerEvents = 'none';
    setTimeout(() => {
        reportContainer.remove();
    }, 500); // Attendre la fin de la transition avant de supprimer l'élément
}

// ########### style page #########

// Sélectionne tous les éléments de la barre de navigation
var navItems = document.querySelectorAll('.nav-href');

// Ajoute un écouteur d'événement 'click' à chaque élément
navItems.forEach(function(item) {
    item.addEventListener('click', function() {
        // Retire la classe 'active' de tous les éléments enfants 'div'
        navItems.forEach(function(nav) {
            var childDiv = nav.querySelector('div');
            if (childDiv) {
                childDiv.classList.remove('active');
            }
        });
        // Ajoute la classe 'active' à l'enfant 'div' de l'élément cliqué
        var clickedChildDiv = item.querySelector('div');
        if (clickedChildDiv) {
            clickedChildDiv.classList.add('active');
        }
    });
});


// ########### translate #########

function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'fr',
        includedLanguages: 'en,fr,es,it,nl,pl,pt,tr',
    }, 'google_translate_element');
    
    setTimeout(function() {
        // Set the default language to Spanish
        var selectElement = document.querySelector('#google_translate_element select');
        var el = document.querySelector("#google_translate_element div"), child = el.firstChild, nextChild;

        while (child) {
            nextChild = child.nextSibling;
            if (child.nodeType == 3) {
                el.removeChild(child);
                document.querySelector("#google_translate_element div span").remove();
            }
            child = nextChild;
        }

        // selectElement.value = 'fr';
        // selectElement.dispatchEvent(new Event('change'));
    }, 100);
}