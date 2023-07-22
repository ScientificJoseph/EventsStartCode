// const button = document.querySelector('button');
const buttons = document.querySelectorAll('button');

// button.onclick = function() {
//     console.log('Love is the key...')
// }

// const buttonclickedHandler = () => {
//     alert('Button was clicked')
// }

const buttonclickedHandler = event => {
    event.target.disabled = true;
    console.log(event)
    console.log(event.target)
    event.target.style.backgroundColor = 'black'
}

const anotherButtonClickedHandler = () => {
    alert('This was clicked')
}

// button.onclick = buttonclickedHandler;
// button.onclick - anotherButtonClickedHandler;

const boundFn = buttonclickedHandler.bind(this)

// button.addEventListener('click',buttonclickedHandler );

// setTimeout(() => {
//     button.removeEventListener('click',buttonclickedHandler)
// },2000)

buttons.forEach( btn => {
    btn.addEventListener('click', buttonclickedHandler)
})




