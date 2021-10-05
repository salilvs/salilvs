$(function () {
    
    $('#btnVendorEmployeePackageSave').unbind().click(function () {
        event.preventDefault();
        $('#btnVendorEmployeePackageSave').prop('disabled', true);
        if ($('#vendorassignpackageforemployeeform').parsley().validate() !== true) {
            $('#btnVendorEmployeePackageSave').prop('disabled', false);
        }
        else {
            savevendoremployeepackagedetails();
        }
    });
    $("#ddlvendorpackage").select2({
        dropdownParent: $("#Vendor-Assign-Employee-Package-Modal"),
    });
    $("#ddlvendoremployeepackageassignmaincategorys").change(function () {
        var data = $("#ddlvendoremployeepackageassignmaincategorys").val();
        loadservicesbymaincategory(data);
        $("#ddlvendoremployeepackageassignsubservice").html("");
        $("#ddlvendoremployeepackageassignsubservice").append('<option value="">No Record Found</option>');
    });
    $("#ddlvendoremployeepackageassignmainservices").change(function () {
        var main_Category = $("#ddlvendoremployeepackageassignmaincategorys").val();
        var main_Service = $("#ddlvendoremployeepackageassignmainservices").val();
        loadsubservicebyservice(main_Category, main_Service);
    });
    $("#ddlvendoremployeepackageassignsubservice").change(function () {
        var main_Category = $("#ddlvendoremployeepackageassignmaincategorys").val();
        var main_Service = $("#ddlvendoremployeepackageassignmainservices").val();
        var sub_Service = $("#ddlvendoremployeepackageassignsubservice").val();
        loadvendorpackagelist(main_Category, main_Service, sub_Service);
    });
    resetvendoremployeepackagedetails();
    $("#selectalloption").click(function () {
        if ($("#selectalloption").is(':checked')) {
            $("#ddlvendorpackage option").prop("selected", "selected");
            $('#ddlvendorpackage').trigger('change');
        } else {
            $('#ddlvendorpackage').val("").trigger('change');
        }
    });
})

function resetvendoremployeepackagedetails() {
    loadmaincategory();
    loadvendoremployeepackagedetails();
    loadvendoremployeelist();
    $('#btnVendorEmployeePackageSave').prop('disabled', false);
    $("#ddlvendorpackage").select2("destroy").select2({
        dropdownParent: $("#Vendor-Assign-Employee-Package-Modal"),
    });
    $("#ddlvendoremployeepackageassignmaincategorys").html("");
    $("#ddlvendoremployeepackageassignmaincategorys").append('<option value="">No Record Found</option>');
    $("#ddlvendoremployeepackageassignmainservices").html("");
    $("#ddlvendoremployeepackageassignmainservices").append('<option value="">No Record Found</option>');
    $("#ddlvendoremployeepackageassignsubservice").html("");
    $("#ddlvendoremployeepackageassignsubservice").append('<option value="">No Record Found</option>');
    $("#ddlvendorpackage").html("");
    $('#vendorassignpackageforemployeeform').parsley().reset();
    $('#vendorassignpackageforemployeeform')[0].reset();
    $("#ddlvendorpackage").val(null).trigger("change");

}

