$(function () {
  
    loadvendorcompany();
    loadvendordetails();
    loadvendorbusinesstypes();
    loadvendordeliverytypes();

    imagepreview();
    $("#txtestablisheddate").datetimepicker({
        // Formats
        format: 'YYYY-MM-DD',
        icons:
        {
            next: 'fa fa-angle-right',
            previous: 'fa fa-angle-left'
        },
    });
    $("#txtworkinghoursfrom,#txtworkinghoursto,#txtbreaktimefrom,#txtbreaktimeto").datetimepicker({
        // Formats
        format: 'LT',
        ignoreReadonly: true,
        icons:
        {
            up: "fa fa-arrow-up",
            down: "fa fa-arrow-down",
        },
    });


    $('#Company-tab').unbind().click(function () {
        var url = "../assets/js/page/admin/vendorCompany.js";
        $.getScript(url, function () {
            console.log("employee loaded");
        });
    });
    $('#Users-tab').unbind().click(function () {
        var url = "../assets/js/page/admin/vendorUser.js";
        $.getScript(url, function () {
            console.log("branch loaded");
        });
    });


    $('#ddlvendorbusinesstype').change(function () {
        var value = $.trim($('#ddlvendorbusinesstype').val())
        loadvendorsubtype(value);
    });

    $('#btnSave').unbind().click(function () {
        $('#btnSave').prop('disabled', false);
        if ($('#vendorform').parsley().validate() !== true) {
            $('#btnSave').prop('disabled', false);
        }
        else {
            savevendordetails();
        }
    });
    $('#ddlcountry').change(function () {
        loadstatedetails($('#ddlcountry').val());
    });
    $('#ddlstate').change(function () {
        loadcitydetails($('#ddlstate').val());
    });
    $('#btngalleryphoto1').unbind().click(function () {
        $('#galleryimage1').prop('src', '../assets/img/bookit/no-image-found-360x250.png');
        $('#txtgalleryphoto1').val('');
    });
    $('#btngalleryphoto2').unbind().click(function () {
        $('#galleryimage2').prop('src', '../assets/img/bookit/no-image-found-360x250.png');
        $('#txtgalleryphoto2').val('');
    });
    $('#btngalleryphoto3').unbind().click(function () {
        $('#galleryimage3').prop('src', '../assets/img/bookit/no-image-found-360x250.png');
        $('#txtgalleryphoto3').val('');
    });
    $('#btngalleryphoto4').unbind().click(function () {
        $('#galleryimage4').prop('src', '../assets/img/bookit/no-image-found-360x250.png');
        $('#txtgalleryphoto4').val('');
    });

    $('#btnproof1remove').unbind().click(function () {
        $('#proof1').show();
        $('#proof1').prop('required', true);
        $('#btnproof1download').hide();
        $('#btnproof1remove').hide();
    });
    $('#btnproof2remove').unbind().click(function () {
        $('#proof2').show();
        $('#btnproof2download').hide();
        $('#btnproof2remove').hide();
        $('#txtproof2').val('');
    });
    $('#btnproof3remove').unbind().click(function () {
        $('#proof3').show();
        $('#btnproof3download').hide();
        $('#btnproof3remove').hide();
        $('#txtproof3').val('');
    });
    $('#btnproof4remove').unbind().click(function () {
        $('#proof4').show();
        $('#btnproof4download').hide();
        $('#btnproof4remove').hide();
        $('#txtproof4').val('');
    });
    loadcountrydetails();
    $('#ddlvendortype').change(function () {
        var type = $('#ddlvendortype').val();
        vendortype(type);
    });
    $('#chkbreakallowed').change(function () {
        var breakallowed = "No";
        if ($("input[name='chkbreakallowed']:checked").val() == "Yes") {
            breakallowed = "Yes";
        }
        if (breakallowed == ("Yes").toUpperCase()) {
            $("#txtbreaktimefrom").prop('required', true);
            $("#txtbreaktimeto").prop('required', true);
        }
        else {
            $("#txtbreaktimefrom").prop('required', false);
            $("#txtbreaktimeto").prop('required', false);
        }
    });

});
function vendortype(type) {
    if (type == "Commercial") {
        $('#payment_Section').prop("hidden", false);
        $("input[name='chkpaymentaccepted'][value='Online Payment']").prop('checked', true);
    }
    else if (type == "Religion") {
        $('#payment_Section').prop("hidden", true);
        $("input[name='chkpaymentaccepted'][value='Free']").prop('checked', true);
    }
    else if (type == "Medical") {
        $('#payment_Section').prop("hidden", false);
        $("input[name='chkpaymentaccepted'][value='Online Payment']").prop('checked', true);
    }
}
function savevendordetails() {
    // alert('hii');
    var holidays = [];
    $.each($("input[name='chkholiday']").not(":checked"), function () {
        holidays.push($(this).val());
    });
    var serviceprovided = [];
    $.each($("input[name='chkserviceprovided']:checked"), function () {
        serviceprovided.push($(this).val());
    });
    var paymentaccepted = [];
    $.each($("input[name='chkpaymentaccepted']:checked"), function () {
        paymentaccepted.push($(this).val());
    });
    var dayshift = "";
    if ($("input[name='chkdayshift']:checked").val() == "Yes") {
        dayshift = "Yes";
    }
    else {
        dayshift = "No";
    }
    var timeshift = "";
    if ($("input[name='chktimeshift']:checked").val() == "Yes") {
        timeshift = "Yes";
    }
    else {
        timeshift = "No";
    }
    var suveryconducted = "";
    if ($("input[name='chksuveryconducted']:checked").val() == "Yes") {
        suveryconducted = "Yes";
    }
    else {
        suveryconducted = "No";
    }
    var breakallowed = "No";
    if ($("input[name='chkbreakallowed']:checked").val() == "Yes") {
        breakallowed = "Yes";
    }
    var data = new FormData();
    data.append("Vendor_Photo", $("#photo1").get(0).files[0]);
    data.append("Vendor_Type", $.trim($("#ddlvendortype").val()));
    data.append("Vendor_Name", $.trim($("#txtname").val()));
    data.append("Vendor_Address", $.trim($("#txtaddress").val()));
    data.append("Vendor_Country", $.trim($("#ddlcountry").val()));
    data.append("Vendor_State", $.trim($("#ddlstate").val()));
    data.append("Vendor_City", $.trim($("#ddlcity").val()));
    data.append("Vendor_Phone", $.trim($("#txtphone").val()));
    data.append("Vendor_Email", $.trim($("#txtemail").val()));
    data.append("Vendor_Established_Date", $.trim($("#txtestablisheddate").val()));
    data.append("Vendor_Latitude", $.trim($("#txtlatitude").val()));
    data.append("Vendor_Longitude", $.trim($("#txtlongitude").val()));
    data.append("Vendor_Location", $.trim($("#txtlocation").val()));
    data.append("Vendor_Operational_Booking_Lead_Time", $.trim($("#txtbookingleadtime").val()));
    data.append("Vendor_Operational_Booking_Lead_Time_Type", $.trim($("#ddlbookingleadtimetype").val()));
    data.append("Vendor_Operational_Service_Radius", $.trim($("#txtserviceradius").val()));
    data.append("Vendor_Operational_Holidays", holidays);
    data.append("Vendor_Operational_Working_Time_From", $.trim($("#txtworkinghoursfrom").val()));
    data.append("Vendor_Operational_Working_Time_To", $.trim($("#txtworkinghoursto").val()));
    data.append("Vendor_Operational_Break_Time_Allowed", breakallowed);
    data.append("Vendor_Operational_Break_Time_From", $.trim($("#txtbreaktimefrom").val()));
    data.append("Vendor_Operational_Break_Time_To", $.trim($("#txtbreaktimeto").val()));
    data.append("Vendor_Operational_Payment_Methods_Accepted", paymentaccepted);
    data.append("Vendor_Operational_Service_Provided_Areas", serviceprovided);
    data.append("Vendor_Operational_Day_Shift", dayshift);
    data.append("Vendor_Operational_Time_Shift", timeshift);
    data.append("Vendor_Operational_Suvery_Conducted", suveryconducted);
    data.append("Vendor_Operational_Commission_Type", $.trim($("#ddlcommissiontype").val()));
    data.append("Vendor_Operational_Commission", $.trim($("#txtcommission").val()));
    data.append("Vendor_Bank_Name", $.trim($("#txtbankname").val()));
    data.append("Vendor_Bank_Account_No", $.trim($("#txtaccountnumber").val()));
    data.append("Vendor_Bank_IFSC_Code", $.trim($("#txtifsccode").val()));
    data.append("Vendor_Gallery_Photo_1", $("#galleryphoto1").get(0).files[0]);
    data.append("Vendor_Gallery_Photo_2", $("#galleryphoto2").get(0).files[0]);
    data.append("Vendor_Gallery_Photo_3", $("#galleryphoto3").get(0).files[0]);
    data.append("Vendor_Gallery_Photo_4", $("#galleryphoto4").get(0).files[0]);
    data.append("Vendor_Gallery_Photo_1_Check", $.trim($("#txtgalleryphoto1").val()));
    data.append("Vendor_Gallery_Photo_2_Check", $.trim($("#txtgalleryphoto2").val()));
    data.append("Vendor_Gallery_Photo_3_Check", $.trim($("#txtgalleryphoto3").val()));
    data.append("Vendor_Gallery_Photo_4_Check", $.trim($("#txtgalleryphoto4").val()));
    data.append("Vendor_Document_Doc_1", $("#proof1").get(0).files[0]);
    data.append("Vendor_Document_Doc_2", $("#proof2").get(0).files[0]);
    data.append("Vendor_Document_Doc_3", $("#proof3").get(0).files[0]);
    data.append("Vendor_Document_Doc_4", $("#proof4").get(0).files[0]);
    data.append("Vendor_Document_Doc_1_Check", $.trim($("#txtproof1").val()));
    data.append("Vendor_Document_Doc_2_Check", $.trim($("#txtproof2").val()));
    data.append("Vendor_Document_Doc_3_Check", $.trim($("#txtproof3").val()));
    data.append("Vendor_Document_Doc_4_Check", $.trim($("#txtproof4").val()));

    data.append("Vendor_Business_Type", $.trim($("#ddlvendorbusinesstype").val()));
    data.append("Vendor_BusinessSubType", $.trim($("#ddlvendorsubtype").val()));
    data.append("Vendor_BusinessDeliveryType", $.trim($("#ddlvendordeliverytype").val()));
    data.append("Vendor_Description", $.trim($("#txtdescription").val()));


    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorCreation/SaveVendorDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                resetvendor();
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
function loadvendorcompany() {
    var data = new FormData();
    data.append("Vendor_uniqueid", '');
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorCreation/LoadVendorcompany",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {

                $.each(response, function (i, vari) {
                    $('#staticvendorname').text(vari.Vendor_Name);
                    $('#staticvendoraddress').text(vari.Vendor_Address);
                    $('#staticvendortiming').text(vari.Vendor_Operational_Working_Time_From + " - " + vari.Vendor_Operational_Working_Time_To);


                    if (vari.Vendor_Photo != "" && vari.Vendor_Photo != null) {

                        $('#staticvendorprof').prop('src', vari.Vendor_Photo);
                        $('#photo1').prop('required', false);

                    }
                    else {
                        $('#photo1').prop('required', true);
                        $('#staticvendorprof').prop('src', '../assets/img/bookit/no-image-found-360x250.png');
                    }

                });
            }
            else {

            }
        },
        error: function (response) {

        }
    });
}

