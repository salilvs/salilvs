$(function () {

    $('input.thresold-i').maxlength()
    $('#btnSave').unbind().click(function () {
        $('#btnSave').prop('disabled', true);
        if ($('#maincategoryform').parsley().validate() !== true) {
            $('#btnSave').prop('disabled', false);
        }
        else {
            savemaincategorydetails();
        }
    });
    $('#btnUpdate').unbind().click(function () {
        $('#btnUpdate').prop('disabled', true);
        if ($('#maincategoryform').parsley().validate() !== true) {
            $('#btnUpdate').prop('disabled', false);
        }
        else {
            updatemaincategorydetails();
        }
    });
    resetmaincategory();
    $('#btnClose,#btnReset').unbind().click(function () {
        resetmaincategory();
    });
    $('#image1').click(function (e) {
        $('#photo1').click();
    });
    $('#photo1').change(function () {
        fasterPreviewimage1(this);
    });



    $('#btnCategoryApprove').unbind().click(function () {
        event.preventDefault();
        $('#btnCategoryApprove').prop('disabled', false);
        if ($('#maincategoryform').parsley().validate() !== true) {
            $('#btnCategoryApprove').prop('disabled', false);
        }
        else {
            $('#btnCategoryApprove').prop('disabled', true);
            approvemaincategorydetails();
        }
    });


    $('#btnCategoryReject').unbind().click(function () {
        event.preventDefault();
        $('#btnCategoryReject').prop('disabled', false);
        $('#test').modal('show');


    });

    $('#btnCategoryRejectSave').unbind().click(function () {

        event.preventDefault();
        $('#btnCategoryRejectSave').prop('disabled', false);

        rejectCategoryDetails();


    });


});



function rejectCategoryDetails() {
    var data = new FormData();

    data.append("RejectedReason", $.trim($("#txtrejecteddescription").val()));

    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        //url: "/VendorCreation/approveVendorPackageDetails",
        url: "/MainCategory/rejectCategoryDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].type == "Success") {
                SuccessAlert(response[0].title, response[0].message);
                $('#Vendor-Package-Modal').modal('hide');
                // resetpackagedetails();
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
                $("#txtusername").val("");
                $("#txtpassword").val("");
            }
        },
        error: function (response) {

        }
    });
}










