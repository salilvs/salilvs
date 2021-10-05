$(function () {
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
    // reject Approval section
    $('#btnRequestReject').unbind().click(function (e) {
        $('#rejectModal').modal("show");
    });
    $('#btnRejectSave').unbind().click(function (e) {
        $('#btnRejectSave').prop('disabled', true);
        if ($('#rejectform').parsley().validate() !== true) {
            $('#btnRejectSave').prop('disabled', false);
        }
        else {
            rejectmaincategorydetails();
        }
    });
    $('#btnRequestApprove').unbind().click(function (e) {
        $('#btnRequestApprove').prop('disabled', true);
        if ($('#maincategoryRequestform').parsley().validate() !== true) {
            $('#btnRequestApprove').prop('disabled', false);
        }
        else {
            approvemaincategorydetails();
        }
    });
});

function resetmaincategory() {
    loadmaincategorydetails();
    //request form
    $('#btnUpdate').prop('disabled', false);
    $('#btnRequestApprove').prop('disabled', false);
    $('#maincategoryRequestform').parsley().reset();
    $('#maincategoryRequestform')[0].reset();
    $('#Requestimage1').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
    $('#rejectModal').modal("hide");
    $('#Main-Category-Request-Modal').modal('hide');
}
function loadmaincategorydetails() {
    var data = new FormData();
    var Main_Category_Status = "Pending, Rejected";
    data.append("Main_Category_Status", Main_Category_Status);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/MainCategory/LoadRequestedMainCategory",
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
                                else { return '<span class="badge badge-pill badge-danger">' + stat + '</span>'; }
                            }
                        },
                        { data: 'Created_By' },
                        { data: 'Main_Category_Created_Date' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                if (row.Main_Category_Status == "Pending") {
                                    var code = row.Main_Category_Uniqueid;
                                    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewmaincategoryrequestdetails(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button>';

                                }
                                else if (row.Main_Category_Status == "Rejected") {
                                    var code = row.Main_Category_Uniqueid;
                                    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewmaincategoryrequestdetails(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button>';
                                }
                                else { return '<span class="badge badge-pill badge-danger">Nothing to perform</span>'; }
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
function fasterPreviewimage1(uploader) {
    if (uploader.files && uploader.files[0]) {
        $('#image1').attr('src', window.URL.createObjectURL(uploader.files[0]));
    }
}
// Approve Reject Section
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
                        $('#btnRequestReject').show();
                        $('#btnRequestApprove').show();
                        $('#Main-Category-Request-Modal').modal('show');
                        $.each(response, function (i, vari) {
                            $('#txtRequestphoto1').val(vari.Main_Category_Photo);
                            $('#Requestimage1').attr('src', vari.Main_Category_Photo);
                            if (vari.Main_Category_Status == "Rejected") {
                                $('#btnRequestReject').hide();
                            }
                            else {
                                $('#btnRequestReject').show();
                            }
                            $('#txtRequestname').val(vari.Main_Category_Name);
                            $('#txtRequestby').val(vari.Created_By);
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
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/MainCategory/ApproveMainCategory",
        dataType: "json",
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                $('#Main-Category-Request-Modal').modal("hide");
                resetmaincategory();
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message);
                $('#btnRequestApprove').prop('disabled', false);
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                $('#btnRequestApprove').prop('disabled', false);
            }
            else {
                var content = "Invalid";
                var title = "Invalid.";
                ErrorAlert(title, content);
                $('#btnRequestApprove').prop('disabled', false);
            }
        },
        error: function (response) {

        }
    });
}
function rejectmaincategorydetails() {
    var data = new FormData();
    data.append("Rejected_Reason", $.trim($("#txtrejecteddescription").val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/MainCategory/RejectMainCategory",
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
                $('#btnRejectSave').prop('disabled', false);
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                $('#btnRejectSave').prop('disabled', false);
            }
            else {
                var content = "Invalid";
                var title = "Invalid.";
                ErrorAlert(title, content);
                $('#btnRejectSave').prop('disabled', false);
            }
        },
        error: function (response) {

        }
    });
}