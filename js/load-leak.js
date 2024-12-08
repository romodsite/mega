const content = document.getElementById("content");
const button = document.getElementById("loadMoreButton");
let startIndex = 0;
const input = document.getElementById('searchInput');
const divInput = document.getElementById('input');
var canExecute = true;
const nLeak = document.getElementById('nLeak');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function loadBddElements(data) {
    if (data.message) {
        showMessage("Trop de requêtes, réessayer dans 1 minutes.")
        return
    }
    startIndex += 40;
    
    // Ajouter les nouveaux éléments au contenu
    data.forEach((item) => {
        const divContentBox = document.createElement("div");
        divContentBox.classList.add("content-box");
        
        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.name
        img.fetchPriority = "high";
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

        divContentBox.appendChild(img);

        divForTimeAndName.appendChild(h3);
        divForTimeAndName.appendChild(time);
        divForTimeAndName.appendChild(a);
        divContentBox.appendChild(divForTimeAndName);

        content.appendChild(divContentBox);
    });
}

function search() {
    const query = document.getElementById("searchInput").value.trim();

    if (query) {
        fetch(`https://api.megafree.xyz/items/${query}`)
            .then((response) => response.json())
            .then((data) => {
                content.innerHTML = ""; // Effacer les anciens résultats
                button.style.display = "none";

                if (data && data.length > 0) {
                    const message = document.createElement("h2");
                    message.textContent =
                        "Voici les résultat les plus proches de votre recherche";
                    message.style.width = "100%";
                    message.style.textAlign = "center";
                    content.appendChild(message);

                    // Afficher les résultats partiels triés par pertinence
                    loadBddElements(data);
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

function start(){
    fetch(`https://api.megafree.xyz/items/${startIndex}/40`)
        .then((response) => response.json())
        .then((responseData) => {
            const data = responseData;

            if (responseData.length < 40 || responseData.length == 0) {
                document.getElementById("loadMoreButton").style.display = "none";
            }

            if (data) {
                loadBddElements(data);
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
        showMessage("Wait before next click");
    }
});

// search button
document.getElementById("searchButton").addEventListener("click", () => {
    if (canExecute) {
        canExecuteWait();
        search();
    } else {
        showMessage("Wait before next search");
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
        showMessage("Wait before next search")
    }
});

fetch(`https://api.megafree.xyz/countItems`)
    .then((response) => response.json())
    .then((responseData) => {
        const data = responseData;

        if (responseData.length < 40 || responseData.length == 0) {
            document.getElementById("loadMoreButton").style.display = "none";
        }

        if (data) {
            nLeak.textContent = data["nLeak"];
        } else {
            nLeak.textContent = "Bad response from server";
        }
        
        // Désactiver le bouton si `nextStartIndex` est null
        // if (startIndex === null) {
        //     document.getElementById("loadMoreButton").style.display = "none";
        // }
    })
.catch((error) => console.error("Erreur:", error));

start();
