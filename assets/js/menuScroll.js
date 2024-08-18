let startX, startY, endX, endY, pos = 0;

document.addEventListener("DOMContentLoaded", () => {
    const swipeMenu = document.querySelector('#swipeMenu .menu');

    carruselSwipe(swipeMenu, function (swipedir) {
        if (swipedir != 'none') {
            if (swipedir == 'right' || swipedir == 'up') {
                moveMenu('down')
            }
            else if (swipedir == 'left' || swipedir == 'down') {
                moveMenu('up')
            }
        }
    });

    swipeMenu.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) return;
        let startY = event.touches[0].clientY;

        const onTouchMove = function (event) {
            let moveY = event.touches[0].clientY;
            if (moveY > startY) {
                event.preventDefault();
            }
        };

        swipeMenu.addEventListener('touchmove', onTouchMove, { passive: false });

        swipeMenu.addEventListener('touchend', function () {
            swipeMenu.removeEventListener('touchmove', onTouchMove);
        }, { once: true });
    });
});

function moveMenu(dir) {
    const swipeMenu = document.querySelector('#swipeMenu .menu');

    if (dir == 'up') {
        pos = pos + 77;
    }
    else {
        pos = pos - 77;
    }

    let item = swipeMenu.querySelector('[data-position="' + pos + '"]')

    if (item == null || item == undefined) {
        if (dir == 'up') {
            pos = parseInt(swipeMenu.dataset.max);
        }
        else {
            pos = parseInt(swipeMenu.dataset.min);
        }

        item = swipeMenu.querySelector('[data-position="' + pos + '"]')
    }

    swipeMenu.querySelector('.menuArticolo.attivo').classList.remove('attivo');
    swipeMenu.style.top = pos + 'px';
    item.classList.add('attivo');

}

function carruselSwipe(el, callback) {
    var touchsurface = el,
        swipedir,
        startX,
        startY,
        distX,
        distY,
        threshold = 65,
        restraint = 100,
        allowedTime = 300,
        elapsedTime,
        startTime,
        handleswipe = callback || function (swipedir) { }

    touchsurface.addEventListener('touchstart', function (e) {
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime()
    }, false)

    touchsurface.addEventListener('touchend', function (e) {
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX
        distY = touchobj.pageY - startY
        elapsedTime = new Date().getTime() - startTime
        if (elapsedTime <= allowedTime) {
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                swipedir = (distX < 0) ? 'left' : 'right'
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
                swipedir = (distY < 0) ? 'up' : 'down'
            }
        }
        handleswipe(swipedir)
    }, false)
}