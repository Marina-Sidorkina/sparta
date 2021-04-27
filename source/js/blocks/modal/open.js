const bodyElement = document.querySelector("body");
const closeButton = document.querySelector(".modal__close");
const modalElement = document.querySelector(".modal");
const openButtons = document.querySelectorAll(".risk-btn--open");
const controlWidth = 1170;

function openModal(evt) {
  let width = document.querySelector("body").offsetWidth;

  if(width >= controlWidth) {
    evt.preventDefault();
    modalElement.style.display = "block";
    bodyElement.classList.add("modal-open");
    bodyElement.style.paddingRight = "15px";
  }
}

function closeModal() {
  modalElement.style.display = "none";
  bodyElement.classList.remove("modal-open");
  bodyElement.style.paddingRight = "0";
}

openButtons.forEach(item => {
  item.addEventListener("click", openModal)
});

closeButton.addEventListener("click", closeModal);

window.addEventListener("resize", closeModal);