function loadvendorbusinesstypes() {

    var data = new FormData();
    data.append("Vendor_uniqueid", '');
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorCreation/loadvendorbusinesstypes",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlvendorbusinesstype").html("");
                $("#ddlvendorbusinesstype").append('<option value="">Select Business Ttype</option>');
                $.each(dat, function (j, vari) {
                    $("#ddlvendorbusinesstype").append("<option value='" + vari.Id + "'>" + vari.Vendor_type + "</option>");
                });
            }
            else {
                $("#ddlvendorbusinesstype").html("");
                $("#ddlvendorbusinesstype").append('<option value="">No Record Found</option>');
            }
        },
        error: function (response) {

        }
    });
}

function loadvendordeliverytypes() {

    var data = new FormData();
    data.append("Vendor_uniqueid", '');
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorCreation/loadvendordeliverytypes",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlvendordeliverytype").html("");
                $("#ddlvendordeliverytype").append('<option value="">Select Business Ttype</option>');
                $.each(dat, function (j, vari) {
                    $("#ddlvendordeliverytype").append("<option value='" + vari.id + "'>" + vari.delivery_type + "</option>");
                });
            }
            else {
                $("#ddlvendordeliverytype").html("");
                $("#ddlvendordeliverytype").append('<option value="">No Record Found</option>');
            }
        },
        error: function (response) {

        }
    });
}

