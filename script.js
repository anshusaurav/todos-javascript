let headerElem = document.createElement('div');
let todoAll = [];
let todoActive = [];
let todoComplete = [];
let boolAll = false, boolActive = false, boolCompleted = false;
let h1Elem = document.createElement('h1');
var str = 'todos';
h1Elem.innerHTML = str;
let start = false;
let selectAllBoolean = false;
headerElem.classList.add("container");
headerElem.append(h1Elem);
document.body.append(headerElem);


let mainElem = document.createElement('div');
let topElem = document.createElement('div');
topElem.classList.add('top-elem');
let labelTopElem = document.createElement('label');
labelTopElem.classList.add('top-label');
labelTopElem.addEventListener('click', toggleAll);
labelTopElem.addEventListener('mousedown', function(e){ e.preventDefault(); }, false);
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

let footerElem = document.createElement('div');
footerElem.classList.add('smallest-container');
footerElem.innerHTML = `<p>Double click to edit a todo</p>
                        <p>Written by <a href ='http://www.anshusaurabh.codes' target=' blank'>Anshu Saurabh</a></p>
                        <p>Inspired by <a href = 'http://todomvc.com/' target=' blank'>Evan You(MVCTodo)</p></p>`;
document.body.append(footerElem);
let buttonDiv = document.createElement('div');
buttonDiv.classList.add('button-section');
let labelElem = document.createElement('label');
labelElem.classList.add('counter-label');
if(todoAll.length > 1)
    labelElem.innerHTML = `${todoAll.length} item left`;
else
    labelElem.innerHTML = `${todoAll.length} items left`;
let mainButtonDiv = document.createElement('div');
mainButtonDiv.classList.add('main-buttons');


let allButton = document.createElement('button');
allButton.innerHTML = 'All';

allButton.addEventListener('click', fillAllHandler);
allButton.classList.add('footer-btn');
let activeButton = document.createElement('button');
activeButton.innerHTML = 'Active'; 
activeButton.classList.add('footer-btn');
activeButton.addEventListener('click', fillActiveHandler);
let completedButton = document.createElement('button');
completedButton.innerHTML = 'Completed'; 
completedButton.classList.add('footer-btn');
completedButton.addEventListener('click', fillCompletedHandler);

let divPreLast = document.createElement('div');
let divLast = document.createElement('div');
divPreLast.classList.add('pre-last-div');
divLast.classList.add('last-div');
divPreLast.classList.add('medium-container');
divLast.classList.add('small-container');

mainButtonDiv.append(allButton, activeButton, completedButton);

