//check register value before insert in database
function registration() {

  const remote = require('electron').remote;

  var login_register = document.getElementById("login").value;
  var password_register = document.getElementById("password").value;
  var check_password_register = document.getElementById("password_check").value;

  var password_pattern=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{15,}$/;

  if (login_register.length == 0 || password_register.length == 0 || check_password_register.length == 0) {
    // alert("vide")
    remote.dialog.showMessageBox({
      type: 'info',
      title: 'Attention !',
      message: 'ERROR registration \: login or password is empty \! ',
      buttons: ['Ok \!']
    });
    return false
  }

  if (password_register !== check_password_register) {
    // alert("Not equal !")
    remote.dialog.showMessageBox({
      type: 'info',
      title: 'Attention !',
      message: 'ERROR registration \: login or password is not equal \! ',
      buttons: ['Ok \!']
    });
  }


  if (password_register == check_password_register && password_register.match(password_pattern)) {
    insert_user(login_register, password_register);
  }
  else{
    remote.dialog.showMessageBox({
      type: 'info',
      title: 'Attention !',
      message: 'ERROR registration \: password must have 15 or more characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character \! ',
      buttons: ['Ok \!']
    });
    // alert("Wrong login or password : password must have 15 or more characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character")
  }



}
