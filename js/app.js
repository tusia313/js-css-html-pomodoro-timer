const taskContainer = document.querySelector('.task-container')

let tasks = [
    {
        name: "Practise JS sort method",
        priority: 2
    },
    {
        name: "Adoration !",
        priority: 1
    }
]
// sort by priority
const descendingTasks = tasks.sort((a, b) => a.priority - b.priority)

function render() {
    descendingTasks.forEach(task => {
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

        deleteElement.addEventListener('click', deleteTask)

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