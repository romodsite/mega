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