let clearButton = document.createElement('a');
clearButton.innerHTML= 'Clear Completed';
clearButton.classList.add('clear-button'); 
clearButton.addEventListener('click', clearCompletedHandler);
buttonDiv.append(labelElem, mainButtonDiv, clearButton );
mainElem.append(buttonDiv);
mainElem.append(divPreLast);
mainElem.append(divLast);
buttonDiv.style.display = 'none';
divPreLast.style.display = 'none';
divLast.style.display = 'none';
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
        buttonDiv.style.display = 'grid';
        divPreLast.style.display = 'block';
        divLast.style.display = 'block';
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
            labelTopElem.innerHTML = '  &#11167';
            labelTopElem.style.color = '#999';
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
    flipflopElem.type = 'checkbox';
    flipflopElem.classList.add('flip-flop');
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
function generateStyleDivs() {
    
}
function fillAllHandler(event) {
    fillAllTodo();
    boolAll = true, boolActive = false, boolCompleted = false;
    todoAll.forEach(elem =>{
        console.log(elem['text'] + " " +elem['status']);
    });
   
}
function fillAllTodo() {
    ulElem.innerHTML = '';
    for(var i = 0; i < todoAll.length; i++) {
        let liElem = document.createElement('li');
        liElem.innerHTML = generateHTML(todoAll[i]);
        ulElem.append(liElem);
    }
    let elmArr = document.body.querySelectorAll('li');
    elmArr.forEach((elem, index) =>{
        
        let tiktokElem = elem.querySelector('.flip-flop');
        
        if(todoAll[index]['status'] == 'active')
            tiktokElem.checked = false;
        else
            tiktokElem.checked = true;  
    });
    makeButtonsWorking();
}
function fillActiveHandler(event) {
    fillActiveTodo();
    boolAll = false, boolActive = true, boolCompleted = false;
    todoAll.forEach(elem =>{
        if(elem['status'] == 'active')
            console.log(elem['text'] + " " +elem['status']);
    });
    let elmArr = document.body.querySelectorAll('li');
    var indArrActive = todoAll.reduce((acc, ele, indexNew) =>{
        if(ele['status'] == 'active')
        acc.push(indexNew);
        return acc;
    },[]);
    elmArr.forEach((elem, index) =>{
        
        let tiktokElem = elem.querySelector('.flip-flop');
        //console.log(tiktokElem.checked);
        if(todoAll[indArrActive[index]]['status'] == 'active')
            tiktokElem.checked = false;
        else
            tiktokElem.checked = true;  
    });
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
    todoAll.forEach(elem =>{
        if(elem['status'] == 'completed')
            console.log(elem['text'] + " " +elem['status']);
    });
    let elmArr = document.body.querySelectorAll('li');
    var indArrCompleted = todoAll.reduce((acc, ele, indexNew) =>{
        if(ele['status'] == 'completed')
        acc.push(indexNew);
        return acc;
    },[]);
    elmArr.forEach((elem, index) =>{
        
        let tiktokElem = elem.querySelector('.flip-flop');
        //console.log(tiktokElem.checked);
        if(todoAll[indArrCompleted[index]]['status'] == 'active')
            tiktokElem.checked = false;
        else
            tiktokElem.checked = true;  
    });
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
function clearCompletedHandler(event){
    todoAll = todoAll.reduce((acc, elem) =>{
        if(elem['status'] == 'active')
            acc.push(elem);
        return acc;
    },[]);
    
    if(boolAll) {
        fillAllHandler(event);
    }
    else if(boolActive) {
        fillActiveHandler(event);
    }
    else if(boolCompleted) {
        fillCompletedHandler(event);
    }
    var cnt = todoAll.reduce((acc, elem ) => {
        if(elem['status'] == 'completed')
        acc++;
        return acc;
    },0);
    if(cnt == todoAll.length) {
        buttonDiv.style.display = 'none';
        divPreLast.style.display = 'none';
        divLast.style.display = 'none';
        labelTopElem.innerHTML = '';
    }

}
function toggleAll(event) {
    selectAllBoolean = !selectAllBoolean;
    if(selectAllBoolean)
        todoAll.forEach( elem =>{
            elem['status'] = 'completed';
        })
    else
    todoAll.forEach( elem =>{
        elem['status'] = 'active';
    })
    if(cntActive() > 1)
        labelElem.innerHTML = `${cntActive()} items left`;
    else
        labelElem.innerHTML = `${cntActive()} item left`;
    if(selectAllBoolean)
        labelTopElem.style.color = 'rgb(0, 95, 13)'; 
    else
        labelTopElem.style.color = '#777';
    if(boolAll) {
        fillAllHandler(event);
    }
    else if(boolActive) {
        fillActiveHandler(event);
    }
    else if(boolCompleted) {
        fillCompletedHandler(event);
    }
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
        elem.addEventListener('dblclick', function(e){
        elem.contentEditable=true;
        elem.style.boxShadow = 'inset 2px 2px 9px 2px rgba(0,0,0,0.75)';
        elem.style.borderRadius = '12px';
        
        //elem.style.border = '1px solid red';
        
        });
        elem.addEventListener('mousedown', function(e){ e.preventDefault(); }, false);

    });
    todoFieldReplElemArr.forEach((elem,index) => {
        elem.addEventListener('keydown', function(e){
            if(e.keyCode == 13) {
                e.preventDefault();
                elem.contentEditable=false;
                console.log(elem.textContent);
                todoAll[index]['text'] = elem.textContent.trim();
                if(boolAll) {
                    fillAllHandler(event);
                }
                else if(boolActive) {
                    fillActiveHandler(event);
                }
                else if(boolCompleted) {
                    fillCompletedHandler(event);
                }    
            }
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
    
    let removeTodoElemArr = document.body.querySelectorAll('.delete-button');
    removeTodoElemArr.forEach((elem,index) => {
        elem.addEventListener('click', function(e, index){
            console.log("Initial: " + todoAll.length);
            todoAll.splice(index, 1);
            console.log("Final: " +todoAll.length);
            let liEl = elem.parentElement;
            
            console.log(todoAll.length);
            let counterElem = document.body.querySelector('.counter-label');
            var cnt = todoAll.reduce((acc,ele,ind) =>{
                //console.log(ind + " " + ele['status']);
                if(ele['status'] == 'active')
                    acc++;
                return acc;
            },0);
            //console.log(cnt);
            if(cnt > 1)
                counterElem.innerHTML = `${cnt} items left`;
            else 
                counterElem.innerHTML = `${cnt} item left`;
            liEl.style.display= 'none';
            if(todoAll.length == 0) {
                buttonDiv.style.display = 'none';
                divPreLast.style.display = 'none';
                divLast.style.display = 'none';
                labelTopElem.innerHTML = '';
            }
        });
    });
}
document.body.style.zoom = 1.0
