$(function () {
   
    $('#btnVendorMainCategorySave').unbind().click(function () {
        event.preventDefault();
        $('#btnVendorMainCategorySave').prop('disabled', true);
        if ($('#vendormaincategoryform').parsley().validate() !== true) {
            $('#btnVendorMainCategorySave').prop('disabled', false);
        }
        else {
            savevendormaincategorydetails();
        }
    });
    $('#btnRequestMainCategorySave').unbind().click(function () {
        event.preventDefault();
        $('#btnRequestMainCategorySave').prop('disabled', true);
        if ($('#RequestMainCategoryForm').parsley().validate() !== true) {
            $('#btnRequestMainCategorySave').prop('disabled', false);
        }
        else {
            savemaincategorydetails();
        }
    });
    resetvendormaincategory();
    $('#btnClose,#btnVendorMainCategoryReset').unbind().click(function () {
        resetvendormaincategory();
    });
    $("#ddlvendormaincategory").select2({
        placeholder: "Select Main Category",
        dropdownParent: $("#Vendor-Main-Category-Modal"),
    });
    $('#image2').click(function (e) {
        $('#photo2').click();
    });
    $('#photo2').change(function () {
        fasterPreviewimage2(this);
    });
    $("#btnrequestmaincategory,#btnRequestMainCategoryReset").unbind().click(function () {
        $('#btnRequestMainCategorySave').prop('disabled', false);
        var getClass = $('#iconrequestmaincategory').attr("class");
        $('#RequestMainCategoryForm').parsley().reset();
        $('#RequestMainCategoryForm')[0].reset();
        if (getClass == "simple-icon-plus") {
            $('#iconrequestmaincategory').removeClass();
            $('#iconrequestmaincategory').addClass("simple-icon-minus");
            $('#btnVendorMainCategoryUpdate').hide();
            $('#btnVendorMainCategorySave').hide();
        }
        else {
            $('#iconrequestmaincategory').removeClass();
            $('#iconrequestmaincategory').addClass("simple-icon-plus");
            $('#btnVendorMainCategoryUpdate').hide();
            $('#btnVendorMainCategorySave').show();
        }

    });
});
function fasterPreviewimage2(uploader) {
    if (uploader.files && uploader.files[0]) {
        $('#image2').attr('src', window.URL.createObjectURL(uploader.files[0]));
    }
}
function resetvendormaincategory() {
    loadmaincategory();
    loadvendormaincategorydetails();
    $('#btnVendorMainCategoryUpdate').prop('disabled', false);
    $('#btnVendorMainCategorySave').prop('disabled', false);
    $('#btnVendorMainCategoryUpdate').hide();
    $('#btnVendorMainCategorySave').show();
    $('#vendormaincategoryform').parsley().reset();
    $('#vendormaincategoryform')[0].reset();
    $("#ddlvendormaincategory").val("").trigger("change");
    $('#image2').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
}
function loadvendormaincategorydetails() {
    var data = new FormData();
    data.append("Vendor_Main_Category_Vendor_Id", GetURLParameter('vid'));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorMainCategory/LoadVendorMainCategory",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_vendormaincategorylist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_vendormaincategorylist').DataTable({
                    data: dat,
                    autoWidth: true,
                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                        { data: 'Main_Category_Name' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                if (row.Vendor_Main_Category_Status == "Active") {
                                    return '<span class="badge badge-pill badge-success">Active</span>';
                                }
                                else {
                                    return '<span class="badge badge-pill badge-danger">In Active</span>';
                                }

                            }
                        },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                if (row.Vendor_Main_Category_Status == "Active") {
                                    var code = row.Vendor_Main_Category_Uniquieid;
                                    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="inactivatevendormaincategory(\'' + code + '\')" ><i class="simple-icon-trash"></i></button>';
                                }
                                else {
                                    var code = row.Vendor_Main_Category_Uniquieid;
                                    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Re Activate" onclick="reactivatevendormaincategory(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button></td>';
                                }
                            }
                        }
                    ]
                });
            }
            else {
                var table = $('#tbl_vendormaincategorylist').DataTable({ destroy: true });
                table.clear();
                table.destroy();

                $('#tbl_vendormaincategorylist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
function savevendormaincategorydetails() {
    var data = new FormData();
    data.append("Vendor_Main_Category_Vendor_Id", GetURLParameter('vid'));
    data.append("Vendor_Main_Category_Uniquieid", $.trim($('#ddlvendormaincategory').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorMainCategory/SaveVendorMainCategoryDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                resetvendormaincategory();
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
        },
        error: function (response) {

        }
    });
}
function inactivatevendormaincategory(code) {
    var data = new FormData();
    data.append("Vendor_Main_Category_Vendor_Id", GetURLParameter('vid'));
    data.append("Vendor_Main_Category_Id", code);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorMainCategory/DeactivateVendorMainCategoryDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.length > 0) {
                if (response[0].Type == "Success") {
                    SuccessAlert(response[0].Title, response[0].Message);
                    resetvendormaincategory();
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
}
function reactivatevendormaincategory(code) {
    var data = new FormData();
    data.append("Vendor_Main_Category_Vendor_Id", GetURLParameter('vid'));
    data.append("Vendor_Main_Category_Id", code);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorMainCategory/ReactivateVendorMainCategoryDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.length > 0) {
                if (response[0].Type == "Success") {
                    SuccessAlert(response[0].Title, response[0].Message);
                    resetvendormaincategory();
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
}
function loadmaincategory() {
    var data = new FormData();
    data.append("Vendor_Main_Category_Vendor_Id", GetURLParameter('vid'));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorMainCategory/LoadVendorMainCategoryOfVendor",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlvendormaincategory").html("");
                $("#ddlvendormaincategory").append('<option value="">Select Cateory</option>');
                $.each(response, function (i, vari) {
                    $("#ddlvendormaincategory").append('<option value="' + vari.Main_Category_Uniqueid + '">' + vari.Main_Category_Name + '</option>');
                });
            }
            else {
                $("#ddlvendormaincategory").html("");
            }
        },
        error: function (response) {

        }
    });
}
function savemaincategorydetails() {
    var data = new FormData();
    data.append("Main_Category_Photo", $("#photo2").get(0).files[0]);
    data.append("Main_Category_Name", $.trim($('#txtrequestmaincategory').val()));
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
                resetvendormaincategory();
                $("#btnrequestmaincategory").trigger("click");
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
        },
        error: function (response) {

        }
    });
}
function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return decodeURIComponent(sParameterName[1]);
        }
    }
};