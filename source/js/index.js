const sliderItems = document.querySelectorAll('.review-list__item');
const sliderLine = document.querySelector('.review-list');
const sliderControls = document.querySelectorAll('.control__item');
const sliderButtons = document.querySelectorAll('.review-list__button');
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
    sliderControls[count].querySelector('.control__radio').checked = true;
    setTabindex(count);
  }
}

function moveSliderLeft() {
  if (count > 0) {
    count--;
    rollSlider();
    sliderControls[count].querySelector('.control__radio').checked = true;
    setTabindex(count);
  }
}

initSlider();
setTabindex(count);

window.addEventListener('resize', initSlider);

document.querySelector('.control__right').addEventListener('click', moveSliderRight);

document.querySelector('.control__left').addEventListener('click', moveSliderLeft);

sliderControls.forEach((item, index) => {
  item.querySelector('.control__desgin').addEventListener('click', function() {
    count = index;
    rollSlider();
    setTabindex(count);
  })
})
