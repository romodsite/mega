const content = document.getElementById("content");
const button = document.getElementById("loadMoreButton");
let startIndex = 0;
let bddToLoad = "home";
const input = document.getElementById('searchInput');
const divInput = document.getElementById('input');
var canExecute = true;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Si bddToLoad != "cash" => charger les éléments avec un style classique
function loadBddElements(data) {
    // Ajouter les nouveaux éléments au contenu
    data.forEach((item) => {
        const divContentBox = document.createElement("div");
        divContentBox.classList.add("content-box");
        
        const img = document.createElement("img");
        img.src = item.image;
        img.loading = "lazy";
        img.classList.add("content-img");

        const h3 = document.createElement("h3");
        h3.textContent = item.name;
        h3.classList.add("skiptranslate");

        const a = document.createElement("a");
        a.href = item.link;
        a.target = "_blank";
        a.textContent = "Accéder au Mega";
        a.classList.add("linkvertise");

        const divForTimeAndName = document.createElement("div");
        divForTimeAndName.classList.add("timeAndName");
        var time;

        if (bddToLoad === 'leak') {

            time = document.createElement("p");
            time.textContent = item.datepost;
            time.classList.add("time");

            // const report = document.createElement('div');
            // report.classList.add("reportFlag");
            // report.setAttribute('onclick', 'reportEvent(this)')

            // const imgReport = document.createElement('img')
            // imgReport.src = "img/flags.png";
            
            // report.appendChild(imgReport)
            // divContentBox.appendChild(report)
        }

        divContentBox.appendChild(img);
        
        if (bddToLoad === 'leak') {
            divForTimeAndName.appendChild(h3);
            divForTimeAndName.appendChild(time);
            divForTimeAndName.appendChild(a);
            divContentBox.appendChild(divForTimeAndName);
        } else {
            
            divForTimeAndName.appendChild(h3);
            divForTimeAndName.appendChild(a);
            divContentBox.appendChild(divForTimeAndName);
        }

        content.appendChild(divContentBox);
    });
}

// Si bddToLoad == "cash" => charger les éléments avec le style de cash
function loadCashElements(data) {
    console.log("ok")
    console.log(data)
    data.forEach((item) => {

        if (item.BigTitle) {
            const newTitle = document.createElement("h2");
            newTitle.textContent = item.BigTitle;
            newTitle.style.width = "100%";
            newTitle.style.textAlign = "center";
            newTitle.style.fontSize = "30px";
            
            content.appendChild(newTitle);
            return
        }

        // Créer la div principale
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('content-earn-money');

        // Créer et ajouter l'image
        const image = document.createElement('img');
        image.classList.add('content-img-earn-money');
        image.src = item.image;
        image.alt = '';
        contentDiv.appendChild(image);

        // Créer et ajouter le titre (GetGrass)
        const title = document.createElement('h3');
        title.classList.add('content-width', 'skiptranslate');
        title.textContent = item.title;
        contentDiv.appendChild(title);

        // Créer et ajouter la description
        const description = document.createElement('p');
        description.classList.add('content-width');
        description.textContent = item.description;
        contentDiv.appendChild(description);

        // Créer et ajouter le titre "Instruction:"
        const instructionsTitle = document.createElement('h3');
        instructionsTitle.classList.add('content-width');
        instructionsTitle.textContent = 'Instruction:';
        contentDiv.appendChild(instructionsTitle);

        // Créer et ajouter la liste d'instructions
        const instructionsList = document.createElement('ol');
        instructionsList.classList.add('content-width-ol');
        item.instructions.forEach(instruction => {
            const listItem = document.createElement('li');
            listItem.classList.add('content-width');
            listItem.textContent = instruction;
            instructionsList.appendChild(listItem);
        });
        contentDiv.appendChild(instructionsList);

        // Créer et ajouter le lien
        const link = document.createElement('a');
        link.classList.add('content-access-earn-money');
        link.href = item.link;
        link.textContent = "S'inscrire";
        contentDiv.appendChild(link);

        // Ajouter la div au body
        content.appendChild(contentDiv);
    })
}

// Charger les éléments de Home
function loadHome(toLoad) {
    var xhr = new XMLHttpRequest();
    if (toLoad === 'home') {
        loadHTML = 'info.html';
    } else if (toLoad === 'donate') {
        loadHTML = 'donation.html';
    }
    xhr.open('GET', loadHTML, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            content.innerHTML = xhr.responseText;
        }
    };
    xhr.send();
}

