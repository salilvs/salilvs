$(function () {
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
            $('#image1').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
            $('#maincategoryform').parsley().reset();
            $('#maincategoryform')[0].reset();
        }
    });
    resetmaincategory();
    $('#btnClose,#btnReset').unbind().click(function () {
        resetmaincategory();
    });
    $('#image1').unbind().click(function (e) {
        $('#photo1').click();
    });
    $('#photo1').change(function () {
        fasterPreviewimage1(this);
    });
});

function resetmaincategory() {
    loadmaincategorydetails();
    $('#btnUpdate').prop('disabled', false);
    $('#btnSave').prop('disabled', false);
    $('#btnUpdate').hide();
    $('#btnSave').show();
    $('#maincategoryform').parsley().reset();
    $('#maincategoryform')[0].reset();
    $('#image1').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
}
function loadmaincategorydetails() {
    var data = new FormData();
    var Main_Category_Status = "Active, In Active";
    data.append("Main_Category_Status", Main_Category_Status);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/MainCategory/LoadMainCategory",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_maincategorylist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_maincategorylist').DataTable({
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
                                var image = row.Main_Category_Photo;
                                return '<td><div class="sidebar-user"><div class="sidebar-user-picture"><img alt="image" src="' + image + '" width="50px" height="50px"></div></div></td>';
                            }
                        },
                        { data: 'Main_Category_Name' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var stat = row.Main_Category_Status;
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
                        { data: 'Main_Category_Created_Date' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                if (row.Main_Category_Status == "Active") {
                                    var code = row.Main_Category_Uniqueid;
                                    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewmaincategorydetails(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="inactivatemaincategory(\'' + code + '\')" ><i class="simple-icon-trash"></i></button>';
                                }
                                else if (row.Main_Category_Status == "Pending") {
                                    var code = row.Main_Category_Uniqueid;
                                    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewmaincategorydetails(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button>';

                                }
                                else if (row.Main_Category_Status == "Rejected") {
                                    var code = row.Main_Category_Uniqueid;
                                    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewmaincategorydetails(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button>';

                                }
                                else {
                                    var code = row.Main_Category_Uniqueid;
                                    return '<td><button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Re Activate" onclick="reactivatemaincategory(\'' + code + '\')" ><i class="simple-icon-reload"></i></button></td>';
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
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                resetmaincategory();
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
            data.append("Main_Category_Uniqueid", code);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/MainCategory/LoadMainCategory",
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
                        $('#reasonSection').html('');
                        $.each(response, function (i, vari) {
                            $('#txtphoto1').val(vari.Main_Category_Photo);
                            if (vari.Main_Category_Photo != null) {
                                $('#photo1').prop('required', false);
                            }
                            $('#image1').attr('src', vari.Main_Category_Photo);
                            $('#txtname').val(vari.Main_Category_Name);
                            $.each(vari.rmc, function (i, varis) {
                                $('#reasonSection').append(
                                    '<label>Rejected Reason</label>' +
                                    '<div class="row">' +
                                    '<div class="col-6"><input class="form-control" value="' + varis.Main_Category_Rejected_Reason + '" ></div><div class="col-6"><input class="form-control" value="' + varis.Main_Category_Created_Date + '" ></div><br/>' +
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
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                $('#Main-Category-Modal').modal('hide');
                //resetmaincategory();
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
                var title = "Invaild error.";
                ErrorAlert(title, content);
                $('#btnUpdate').prop('disabled', false);
            }
        },
        error: function (response) {

        }
    });
}
function inactivatemaincategory(code) {
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
                        if (response[0].Type == "Success") {
                            SuccessAlert(response[0].Title, response[0].Message);
                            resetmaincategory();
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
function reactivatemaincategory(code) {
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
            data.append("Main_Category_Id", code);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/MainCategory/ReactivateMainCategoryDetails",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response.length > 0) {
                        if (response[0].Type == "Success") {
                            SuccessAlert(response[0].Title, response[0].Message);
                            resetmaincategory();
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
function fasterPreviewimage1(uploader) {
    if (uploader.files && uploader.files[0]) {
        $('#image1').attr('src', window.URL.createObjectURL(uploader.files[0]));
    }
}