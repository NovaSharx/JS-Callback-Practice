let characterVerticalPosition = 0

function move(element) {
    element.style.position = 'fixed'

    function moveToCoordinates(left, bottom) {
        element.style.left = left + 'px'
        element.style.bottom = bottom + 'px'

        setInterval(function imageDepthUpdate() {
            if (characterVerticalPosition < element.style.bottom) {
                element.style.zIndex = "-1"
            }
            else {
                element.style.zIndex = "1"
            }
        }, 1)
    }

    function moveWithArrowKeys(left, bottom, callback) {
        let direction = null
        let x = left
        let y = bottom

        element.style.left = x + 'px'
        element.style.bottom = y + 'px'

        setInterval(function (left, bottom) {
            if (direction === 'west' && x > 0) {
                x = x - 1
            }
            if (direction === 'north' && y < window.innerHeight-75) {
                y = y + 1
            }
            if (direction === 'east' && x < window.innerWidth-50) {
                x = x + 1
            }
            if (direction === 'south' && y > 0) {
                y = y - 1
            }
            element.style.left = x + 'px'
            element.style.bottom = y + 'px'

            characterVerticalPosition = element.style.bottom

        }, 1)

        document.addEventListener('keydown', function (e) {
            if (e.repeat) return;

            if (e.key === 'ArrowLeft') {
                direction = 'west'
            }
            if (e.key === 'ArrowUp') {
                direction = 'north'
            }
            if (e.key === 'ArrowRight') {
                direction = 'east'
            }
            if (e.key === 'ArrowDown') {
                direction = 'south'
            }
            if (callback !== undefined) {
                callback(direction)
            }
        })

        document.addEventListener('keyup', function (e) {
            direction = null
            if (callback !== undefined) {
                callback(direction)
            }
        })
    }

    return {
        to: moveToCoordinates,
        withArrowKeys: moveWithArrowKeys
    }
}