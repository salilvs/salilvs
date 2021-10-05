$(function () {
    $("#txtdob,#txtjoindate").datetimepicker({
        // Formats
        format: 'YYYY-MM-DD',
    });
    $('#btnSave').unbind().click(function () {
        $('#btnSave').prop('disabled', false);
        if ($('#employeeform').parsley().validate() !== true) {
            $('#btnSave').prop('disabled', false);
        }
        else {
            saveemployeedetails();
        }
    });
    $('#btnUpdate').unbind().click(function () {
        $('#btnUpdate').prop('disabled', false);
        if ($('#employeeform').parsley().validate() !== true) {
            $('#btnUpdate').prop('disabled', false);
        }
        else {
            updateemployeedetails();
        }
    });
    $('#ddlcountry').change(function () {
        loadstatedetails($('#ddlcountry').val());
    });
    $('#ddlstate').change(function () {
        loadcitydetails($('#ddlstate').val());
    });
    resetemployee();
    $('#btnClose,#btnReset').unbind().click(function () {
        resetemployee();
    });
    $('#image1').click(function (e) {
        $('#photo1').click();
    });
    $('#photo1').change(function () {
        fasterPreviewimage1(this);
    });
});

function resetemployee() {
    loademployeedetails();
    loadcountrydetails();
    $('#btnUpdate').prop('disabled', false);
    $('#btnSave').prop('disabled', false);
    $('#btnUpdate').hide();
    $('#btnSave').show();
    $('#employeeform').parsley().reset();
    $('#employeeform')[0].reset();
    $('#image1').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
}
function loademployeedetails() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Employee/LoadEmployees",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_employeelist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_employeelist').DataTable({
                    data: dat,
                    autoWidth: true,
                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var image = row.Employee_Photo;
                                return '<td><div class="sidebar-user"><div class="sidebar-user-picture"><img alt="image" src="' + image + '" width="50px" height="50px"></div></div></td>';
                            }
                        },
                        { data: 'Employee_Name' },
                        { data: 'Employee_Email' },
                        { data: 'Employee_Phone' },
                        { data: 'Employee_Designation' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var stat = row.Employee_Status;
                                if (stat == "Active") {
                                    return '<span class="badge badge-pill badge-success">' + stat + '</span>';
                                }
                                else { return '<span class="badge badge-pill badge-danger">' + stat + '</span>'; }
                            }
                        },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                if (row.Employee_Status == "Active") {
                                    if (row.Employee_Login_Access == "Yes") {
                                        var code = row.Employee_Uniqueid;
                                        return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewemployeedetails(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate Credentials" onclick="deactivateemployeecredentials(\'' + code + '\')" ><i class="simple-icon-user"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="inactivateemployee(\'' + code + '\')" ><i class="simple-icon-trash"></i></button> ';
                                    }
                                    else {
                                        var code = row.Employee_Uniqueid;
                                        return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewemployeedetails(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Activate Credentials" onclick="createemployeecredentials(\'' + code + '\')" ><i class="simple-icon-user"></i></button>  <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="inactivateemployee(\'' + code + '\')" ><i class="simple-icon-trash"></i></button> </td>';
                                    }
                                }
                                else {
                                    var code = row.Employee_Uniqueid;
                                    return '<td><button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Re Activate" onclick="reactivateemployee(\'' + code + '\')" ><i class="simple-icon-reload"></i></button></td>';
                                }
                            }
                        }
                    ]
                });
            }
            else {
                $('#tbl_employeelist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
function saveemployeedetails() {
    var data = new FormData();
    data.append("Employee_Photo", $("#photo1").get(0).files[0]);
    data.append("Employee_Name", $.trim($('#txtname').val()));
    data.append("Employee_Address", $.trim($('#txtaddress').val()));
    data.append("Employee_Country", $.trim($('#ddlcountry').val()));
    data.append("Employee_State", $.trim($('#ddlstate').val()));
    data.append("Employee_City", $.trim($('#ddlcity').val()));
    data.append("Employee_Designation", $.trim($('#ddldesignation').val()));
    data.append('Employee_Gender', $('input[name=rdogender]:checked').val());
    data.append("Employee_Role", $.trim($('#ddlrole').val()));
    data.append("Employee_Email", $.trim($('#txtemail').val()));
    data.append("Employee_Phone", $.trim($('#txtphone').val()));
    data.append("Employee_Date_Of_Birth", $.trim($('#txtdob').val()));
    data.append("Employee_Join_Date", $.trim($('#txtjoindate').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Employee/SaveEmployeeDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                resetemployee();
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message)
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message)
            }
            else {
                var content = "Invalid";
                var title = "Server error";
                ErrorAlert(title, content);
            }
        },
        error: function (response) {

        }
    });
}
function viewemployeedetails(code) {

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
            data.append("Employee_Uniqueid", code);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/Employee/LoadEmployees",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        $('#btnUpdate').show();
                        $('#btnSave').hide();
                        $('#Employee-Modal').modal('show');
                        $.each(response, function (i, vari) {
                           
                            if (vari.Employee_Photo != "" && vari.Employee_Photo != null) {
                                $('#txtphoto1').val(vari.Employee_Photo);
                                $('#image1').attr('src', vari.Employee_Photo);
                                $('#photo1').prop('required', false);
                            }
                            else {
                                $('#photo1').prop('required', true);
                            }
                            $('#txtname').val(vari.Employee_Name);
                            $('#txtaddress').val(vari.Employee_Address);
                            $('#ddlcountry').val(vari.Employee_Country);
                            loadstatedetails(vari.Employee_Country, vari.Employee_State);
                            loadcitydetails(vari.Employee_State, vari.Employee_City);
                            $('input:radio[name=rdogender]').filter('[value="' + vari.Employee_Gender + '"]').attr('checked', true);
                            $('#txtdob').val(vari.Employee_Date_Of_Birth);
                            $('#txtemail').val(vari.Employee_Email);
                            $('#txtphone').val(vari.Employee_Phone);
                            $('#ddldesignation').val(vari.Employee_Designation);
                            $('#ddlrole').val(vari.Employee_Role);
                            $('#txtjoindate').val(vari.Employee_Join_Date);
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
function updateemployeedetails() {
    var data = new FormData();
    data.append("Employee_Photo", $("#photo1").get(0).files[0]);
    data.append("Employee_Photo_Check", $.trim($('#txtphoto1').val()));
    data.append("Employee_Name", $.trim($('#txtname').val()));
    data.append("Employee_Address", $.trim($('#txtaddress').val()));
    data.append("Employee_Country", $.trim($('#ddlcountry').val()));
    data.append("Employee_State", $.trim($('#ddlstate').val()));
    data.append("Employee_City", $.trim($('#ddlcity').val()));
    data.append('Employee_Gender', $('input[name=rdogender]:checked').val());
    data.append("Employee_Designation", $.trim($('#ddldesignation').val()));
    data.append("Employee_Role", $.trim($('#ddlrole').val()));
    data.append("Employee_Email", $.trim($('#txtemail').val()));
    data.append("Employee_Phone", $.trim($('#txtphone').val()));
    data.append("Employee_Date_Of_Birth", $.trim($('#txtdob').val()));
    data.append("Employee_Join_Date", $.trim($('#txtjoindate').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Employee/UpdateEmployeeDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                $('#Employee-Modal').modal('hide');
                resetemployee();
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message)
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message)
            }
            else {
                var content = "Invalid";
                var title = "Server error";
                ErrorAlert(title, content);
                $("#txtusername").val("");
                $("#txtpassword").val("");
            }
        },
        error: function (response) {

        }
    });
}
function inactivateemployee(code) {
    var data = new FormData();
    data.append("Employee_Uniqueid", code);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Employee/DeactivateEmployee",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.length > 0) {
                if (response[0].Type == "Success") {
                    SuccessAlert(response[0].Title, response[0].Message);
                    resetemployee();
                }
                else if (response[0].Type == "Warning") {
                    WarningAlert(response[0].Title, response[0].Message)
                }
                else if (response[0].Type == "Error") {
                    ErrorAlert(response[0].Title, response[0].Message)
                }
                else {
                    var content = "Invalid";
                    var title = "Server error";
                    ErrorAlert(title, content);
                }
            }
            else {

            }
        },
        error: function (response) {

        }
    });
}
function reactivateemployee(code) {
    var data = new FormData();
    data.append("Employee_Uniqueid", code);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Employee/ReactivateEmployee",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.length > 0) {
                if (response[0].Type == "Success") {
                    SuccessAlert(response[0].Title, response[0].Message);
                    resetemployee();
                }
                else if (response[0].Type == "Warning") {
                    WarningAlert(response[0].Title, response[0].Message)
                }
                else if (response[0].Type == "Error") {
                    ErrorAlert(response[0].Title, response[0].Message)
                }
                else {
                    var content = "Invalid";
                    var title = "Server error";
                    ErrorAlert(title, content);
                }
            }
            else {

            }
        },
        error: function (response) {

        }
    });
}
function createemployeecredentials(code) {
    var data = new FormData();
    data.append("Employee_Uniqueid", code);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Employee/CreateEmployeeCredentials",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.length > 0) {
                if (response[0].Type == "Success") {
                    SuccessAlert(response[0].Title, response[0].Message);
                    resetemployee();
                }
                else if (response[0].Type == "Warning") {
                    WarningAlert(response[0].Title, response[0].Message)
                }
                else if (response[0].Type == "Error") {
                    ErrorAlert(response[0].Title, response[0].Message)
                }
                else {
                    var content = "Invalid";
                    var title = "Server error";
                    ErrorAlert(title, content);
                }
            }
        },
        error: function (response) {

        }
    });
}
function deactivateemployeecredentials(code) {
    var data = new FormData();
    data.append("Employee_Uniqueid", code);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Employee/DeactivateEmployeeCredentials",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.length > 0) {
                if (response[0].Type == "Success") {
                    SuccessAlert(response[0].Title, response[0].Message);
                    resetemployee();
                }
                else if (response[0].Type == "Warning") {
                    WarningAlert(response[0].Title, response[0].Message)
                }
                else if (response[0].Type == "Error") {
                    ErrorAlert(response[0].Title, response[0].Message)
                }
                else {
                    var content = "Invalid";
                    var title = "Server error";
                    ErrorAlert(title, content);
                }
            }
        },
        error: function (response) {

        }
    });
}
function loadcountrydetails() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Employee/LoadCountry",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlcountry").html("");
                $("#ddlcountry").append('<option value="">Select Country</option>');
                $.each(response, function (i, vari) {
                    $("#ddlcountry").append('<option value="' + vari.id + '">' + vari.name + '</option>');
                });
            }
            else {

            }
        },
        error: function (response) {

        }
    });
}
function loadstatedetails(country, state) {
    var data = new FormData();
    data.append("country", country);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Employee/LoadState",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlstate").html("");
                $("#ddlstate").append('<option value="">Select State</option>');
                var code = "";
                $.each(response, function (i, vari) {
                    $("#ddlstate").append('<option value="' + vari.id + '">' + vari.name + '</option>');
                    code = vari.phone_code;
                });
                $('#ddlstate').val(state);
            }
            else {

            }
        },
        error: function (response) {

        }
    });
}
function loadcitydetails(state, city) {
    var data = new FormData();
    data.append("state", state);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Employee/LoadCity",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlcity").html("");
                $("#ddlcity").append('<option value="">Select City</option>');
                $.each(response, function (i, vari) {
                    $("#ddlcity").append('<option value="' + vari.id + '">' + vari.name + '</option>');
                });
                $("#ddlcity").val(city);
            }
            else {

            }
        },
        error: function (response) {

        }
    });
}
function fasterPreviewimage1(uploader) {
    if (uploader.files && uploader.files[0]) {
        $('#image1').attr('src', window.URL.createObjectURL(uploader.files[0]));
    }
}