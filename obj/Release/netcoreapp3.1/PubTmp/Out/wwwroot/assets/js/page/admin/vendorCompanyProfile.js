$(function () {

    $('#homeserviceId').hide();
    $('#VendorpremisesId').hide();
    $('#HomeDeliveryId').hide();
    $('#TakeawayId').hide();

    loadcountrydetails();
    loadbranchdetails();
    loadvendorbusinesstypes();

    //  loadvendordeliverytypes();
    $('#ddlvendorbusinesstype').change(function () {
        var value = $.trim($('#ddlvendorbusinesstype').val())
        loadvendorsubtype(value);
        loadvendordeliverytypes(value);
    });

    //loadvendordeliverytypes();
    $('#courierId').hide();
    $('#deliverymanagementId').hide();
    $('#chkHomeDelivery').change(function () {
        var breakallowed = "No";
        if ($("input[name='chkHomeDelivery']:checked").val() == "Yes") {
            breakallowed = "Yes";
            $("#courierId").show();
            $("#deliverymanagementId").show();

        }
        else {
            $("#courierId").hide();
            $("#deliverymanagementId").hide();
           // $('#vendorform').parsley().reset();
            //$('#vendorform')[0].reset();
        }
    });
    $('#ddlvendorbusinesstype').change(function () {
        var value = $.trim($('#ddlvendorbusinesstype').val())
        loadvendorsubtype(value);
        loadvendordeliverytypes(value);
    });
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
    $('#btnUpdate').unbind().click(function () {
        $('#btnUpdate').prop('disabled', false);
        if ($('#vendorform').parsley().validate() !== true) {
            $('#btnUpdate').prop('disabled', false);
        }
        else {
            $('#btnUpdate').prop('disabled', true);
            updatevendordetails();
        }
    });
   

    $('#ddlcountry').change(function () {
        loadstatedetails($('#ddlcountry').val());
    });
    $('#ddlstate').change(function () {
        loadcitydetails($('#ddlstate').val());
    });

    $('#btnClose,#btnReset').unbind().click(function () {
        resetvendor();
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


    /// For ALl other tab click event initialization

    $('#Profile-tab').unbind().click(function () {
        var url = "../assets/js/page/admin/vendorProfile.js";
        $.getScript(url, function () {
            console.log("employee loaded");
        });
    });
    $('#Branch-tab').unbind().click(function () {
        var url = "../assets/js/page/admin/vendorBranch.js";
        $.getScript(url, function () {
            console.log("branch loaded");
        });
    });
    $('#Employee-tab').unbind().click(function () {
        var url = "../assets/js/page/admin/vendoremployee.js";
        $.getScript(url, function () {
            console.log("employee loaded");
        });
    });
    $('#Main_Category-tab').unbind().click(function () {
        var url = "../assets/js/page/admin/vendormaincategory.js";
        $.getScript(url, function () {
            console.log("employee loaded");
        });
    });
    $('#Service-tab').unbind().click(function () {
        var url = "../assets/js/page/admin/vendormainservices.js";
        $.getScript(url, function () {
            console.log("employee loaded");
        });
    });
    $('#Sub_Service-tab').unbind().click(function () {
        var url = "../assets/js/page/admin/vendorsubservices.js";
        $.getScript(url, function () {
            console.log("employee loaded");
        });
    });


    $('#Package-tab').unbind().click(function () {
        var url = "../assets/js/page/admin/vendorpackages.js";
        $.getScript(url, function () {
            console.log("Package loaded");
        });
    });
    $('#Assign_Package_for_Employee-tab').unbind().click(function () {
        var url = "../assets/js/page/admin/vendoremployeepackages.js";
        $.getScript(url, function () {
            console.log("employee loaded");
        });
    });

    $('#Coupons-tab').unbind().click(function () {
        var url = "../assets/js/page/admin/vendorcoupons.js";
        $.getScript(url, function () {
            console.log("Coupons loaded");
        });
    });
    $('#ddlvendortype').change(function () {
        var type = $('#ddlvendortype').val();
        vendortype(type);
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


function loadbranchdetails() {
    var data = new FormData();
    data.append("vendor_Id", GetURLParameter('vid'));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorCreation/Loadbarnch",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlvendoremployeebranch").html("");
                $("#ddlvendoremployeebranch").append('<option value="">Select Branch</option>');
                $.each(response, function (i, vari) {
                    $("#ddlvendoremployeebranch").append('<option value="' + vari.branchId + '">' + vari.branchname + '</option>');
                });
                resetvendor();
            }
            else {

            }
        },
        error: function (response) {

        }
    });
}

function resetvendor() {
    imagepreview();
    $('#btnUpdate').prop('disabled', false);
    $('#btnUpdate').hide();
    $('#btnSave').show();
    $('#vendorform').parsley().reset();
    $('#vendorform')[0].reset();
    $('#image1').prop('src', '../assets/img/bookit/no-image-found-360x250.png');
    $('#galleryimage1').prop('src', '../assets/img/bookit/no-image-found-360x250.png');
    $('#galleryimage2').prop('src', '../assets/img/bookit/no-image-found-360x250.png');
    $('#galleryimage3').prop('src', '../assets/img/bookit/no-image-found-360x250.png');
    $('#galleryimage4').prop('src', '../assets/img/bookit/no-image-found-360x250.png');
    $('#staticvendorprof').prop('src', '../assets/img/bookit/no-image-found-360x250.png');
    $('#btnproof1remove').hide();
    $('#btnproof2remove').hide();
    $('#btnproof3remove').hide();
    $('#btnproof4remove').hide();
    $('#btnproof1download').hide();
    $('#btnproof2download').hide();
    $('#btnproof3download').hide();
    $('#btnproof4download').hide();
    loadvendordetailsfully();
}
function loadvendordetailsfully() {
    var code = GetURLParameter('vid');
    var data = new FormData();
    data.append("Vendor_uniqueid", code);
   // alert(code);

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
                $('#btnUpdate').show();
                $.each(response, function (i, vari) {
                    ////alert(vari.Vendor_uniqueid);
                    if (code == vari.Vendor_uniqueid) {
                        $('#ddlvendorbusinesstype').prop('disabled', true);
                        $('#ddlvendorsubtype').prop('disabled', true);
                        $('#ddlvendortype').prop('disabled', true);

                        $('#staticvendorname').text(vari.Vendor_Name);
                        $('#staticvendoraddress').text(vari.Vendor_Address);
                        $('#staticvendortiming').text(vari.Vendor_Operational_Working_Time_From + " - " + vari.Vendor_Operational_Working_Time_To);
                        if (vari.Vendor_Operational_Holidays != "" && vari.Vendor_Operational_Holidays != null) {
                            $('#staticvendorholidays').text(vari.Vendor_Operational_Holidays + " are holidays.");
                        }
                        else {
                            $('#staticvendorholidays').text("All Days are working.");
                        }

                        if (vari.Vendor_Photo != "" && vari.Vendor_Photo != null) {
                            $("#image1").prop('src', vari.Vendor_Photo);
                            $("#txtphoto1").val(vari.Vendor_Photo);
                            $('#staticvendorprof').prop('src', vari.Vendor_Photo);
                            $('#photo1').prop('required', false);

                        }
                        else {
                            $('#photo1').prop('required', true);
                            $('#staticvendorprof').prop('src', '../assets/img/bookit/no-image-found-360x250.png');
                        }
                        $("#ddlvendorbusinesstype").val(vari.Vendor_Business_Type);
                        loadvendorsubtype(vari.Vendor_Business_Type, vari.Vendor_Sub_Type);
                        loadvendordeliverytypes(vari.Vendor_Business_Type, vari.Vendor_Delivery_Type, vari.Vendor_Home_delivery_type);
                        // $("#ddlvendordeliverytype").val(vari.Vendor_Delivery_Type);
                        $("#txtdescription").val(vari.Vendor_Description);

                        $('#ddlvendortype').val(vari.Vendor_Type).trigger('change');
                        $("#txtname").val(vari.Vendor_Name);
                        $("#txtaddress").val(vari.Vendor_Address);
                        $("#ddlcountry").val(vari.Vendor_Country);
                        loadstatedetails(vari.Vendor_Country, vari.Vendor_State);
                        loadcitydetails(vari.Vendor_State, vari.Vendor_City);
                        $("#txtphone").val(vari.Vendor_Phone);
                        $("#txtemail").val(vari.Vendor_Email);
                        $("#txtestablisheddate").val(vari.Vendor_Established_Date);
                        $("#txtlatitude").val(vari.Vendor_Latitude);
                        $("#txtlongitude").val(vari.Vendor_Longitude);
                        $("#txtlocation").val(vari.Vendor_Location);
                        $("#txtbookingleadtime").val(vari.Vendor_Operational_Booking_Lead_Time);
                        $("#ddlbookingleadtimetype").val(vari.Vendor_Operational_Booking_Lead_Time_Type);
                        $("#txtserviceradius").val(vari.Vendor_Operational_Service_Radius);
                        var selectedValues = vari.Vendor_Operational_Holidays.split(',');
                        $.each(selectedValues, function (i, result) {
                            $("input[name='chkholiday'][value='" + selectedValues[i] + "']").prop('checked', false);
                        });
                        var Vendor_Operational_Break_Time_Allowed = vari.Vendor_Operational_Break_Time_Allowed.split(',');
                        $.each($("input[name='chkbreakallowed']:checked"), function () {
                            $("input[name='chkbreakallowed']:checked").prop('checked', false);
                        });
                        $.each(selectedValues, function (i, result) {
                            $("input[name='chkbreakallowed'][value='" + Vendor_Operational_Break_Time_Allowed[i] + "']").prop('checked', true);
                        });
                        if (vari.Vendor_Operational_Break_Time_Allowed.toUpperCase() == ("Yes").toUpperCase()) {
                            $("#txtbreaktimefrom").prop('required', true);
                            $("#txtbreaktimeto").prop('required', true);
                        }
                        else {
                            $("#txtbreaktimefrom").prop('required', false);
                            $("#txtbreaktimeto").prop('required', false);
                        }
                        var selectedPaymentValues = vari.Vendor_Operational_Payment_Methods_Accepted.split(',');
                        $.each($("input[name='chkpaymentaccepted']:checked"), function () {
                            $("input[name='chkpaymentaccepted']:checked").prop('checked', false);
                        });
                        $.each(selectedPaymentValues, function (i, result) {
                            $("input[name='chkpaymentaccepted'][value='" + selectedPaymentValues[i] + "']").prop('checked', true);
                        });
                        var selectedServiceproviedValues = vari.Vendor_Operational_Service_Provided_Areas.split(',');
                        $.each($("input[name='chkserviceprovided']:checked"), function () {
                            $("input[name='chkserviceprovided']:checked").prop('checked', false);
                        });
                        $.each(selectedServiceproviedValues, function (i, result) {
                            $("input[name='chkserviceprovided'][value='" + selectedServiceproviedValues[i] + "']").prop('checked', true);
                        });
                        var selectedtimeshiftValues = vari.Vendor_Operational_Time_Shift.split(',');
                        $.each($("input[name='chktimeshift']:checked"), function () {
                            $("input[name='chktimeshift']:checked").prop('checked', false);
                        });
                        $.each(selectedtimeshiftValues, function (i, result) {
                            $("input[name='chktimeshift'][value='" + selectedtimeshiftValues[i] + "']").prop('checked', true);
                        });
                        var selecteddaysshiftValues = vari.Vendor_Operational_Day_Shift.split(',');
                        $.each($("input[name='chkdayshift']:checked"), function () {
                            $("input[name='chkdayshift']:checked").prop('checked', false);
                        });
                        $.each(selecteddaysshiftValues, function (i, result) {
                            $("input[name='chkdayshift'][value='" + selecteddaysshiftValues[i] + "']").prop('checked', true);
                        });
                        var selectedsuveryconductedValues = vari.Vendor_Operational_Suvery_Conducted.split(',');
                        $.each($("input[name='chksuveryconducted']:checked"), function () {
                            $("input[name='chksuveryconducted']:checked").prop('checked', false);
                        });
                        $.each(selectedsuveryconductedValues, function (i, result) {
                            $("input[name='chksuveryconducted'][value='" + selectedsuveryconductedValues[i] + "']").prop('checked', true);
                        });
                        $("#txtworkinghoursfrom").val(vari.Vendor_Operational_Working_Time_From);
                        $("#txtworkinghoursto").val(vari.Vendor_Operational_Working_Time_To);
                        $("#txtbreaktimefrom").val(vari.Vendor_Operational_Break_Time_From);
                        $("#txtbreaktimeto").val(vari.Vendor_Operational_Break_Time_To);
                        $("#ddlcommissiontype").val(vari.Vendor_Operational_Commission_Type);
                        $("#txtcommission").val(vari.Vendor_Operational_Commission);


                        $("#txtfacebook").val(vari.facebook);
                        $("#txttwitter").val(vari.twitter);
                        $("#txtinstagram").val(vari.instagram);


                        $("#txtbankname").val(vari.Vendor_Bank_Name);
                        $("#txtaccountnumber").val(vari.Vendor_Bank_Account_No);
                        $("#txtifsccode").val(vari.Vendor_Bank_IFSC_Code);
                        if (vari.Vendor_Gallery_Photo_1 != "" && vari.Vendor_Gallery_Photo_1 != null) {
                            $("#galleryimage1").prop('src', vari.Vendor_Gallery_Photo_1);
                        }
                        else {
                            $('#galleryimage1').prop('src', '../assets/img/bookit/no-image-found-360x250.png');
                        }
                        if (vari.Vendor_Gallery_Photo_2 != "" && vari.Vendor_Gallery_Photo_2 != null) {
                            $("#galleryimage2").prop('src', vari.Vendor_Gallery_Photo_2);
                        }
                        else {
                            $('#galleryimage2').prop('src', '../assets/img/bookit/no-image-found-360x250.png');
                        }
                        if (vari.Vendor_Gallery_Photo_3 != "" && vari.Vendor_Gallery_Photo_3 != null) {
                            $("#galleryimage3").prop('src', vari.Vendor_Gallery_Photo_3);
                        }
                        else {
                            $('#galleryimage3').prop('src', '../assets/img/bookit/no-image-found-360x250.png');
                        }
                        if (vari.Vendor_Gallery_Photo_4 != "" && vari.Vendor_Gallery_Photo_4 != null) {
                            $("#galleryimage4").prop('src', vari.Vendor_Gallery_Photo_4);
                        }
                        else {
                            $('#galleryimage4').prop('src', '../assets/img/bookit/no-image-found-360x250.png');
                        }
                        $("#txtgalleryphoto1").val(vari.Vendor_Gallery_Photo_1);
                        $("#txtgalleryphoto2").val(vari.Vendor_Gallery_Photo_2);
                        $("#txtgalleryphoto3").val(vari.Vendor_Gallery_Photo_3);
                        $("#txtgalleryphoto4").val(vari.Vendor_Gallery_Photo_4);
                        $("#txtproof1").val(vari.Vendor_Document_Doc_1);
                        $("#txtproof2").val(vari.Vendor_Document_Doc_2);
                        $("#txtproof3").val(vari.Vendor_Document_Doc_3);
                        $("#txtproof4").val(vari.Vendor_Document_Doc_4);
                        if (vari.Vendor_Document_Doc_1 != "") {
                            $('#proof1').hide();
                            $('#proof1').prop('required', false);
                            $('#btnproof1download').show();
                            $('#btnproof1remove').show();
                            $('#btnproof1download').unbind().click(function () {
                                var iframe = "<iframe width='100%' height='100%' src='" + vari.Vendor_Document_Doc_1 + "'></iframe>"
                                var x = window.open();
                                x.document.open();

                                x.document.Title = "Document 1";
                                x.document.write(iframe);
                                x.document.close();
                            });
                        }
                        else {
                            $('#proof1').show();
                            $('#proof1').prop('required', true);
                            $('#btnproof1download').hide();
                            $('#btnproof1remove').hide();
                        }
                        if (vari.Vendor_Document_Doc_2 != "") {
                            $('#proof2').hide();
                            $('#btnproof2download').show();
                            $('#btnproof2remove').show();
                            $('#btnproof2download').unbind().click(function () {
                                var iframe = "<iframe width='100%' height='100%' src='" + vari.Vendor_Document_Doc_2 + "'></iframe>"
                                var x = window.open();
                                x.document.open();

                                x.document.Title = "Document 2";
                                x.document.write(iframe);
                                x.document.close();
                            });
                        }
                        else {
                            $('#proof2').show();
                            $('#btnproof2download').hide();
                            $('#btnproof2remove').hide();
                        }
                        if (vari.Vendor_Document_Doc_3 != "") {
                            $('#proof3').hide();
                            $('#btnproof3download').show();
                            $('#btnproof3remove').show();
                            $('#btnproof3download').unbind().click(function () {
                                var iframe = "<iframe width='100%' height='100%' src='" + vari.Vendor_Document_Doc_3 + "'></iframe>"
                                var x = window.open();
                                x.document.open();

                                x.document.Title = "Document 3";
                                x.document.write(iframe);
                                x.document.close();
                            });
                        }
                        else {
                            $('#proof3').show();
                            $('#btnproof3download').hide();
                            $('#btnproof3remove').hide();
                        }
                        if (vari.Vendor_Document_Doc_4 != "") {
                            $('#proof4').hide();
                            $('#btnproof4download').show();
                            $('#btnproof4remove').show();
                            $('#btnproof4download').unbind().click(function () {
                                var iframe = "<iframe width='100%' height='100%' src='" + vari.Vendor_Document_Doc_4 + "'></iframe>"
                                var x = window.open();
                                x.document.open();
                                x.document.Title = "Document 4";
                                x.document.write(iframe);
                                x.document.close();
                            });
                        }
                        else {
                            $('#proof4').show();
                            $('#btnproof4download').hide();
                            $('#btnproof4remove').hide();
                        }
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

function updatevendordetails() {
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
    var dtyp;
    if ($("input[name='chkHomeService']:checked").val() == "Yes") {
        dtyp = "3";
    }
    if ($("input[name='chkVendorPremises']:checked").val() == "Yes") {
        dtyp = "4";
    }
    if (($("input[name='chkHomeService']:checked").val() == "Yes") && ($("input[name='chkVendorPremises']:checked").val() == "Yes")) {
        dtyp = "3,4";
    }
    if ($("input[name='chkHomeDelivery']:checked").val() == "Yes") {
        dtyp = "1";
    }
    if ($("input[name='chktakeaway']:checked").val() == "Yes") {
        dtyp = "2";
    }
    if (($("input[name='chkHomeDelivery']:checked").val() == "Yes") && ($("input[name='chktakeaway']:checked").val() == "Yes")) {
        dtyp = "1,2";
    }

    var dt;
    if ($("input[name='chkCourier']:checked").val() == "Yes") {

        dt = "Courier";
    }
    if ($("input[name='chkDeliverymanagementId']:checked").val() == "Yes") {
        dt = "DeliveryBoy";
    }
    if (($("input[name='chkCourier']:checked").val() == "Yes") && ($("input[name='chkDeliverymanagementId']:checked").val() == "Yes")) {
        dt = "Courier,DeliveryBoy";
    }
    var code = GetURLParameter('vid');
    var data = new FormData();
    data.append("Vendor_Id", code);
    data.append("Vendor_Photo", $("#photo1").get(0).files[0]);
    data.append("Vendor_Photo_Check", $.trim($("#txtphoto1").val()));
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
    //data.append("Vendor_BusinessDeliveryType", $.trim($("#ddlvendordeliverytype").val()));

    data.append("Vendor_BusinessDeliveryType", dtyp);
    data.append("Vendor_Description", $.trim($("#txtdescription").val()));

    data.append("Vendor_Facebook", $.trim($("#txtfacebook").val()));
    data.append("Vendor_Twitter", $.trim($("#txttwitter").val()));
    data.append("Vendor_Instagram", $.trim($("#txtinstagram").val()));

    data.append("Vendor_Home_Delivery_Type", dt);
    //data.append('Vendor_Home_Delivery_Type', $('input[name=rdoCour]:checked').val());


    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorCreation/UpdateVendorDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                $('#Vendor-Modal').modal('hide');
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
                $("#txtusername").val("");
                $("#txtpassword").val("");
            }
        },
        error: function (response) {

        }
    });
}
//function updatevendordetails() {
//    var holidays = [];
//    $.each($("input[name='chkholiday']").not(":checked"), function () {
//        holidays.push($(this).val());
//    });
//    var serviceprovided = [];
//    $.each($("input[name='chkserviceprovided']:checked"), function () {
//        serviceprovided.push($(this).val());
//    });
//    var paymentaccepted = [];
//    $.each($("input[name='chkpaymentaccepted']:checked"), function () {
//        paymentaccepted.push($(this).val());
//    });
//    var dayshift = "";
//    if ($("input[name='chkdayshift']:checked").val() == "Yes") {
//        dayshift = "Yes";
//    }
//    else {
//        dayshift = "No";
//    }
//    var timeshift = "";
//    if ($("input[name='chktimeshift']:checked").val() == "Yes") {
//        timeshift = "Yes";
//    }
//    else {
//        timeshift = "No";
//    }
//    var suveryconducted = "";
//    if ($("input[name='chksuveryconducted']:checked").val() == "Yes") {
//        suveryconducted = "Yes";
//    }
//    else {
//        suveryconducted = "No";
//    }
//    var breakallowed = "No";
//    if ($("input[name='chkbreakallowed']:checked").val() == "Yes") {
//        breakallowed = "Yes";
//    }
//    var dtyp;
//    if ($("input[name='chkHomeService']:checked").val() == "Yes") {
//        dtyp = "3";
//    }
//    if ($("input[name='chkVendorPremises']:checked").val() == "Yes") {
//        dtyp = "4";
//    }
//    if (($("input[name='chkHomeService']:checked").val() == "Yes") && ($("input[name='chkVendorPremises']:checked").val() == "Yes")) {
//        dtyp = "3,4";
//    }
//    if ($("input[name='chkHomeDelivery']:checked").val() == "Yes") {
//        dtyp = "1";
//    }
//    if ($("input[name='chktakeaway']:checked").val() == "Yes") {
//        dtyp = "2";
//    }
//    if (($("input[name='chkHomeDelivery']:checked").val() == "Yes") && ($("input[name='chktakeaway']:checked").val() == "Yes")) {
//        dtyp = "1,2";
//    }
//    var code = GetURLParameter('vid');
//    var data = new FormData();
//    data.append("Vendor_Id", code);
//    data.append("Vendor_Photo", $("#photo1").get(0).files[0]);
//    data.append("Vendor_Photo_Check", $.trim($("#txtphoto1").val()));
//    data.append("Vendor_Type", $.trim($("#ddlvendortype").val()));
//    data.append("Vendor_Name", $.trim($("#txtname").val()));
//    data.append("Vendor_Address", $.trim($("#txtaddress").val()));
//    data.append("Vendor_Country", $.trim($("#ddlcountry").val()));
//    data.append("Vendor_State", $.trim($("#ddlstate").val()));
//    data.append("Vendor_City", $.trim($("#ddlcity").val()));
//    data.append("Vendor_Phone", $.trim($("#txtphone").val()));
//    data.append("Vendor_Email", $.trim($("#txtemail").val()));
//    data.append("Vendor_Established_Date", $.trim($("#txtestablisheddate").val()));
//    data.append("Vendor_Latitude", $.trim($("#txtlatitude").val()));
//    data.append("Vendor_Longitude", $.trim($("#txtlongitude").val()));
//    data.append("Vendor_Location", $.trim($("#txtlocation").val()));
//    data.append("Vendor_Operational_Booking_Lead_Time", $.trim($("#txtbookingleadtime").val()));
//    data.append("Vendor_Operational_Booking_Lead_Time_Type", $.trim($("#ddlbookingleadtimetype").val()));
//    data.append("Vendor_Operational_Service_Radius", $.trim($("#txtserviceradius").val()));
//    data.append("Vendor_Operational_Holidays", holidays);
//    data.append("Vendor_Operational_Working_Time_From", $.trim($("#txtworkinghoursfrom").val()));
//    data.append("Vendor_Operational_Working_Time_To", $.trim($("#txtworkinghoursto").val()));
//    data.append("Vendor_Operational_Break_Time_Allowed", breakallowed);
//    data.append("Vendor_Operational_Break_Time_From", $.trim($("#txtbreaktimefrom").val()));
//    data.append("Vendor_Operational_Break_Time_To", $.trim($("#txtbreaktimeto").val()));
//    data.append("Vendor_Operational_Payment_Methods_Accepted", paymentaccepted);
//    data.append("Vendor_Operational_Service_Provided_Areas", serviceprovided);
//    data.append("Vendor_Operational_Day_Shift", dayshift);
//    data.append("Vendor_Operational_Time_Shift", timeshift);
//    data.append("Vendor_Operational_Suvery_Conducted", suveryconducted);
//    data.append("Vendor_Operational_Commission_Type", $.trim($("#ddlcommissiontype").val()));
//    data.append("Vendor_Operational_Commission", $.trim($("#txtcommission").val()));
//    data.append("Vendor_Bank_Name", $.trim($("#txtbankname").val()));
//    data.append("Vendor_Bank_Account_No", $.trim($("#txtaccountnumber").val()));
//    data.append("Vendor_Bank_IFSC_Code", $.trim($("#txtifsccode").val()));
//    data.append("Vendor_Gallery_Photo_1", $("#galleryphoto1").get(0).files[0]);
//    data.append("Vendor_Gallery_Photo_2", $("#galleryphoto2").get(0).files[0]);
//    data.append("Vendor_Gallery_Photo_3", $("#galleryphoto3").get(0).files[0]);
//    data.append("Vendor_Gallery_Photo_4", $("#galleryphoto4").get(0).files[0]);
//    data.append("Vendor_Gallery_Photo_1_Check", $.trim($("#txtgalleryphoto1").val()));
//    data.append("Vendor_Gallery_Photo_2_Check", $.trim($("#txtgalleryphoto2").val()));
//    data.append("Vendor_Gallery_Photo_3_Check", $.trim($("#txtgalleryphoto3").val()));
//    data.append("Vendor_Gallery_Photo_4_Check", $.trim($("#txtgalleryphoto4").val()));
//    data.append("Vendor_Document_Doc_1", $("#proof1").get(0).files[0]);
//    data.append("Vendor_Document_Doc_2", $("#proof2").get(0).files[0]);
//    data.append("Vendor_Document_Doc_3", $("#proof3").get(0).files[0]);
//    data.append("Vendor_Document_Doc_4", $("#proof4").get(0).files[0]);
//    data.append("Vendor_Document_Doc_1_Check", $.trim($("#txtproof1").val()));
//    data.append("Vendor_Document_Doc_2_Check", $.trim($("#txtproof2").val()));
//    data.append("Vendor_Document_Doc_3_Check", $.trim($("#txtproof3").val()));
//    data.append("Vendor_Document_Doc_4_Check", $.trim($("#txtproof4").val()));

//    data.append("Vendor_Business_Type", $.trim($("#ddlvendorbusinesstype").val()));
//    data.append("Vendor_BusinessSubType", $.trim($("#ddlvendorsubtype").val()));
//    //data.append("Vendor_BusinessDeliveryType", $.trim($("#ddlvendordeliverytype").val()));

//    data.append("Vendor_BusinessDeliveryType", dtyp);
//    data.append("Vendor_Description", $.trim($("#txtdescription").val()));

//    data.append("Vendor_Facebook", $.trim($("#txtfacebook").val()));
//    data.append("Vendor_Twitter", $.trim($("#txttwitter").val()));
//    data.append("Vendor_Instagram", $.trim($("#txtinstagram").val()));

//    data.append('Vendor_Home_Delivery_Type', $('input[name=rdoCour]:checked').val());


//    $.ajax({
//        type: "Post",
//        contentType: "application/json;charset=utf-8",
//        url: "/VendorCreation/UpdateVendorDetails",
//        dataType: "json",
//        data: data,
//        contentType: false,
//        processData: false,
//        success: function (response) {
//            if (response[0].Type == "Success") {
//                SuccessAlert(response[0].Title, response[0].Message);
//                $('#Vendor-Modal').modal('hide');
//                resetvendor();
//            }
//            else if (response[0].Type == "Warning") {
//                WarningAlert(response[0].Title, response[0].Message)
//            }
//            else if (response[0].Type == "Error") {
//                ErrorAlert(response[0].Title, response[0].Message)
//            }
//            else {
//                var content = "Invalid";
//                var title = "Invalid username or password.";
//                ErrorAlert(title, content);
//                $("#txtusername").val("");
//                $("#txtpassword").val("");
//            }
//        },
//        error: function (response) {

//        }
//    });
//}
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
                resetvendor();
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
function loadvendordeliverytypes(value, Vendor_BusinessDeliveryType, Vendor_Delivery_Type) {
    var data = new FormData();
    data.append("Id", value);
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
                $.each(dat, function (j, vari) {

                    if (value == 1) {

                        $('#homeserviceId').show();
                        $('#VendorpremisesId').show();
                        $('#HomeDeliveryId').hide();
                        $('#TakeawayId').hide();
                        $('#courierId').hide();
                        $('#deliverymanagementId').hide();
                        //$('#takeawaydiv').hide();
                        //$('#take_away_div').hide();
                        //$('#takeawaytimeslot1').hide();
                        //$('#takeawaydiv1').hide();
                    }
                    if (value == 2) {
                        $('#HomeDeliveryId').show();
                        $('#TakeawayId').show();
                        $('#homeserviceId').hide();
                        $('#VendorpremisesId').hide();
                        $('#courierId').show();
                        $('#deliverymanagementId').show();
                        //$('#takeawaydiv').hide();
                        //$('#takeawaydiv1').hide();
                        //$('#take_away_div').show();
                        //$('#takeawaytimeslotTable1').hide();
                        //$('#HomeDeliveryId').show();
                        if (Vendor_Delivery_Type == "Courier") {
                            $("#chkCourier").prop("checked", true);
                            $("#chkDeliverymanagementId").prop("checked", false);
                        }
                        if (Vendor_Delivery_Type == "DeliveryBoy") {
                            $("#chkDeliverymanagementId").prop("checked", true);
                            $("#chkCourier").prop("checked", false);
                        }
                        //else if (Vendor_Delivery_Type == "Courier,DeliveryManagement") {
                        else if (Vendor_Delivery_Type == "Courier,DeliveryBoy") {
                            $("#chkCourier").prop("checked", true);
                            $("#chkDeliverymanagementId").prop("checked", true);
                        }



                        //    if (Vendor_Delivery_Type == "Courier") {
                        //        $("#rdbCourierId").prop("checked", true);
                        //        $("#rdbDeliverymanagementId").prop("checked", false);
                        //    }
                        //    if (Vendor_Delivery_Type == "DeliveryManagement") {
                        //        $("#rdbDeliverymanagementId").prop("checked", true);
                        //        $("#rdbCourierId").prop("checked", false);
                        //    }
                    }
                    if (value == 3) {
                        $('#homeserviceId').show();
                        $('#VendorpremisesId').show();
                        $('#HomeDeliveryId').hide();
                        //$('#TakeawayId').hide();
                        //$('#takeawaydiv').hide();
                        //$('#takeawaydiv1').hide();
                        //$('#take_away_div').hide();
                        //$('#takeawaytimeslot1').hide();
                        $('#courierId').hide();
                        $('#deliverymanagementId').hide();
                    }
                });
            }
            if (Vendor_BusinessDeliveryType != "" && Vendor_BusinessDeliveryType != null) {
                if (value == 1) {

                    $('#Employee-tab').show();
                    $('#Main_Category-tab').show();
                    $('#Service-tab').show();
                    $('#Sub_Service-tab').show();
                    $('#Package-tab').show();
                    $('#Assign_Package_for_Employee-tab').show();
                    $('#homeserviceId').show();
                    $('#VendorpremisesId').show();
                    $('#HomeDeliveryId').hide();
                    $('#TakeawayId').hide();
                    $("#chkHomeService").prop("checked", false);
                    $("#chkVendorPremises").prop("checked", false);
                    if (Vendor_BusinessDeliveryType == "3") {
                        $("#chkHomeService").prop("checked", true);
                    }
                    if (Vendor_BusinessDeliveryType == "4") {
                        $("#chkVendorPremises").prop("checked", true);
                    }
                    if (Vendor_BusinessDeliveryType == "3,4") {
                        $("#chkHomeService").prop("checked", true);
                        $("#chkVendorPremises").prop("checked", true);
                    }
                }

                if (value == 2) {

                    $('#Employee-tab').hide();
                    $('#Package-tab').hide();
                    $('#Assign_Package_for_Employee-tab').hide();


                    $('#homeserviceId').hide();
                    $('#VendorpremisesId').hide();
                    $('#HomeDeliveryId').show();
                    $('#TakeawayId').show();

                    if (Vendor_BusinessDeliveryType == "1") {
                        $("#chkHomeDelivery").prop("checked", true);
                    }
                    if (Vendor_BusinessDeliveryType == "2") {
                        $("#chktakeaway").prop("checked", true);
                    }
                    if (Vendor_BusinessDeliveryType == "1,2") {
                        $("#chkHomeDelivery").prop("checked", true);
                        $("#chktakeaway").prop("checked", true);
                    }
                }
                if (value == 3) {
                    $("#chkHomeService").prop("checked", false);
                    $("#chkVendorPremises").prop("checked", false);
                    $('#homeserviceId').show();
                    $('#VendorpremisesId').show();
                    $('#HomeDeliveryId').hide();
                    $('#TakeawayId').hide();
                    if (Vendor_BusinessDeliveryType == "3") {
                        $("#chkHomeService").prop("checked", true);
                    }
                    if (Vendor_BusinessDeliveryType == "4") {
                        $("#chkVendorPremises").prop("checked", true);
                    }
                    if (Vendor_BusinessDeliveryType == "3,4") {
                        $("#chkHomeService").prop("checked", true);
                        $("#chkVendorPremises").prop("checked", true);
                    }
                }
            }
            else {
                //$("#ddlvendordeliverytype").html("");
                //$("#ddlvendordeliverytype").append('<option value="">No Record Found</option>');
            }
        },
        error: function (response) {

        }
    });
}
//function loadvendordeliverytypes(value, Vendor_BusinessDeliveryType, Vendor_Delivery_Type) {
//    var data = new FormData();
//    data.append("Id", value);
//    $.ajax({
//        type: "Post",
//        contentType: "application/json;charset=utf-8",
//        url: "/VendorCreation/loadvendordeliverytypes",
//        dataType: "json",
//        data: data,
//        contentType: false,
//        processData: false,
//        success: function (response) {
//            var dat = response;
//            if (dat.length > 0) {
//                $.each(dat, function (j, vari) {

