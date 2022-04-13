const form = document.getElementById('form');
const username = document.getElementById('username');
const phonenumber=document.getElementById('phonenumber');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
var strength = {
	0: "Worst",
	1: "Bad",
	2: "Weak",
	3: "Good",
	4: "Strong"
  }
  //var password = document.getElementById('password');
  var meter = document.getElementById('password-strength-meter');
  var text = document.getElementById('password-strength-text');
  

form.addEventListener('submit', e => {
	
	checkInputs();
	console.log(isFormValid());
    if(isFormValid()==true){
        form.submit();
     }else {
         e.preventDefault();
     }
});
password.addEventListener('keyup', function() {

	var pwd = password.value;
  
	// Reset if password length is zero
	if (pwd.length === 0) {
	  document.getElementById("progresslabel").innerHTML = "";
	  document.getElementById("progress").value = "0";
	  return;
	}
  
	// Check progress
	var prog = [/[$@$!%*#?&]/, /[A-Z]/, /[0-9]/, /[a-z]/]
	  .reduce((memo, test) => memo + test.test(pwd), 0);
  
	// Length must be at least 8 chars
	if(prog > 2 && pwd.length > 7){
	  prog++;
	}
  
	// Display it
	var progress = "";
	var strength = "";
	switch (prog) {
	  case 0:
	  case 1:
	  case 2:
		strength = "25%";
		progress = "25";
		break;
	  case 3:
		strength = "50%";
		progress = "50";
		break;
	  case 4:
		strength = "75%";
		progress = "75";
		break;
	  case 5:
		strength = "100% - Password strength is good";
		progress = "100";
		break;
	}
	document.getElementById("progresslabel").innerHTML = strength;
	document.getElementById("progress").value = progress;
  
  });
  
// password.addEventListener('input', function() {
// 	var val = password.value;
// 	var result = zxcvbn(val);
  
	// Update the password strength meter
	//meter.value = result.score;
  
	// Update the text indicator
// 	if (val !== "") {
// 	  text.innerHTML = "Strength: " + strength[result.score]; 
// 	} else {
// 	  text.innerHTML = "";
// 	}
//   });
				
function isFormValid(){
    const inputContainers = form.querySelectorAll('.form-control');
    let result = true;
    inputContainers.forEach((container)=>{
        if(container.classList.contains('error')){
            result = false;
        }
    });
    return result;
}

function checkInputs() {
	// trim to remove the whitespaces
	var pattern = /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;
	const usernameValue = username.value.trim();
	const emailValue = email.value.trim();
	const phonenumbervalue = phonenumber.value.trim();
	const passwordValue = password.value.trim();
	const password2Value = password2.value.trim();
	
	if(usernameValue === '') {
		setErrorFor(username, 'Username cannot be blank');
	} else {
		setSuccessFor(username);
	}
	
	if(emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Not a valid email');
	} else {
		setSuccessFor(email);
	}
	
	if(phonenumbervalue===''){
		setErrorFor(phonenumber);
	}
	else if(pattern.test(phonenumbervalue)){
		setSuccessFor(phonenumber);
	}
	else{
		setErrorFor(phonenumber);
	}
	
	if(passwordValue === '') {
		setErrorFor(password, 'Password cannot be blank');
	} else {
		setSuccessFor(password);
	}
	
	if(password2Value === '') {
		setErrorFor(password2, 'Password2 cannot be blank');
	} else if(passwordValue !== password2Value) {
		setErrorFor(password2, 'Passwords does not match');
	} else{
		setSuccessFor(password2);
	}
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
