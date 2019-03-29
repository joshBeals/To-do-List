var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
	todo: [],
	completed: []
};

console.log( JSON.parse(localStorage.getItem('todoList')) );

var removeIcon = '<i class="far fa-trash-alt"></i>';
var addIcon = '<i class="far fa-check-circle"></i>';

renderTodolList();

document.getElementById('add').addEventListener('click', function() {
	var value = document.getElementById('item').value;
	if (value) {
		add(value);
	}
});

document.getElementById('item').addEventListener('keydown', function (e) {
	var value = this.value;
	if (e.code === 'Enter' && value) {
		add(value);
	}
});

function add(value){
	data.todo.push(value);
	addEvent(value);
	document.getElementById('item').value = ''; 
	dataUpdate();
}

function renderTodolList(){
	if (!data.todo.length && !data.completed.length) {
		return;
	}
	for (var i = 0; i < data.todo.length; i++){
		var value = data.todo[i];
		addEvent(value);
	}
	for (var j = 0; j < data.completed.length; j++){
		var value = data.completed[j];
		addEvent(value,true);
	}
}

function dataUpdate(){
	localStorage.setItem('todoList', JSON.stringify(data));
}

function removeItem(){
	var item = this.parentNode.parentNode;
	var parent = item.parentNode;
	var id = parent.id;
	var value = item.innerText;

	if (id == 'todo'){
		data.todo.splice(data.todo.indexOf(value), 1);
	}else{
		data.completed.splice(data.todo.indexOf(value), 1);
	}
	dataUpdate();

	parent.removeChild(item);
}

function addItem(){
	var item = this.parentNode.parentNode;
	var parent = item.parentNode;
	var id = parent.id;
	var value = item.innerText;
	if (id == 'todo'){
		data.todo.splice(data.todo.indexOf(value), 1);
		data.completed.push(value);
	}else{
		data.completed.splice(data.todo.indexOf(value), 1);
		data.todo.push(value);
	}
	dataUpdate();
	

	var target = (id == 'todo') ? document.getElementById('completed'):document.getElementById('todo');
	parent.removeChild(item);
	target.insertBefore(item, target.childNodes[0]);
}	

function addEvent(text, completed){
	var list = (completed) ? document.getElementById('completed'):document.getElementById('todo');

	var item = document.createElement('li');
	item.innerText = text;

	var buttons = document.createElement('div');
	buttons.classList.add('btn');

	var remove = document.createElement('div');
	remove.classList.add('button');
	remove.classList.add('remove');
	remove.innerHTML = removeIcon;
	remove.addEventListener('click', removeItem);

	var add = document.createElement('div');
	add.classList.add('button');
	add.classList.add('complete');	 
	add.innerHTML = addIcon;
	add.addEventListener('click', addItem);

	buttons.appendChild(remove);
	buttons.appendChild(add);
	item.appendChild(buttons);

	list.insertBefore(item, list.childNodes[0]);
}