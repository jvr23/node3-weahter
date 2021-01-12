const form = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
// messageOne.textContent = 'Loading...a';


form.addEventListener('submit', (e) => {
  e.preventDefault();
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  const location = search.value;
  fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
  response.json().then((data) => {
    if(data.error){
      messageOne.textContent = data.error;
    }else{
      console.log(data);
      messageOne.textContent = data.forecast;
      messageTwo.textContent = data.address;
      }
    })
  })
});