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

})