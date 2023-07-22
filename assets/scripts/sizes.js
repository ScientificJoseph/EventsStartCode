const box = document.getElementById('main-box');
console.log(box)

const boxRect = box.getBoundingClientRect();
console.log(boxRect)

const offTop = box.offsetTop; // y value
console.log(offTop)

const offLeft = box.offsetLeft; // x value
console.log(offLeft)

const cTop = box.clientTop; // distence from top most point of box to the content
console.log(cTop)

const cLeft = box.clientLeft; // distence from left most point of box to the content
console.log(cLeft)

const offWidth = box.offsetWidth; // width of box
console.log(offWidth)

const offHeight = box.offsetHeight; // height of box
console.log(offHeight)

const cWidth = box.clientWidth; // width - border
console.log(cWidth)

const cHeight = box.clientHeight; // height - border
console.log(cHeight)

const sHeight = box.scrollHeight; // entire height including the non visable parts scrolled out
console.log(sHeight)

const sTop = box.scrollTop; // amount of scroll from top to where content is scrolled
console.log(sTop)

console.log(window.innerWidth)
console.log(window.innerHeight)

console.log(document.documentElement.clientWidth) //accounts for scroll bar
console.log(document.documentElement.clientHeight) //accounts for scroll bar