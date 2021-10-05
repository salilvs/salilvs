$(function () {

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
            rejectmainservicedetails();
        }
    });
    $('#btnRequestApprove').unbind().click(function (e) {
        $('#btnRequestApprove').prop('disabled', true);
        if ($('#mainserviceRequestform').parsley().validate() !== true) {
            $('#btnRequestApprove').prop('disabled', false);
        }
        else {
            approvemainservicedetails();
        }
    });
});
function resetservice() {
    loadservicedetails();
    loadmaincategorydetails();
    //request form
    $('#btnUpdate').prop('disabled', false);
    $('#btnRequestApprove').prop('disabled', false);
    $('#mainserviceRequestform').parsley().reset();
    $('#mainserviceRequestform')[0].reset();
    $('#Requestimage1').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
    $('#rejectModal').modal("hide");
    $('#Main-Service-Request-Modal').modal('hide');
}
function loadservicedetails() {
    var data = new FormData();
    var Main_Services_Status = "Pending, Rejected";
    data.append("Main_Services_Status", Main_Services_Status);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/MainServices/LoadRequestedMainService",
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
                                if (row.Main_Services_Status == "Pending") {
                                    var code = row.Main_Services_Uniqueid;
                                    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-warning" title = "Edit" onclick="viewmainservicerequestdetails(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button> ';
                                }
                                else if (row.Main_Services_Status == "Rejected") {
                                    var code = row.Main_Services_Uniqueid;
                                    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "Edit" onclick="viewmainservicerequestdetails(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button> ';
                                }
                                else { return '<span class="badge badge-pill badge-danger">Nothing to perform</span>'; }
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
// Approve Reject Section
function viewmainservicerequestdetails(code) {

    swal({
        title: "Are you sure?",
        text: "Do you want to view the data!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes, View it!",
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
                        $('#btnRequestReject').show();
                        $('#btnRequestApprove').show();
                        $('#Main-Service-Request-Modal').modal('show');
                        $.each(response, function (i, vari) {
                            $('#txtRequestphoto1').val(vari.Main_Services_Photo);
                            $('#Requestimage1').attr('src', vari.Main_Services_Photo);
                            if (vari.Main_Services_Status == "Rejected") {
                                $('#btnRequestApprove').hide();
                            }
                            $('#ddlRequestmaincategory').val(vari.Main_Services_Main_Category);
                            $('#txtRequestname').val(vari.Main_Services_Name);
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
function approvemainservicedetails() {
    swal({
        title: "Are you sure?",
        text: "Do you want to approve the data!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes, Approve!",
    }, function (isConfirm) {
        if (isConfirm) {
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/MainServices/ApproveMainServiceDetails",
                dataType: "json",
                success: function (response) {
                    if (response[0].Type == "Success") {
                        SuccessAlert(response[0].Title, response[0].Message);
                        $('#Main-Service-Request-Modal').modal("hide");
                        resetservice();
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
        } else {


        }
    });
    
}
function rejectmainservicedetails() {
    swal({
        title: "Are you sure?",
        text: "Do you want to reject the data!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes, Reject!",
    }, function (isConfirm) {
        if (isConfirm) {
            var data = new FormData();
            data.append("Rejected_Reason", $.trim($("#txtrejecteddescription").val()));
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/MainServices/RejectMainServiceDetails",
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
        } else {


        }
    });
}