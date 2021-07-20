let modalOverlay = document.querySelector('#modalOverlay');
let btnOpenModal = document.querySelector('#btnOrder');
let modalClose = document.querySelector('#modalClose');
let submitBtn = document.querySelector('#submitBtn');
let inputEmail = document.querySelector('#email');
let inputName = document.querySelector('#name');
let inputPhone = document.querySelector('#phone');
let selectService = document.querySelector('#list-services');

btnOpenModal.onclick = function () {
    modalOverlay.classList.add('show-modal');
    modalOverlay.classList.remove('hidden-modal');
}

modalClose.onclick = function () {
    modalOverlay.classList.remove('show-modal');
    modalOverlay.classList.add('hidden-modal');
}

window.onclick = function (e) {
    if (e.target == modalOverlay) {
        modalOverlay.style.display = "none";
    }
}


$(document).ready(function () {
    $("#phone").mask("+7 (999) 99-99-999");
});

// отправка формы
submitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    let isValid = validateEmail('formFeedback', 'email');

    if (inputName == null || inputName.value === '') {
        document.querySelector('#validateName').textContent = "Введено некорректное имя";
        isValid = false;
    }
    if (inputPhone == null || inputPhone.value === '') {
        document.querySelector('#validatePhone').textContent = "Введен некорректный номер";
        isValid = false;
        inputPhone.style.border = '1px solid red';
    }
    if (selectService == null || selectService.value === '') {
        document.querySelector('#validateSelect').textContent = "Не выбрана услуга";
        isValid = false;
    }
        
    if (!isValid) {
        return false;
    }

    $.post("/mail.php",
    {
        name: inputName.value,
        phone: inputPhone.value,
        email: inputEmail.value,
        select: selectService.value,
        comment: document.querySelector('#comment').value
    },
    function(value, status) {
        if(status === 'success') {

        let data = JSON.parse(value);
       document.querySelector('#result').innerText = '' + data.name + ' ' + data.phone + ' ' + data.email + ' ' + data.select + ' ' + data.comment;
       document.querySelector('#formFeedback').style.display = 'none';
       document.querySelector('#successМessage').innerText = 'Спасибо за заявку! В ближайшее время мы с Вами свяжемся :)';
        }
    
}).fail(function(){
    document.querySelector('#successМessage').innerText = 'Ошибочка вышла! Заяка не была отправлена :(';
});

    return false;
});

function validateEmail(form_id, email) {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let address = document.forms[form_id].elements[email].value;
    if (reg.test(address) === false || address === '') {
        document.querySelector('#validateEmail').textContent = "Введен некорректный email";
        inputEmail.style.border = '1px solid red';
        return false;
    }
    return true;
}

inputEmail.addEventListener('input', function () {
    document.querySelector('#validateEmail').textContent = '';
    inputEmail.style.border = ''
    });
inputName.addEventListener('input', function () {
    document.querySelector('#validateName').textContent = '';
    });
inputPhone.addEventListener('input', function () {
    document.querySelector('#validatePhone').textContent = '';
    inputPhone.style.border = '';
    });
selectService.addEventListener('change', function () {
    document.querySelector('#validateSelect').textContent = '';
    });

// Отправка заявки
$(document).ready(function () {

});