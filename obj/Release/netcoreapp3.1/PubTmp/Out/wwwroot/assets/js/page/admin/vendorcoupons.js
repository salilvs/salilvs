$(function () {

    resetvendorcoupons();
    $('input[type=radio][name=rdocouponapplicablearea]').change(function () {
        if (this.value == 'Main Category') {
            whenmaincategoryselected();
        }
        else if (this.value == 'Main Service') {
            whenmainserviceselected();
        }
        else if (this.value == 'Sub Service') {
            whensubserviceselected();
        }
        else if (this.value == 'Package') {
            whenpackageselected();
        }
    });
    $('#btnVendorCouponSave').unbind().click(function () {
        event.preventDefault();
        $('#btnVendorCouponSave').prop('disabled', true);
        if ($('#vendorcouponsform').parsley().validate() !== true) {
            $('#btnVendorCouponSave').prop('disabled', false);
        }
        else {
            savecoupondetails();
        }
    });
});
function resetvendorcoupons() {
    $('#btnVendorCouponSave').prop('disabled', false);
    $('#btnVendorCouponSave').show();
    $('#vendorcouponsform').parsley().reset();
    $('#vendorcouponsform')[0].reset();
    whenmaincategoryselected();
    loadcoupons();
    $('input[type=radio][name=rdocouponapplicablearea][value="Main Category"]').prop('checked', true);
    loadvendorcoupondetails();
}
function loadvendorcoupondetails() {
    var data = new FormData();
    data.append("Vendor_Id", GetURLParameter('vid'));
    //alert(GetURLParameter('vid'));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorCreation/LoadVendorCouponItemsList",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        //dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_vendorcoupons').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_vendorcoupons').DataTable({
                    data: dat,
                    autoWidth: true,
                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                        { data: 'vendor_Coupon_Name' },
                        { data: 'vendor_Coupon_Applicable_Area' },
                        { data: 'vendor_Coupon_Applicable_Item_List_With_Name' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var stat = row.vendor_Coupon_Status;
                                if (stat == "Active") {
                                    return '<span class="badge badge-pill badge-success">' + stat + '</span>';
                                }
                                else { return '<span class="badge badge-pill badge-danger">' + stat + '</span>'; }
                            }
                        },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                if (row.vendor_Coupon_Status == "Active") {
                                    var code = GetURLParameter('vid');
                                    //return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewmaincategorydetails(\'' + code + '\')" ><i class="feather icon-edit"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="inactivatemaincategory(\'' + code + '\')" ><i class="feather icon-trash"></i></button>';

                                    return '<td>  <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="InActiveCoupon(\'' + code + '\')" ><i class="feather icon-trash"></i></button>';
                                   // return;
                                }
                            }
                        }
                    ]
                });
            }
            else {
                $('#tbl_vendorcoupons').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
function savecoupondetails() {
    var Vendor_Coupon_Applicable_Area = $('input[type=radio][name=rdocouponapplicablearea]:checked').val();
    var data = new FormData();
    data.append("Vendor_Coupon_Uniqueid", $.trim($('#ddlcoupons').val()));
    data.append("Vendor_Coupon_Vendor_Uniqueid", GetURLParameter('vid'));
    data.append("Vendor_Coupon_Applicable_Area", $.trim($('input[type=radio][name=rdocouponapplicablearea]:checked').val()));
    if (Vendor_Coupon_Applicable_Area == 'Main Category') {
        data.append("Vendor_Coupon_Applicable_Item", $.trim($('#ddlvendorcouponmaincategory').val()));
    }
    else if (Vendor_Coupon_Applicable_Area == 'Main Service') {
        data.append("Vendor_Coupon_Applicable_Item", $.trim($('#ddlvendorcouponmainservice').val()));
    }
    else if (Vendor_Coupon_Applicable_Area == 'Sub Service') {
        data.append("Vendor_Coupon_Applicable_Item", $.trim($('#ddlvendorcouponsubservice').val()));
    }
    else if (Vendor_Coupon_Applicable_Area == 'Package') {
        data.append("Vendor_Coupon_Applicable_Item", $.trim($('#ddlvendorcouponpackages').val()));
    }
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorCreation/SaveVendorCouponDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].type == "Success") {
                SuccessAlert(response[0].title, response[0].message);
                resetvendorcoupons();
            }
            else if (response[0].type == "Warning") {
                WarningAlert(response[0].title, response[0].message);
                $('#btnVendorCouponSave').prop('disabled', false);
            }
            else if (response[0].type == "Error") {
                ErrorAlert(response[0].title, response[0].message)
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
function whenmaincategoryselected() {
    $('#loadservicedetails').html("");
    $('#loadservicedetails').append('<div class="form-group col-12"> ' +
        '<label for="ddlvendorcouponmaincategory">Main Category</label> ' +
        '<select id="ddlvendorcouponmaincategory" class="form-control" required multiple> ' +
        '</select> ' +
        '</div> ');
    loadmaincategory();
    $("#ddlvendorcouponmaincategory").select2({
        placeholder: "Select Main Category",
        dropdownParent: $("#Vendor-Coupons-Modal"),
    });
}
function whenmainserviceselected() {
    $('#loadservicedetails').html("");
    $('#loadservicedetails').append('<div class="row"> ' +
        '<div class="form-group col-4"> ' +
        '<label for="ddlvendorcouponmaincategory">Main Category</label> ' +
        '<select id="ddlvendorcouponmaincategory" class="form-control" required> ' +
        '</select> ' +
        '</div>' +
        '<div class="form-group col-8"> ' +
        '<label for="ddlvendorcouponmainservice">Main Services</label> ' +
        '<select id="ddlvendorcouponmainservice" class="form-control" required multiple> ' +
        '</select> ' +
        '</div>' +
        '</div>');
    loadmaincategory();
    $("#ddlvendorcouponmainservice").select2({
        placeholder: "Select Main Service",
        dropdownParent: $("#Vendor-Coupons-Modal"),
    });
    $("#ddlvendorcouponmaincategory").change(function () {
        var data = $("#ddlvendorcouponmaincategory").val();
        loadservicesbymaincategory(data);
        $("#ddlvendorcouponmainservice").html("");
        $("#ddlvendorcouponmainservice").append('<option value="">No Record Found</option>');
    });
}
function whensubserviceselected() {
    $('#loadservicedetails').html("");
    $('#loadservicedetails').append('<div class="row"> ' +
        '<div class="form-group col-4"> ' +
        '<label for="ddlvendorcouponmaincategory">Main Category</label> ' +
        '<select id="ddlvendorcouponmaincategory" class="form-control" required> ' +
        '</select> ' +
        '</div>' +
        '<div class="form-group col-4"> ' +
        '<label for="ddlvendorcouponmainservice">Main Services</label> ' +
        '<select id="ddlvendorcouponmainservice" class="form-control" required> ' +
        '</select> ' +
        '</div>' +
        '<div class="form-group col-4"> ' +
        '<label for="ddlvendorcouponsubservice">Sub Services</label> ' +
        '<select id="ddlvendorcouponsubservice" class="form-control" required multiple> ' +
        '</select> ' +
        '</div> ' +
        '</div>');
    loadmaincategory();
    $("#ddlvendorcouponmaincategory").change(function () {
        var data = $("#ddlvendorcouponmaincategory").val();
        loadservicesbymaincategory(data);
        $("#ddlvendorcouponmainservice").html("");
        $("#ddlvendorcouponmainservice").append('<option value="">No Record Found</option>');
    });
    $("#ddlvendorcouponsubservice").select2({
        placeholder: "Select Sub Sevices",
        dropdownParent: $("#Vendor-Coupons-Modal"),
    });
    $("#ddlvendorcouponmainservice").change(function () {
        var data = $("#ddlvendorcouponmainservice").val();
        loadsubservicebyservice(data);
    });
}
function whenpackageselected() {
    $('#loadservicedetails').html("");
    $('#loadservicedetails').append('<div class="row"> ' +
        '<div class="form-group col-4"> ' +
        '<label for="ddlvendorcouponmaincategory">Main Category</label> ' +
        '<select id="ddlvendorcouponmaincategory" class="form-control" required> ' +
        '</select> ' +
        '</div>' +
        '<div class="form-group col-4"> ' +
        '<label for="ddlvendorcouponmainservice">Main Services</label> ' +
        '<select id="ddlvendorcouponmainservice" class="form-control" required> ' +
        '</select> ' +
        '</div>' +
        '<div class="form-group col-4"> ' +
        '<label for="ddlvendorcouponsubservice">Sub Services</label> ' +
        '<select id="ddlvendorcouponsubservice" class="form-control" required> ' +
        '</select> ' +
        '</div> ' +
        '</div>' +
        '<div class="row"> ' +
        '<div class="form-group col-12"> ' +
        '<label for="ddlvendorcouponpackages">Packages</label> ' +
        '<select id="ddlvendorcouponpackages" class="form-control" required multiple> ' +
        '</select> ' +
        '</div> ' +
        '</div>');
    loadmaincategory();
    $("#ddlvendorcouponpackages").select2({
        placeholder: "Select Packages",
        dropdownParent: $("#Vendor-Coupons-Modal"),
    });
    $("#ddlvendorcouponmaincategory").change(function () {
        var data = $("#ddlvendorcouponmaincategory").val();
        loadservicesbymaincategory(data);
        $("#ddlvendorcouponmainservice").html("");
        $("#ddlvendorcouponmainservice").append('<option value="">No Record Found</option>');
    });
    $("#ddlvendorcouponmainservice").change(function () {
        var data = $("#ddlvendorcouponmainservice").val();
        loadsubservicebyservice(data);
    });
    $("#ddlvendorcouponsubservice").change(function () {
        var data = $("#ddlvendorcouponsubservice").val();
        loadvendorpackagelist(data);
    });
}
function loadcoupons() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Coupon/LoadCouponByActive",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlcoupons").empty("");
                $("#ddlcoupons").append('<option value="">Select Coupon</option>');
                $.each(dat, function (j, vari) {
                    $("#ddlcoupons").append("<option value='" + vari.coupon_Uniqueid + "'>" + vari.coupon_Name + "</option>");
                });
                $("#ddlcoupons").select2("destroy").select2({
                    dropdownParent: $("#Vendor-Coupons-Modal"),
                });
            }
            else {
                $("#ddlcoupons").empty("");
                $("#ddlcoupons").append('<option value="">No Record Found</option>');
            }
        },
        error: function (response) {

        }
    });
}
function loadmaincategory() {
    var data = new FormData();
    data.append("Vendor_Id", GetURLParameter('vid'));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorCreation/LoadVendorMainCategoryActiveOnly",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlvendorcouponmaincategory").empty("");
                $("#ddlvendorcouponmaincategory").append('<option value="">Select Category</option>');
                $.each(dat, function (j, vari) {
                    $("#ddlvendorcouponmaincategory").append("<option value='" + vari.vendor_Main_Category_Uniquieid + "'>" + vari.vendor_Main_Category_Name + "</option>");
                });
                //$("#ddlvendorcouponmaincategory").select2("destroy").select2({
                //    dropdownParent: $("#Vendor-Coupons-Modal"),
                //});
            }
            else {
                $("#ddlvendorcouponmaincategory").empty("");
                $("#ddlvendorcouponmaincategory").append('<option value="">No Record Found</option>');
            }
        },
        error: function (response) {

        }
    });
}
function loadservicesbymaincategory(Main_Category_Id, Main_Service_Id) {
    //alert("dd");
    var data = new FormData();
    data.append("Vendor_Id", GetURLParameter('vid'));
    data.append("Main_Category_Id", Main_Category_Id);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorCreation/LoadMainServicesByVendorMainCategoryOfVendor",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlvendorcouponmainservice").empty();
                if ($("#ddlvendorcouponsubservice").length != 0) {
                    $("#ddlvendorcouponmainservice").append('<option value="">Select Main Service</option>');
                }
                $.each(dat, function (j, vari) {
                    $("#ddlvendorcouponmainservice").append("<optgroup id='packmainservice" + j + "' label='" + vari.main_Category_Name + "'></optgroup>");
                    $.each(vari.mainservicelists, function (i, varis) {
                        var id = "#packmainservice" + j;
                        $(id).append("<option value='" + varis.main_Service_Id + "'>" + varis.main_Service_Name + "</option>");
                    });
                });
                if (Main_Service_Id != "" && Main_Service_Id != null) {
                    $("#ddlvendorcouponmainservice").val(Main_Service_Id);/*.trigger('change');*/
                }
                $("#ddlvendorcouponmainservice").select2("destroy").select2({
                    dropdownParent: $("#Vendor-Coupons-Modal"),
                });
            }
            else {
                $("#ddlvendorcouponmainservice").empty("");
                $("#ddlvendorcouponmainservice").append('<option value="">No Record Found</option>');
            }
        },
        error: function (response) {

        }
    });
}
function loadsubservicebyservice(Main_Service_Id, Sub_Service_Id) {
    console.log("Function to load sub service");
    var data = new FormData();
    data.append("Vendor_Id", GetURLParameter('vid'));
    data.append("Main_Service_Id", Main_Service_Id);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorCreation/LoadSubServicesByVendorMainServiceOfVendor",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlvendorcouponsubservice").empty("");
                if ($("#ddlvendorcouponpackages").length != 0) {
                    $("#ddlvendorcouponsubservice").append('<option value="">Select Sub Service</option>');
                }

                $.each(dat, function (j, vari) {
                    $("#ddlvendorcouponsubservice").append("<optgroup id='packsub" + j + "' label='" + vari.main_Service_Name + "'></optgroup>");
                    $.each(vari.subservicelists, function (i, varis) {
                        var id = "#packsub" + j;
                        $(id).append("<option value='" + varis.sub_Service_Id + "'>" + varis.sub_Service_Name + "</option>");
                    });
                });
                if (Sub_Service_Id != "" && Sub_Service_Id != null) {
                    $("#ddlvendorcouponsubservice").val(Sub_Service_Id);
                }
                $("#ddlvendorcouponsubservice").select2("destroy").select2({
                    dropdownParent: $("#Vendor-Coupons-Modal"),
                });
            }
            else {
                $("#ddlvendorcouponsubservice").empty("");
                $("#ddlvendorcouponsubservice").append('<option value="">No Record Found</option>');
            }
        },
        error: function (response) {

        }
    });
}
function loadvendorpackagelist(Sub_Service_Id) {
    var data = new FormData();
    data.append("Vendor_Id", GetURLParameter('vid'));
    data.append("Sub_Service_Id", Sub_Service_Id);
    data.append("Employee_Id", $.trim($('#ddlvendoremployee').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorCreation/LoadVendorPackageListBySubService",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlvendorcouponpackages").empty("");
                //("#ddlvendorcouponpackages").append('<option value="">Select Cateory</option>');
                $.each(dat, function (j, vari) {
                    $("#ddlvendorcouponpackages").append("<optgroup id='packageopt" + j + "' label='" + vari.sub_Service_Name + "'></optgroup>");
                    $.each(vari.packagelist, function (i, varis) {
                        var id = "#packageopt" + j;
                        $(id).append("<option value='" + varis.package_Uniqueid + "'>" + varis.package_Name + "</option>");
                    });
                });
                $("#ddlvendorcouponpackages").select2("destroy").select2({
                    dropdownParent: $("#Vendor-Coupons-Modal"),
                });
            }
            else {
                $("#ddlvendorcouponpackages").empty("");
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

