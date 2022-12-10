let menubutton = document.querySelector('.main-navigation__toggle');
let navmenu = document.querySelector('.main-navigation__navigation-menu');
let iconBurger = document.querySelector('.menu-toggle__burger');
let iconCross = document.querySelector('.menu-toggle__cross');

function toggleMenu() {
  if (navmenu.classList.contains('main-navigation__navigation-menu--open') === true) {
    navmenu.classList.remove('main-navigation__navigation-menu--open');
    iconBurger.classList.remove('menu-toggle__burger--invisible');
    iconCross.classList.remove('menu-toggle__cross--visible');
  }
  else {
    navmenu.classList.add('main-navigation__navigation-menu--open');
    iconBurger.classList.add('menu-toggle__burger--invisible');
    iconCross.classList.add('menu-toggle__cross--visible');
  }
}
menubutton.addEventListener('click', toggleMenu);
