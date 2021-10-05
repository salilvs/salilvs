$(function () {
    $('#btnSave').unbind().click(function () {
        event.preventDefault();
        $('#btnSave').prop('disabled', true);
        if ($('#serviceform').parsley().validate() !== true) {
            $('#btnSave').prop('disabled', false);
        }
        else {
            saveservicedetails();
        }
    });
    $('#btnUpdate').unbind().click(function () {
        event.preventDefault();
        $('#btnUpdate').prop('disabled', true);
        if ($('#serviceform').parsley().validate() !== true) {
            $('#btnUpdate').prop('disabled', false);
        }
        else {
            updateservicedetails();
            $('#image1').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
            $('#serviceform').parsley().reset();
            $('#serviceform')[0].reset();
        }
    });
    resetservice();
    $('#btnClose,#btnReset').unbind().click(function () {
        resetservice();
    });
    $('#image1').click(function (e) {
        $('#photo1').click();
    });
    $('#photo1').change(function () {
        fasterPreviewimage1(this);
    });
});
function resetservice() {
    loadservicedetails();
    loadmaincategorydetails();
    $('#btnUpdate').prop('disabled', false);
    $('#btnSave').prop('disabled', false);
    $('#btnUpdate').hide();
    $('#btnSave').show();
    $('#serviceform').parsley().reset();
    $('#serviceform')[0].reset();
    $('#image1').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
}
function loadservicedetails() {
    var data = new FormData();
    var Main_Services_Status = "Active, In Active";
    data.append("Main_Services_Status", Main_Services_Status);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/MainServices/LoadMainService",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_servicelist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_servicelist').DataTable({
                    data: dat,
                    autoWidth: false,
                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var image = row.Main_Services_Photo;
                                return '<td><div class="sidebar-user"><div class="sidebar-user-picture"><img alt="image" src="' + image + '" width="50px" height="50px"></div></div></td>';
                            }
                        },
                        { data: 'Main_Services_Main_Category_Name' },
                        { data: 'Main_Services_Name' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var stat = row.Main_Services_Status;
                                if (stat == "Active") {
                                    return '<span class="badge badge-pill badge-success">' + stat + '</span>';
                                }
                                if (stat == "Pending") {
                                    return '<span class="badge badge-pill badge-warning">' + stat + '</span>';
                                }
                                else { return '<span class="badge badge-pill badge-danger">' + stat + '</span>'; }
                            }
                        },
                        { data: 'Created_By' },
                        { data: 'Main_Services_Created_Date' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                if (row.Main_Services_Status == "Active") {
                                    var code = row.Main_Services_Uniqueid;
                                    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewservicedetails(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="inactivateservice(\'' + code + '\')" ><i class="simple-icon-trash"></i></button>';
                                }
                                else if (row.Main_Services_Status == "Pending") {
                                    var code = row.Main_Services_Uniqueid;
                                    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-warning" title = "Edit" onclick="viewservicedetails(\'' + code + '\')" ><i class="simple-icon-reload"></i></button> ';
                                }
                                else if (row.Main_Services_Status == "Rejected") {
                                    var code = row.Main_Services_Uniqueid;
                                    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "Edit" onclick="viewservicedetails(\'' + code + '\')" ><i class="simple-icon-reload"></i></button> ';
                                }
                                else {
                                    var code = row.Main_Services_Uniqueid;
                                    return '<td><button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Re Activate" onclick="reactivateservice(\'' + code + '\')" ><i class="simple-icon-reload"></i></button></td>';
                                }
                            }
                        }
                    ]
                });
            }
            else {
                $('#tbl_servicelist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
function saveservicedetails() {
    var data = new FormData();
    data.append("Main_Services_Photo", $("#photo1").get(0).files[0]);
    data.append("Main_Services_Main_Category", $.trim($('#ddlmaincategory').val()));
    data.append("Main_Services_Name", $.trim($('#txtname').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/MainServices/SaveMainServiceDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                resetservice();
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
                var title = "Invalid error occured.";
                ErrorAlert(title, content);
                $('#btnSave').prop('disabled', false);
            }
        },
        error: function (response) {

        }
    });
}
function viewservicedetails(code) {

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
            data.append("Main_Services_Uniqueid", code);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/MainServices/LoadMainService",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        $('#btnUpdate').show();
                        $('#btnSave').hide();
                        $('#Service-Modal').modal('show');
                        $('#reasonSection').html('');
                        $.each(response, function (i, vari) {
                            $('#txtphoto1').val(vari.Main_Services_Photo);
                            if (vari.Main_Services_Photo != null) {
                                $('#photo1').prop('required', false);
                            }
                            $('#ddlmaincategory').val(vari.Main_Services_Main_Category);
                            $('#image1').attr('src', vari.Main_Services_Photo);
                            $('#txtname').val(vari.Main_Services_Name);
                            $.each(vari.rms, function (i, varis) {
                                $('#reasonSection').append(
                                    '<label>Rejected Reason</label>' +
                                    '<div class="row">' +
                                    '<div class="col-6"><input class="form-control" value="' + varis.Main_Service_Rejected_Reason + '" ></div><div class="col-6"><input class="form-control" value="' + varis.Main_Service_Created_Date + '" ></div><br/>' +
                                    '</div>'
                                );
                            });
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
function updateservicedetails() {
    var data = new FormData();
    data.append("Main_Services_Photo", $("#photo1").get(0).files[0]);
    data.append("Main_Services_Photo_Check", $.trim($('#txtphoto1').val()));
    data.append("Main_Services_Main_Category", $.trim($('#ddlmaincategory').val()));
    data.append("Main_Services_Name", $.trim($('#txtname').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/MainServices/UpdateMainServiceDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                $('#Service-Modal').modal('hide');
               // resetservice();
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message);
                $('#btnUpdate').prop('disabled', false);
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                $('#btnUpdate').prop('disabled', false);
            }
            else {
                var content = "Invalid";
                var title = "Server Error.";
                ErrorAlert(title, content);
                $('#btnUpdate').prop('disabled', false);
            }
        },
        error: function (response) {

        }
    });
}
function inactivateservice(code) {
    swal({
        title: "Are you sure?",
        text: "Do you want to deactivate the data!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes",
    }, function (isConfirm) {
        if (isConfirm) {
            var data = new FormData();
            data.append("Main_Services_Id", code);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/MainServices/DeactivateMainServiceDetails",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response.length > 0) {
                        if (response[0].Type == "Success") {
                            SuccessAlert(response[0].Title, response[0].Message);
                            resetservice();
                        }
                        else if (response[0].Type == "Warning") {
                            WarningAlert(response[0].Title, response[0].Message)
                        }
                        else if (response[0].Type == "Error") {
                            ErrorAlert(response[0].Title, response[0].Message)
                        }
                        else {
                            var content = "Invalid";
                            var title = "Invalid error occured.";
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
    });}
function reactivateservice(code) {
    swal({
        title: "Are you sure?",
        text: "Do you want to reactivate the data!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes",
    }, function (isConfirm) {
        if (isConfirm) {
            var data = new FormData();
            data.append("Main_Services_Id", code);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/MainServices/ReactivateMainServiceDetails",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response.length > 0) {
                        if (response[0].Type == "Success") {
                            SuccessAlert(response[0].Title, response[0].Message);
                            resetservice();
                        }
                        else if (response[0].Type == "Warning") {
                            WarningAlert(response[0].Title, response[0].Message)
                        }
                        else if (response[0].Type == "Error") {
                            ErrorAlert(response[0].Title, response[0].Message)
                        }
                        else {
                            var content = "Invalid";
                            var title = "Invalid Error Occur";
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
function loadmaincategorydetails() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/MainCategory/LoadMainCategoryByActive",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlmaincategory").html("");
                $("#ddlmaincategory").append('<option value="">Select Main Category</option>');
                $.each(response, function (i, vari) {
                    $("#ddlmaincategory").append('<option value="' + vari.Main_Category_Uniqueid + '">' + vari.Main_Category_Name + '</option>');
                });

                $("#ddlRequestmaincategory").html("");
                $("#ddlRequestmaincategory").append('<option value="">Select Main Category</option>');
                $.each(response, function (i, vari) {
                    $("#ddlRequestmaincategory").append('<option value="' + vari.Main_Category_Uniqueid + '">' + vari.Main_Category_Name + '</option>');
                });
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