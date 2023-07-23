const button = document.querySelector('button');
// const buttons = document.querySelectorAll('button');

// button.onclick = function() {
//     console.log('Love is the key...')
// }

// const buttonclickedHandler = () => {
//     alert('Button was clicked')
// }

const buttonclickedHandler = event => {
    // event.target.disabled = true;
    console.log(event)
}

const anotherButtonClickedHandler = () => {
    alert('This was clicked')
}

// button.onclick = buttonclickedHandler;
// button.onclick = anotherButtonClickedHandler;

const boundFn = buttonclickedHandler.bind(this)

// button.addEventListener('click',buttonclickedHandler );

// setTimeout(() => {
//     button.removeEventListener('click',buttonclickedHandler)
// },2000)

// buttons.forEach( btn => {
//     btn.addEventListener('mouseenter', buttonclickedHandler)
// })

// window.addEventListener('scroll', event => {
//     console.log(event)
// })

const form = document.querySelector('form')
form.addEventListener('submit', event => {
    event.preventDefault()
    console.log(event)
})

const div = document.querySelector('div')

div.addEventListener('click', event => {
    console.log('Clicked Div')
    console.log(event);
})

button.addEventListener('click', function(event) {
    event.stopPropagation()
    console.log('Clicked Button')
    console.log(event)
    console.log(this)
})

const listItems = document.querySelectorAll('li')
const list = document.querySelector('ul');

// listItems.forEach((listItem) => {
//     listItem.addEventListener('click', event =>{
//         event.target.classList.toggle('highlight')
//         // event.target.remove()
//     })
// })

list.addEventListener('click', event =>{
    // console.log(event.currentTarget)
    // event.target.classList.toggle('highlight')
    event.target.closest('li').classList.toggle('highlight')
    // form.submit()
    button.click()
    // event.target.closest('li').remove()

})




