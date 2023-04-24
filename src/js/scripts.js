window.onload = () => {
    openPopup();
    dateDetection();
    startTimer();
    animBlockInScroll();
}

function dateDetection() {
    const currentDate = new Date();
    const monthNames = [
        'січня', 'лютого', 'березня', 'квітня', 'травня', 'червня',
        'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'
    ];
    currentDate.setDate(currentDate.getDate() - 5);
    const day = currentDate.getDate();
    const month = monthNames[currentDate.getMonth()];
    const year = currentDate.getFullYear();


    document.querySelector('.data').innerHTML = `Опублiковано: ${day} ${month} ${year} року`
}

function startTimer() {
    let minutes = 10;
    let seconds = minutes * 60;

    var timerInterval = setInterval(function () {
        let minutesDisplay = Math.floor(seconds / 60);
        let secondsDisplay = seconds % 60;
        if (secondsDisplay < 10) {
            secondsDisplay = '0' + secondsDisplay
        }
        if (minutesDisplay < 10) {
            minutesDisplay = '0' + minutesDisplay
        }
        document.querySelector('.timer').innerHTML = minutesDisplay + ' : ' + secondsDisplay;
        seconds--;
        if (seconds < 0) {
            clearInterval(timerInterval);
            document.querySelector('.timer').innerHTML = '00 : 00';
        }
    }, 1000);
}



function openPopup() {
    const popupElement = document.querySelector('.popup');
    const popupBody = popupElement.querySelector('.popup_content');

    const popupLink = popupElement.querySelector('.popup-link');
    const target = document.querySelector('#form');
    let targetLocation = target.getBoundingClientRect().top + window.pageYOffset;

    popupLink.addEventListener('click', (event) => {
        event.preventDefault();
        popupElement.classList.remove('open');
        document.body.style.overflow = '';
        window.scrollTo({
            top: targetLocation,
            behavior: "smooth"
        });
    })

    if (popupElement) {
        const closeElement = popupElement.querySelector('.popup-close');
        let isOpen = false;

        if (!isOpen) {
            setTimeout(() => {
                popupElement.classList.add('open');
                document.body.style.overflow = 'hidden';
                isOpen = true
            }, 20000);
        }
        document.addEventListener('mouseleave', () => {
            if (!isOpen) {
                isOpen = true;
                popupElement.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        });

        if (closeElement) {
            closeElement.addEventListener('click', function (event) {
                event.preventDefault()
                popupElement.classList.remove('open');
                document.body.style.overflow = '';
                isOpen = true;
            });
        }

        document.addEventListener('click', function (event) {
            if (!popupBody.contains(event.target)) {
                popupElement.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    } else {
        console.log('Попап не найден.');
    }
}

function animBlockInScroll() {
    const animItems = document.querySelectorAll(`.anim-items`);

    if (animItems.length > 0) {
        window.addEventListener(`scroll`, animOnScroll);
        window.addEventListener(`touchmove`, animOnScroll);
        window.addEventListener(`wheel`, animOnScroll);

        function animOnScroll() {
            animItems.forEach(element => {
                const animItem = element;
                const animItemHeight = animItem.offsetHeight;
                const animItemOffSet = offset(animItem).top;
                const animStart = 4;
                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                if (animItemHeight > window.innerHeight) {
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }
                if ((window.pageYOffset > animItemOffSet - animItemPoint) && window.pageYOffset < (animItemOffSet + animItemHeight)) {
                    animItem.classList.add(`active-anim`);
                }
            });
        }

        function offset(el) {
            const rect = el.getBoundingClientRect();
            let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return {
                top: rect.top + scrollTop,
                left: rect.left + scrollLeft
            };
        }
        setTimeout(() => {
            animOnScroll();
        }, 300)
    }
}