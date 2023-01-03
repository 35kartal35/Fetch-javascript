const namelabel=document.getElementById("namelabel")
const nameInput=document.getElementById("nameInput")

const surnamelabel=document.getElementById("surnamelabel")
const surname=document.getElementById("surname")

const emaillabel=document.getElementById("emaillabel")
const email=document.getElementById("email")

const mesagelabel=document.getElementById("mesagelabel")
const mesage=document.getElementById("message")

const contactform=document.getElementById("contactform")

const emailerror=document.getElementById("emailerror")

const mesageerror=document.getElementById("mesageerror")

nameInput.addEventListener('focusin',()=>{
    namelabel.style.color='#000'
})

nameInput.addEventListener('focusout', ()=>{
    namelabel.style.color='#777'
})

surname.addEventListener('focusin',()=>{
    surnamelabel.style.color='#000'
})

surname.addEventListener('focusout',()=>{
    surnamelabel.style.color='#777'
})

email.addEventListener('focusin',()=>{
    emaillabel.style.color='#000'
})

email.addEventListener('focusout',()=>{
    emaillabel.style.color='#777'
    emailerror.innerText=""
})

mesage.addEventListener('focusin',()=>{
    mesagelabel.style.color='#000'
})

mesage.addEventListener('focusout',()=>{
    mesagelabel.style.color='#777'
    mesageerror.innerText=""
})


contactform.addEventListener('submit',(event)=>{
    event.preventDefault()
    if(email.value===""){
        emailerror.innerText="*email alanı boş olamaz"
        email.focus()
        return
    }
    if(mesage.value===""){
        mesageerror.innerText="*mesaj alanı boş olamaz"
        mesage.focus()
        return
    }
    const newForm={
        name:nameInput.value,
        surname:surname.value,
        email:email.value,
        mesage:mesage.value,
        date:new Date()


    }
    fetch("http://localhost:3004/add-form", {
        method:'post',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(newForm)
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
    })
    .catch(err=>{
        console.log(err);
    })
    

})

