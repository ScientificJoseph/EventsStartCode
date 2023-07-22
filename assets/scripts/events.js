const button = document.querySelector('button');

// button.onclick = function() {
//     console.log('Love is the key...')
// }

const buttonclickedHandler = () => {
    alert('Button was clicked')
}

const anotherButtonClickedHandler = () => {
    alert('This was clicked')
}

// button.onclick = buttonclickedHandler;
// button.onclick - anotherButtonClickedHandler;

const boundFn = buttonclickedHandler.bind(this)

button.addEventListener('click', boundFn);

setTimeout(() => {
    button.removeEventListener('click', boundFn)
},2000)





