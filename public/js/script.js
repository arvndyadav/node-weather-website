// fetching data from a NodeJs server

// firast approach
/* function onSearch() {
    console.log('onSearch function')
    let location = document.getElementById('search').value;

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                return console.log(data.error);
            }
            console.log(data);
        })
    })
} */

const weatherForm = document.querySelector('form');
const paraOne = document.querySelector('#msgOne');
const paraTwo = document.querySelector('#msgTwo');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    paraOne.textContent = 'Loading...';
    paraTwo.textContent = '';

    let location = document.getElementById('search').value;

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                console.log(data.error);
                return paraOne.textContent = data.error;
            }
            console.log(data);
            paraOne.textContent = data.location;
            paraTwo.textContent = data.forecast;
        })
    })
})
