// console.log('Sending Analytics...')

const intervalId = setInterval(() => {
    console.log('Sending Analytics Data...', new Date())
},2000)

document.getElementById('stop-analytics-btn').addEventListener('click', () => {
    clearInterval(intervalId) //must pass the id
})