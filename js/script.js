window.addEventListener('DOMContentLoaded', (e) => {

    // Tabs
	let tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
	}

	function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
    });
 //tabs---------------------------------------------1

    //timer

    const deadLine = '2020-12-31';

    function getTImeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
            updateClock();

        function updateClock() {
            const t = getTImeRemaining(endtime);
            days.innerHTML = setZero(t.days);
            hours.innerHTML = setZero(t.hours);
            minutes.innerHTML = setZero(t.minutes);
            seconds.innerHTML = setZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }

    }
    setClock('.timer', deadLine);
//timer-----------------------------------------------------2

    // modal window

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }
    
    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 300000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
     //modal------------------------------------------3
     
     fetch('http://localhost:3000/menu')
     .then(data =>data.json())
     .then(res => console.log(res));

     // rabota s classes


     class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH(); 
        }

        changeToUAH() {
            this.price = this.price * this.transfer; 
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        ".menu .container"
    ).render();
        //forms
        const forms = document.querySelectorAll('form');
        const message = {
            loading: 'Загрузка...',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так...'
        };
    
        forms.forEach(item => {
            postData(item);
        });
    
        function postData(form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
    
                let statusMessage = document.createElement('div');
                statusMessage.classList.add('status');
                
                statusMessage.textContent = message.loading;
                form.insertAdjacentElement('afterend',statusMessage);
                const formData = new FormData(form);
                const object = {};
                formData.forEach(function(value, key){
                    object[key] = value;
                }); 

                fetch('server.php', {
                    method:'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(object)
                })
                .then(data => data.text())
                .then(data => {
                    console.log(data);
                        statusMessage.textContent = message.success;
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 2000);
                })
                .catch(() => {
                    statusMessage.textContent = message.failure;
                })
                .finally(() => {
                    form.reset();
                })

            });
        }

        //forms

     //slider

        let slider = document.querySelectorAll('.offer__slide'),
            prev = document.querySelector('.offer__slider-prev'),
            next = document.querySelector('.offer__slider-next'),
            current = document.querySelector('#current'),
            total = document.querySelector('#total'),
            slidesWrapper = document.querySelector('.offer__slider-wrapper'),
            slidesFiled = document.querySelector('.offer__slider-inner'),
            slideIndex = 1,
            offset = 0,
            width = window.getComputedStyle(slidesWrapper).width;

        if(slider.length < 10){
            total.textContent =`0${slider.length}`;
            current.textContent =`0${slideIndex}`;
        }else{
            total.textContent = slider.length;
            current.textContent =slideIndex;
        }

            slidesFiled.style.width = 100 * slider.length + '%';
            slidesFiled.style.display = 'flex';
            slidesFiled.style.transition = '0.5s all';

            slidesWrapper.style.overflow = 'hidden';
            slider.forEach(item => {
                item.style.width = width;
            });

            function deleteNan(str) {
                return +str.replace(/\D/g,'');
            }

        next.addEventListener('click',() => {
            if(offset == deleteNan(width)* (slider.length - 1)){
                offset = 0;
            }else{
                offset += deleteNan(width);
            }
            slidesFiled.style.transform = `translateX(-${offset}px)`;

            if(slideIndex == slider.length){
                slideIndex =1;
            }else{
                slideIndex++;
            }
            if(slider.length < 10){
                current.textContent = `0${slideIndex}`;
            }else{
                current.textContent=slideIndex;
            }
        });

        prev.addEventListener('click',() => {
            if( offset == 0){
                offset = deleteNan(width) * (slider.length - 1);
            }else{
                offset -= deleteNan(width);
            }
            slidesFiled.style.transform = `translateX(-${offset}px)`;
            if(slideIndex == 1){
                slideIndex = slider.length;
            }else{
                slideIndex--;
            }
            if(slider.length < 10){
                current.textContent = `0${slideIndex}`;
            }else{
                current.textContent=slideIndex;
            }
        });

//calculator
const result = document.querySelector('.calculating__result span');
let six,
    height,weight,age,
    ration;
    if (localStorage.getItem('six')) {
        six = localStorage.getItem('six');
    } else {
        six = 'female';
        localStorage.setItem('six', 'female');
    }

    if (localStorage.getItem('ration')) {
        ration = localStorage.getItem('ration');
    } else {
        ration = 1.375;
        localStorage.setItem('ration', 1.375);
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('six')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ration')) {
                elem.classList.add(activeClass);
            }
        });
    }
    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
function calcTotel() {
    if(!six || !height || !weight || !age || !ration) {
        result.textContent = '_______';
        return;

    }

    if(six === 'female') {
        result.textContent = Math.round(( 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) *ration);
    }else {
        result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ration);
    }
}
calcTotel();

function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
        elem.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-ratio')) {
                ration = +e.target.getAttribute('data-ratio');
                localStorage.setItem('ration',+e.target.getAttribute('data-ratio'));
            } else {
                six = e.target.getAttribute('id');
                localStorage.setItem('six',e.target.getAttribute('id'));
            }

            elements.forEach(elem => {
                elem.classList.remove(activeClass);
            });

            e.target.classList.add(activeClass);
            calcTotel();
        });
    });
}
getStaticInformation('#gender div', 'calculating__choose-item_active');
getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {
        if(input.value.match(/\D/g)) {
            input.style.border = '1px solid red';
        }else {
            input.style.border = 'none';
        }
        switch(input.getAttribute('id')) {
            case "height":
                height = +input.value;
                break;
            case "weight":
                weight = +input.value;
                break;
            case "age":
                age = +input.value;
                break;
        }

        calcTotel();
    });
}

getDynamicInformation('#height');
getDynamicInformation('#weight');
getDynamicInformation('#age');

});