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
