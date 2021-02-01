const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const confirm_password = document.getElementById('confirm-password')

// Show error
function showerror(input, message){
    const formControl = input.parentElement
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small')
    small.innerText = message
}

// Show success
function showSuccess(input){
    const formControl = input.parentElement
    formControl.className = 'form-control success'
}

// Email Check
function checkEmail(input){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value)){
        showSuccess(input)
    }else {
        showerror(input, 'Email is not valid')
    }

}

// Check Required
function checkRequired(inputArray){
    inputArray.forEach(function (input){
        if (input.value.trim() === ''){
            showerror(input,`${getFieldName(input)} is required`)
        }else {
            showSuccess(input)
        }
    })
}

// Check length
function checkLength(input, min, max){
    if (input.value.length < min){
        showerror(input, `${getFieldName(input)} must be greater than ${min}`)
    }else if (input.value.length > max){
        showerror(input, `${getFieldName(input)} must be smaller than ${max}` )
    }else {
        showSuccess(input)
    }
}

// Check password for match
function checkMatchPassword(input1, input2){
    if (input1.value !== input2.value){
        showerror(input2, 'Password did not match')
    }
}

// Get field name
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

// Event listener
form.addEventListener('submit',  function (e){
    e.preventDefault()

    checkRequired([username, email, password, confirm_password])
    checkLength(username, 3, 10)
    checkLength(password, 6, 15)
    checkMatchPassword(password, confirm_password)
    checkEmail(email)
})