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
const responsecontainer=document.getElementById("responsecontainer")
const submitBtn=document.getElementById("submitBtn")
const responseText=document.getElementById("responseText")

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

    submitBtn.disabled=true
    submitBtn.classList.replace("submitBtnActive","submitBtnDisabled")
    submitBtn.innerText="Gönderiliyor..."
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
        if(data.status === 200){
            responsecontainer.style.display="block"
            responsecontainer.classList.add("responseSuccess")
            responseText.innerText="formunuz başarıyla gönderildi"
            setTimeout(()=>{
                responsecontainer.style.display='none'
                responsecontainer.classList.remove("responseSuccess")
                responseText.innerText=""
                submitBtn.disabled=false
                submitBtn.classList.replace("submitBtnDisabled","submitBtnActive")
                submitBtn.innerText="Gönder"
                nameInput.value=""
                surname.value=""
                email.value=""
                mesage.value=""
            },2000)
        }
    })
    .catch(err=>{
        console.log(err);
        responsecontainer.style.display="block"
        responsecontainer.classList.add("responseFail")
        responseText.innerText="formunuzu gönderirken bir hata oluştu"
        setTimeout(()=>{
            responsecontainer.style.display='none'
            responsecontainer.classList.remove("responseSuccess")
            responseText.innerText=""
            submitBtn.disabled=false
            submitBtn.classList.replace("submitBtnDisabled","submitBtnActive")
            submitBtn.innerText="Gönder"
        },2000)
    })
    

})

