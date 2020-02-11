console.log('static javascript')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('.message-1')
const messageTwo = document.querySelector('.message-2')




weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  messageOne.textContent = 'Loading Weather...'
  messageTwo.textContent = ''
  const location = search.value
  fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
  response.json().then((data) => {
    if(data.err) {
      messageOne.textContent = data.err
    } else {
      messageOne.textContent = data.location
      messageTwo.textContent = data.forecast
    }
  })
})
})