let showSuccessButton = document.querySelector('.showsuccess-debug');
let OKSuccessButton = document.querySelector('.modal-success__button')
let SuccessWindow = document.querySelector('.modal-container .modal-success');

let showSuccessWindow = function () {
  SuccessWindow.parentNode.classList.add('modal-container--open');
}
let hideSuccessWindow = function () {
  SuccessWindow.parentNode.classList.remove('modal-container--open');
}


showSuccessButton.addEventListener('click', showSuccessWindow);
OKSuccessButton.addEventListener('click', hideSuccessWindow);
