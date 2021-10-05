$(function () {

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
    resetvendor();
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
            rejectvendordetails();
        }
    });
    $('#btnRequestApprove').unbind().click(function (e) {
        $('#btnRequestApprove').prop('disabled', true);
        if ($('#vendorform').parsley().validate() !== true) {
            $('#btnRequestApprove').prop('disabled', false);
        }
        else {
            approvevendordetails();
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
    $('#rejectModal').modal("hide");
    $('#Vendor-Modal').modal('hide');
}
function loadvendordetails() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorCreation/LoadRequestedVendor",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_vendorlist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_vendorlist').DataTable({
                    data: dat,
                    autoWidth: true,
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
                                var image = row.Vendor_Photo;
                                return '<td><div class="sidebar-user"><div class="sidebar-user-picture"><img alt="image" src="' + image + '" width="50px" height="50px"></div></div></td>';
                            }
                        },
                        { data: 'Vendor_Name' },
                        { data: 'Vendor_Email' },
                        { data: 'Vendor_Phone' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var stat = row.Vendor_Status;
                                if (stat == "Pending") {
                                    return '<span class="badge badge-pill badge-warning">' + stat + '</span>';
                                }
                                else { return '<span class="badge badge-pill badge-danger">' + stat + '</span>'; }
                            }
                        },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                //if (row.Vendor_Status == "Pending" || row.Vendor_Status == "Rejected") {
                                if (row.Vendor_Status == "Pending" || row.Vendor_Status == "Rejected") {
                                    var code = row.Vendor_uniqueid;
                                    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" data-vid=' + code + ' onclick="viewvendordetails(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button></td>';
                                }
                                else {
                                    var code = row.Vendor_uniqueid;
                                    return '<td>Nothing to perform</td>';
                                }
                            }
                        }
                    ]
                });
            }
            else {
                $('#tbl_vendorlist').DataTable();
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
                        $('#Vendor-Modal').modal('show');

                        //$('#reasonSection').html('');
                        $.each(response, function (i, vari) {
                            if (i == 0) {
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
                                //if (vari.Rejected_Reason != "") {
                                //    $('#rejectReason').append(
                                //        '<label>Rejected Reason</label>' +
                                //        '<div class="row">' +
                                //        '<div class="col-6"><input class="form-control" value="' + vari.Rejected_Reason + '" ></div><div class="col-6"><input class="form-control" value="' + vari.Rejected_Vendor_Created_Date + '" ></div><br/>' +
                                //        '</div>'
                                //    );
                                //}
                                if (vari.Rejected_Reason != undefined) {
                                    $('#rejectReason').append(
                                        '<label>Rejected Reason</label>' +
                                        '<div class="row">' +
                                        '<div class="col-6"><input class="form-control" value="' + vari.Rejected_Reason + '" ></div><div class="col-6"><input class="form-control" value="' + vari.Rejected_Vendor_Created_Date + '" ></div><br/>' +
                                        '</div>'
                                    );
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
        } else {


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
// Approve Reject Section
function approvevendordetails() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorCreation/ApproveVendorDetails",
        dataType: "json",
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                $('#Vendor-Modal').modal("hide");
                resetvendor();
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
}
function rejectvendordetails() {
    var data = new FormData();
    data.append("Rejected_Reason", $.trim($("#txtrejecteddescription").val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorCreation/RejectVendorDetails",
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