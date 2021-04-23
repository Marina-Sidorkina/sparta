(() => {
  const buttons = document.querySelectorAll(".review-list__button");
  const textBlocks = document.querySelectorAll(".review-list__text");

  const Parameters = {
    290: {
      fixed: 145,
      full: 240,
    },
    720: {
      fixed: 145,
      full: 260,
    },
    1170: {
      fixed: 175,
      full: 290,
    }
  }

  let state = false;
  let fixedHeight;
  let fullHeight;
  let width;

  function setValues() {
    width = document.querySelector(".reviews__container").offsetWidth;

    fixedHeight = Parameters[width]["fixed"];
    fullHeight = Parameters[width]["full"];

    setFixedHeight();
  }

  function setFullHeight() {
    state = true;

    textBlocks.forEach(item => {
      item.style.height = fullHeight + "px";
      item.style.overflowY = "scroll";
    })

    buttons.forEach(item => {
      item.classList.add("review-list__button--opened");
      item.textContent = "Свернуть обратно";
    })
  }

  function setFixedHeight() {
    state = false;

    textBlocks.forEach(item => {
      item.style.height = fixedHeight + "px";
      item.style.overflowY = "hidden";
    })

    buttons.forEach(item => {
      item.classList.remove("review-list__button--opened");
      item.textContent = "Читать весь отзыв";
    })
  }

  setValues();

  window.addEventListener("resize", setValues);

  buttons.forEach((item) => {
    item.addEventListener('click', () => {
      !state ? setFullHeight() : setFixedHeight();
    });
  })
})();
