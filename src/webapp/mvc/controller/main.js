// toggle function click event
$(function() {
  // Sidebar toggle behavior
  $('#sidebarCollapse').on('click', function() {
    $('#sidebar, #content').toggleClass('active');
  });
});



//search password print all password
function search_password() {
  $(document).ready(function() {

    $('#table_id').parents('div.dataTables_wrapper').first().show();
    $("#organisation").show();
    $("#input_email").hide();
    $("#input_organisation").hide();
    $("#input_password").hide();
    $("#insert_button").hide();
    document.getElementById("myForm_index_generate").style.display = "none";



  });
  search_data();
}

//form hide show input button
function form_hide_show() {
  $(document).ready(function() {

    $('#table_id').parents('div.dataTables_wrapper').first().hide();
    $("#organisation").hide();
    $("#input_email").show();
    $("#input_organisation").show();
    $("#input_password").show();
    $("#insert_button").show();
    document.getElementById("myForm_index").style.display = "block";
    document.getElementById("myForm_index_generate").style.display = "none";


  });
}

//form hide show generate button
function form_hide_show_generate() {
  $(document).ready(function() {

    $('#table_id').parents('div.dataTables_wrapper').first().hide();
    $("#organisation").hide();
    $("#input_email").show();
    $("#input_organisation").show();
    $("#input_password").show();
    $("#insert_button").show();
    document.getElementById("myForm_index").style.display = "none";
    document.getElementById("myForm_index_generate").style.display = "block";


  });
}

//input password in database
function submit_insert_password() {

  //require lib
  const remote = require('electron').remote;

  //get element from DOM
  var insert_email = document.getElementById("input_email_value").value;
  var insert_organisation = document.getElementById("input_organisation_value").value;
  var insert_password = document.getElementById("input_password_value").value;

  //if email or organisation or password is empty
  if (insert_email.length == 0 || insert_organisation.length == 0 || insert_password.length == 0) {
    remote.dialog.showMessageBox({
      type: 'info',
      title: 'Attention !',
      message: 'ERROR insert password \: login or password is empty \! ',
      buttons: ['Ok \!']
    });
    return false
  }

  input_password(insert_email, insert_organisation, insert_password);
}


//generate password and input in database
function submit_generate_password() {

  //require lib
  const remote = require('electron').remote;

  //get element from DOM
  var insert_email = document.getElementById("generate_email_value").value;
  var insert_organisation = document.getElementById("generate_organisation_value").value;

  //if email or organisation is empty
  if (insert_email.length == 0 || insert_organisation.length == 0) {

    remote.dialog.showMessageBox({
      type: 'info',
      title: 'Attention !',
      message: 'ERROR insert password \: login or password is empty \! ',
      buttons: ['Ok \!']
    });

    return false
  }

  generate_password(insert_email, insert_organisation);
}

function logout() {
  //require lib
  const remote = require('electron').remote;

  //clear cookie session
  remote.session.defaultSession.clearStorageData([], function(data) {
    console.log(data);
  })

  remote.dialog.showMessageBox({
    type: 'info',
    title: 'Attention !',
    message: 'Logout \! ',
    buttons: ['Ok \!']
  });

  let app = remote.getCurrentWindow()
  app.close()

}
