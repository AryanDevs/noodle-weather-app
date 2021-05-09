

const tester=document.querySelector('form');

const search=document.querySelector('input')

const p1=document.getElementById('para1');
const p2=document.getElementById('para2');

tester.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location=search.value;

    p1.textContent='Loading...';
    p2.textContent=' ';
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)

        p1.textContent=data.error;
        else{
           p1.textContent=data.location;
           p2.textContent=data.forecast;
        }
    })
})
})