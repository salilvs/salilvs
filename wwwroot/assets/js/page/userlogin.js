$(function () {
    $('#btnlogin').unbind().click(function () {
        $('#btnlogin').prop('disabled', false);
        if ($('#loginform').parsley().validate() !== true) {
            $('#btnlogin').prop('disabled', false);
        }
        else {
            login();
        }
    });

    $('#btnUpdate').unbind().click(function () {
        $('#btnUpdate').prop('disabled', true);
        if ($('#changepasswordform').parsley().validate() !== true) {
            $('#btnUpdate').prop('disabled', false);
        }
        else {
            updatechangepassword();
        }
    });
    $('#restid').unbind().click(function () {
        $('#Forgot-Password-Modal').modal('show');

    });

    $('#btnSend').unbind().click(function () {
        $('#btnSend').prop('disabled', true);
        if ($('#forgotpasswordform').parsley().validate() !== true) {
            $('#btnSend').prop('disabled', false);
        }
        else {
            var emailid = $('#txtemailid').val();
            //alert(emailid);
            createlogincredentials(emailid);
            //updatechangepassword();
        }
    });
});


function createlogincredentials(code) {
    var data = new FormData();
    data.append("emailid", code);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Login/CreateloginCredentials",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.length > 0) {
                if (response[0].type == "Success") {
                    SuccessAlert(response[0].title, response[0].message);
                    resetemployee();
                }
                else if (response[0].type == "Warning") {
                    WarningAlert(response[0].title, response[0].message)
                }
                else if (response[0].type == "Error") {
                    ErrorAlert(response[0].title, response[0].message)
                }
                else {
                    var content = "Invalid";
                    var title = "Invalid username or password.";
                    ErrorAlert(title, content);
                }
            }
        },
        error: function (response) {

        }
    });
}

function updatechangepassword() {
    var data = new FormData();
    data.append("username", $.trim($('#txtusername').val()));
    data.append("password", $.trim($('#txtnewpassword').val()));


    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Login/UpdatePassword",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {

            if (response[0].type == "Success") {
                window.location.href = response[0].url;
            }

            else if (response[0].type == "Error") {
                ErrorAlert(response[0].title, response[0].message)
            }
            else {
                var content = "Invalid";
                var title = "Invalid ";
                ErrorAlert(title, content);
            }
        },
        error: function (response) {

        }
    });
}


function login() {
    var data = new FormData();
    data.append("username", $.trim($('#txtusername').val()));
    data.append("password", $.trim($('#txtpassword').val()));
    data.append("remember", "");
    $('#txtoldpassword').val($('#txtpassword').val());
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Login/GetLoginAccess",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {

            if (response[0].type == "Success") {
                window.location.href = response[0].url;
            }
            else if (response[0].type == "Warning") {
                WarningAlert(response[0].title, response[0].message)
                $('#Change-Password-Modal').modal('show');
            }
            else if (response[0].type == "Error") {
                ErrorAlert(response[0].title, response[0].message)
            }
            else {
                var content = "Invalid";
                var title = "Invalid username or password.";
                ErrorAlert(title, content);
            }
        },
        error: function (response) {

        }
    });
}