$(function () {
    $('#vendorbranchimage1').click(function (e) {
        $('#vendorbranchphoto1').click();
    });
    $('#vendorbranchphoto1').change(function () {
        fasterPreviewimage1(this);
    });

    $('#btnvendorbranchSave').unbind().click(function () {
        event.preventDefault();
        $('#btnvendorbranchSave').prop('disabled', true);
        if ($('#branchform').parsley().validate() !== true) {
            $('#btnvendorbranchSave').prop('disabled', false);
        }
        else {
            savebranchdetails();
        }
    });

    resetbranch();
    $('#btnvendorbranchClose,#btnvendorbranchReset').unbind().click(function () {
        resetbranch();
    });
    $('#btnvendorbranchUpdate').unbind().click(function () {
        event.preventDefault();
        $('#btnvendorbranchUpdate').prop('disabled', true);
        if ($('#branchform').parsley().validate() !== true) {
            $('#btnvendorbranchUpdate').prop('disabled', false);
        }
        else {
            updatebranchdetails();
        }
    });

});
    function fasterPreviewimage1(uploader) {
        if (uploader.files && uploader.files[0]) {
            $('#vendorbranchimage1').attr('src', window.URL.createObjectURL(uploader.files[0]));
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
function savebranchdetails() {

    var data = new FormData();
    data.append("Vendor_Id", GetURLParameter('vid'));
    //alert(GetURLParameter('vid'));
   data.append("Vendor_Branch_Photo", $("#vendorbranchphoto1").get(0).files[0]);
    data.append("Vendor_Branch_Name", $.trim($('#txtvendorbranchname').val()));
    data.append("Vendor_Branch_Details", $.trim($('#txtvendorbranchdetails').val()));
    data.append("Vendor_Branch_Address", $.trim($('#txtvendorbranchaddress').val()));
    data.append("Vendor_Branch_Email", $.trim($('#txtvendorbranchemail').val()));
    data.append("Vendor_Branch_Phone", $.trim($('#txtvendorbranchphone').val()));
    data.append("Vendor_Branch_Mobile", $.trim($('#txtvendorbranchmobile').val()));
    data.append("Vendor_Branch_Latitude", $.trim($('#txtvendorbranchlatitude').val()));
    data.append("Vendor_Branch_Longitude", $.trim($('#txtvendorbranchLongitude').val()));

   

    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Branch/SaveBranchDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                resetbranch();
                $('#Vendor-Branch-Modal').modal('hide');
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message);
                $('#btnvendorbranchSave').prop('disabled', false);
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                $('#btnvendorbranchSave').prop('disabled', false);
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

function resetbranch() {
    loadbranchdetails();
    $('#btnvendorbranchUpdate').prop('disabled', false);
    $('#btnvendorbranchSave').prop('disabled', false);
    $('#btnvendorbranchUpdate').hide();
    $('#btnvendorbranchSave').show();
    $('#branchform').parsley().reset();
    $('#branchform')[0].reset();
    $('#vendorbranchimage1').attr('src', "/assets/images/no-image-found-360x250.png");

}

function loadbranchdetails() {
    var data = new FormData();
    data.append("vendor_Id", GetURLParameter('vid'));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Branch/LoadBranchDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_vendorbranchlist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_vendorbranchlist').DataTable({
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
                                var image = row.Vendor_Branch_Photo;
                                return '<td><div class="sidebar-user"><div class="sidebar-user-picture"><img alt="image" src="' + image + '" width="50px" height="50px"></div></div></td>';
                            }
                        },
                        { data: 'Vendor_Branch_Name' },
                        { data: 'Vendor_Branch_Email' },
                        { data: 'Vendor_Branch_Phone' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                       var code = row.Vendor_Branch_Id;
                                        return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewbranchdetails(\'' + code + '\')" ><i class="feather icon-edit"></i></button></td>';
                            }
                         }
                    ]
                });
            }
            else {
                $('#tbl_vendorbranchlist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
function viewbranchdetails(code) {

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
            data.append("vendor_Branch_Id", code);
            //alert(code);
            data.append("vendor_Id", GetURLParameter('vid'));
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/Branch/LoadVendorBranchId",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        $('#btnvendorbranchUpdate').show();
                        $('#btnvendorbranchSave').hide();
                        $('#Vendor-Branch-Modal').modal('show');
                        $.each(response, function (i, vari) {
                            if (vari.vendor_Branch_Photo != "" && vari.vendor_Branch_Photo != null) {
                                $('#txtvendorbranchphoto1').val(vari.vendor_Branch_Photo);
                                $('#vendorbranchimage1').attr('src', vari.vendor_Branch_Photo);
                                $('#vendorbranchphoto1').prop('required', false);
                            }
                            else {
                                $('#vendorbranchphoto1').prop('required', true);
                            }
                            $('#txtvendorbranchname').val(vari.Vendor_Branch_Name);
                            $('#txtvendorbranchdetails').val(vari.Vendor_Branch_Details);
                            $('#txtvendorbranchaddress').val(vari.Vendor_Branch_Address);
                            $('#txtvendorbranchemail').val(vari.Vendor_Branch_Email);
                            $('#txtvendorbranchphone').val(vari.Vendor_Branch_Phone);
                            $('#txtvendorbranchmobile').val(vari.Vendor_Branch_Mobile);
                            $('#txtvendorbranchlatitude').val(vari.Vendor_Branch_Latitude);
                            $('#txtvendorbranchLongitude').val(vari.Vendor_Branch_Longitude);
                            
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

function updatebranchdetails() {
    var data = new FormData();
    data.append("Vendor_Id", GetURLParameter('vid'));
    //data.append("vendor_Branch_Id", '');
    data.append("Vendor_Branch_Photo", $("#vendorbranchphoto1").get(0).files[0]);
    data.append("Vendor_Branch_Name", $.trim($('#txtvendorbranchname').val()));
    data.append("Vendor_Branch_Details", $.trim($('#txtvendorbranchdetails').val()));
    data.append("Vendor_Branch_Address", $.trim($('#txtvendorbranchaddress').val()));
    data.append("Vendor_Branch_Email", $.trim($('#txtvendorbranchemail').val()));
    data.append("Vendor_Branch_Phone", $.trim($('#txtvendorbranchphone').val()));
    data.append("Vendor_Branch_Mobile", $.trim($('#txtvendorbranchmobile').val()));
    data.append("Vendor_Branch_Latitude", $.trim($('#txtvendorbranchlatitude').val()));
    data.append("Vendor_Branch_Longitude", $.trim($('#txtvendorbranchLongitude').val()));
   
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Branch/UpdateVendorBranchDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                resetbranch();
                $('#Vendor-Branch-Modal').modal('hide');
               // resetvendoremployee();
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message);
                $('#btnvendorbranchUpdate').prop('disabled', false);
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                $('#btnvendorbranchUpdate').prop('disabled', false);
            }
            else {
                var content = "Invalid";
                var title = "Invalid username or password.";
                ErrorAlert(title, content);
                //$("#txtvendornusername").val("");
                //$("#txtvendoremployeepassword").val("");
            }
        },
        error: function (response) {

        }
    });
}