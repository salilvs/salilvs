$(function () {
    //imageFranchiseImag();
    //$('#image1').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
    $("#txtdofb").datetimepicker({
        // Formats
        format: 'YYYY-MM-DD',
        icons:
        {
            next: 'fa fa-angle-right',
            previous: 'fa fa-angle-left'
        },
    });

    loadcountrydetails();
    $('#ddlcountry').change(function () {
        loadstatedetails($('#ddlcountry').val());
    });
    $('#ddlstate').change(function () {
        loadcitydetails($('#ddlstate').val());
    });

    $('#btnproof1remove').unbind().click(function () {
        $('#proof1').show();
        $('#proof1').prop('required', true);
        $('#btnproof1download').hide();
        $('#btnproof1remove').hide();
    });
    $('#btnproof2remove').unbind().click(function () {
        $('#proof2').show();
        $('#btnproof2download').hide();
        $('#btnproof2remove').hide();
        $('#txtproof2').val('');
    });
    $('#btnproof3remove').unbind().click(function () {
        $('#proof3').show();
        $('#btnproof3download').hide();
        $('#btnproof3remove').hide();
        $('#txtproof3').val('');
    });
    $('#btnproof4remove').unbind().click(function () {
        $('#proof4').show();
        $('#btnproof4download').hide();
        $('#btnproof4remove').hide();
        $('#txtproof4').val('');
    });
    resetfranchise();
    //First load Checkbox property checked
   
    //$('#chksunday').attr('checked', 'checked');
    //$('#chkmonday').attr('checked', 'checked');
    //$('#chktuesday').attr('checked', 'checked');
    //$('#chkwednesday').attr('checked', 'checked');
    //$('#chkthursday').attr('checked', 'checked');
    //$('#chkfriday').attr('checked', 'checked');
    //$('#chksaturday').attr('checked', 'checked');

    $('#btnSave').unbind().click(function () {
        event.preventDefault();
        if ($('#franchiseform').parsley().validate() !== true) {
        }
        else {
            savedetails();
        }
    });
    $('#btnClose,#btnReset').unbind().click(function () {
        resetfranchise();
    });

    $('#btnUpdate').unbind().click(function () {
        event.preventDefault();
        if ($('#franchiseform').parsley().validate() !== true) {
        }
        else {
            updateFranchiseDetails();
        }
    });
});

function resetfranchise() {
    imageFranchiseImag();
    loadfranchisedetails();
    $('#btnUpdate').hide();
    
    $('#btnSave').prop('disabled', false);
    $('#btnSave').show();
    $('#franchiseform').parsley().reset();
    $('#franchiseform')[0].reset();
    $('#image1').prop('src', '../assets/img/bookit/no-image-found-360x250.png');
    $('#btnproof1remove').hide();
    $('#btnproof2remove').hide();
    $('#btnproof3remove').hide();
    $('#btnproof4remove').hide();
    $('#btnproof1download').hide();
    $('#btnproof2download').hide();
    $('#btnproof3download').hide();
    $('#btnproof4download').hide();
}

