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