document.addEventListener('DOMContentLoaded', () => {
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
      const wrapper = sliderWrapper;
      const wrapperParent = wrapper.parentElement;
      const offset = -(selectedImage.offsetLeft - (wrapperParent.clientWidth - selectedImage.clientWidth) / 2);
      wrapper.style.transform = `translateX(${offset}px)`;
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

    Promise.all(
      images.map(img => {
        return new Promise(resolve => {
          if (img.complete && img.naturalWidth > 0) {
            resolve();
          } else {
            img.onload = img.onerror = () => resolve();
          }
        });
      })
    ).then(() => {
     
      setTimeout(() => {
        updateSlider();
        startAutoSlide();
      }, 300); 
    });
  }
  
  if (images.length > 0) {
    initSlider();
  }
});

});



