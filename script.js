let headerElem = document.createElement('div');
let todoAll = [];
let todoActive = [];
let todoComplete = [];
let boolAll = false, boolActive = false, boolCompleted = false;
let h1Elem = document.createElement('h1');
var str = 'todos';
h1Elem.innerHTML = str;
let start = false;
headerElem.classList.add("container");
headerElem.append(h1Elem);
document.body.append(headerElem);


let mainElem = document.createElement('div');
let topElem = document.createElement('div');
topElem.classList.add('top-elem');
let labelTopElem = document.createElement('label');
labelTopElem.classList.add('top-label');
labelTopElem.innerHTML = '';
let inputElement = document.createElement('input');
inputElement.classList.add('inp-main');
inputElement.type = 'text';
inputElement.placeholder = 'What needs to be done?';
topElem.append(labelTopElem, inputElement);
mainElem.append(topElem);
document.body.append(mainElem);
mainElem.classList.add("container");
let ulElem = document.createElement('ul')
mainElem.append(ulElem);

inputElement.addEventListener('keyup',addTodo);


let buttonDiv = document.createElement('div');
buttonDiv.classList.add('button-section');
let labelElem = document.createElement('label');
if(todoAll.length > 1)
labelElem.innerHTML = `${todoAll.length} item left`;
else
labelElem.innerHTML = `${todoAll.length} items left`;
let mainButtonDiv = document.createElement('div');
mainButtonDiv.classList.add('main-buttons');


let allButton = document.createElement('button');
allButton.innerHTML = 'All';

allButton.addEventListener('click', fillAllHandler);
let activeButton = document.createElement('button');
activeButton.innerHTML = 'Active'; 
activeButton.addEventListener('click', fillActiveHandler);
let completedButton = document.createElement('button');
completedButton.innerHTML = 'Completed'; 
completedButton.addEventListener('click', fillCompletedHandler);


mainButtonDiv.append(allButton, activeButton, completedButton);

