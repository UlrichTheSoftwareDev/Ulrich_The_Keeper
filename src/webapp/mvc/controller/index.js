//check user exist and match with database
function login_index() {

  const remote = require('electron').remote;

  var login_index = document.getElementById("form_index_login").value;
  var password_index = document.getElementById("form_index_password").value;

  if (login_index.length == 0 || password_index.length == 0) {
    // alert("vide")

    remote.dialog.showMessageBox({
      type: 'info',
      title: 'Attention !',
      message: 'ERROR login \: login or password is empty \! ',
      buttons: ['Ok \!']
    });

    return false
  }
  check_user_exist(login_index, password_index);

}
