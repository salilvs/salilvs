$(function () {
    var currentUrl = window.location.href;
    counterVal = currentUrl.split("?");
    var compvend = counterVal[1];
    var vend_comp = compvend.split("=");
    var vend_d;
    vend_d = vend_comp[1];
  
    loadvendoruser(vend_d);
    $('#Company-tab').unbind().click(function () {
        var url = "../assets/js/page/admin/AdminVendorCompany1.js";
        $.getScript(url, function () {
            console.log("employee loaded");
        });
    });
    $('#Users-tab').unbind().click(function () {
        var url = "../assets/js/page/admin/AdminvendorUser.js";
        $.getScript(url, function () {
            console.log("branch loaded");
        });
    });



    resetvendoruser();
    $('#btnuserClose,#btnuserClose,#btnusercompanyClose').unbind().click(function () {
        resetvendoruser();
    });
    $('#btnSaveUser').unbind().click(function () {
        $('#btnSave').prop('disabled', false);
        if ($('#vendoruserform').parsley().validate() !== true) {
            $('#btnSave').prop('disabled', false);
        }
        else {
            savevendoruserdetails();
        }
    });
    $(document).on('click', '.chklistitem', function () {
        data = $(this).val();
        var text = $(this).closest("td").find("label").html();
        //alert(data);
        //alert(text);
        var s = $(this).is(':checked');
         //alert(s)
        if (s == true) {
          
            loademployeelist(data, s, text);
           // alert(data);
            $('#dvemployee').show();
        } else {
           //alert(data);
            $('#' + data).hide();
           
          //  $("#dvemployee tbody tr").remove();
           // $('#dvemployee').hide();
           // $('#dvemployee').html('');
        }
        //if (s == false) {
        //    alert(data);
        //    $('#' + data).hide();
        //    $('#dvemployee').hide();
        //}

    });


    $('#btnSaveUserCompany').on('click', function () {

        $("input:checkbox[name=chklistitem]:checked").each(function () {
            data = $(this).val();
            //  alert(data);
            //alert(s);
            SaveVendorUserCompany(data);
        });
        //$("input:checkbox[name=chkemplistitem]:checked").each(function () {
        $("input:checkbox[name=chkemplistitem]").each(function () {
            // alert(this.id);
            vendorId = this.id;
            counterVal = vendorId.split("_");
            counter = counterVal[1];
            dat = $(this).val();
            // alert(dat)
            dt = $(this).closest('table').attr('id');
            var approveaccess = "No"; var rescheduleaccess = "No"; var cancelaccess = "No"; var holdaccess = "No"; var completeaccess = "No";
            if ($("input[id=chkapprove_" + dat + "]:checked").val() == "Yes") {
                approveaccess = "Yes";
            }

            if ($("input[id=chkhold_" + dat + "]:checked").val() == "Yes") {
                holdaccess = "Yes";
            }

            if ($("input[id=chkreschedule_" + dat + "]:checked").val() == "Yes") {
                rescheduleaccess = "Yes";
            }

            if ($("input[id=chkcancel_" + dat + "]:checked").val() == "Yes") {
                cancelaccess = "Yes";
            }

            if ($("input[id=chkcomplete_" + dat + "]:checked").val() == "Yes") {
                completeaccess = "Yes";
            }

            SaveVendorUserCompanyEmp(dt, dat, approveaccess, holdaccess, rescheduleaccess, cancelaccess, completeaccess);
        });
    });


});

function SaveVendorUserCompany(Vendor_Id) {
    var data = new FormData();
    data.append("Vendor_Id", Vendor_Id);
    data.append("Vendor_Group_Id", '');
    data.append("vendor_userId", $.trim($('#lbuserid').val()))
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        //url: "/VendorUser/LoadVendorBranchEmployee",
        //url: "/VendorUser/SaveVendorUserCompany",
        url: "/VendorUser/SaveVendorUserCompany",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                $('#VendorCompany-Modal').modal('hide');
                resetvendoruser();
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message);
                $('#btnSave').prop('disabled', false);
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                $('#btnSave').prop('disabled', false);
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

