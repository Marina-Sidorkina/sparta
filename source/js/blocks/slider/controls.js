(() => {
  const sliderItems = document.querySelectorAll('.review-list__item');
  const sliderLine = document.querySelector('.review-list');
  const sliderIndicators = document.querySelectorAll('.control__desgin');
  const sliderInputs = document.querySelectorAll('.control__radio');
  const sliderButtons = document.querySelectorAll('.review-list__button');
  const sliderLeftControl = document.querySelector('.control__left');
  const sliderRightControl = document.querySelector('.control__right');

  let count = 0;
  let width;

  function rollSlider() {
    sliderLine.style.transform = 'translate(-' + count * width + 'px)';
  }

  function initSlider() {
    width = document.querySelector('.reviews__container').offsetWidth;
    rollSlider();
  }

  function setTabindex(i) {
    sliderButtons.forEach((item, index) => {
      let value = index === i ? '0' : '-1';
      item.setAttribute('tabindex', value);
    });
  }

  function moveSliderRight() {
    if (count < sliderItems.length - 1) {
      count++;
      rollSlider();
      sliderInputs[count].checked = true;
      setTabindex(count);
    }
  }

  function moveSliderLeft() {
    if (count > 0) {
      count--;
      rollSlider();
      sliderInputs[count].checked = true;
      setTabindex(count);
    }
  }

  initSlider();
  setTabindex(count);

  window.addEventListener('resize', initSlider);

  sliderRightControl.addEventListener('click', moveSliderRight);

  sliderLeftControl.addEventListener('click', moveSliderLeft);

  sliderIndicators.forEach((item, index) => {
    item.addEventListener('click', function () {
      count = index;
      rollSlider();
      setTabindex(count);
    })
  })
})();
