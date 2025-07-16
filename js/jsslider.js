window.addEventListener('load', () => {
  const sliderWrapper = document.getElementById('sliderWrapper');
  const images = Array.from(sliderWrapper.querySelectorAll('.slider-img'));
  const dotsContainer = document.getElementById('sliderDots');

  let currentIndex = 0;
  let interval;

  function initSlider() {
    dotsContainer.innerHTML = '';

    images.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });

    const updateSlider = () => {
      images.forEach(img => img.classList.remove('active'));
      images[currentIndex].classList.add('active');

      const allDots = dotsContainer.querySelectorAll('.dot');
      allDots.forEach(dot => dot.classList.remove('active'));
      if (allDots[currentIndex]) {
        allDots[currentIndex].classList.add('active');
      }

      const selectedImage = images[currentIndex];
      const wrapperParent = sliderWrapper.parentElement;
      const offset = -(selectedImage.offsetLeft - (wrapperParent.clientWidth - selectedImage.clientWidth) / 2);
      sliderWrapper.style.transform = `translateX(${offset}px)`;
    };

    const goToSlide = index => {
      currentIndex = index;
      updateSlider();
    };

    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateSlider();
    };

    const startAutoSlide = () => {
      interval = setInterval(nextSlide, 3000);
    };

    const stopAutoSlide = () => clearInterval(interval);

    sliderWrapper.parentElement.addEventListener('mouseenter', stopAutoSlide);
    sliderWrapper.parentElement.addEventListener('mouseleave', startAutoSlide);

    setTimeout(() => {
      updateSlider();
      startAutoSlide();
    }, 200);
  }

  if (images.length > 0) {
    initSlider();
  }
});

});



