let startX, startY, endX, endY, pos = 0;

document.addEventListener("DOMContentLoaded", () => {
    const swipeMenu = document.getElementById('swipeMenu');

    swipeMenu.addEventListener('touchstart', function (e) {
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
    });

    swipeMenu.addEventListener('touchmove', function (e) {
        const touch = e.touches[0];
        endX = touch.clientX;
        endY = touch.clientY;
    });

    swipeMenu.addEventListener('touchend', function (e) {
        const deltaX = endX - startX;
        const deltaY = endY - startY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 0) {
                moveMenu('down')
            } else {
                moveMenu('up')
            }
        } else {
            if (deltaY > 0) {
                moveMenu('up')
            } else {
                moveMenu('down')
            }
        }
    });
});

function moveMenu(dir) {
    const swipeMenu = document.getElementById('swipeMenu');

    if (dir == 'up') {
        pos = pos + 77;
    }
    else {
        pos = pos - 77;
    }

    let item = swipeMenu.querySelector('[data-position="' + pos + '"]')

    if (item != null && item != undefined) {
        swipeMenu.querySelector('.menuItem.active').classList.remove('active');
        swipeMenu.style.top = pos + 'px';
        item.classList.add('active');
    }

}