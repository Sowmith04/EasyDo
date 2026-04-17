const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (!currentUser) {
    window.location.href = 'ToDo-Login.html';
}
const username=currentUser.email;

document.querySelector('.nameGreet').innerHTML=currentUser.name;

let todoArray= JSON.parse(localStorage.getItem(`todoArray_${username}`))||[];

todoArray = todoArray.map(todo => ({
    ...todo,
    completed: todo.completed ?? false,
    todoInputTime: todo.todoInputTime ?? ''
}));

getQuote();
getWeather();
document.querySelector('.js-add-button').addEventListener('click',()=>{
    todoMain();
})


let currentFilter='all';

finalRendering();

function finalRendering(){
    let TodoFinalHTML='';


    todoArray.forEach((todoOne,index)=>{
        const {todoInputText,todoInputDate,todoInputTime,completed}=todoOne;

        if (
        (currentFilter === 'completed' && !completed) ||
        (currentFilter === 'pending' && completed)
    ) {
        return;
    }

        const html=
        `
        <div class="todo-item ${completed ? 'completed' : ''}">
        <div>${todoInputText}</div>
        <div>${todoInputDate || 'No Date'}</div>
        <div>${todoInputTime || 'No Time'}</div>
        <button class="delete-button" data-index="${index}">Delete</button>
        <div class='extra-buttons'>
        <button class="complete-button" data-index="${index}">
        ${completed ?'Undo':'Complete'}
        </button>
        <button class="edit-button" data-index="${index}">Edit</button>
        </div>
        
        </div>
        `
        TodoFinalHTML+=html;
    });
    document.querySelector('.js-final-todo').innerHTML=TodoFinalHTML;

}
document.querySelector('.js-final-todo').addEventListener('click',(e)=>{
        const index=e.target.dataset.index;
        if(index===undefined || !todoArray[index]) return;

        if(e.target.classList.contains('delete-button')){
            todoArray.splice(index,1);
        }

        if(e.target.classList.contains('complete-button')){
            todoArray[index].completed=!todoArray[index].completed;
        }

        if(e.target.classList.contains('edit-button')){
            const newtext=prompt('Edit your ToDo: ',todoArray[index].todoInputText);

            if(newtext!==null && newtext.trim()!=''){
                todoArray[index].todoInputText=newtext;
            }
        }
        localStorage.setItem(`todoArray_${username}`,JSON.stringify(todoArray));
        finalRendering();
    });

function setFilter(filter){
    currentFilter = filter;
    finalRendering();
}

function todoMain(){
    const inputText=document.querySelector('.todo-input');
    const todoInputText=inputText.value;

    const inputDate=document.querySelector('.todo-date');
    const todoInputDate=inputDate.value;

    const inputTime=document.querySelector('.todo-time');
    const todoInputTime=inputTime.value;

    if (!todoInputText) {
        alert('Please enter a todo');
        return;
    }

    todoArray.push({todoInputText, todoInputDate, todoInputTime, completed:false});


    localStorage.setItem(`todoArray_${username}`,JSON.stringify(todoArray));
    finalRendering();

    inputText.value='';
    inputDate.value='';
    inputTime.value='';
}

document.querySelector('.logout-button').addEventListener('click',()=>{
    localStorage.removeItem('currentUser');
    window.location.href='ToDo-Login.html';
})

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getQuote(){
    try{
        const res=await fetch('https://dummyjson.com/quotes/random');
        if (!res.ok) throw new Error('Failed to fetch');
        const datadata=await res.json();

        document.querySelector('.tagline').innerText=datadata.quote;
    }
    catch(error){
        console.error(error);
        document.querySelector('.tagline').innerText='Stay productive today';
}
}

async function getWeather() {
    try {
        const res = await fetch('https://wttr.in/?format=j1');
        const data = await res.json();

        const temp = data.current_condition[0].temp_C;
        const desc = data.current_condition[0].weatherDesc[0].value;

        document.querySelector('.weather-text').innerText =
            ` ${temp}°C | ${desc}`;

    } catch (error) {
        console.error(error);
        document.querySelector('.weather-text').innerText =
            'Weather unavailable';
    }
}