function SaveVendorUserCompanyEmp(Vendor_Id, Vedoruser_Employee_Id, approveaccess, holdaccess, rescheduleaccess, cancelaccess, completeaccess) {
    var da = new FormData();
    da.append("Vendor_Id", Vendor_Id);
    // da.append("Vendor_Group_Id", '');
    da.append("vendor_userId", $.trim($('#lbuserid').val()));
    da.append("Vedoruser_Employee_Id", Vedoruser_Employee_Id);

    da.append("Access_To_Approve", approveaccess);
    da.append("Access_To_Reschedule", rescheduleaccess);
    da.append("Access_To_Hold", holdaccess);
    da.append("Access_To_Cancel", cancelaccess);
    da.append("Access_To_Complete", completeaccess);
    $.ajax({

        type: "Post",
        contentType: "application/json;charset=utf-8",
        //url: "/VendorUser/LoadVendorBranchEmployee",
        //url: "/VendorUser/SaveVendorUserCompany",
        url: "/VendorUser/SaveVendorUserCompanyEmployee",
        dataType: "json",
        data: da,
        contentType: false,
        processData: false,
        success: function (response) {

            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                $('#VVendorCompany-Modal').modal('hide');
                resetvendoruser();
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message);
                $('#btnSave').prop('disabled', false);
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                $('#btnSave').prop('disabled', false);
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
function loademployeelist(Vendor_Branch_Id, s, text) {
    var currentUrl = window.location.href;
    counterVal = currentUrl.split("?");
    var compvend = counterVal[1];
    var vend_comp = compvend.split("=");
    var vend_d;
    vend_d = vend_comp[1];

    var data = new FormData();
    data.append("Vendor_Id", Vendor_Branch_Id);
    data.append("Vendor_Branch_Id", vend_d);
    data.append("IsChecked", s);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        //url: "/VendorUser/LoadVendorBranchEmployee",
        url: "/VendorUser/LoadVendorCompanyEmployee",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var data = response;
            var table = $('<table  class="table" id="' + Vendor_Branch_Id + '"></table>');
            table[0].border = "0";
            table[0].style = "width:100%";
            table.append('<tr><td colspan="1" style="background-color: #ece0e0f5;font-size: 18px;color: #3c1515;">' + text + '</td></tr>');
            $(data).each(function () {
                var empchecked = approveChk = holdChk = resheduleChk = cancelChk = completeChk = false;
                //alert(this.status);
                //alert(this.Approveaccess);

                if (this.Approveaccess == "Yes")
                    approveChk = true;
                if (this.Holdaccess == "Yes")
                    holdChk = true;
                if (this.Rescheduleaccess == "Yes")
                    resheduleChk = true;
                if (this.Cancelaccess == "Yes")
                    cancelChk = true;
                if (this.Completeaccess == "Yes")
                    completeChk = true;

                if (this.status == 1 && (approveChk || holdChk || resheduleChk || cancelChk || completeChk)) {
                    empchecked = true;
                }


                table.append(

                    $('<tr style="font-size: 15px;font-weight:800;"></tr>').append($('<td ></td>').append($('<input>').attr({
                        // type: 'checkbox', name: 'chklistitem', value: this.Value, id: 'chklistitem' + counter
                        type: 'checkbox', name: 'chkemplistitem', checked: empchecked, value: this.Vendor_Employee_Id, id: 'chkemplistitem_' + this.Vendor_Employee_Id
                    })).append(
                        $('<label>').attr({
                            for: 'chkemplistitem' + this.Vendor_Employee_Id
                        }).text(this.Vendor_Employee_Name))));

                table.append(
                    $('<td style="color:green" ></td>').append($('<input>').attr({
                        type: 'checkbox', name: 'chkapprove', checked: approveChk, value: "Yes", id: 'chkapprove_' + this.Vendor_Employee_Id
                    })).append(
                        $('<label>').attr({
                            for: 'chkapprove' + this.Vendor_Employee_Id
                        }).text("Approve")));


                table.append(
                    $('<td style="color:red"></td>').append($('<input>').attr({
                        type: 'checkbox', name: 'chkhold', checked: holdChk, value: "Yes", id: 'chkhold_' + this.Vendor_Employee_Id
                    })).append(
                        $('<label>').attr({
                            for: 'chkhold' + this.Vendor_Employee_Id
                        }).text("Hold")));

                table.append(
                    $('<td style="color:Blue"></td>').append($('<input>').attr({
                        type: 'checkbox', name: 'chkreschedule', checked: resheduleChk, value: "Yes", id: 'chkreschedule_' + this.Vendor_Employee_Id
                    })).append(
                        $('<label>').attr({
                            for: 'chkreschedule' + this.Vendor_Employee_Id
                        }).text("Reschedule")));

                table.append(
                    $('<td style="color:Blue"></td>').append($('<input>').attr({
                        type: 'checkbox', name: 'chkcancel', checked: cancelChk, value: "Yes", id: 'chkcancel_' + this.Vendor_Employee_Id
                    })).append(
                        $('<label>').attr({
                            for: 'chkcancel' + this.Vendor_Employee_Id
                        }).text("Cancel")));

                table.append(
                    $('<td style="color:Blue"></td>').append($('<input>').attr({
                        type: 'checkbox', name: 'chkcomplete', checked: completeChk, value: "Yes", id: 'chkcomplete_' + this.Vendor_Employee_Id
                    })).append(
                        $('<label>').attr({
                            for: 'chkcomplete' + this.Vendor_Employee_Id
                        }).text("Complete")));
                //counter++;
            });
            $('#dvemployee').append(table);
        }

    });
}
function resetvendoruser() {
    var currentUrl = window.location.href;
    counterVal = currentUrl.split("?");
    var compvend = counterVal[1];
    var vend_comp = compvend.split("=");
    var vend_d;
    vend_d = vend_comp[1];
  
    loadvendoruser(vend_d);
    $('#btnSaveUser').prop('disabled', false);
    $('#btnResetUser').prop('disabled', false);
    $('#btnSaveUser').show();
    $('#vendoruserform').parsley().reset();
    $('#vendoruserform')[0].reset();
    $('#vendorusercompanyform').parsley().reset();
    $('#vendorusercompanyform')[0].reset();
}
function savevendoruserdetails() {
    var currentUrl = window.location.href;
    counterVal = currentUrl.split("?");
    var compvend = counterVal[1];
    var vend_comp = compvend.split("=");
    var vend_d;
    vend_d = vend_comp[1];

    var data = new FormData();
    //data.append("vendor_Id", '');
    data.append("vendor_Id", vend_d);
    data.append("vendor_Username", $.trim($('#txtvendorusername').val()));
    data.append("vendor_EmailId", $.trim($('#txtemailuser').val()));
    data.append("vendor_Phone", $.trim($('#txtphoneuser').val()));
    data.append("vendor_Password", $.trim($('#txtpassword').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorUser/SaveVendor_User",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
               
                var email_id = $('#txtemailuser').val();
                var pass = $('#txtpassword').val();
                var phone = $('#txtphoneuser').val();
                createusercredentials(email_id, pass)
                createusercredentials_phone(email_id, pass,phone)
                $('#Vendor-User-Modal').modal('hide');
                resetvendoruser();
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message);
                $('#btnSave').prop('disabled', false);
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                $('#btnSave').prop('disabled', false);
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

function loadvendoruser(vend_d) {
    var currentUrl = window.location.href;
    counterVal = currentUrl.split("?");
    var compvend = counterVal[1];
    var vend_comp = compvend.split("=");
    var vend_d;
    vend_d = vend_comp[1];
    var data = new FormData();
    data.append("Vendor_uniqueid", vend_d);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorCreation/LoadVendorUser",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {

            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_userslist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_userslist').DataTable({
                    data: dat,
                    autoWidth: true,
                    responsive: true,
                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                        { data: 'vendor_Username' },
                        { data: 'Vendor_Email' },
                        {

                            orderable: false,
                            render: function (data, type, row) {

                                //if (row.Vendor_Status == "Active") {
                                //    if (row.Vendor_Login_Access == "Yes") {
                                var ven_id = row.Vendor_uniqueid;
                                var venid = row.vendor_userId;
                                var code1 = "_";
                                code1 = code1 + row.vendor_userId;
                                var code = row.vendor_Username;
                                var cod = code.concat(code1);
                                var pass = row.vendor_Password;
                                //alert(code);
                                //alert(code1);
                                var id1 = row.vendor_userId;
                                //alert(Id1);
                                return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Add Permission" data-vid=' + code + ' onclick="addpermissiondetails(\'' + cod + '\')" ><i class="simple-icon-pencil"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Delete" onclick="deleteUser(\'' + id1 + '\')" ><i class="fa fa-trash"></i></button><button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" data-vid=' + venid + ' onclick="UserEdit(\'' + venid + '\')" ><i class="simple-icon-pencil"></i></button> </td>';
                                ///*  */

                            }
                        }
                    ]
                });
            }
            else {
                $('#tbl_userslist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}



function deleteUser(id1) {
    swal({
        title: "Are you sure?",
        text: "Do you want Delete this User!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes",
    }, function (isConfirm) {
        if (isConfirm) {
            var data = new FormData();
            data.append("Vendor_Id", '');
            data.append("Id1", id1);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/VendorCreation/Delete_User",
                //url: "/VendorUser/Delete_User",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response.length > 0) {
                        if (response[0].Type == "Success") {
                            SuccessAlert(response[0].Title, response[0].Message);
                            resetvendoruser();
                        }
                        else if (response[0].Type == "Warning") {
                            WarningAlert(response[0].Title, response[0].Message)
                        }
                        else if (response[0].Type == "Error") {
                            ErrorAlert(response[0].Title, response[0].Message)
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
        else {

        }
    });

}


function createusercredentials(email_id, pass) {
    //alert(email_id);
    //alert(pass);
    swal({
        title: "Are you sure?",
        text: "Do you want Send the credentials!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes",
    }, function (isConfirm) {
        if (isConfirm) {
            var data = new FormData();
            data.append("Vendor_Id", '');
            data.append("Login_Id", email_id);
            data.append("Pass", pass);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/VendorCreation/CreateUserCredentials",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response.length > 0) {
                        if (response[0].Type == "Success") {
                            SuccessAlert(response[0].Title, response[0].Message);
                            //resetvendoruser();
                        }
                        else if (response[0].Type == "Warning") {
                            WarningAlert(response[0].Title, response[0].Message)
                        }
                        else if (response[0].Type == "Error") {
                            ErrorAlert(response[0].Title, response[0].Message)
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
else {

        }
    });

}
function createusercredentials_phone(email_id, pass,phone) {
    //alert(email_id);
    //alert(pass);
    swal({
        title: "Are you sure?",
        text: "Do you want Send the credentials!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes",
    }, function (isConfirm) {
        if (isConfirm) {
            var data = new FormData();
            data.append("Vendor_Id", '');
            data.append("Login_Id", email_id);
            data.append("Pass", pass);
            data.append("phone", phone);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/VendorCreation/CreateUserCredentials_phone",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response.length > 0) {
                        if (response[0].Type == "Success") {
                            SuccessAlert(response[0].Title, response[0].Message);
                            //resetvendoruser();
                        }
                        else if (response[0].Type == "Warning") {
                            WarningAlert(response[0].Title, response[0].Message)
                        }
                        else if (response[0].Type == "Error") {
                            ErrorAlert(response[0].Title, response[0].Message)
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
        else {

        }
    });

}
function UserEdit(venid) {

    swal({
        title: "Are you sure?",
        text: "Do you want to edit the data!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes, Edit it!",
    }, function (isConfirm) {
        if (isConfirm) {
            var data = new FormData();
            data.append("Id", venid);
            // data.append("Id", GetURLParameter('vid'));
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                //url: "/VendorProduct/ProductCategoryView",
                url: "/VendorUser/UserView",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        $('#btnUpdateUser').show();
                        $('#btnSaveUser').hide();
                        $('#Vendor-UserEdit-Modal').modal('show');
                        $.each(response, function (i, vari) {

                            $('#txtvendorusername1').val(vari.vendor_Username);
                            $('#txtemailuser1').val(vari.vendor_EmailId);
                            $('#txtphoneuser1').val(vari.vendor_Phone);
                            $('#txtpassword1').val(vari.vendor_Password);

                        });
                    }
                    else {

                    }
                },
                error: function (response) {

                }
            });

        } else {


        }
    });
}

function addpermissiondetails(code, cod) {

    swal({
        title: "Are you sure?",
        text: "Do you want to add the permissions!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes, Add Permission !",
    }, function (isConfirm) {
            if (isConfirm) {

                var currentUrl = window.location.href;
                counterVal = currentUrl.split("?");
                var compvend = counterVal[1];
                var vend_comp = compvend.split("=");
                var vend_d;
                vend_d = vend_comp[1];


            var vid = code;
            var fl = code.split('_');
            //  alert(fl[1]);
            var data = new FormData();
            data.append("vendor_Id", vend_d);
            data.append("user_Id", fl[1]);
            $('#dvvendorcompany').html('');
            $('#dvemployee').html('');
            //data.append("Vendor_Uniqueid", code);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/VendorUser/LoadVendorCompany",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var data = response;
                    //if (dat.length > 0) {
                    $('#VendorCompany-Modal').modal('show');
                    $('#lbl11').val(fl[0]);
                    var lbuserid = $('#lbuserid').val(fl[1]);

                    var table = $('<table></table>');
                    var counter = 0;
                    var slno = 0;

                    $(data).each(function () {
                        var chklistitemChk = false;
                        if (this.status == 1) {
                            chklistitemChk = true;
                        }

                        table.append($('<tr></tr>').append($('<td></td>').append($('<input class="chklistitem">').attr({
                            type: 'checkbox', name: 'chklistitem', checked: chklistitemChk, value: this.Vendor_uniqueid, id: 'chklistitem' + counter
                        })).append(
                            $('<label>').attr({
                                for: 'chklistitem' + counter++
                            }).text(this.Vendor_Name))));
                        if (this.status == 1) {
                            loademployeelist(this.Vendor_uniqueid, 'true', this.Vendor_Name);
                        }
                        //if (this.status == 0) {
                        //    loademployeelist(this.Vendor_uniqueid, 'true', this.Vendor_Name);
                        //}

                    });


                    $('#dvvendorcompany').append(table);
                    //}
                },
                error: function (response) {

                }
            });

        } else {

        }
    });
}

