let burger_icon_close = false;
let slider = null;

window.onload = function() {
    // Настройки слайдера.
    slider = tns({
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
    document.getElementById('header__burger_icon')
            .addEventListener('click', function() {
                if (!burger_icon_close) {
                    document.getElementById('header__burger_icon')
                            .getElementsByTagName('img')[0].src = './img/close_burger.png'
                    burger_icon_close = true;
                    document.getElementById('burger_menu').style.display = 'block';
                }
                else {
                    document.getElementById('header__burger_icon')
                            .getElementsByTagName('img')[0].src = './img/burger.png'
                    burger_icon_close = false;
                    document.getElementById('burger_menu').style.display = 'none';
                }
            });
}