let clearButton = document.createElement('a');
clearButton.innerHTML= 'Clear Completed'; 
buttonDiv.append(labelElem, mainButtonDiv, clearButton );
mainElem.append(buttonDiv);
buttonDiv.style.display = 'none';
let liElem = document.createElement('li');
let todoItemElem = document.createElement('div');
let deleteTodoButtonElem = document.createElement('button');
let flipflopElem = document.createElement('input');
let todoFieldRepl = document.createElement('label');
let todoFieldElem = document.createElement('input');
liElem.classList.add('todo-element');
liElem.addEventListener('mouseover', function(e){
    deleteTodoButtonElem.style.display ='inline-block';
});
liElem.addEventListener('mouseleave', function(e){
    deleteTodoButtonElem.style.display ='none';
});
function addTodo(event) {
    console.log(inputElement.value);
    if(event.keyCode == 13) 
    {
        buttonDiv.style.display = 'block';
        let newTodo = {};
        newTodo['text'] = inputElement.value.trim();
        newTodo['status'] = 'active';
        if(newTodo['text'].length > 0){

            todoAll.push(newTodo);
            var str = '';
            fillAllTodo();
            fillActiveTodo();
            fillCompletedTodo();
            inputElement.value = '';
            inputElement.placeholder = 'What needs to be done?';
            if(cntActive() > 1)
                labelElem.innerHTML = `${cntActive()} items left`;
            else
            labelElem.innerHTML = `${cntActive()} item left`;
            console.log("HERE to print: "  +inputElement.value);
            labelTopElem.innerHTML = ' &#8964';
        }
        if(!start) {
            fillAllTodo();
            start = false;
            boolAll = true;
        }
        
    }   
}
function cntActive() {
    let cnt = 0;
    for(let i =0; i < todoAll.length; i++) {
        if(todoAll[i]['status'] == 'active')
            cnt++;

    }
    return cnt;
}
function generateHTML(todoObj) {
    todoItemElem.innerHTML = '';
    todoItemElem.classList.add('todo-item');
    //liElem.append(todoItemElem);
    
    flipflopElem.type = 'checkbox';
    flipflopElem.classList.add('flip-flop');
    if(todoObj['status'] === 'active')
        flipflopElem.checked = false;
    else
        flipflopElem.checked = true;
    
    deleteTodoButtonElem.textContent = 'X';
    deleteTodoButtonElem.classList.add('delete-button');
    todoItemElem.value =  todoObj['text'];
    todoFieldRepl.textContent = todoObj['text'];
    todoFieldRepl.classList.add('todo-field-repl');
    todoFieldElem.type = 'text';
    todoFieldElem.classList.add('todo-text-Field');
    todoFieldElem.value = todoObj['text'];
    todoFieldElem.style.display = 'none';
    
    todoItemElem.append(flipflopElem,todoFieldRepl, todoFieldElem, deleteTodoButtonElem);
    return todoItemElem.outerHTML;
}
function fillAllHandler(event) {
    fillAllTodo();
    boolAll = true, boolActive = false, boolCompleted = false;
}
function fillAllTodo() {
    ulElem.innerHTML = '';
    for(var i = 0; i < todoAll.length; i++) {
        let liElem = document.createElement('li');
        liElem.innerHTML = generateHTML(todoAll[i]);//REPLACE THIS LINE EVRYWHEEE
        ulElem.append(liElem);
    }
    makeButtonsWorking();
}
function fillActiveHandler(event) {
    fillActiveTodo();
    boolAll = false, boolActive = true, boolCompleted = false;
}
function fillActiveTodo() {
    ulElem.innerHTML = '';
   // console.log(todoActive.length);
    for(var i = 0; i < todoAll.length; i++) {
        if(todoAll[i].status == 'active') {
            let liElem = document.createElement('li');
            liElem.innerHTML = generateHTML(todoAll[i]);
            ulElem.append(liElem);
        }
    }
    makeButtonsWorking();
}
function fillCompletedHandler(event) {
    fillCompletedTodo();
    boolAll = false, boolActive = false, boolCompleted = true;
}
function fillCompletedTodo() {
    ulElem.innerHTML = '';
    //console.log(todoActive.length);
    for(var i = 0; i < todoAll.length; i++) {
        if(todoAll[i].status == 'completed'){
            let liElem = document.createElement('li');
            liElem.innerHTML = generateHTML(todoAll[i]);
            ulElem.append(liElem);
        }
    }
    makeButtonsWorking();
}
function makeButtonsWorking(){
    let flipflopElemArr = document.body.querySelectorAll('.flip-flop');
    var indArrActive = todoAll.reduce((acc, ele, indexNew) =>{
        if(ele['status'] == 'active')
        acc.push(indexNew);
        return acc;
    },[]);
    var indArrCompleted = todoAll.reduce((acc, ele, indexNew) =>{
        if(ele['status'] == 'completed')
        acc.push(indexNew);
        return acc;
    },[]);
    flipflopElemArr.forEach((elem, index) => {
            elem.addEventListener('click', function(e){
            console.log(flipflopElemArr.length);
            if(boolAll = true){
                if(this.checked) {
                    console.log('completed');
                    (todoAll[index])['status'] = 'completed';
                }
                else
                    (todoAll[index])['status'] = 'active';
            }
            else if(boolActive) {
                if(this.checked) {
                    (indArrActive[index])['status'] = 'completed';
                }
                else
                    (indArrActive[index])['status'] = 'active';
            }
            else if(boolCompleted) {
                if(this.checked) {
                    (indArrCompleted[index])['status'] = 'completed';
                }
                else
                    (indArrCompleted[index])['status'] = 'active';
            }
            //fillAllHandler(e);
            if(cntActive() > 1)
                labelElem.innerHTML = `${cntActive()} items left`;
            else
            labelElem.innerHTML = `${cntActive()} item left`;
        });
    });
    let todoFieldReplElemArr = document.body.querySelectorAll('.todo-field-repl');
    todoFieldReplElemArr.forEach(elem => {
        elem.addEventListener('click', function(e){
        this.style.display='none';
        let elemNew = elem.parentElement;
        let elemN = elemNew.querySelector('.todo-text-Field');
        elemN.innerHTML = elem.textContent;
        elemN.style.display= 'inline-block';
        let elemM = elemNew.querySelector('.delete-button');
        elemM.style.display= 'none';
        });
    });
    let liElemArr = document.body.querySelectorAll('li');
    liElemArr.forEach(elem => {
        elem.addEventListener('mouseover', function(e) {
            let elemM = elem.querySelector('.delete-button');
            elemM.style.display= 'inline-block';
        });
        elem.addEventListener('mouseleave', function(e) {
            let elemM = elem.querySelector('.delete-button');
            elemM.style.display= 'none';
        });
        
    });
    clearButton.addEventListener('click', function(e){
        todoAll = todoAll.reduce((acc, elem) =>{
            if(elem['status'] == 'active')
                acc.push(elem);
            return acc;
        },[]);
        fillAllTodo();
        fillActiveTodo();
        fillCompletedTodo();
    });
    
   
}