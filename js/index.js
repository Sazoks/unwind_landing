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
    window.addEventListener('scroll', animOnScroll);

    function animOnScroll() {
        for (let i = 0; i < animItems.length; i++) {
            const animItem = animItems[i];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 3;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            }
        }
    }

    function offset(e1) {
        const rect = e1.getBoundingClientRect(),
            scrollLeft = window.scrollX || document.documentElement.scrollLeft,
            scrollTop = window.scrollY || document.documentElement.scrollTop;
        return {
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft
        }
    }

    setTimeout(() => {
        animOnScroll();
    }, 300);
}


// собираем все якоря; устанавливаем время анимации и количество кадров
const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
      animationTime = 300,
      framesCount = 20;

anchors.forEach(function(item) {
  // каждому якорю присваиваем обработчик события
  item.addEventListener('click', function(e) {
    // убираем стандартное поведение
    e.preventDefault();
    
    // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
    let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;
    
    // запускаем интервал, в котором
    let scroller = setInterval(function() {
      // считаем на сколько скроллить за 1 такт
      let scrollBy = coordY / framesCount;
      
      // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
      // и дно страницы не достигнуто
      if(scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
        // то скроллим на к-во пикселей, которое соответствует одному такту
        window.scrollBy(0, scrollBy);
      } else {
        // иначе добираемся до элемента и выходим из интервала
        window.scrollTo(0, coordY);
        clearInterval(scroller);
      }
    // время интервала равняется частному от времени анимации и к-ва кадров
    }, animationTime / framesCount);
  });
});
