$(function () {
    $('#Service-tab').unbind().click(function () {
        //$.getScript(url, function () {
        //    console.log("employee loaded");
        //loadvendorservicedetails();
        loadservicedetails();
        //});
    });
    $('#btnSave').unbind().click(function () {
        event.preventDefault();
        //$('#btnSave').prop('disabled', true);
        //if ($('#serviceform').parsley().validate() !== true) {
        //    $('#btnSave').prop('disabled', false);
        //}
        //else {
        //    saveservicedetails();
        //}
        saveservicedetails();
    });
    loadmaincategorydetails();
    $('#image1').click(function (e) {
        $('#photo1').click();
    });
    $('#photo1').change(function () {
        fasterPreviewimage1(this);
    });
});
function loadservicedetails() {
    var data = new FormData();
    var Main_Services_Status = "Active, In Active";
    //var Main_Services_Uniqueid ="MainService-69";
    //data.append("Vendor_Main_Service_Vendor_Id","Vendor-Emp-3");
    data.append("Main_Services_Status", Main_Services_Status);
    //data.append("Main_Services_Uniqueid", Main_Services_Uniqueid);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/MainServices/LoadMainService",
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
                    autoWidth: false,
                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var image = row.Main_Services_Photo;
                                return '<td><div class="sidebar-user"><div class="sidebar-user-picture"><img alt="image" src="' + image + '" width="50px" height="50px"></div></div></td>';
                            }
                        },
                        { data: 'Main_Services_Main_Category_Name' },
                        { data: 'Main_Services_Name' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var stat = row.Main_Services_Status;
                                if (stat == "Active") {
                                    return '<span class="badge badge-pill badge-success">' + stat + '</span>';
                                }
                                if (stat == "Pending") {
                                    return '<span class="badge badge-pill badge-warning">' + stat + '</span>';
                                }
                                else { return '<span class="badge badge-pill badge-danger">' + stat + '</span>'; }
                            }
                        },
                        { data: 'Created_By' },
                        { data: 'Main_Services_Created_Date' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                if (row.Main_Services_Status == "Active") {
                                    var code = row.Main_Services_Uniqueid;
                                    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewservicedetails(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="inactivateservice(\'' + code + '\')" ><i class="simple-icon-trash"></i></button>';
                                }
                                else if (row.Main_Services_Status == "Pending") {
                                    var code = row.Main_Services_Uniqueid;
                                    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-warning" title = "Edit" onclick="viewservicedetails(\'' + code + '\')" ><i class="simple-icon-reload"></i></button> ';
                                }
                                else if (row.Main_Services_Status == "Rejected") {
                                    var code = row.Main_Services_Uniqueid;
                                    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "Edit" onclick="viewservicedetails(\'' + code + '\')" ><i class="simple-icon-reload"></i></button> ';
                                }
                                else {
                                    var code = row.Main_Services_Uniqueid;
                                    return '<td><button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Re Activate" onclick="reactivateservice(\'' + code + '\')" ><i class="simple-icon-reload"></i></button></td>';
                                }
                            }
                        }
                    ]
                });
            }
            else {
                $('#tbl_servicelist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
//function loadvendorservicedetails() {
//    var data = new FormData();
//    data.append("Vendor_Main_Service_Vendor_Id","Vendor-Emp-3");
//    $.ajax({
//        type: "Post",
//        contentType: "application/json;charset=utf-8",
//        url: "/VendorMainServices/LoadVendorMainService",
//        dataType: "json",
//        data: data,
//        contentType: false,
//        processData: false,
//        success: function (response) {
//            var dat = response;
//            if (dat.length > 0) {
//                var table = $('#tbl_vendorservicelist').DataTable({ destroy: true });
//                table.destroy();
//                $('#tbl_vendorservicelist').DataTable({
//                    data: dat,
//                    autoWidth: true,
//                    columns: [
//                        {
//                            render: function (data, type, row, meta) {
//                                return meta.row + meta.settings._iDisplayStart + 1;
//                            }
//                        },
//                        { data: 'Main_Category_Name' },
//                        { data: 'Main_Services_Name' },
//                        {
//                            orderable: false,
//                            render: function (data, type, row) {
//                                if (row.Vendor_Main_Service_Status == "Active") {
//                                    return '<span class="badge badge-pill badge-success">Active</span>';
//                                }
//                                else {
//                                    return '<span class="badge badge-pill badge-danger">In Active</span>';
//                                }
//                            }
//                        },
//                        {
//                            orderable: false,
//                            render: function (data, type, row) {
//                                var code = row.Vendor_Main_Service_Uniquieid; var stat = row.Vendor_Main_Service_Status;
//                                if (stat == "Active") {
//                                    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="inactivatevendormainservice(\'' + code + '\')" ><i class="simple-icon-trash"></i></button>';
//                                }
//                                else {
//                                    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "Re Activate" onclick="reactivatevendormainservice(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button>';
//                                }
//                            }
//                        }
//                    ]
//                });
//            }
//            else {
//                var table = $('#tbl_vendorservicelist').DataTable({ destroy: true });
//                table.clear();
//                table.destroy();

//                $('#tbl_vendorservicelist').DataTable();
//            }
//        },
//        error: function (response) {

//        }
//    });
//}
function loadmaincategorydetails() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/MainCategory/LoadMainCategoryByActive",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlmaincategory").html("");
                $("#ddlmaincategory").append('<option value="">Select Main Category</option>');
                $.each(response, function (i, vari) {
                    $("#ddlrequestservicemaincategory").append('<option value="' + vari.Main_Category_Uniqueid + '">' + vari.Main_Category_Name + '</option>');
                });

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


//function loadmaincategorydetails() {
//    $.ajax({
//        type: "Post",
//        contentType: "application/json;charset=utf-8",
//        url: "/MainCategory/LoadMainCategoryByActive",
//        dataType: "json",
//        success: function (response) {
//            var dat = response;
//            if (dat.length > 0) {
//                $("#ddlrequestservicemaincategory").html("");
//                $("#ddlrequestservicemaincategory").append('<option value="">Select Main Category</option>');
//                $.each(response, function (i, vari) {
//                    $("#ddlrequestservicemaincategory").append('<option value="' + vari.Main_Category_Uniqueid + '">' + vari.Main_Category_Name + '</option>');
//                });
//            }
//            else {

//            }
//        },
//        error: function (response) {

//        }
//    });
//}
function saveservicedetails() {
    var data = new FormData();
    data.append("Main_Services_Photo", $("#photo1").get(0).files[0]);
    data.append("Main_Services_Main_Category", $.trim($('#ddlrequestservicemaincategory').val()));
    data.append("Main_Services_Name", $.trim($('#txtname').val()));
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
                resetservice();
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
                var title = "Invalid error occured.";
                ErrorAlert(title, content);
                $('#btnSave').prop('disabled', false);
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