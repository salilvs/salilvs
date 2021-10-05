$(function () {

    resetpackagedetails();
    $('#btnClose,#btnReset').unbind().click(function () {
        resetpackagedetails();
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
    // reject Approval section
    $('#btnVendorPackageReject').unbind().click(function (e) {
        $('#rejectModal').modal("show");
    });
    $('#btnRejectSave').unbind().click(function (e) {
        $('#btnRejectSave').prop('disabled', true);
        if ($('#rejectform').parsley().validate() !== true) {
            $('#btnRejectSave').prop('disabled', false);
        }
        else {
            rejectpackagedetails();
        }
    });
    $('#btnVendorPackageApprove').unbind().click(function (e) {
        $('#btnVendorPackageApprove').prop('disabled', true);
        if ($('#vendorpackageform').parsley().validate() !== true) {
            $('#btnVendorPackageApprove').prop('disabled', false);
        }
        else {
            approvepackagedetails();
        }
    });
    $('#ddlpackagetimetype').change(function () {
        var type = $('#ddlpackagetimetype').val();
        packagetimetype(type);
    });
});
function resetpackagedetails() {
    //loadmaincategory();
    loadpackagedetailsdetails();
    //request form
    $('#btnVendorPackageApprove').prop('disabled', false);
    $('#rejectform').parsley().reset();
    $('#rejectform')[0].reset();
    $('#Requestimage1').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
    $('#rejectModal').modal("hide");
    $('#Vendor-Package-Modal').modal('hide');
}
function loadpackagedetailsdetails() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorPackage/LoadRequestedPackages",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_vendorpackagelist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_vendorpackagelist').DataTable({
                    data: dat,
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
                                var image = row.Package_Photo;
                                return '<td><div class="sidebar-user"><div class="sidebar-user-picture"><img alt="image" src="' + image + '" width="50px" height="50px"></div></div></td>';
                            }
                        },
                        { data: 'Main_Category_Name' },
                        { data: 'Main_Services_Name' },
                        { data: 'Sub_Services_Name' },
                        { data: 'Package_Name' },
                        { data: 'Package_Rate' },
                        { data: 'Created_By' },
                        { data: 'Package_Created_Date' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var stat = row.Package_Status;
                                if (stat == "Active") {
                                    return '<span class="badge badge-pill badge-success">' + stat + '</span>';
                                }
                                else { return '<span class="badge badge-pill badge-danger">' + stat + '</span>'; }
                            }
                        },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var code = row.Package_Uniqueid;
                                var code2 = row.Package_Vendor_Id;
                                return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="vendorviewpackagedetails(\'' + code + '\', \'' + code2 + '\')" ><i class="simple-icon-pencil"></i></button> </td>';
                            }
                        }
                    ]
                });
            }
            else {
                $('#tbl_vendorpackagelist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
function vendorviewpackagedetails(code, code2) {

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
            data.append("Package_Uniqueid", code);
            data.append("Package_Vendor_Id", code2);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/VendorPackage/LoadVendorPackage",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        $('#btnVendorPackageUpdate').hide();
                        $('#btnVendorPackageSave').hide();
                        $('#btnVendorPackageApprove').show();
                        $('#btnVendorPackageReject').show();
                        $('#Vendor-Package-Modal').modal('show');
                        $('#reasonSection').html('');
                        $.each(response, function (i, vari) {
                            if (vari.Package_Photo != "" && vari.Package_Photo != null) {
                                $('#txtpackagephoto1').val(vari.Package_Photo);
                                $('#packageimage1').attr('src', vari.Package_Photo);
                                $('#packagephoto1').prop("required", false);
                            }
                            else {
                                $('#txtpackagephoto1').val("");
                                $('#packageimage1').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
                                $('#packagephoto1').prop("required", true);
                            }
                            if (vari.Package_Status == "Rejected") {
                                $('#btnVendorPackageReject').hide();
                            }
                            loadmaincategory(vari.Package_Vendor_Id, vari.Package_Main_Category_Id);
                            loadservicesbymaincategory(vari.Package_Vendor_Id, vari.Package_Main_Category_Id, vari.Package_Main_Service_Id);
                            loadsubservicebyservice(vari.Package_Vendor_Id, vari.Package_Main_Category_Id, vari.Package_Main_Service_Id, vari.Package_Sub_Service_Id);
                            $('#txtpackagename').val(vari.Package_Name);
                            $('#txtpackagerate').val(vari.Package_Rate);
                            $('#ddlpackagetimetype').val(vari.Package_Time_Type);
                            $('#txtpackageduration').val(vari.Package_Duration);
                            $('#txtpackagedescription').val(vari.Package_Description);
                            $('#txtrequestedby').val(vari.Created_By);
                            $('#txtrequestedbyid').val(vari.Package_Vendor_Id);
                            $('#txtrequestedate').val(vari.Package_Created_Date);
                            $.each(vari.rejp, function (i, varis) {
                                
                                $('#reasonSection').append(
                                    '<label>Rejected Reason</label>' +
                                    '<div class="row">' +
                                    '<div class="col-6"><input class="form-control" value="' + varis.Rejected_reason + '" ></div><div class="col-6"><input class="form-control" value="' + varis.Created_date + '" ></div><br/>' +
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
function packagetimetype(type) {
    if (type == "Mintues") {
        $('#txtpackageduration').prop("maxlength", "2");
        $('#labelpackageduration').text("Package Duration");
        $('#packageslotstiming').prop("hidden", true);
        $('#txtpackagefromtime').prop("required", false);
        $('#txtpackagetotime').prop("required", false);
    }
    else if (type == "Hours") {
        $('#txtpackageduration').prop("maxlength", "4");
        $('#labelpackageduration').text("Package Duration");
        $('#packageslotstiming').prop("hidden", true);
        $('#txtpackagefromtime').prop("required", false);
        $('#txtpackagetotime').prop("required", false);
    }
    else if (type == "Days") {
        $('#txtpackageduration').prop("maxlength", "2");
        $('#labelpackageduration').text("Package Duration");
        $('#packageslotstiming').prop("hidden", true);
        $('#txtpackagefromtime').prop("required", false);
        $('#txtpackagetotime').prop("required", false);
    }
    else if (type == "Slots") {
        $('#txtpackageduration').prop("maxlength", "3");
        $('#labelpackageduration').text("Allowed Slots");
        $('#packageslotstiming').prop("hidden", false);
        $('#txtpackagefromtime').prop("required", true);
        $('#txtpackagetotime').prop("required", true);
    }
    else {
        $('#txtpackageduration').prop("maxlength", "2");
        $('#labelpackageduration').text("Package Duration");
        $('#packageslotstiming').prop("hidden", true);
        $('#txtpackagefromtime').prop("required", false);
        $('#txtpackagetotime').prop("required", false);
        $('#txtpackagetotime').prop("required", false);
    }
}
function loadmaincategory(code, Vendor_Main_Category_Id) {
    
    var data = new FormData();
    data.append("Package_Vendor_Id", code);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorPackage/LoadVendorMainCategory",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlpackagemaincategory").html("");
                $("#ddlpackagemaincategory").append('<option value="">Select Category</option>');
                $.each(dat, function (j, vari) {
                    $("#ddlpackagemaincategory").append("<option value='" + vari.Main_Category_Uniqueid + "'>" + vari.Main_Category_Name + "</option>");
                });
                if (Vendor_Main_Category_Id != "" && Vendor_Main_Category_Id != null) {
                    $("#ddlpackagemaincategory").val(Vendor_Main_Category_Id);/*.trigger('change');*/
                }
            }
            else {
                $("#ddlpackagemaincategory").html("");
                $("#ddlpackagemaincategory").append('<option value="">No Record Found</option>');
            }
        },
        error: function (response) {

        }
    });
}
function loadservicesbymaincategory(code, Vendor_Main_Category_Id, Vendor_Main_Service_Id) {
    var data = new FormData();
    data.append("Package_Vendor_Id", code);
    data.append("Vendor_Main_Category_Id", Vendor_Main_Category_Id);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorPackage/LoadVendorMainServices",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlpackagemainservice").html("");
                $("#ddlpackagemainservice").append('<option value="">Select Main Service</option>');
                $.each(dat, function (j, vari) {
                    $("#ddlpackagemainservice").append("<optgroup id='packmainservice" + j + "' label='" + vari.Main_Category_Name + "'></optgroup>");
                    $.each(vari.ms, function (i, varis) {
                        var id = "#packmainservice" + j;
                        $(id).append("<option value='" + varis.Main_Services_Uniqueid + "'>" + varis.Main_Services_Name + "</option>");
                    });
                });
                if (Vendor_Main_Service_Id != "" && Vendor_Main_Service_Id != null) {
                    $("#ddlpackagemainservice").val(Vendor_Main_Service_Id);/*.trigger('change');*/
                }
            }
            else {
                $("#ddlpackagemainservice").html("");
                $("#ddlpackagemainservice").append('<option value="">No Record Found</option>');
            }
        },
        error: function (response) {

        }
    });
}
function loadsubservicebyservice(code, Vendor_Main_Category_Id, Vendor_Main_Service_Id, Sub_Service_Id) {
    var data = new FormData();
    data.append("Package_Vendor_Id", code);
    data.append("Vendor_Main_Category_Id", Vendor_Main_Category_Id);
    data.append("Vendor_Main_Service_Id", Vendor_Main_Service_Id);
    data.append("Vendor_Main_Service_Id", Vendor_Main_Service_Id);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorPackage/LoadVendorSubServices",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlpackagesubservice").html("");
                $("#ddlpackagesubservice").append('<option value="">Select Sub Service</option>');
                $.each(dat, function (j, vari) {
                    $("#ddlpackagesubservice").append("<optgroup id='packsub" + j + "' label='" + vari.Main_Services_Name + "'></optgroup>");
                    $.each(vari.ss, function (i, varis) {
                        var id = "#packsub" + j;
                        $(id).append("<option value='" + varis.Sub_Services_Uniqueid + "'>" + varis.Sub_Services_Name + "</option>");
                    });
                });
                if (Sub_Service_Id != "" && Sub_Service_Id != null) {
                    $("#ddlpackagesubservice").val(Sub_Service_Id);
                }
            }
            else {
                $("#ddlpackagesubservice").html("");
                $("#ddlpackagesubservice").append('<option value="">No Record Found</option>');
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
function approvepackagedetails() {
    alert("ddd");
    var data = new FormData();
    data.append("Package_Vendor_Id", $.trim($("#txtrequestedbyid").val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorPackage/ApproveVendorPackageDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                $('#Vendor-Package-Modal').modal("hide");
                resetpackagedetails();
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message);
                $('#btnVendorPackageApprove').prop('disabled', false);
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                $('#btnVendorPackageApprove').prop('disabled', false);
            }
            else {
                var content = "Invalid";
                var title = "Invalid.";
                ErrorAlert(title, content);
                $('#btnVendorPackageApprove').prop('disabled', false);
            }
        },
        error: function (response) {

        }
    });
}
function rejectpackagedetails() {
    var data = new FormData();
    data.append("Package_Vendor_Id", $.trim($("#txtrequestedbyid").val()));
    data.append("Rejected_Reason", $.trim($("#txtrejecteddescription").val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorPackage/RejectVendorPackageDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                resetpackagedetails();
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