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

    swipeMenu.querySelector('.menuItem.active').classList.remove('active');
    swipeMenu.style.top = pos + 'px';
    item.classList.add('active');

}

function carruselSwipe(el, callback) {
    var touchsurface = el,
        swipedir,
        startX,
        startY,
        distX,
        distY,
        threshold = 150,
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