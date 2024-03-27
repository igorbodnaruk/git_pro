//-------------------- список справ
let tasks = []

function addTask() {
	const taskInput = document.getElementById('task-input')
	const taskText = taskInput.value.trim()

	if (taskText !== '') {
		tasks.push({ text: taskText, completed: false })
		renderTasks()
		taskInput.value = ''
	}
}

function toggleCompleted(index) {
	tasks[index].completed = !tasks[index].completed
	renderTasks()
}

function deleteTask(index) {
	tasks.splice(index, 1)
	renderTasks()
}

function renderTasks() {
	const tasksContainer = document.getElementById('tasks')
	tasksContainer.innerHTML = ''

	tasks.forEach((task, index) => {
		const taskItem = document.createElement('div')
		taskItem.classList.add('task-item')
		if (task.completed) {
			taskItem.classList.add('completed')
		}
		taskItem.innerHTML = `
                    <input type="checkbox" onchange="toggleCompleted(${index})" ${
			task.completed ? 'checked' : ''
		}>
                    <span>${task.text}</span>
                    <button onclick="deleteTask(${index})">Удалить</button>
                `
		tasksContainer.appendChild(taskItem)
	})
}
// ------------------таймер
let timerInterval
let totalSeconds = 0

function startTimer() {
	if (!timerInterval) {
		timerInterval = setInterval(updateTimer, 1000)
	}
}

function pauseTimer() {
	clearInterval(timerInterval)
	timerInterval = null
}

function resetTimer() {
	clearInterval(timerInterval)
	timerInterval = null
	totalSeconds = 0
	updateTimer()
}

function updateTimer() {
	totalSeconds++
	const hours = Math.floor(totalSeconds / 3600)
	const minutes = Math.floor((totalSeconds % 3600) / 60)
	const seconds = totalSeconds % 60
	const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(
		seconds
	)}`
	document.getElementById('timer').textContent = formattedTime
}

function padZero(num) {
	return (num < 10 ? '0' : '') + num
}
// КОНТЕКСТНЕ МИНЮ
const target = document.getElementById('target')
const contextMenu = document.getElementById('context-menu')

target.addEventListener('contextmenu', function (event) {
	event.preventDefault()
	showContextMenu(event.clientX, event.clientY)
})

function showContextMenu(x, y) {
	contextMenu.style.display = 'block'
	contextMenu.style.left = x + 'px'
	contextMenu.style.top = y + 'px'

	document.addEventListener('click', closeContextMenu)
}

function closeContextMenu() {
	contextMenu.style.display = 'none'
	document.removeEventListener('click', closeContextMenu)
}

function menuItemClicked(action) {
	alert('Выбрано: ' + action)
}
// -----------КАЛЬКУЛЯТОР
function appendToDisplay(value) {
	document.getElementById('display').value += value
}

function clearDisplay() {
	document.getElementById('display').value = ''
}

function calculate() {
	const expression = document.getElementById('display').value
	try {
		const result = eval(expression)
		document.getElementById('display').value = result
	} catch (error) {
		document.getElementById('display').value = 'Error'
	}
}