function loadvendoremployeepackagedetails() {
    var data = new FormData();
    data.append("Vendor_Employe_Vendor_Id", GetURLParameter('vid'));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorEmployeePackages/LoadVendorEmployeePackage",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_vendoremployeepackagelist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_vendoremployeepackagelist').DataTable({
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
                                var image = row.Vendor_Employee_Photo;
                                return '<td><div class="sidebar-user"><div class="sidebar-user-picture"><img alt="image" src="' + image + '" width="50px" height="50px"></div></div></td>';
                            }
                        },
                        { data: 'Vendor_Employee_Name' },
                        { data: 'Package_Name' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var stat = row.Vendor_Employe_Package_Status;
                                if (stat == "Active") {
                                    return '<span class="badge badge-pill badge-success">' + stat + '</span>';
                                }
                                else { return '<span class="badge badge-pill badge-danger">' + stat + '</span>'; }
                            }
                        },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                if (row.Vendor_Employe_Package_Status == "Active") {
                                    var code = row.Vendor_Employe_Package_Id;
                                    return '<td><button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="inactivatevendoremployeepackagedetails(\'' + code + '\')" ><i class="simple-icon-trash"></i></button>';
                                }
                                else {
                                    var code = row.Vendor_Employe_Package_Id;
                                    return '<td><button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Re Activate" onclick="reactivatevendoremployeepackagedetails(\'' + code + '\')" ><i class="simple-icon-reload"></i></button></td>';
                                }
                            }
                        }
                    ]
                });
            }
            else {
                var table = $('#tbl_vendoremployeepackagelist').DataTable({ destroy: true });
                table.clear();
                table.destroy();

                $('#tbl_vendoremployeepackagelist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
function savevendoremployeepackagedetails() {

    var data = new FormData();
    data.append("Vendor_Employe_Vendor_Id", GetURLParameter('vid'));
    data.append("Vendor_Employe_uniqueid", $.trim($('#ddlvendoremployee').val()));
    data.append("Main_Category", $.trim($('#ddlvendoremployeepackageassignmaincategorys').val()));
    data.append("Main_Service", $.trim($('#ddlvendoremployeepackageassignmainservices').val()));
    data.append("Sub_Service", $.trim($('#ddlvendoremployeepackageassignsubservice').val()));
    data.append("Vendor_Employe_Package_uniqueid", $.trim($('#ddlvendorpackage').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorEmployeePackages/SaveVendorEmployeePackageDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                resetvendoremployeepackagedetails();
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
function viewvendoremployeepackagesdetails(code) {

    swal({
        title: "Are you sure?",
        text: "Do you want to add main category for selected vendor!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes",
    }, function (isConfirm) {
        if (isConfirm) {
            var data = new FormData();
            data.append("Vendor_Employee_Id", code);
            data.append("Vendor_Employe_Vendor_Id", GetURLParameter('vid'));
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/VendorEmployeePackages/LoadVendorEmployeePackagesByEmployee",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        $('#Vendor-Assign-Employee-Package-Modal').modal('show');
                        var selectedValues = ""; var selectedemployee = "";
                        $.each(dat, function (i, vari) {
                            selectedValues = vari.vendor_Employe_Package_uniqueid.split(', ');
                            selectedemployee = vari.vendor_Employe_Package_Employee_uniqueid;
                        });
                        alert(selectedemployee);
                        $('#ddlvendoremployee').val(selectedemployee);
                        $('#ddlvendorpackage').val(selectedValues).trigger("change");
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
function loadvendoremployeelist() {
    var data = new FormData();
    data.append("Vendor_Employe_Vendor_Id", GetURLParameter('vid'));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorEmployeePackages/LoadVendorEmployee",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlvendoremployee").html("");
                $("#ddlvendoremployee").append('<option value="">Select Employee</option>');
                $.each(response, function (i, varis) {
                    $('#ddlvendoremployee').append("<option value='" + varis.Vendor_Employee_Uniqueid + "'>" + varis.Vendor_Employee_Name + "</option>");
                });
            }
            else {

            }
        },
        error: function (response) {

        }
    });
}
function inactivatevendoremployeepackagedetails(code) {

    var data = new FormData();
    data.append("Vendor_Employe_Vendor_Id", GetURLParameter('vid'));
    data.append("Vendor_Employe_Package_Id", code);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorEmployeePackages/DeactivateVendorEmployeePackageDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.length > 0) {
                if (response[0].Type == "Success") {
                    SuccessAlert(response[0].Title, response[0].Message);
                    resetvendoremployeepackagedetails();
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
function reactivatevendoremployeepackagedetails(code) {
    var data = new FormData();
    data.append("Vendor_Employe_Vendor_Id", GetURLParameter('vid'));
    data.append("Vendor_Employe_Package_Id", code);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorEmployeePackages/ReactivateVendorEmployeePackageDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.length > 0) {
                if (response[0].Type == "Success") {
                    SuccessAlert(response[0].Title, response[0].Message);
                    resetvendoremployeepackagedetails();
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
    data.append("Vendor_Employe_Vendor_Id", GetURLParameter('vid'));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorEmployeePackages/LoadVendorMainCategory",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlvendoremployeepackageassignmaincategorys").html("");
                $("#ddlvendoremployeepackageassignmaincategorys").append('<option value="">Select Category</option>');
                $.each(dat, function (j, vari) {
                    $("#ddlvendoremployeepackageassignmaincategorys").append("<option value='" + vari.Main_Category_Uniqueid + "'>" + vari.Main_Category_Name + "</option>");
                });
            }
            else {
                $("#ddlvendoremployeepackageassignmaincategorys").html("");
                $("#ddlvendoremployeepackageassignmaincategorys").append('<option value="">No Record Found</option>');
            }
        },
        error: function (response) {

        }
    });
}
function loadservicesbymaincategory(Main_Category_Id, Main_Service_Id) {
    var data = new FormData();
    data.append("Vendor_Employe_Vendor_Id", GetURLParameter('vid'));
    data.append("Main_Category", Main_Category_Id);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorEmployeePackages/LoadVendorMainServices",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlvendoremployeepackageassignmainservices").html("");
                $("#ddlvendoremployeepackageassignmainservices").append('<option value="">Select Main Category</option>');
                $.each(dat, function (j, vari) {
                    $("#ddlvendoremployeepackageassignmainservices").append("<optgroup id='opt" + j + "' label='" + vari.Main_Category_Name + "'></optgroup>");
                    $.each(vari.ms, function (i, varis) {
                        var id = "#opt" + j;
                        $(id).append("<option value='" + varis.Main_Services_Uniqueid + "'>" + varis.Main_Services_Name + "</option>");
                    });
                });
                if (Main_Service_Id != "" && Main_Service_Id != null) {
                    $("#ddlvendoremployeepackageassignmainservices").val(Main_Service_Id).trigger('change');
                }
            }
            else {
                $("#ddlvendoremployeepackageassignmainservices").html("");
                $("#ddlvendoremployeepackageassignmainservices").append('<option value="">No Record Found</option>');
            }
        },
        error: function (response) {

        }
    });
}
function loadsubservicebyservice(Main_Category_Id, Main_Service_Id, Sub_Service_Id) {
    var data = new FormData();
    data.append("Vendor_Employe_Vendor_Id", GetURLParameter('vid'));
    data.append("Main_Category", Main_Category_Id);
    data.append("Main_Service", Main_Service_Id);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorEmployeePackages/LoadVendorSubService",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlvendoremployeepackageassignsubservice").html("");
                $("#ddlvendoremployeepackageassignsubservice").append('<option value="">Select Sub Service</option>');
                $.each(dat, function (j, vari) {
                    $("#ddlvendoremployeepackageassignsubservice").append("<optgroup id='subopt" + j + "' label='" + vari.Main_Services_Name + "'></optgroup>");
                    $.each(vari.ss, function (i, varis) {
                        var id = "#subopt" + j;
                        $(id).append("<option value='" + varis.Sub_Services_Uniqueid + "'>" + varis.Sub_Services_Name + "</option>");
                    });
                });
                if (Sub_Service_Id != "" && Sub_Service_Id != null) {
                    $("#ddlvendoremployeepackageassignsubservice").val(Sub_Service_Id);
                }
            }
            else {
                $("#ddlvendoremployeepackageassignsubservice").html("");
                $("#ddlvendoremployeepackageassignsubservice").append('<option value="">No Record Found</option>');
            }
        },
        error: function (response) {

        }
    });
}
function loadvendorpackagelist(Main_Category_Id, Main_Service_Id, Sub_Service_Id) {
    var data = new FormData();
    data.append("Vendor_Employe_Vendor_Id", GetURLParameter('vid'));
    data.append("Vendor_Employe_uniqueid", $.trim($('#ddlvendoremployee').val()));
    data.append("Main_Category", Main_Category_Id);
    data.append("Main_Service", Main_Service_Id);
    data.append("Sub_Service", Sub_Service_Id);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorEmployeePackages/LoadVendorPackage",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlvendorpackage").html("");
                //("#ddlvendorpackage").append('<option value="">Select Cateory</option>');
                $.each(dat, function (j, vari) {
                    $("#ddlvendorpackage").append("<optgroup id='packageopt" + j + "' label='" + vari.Sub_Services_Name + "'></optgroup>");
                    $.each(vari.vp, function (i, varis) {
                        var id = "#packageopt" + j;
                        $(id).append("<option value='" + varis.Package_Uniqueid + "'>" + varis.Package_Name + "</option>");
                    });
                });
                $("#ddlvendorpackage").select2("destroy").select2({
                    dropdownParent: $("#Vendor-Assign-Employee-Package-Modal"),
                });
            }
            else {
                $("#ddlvendorpackage").html("");
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