function loadvendorsubtype(value) {
    var data = new FormData();
    data.append("Id", value);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorCreation/loadvendorbusinesssubtypes",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlvendorsubtype").html("");
                $("#ddlvendorsubtype").append('<option value="">Select Business SubType</option>');
                $.each(dat, function (j, vari) {
                    $("#ddlvendorsubtype").append("<option value='" + vari.id + "'>" + vari.Vendor_Sub_Type + "</option>");
                });
            }
            else {
                $("#ddlvendorsubtype").html("");
                $("#ddlvendorsubtype").append('<option value="">No Record Found</option>');
            }
        },
        error: function (response) {

        }
    });
}



function loadvendordetails() {
    var code = GetURLParameter('vid');

    var data = new FormData();
    data.append("Vendor_uniqueid", code);

    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorCreation/LoadVendors",
        dataType: "json",

        data: data,
        contentType: false,
        processData: false,


        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_companylist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_companylist').DataTable({
                    data: dat,
                    autoWidth: true,
                    responsive: true,
                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                        //{
                        //    orderable: false,
                        //    render: function (data, type, row) {
                        //        var image = row.Vendor_Photo;
                        //        return '<td><div class="sidebar-user"><div class="sidebar-user-picture"><img alt="image" src="' + image + '" width="50px" height="50px"></div></div></td>';
                        //    }
                        //},
                        { data: 'Vendor_Name' },
                        { data: 'Vendor_Email' },
                        { data: 'Vendor_Phone' },
                        //{
                        //    orderable: false,
                        //    render: function (data, type, row) {
                        //        var stat = row.Vendor_Status;
                        //        if (stat == "Active") {
                        //            return '<span class="badge badge-pill badge-success">' + stat + '</span>';
                        //        }
                        //        else { return '<span class="badge badge-pill badge-danger">' + stat + '</span>'; }
                        //    }
                        //},
                        {

                            orderable: false,
                            render: function (data, type, row) {

                                if (row.Vendor_Status == "Active") {
                                    if (row.Vendor_Login_Access == "Yes") {
                                        var code = row.Vendor_uniqueid;
                                        return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" data-vid=' + code + ' onclick="viewvendordetails(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate Credentials" onclick="deactivatevendorcredentials(\'' + code + '\')" ><i class="simple-icon-logout"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="DeactivateVendor(\'' + code + '\')" ><i class="simple-icon-trash"></i></button></td>';
                                    }
                                    else {
                                        var code = row.Vendor_uniqueid;
                                        return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" data-vid=' + code + ' onclick="viewvendordetails(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Activate Credentials" onclick="createvendorcredentials(\'' + code + '\')" ><i class="simple-icon-login"></i></button>  <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="DeactivateVendor(\'' + code + '\')" ><i class="simple-icon-trash"></i></button></td>';
                                    }
                                }
                                else {
                                    var code = row.Vendor_uniqueid;
                                    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" data-vid=' + code + ' onclick="viewvendordetails(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button></td>';
                                    //var code = row.Vendor_uniqueid;
                                    //return '<td><button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Re Activate" onclick="reactivatevendor(\'' + code + '\')" ><i class="simple-icon-reload"></i></button></td>';
                                }
                            }
                        }
                    ]
                });
            }
            else {
                $('#tbl_companylist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
function loadcountrydetails() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorCreation/LoadCountry",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlcountry").html("");
                $("#ddlcountry").append('<option value="">Select Country</option>');
                $.each(response, function (i, vari) {
                    $("#ddlcountry").append('<option value="' + vari.id + '">' + vari.name + '</option>');
                });
            }
            else {

            }
        },
        error: function (response) {

        }
    });
}
function loadstatedetails(country, state) {
    var data = new FormData();
    data.append("country", country);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorCreation/LoadState",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlstate").html("");
                $("#ddlstate").append('<option value="">Select State</option>');
                var code = "";
                $.each(response, function (i, vari) {
                    $("#ddlstate").append('<option value="' + vari.id + '">' + vari.name + '</option>');
                    code = vari.phone_code;
                });
                $('#txtphonecode').text(code);
                if (state != "" && state != null) {
                    $('#ddlstate').val(state);
                }
            }
            else {

            }
        },
        error: function (response) {

        }
    });
}
function loadcitydetails(state, city) {
    var data = new FormData();
    data.append("state", state);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorCreation/LoadCity",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlcity").html("");
                $("#ddlcity").append('<option value="">Select City</option>');
                $.each(response, function (i, vari) {
                    $("#ddlcity").append('<option value="' + vari.id + '">' + vari.name + '</option>');
                });
                $("#ddlcity").val(city);
            }
            else {

            }
        },
        error: function (response) {

        }
    });
}


