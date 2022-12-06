let menubutton = document.querySelector('.main-navigation__toggle');
let navmenu = document.querySelector('.main-navigation__navigation-menu');
function toggleMenu() {
  if (navmenu.classList.contains('main-navigation__navigation-menu--open') === true) {
    navmenu.classList.remove('main-navigation__navigation-menu--open');
  }
  else {
    navmenu.classList.add('main-navigation__navigation-menu--open');
  }
}
menubutton.addEventListener('click', toggleMenu);
