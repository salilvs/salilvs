$(function () {
   
    $('#btnSave').unbind().click(function () {
        event.preventDefault();
        $('#btnSave').prop('disabled', true);
        if ($('#subserviceform').parsley().validate() !== true) {
            $('#btnSave').prop('disabled', false);
        }
        else {
            savesubservicedetails();
        }
    });
    $('#btnUpdate').unbind().click(function () {
        event.preventDefault();
        $('#btnUpdate').prop('disabled', true);
        if ($('#subserviceform').parsley().validate() !== true) {
            $('#btnUpdate').prop('disabled', false);
        }
        else {
            updatesubservicedetails();
            $('#image1').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
            $('#subserviceform').parsley().reset();
            $('#subserviceform')[0].reset();
        }
    });
    resetsubservice();
    $('#btnClose,#btnReset').unbind().click(function () {
        resetsubservice();
    });
    $('#image1').click(function (e) {
        $('#photo1').click();
    });
    $('#photo1').change(function () {
        fasterPreviewimage1(this);
    });
    $('#ddlmaincategorys').change(function () {
        var value = $.trim($('#ddlmaincategorys').val())
        loadmainservicesdetails(value);
    });
});
function resetsubservice() {
    loadmaincategorydetails();
    loadsubservicedetails();
    $('#btnUpdate').prop('disabled', false);
    $('#btnSave').prop('disabled', false);
    $('#btnUpdate').hide();
    $('#btnSave').show();
    $('#subserviceform').parsley().reset();
    $('#subserviceform')[0].reset();
    $('#image1').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
}
function loadsubservicedetails() {
    var data = new FormData();
    var Sub_Services_Status = "Active, In Active";
    data.append("Sub_Services_Status", Sub_Services_Status);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Sub_Services/LoadSubService",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_subservicelist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_subservicelist').DataTable({
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
                                var image = row.Sub_Services_Photo;
                                return '<td><div class="sidebar-user"><div class="sidebar-user-picture"><img alt="image" src="' + image + '" width="50px" height="50px"></div></div></td>';
                            }
                        },
                        { data: 'Sub_Services_Main_Category_Name' },
                        { data: 'Sub_Services_Main_Service_Name' },
                        { data: 'Sub_Services_Name' },
                        { data: 'Created_By' },
                        { data: 'Sub_Services_Created_Date' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var stat = row.Sub_Services_Status;
                                if (stat == "Active") {
                                    return '<span class="badge badge-pill badge-success">' + stat + '</span>';
                                }
                                else { return '<span class="badge badge-pill badge-danger">' + stat + '</span>'; }
                            }
                        },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                if (row.Sub_Services_Status == "Active") {
                                    var code = row.Sub_Services_Uniqueid;
                                    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewsubservicedetails(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="inactivatesubservice(\'' + code + '\')" ><i class="simple-icon-trash"></i></button>';
                                }
                                else if (row.Sub_Services_Status == "Pending") {
                                    var code = row.Sub_Services_Uniqueid;
                                    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewsubservicedetails(\'' + code + '\')" ><i class="simple-icon-reload"></i></button> ';
                                }
                                else if (row.Sub_Services_Status == "Rejected") {
                                    var code = row.Sub_Services_Uniqueid;
                                    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewsubservicedetails(\'' + code + '\')" ><i class="simple-icon-reload"></i></button> ';
                                }
                                else {
                                    var code = row.Sub_Services_Uniqueid;
                                    return '<td><button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Re Activate" onclick="reactivatesubservice(\'' + code + '\')" ><i class="simple-icon-reload"></i></button></td>';
                                }
                            }
                        }
                    ]
                });
            }
            else {
                $('#tbl_subservicelist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
function savesubservicedetails() {
    var data = new FormData();
    data.append("Sub_Services_Photo", $("#photo1").get(0).files[0]);
    data.append("Sub_Services_Main_Category", $.trim($('#ddlmaincategorys').val()));
    data.append("Sub_Services_Main_Service", $.trim($('#ddlmainservices').val()));
    data.append("Sub_Services_Name", $.trim($('#txtname').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Sub_Services/SaveSubServiceDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                resetsubservice();
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
function viewsubservicedetails(code) {

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
            data.append("Sub_Services_Uniqueid", code);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/Sub_Services/LoadSubService",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        $('#btnUpdate').show();
                        $('#btnSave').hide();
                        $('#SubService-Modal').modal('show');
                        $('#reasonSection').html('');
                        $.each(response, function (i, vari) {
                            $('#txtphoto1').val(vari.Sub_Services_Photo);
                            if (vari.Sub_Services_Photo != null) {
                                $('#photo1').prop('required', false);
                            }
                            $('#ddlmaincategorys').val(vari.Sub_Services_Main_Category);
                            loadmainservicesdetails(vari.Sub_Services_Main_Category, vari.Sub_Services_Main_Service);
                            $('#image1').attr('src', vari.Sub_Services_Photo);
                            $('#txtname').val(vari.Sub_Services_Name);
                            $.each(vari.rss, function (i, varis) {
                                $('#reasonSection').append(
                                    '<label>Rejected Reason</label>' +
                                    '<div class="row">' +
                                    '<div class="col-6"><input class="form-control" value="' + varis.Sub_Service_Rejected_Reason + '" ></div><div class="col-6"><input class="form-control" value="' + varis.Sub_Service_Created_Date + '" ></div><br/>' +
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
function updatesubservicedetails() {
    var data = new FormData();
    data.append("Sub_Services_Photo", $("#photo1").get(0).files[0]);
    data.append("Sub_Services_Photo_Check", $.trim($('#txtphoto1').val()));
    data.append("Sub_Services_Main_Category", $.trim($('#ddlmaincategorys').val()));
    data.append("Sub_Services_Main_Service", $.trim($('#ddlmainservices').val()));
    data.append("Sub_Services_Name", $.trim($('#txtname').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Sub_Services/UpdateSubServiceDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                $('#SubService-Modal').modal('hide');
                //resetsubservice();
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
                var title = "Invalid Data.";
                ErrorAlert(title, content);
                $('#btnUpdate').prop('disabled', false);
            }
        },
        error: function (response) {

        }
    });
}
function inactivatesubservice(code) {
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
            data.append("Sub_Services_Id", code);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/Sub_Services/DeactivateSubServiceDetails",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response.length > 0) {
                        if (response[0].Type == "Success") {
                            SuccessAlert(response[0].Title, response[0].Message);
                            resetsubservice();
                        }
                        else if (response[0].Type == "Warning") {
                            WarningAlert(response[0].Title, response[0].Message)
                        }
                        else if (response[0].Type == "Error") {
                            ErrorAlert(response[0].Title, response[0].Message)
                        }
                        else {
                            var content = "Invalid";
                            var title = "Invalid Data.";
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
function reactivatesubservice(code) {
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
            data.append("Sub_Services_Id", code);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/Sub_Services/ReactivateSubServiceDetails",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response.length > 0) {
                        if (response[0].Type == "Success") {
                            SuccessAlert(response[0].Title, response[0].Message);
                            resetsubservice();
                        }
                        else if (response[0].Type == "Warning") {
                            WarningAlert(response[0].Title, response[0].Message)
                        }
                        else if (response[0].Type == "Error") {
                            ErrorAlert(response[0].Title, response[0].Message)
                        }
                        else {
                            var content = "Invalid";
                            var title = "Invalid data.";
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
                $("#ddlmaincategorys").html("");
                $("#ddlmaincategorys").append('<option value="">Select Main Category</option>');
                $.each(response, function (i, vari) {
                    $("#ddlmaincategorys").append('<option value="' + vari.Main_Category_Uniqueid + '">' + vari.Main_Category_Name + '</option>');
                });
            }
            else {

            }
        },
        error: function (response) {

        }
    });
}
function loadmainservicesdetails(maincategoryid, mainserviceid) {
    var data = new FormData();
    data.append("Main_Services_Main_Category", maincategoryid);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/MainServices/LoadMainServiceByCategory",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlmainservices").html("");
                $("#ddlmainservices").append('<option value="">Select Main Service</option>');
                $.each(response, function (i, vari) {
                    $("#ddlmainservices").append('<option value="' + vari.Main_Services_Uniqueid + '">' + vari.Main_Services_Name + '</option>');
                });
                if (mainserviceid != "" && mainserviceid != null) {
                    $("#ddlmainservices").val(mainserviceid);
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