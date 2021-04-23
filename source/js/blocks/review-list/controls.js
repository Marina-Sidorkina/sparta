(() => {
  const items = document.querySelectorAll(".review-list__item");
  const line = document.querySelector(".review-list");
  const indicators = document.querySelectorAll(".control__desgin");
  const inputs = document.querySelectorAll(".control__radio");
  const buttons = document.querySelectorAll(".review-list__button");
  const leftControl = document.querySelector(".control__left");
  const rightControl = document.querySelector(".control__right");

  let count = 0;
  let width;

  function roll() {
    line.style.transform = "translate(-" + count * width + "px)";
  }

  function init() {
    width = document.querySelector(".reviews__container").offsetWidth;
    roll();
  }

  function setTabindex(i) {
    buttons.forEach((item, index) => {
      let value = index === i ? "0" : "-1";
      item.setAttribute("tabindex", value);
    });
  }

  function moveRight() {
    if (count < items.length - 1) {
      count++;
      roll();
      inputs[count].checked = true;
      setTabindex(count);
    }
  }

  function moveLeft() {
    if (count > 0) {
      count--;
      roll();
      inputs[count].checked = true;
      setTabindex(count);
    }
  }

  init();
  setTabindex(count);

  window.addEventListener("resize", init);

  rightControl.addEventListener("click", moveRight);

  leftControl.addEventListener("click", moveLeft);

  indicators.forEach((item, index) => {
    item.addEventListener("click", function () {
      count = index;
      roll();
      setTabindex(count);
    })
  })
})();