//                    if (value == 1) {

//                        $('#homeserviceId').show();
//                        $('#VendorpremisesId').show();
//                        $('#HomeDeliveryId').hide();
//                        $('#TakeawayId').hide();
//                        $('#courierId').hide();
//                        $('#deliverymanagementId').hide();
//                        //$('#takeawaydiv').hide();
//                        //$('#take_away_div').hide();
//                        //$('#takeawaytimeslot1').hide();
//                        //$('#takeawaydiv1').hide();
//                    }
//                    if (value == 2) {
//                        $('#HomeDeliveryId').show();
//                        $('#TakeawayId').show();
//                        $('#homeserviceId').hide();
//                        $('#VendorpremisesId').hide();
//                        $('#courierId').show();
//                        $('#deliverymanagementId').show();
//                        //$('#takeawaydiv').hide();
//                        //$('#takeawaydiv1').hide();
//                        //$('#take_away_div').show();
//                        //$('#takeawaytimeslotTable1').hide();
//                        if (Vendor_Delivery_Type == "Courier") {
//                            $("#rdbCourierId").prop("checked", true);
//                            $("#rdbDeliverymanagementId").prop("checked", false);
//                        }
//                        if (Vendor_Delivery_Type == "DeliveryManagement") {
//                            $("#rdbDeliverymanagementId").prop("checked", true);
//                            $("#rdbCourierId").prop("checked", false);
//                        }
//                    }
//                    if (value == 3) {
//                        $('#homeserviceId').show();
//                        $('#VendorpremisesId').show();
//                        $('#HomeDeliveryId').hide();
//                        //$('#TakeawayId').hide();
//                        //$('#takeawaydiv').hide();
//                        //$('#takeawaydiv1').hide();
//                        //$('#take_away_div').hide();
//                        //$('#takeawaytimeslot1').hide();
//                        $('#courierId').hide();
//                        $('#deliverymanagementId').hide();
//                    }
//                });
//            }
//            if (Vendor_BusinessDeliveryType != "" && Vendor_BusinessDeliveryType != null) {
//                if (value == 1) {