function loadfranchisedetails() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Franchise/LoadFranchise",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_franchiselist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_franchiselist').DataTable({
                    data: dat,
                    autoWidth: true,
                    responsive: true,
                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var image = row.FranchiseImgURL;
                                return '<td><div class="sidebar-user"><div class="sidebar-user-picture"><img alt="image" src="' + image + '" width="50px" height="50px"></div></div></td>';
                            }
                        },
                        { data: 'FranchiseId' },
                        { data: 'Name' },
                        { data: 'Email' },
                        { data: 'Phone' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var stat = row.Franchise_stat;
                                if (stat == "Active") {
                                    return '<span class="badge badge-pill badge-success">' + stat + '</span>';
                                }
                                else { return '<span class="badge badge-pill badge-danger">' + stat + '</span>'; }
                            }
                        },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                if (row.Franchise_stat == "Active") {
                                    if (row.Login_Access == "Yes") {
                                        var code = row.Id;
                                        var code1 = row.FranchiseId;
                                        return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" data-vid=' + code + ' onclick="viewfranchisedetails(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Activate Credentials" onclick="createfranch_credentials(\'' + code1 + '\')" ><i class="simple-icon-login"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="DeactivateFranchise(\'' + code + '\')" ><i class="simple-icon-trash"></i></button></td>';
                                    }
                                    else {
                                        var code = row.Id;
                                        var code1 = row.FranchiseId;
                                        return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" data-vid=' + code + ' onclick="viewfranchisedetails(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Activate Credentials" onclick="createfranch_credentials(\'' + code1 + '\')" ><i class="simple-icon-login"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="DeactivateFranchise(\'' + code + '\')" ><i class="simple-icon-trash"></i></button></td>';
                                    }
                                }
                                else {
                                  
                                    var code = row.Id;
                                    return '<td><button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Re Activate" onclick="reactivatefranchise(\'' + code + '\')" ><i class="simple-icon-reload"></i></button></td>';
                                }
                            }
                        }
                    ]
                });
            }
            else {
                $('#tbl_franchiselist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}

function reactivatefranchise(code) {
  
    swal({
        title: "Are you sure?",
        text: "Do you want to reactivate the Franchise!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes",
    }, function (isConfirm) {
        if (isConfirm) {
            var data = new FormData();
            data.append("Id", code);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/Franchise/reactivateFranchise",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response.length > 0) {
                        if (response[0].Type == "Success") {
                            SuccessAlert(response[0].Title, response[0].Message);
                            resetfranchise();
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

function DeactivateFranchise(code) {
    swal({
        title: "Are you sure?",
        text: "Do you want to deactivate the details!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes",
    }, function (isConfirm) {
        if (isConfirm) {
            var data = new FormData();
            data.append("Id", code);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/Franchise/DeactivateFranchise",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response.length > 0) {
                        if (response[0].Type == "Success") {
                            SuccessAlert(response[0].Title, response[0].Message);
                            resetfranchise();
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

function viewfranchisedetails(code) {
    swal({
        title: "Are you sure?",
        text: "Do you want to View the Franchise Details!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes, View it!",
    }, function (isConfirm) {
        if (isConfirm) {
            var data = new FormData();
            data.append("Id", code);
            // data.append("Id", GetURLParameter('vid'));
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/Franchise/FranchiseView",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        $('#Franchise-Modal').modal('show');
                        $('#btnUpdate').show();
                        $('#btnSave').hide();
                        $.each(response, function (i, vari) {
                            //if (vari.Package_Photo != "" && vari.Photo != null) {
                            if (vari.FranchiseImgURL != "" && vari.FranchiseImgURL != null) {
                                $("#image1").prop('src', vari.FranchiseImgURL);
                                $('#txtphoto1').val(vari.FranchiseImgURL);
                                //$('#image1').attr('src', vari.FranchiseImgURL);
                                $('#photo1').prop("required", false);
                            }
                            else {
                               $('#txtphoto1').val("");
                                $('#image1').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
                                $('#photo1').prop("required", true);
                            }

                           // $('#dvitemcode').show();
                           // $('#txtitemcode').val(vari.DeliveryBoyId);
                            $('#txtname').val(vari.Name);
                            $('#txtdofb').val(vari.DOB);
                            $('#txtaddress').val(vari.Address);
                            $('#txtgender').val(vari.Gender);
                            $('#txtemail').val(vari.Email);
                            $('#txtphone').val(vari.Phone);
                            $('#ddlcountry').val(vari.Country);
                            loadstatedetails(vari.Country, vari.State)
                            loadcitydetails(vari.State, vari.City);
                            var selectedValues = vari.Workingdays.split(',');
                            $.each(selectedValues, function (i, result) {
                                //$("input[name='chkholiday'][value='" + selectedValues[i] + "']").prop('checked', false);
                                $("input[name='chkholiday'][value='" + selectedValues[i] + "']").prop('checked', 'checked');
                            });
                            $("#txtproof1").val(vari.Documents1);
                            $("#txtproof2").val(vari.Documents2);
                            $("#txtproof3").val(vari.Documents3);
                            $("#txtproof4").val(vari.Documents4);
                            if (vari.Documents1 != "") {
                                $('#proof1').hide();
                                $('#proof1').prop('required', false);
                                $('#btnproof1download').show();
                                $('#btnproof1remove').show();
                                $('#btnproof1download').unbind().click(function () {
                                    var iframe = "<iframe width='100%' height='100%' src='" + vari.Documents1 + "'></iframe>"
                                    var x = window.open();
                                    x.document.open();

                                    x.document.Title = "Document 1";
                                    x.document.write(iframe);
                                    x.document.close();
                                });
                            }
                            else {
                                $('#proof1').show();
                                $('#proof1').prop('required', true);
                                $('#btnproof1download').hide();
                                $('#btnproof1remove').hide();
                            }
                            if (vari.Documents2 != "") {
                                $('#proof2').hide();
                                $('#btnproof2download').show();
                                $('#btnproof2remove').show();
                                $('#btnproof2download').unbind().click(function () {
                                    var iframe = "<iframe width='100%' height='100%' src='" + vari.Documents2 + "'></iframe>"
                                    var x = window.open();
                                    x.document.open();

                                    x.document.Title = "Document 2";
                                    x.document.write(iframe);
                                    x.document.close();
                                });
                            }
                            else {
                                $('#proof2').show();
                                $('#btnproof2download').hide();
                                $('#btnproof2remove').hide();
                            }
                            if (vari.Documents3 != "") {
                                $('#proof3').hide();
                                $('#btnproof3download').show();
                                $('#btnproof3remove').show();
                                $('#btnproof3download').unbind().click(function () {
                                    var iframe = "<iframe width='100%' height='100%' src='" + vari.Documents3 + "'></iframe>"
                                    var x = window.open();
                                    x.document.open();

                                    x.document.Title = "Document 3";
                                    x.document.write(iframe);
                                    x.document.close();
                                });
                            }
                            else {
                                $('#proof3').show();
                                $('#btnproof3download').hide();
                                $('#btnproof3remove').hide();
                            }
                            if (vari.Documents4 != "") {
                                $('#proof4').hide();
                                $('#btnproof4download').show();
                                $('#btnproof4remove').show();
                                $('#btnproof4download').unbind().click(function () {
                                    var iframe = "<iframe width='100%' height='100%' src='" + vari.Documents4 + "'></iframe>"
                                    var x = window.open();
                                    x.document.open();
                                    x.document.Title = "Document 4";
                                    x.document.write(iframe);
                                    x.document.close();
                                });
                            }
                            else {
                                $('#proof4').show();
                                $('#btnproof4download').hide();
                                $('#btnproof4remove').hide();
                            }
                            $('#txtbankname').val(vari.BankName);
                            $('#txtaccountnumber').val(vari.AccountNumber);
                            $('#txtifsccode').val(vari.IFSC_Code);
                            $('#txtusername').val(vari.Username);
                            $('#txtpassword').val(vari.Password);
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
function savedetails() {
    var holidays = [];
    $("input:checkbox[name='chkholiday']:checked").each(function () {
        holidays.push($(this).val());
    });
    var data = new FormData();
    //data.append("Vendor_Type_Id", GetURLParameter('vid'));
    data.append("FranchiseImgURL", $("#photo1").get(0).files[0]);
    data.append("Name", $.trim($('#txtname').val()));
    data.append("DOB", $.trim($('#txtdofb').val()));
    data.append("Address", $.trim($('#txtaddress').val()));
    data.append("Gender", $('input[name=rdogender]:checked').val());
    data.append("Email", $.trim($('#txtemail').val()));
    data.append("Phone", $.trim($('#txtphone').val()));
    data.append("Country", $.trim($("#ddlcountry").val()));
    data.append("State", $.trim($("#ddlstate").val()));
    data.append("City", $.trim($("#ddlcity").val()));
    data.append("Documents1", $("#proof1").get(0).files[0]);
    data.append("Documents2", $("#proof2").get(0).files[0]);
    data.append("Documents3", $("#proof3").get(0).files[0]);
    data.append("Documents4", $("#proof4").get(0).files[0]);
    data.append("Vendor_Document_Doc_1_Check", $.trim($("#txtproof1").val()));
    data.append("Vendor_Document_Doc_2_Check", $.trim($("#txtproof2").val()));
    data.append("Vendor_Document_Doc_3_Check", $.trim($("#txtproof3").val()));
    data.append("Vendor_Document_Doc_4_Check", $.trim($("#txtproof4").val()));
    data.append("Workingdays", holidays);
    data.append("BankName", $.trim($('#txtbankname').val()));
    data.append("AccountNumber", $.trim($('#txtaccountnumber').val()));
    data.append("Ifsc", $.trim($('#txtifsccode').val()));

    data.append("Username", $.trim($('#txtusername').val()));
    data.append("Password", $.trim($('#txtpassword').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        //url: "/VendorProduct/saveProductcategorydetails",
        url: "/Franchise/saveFranchiseDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {

                //var Id = response[0].response_Id;
                //var email_id = $('#txtemail').val();
                //var user_name = $('#txtusername').val();
                //var pass = $('#txtpassword').val();
                //var phone = $('#txtphone').val();
                //createfranchisecredentials(Id,email_id,user_name, pass)
                //createufranchisecredentials_phone(Id,email_id,user_name, pass, phone)



                SuccessAlert(response[0].Title, response[0].Message);
                resetfranchise();
                $('#Franchise-Modal').modal('hide');

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
                $('#btnSave').prop('disabled', false);
            }
        },
        error: function (response) {

        }
    });
}


function updateFranchiseDetails() {
    var holidays = [];
    $("input:checkbox[name='chkholiday']:checked").each(function () {
        holidays.push($(this).val());
    });
    var data = new FormData();
    data.append("Id", '');
    data.append("FranchiseImgURL", $("#photo1").get(0).files[0]);
    data.append("Franchise_Photo_Check", $.trim($("#txtphoto1").val()));
    data.append("Name", $.trim($('#txtname').val()));
    data.append("DOB", $.trim($('#txtdofb').val()));
    data.append("Address", $.trim($('#txtaddress').val()));
    data.append("Gender", $('input[name=rdogender]:checked').val());
    data.append("Email", $.trim($('#txtemail').val()));
    data.append("Phone", $.trim($('#txtphone').val()));
    data.append("Country", $.trim($("#ddlcountry").val()));
    data.append("State", $.trim($("#ddlstate").val()));
    data.append("City", $.trim($("#ddlcity").val()));
    data.append("Documents1", $("#proof1").get(0).files[0]);
    data.append("Documents2", $("#proof2").get(0).files[0]);
    data.append("Documents3", $("#proof3").get(0).files[0]);
    data.append("Documents4", $("#proof4").get(0).files[0]);
    data.append("Vendor_Document_Doc_1_Check", $.trim($("#txtproof1").val()));
    data.append("Vendor_Document_Doc_2_Check", $.trim($("#txtproof2").val()));
    data.append("Vendor_Document_Doc_3_Check", $.trim($("#txtproof3").val()));
    data.append("Vendor_Document_Doc_4_Check", $.trim($("#txtproof4").val()));
    data.append("Workingdays", holidays);
    data.append("BankName", $.trim($('#txtbankname').val()));
    data.append("AccountNumber", $.trim($('#txtaccountnumber').val()));
    data.append("Ifsc", $.trim($('#txtifsccode').val()));

    data.append("Username", $.trim($('#txtusername').val()));
    data.append("Password", $.trim($('#txtpassword').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        //url: "/VendorProduct/saveProductcategorydetails",
        url: "/Franchise/updateFranchiseDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                resetfranchise();
                $('#Franchise-Modal').modal('hide');

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
                $('#btnSave').prop('disabled', false);
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
        url: "/VendorCreation/LoadCountry",
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
        url: "/VendorCreation/LoadState",
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
                $('#txtphonecode').text(code);
                if (state != "" && state != null) {
                    $('#ddlstate').val(state);
                }
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
        url: "/VendorCreation/LoadCity",
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

function imageFranchiseImag() {
    $('#image1').click(function (e) {
        $('#photo1').click();
    });
    $('#photo1').change(function () {
        fasterPreviewimage1(this);
    });

    function fasterPreviewimage1(uploader) {
        if (uploader.files && uploader.files[0]) {
            $('#image1').attr('src', window.URL.createObjectURL(uploader.files[0]));
        }
    }
}

function createfranchisecredentials(Id,email_id, user_name, pass) {
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
            data.append("Id", Id);
            data.append("email_id", email_id)
            data.append("Login_Id", user_name);
            data.append("Pass", pass);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/Franchise/CreateFranchiseCredentials",
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
function createfranchisecredentials_phone(Id,email_id, pass, phone) {
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
                url: "/Franchise/createfranchisecredentials_phone",
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

function createfranch_credentials(code1) {
    swal({
        title: "Are you sure?",
        text: "Do you want activate the credentials!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes",
    }, function (isConfirm) {
        if (isConfirm) {
            var data = new FormData();
            data.append("FranchiseId", code1);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/Franchise/createfranch_credentials",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response.length > 0) {
                        if (response[0].Type == "Success") {
                            SuccessAlert(response[0].Title, response[0].Message);
                           // resetvendor();
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

        } else {

        }
    });

}
