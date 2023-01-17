let showErrorButton = document.querySelector('.showerror-debug');
let OKErrorButton = document.querySelector('.modal-error__button')
let errorWindow = document.querySelector('.modal-container .modal-error');

let showErrorWindow = function () {
  errorWindow.parentNode.classList.add('modal-container--open');
}
let hideErrorWindow = function () {
  errorWindow.parentNode.classList.remove('modal-container--open');
}


showErrorButton.addEventListener('click', showErrorWindow);
OKErrorButton.addEventListener('click', hideErrorWindow);