function resetmaincategory() {
    loadmaincategorydetails();

    $('#btnCategoryApprove').prop('disabled', false);
    $('#btnCategoryReject').prop('disabled', false);
    $('#btnCategoryApprove').hide();
    $('#btnCategoryReject').hide();


    $('#btnUpdate').prop('disabled', false);
    $('#btnSave').prop('disabled', false);
    $('#btnUpdate').hide();
    $('#btnSave').show();
    $('#maincategoryform').parsley().reset();
    $('#maincategoryform')[0].reset();
    $('#image1').attr('src', "/webapp/assets/images/no-image-found-360x250.png");
}
function loadmaincategorydetails() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/MainCategory/LoadMainCategory",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_vendormaincategorylist').DataTable({ destroy: true });
                table.destroy();
                
                $('#tbl_vendormaincategorylist').DataTable({
                //$('#tbl_maincategorylist').DataTable({
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
                                var image = row.main_Category_Photo;
                                return '<td><div class="sidebar-user"><div class="sidebar-user-picture"><img alt="image" src="' + image + '" width="50px" height="50px"></div></div></td>';
                            }
                        },
                        { data: 'main_Category_Name' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var stat = row.main_Category_Status;
                                if (stat == "Active") {
                                    return '<span class="badge badge-pill badge-success">' + stat + '</span>';
                                }
                                else { return '<span class="badge badge-pill badge-danger">' + stat + '</span>'; }
                            }
                        },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                if (row.main_Category_Status == "Active") {
                                    var code = row.main_Category_Uniqueid;
                                    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewmaincategorydetails(\'' + code + '\')" ><i class="feather icon-edit"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="inactivatemaincategory(\'' + code + '\')" ><i class="feather icon-trash"></i></button>';
                                }
                                else if (row.main_Category_Status == "Pending") {
                                    var code = row.main_Category_Uniqueid;
                                    //return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewmaincategorydetails(\'' + code + '\')" ><i class="feather icon-edit"></i></button>';
                                    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewmaincategoryrequestdetails(\'' + code + '\')" ><i class="feather icon-edit"></i></button>';

                                }
                                else if (row.main_Category_Status == "Rejected") {
                                    var code = row.main_Category_Uniqueid;
                                    //return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewmaincategorydetails(\'' + code + '\')" ><i class="feather icon-edit"></i></button>';
                                    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewmaincategoryrejectdetails(\'' + code + '\')" ><i class="feather icon-edit"></i></button>';

                                }
                                else {
                                    var code = row.main_Category_Uniqueid;
                                    return '<td><button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Re Activate" onclick="reactivatemaincategory(\'' + code + '\')" ><i class="feather icon-edit"></i></button></td>';
                                }
                            }
                        }
                    ]
                });
            }
            else {
                $('#tbl_maincategorylist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
function savemaincategorydetails() {
    var data = new FormData();
    data.append("Main_Category_Photo", $("#photo1").get(0).files[0]);
    data.append("Main_Category_Name", $.trim($('#txtname').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/MainCategory/SaveMainCategoryDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].type == "Success") {
                SuccessAlert(response[0].title, response[0].message);
                resetmaincategory();
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
        },
        error: function (response) {

        }
    });
}
function viewmaincategorydetails(code) {

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
            data.append("Main_Category_Id", code);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/MainCategory/LoadMainCategoryById",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        $('#btnUpdate').show();
                        $('#btnSave').hide();
                        $('#Main-Category-Modal').modal('show');
                        $.each(response, function (i, vari) {
                            $('#txtphoto1').val(vari.main_Category_Photo);
                            $('#image1').attr('src', vari.main_Category_Photo);
                            $('#txtname').val(vari.main_Category_Name);


                            //$('#txtrequest').val(vari.Main_Category_Request);
                            // $('#txtrequest').val(vari.main_Category_Request);

                            // alert(vari.main_Category_Request);


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




function viewmaincategoryrequestdetails(code) {

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
            data.append("Main_Category_Id", code);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/MainCategory/loadMainCategoryrequestById",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        $('#btnUpdate').hide();
                        $('#btnSave').hide();
                        $('#btnCategoryApprove').show();
                        $('#btnCategoryReject').show();
                        $('#Main-Category-Modal').modal('show');
                        $.each(response, function (i, vari) {
                            $('#txtphoto1').val(vari.main_Category_Photo);
                            $('#image1').attr('src', vari.main_Category_Photo);
                            $('#txtname').val(vari.main_Category_Name);


                            //$('#txtrequest').val(vari.Main_Category_Request);
                            $('#txtrequest').val(vari.main_Category_Request);

                            // alert(vari.main_Category_Request);


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




function viewmaincategoryrejectdetails(code) {

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
            data.append("Main_Category_Id", code);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/MainCategory/loadMainCategoryrejectById",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        $('#btnUpdate').hide();
                        $('#btnSave').hide();
                        $('#btnCategoryApprove').show();
                        $('#btnCategoryReject').show();
                        $('#btnCategoryRejectSave').hide();
                        $('#Main-Category-Modal').modal('show');
                        $.each(response, function (i, vari) {
                            $('#txtphoto1').val(vari.main_Category_Photo);
                            $('#image1').attr('src', vari.main_Category_Photo);
                            $('#txtname').val(vari.main_Category_Name);


                            //$('#txtrequest').val(vari.Main_Category_Request);
                            $('#txtrequest').val(vari.main_Category_Request);

                            $('#txtrejecteddescription').val(vari.rejected_Reason);




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





function approvemaincategorydetails() {
    var data = new FormData();
    data.append("Main_Category_Photo", $("#photo1").get(0).files[0]);
    data.append("Main_Category_Photo_Check", $.trim($('#txtphoto1').val()));
    data.append("Main_Category_Name", $.trim($('#txtname').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/MainCategory/ApproveMainCategoryDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].type == "Success") {
                SuccessAlert(response[0].title, response[0].message);
                $('#Main-Category-Modal').modal('hide');
                resetmaincategory();
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
                $("#txtusername").val("");
                $("#txtpassword").val("");
            }
        },
        error: function (response) {

        }
    });
}





function updatemaincategorydetails() {
    var data = new FormData();
    data.append("Main_Category_Photo", $("#photo1").get(0).files[0]);
    data.append("Main_Category_Photo_Check", $.trim($('#txtphoto1').val()));
    data.append("Main_Category_Name", $.trim($('#txtname').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/MainCategory/UpdateMainCategoryDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].type == "Success") {
                SuccessAlert(response[0].title, response[0].message);
                $('#Main-Category-Modal').modal('hide');
                resetmaincategory();
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
                $("#txtusername").val("");
                $("#txtpassword").val("");
            }
        },
        error: function (response) {

        }
    });
}
function inactivatemaincategory(code) {
    var data = new FormData();
    data.append("Main_Category_Id", code);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/MainCategory/DeactivateMainCategoryDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.length > 0) {
                if (response[0].type == "Success") {
                    SuccessAlert(response[0].title, response[0].message);
                    resetmaincategory();
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
            else {

            }
        },
        error: function (response) {

        }
    });
}
function reactivatemaincategory(code) {
    var data = new FormData();
    data.append("Main_Category_Id", code);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/MainCategory/ReactivateEmployee",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.length > 0) {
                if (response[0].type == "Success") {
                    SuccessAlert(response[0].title, response[0].message);
                    resetmaincategory();
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