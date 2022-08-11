// Настройки слайдера в разделе партнеров.
let slider = tns({
    container: document.getElementById('partners__slider'),
    items: 1,
    mouseDrag: true,
    speed: 400,
    controls: false,
    nav: false,
    autoWidth: true,
    gutter: 30,
    rewind: true,
    swipeAngle: 80,
    responsive: {
        322: {
            items: 2
        },
        604: {
            items: 4
        },
        900: {
            items: 6
        }
    }
});


// Обработчик для меню-бургера.
let burger_icon_close = false;
let burger_btn = document.getElementById('header__burger_icon');

// За открытие и закрытие меню бургера отвечает один и тот же элемент.
// У него просто меняем атрибут src.
burger_btn.addEventListener('click', function() {
    let burger_icon_img = burger_btn.getElementsByTagName('img')[0];
    let burger_menu = document.getElementById('burger_menu');

    if (!burger_icon_close) {
        burger_icon_img.src = './img/close_burger.png'
        burger_icon_close = true;
        burger_menu.style.display = 'block';
    }
    else {
        burger_icon_img.src = './img/burger.png'
        burger_icon_close = false;
        burger_menu.style.display = 'none';
    }
});


// Обработчик анимации появления при скроле.
const animItems = document.querySelectorAll('._anim_items');

if (animItems.length > 0) {
    // Вешаем обработчик событий на окно при скроле.
    window.addEventListener('scroll', animOnScroll);

    // Функция, которая будет активировать CSS-анимации, добавляя класс _active.
    function animOnScroll() {
        // Проходимся по каждому элементу, подлежащему анимации при скролле.
        for (let i = 0; i < animItems.length; i++) {
            const animItem = animItems[i];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            // Коэффициент задержки анимации. 
            // Анимация срабатывает, когда будет видна 1/animStart часть объекта.
            const animStart = 2; 

            // Точка для запуска анимации.
            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            }
        }
    }

    // Кроссбраузерная функция для получения координат объекта.
    function offset(e1) {
        const rect = e1.getBoundingClientRect(),
            scrollLeft = window.scrollX || document.documentElement.scrollLeft,
            scrollTop = window.scrollY || document.documentElement.scrollTop;
        return {
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft
        }
    }

    // Каждая анимация будет срабатывать с задержкой в 300мс.
    setTimeout(() => {
        animOnScroll();
    }, 300);
}


let linkNav = document.querySelectorAll('[href^="#"]'), //выбираем все ссылки к якорю на странице
    V = 0.4;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
for (let i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function(e) { // по клику на ссылку
        e.preventDefault(); //отменяем стандартное поведение
        let w = window.scrollY,
            hash = this.href.replace(/[^#]*(.*)/, '$1');  // id элемента, к которому нужно перейти
        t = document.querySelector(hash).getBoundingClientRect().top - 64,  // отступ от окна браузера до id
            start = null;
        requestAnimationFrame(step);  // подробнее про функцию анимации [developer.mozilla.org]
        function step(time) {
            if (start === null) start = time;
            let progress = time - start,
                r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
            window.scrollTo(0,r);
            if (r != w + t) {
                requestAnimationFrame(step)
            } 
        }
    }, false);
}
