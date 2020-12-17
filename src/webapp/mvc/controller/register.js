//check register value before insert in database
function registration() {

  //require lib
  const remote = require('electron').remote;

  //get element from DOM
  var login_register = document.getElementById("login").value;
  var password_register = document.getElementById("password").value;
  var check_password_register = document.getElementById("password_check").value;

  var password_pattern=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{15,}$/;

  //if login or password or check password is empty
  if (login_register.length == 0 || password_register.length == 0 || check_password_register.length == 0) {
    remote.dialog.showMessageBox({
      type: 'info',
      title: 'Attention !',
      message: 'ERROR registration \: login or password is empty \! ',
      buttons: ['Ok \!']
    });
    return false
  }

  //if password not equal to check password
  if (password_register !== check_password_register) {
    remote.dialog.showMessageBox({
      type: 'info',
      title: 'Attention !',
      message: 'ERROR registration \: login or password is not equal \! ',
      buttons: ['Ok \!']
    });
  }

  //if password match with check password and pattern
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
  }

}
