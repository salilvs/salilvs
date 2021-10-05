$(function () {
 
    $("#txtpackagefromtime,#txtpackagetotime").datetimepicker({
        // Formats
        format: 'LT',
        ignoreReadonly: true,
        icons:
        {
            up: "fa fa-arrow-up",
            down: "fa fa-arrow-down",
        },
    });
    $('#btnVendorPackageSave').unbind().click(function () {
        event.preventDefault();
        $('#btnVendorPackageSave').prop('disabled', false);
        if ($('#vendorpackageform').parsley().validate() !== true) {
            $('#btnVendorPackageSave').prop('disabled', false);
        }
        else {
            $('#btnVendorPackageSave').prop('disabled', true);
            savepackagedetailsdetails();
        }
    });
    $('#btnVendorPackageUpdate').unbind().click(function () {
        event.preventDefault();
        $('#btnVendorPackageUpdate').prop('disabled', false);
        if ($('#vendorpackageform').parsley().validate() !== true) {
            $('#btnVendorPackageUpdate').prop('disabled', false);
        }
        else {
            $('#btnVendorPackageUpdate').prop('disabled', true);
            updatepackagedetailsdetails();
        }
    });
    $("#ddlpackagemaincategory").change(function () {
        event.preventDefault();
        var data = $("#ddlpackagemaincategory").val();
        loadservicesbymaincategory(data);
    });
    $("#ddlpackagemainservice").change(function () {
        event.preventDefault();
        var main_Service = $("#ddlpackagemainservice").val();
        var main_Category = $("#ddlpackagemaincategory").val();
        loadsubservicebyservice(main_Category, main_Service);
    });
    $('#btnpackageClose,#btnVendorPackageReset,#Vendor-Package-Modal-Button').unbind().click(function () {
        resetpackagedetails();
    });
    $('#ddlpackagetimetype').change(function () {
        var type = $('#ddlpackagetimetype').val();
        packagetimetype(type);
    });
    resetpackagedetails();
    imagepreview();
});
function resetpackagedetails() {
    console.log("loaded");
    loadmaincategory();
    loadpackagedetailsdetails();
    $('#btnVendorPackageUpdate').prop('disabled', false);
    $('#btnVendorPackageSave').prop('disabled', false);
    $('#btnVendorPackageUpdate').hide();
    $('#btnVendorPackageSave').show();
    $('#vendorpackageform').parsley().reset();
    $('#vendorpackageform')[0].reset();
    $('#packageimage1').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
    $('#ddlpackagetimetype').val('').trigger('change');
}
function loadpackagedetailsdetails() {
    console.log("package loaded");
    var data = new FormData();
   data.append("Package_Vendor_Id", GetURLParameter('vid'));
  //  data.append("Package_Vendor_Id", 'Vendor-3');
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorPackage/LoadVendorPackage",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            //alert('success');
            //debugger;
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_vendorpackagelist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_vendorpackagelist').DataTable({
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
                                var image = row.Package_Photo;
                                return '<td><div class="sidebar-user"><div class="sidebar-user-picture"><img alt="image" src="' + image + '" width="50px" height="50px"></div></div></td>';
                            }
                        },
                        { data: 'Main_Category_Name' },
                        { data: 'Main_Services_Name' },
                        { data: 'Sub_Services_Name' },
                        { data: 'Package_Name' },
                        { data: 'Package_Rate' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var stat = row.Package_Status;
                                if (stat == "Active") {
                                    return '<span class="link-green">' + stat + '</span>';
                                }
                                else { return '<span class="badge badge-pill badge-danger">' + stat + '</span>'; }
                            }
                        },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                if (row.Package_Status == "Active") {
                                    var code = row.Package_Uniqueid;
                                    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="vendorviewpackagedetails(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="inactivatepackagedetails(\'' + code + '\')" ><i class="simple-icon-trash"></i></button>';
                                }
                                else if (row.Package_Status == "Rejected") {
                                    var code = row.Package_Uniqueid;
                                    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="vendorviewpackagedetails(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button> </td>';
                                }
                                else {
                                    var code = row.Package_Uniqueid;
                                    return '<td><button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Re Activate" onclick="reactivatepackagedetails(\'' + code + '\')" ><i class="simple-icon-reload"></i></button></td>';
                                }
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
function vendorviewpackagedetails(code) {

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
            data.append("Package_Vendor_Id", GetURLParameter('vid'));
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
                        $('#btnVendorPackageUpdate').show();
                        $('#btnVendorPackageSave').hide();
                        $('#Vendor-Package-Modal').modal('show');
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
                            $('#ddlpackagemaincategory').val(vari.Package_Main_Category_Id);
                            loadservicesbymaincategory(vari.Package_Main_Category_Id, vari.Package_Main_Service_Id);
                            loadsubservicebyservice(vari.Package_Main_Category_Id, vari.Package_Main_Service_Id, vari.Package_Sub_Service_Id);
                            $('#txtpackagename').val(vari.Package_Name);
                            $('input:radio[name=homeservice]').filter('[value="' + vari.Package_Home_Service + '"]').attr('checked', true);
                            $('#txtpackagerate').val(vari.Package_Rate);
                            $('#ddlpackagetimetype').val(vari.Package_Time_Type).trigger('change');
                            $('#txtpackageduration').val(vari.Package_Duration);
                            $('#txtpackagefromtime').val(vari.Package_From_Time);
                            $('#txtpackagetotime').val(vari.Package_To_Time);
                            $('#txtpackagedescription').val(vari.Package_Description);
                            $.each(vari.rejp, function (i, varis) {
                                console.log(varis.Rejected_reason);
                                $('#reasonSection').append(
                                    '<label>Rejected Reason</label>' +
                                    '<div class="row">' +
                                    '<div class="col-6"><input class="form-control" value="' + varis.Rejected_reason + '" ></div><div class="col-6"><input class="form-control" value="' + varis.Created_date + '" ></div><br/>' +
                                    '</div>'
                                );
                            });
                            if (null != vari.Package_Available_Days) {
                                var selectedValues = vari.Package_Available_Days.split(',');
                                $.each($("input[name='chkpackageAvailableDay']:checked"), function () {
                                    $("input[name='chkpackageAvailableDay']:checked").prop('checked', false);
                                });
                                $.each(selectedValues, function (i, result) {
                                    $("input[name='chkpackageAvailableDay'][value='" + selectedValues[i] + "']").prop('checked', true);
                                });
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
function savepackagedetailsdetails() {
    var holidays = [];
    $.each($("input[name='chkpackageAvailableDay']:checked"), function () {
        holidays.push($(this).val());
    });
    var data = new FormData();
    data.append("Package_Vendor_Id", GetURLParameter('vid'));
    data.append("Package_Photo", $("#packagephoto1").get(0).files[0]);
    data.append("Package_Main_Category_Id", $.trim($('#ddlpackagemaincategory').val()));
    data.append("Package_Main_Service_Id", $.trim($('#ddlpackagemainservice').val()));
    data.append("Package_Sub_Service_Id", $.trim($('#ddlpackagesubservice').val()));
    data.append("Package_Name", $.trim($('#txtpackagename').val()));
    data.append("Package_Rate", $.trim($('#txtpackagerate').val()));
    data.append('Package_Home_Service', $('input[name=homeservice]:checked').val());
    data.append("Package_Time_Type", $.trim($('#ddlpackagetimetype').val()));
    data.append("Package_Duration", $.trim($('#txtpackageduration').val()));
    data.append("Package_From_Time", $.trim($('#txtpackagefromtime').val()));
    data.append("Package_To_Time", $.trim($('#txtpackagetotime').val()));
    data.append("Package_Available_Days", holidays);
    data.append("Package_Description", $.trim($('#txtpackagedescription').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorPackage/SaveVendorPackageDetails",
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
                $('#btnVendorPackageSave').prop('disabled', false);
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                $('#btnVendorPackageSave').prop('disabled', false);
            }
            else {
                var content = "Invalid";
                var title = "Invalid username or password.";
                ErrorAlert(title, content);
                $('#btnVendorPackageSave').prop('disabled', false);
            }
        },
        error: function (response) {

        }
    });
}
function viewpackagedetailsdetails(code) {
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
            data.append("Package_Vendor_Id", GetURLParameter('vid'));
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
                        $('#btnVendorPackageUpdate').show();
                        $('#btnVendorPackageSave').hide();
                        $('#Vendor-Package-Modal').modal('show');
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
                            $('#ddlpackagemaincategory').val(vari.Package_Main_Category_Id);
                            loadservicesbymaincategory(vari.Package_Main_Category_Id, vari.Package_Main_Service_Id);
                            loadsubservicebyservice(vari.Package_Main_Category_Id, vari.Package_Main_Service_Id, vari.Package_Sub_Service_Id);
                            $('#txtpackagename').val(vari.Package_Name);
                            $('input:radio[name=homeservice]').filter('[value="' + vari.Package_Home_Service + '"]').attr('checked', true);
                            $('#txtpackagerate').val(vari.Package_Rate);
                            $('#ddlpackagetimetype').val(vari.Package_Time_Type).trigger('change');
                            $('#txtpackageduration').val(vari.Package_Duration);
                            $('#txtpackagefromtime').val(vari.Package_From_Time);
                            $('#txtpackagetotime').val(vari.Package_To_Time);
                            $('#txtpackagedescription').val(vari.Package_Description);
                            if (null != vari.Package_Available_Days || vari.Package_Available_Days != "") {
                                var selectedValues = vari.Package_Available_Days.split(',');
                                $.each($("input[name='chkpackageAvailableDay']:checked"), function () {
                                    $("input[name='chkpackageAvailableDay']:checked").prop('checked', false);
                                });
                                $.each(selectedValues, function (i, result) {
                                    $("input[name='chkpackageAvailableDay'][value='" + selectedValues[i] + "']").prop('checked', true);
                                });
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
function updatepackagedetailsdetails() {
    var holidays = [];
    $.each($("input[name='chkpackageAvailableDay']:checked"), function () {
        holidays.push($(this).val());
    });
    var data = new FormData();
    data.append("Package_Vendor_Id", GetURLParameter('vid'));
    data.append("Package_Photo", $("#packagephoto1").get(0).files[0]);
    data.append("Package_Photo_Check", $.trim($('#txtpackagephoto1').val()));
    data.append("Package_Main_Category_Id", $.trim($('#ddlpackagemaincategory').val()));
    data.append("Package_Main_Service_Id", $.trim($('#ddlpackagemainservice').val()));
    data.append("Package_Sub_Service_Id", $.trim($('#ddlpackagesubservice').val()));
    data.append("Package_Name", $.trim($('#txtpackagename').val()));
    data.append("Package_Rate", $.trim($('#txtpackagerate').val()));
    data.append('Package_Home_Service', $('input[name=homeservice]:checked').val());
    data.append("Package_Time_Type", $.trim($('#ddlpackagetimetype').val()));
    data.append("Package_Duration", $.trim($('#txtpackageduration').val()));
    data.append("Package_From_Time", $.trim($('#txtpackagefromtime').val()));
    data.append("Package_To_Time", $.trim($('#txtpackagetotime').val()));
    data.append("Package_Available_Days", holidays);
    data.append("Package_Description", $.trim($('#txtpackagedescription').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorPackage/UpdateVendorPackageDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                $('#Vendor-Package-Modal').modal('hide');
                resetpackagedetails();
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message);
                $('#btnVendorPackageUpdate').prop('disabled', false);
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                $('#btnVendorPackageUpdate').prop('disabled', false);
            }
            else {
                var content = "Invalid";
                var title = "Error.";
                ErrorAlert(title, content);
                $('#btnVendorPackageUpdate').prop('disabled', false);
            }
        },
        error: function (response) {

        }
    });
}
function inactivatepackagedetails(code) {
    var data = new FormData();
    data.append("Package_Vendor_Id", GetURLParameter('vid'));
    data.append("Package_Uniqueid", code);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorPackage/DeactivateVendorPackageDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.length > 0) {
                if (response[0].Type == "Success") {
                    SuccessAlert(response[0].Title, response[0].Message);
                    resetpackagedetails();
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
function reactivatepackagedetails(code) {
    var data = new FormData();
    data.append("Package_Vendor_Id", GetURLParameter('vid'));
    data.append("Package_Uniqueid", code);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorPackage/ReactivateVendorPackageDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.length > 0) {
                if (response[0].Type == "Success") {
                    SuccessAlert(response[0].Title, response[0].Message);
                    resetpackagedetails();
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
function imagepreview() {

    $('#packageimage1').click(function (e) {
        $('#packagephoto1').click();
    });
    $('#packagephoto1').change(function () {
        fasterPreviewimage1(this);
    });

    function fasterPreviewimage1(uploader) {
        if (uploader.files && uploader.files[0]) {
            $('#packageimage1').attr('src', window.URL.createObjectURL(uploader.files[0]));
        }
    }
}
function loadmaincategory() {
    var data = new FormData();
    data.append("Package_Vendor_Id", GetURLParameter('vid'));
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
function loadservicesbymaincategory(Vendor_Main_Category_Id, Vendor_Main_Service_Id) {
    var data = new FormData();
    data.append("Package_Vendor_Id", GetURLParameter('vid'));
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
function loadsubservicebyservice(Vendor_Main_Category_Id, Vendor_Main_Service_Id, Sub_Service_Id) {
    console.log("Function to load sub service");
    var data = new FormData();
    data.append("Package_Vendor_Id", GetURLParameter('vid'));
    data.append("Vendor_Main_Category_Id", Vendor_Main_Category_Id);
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