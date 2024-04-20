const taskContainer = document.querySelector('.task-container')
const submitButton = document.querySelector('.submit-button')
const timeLeftDisplay = document.querySelector('#time-left')
const sliderFill = document.querySelector('.fill')


const startCount = 25 * 60
// let a nie const!
let timeId
let timeLeft = startCount

let tasks = [
    {
        name: "Practise JS sort method",
        priority: 2
    },
    {
        name: "Adoration !",
        priority: 1
    },
    {
        name: "Chodakowska workout",
        priority: 3
    }
]

function convertToMin(secondsLeft) {
    const minutes = Math.floor(secondsLeft / 60)
    const seconds = secondsLeft - minutes * 60
    // to jest arcyciekawe, polecam Ania "converting seconds"
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}

function handleClick(button) {
    switch (button.textContent) {
        case 'active':
            button.textContent = 'paused'
            button.classList.add('paused')
            clearInterval(timeId)
            break
        case 'paused':
            button.textContent = 'active'
            button.classList.add('active')
            startCoundown(button)
            break
        default:
            const allButtons = document.querySelectorAll('.controller-button')
            allButtons.forEach( button => {
                button.textContent = 'start'
                button.classList.remove('active', 'paused')
                clearInterval(timeId)
                timeLeft = startCount
                timeLeftDisplay.textContent = convertToMin(timeLeft)
                sliderFill.style.width = (timeLeft / startCount) * 100 + '%'
            })
            button.textContent = 'active'
            button.classList.add('active')
            startCoundown(button)
            break
    }
}

function startCoundown(button) {
    timeId = setInterval(() => {
        timeLeft--
        timeLeftDisplay.textContent = convertToMin(timeLeft)
        sliderFill.style.width = (timeLeft / startCount) * 100 + '%'
        if (timeLeft <= 0) {
            clearInterval(timeId)

            delete deleteTask[button.id]
            button.parentNode.remove()
            timeLeft = startCount
            timeLeftDisplay.textContent = convertToMin(timeLeft)
            sliderFill.style.width = (timeLeft / startCount) * 100 + '%'
        }

    }, 1000)
}

const descendingTasks = tasks.sort((a, b) => a.priority - b.priority)

function render() {
    descendingTasks.forEach((task, index) => {
        const taskBlock = document.createElement('div')
        const title = document.createElement('p')
        const deleteElement = document.createElement('p')
        const controller = document.createElement('button')

        taskBlock.classList.add('task-block')
        deleteElement.classList.add('delete-icon')
        controller.classList.add('controller-button')

        title.textContent = task.name
        deleteElement.textContent = '✖'
        controller.textContent = 'start'

        // controller.setAttribute('id') = index lub
        controller.id = index
        // dodajemy index do zmiennych funkcji .forEach

        deleteElement.addEventListener('click', deleteTask)
        // jak dobrze rozumiem, to nie trzeba by tu był pisać callback function, ale że przechodzimy przez button to trzeba
        controller.addEventListener('click', () => handleClick(controller))

        taskBlock.append(deleteElement, title, controller)
        taskContainer.append(taskBlock)
    })
}

render()

function deleteTask(e) {
    console.log(e.target.parentNode)
    e.target.parentNode.remove()
    // console.log(tasks) to do make disappear from array !
}

function addTask() {
    console.log("przed kliknięciem: ", taskContainer)
    const input = document.querySelector('input')
    const value = input.value
    console.log(value)

    if (value) {
        taskContainer.innerHTML = ''
        input.value = ''
        tasks.push({
            name: value,
            priority: tasks.length
        })
        render()
        console.log('po kliknięciu: ', taskContainer)
    }

}
submitButton.addEventListener('click', addTask)