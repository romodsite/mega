const content = document.getElementById("content");
let startIndex = 0;
const input = document.getElementById('searchInput');
const divInput = document.getElementById('input');
var canExecute = true;

function loadCashElements(data) {
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
        link.target = "_blank"
        link.textContent = "Entrez dans l’aventure";
        contentDiv.appendChild(link);

        // Ajouter la div au body
        content.appendChild(contentDiv);
    })
}

function start() {
    fetch(`./testDatabaseCash.json`)
        .then((response) => response.json())
        .then((responseData) => {
            const data = responseData;
            startIndex += 40;

            if (data) {
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

start()