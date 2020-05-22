document.addEventListener('DOMContentLoaded', () => {
    const width = 10
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const StartBtn = document.getElementById('#start-button')
    const ScoreDisplay = document.getElementById('#score')

    const lShapeTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ]
})