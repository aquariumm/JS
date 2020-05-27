document.addEventListener('DOMContentLoaded', () => {
    const width = 10
    const grid = document.querySelector('.grid')
    for (var i = 0; i < 210; i++) {
        // grid.append('< div >' + '< /div>')
        if (i < 200)
            grid.innerHTML += '<div></div>'
        else
            grid.innerHTML += '<div class="taken"></div>'
    }
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const StartBtn = document.getElementById('start-button')
    const ScoreDisplay = document.getElementById('score')
    let timerId
    const mini_grid = document.querySelector('.mini-grid')
    for (var i = 0; i < 16; i++) {
        mini_grid.innerHTML += '<div></div>'
    }

    const displaySquares = document.querySelectorAll('.mini-grid div')
    const displayWidth = 4
    let displayIndex = 0
    let nextRandom = 0

    const upNextTetrominoes = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2],
        [0, 1, displayWidth, displayWidth + 1],
        [1, displayWidth, displayWidth + 1, displayWidth + 2],
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1],
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
    ]



    const lShapeTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ]

    const oShapeTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ]
    const tShapeTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ]
    const iShapeTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ]
    const zShapeTetromino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ]
    const tetrominoes = [lShapeTetromino, iShapeTetromino, oShapeTetromino, tShapeTetromino, zShapeTetromino]

    let currentPosition = 4
    let currentRotation = 0

    let random = Math.floor(Math.random() * tetrominoes.length)

    let current = tetrominoes[random][currentRotation]

    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
        })
    }


    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
        })
    }

    timerId = setInterval(moveDown, 1000)

    function control(e) {
        if (e.keyCode === 37) {
            moveLeft()
        } else if (e.keyCode === 38) {
            rotate()
        } else if (e.keyCode === 39) {
            moveRight()
        } else if (e.keyCode === 40) {
            moveDown()
        }
    }
    document.addEventListener('keyup', control)

    function moveDown() {
        undraw()
        currentPosition += width
        draw()
        freeze()
    }

    function freeze() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            random = Math.floor(Math.random() * tetrominoes.length)
            current = tetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
        }
    }


    function moveRight() {
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
        if (!isAtRightEdge) currentPosition += 1
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) currentPosition -= 1
        draw()
    }

    function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
        if (!isAtLeftEdge) currentPosition -= 1
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) currentPosition += 1
        draw()
    }


    function rotate() {
        undraw()
        currentRotation++
        currentRotation %= current.length
        current = tetrominoes[random][currentRotation]
        draw()
    }

    function displayShape() {
        displaySquares.forEach(squre => { squre.classList.remove('tetromino') })
        upNextTetrominoes[nextRandom]
    }

})