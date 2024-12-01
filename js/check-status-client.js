const botLeak = document.getElementById("botLeak");
const statusBanner = document.getElementById("global-status");

function isMoreThanTwoHoursOld(pythonDate) {
    const now = new Date();
    const pythonTime = new Date(pythonDate);

    const diffInHours = (now - pythonTime) / (1000 * 60 * 60);

    return diffInHours > 2;
}

fetch(`status.json`)
    .then((response) => response.json())
    .then((responseData) => {
        const botLeakStatus = isMoreThanTwoHoursOld(responseData.botLeakStatus);

        if (!botLeakStatus) {
            botLeak.textContent = "opérationnel";
        } else {
            botLeak.textContent = "inopérationnel";
            botLeak.classList.remove("operational")
            botLeak.classList.add("inoperational")

            statusBanner.style.backgroundColor = "red";
            statusBanner.querySelector("h2").textContent = "Nous avons un problème général sur nos systèmes";
        }
        
    })
    .catch((error) =>
        console.error("Erreur lors de la recherche:", error)
    );