//                    $('#Employee-tab').show();
//                    $('#Main_Category-tab').show();
//                    $('#Service-tab').show();
//                    $('#Sub_Service-tab').show();
//                    $('#Package-tab').show();
//                    $('#Assign_Package_for_Employee-tab').show();
//                    $('#homeserviceId').show();
//                    $('#VendorpremisesId').show();
//                    $('#HomeDeliveryId').hide();
//                    $('#TakeawayId').hide();
//                    $("#chkHomeService").prop("checked", false);
//                    $("#chkVendorPremises").prop("checked", false);
//                    if (Vendor_BusinessDeliveryType == "3") {
//                        $("#chkHomeService").prop("checked", true);
//                    }
//                    if (Vendor_BusinessDeliveryType == "4") {
//                        $("#chkVendorPremises").prop("checked", true);
//                    }
//                    if (Vendor_BusinessDeliveryType == "3,4") {
//                        $("#chkHomeService").prop("checked", true);
//                        $("#chkVendorPremises").prop("checked", true);
//                    }
//                }

//                if (value == 2) {

//                    $('#Employee-tab').hide();
//                    $('#Package-tab').hide();
//                    $('#Assign_Package_for_Employee-tab').hide();


//                    $('#homeserviceId').hide();
//                    $('#VendorpremisesId').hide();
//                    $('#HomeDeliveryId').show();
//                    $('#TakeawayId').show();
//                    if (Vendor_BusinessDeliveryType == "1") {
//                        $("#chkHomeDelivery").prop("checked", true);
//                    }
//                    if (Vendor_BusinessDeliveryType == "2") {
//                        $("#chktakeaway").prop("checked", true);
//                    }
//                    if (Vendor_BusinessDeliveryType == "1,2") {
//                        $("#chkHomeDelivery").prop("checked", true);
//                        $("#chktakeaway").prop("checked", true);
//                    }
//                }
//                if (value == 3) {
//                    $("#chkHomeService").prop("checked", false);
//                    $("#chkVendorPremises").prop("checked", false);
//                    $('#homeserviceId').show();
//                    $('#VendorpremisesId').show();
//                    $('#HomeDeliveryId').hide();
//                    $('#TakeawayId').hide();
//                    if (Vendor_BusinessDeliveryType == "3") {
//                        $("#chkHomeService").prop("checked", true);
//                    }
//                    if (Vendor_BusinessDeliveryType == "4") {
//                        $("#chkVendorPremises").prop("checked", true);
//                    }
//                    if (Vendor_BusinessDeliveryType == "3,4") {
//                        $("#chkHomeService").prop("checked", true);
//                        $("#chkVendorPremises").prop("checked", true);
//                    }
//                }
//            }
//            else {
//                //$("#ddlvendordeliverytype").html("");
//                //$("#ddlvendordeliverytype").append('<option value="">No Record Found</option>');
//            }
//        },
//        error: function (response) {

//        }
//    });
//}


function loadvendorsubtype(value, Vendor_Sub_Type) {
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
                if (Vendor_Sub_Type != "" && Vendor_Sub_Type != null) {
                    $("#ddlvendorsubtype").val(Vendor_Sub_Type);/*.trigger('change');*/
                }
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