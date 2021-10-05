$(function () {

    $('input.thresold-i').maxlength()
    $('#btnSave').unbind().click(function () {
        $('#btnSave').prop('disabled', true);
        if ($('#couponform').parsley().validate() !== true) {
            $('#btnSave').prop('disabled', false);
        }
        else {
            savecoupondetails();
        }
    });
    $('#btnUpdate').unbind().click(function () {
        $('#btnUpdate').prop('disabled', true);
        if ($('#couponform').parsley().validate() !== true) {
            $('#btnUpdate').prop('disabled', false);
        }
        else {
            updatecoupondetails();
        }
    });
    resetcoupon();
    $('#btnClose,#btnReset').unbind().click(function () {
        resetcoupon();
    });
    $('#image1').click(function (e) {
        $('#photo1').click();
    });
    $('#photo1').change(function () {
        fasterPreviewimage1(this);
    });
    $("#txtexpirefromdatetime,#txtexpiretodatetime").datetimepicker({
        // Formats
        format: 'YYYY-MM-DD LT',
        icons:
        {
            time: "fa fa-clock",
            date: "fa fa-calendar",
            up: "fa fa-arrow-up",
            down: "fa fa-arrow-down",
            previous: "fa fa-chevron-left",
            next: "fa fa-chevron-right",
            today: "fa fa-clock-o",
            clear: "fa fa-trash-o"

        },
    });
});

