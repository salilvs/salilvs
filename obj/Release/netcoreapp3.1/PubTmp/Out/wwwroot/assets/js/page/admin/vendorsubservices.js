$(function () {

    $('#btnVendorSubServiceSave').unbind().click(function () {
        event.preventDefault();
        $('#btnVendorSubServiceSave').prop('disabled', false);
        if ($('#vendorsubserviceform').parsley().validate() !== true) {
            $('#btnVendorSubServiceSave').prop('disabled', false);
        }
        else {
            savevendorsubservicedetails();
        }
    });
    $("#ddlvendorsubservice").select2({
        placeholder: "Select Sub Service",
        dropdownParent: $("#Vendor-Sub-Service-Modal"),
    });
    $("#ddlvendorsubservicemaincategorys").unbind().change(function () {
        var main_Category = $("#ddlvendorsubservicemaincategorys").val();
        loadservicesbymaincategory(main_Category);
    });
    $("#ddlvendorsubservicemainservices").unbind().change(function (event) {
        event.preventDefault();
        var main_Category = $("#ddlvendorsubservicemaincategorys").val();
        var main_Service = $("#ddlvendorsubservicemainservices").val();
        loadsubservicebyservice(main_Category, main_Service);
    });
    $('#btnsubserviceClose,#btnVendorSubServiceReset').unbind().click(function () {
        resetvendorsubservicedetails();
    });
    resetvendorsubservicedetails();


    // request new sub service details
    $('#btnRequestSubServiceSave').unbind().click(function () {
        event.preventDefault();
        $('#btnRequestSubServiceSave').prop('disabled', true);
        if ($('#RequestSubServiceForm').parsley().validate() !== true) {
            $('#btnRequestSubServiceSave').prop('disabled', false);
        }
        else {
            savesubservicedetails();
        }
    });
    $("#btnrequestsubservice,#btnRequestSubServiceReset").unbind().click(function () {
        $('#imgsubservice').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
        $('#btnRequestSubServiceSave').prop('disabled', false);
        var getClass = $('#iconrequestsubservice').attr("class");
        $('#RequestSubServiceForm').parsley().reset();
        $('#RequestSubServiceForm')[0].reset();
        if (getClass == "simple-icon-plus") {
            $('#iconrequestsubservice').removeClass();
            $('#iconrequestsubservice').addClass("simple-icon-minus");
            $('#btnVendorSubServiceSave').hide();
        }
        else {
            $('#iconrequestsubservice').removeClass();
            $('#iconrequestsubservice').addClass("simple-icon-plus");
            $('#btnVendorSubServiceSave').show();
        }
    });
    $('#ddlrequestsubservicemaincategorys').change(function () {
        var value = $.trim($('#ddlrequestsubservicemaincategorys').val())
        loadmainservicesdetails(value);
    });
    $('#imgsubservice').click(function (e) {
        $('#subservicephoto1').click();
    });
    $('#subservicephoto1').change(function () {
        fasterPreviewimage2(this);
    });
});
function fasterPreviewimage2(uploader) {
    if (uploader.files && uploader.files[0]) {
        $('#imgsubservice').attr('src', window.URL.createObjectURL(uploader.files[0]));
    }
}
function resetvendorsubservicedetails() {
    loadmaincategory();
    loadmaincategorydetails();
    loadvendorsubservicedetails();
    $('#btnVendorSubServiceSave').prop('disabled', false);
    $("#ddlvendorsubservice").select2("destroy").select2({
        placeholder: "Select Sub Service",
        dropdownParent: $("#Vendor-Sub-Service-Modal"),
    });
    $("#ddlvendorsubservicemainservices").empty().append('<option value="">Select Main Service</option>');
    $('#vendorsubserviceform').parsley().reset();
    $('#vendorsubserviceform')[0].reset();
    $("#ddlvendorsubservice").val(null).trigger("change");
    $('#imgsubservice').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
}
function loadvendorsubservicedetails() {
    var data = new FormData();
    data.append("Vendor_Sub_Service_Vendor_Id", GetURLParameter('vid'));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorSubService/LoadVendorSubService",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_vendorsubservicelist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_vendorsubservicelist').DataTable({
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
                        { data: 'Sub_Services_Name' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                if (row.Vendor_Sub_Service_Status == "Active") {
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
                                var code = row.Vendor_Sub_Service_Uniquieid; var stat = row.Vendor_Sub_Service_Status;
                                if (stat == "Active") {
                                    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="inactivatevendorsubservice(\'' + code + '\')" ><i class="simple-icon-trash"></i></button>';
                                }
                                else {
                                    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "Re Activate" onclick="reactivatevendorsubservice(\'' + code + '\')" ><i class="simple-icon-reload"></i></button>';
                                }
                            }
                        }
                    ]
                });
            }
            else {
                var table = $('#tbl_vendorsubservicelist').DataTable({ destroy: true });
                table.clear();
                table.destroy();

                $('#tbl_vendorsubservicelist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
function savevendorsubservicedetails() {

    var data = new FormData();
    data.append("Vendor_Sub_Service_Vendor_Id", GetURLParameter('vid'));
    data.append("Vendor_Main_Category_Id", $.trim($('#ddlvendorsubservicemaincategorys').val()));
    data.append("Vendor_Main_Service_Id", $.trim($('#ddlvendorsubservicemainservices').val()));
    data.append("Vendor_Sub_Service_Id", $.trim($('#ddlvendorsubservice').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorSubService/SaveVendorSubServiceDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                resetvendorsubservicedetails();
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
function inactivatevendorsubservice(code) {
    var data = new FormData();
    data.append("Vendor_Sub_Service_Vendor_Id", GetURLParameter('vid'));
    data.append("Vendor_Sub_Service_Id", code);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorSubService/DeactivateVendorSubServiceDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.length > 0) {
                if (response[0].Type == "Success") {
                    SuccessAlert(response[0].Title, response[0].Message);
                    resetvendorsubservicedetails();
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
function reactivatevendorsubservice(code) {
    var data = new FormData();
    data.append("Vendor_Sub_Service_Vendor_Id", GetURLParameter('vid'));
    data.append("Vendor_Sub_Service_Id", code);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorSubService/ReactivateVendorSubServiceDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.length > 0) {
                if (response[0].Type == "Success") {
                    SuccessAlert(response[0].Title, response[0].Message);
                    resetvendorsubservicedetails();
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
    data.append("Vendor_Sub_Service_Vendor_Id", GetURLParameter('vid'));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorSubService/LoadVendorMainCategory",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlvendorsubservicemaincategorys").html("");
                $("#ddlvendorsubservicemaincategorys").append('<option value="">Select Category</option>');
                $.each(dat, function (j, vari) {
                    $("#ddlvendorsubservicemaincategorys").append("<option value='" + vari.Main_Category_Uniqueid + "'>" + vari.Main_Category_Name + "</option>");
                });
            }
            else {

            }
        },
        error: function (response) {

        }
    });
}
function loadservicesbymaincategory(Vendor_Main_Category_Id) {
    var data = new FormData();
    data.append("Vendor_Sub_Service_Vendor_Id", GetURLParameter('vid'));
    data.append("Vendor_Main_Category_Id", Vendor_Main_Category_Id);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorSubService/LoadVendorMainServices",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlvendorsubservicemainservices").html("");
                $("#ddlvendorsubservicemainservices").append('<option value="">Select Main Service</option>');
                $.each(dat, function (j, vari) {
                    $("#ddlvendorsubservicemainservices").append("<optgroup id='opt" + j + "' label='" + vari.Main_Category_Name + "'></optgroup>");
                    $.each(vari.ms, function (i, varis) {
                        var id = "#opt" + j;

                        $(id).append("<option value='" + varis.Main_Services_Uniqueid + "'>" + varis.Main_Services_Name + "</option>");
                    });
                });
            }
            else {
                $("#ddlvendorsubservicemainservices").html("");
                $("#ddlvendorsubservicemainservices").append('<option value="">No Record Found</option>');
            }
        },
        error: function (response) {

        }
    });
}
function loadsubservicebyservice(Vendor_Main_Category_Id, Vendor_Main_Service_Id) {
    var data = new FormData();
    data.append("Vendor_Sub_Service_Vendor_Id", GetURLParameter('vid'));
    data.append("Vendor_Main_Category_Id", Vendor_Main_Category_Id);
    data.append("Vendor_Main_Service_Id", Vendor_Main_Service_Id);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorSubService/LoadVendorSubServiceOfVendor",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlvendorsubservice").select2("destroy").select2({
                    dropdownParent: $("#Vendor-Sub-Service-Modal"),
                });
                $("#ddlvendorsubservice").html("");
                //("#ddlvendorsubservice").append('<option value="">Select Cateory</option>');
                $.each(dat, function (j, vari) {
                    $("#ddlvendorsubservice").append("<optgroup id='subopt" + j + "' label='" + vari.Main_Services_Name + "'></optgroup>");
                    $.each(vari.ss, function (i, varis) {
                        var id = "#subopt" + j;
                        $(id).append("<option value='" + varis.Sub_Services_Uniqueid + "'>" + varis.Sub_Services_Name  + "</option>");
                    });
                });
            }
            else {
                $("#ddlvendorsubservice").html("");
            }
        },
        error: function (response) {

        }
    });
}
// Request new sub service detials
function loadmaincategorydetails() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/MainCategory/LoadMainCategoryByActive",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlrequestsubservicemaincategorys").html("");
                $("#ddlrequestsubservicemaincategorys").append('<option value="">Select Main Category</option>');
                $.each(response, function (i, vari) {
                    $("#ddlrequestsubservicemaincategorys").append('<option value="' + vari.Main_Category_Uniqueid + '">' + vari.Main_Category_Name + '</option>');
                });
            }
            else {

            }
        },
        error: function (response) {

        }
    });
}
function loadmainservicesdetails(maincategoryid) {
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
                $("#ddlrequestsubservicemainservices").html("");
                $("#ddlrequestsubservicemainservices").append('<option value="">Select Main Service</option>');
                $.each(response, function (i, vari) {
                    $("#ddlrequestsubservicemainservices").append('<option value="' + vari.Main_Services_Uniqueid + '">' + vari.Main_Services_Name + '</option>');
                });
            }
            else {
                $("#ddlrequestsubservicemainservices").html("");
                $("#ddlrequestsubservicemainservices").append('<option value="">No Record Found</option>');
            }
        },
        error: function (response) {

        }
    });
}
function savesubservicedetails() {
    var data = new FormData();
    data.append("Sub_Services_Photo", $("#subservicephoto1").get(0).files[0]);
    data.append("Sub_Services_Main_Category", $.trim($('#ddlrequestsubservicemaincategorys').val()));
    data.append("Sub_Services_Main_Service", $.trim($('#ddlrequestsubservicemainservices').val()));
    data.append("Sub_Services_Name", $.trim($('#txtrequestsubservicename').val()));
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
                resetvendorsubservicedetails();
                $("#btnrequestsubservice").trigger("click");
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