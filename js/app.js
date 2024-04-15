const taskContainer = document.querySelector('.task-container')

function render(description) {
    const taskBlock = document.createElement('div')
    const title = document.createElement('p')
    const deleteElement = document.createElement('p')
    const controller = document.createElement('button')

    taskBlock.classList.add('task-block')
    deleteElement.classList.add('delete-icon')
    controller.classList.add('controller-button')
   
    title.textContent = description
    deleteElement.textContent = '✖'
    controller.textContent = 'start'

    
    taskBlock.append(deleteElement, title, controller)
    taskContainer.append(taskBlock)
}

render('Cześć!')