function resetcoupon() {
    loadcoupondetails();
    $('#btnUpdate').prop('disabled', false);
    $('#btnSave').prop('disabled', false);
    $('#btnUpdate').hide();
    $('#btnSave').show();
    $('#couponform').parsley().reset();
    $('#couponform')[0].reset();
    $('#image1').attr('src', "/webapp/assets/images/no-image-found-360x250.png");
}
function loadcoupondetails() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Coupon/LoadCoupon",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_couponlist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_couponlist').DataTable({
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
                                var image = row.coupon_Photo;
                                return '<td><div class="sidebar-user"><div class="sidebar-user-picture"><img alt="image" src="' + image + '" width="50px" height="50px"></div></div></td>';
                            }
                        },
                        { data: 'coupon_Name' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var stat = row.coupon_Status;
                                if (stat == "Active") {
                                    return '<span class="badge badge-pill badge-success">' + stat + '</span>';
                                }
                                else { return '<span class="badge badge-pill badge-danger">' + stat + '</span>'; }
                            }
                        },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                if (row.coupon_Status == "Active") {
                                    var code = row.coupon_Uniqueid;
                                    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewcoupondetails(\'' + code + '\')" ><i class="feather icon-edit"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="inactivatecoupon(\'' + code + '\')" ><i class="feather icon-trash"></i></button>';
                                }
                                else
                                    if (row.coupon_Status == "Pending") {
                                        var code = row.coupon_Uniqueid;
                                        return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewpendingcoupondetails(\'' + code + '\')" ><i class="feather icon-edit"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="inactivatecoupon(\'' + code + '\')" ><i class="feather icon-trash"></i></button>';
                                    }
                                    else
                                        if (row.coupon_Status == "Rejected") {
                                            var code = row.coupon_Uniqueid;
                                            return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewrejectedcoupondetails(\'' + code + '\')" ><i class="feather icon-edit"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="inactivatecoupon(\'' + code + '\')" ><i class="feather icon-trash"></i></button>';
                                        }
                                else {
                                    var code = row.coupon_Uniqueid;
                                    return '<td><button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Re Activate" onclick="reactivatecoupon(\'' + code + '\')" ><i class="feather icon-edit"></i></button></td>';
                                }
                            }
                        }
                    ]
                });
            }
            else {
                $('#tbl_couponlist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
function savecoupondetails() {
    var data = new FormData();
    //data.append("Coupon_Photo", $("#photo1").get(0).files[0]);
    //data.append("Coupon_Name", $.trim($('#txtname').val()));
    //data.append("Coupon_Code", $.trim($('#txtcode').val()));
    data.append("Coupon_Photo", $("#photo1").get(0).files[0]);
    data.append("Coupon_Name", $.trim($('#txtRequestname').val()));
    data.append("Coupon_Code", $.trim($('#txtRequestcode').val()));
    data.append("Coupon_Accepted_Amount_Type", $.trim($('#txtamounttype').val()));
    data.append("Coupon_Accepted_Amount", $.trim($('#txtamount').val()));
    data.append("Coupon_Maximum_Usage_By_Customer", $.trim($('#txtmaximumtimeusedbycustomer').val()));
    data.append("Coupon_Expire_From_Date", $.trim($('#txtexpirefromdatetime').val()));
    data.append("Coupon_Expire_To_Date", $.trim($('#txtexpiretodatetime').val()));
    data.append("Coupon_Description", $.trim($('#txtdescription').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Coupon/SaveCouponDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].type == "Success") {
                SuccessAlert(response[0].title, response[0].message);
                resetcoupon();
                $('#Coupons-Request-Modal').modal('hide');
                $('#Coupons-Moda').modal('hide');
            }
            else if (response[0].type == "Warning") {
                WarningAlert(response[0].title, response[0].message);
                $('#btnSave').prop('disabled', false);
            }
            else if (response[0].type == "Error") {
                ErrorAlert(response[0].title, response[0].message);
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
function viewcoupondetails(code) {
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
            data.append("Coupon_Id", code);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/Coupon/LoadCouponById",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        $('#btnUpdate').show();
                        $('#btnSave').hide();
                        $('#Coupons-Modal').modal('show');
                        $.each(response, function (i, vari) {
                            $('#txtphoto1').val(vari.coupon_Photo);
                            $('#image1').attr('src', vari.coupon_Photo);
                            //$('#txtname').val(vari.coupon_Name);
                            //$('#txtcode').val(vari.coupon_Code);
                            $('#txtRequestname').val(vari.coupon_Name);
                            $('#txtRequestcode').val(vari.coupon_Code);
                            
                            //$('#txtname').val(vari.coupon_Name);
                            //$('#txtcode').val(vari.coupon_Code);
                            $('#txtamounttype').val(vari.coupon_Accepted_Amount_Type);
                            $('#txtamount').val(vari.coupon_Accepted_Amount);
                            $('#txtmaximumtimeusedbycustomer').val(vari.coupon_Maximum_Usage_By_Customer);
                            $('#txtexpirefromdatetime').val(vari.coupon_Expire_From_Date);
                            $('#txtexpiretodatetime').val(vari.coupon_Expire_To_Date);
                            $('#txtdescription').val(vari.coupon_Description);
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
function viewpendingcoupondetails(code) {
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
            data.append("Coupon_Id", code);

            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/ApproveRejectionSection/LoadpendingCouponById",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        $('#btnRequestCouponApprove').show();
                        $('#btnRequestCouponReject').show();
                        $('#Coupons-Request-Modal').modal('show');
                        $.each(response, function (i, vari) {
                            $('#txtRequestphoto1').val(vari.coupon_Photo);
                            $('#Requestimage1').attr('src', vari.coupon_Photo);
                            $('#txtRequestname').val(vari.coupon_Name);
                            $('#txtRequestcode').val(vari.coupon_Code);
                            //$('#txtRequestrequest').val(vari.coupon_Request);
                            $('#txtRequestby').val(vari.coupon_Created_By);
                            $('#txtRequestamounttype').val(vari.coupon_Accepted_Amount_Type);

                            $('#txtRequestamount').val(vari.coupon_Accepted_Amount);
                            $('#txtRequestmaximumtimeusedbycustomer').val(vari.coupon_Maximum_Usage_By_Customer);
                            $('#txtRequestexpirefromdatetime').val(vari.coupon_Expire_From_Date);

                            $('#txtRequestexpiretodatetime').val(vari.coupon_Expire_To_Date);
                            $('#txtRequestdescription').val(vari.coupon_Description);
                            alert(vari.coupon_Name);
                            
                            

                            

                            //$('#txtvendorid').val(vari.coupon_Created_By);
                            //$('#txtvendorid').hide();
                            //alert($('#txtvendorid'));

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
function updatecoupondetails() {
    var data = new FormData();
    data.append("Coupon_Photo", $("#photo1").get(0).files[0]);
    //data.append("Coupon_Photo_Check", $.trim($('#txtphoto1').val()));
    //data.append("Coupon_Name", $.trim($('#txtname').val()));
    //data.append("Coupon_Code", $.trim($('#txtcode').val()));
    data.append("Coupon_Photo_Check", $.trim($('#txtRequestphoto1').val()));
    data.append("Coupon_Name", $.trim($('#txtRequestname').val()));
    data.append("Coupon_Code", $.trim($('#txtRequestcode').val()));

    data.append("Coupon_Accepted_Amount_Type", $.trim($('#txtamounttype').val()));
    data.append("Coupon_Accepted_Amount", $.trim($('#txtamount').val()));
    data.append("Coupon_Maximum_Usage_By_Customer", $.trim($('#txtmaximumtimeusedbycustomer').val()));
    data.append("Coupon_Expire_From_Date", $.trim($('#txtexpirefromdatetime').val()));
    data.append("Coupon_Expire_To_Date", $.trim($('#txtexpiretodatetime').val()));
    data.append("Coupon_Description", $.trim($('#txtdescription').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Coupon/UpdateCouponDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].type == "Success") {
                SuccessAlert(response[0].title, response[0].message);
                $('#Coupons-Modal').modal('hide');
                resetcoupon();
            }
            else if (response[0].type == "Warning") {
                WarningAlert(response[0].title, response[0].message);
                $('#btnUpdate').prop('disabled', false);
            }
            else if (response[0].type == "Error") {
                ErrorAlert(response[0].title, response[0].message);
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
function inactivatecoupon(code) {
    var data = new FormData();
    data.append("Coupon_Id", code);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Coupon/DeactivateCouponDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.length > 0) {
                if (response[0].type == "Success") {
                    SuccessAlert(response[0].title, response[0].message);
                    resetcoupon();
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
function reactivatecoupon(code) {
    var data = new FormData();
    data.append("Coupon_Id", code);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        //url: "/Coupon/ReactivateEmployee",
        url: "/Coupon/ReactivateCouponDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.length > 0) {
                if (response[0].type == "Success") {
                    SuccessAlert(response[0].title, response[0].message);
                    resetcoupon();
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