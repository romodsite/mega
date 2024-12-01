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