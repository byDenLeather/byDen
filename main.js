// Навигация и плавная прокрутка
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-list li a');
    const btnScroll = document.querySelector('.btn');

    menuToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navList.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Плавная прокрутка
    const smoothScroll = function(targetEl, duration) {
        const headerElHeight = document.querySelector('.navbar').clientHeight;
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerElHeight;
        let startPosition = window.pageYOffset;
        let startTime = null;

        const ease = function(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        const animation = function(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition - startPosition, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);
    };

    const scrollTo = function() {
        const links = document.querySelectorAll('.nav-list li a, .btn');
        links.forEach(each => {
            each.addEventListener('click', function(e) {
                e.preventDefault();
                const currentTarget = this.getAttribute('href');
                smoothScroll(currentTarget, 800);
            });
        });
    };
    scrollTo();

     // Модальное окно
     const modal = document.getElementById('image-modal');
     const modalImg = document.getElementById('modal-img');
     const captionText = document.getElementById('modal-caption');
     const closeModal = document.querySelector('.modal-close');
     const images = document.querySelectorAll('.gallery-item img');
 
     let currentIndex = 0;
 
     images.forEach(function(img, index) {
         img.addEventListener('click', function() {
             modal.style.display = 'block';
             modalImg.src = this.src;
             captionText.innerHTML = this.alt;
             document.body.classList.add('modal-open');
             currentIndex = index;
         });
     });
 
     closeModal.addEventListener('click', function() {
         modal.style.display = 'none';
         document.body.classList.remove('modal-open');
     });
 
     modal.addEventListener('click', function(e) {
         if (e.target === modal) {
             modal.style.display = 'none';
             document.body.classList.remove('modal-open');
         }
     });
 
     document.addEventListener('keydown', function(e) {
         if (e.key === 'Escape' && modal.style.display === 'block') {
             modal.style.display = 'none';
             document.body.classList.remove('modal-open');
         }
         // Навигация с клавиатуры
         if (e.key === 'ArrowLeft' && modal.style.display === 'block') {
             showImage(currentIndex - 1);
         }
         if (e.key === 'ArrowRight' && modal.style.display === 'block') {
             showImage(currentIndex + 1);
         }
     });
 
     // Функции переключения изображений
     function showImage(index) {
         if (index >= images.length) { index = 0; }
         if (index < 0) { index = images.length - 1; }
         modalImg.src = images[index].src;
         captionText.innerHTML = images[index].alt;
         currentIndex = index;
     }
 
     // Кнопки навигации
     const prevButton = document.querySelector('.modal-prev');
     const nextButton = document.querySelector('.modal-next');
 
     prevButton.addEventListener('click', function(e) {
         e.stopPropagation();
         showImage(currentIndex - 1);
     });
 
     nextButton.addEventListener('click', function(e) {
         e.stopPropagation();
         showImage(currentIndex + 1);
     });
});