function viewvendordetails(code) {

    swal({
        title: "Are you sure?",
        text: "Do you want to view the details!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes, View it!",
    }, function (isConfirm) {
        if (isConfirm) {
            var vid = code;

            // $('#companyprofile-Modal').modal('show');
            // $('#Main-Category-Modal').modal('show');


            if (vid != undefined && vid != null) {
                window.location = '/Vendor/CompanyProfile?vid=' + vid;
                //   window.location = '/Home/VendorsDetails?vid=' + vid;
            }
            else if (code != undefined && code != null) {
                //window.location = '/Home/VendorsDetails?vid=' + code;
                window.location = '/Vendor/CompanyProfile?vid=' + vid;
            }
        } else {


        }
    });
}

function resetvendor() {
    imagepreview();
    loadvendordetails();
    $('#btnSave').prop('disabled', false);
    $('#btnSave').show();
    $('#vendorform').parsley().reset();
    $('#vendorform')[0].reset();
    $('#image1').prop('src', '../assets/img/bookit/no-image-found-360x250.png');
    $('#galleryimage1').prop('src', '../assets/img/bookit/no-image-found-360x250.png');
    $('#galleryimage2').prop('src', '../assets/img/bookit/no-image-found-360x250.png');
    $('#galleryimage3').prop('src', '../assets/img/bookit/no-image-found-360x250.png');
    $('#galleryimage4').prop('src', '../assets/img/bookit/no-image-found-360x250.png');
    $('#btnproof1remove').hide();
    $('#btnproof2remove').hide();
    $('#btnproof3remove').hide();
    $('#btnproof4remove').hide();
    $('#btnproof1download').hide();
    $('#btnproof2download').hide();
    $('#btnproof3download').hide();
    $('#btnproof4download').hide();
}
function imagepreview() {

    $('#image1').click(function (e) {
        $('#photo1').click();
    });
    $('#photo1').change(function () {
        fasterPreviewimage1(this);
    });

    function fasterPreviewimage1(uploader) {
        if (uploader.files && uploader.files[0]) {
            $('#image1').attr('src', window.URL.createObjectURL(uploader.files[0]));
        }
    }

    $('#galleryimage1').click(function (e) {
        $('#galleryphoto1').click();
    });

    $('#galleryphoto1').change(function () {
        fasterPreviewgalleryimage1(this);
    });

    function fasterPreviewgalleryimage1(uploader) {
        if (uploader.files && uploader.files[0]) {
            $('#galleryimage1').attr('src', window.URL.createObjectURL(uploader.files[0]));
        }
    }

    $('#galleryimage2').click(function (e) {
        $('#galleryphoto2').click();
    });

    $('#galleryphoto2').change(function () {
        fasterPreviewgalleryimage2(this);
    });

    function fasterPreviewgalleryimage2(uploader) {
        if (uploader.files && uploader.files[0]) {
            $('#galleryimage2').attr('src', window.URL.createObjectURL(uploader.files[0]));
        }
    }

    $('#galleryimage3').click(function (e) {
        $('#galleryphoto3').click();
    });

    $('#galleryphoto3').change(function () {
        fasterPreviewgalleryimage3(this);
    });

    function fasterPreviewgalleryimage3(uploader) {
        if (uploader.files && uploader.files[0]) {
            $('#galleryimage3').attr('src', window.URL.createObjectURL(uploader.files[0]));
        }
    }

    $('#galleryimage4').click(function (e) {
        $('#galleryphoto4').click();
    });

    $('#galleryphoto4').change(function () {
        fasterPreviewgalleryimage4(this);
    });

    function fasterPreviewgalleryimage4(uploader) {
        if (uploader.files && uploader.files[0]) {
            $('#galleryimage4').attr('src', window.URL.createObjectURL(uploader.files[0]));
        }
    }

    $('#galleryimage5').click(function (e) {
        $('#galleryphoto5').click();
    });

    $('#galleryphoto5').change(function () {
        fasterPreviewgalleryimage5(this);
    });

    function fasterPreviewgalleryimage5(uploader) {
        if (uploader.files && uploader.files[0]) {
            $('#galleryimage5').attr('src', window.URL.createObjectURL(uploader.files[0]));
        }
    }

    $('#galleryimage6').click(function (e) {
        $('#galleryphoto6').click();
    });

    $('#galleryphoto6').change(function () {
        fasterPreviewgalleryimage6(this);
    });

    function fasterPreviewgalleryimage6(uploader) {
        if (uploader.files && uploader.files[0]) {
            $('#galleryimage6').attr('src', window.URL.createObjectURL(uploader.files[0]));
        }
    }
}
