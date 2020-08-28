const form = document.querySelector('form')
const search = document.querySelector('input') 
const p1 = document.querySelector('#p1')
const p2 = document.querySelector('#p2')

form.addEventListener('submit',(e) => {
    e.preventDefault()
    
    const location = search.value
    p1.textContent='loading'
    p2.textContent = ''
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
             return   p1.textContent = data.error
               
            }

            p1.textContent = data.location
            
             p2.textContent = data.forecast     
             
             search.value=''

         
        })

})
})