// Charger les données au démarrage
function start() {
    if (bddToLoad == 'home' || bddToLoad == 'donate') {
        divInput.style.display = 'none';
        button.style.display = 'none';
        content.style.minHeight = '95%';
        loadHome(bddToLoad);
        return
    }

    divInput.style.display = 'flex';
    button.style.display = 'flex';
    content.style.minHeight = '';

    if (bddToLoad == 'cash') {
        divInput.style.display = 'none';
        button.style.display = 'none';
    }

    var urlToLoad;
    var offsetIndex = 40;

    if (bddToLoad == 'cash') {
        urlToLoad = `./testDatabaseCash.json`
    } else if (bddToLoad == 'leak') {
        urlToLoad = `https://85.215.181.173:5000/items/${startIndex}/${offsetIndex}`
    }

    console.log(urlToLoad)
    
    // fetch(`http://localhost:5000/load-leak-data/${startIndex}/${bddToLoad}`)
    fetch(`${urlToLoad}`)
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData.length)
            const data = responseData;
            console.log(data)
            startIndex += 40;

            if (responseData.length < 40 || responseData.length == 0) {
                document.getElementById("loadMoreButton").style.display = "none";
            }

            if (data && bddToLoad != "cash") {
                // charger les éléments
                loadBddElements(data);
            } else if (data && bddToLoad == "cash") {
                // charger les éléments
                loadCashElements(data);
            } else {
                content.innerHTML = ""
                const div = document.createElement("h2");
                div.textContent = "Error 400 Bad Request";
                content.appendChild(div);
                console.error("Bad response from server");
            }
            
            // Désactiver le bouton si `nextStartIndex` est null
            // if (startIndex === null) {
            //     document.getElementById("loadMoreButton").style.display = "none";
            // }
        })
        .catch((error) => console.error("Erreur:", error));
}

// Résultat de la recherche

function search() {
    const query = document.getElementById("searchInput").value.trim();

    if (query) {
        fetch(`https://85.215.181.173:5000/items/${query}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                content.innerHTML = ""; // Effacer les anciens résultats
                button.style.display = "none";

                if (data && data.length > 0 && bddToLoad != "cash") {
                    const message = document.createElement("h2");
                    message.textContent =
                        "Voici les résultat les plus proches de votre recherche";
                    message.style.width = "100%";
                    message.style.textAlign = "center";
                    content.appendChild(message);

                    // Afficher les résultats partiels triés par pertinence
                    loadBddElements(data);
                } else if (data && bddToLoad == "cash") {
                    loadCashElements(data);
                    console.log(data);
                } else {
                    // Afficher un message si aucun résultat n'est trouvé
                    const div = document.createElement("h2");
                    div.textContent = "Aucun résultat trouvé";
                    content.appendChild(div);
                }
            })
            .catch((error) =>
                console.error("Erreur lors de la recherche:", error)
            );
    } else {
        // Si la barre de recherche est vide
        content.innerHTML = "";
        startIndex = 0;
        button.style.display = "flex";
        start();
    }
}

async function canExecuteWait() {
    canExecute = false;
    await sleep(1000);
    canExecute = true;
}

// load more button
document.getElementById("loadMoreButton").addEventListener("click", () => {
    if (canExecute) {
        canExecuteWait();
        start();
    } else {
        alert("Wait 1 seconde before next requests");
    }
});

// search button
document.getElementById("searchButton").addEventListener("click", () => {
    if (canExecute) {
        canExecuteWait();
        search();
    } else {
        alert("Wait 1 seconde before next requests");
    }
});


// Ajouter un événement 'keypress' sur l'input
input.addEventListener('keypress', function(event) {
    if (canExecute) {
        if (event.key === 'Enter') { // Vérifie si la touche appuyée est 'Enter'
            canExecuteWait();
            event.preventDefault(); // Empêche le comportement par défaut si nécessaire
            search();
        }
    } else {
        alert("Wait 1 seconde before next requests")
    }
});


// ########## Gestion de l'interface et du changement de bdd #############

// Sélectionne tous les éléments de la barre de navigation
var navItems = document.querySelectorAll('.nav-href');

// Retire la classe 'active' de tous les éléments enfants 'div'
function removeActiveClass() {
    navItems.forEach(function(nav) {
        var childDiv = nav.querySelector('div');
        if (childDiv) {
            childDiv.classList.remove('active');
        }
    });
}

// Ajoute un écouteur d'événement 'click' à chaque élément
navItems.forEach(function(item) {
    item.addEventListener('click', function() {
        
        // Ajoute la classe 'active' à l'enfant 'div' de l'élément cliqué
        var clickedChildDiv = item.querySelector('div');
        if (clickedChildDiv) {
            if (window.location.href.split('#')[1] != item.href.split('#')[1] && item.classList[1] != 'no-load') {
                removeActiveClass()

                content.innerHTML = "";
                clickedChildDiv.classList.add('active');
                bddToLoad = item.href.split('#')[1];
                startIndex = 0;
            
                start();
                closeMenu();
            }
        }
    });
});

var onFirstLoad = window.location.href.split('#')[1];

if (onFirstLoad) {
    bddToLoad = onFirstLoad;
    removeActiveClass()
    for (var i = 0; i < navItems.length; i++) {
        if (navItems[i].href.split('#')[1] == onFirstLoad) {
            navItems[i].querySelector('div').classList.add('active');
            break;
        }
    }
} else {
    navItems[1].querySelector('div').classList.add('active');
}

start();