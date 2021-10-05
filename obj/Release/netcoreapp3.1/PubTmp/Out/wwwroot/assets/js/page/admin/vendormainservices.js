$(function () {
    
    $('#btnVendorMainServiceSave').unbind().click(function () {
        event.preventDefault();
        $('#btnVendorMainServiceSave').prop('disabled', true);
        if ($('#vendormainserviceform').parsley().validate() !== true) {
            $('#btnVendorMainServiceSave').prop('disabled', false);
        }
        else {
            savevendorservicedetails();
        }
    });
    $('#btnRequestMainServiceSave').unbind().click(function () {
        event.preventDefault();
        $('#btnRequestMainServiceSave').prop('disabled', true);
        if ($('#RequestMainServiceForm').parsley().validate() !== true) {
            $('#btnRequestMainServiceSave').prop('disabled', false);
        }
        else {
            saveservicedetails();
        }
    });
    $("#ddlvendormaincategorys").change(function (event) {
        event.preventDefault();
        var data = $("#ddlvendormaincategorys").val();
        loadservicesbymaincategory(data);
    });
    $("#ddlvendormainservice").select2({
        placeholder: "Select Main Service",
        dropdownParent: $("#Vendor-Service-Modal"),
    });
    $('#btnVendorMainServiceReset,#btnMainServiceClose').unbind().click(function () {
        resetvendorservicedetails();
    });
    resetvendorservicedetails();
    $('#imgService').click(function (e) {
        $('#servicephoto1').click();
    });
    $('#servicephoto1').change(function () {
        fasterPreviewimage2(this);
    });
    $("#btnrequestmainservice,#btnRequestMainServiceReset").unbind().click(function () {
        $('#imgService').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
        $('#btnRequestMainServiceSave').prop('disabled', false);
        var getClass = $('#iconrequestmainservice').attr("class");
        $('#RequestMainServiceForm').parsley().reset();
        $('#RequestMainServiceForm')[0].reset();
        if (getClass == "simple-icon-plus") {
            $('#iconrequestmainservice').removeClass();
            $('#iconrequestmainservice').addClass("simple-icon-minus");
            $('#btnVendorMainServiceSave').hide();
        }
        else {
            $('#iconrequestmainservice').removeClass();
            $('#iconrequestmainservice').addClass("simple-icon-plus");
            $('#btnVendorMainServiceSave').show();
        }

    });
});
function fasterPreviewimage2(uploader) {
    if (uploader.files && uploader.files[0]) {
        $('#imgService').attr('src', window.URL.createObjectURL(uploader.files[0]));
    }
}
function resetvendorservicedetails() {
    loadmaincategory();
    loadvendorservicedetails();
    loadmaincategorydetails();
    $('#btnVendorMainServiceSave').prop('disabled', false);
    $("#ddlvendormainservice").select2("destroy").select2({
        placeholder: "Select Main Service",
        dropdownParent: $("#Vendor-Service-Modal"),
    });
    $('#vendormainserviceform').parsley().reset();
    $('#vendormainserviceform')[0].reset();
    $("#ddlvendormainservice").val(null).trigger("change");
    $('#imgService').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
}
function loadvendorservicedetails() {
    var data = new FormData();
    data.append("Vendor_Main_Service_Vendor_Id", GetURLParameter('vid'));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorMainServices/LoadVendorMainService",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_vendorservicelist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_vendorservicelist').DataTable({
                    data: dat,
                    autoWidth: true,
                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                        { data: 'Main_Category_Name' },
                        { data: 'Main_Services_Name' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                if (row.Vendor_Main_Service_Status == "Active") {
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
                                var code = row.Vendor_Main_Service_Uniquieid; var stat = row.Vendor_Main_Service_Status;
                                if (stat == "Active") {
                                    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="inactivatevendormainservice(\'' + code + '\')" ><i class="simple-icon-trash"></i></button>';
                                }
                                else {
                                    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "Re Activate" onclick="reactivatevendormainservice(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button>';
                                }
                            }
                        }
                    ]
                });
            }
            else {
                var table = $('#tbl_vendorservicelist').DataTable({ destroy: true });
                table.clear();
                table.destroy();

                $('#tbl_vendorservicelist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
function savevendorservicedetails() {

    var data = new FormData();
    data.append("Vendor_Main_Service_Vendor_Id", GetURLParameter('vid'));
    data.append("Vendor_Main_Category_Id", $.trim($('#ddlvendormaincategorys').val()));
    data.append("Vendor_Main_Service_Uniquieid", $.trim($('#ddlvendormainservice').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorMainServices/SaveVendorMainServiceDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                resetvendorservicedetails();
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
function inactivatevendormainservice(code) {
    var data = new FormData();
    data.append("Vendor_Main_Service_Vendor_Id", GetURLParameter('vid'));
    data.append("Vendor_Main_Service_Uniquieid", code);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorMainServices/DeactivateVendorMainServiceDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.length > 0) {
                if (response[0].Type == "Success") {
                    SuccessAlert(response[0].Title, response[0].Message);
                    resetvendorservicedetails();
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
function reactivatevendormainservice(code) {
    var data = new FormData();
    data.append("Vendor_Main_Service_Vendor_Id", GetURLParameter('vid'));
    data.append("Vendor_Main_Service_Uniquieid", code);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorMainServices/ReactivateVendorMainServiceDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.length > 0) {
                if (response[0].Type == "Success") {
                    SuccessAlert(response[0].Title, response[0].Message);
                    resetvendorservicedetails();
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
function loadservicesbymaincategory(Main_Category_Id) {
    var data = new FormData();
    data.append("Vendor_Main_Service_Vendor_Id", GetURLParameter('vid'));
    data.append("Vendor_Main_Category_Id", Main_Category_Id);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorMainServices/LoadVendorMainServiceOfVendor",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlvendormainservice").select2("destroy").select2({
                    dropdownParent: $("#Vendor-Service-Modal"),
                });
                $("#ddlvendormainservice").html("");
                //("#ddlvendormainservice").append('<option value="">Select Cateory</option>');
                $.each(dat, function (j, vari) {
                    $("#ddlvendormainservice").append("<optgroup id='mainserviceopt" + j + "' label='" + vari.Main_Category_Name + "'></optgroup>");
                    $.each(vari.ms, function (i, varis) {
                        var id = "#mainserviceopt" + j;
                        $(id).append("<option value='" + varis.Main_Services_Uniqueid + "'>" + varis.Main_Services_Name + "</option>");
                    });
                });
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
    data.append("Vendor_Main_Service_Vendor_Id", GetURLParameter('vid'));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorMainServices/LoadVendorMainCategory",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlvendormaincategorys").html("");
                $("#ddlvendormaincategorys").append('<option value="">Select Category</option>');
                $.each(dat, function (j, vari) {
                    $("#ddlvendormaincategorys").append("<option value='" + vari.Main_Category_Uniqueid + "'>" + vari.Main_Category_Name + "</option>");
                });
            }
            else {

            }
        },
        error: function (response) {

        }
    });
}

// Rquest new main service

function loadmaincategorydetails() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/MainCategory/LoadMainCategoryByActive",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlrequestservicemaincategory").html("");
                $("#ddlrequestservicemaincategory").append('<option value="">Select Main Category</option>');
                $.each(response, function (i, vari) {
                    $("#ddlrequestservicemaincategory").append('<option value="' + vari.Main_Category_Uniqueid + '">' + vari.Main_Category_Name + '</option>');
                });
            }
            else {

            }
        },
        error: function (response) {

        }
    });
}
function saveservicedetails() {
    var data = new FormData();
    data.append("Main_Services_Photo", $("#servicephoto1").get(0).files[0]);
    data.append("Main_Services_Main_Category", $.trim($('#ddlrequestservicemaincategory').val()));
    data.append("Main_Services_Name", $.trim($('#txtrequestservicename').val()));
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
                resetvendorservicedetails();
                $("#btnrequestmainservice").trigger("click");
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