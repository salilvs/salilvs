$(function () {
    loadVendorType();
    LoadCategory();
    loadvendorProductCategorydetails();
    loadSubCategorydetails();
    $('#vendorProductimage1').click(function (e) {
        $('#vendorProductphoto1').click();
    });
    $('#vendorProductphoto1').change(function () {
        fasterPreviewimage1(this);
    });

    function fasterPreviewimage1(uploader) {
        if (uploader.files && uploader.files[0]) {
            $('#vendorProductimage1').attr('src', window.URL.createObjectURL(uploader.files[0]));
        }
    }


    $('#vendorSubcatimage1').click(function (e) {
        $('#vendoreSubcatphoto1').click();
    });
    $('#vendoreSubcatphoto1').change(function () {
        fasterPreviewimage1(this);
    });

    function fasterPreviewimage1(uploader) {
        if (uploader.files && uploader.files[0]) {
            $('#vendorSubcatimage1').attr('src', window.URL.createObjectURL(uploader.files[0]));
        }
    }
    $('#vendorProductimage1').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
    $('#vendorSubcatimage1').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
    $('#btnproof1remove').unbind().click(function () {
        $('#proof1').show();
        $('#proof1').prop('required', true);
        $('#btnproof1download').hide();
        $('#btnproof1remove').hide();
    });
    $('#vendorcategoryform').parsley().reset();
    $('#vendorcategoryform')[0].reset();
    $('#btnvendorProductCategorySave').unbind().click(function () {
        event.preventDefault();
        //$('#btnvendorProductCategorySave').prop('disabled', false);
        //if ($('#ProductCategoryform').parsley().validate() !== true) {
        //    $('#btnvendorProductCategorySave').prop('disabled', false);
        //}
        //else {
        //    $('#btnvendorProductCategorySave').prop('disabled', true);
        //    saveProductcategorydetails();
        //}
        saveProductcategorydetails();
    });

    $('#btnProductSubCatSave').unbind().click(function () {
        event.preventDefault();
        //$('#btnvendorProductCategorySave').prop('disabled', false);
        //if ($('#ProductCategoryform').parsley().validate() !== true) {
        //    $('#btnvendorProductCategorySave').prop('disabled', false);
        //}
        //else {
        //    $('#btnvendorProductCategorySave').prop('disabled', true);
        //    saveProductcategorydetails();
        //}
        saveProductSubCatDetails();
    });
    $('#btnVendorCategoryUpdate').unbind().click(function () {
        event.preventDefault();
        //$('#btnVendorPackageUpdate').prop('disabled', false);
        //if ($('#vendorpackageform').parsley().validate() !== true) {
        //    $('#btnVendorPackageUpdate').prop('disabled', false);
        //}
        //else {
        //    $('#btnVendorPackageUpdate').prop('disabled', true);
        //    updatepackagedetailsdetails();
        //}
        updateCategorydetails();
    });
    $('#btnSubCategoryUpdate').unbind().click(function () {
        event.preventDefault();
        //$('#btnVendorPackageUpdate').prop('disabled', false);
        //if ($('#vendorpackageform').parsley().validate() !== true) {
        //    $('#btnVendorPackageUpdate').prop('disabled', false);
        //}
        //else {
        //    $('#btnVendorPackageUpdate').prop('disabled', true);
        //    updatepackagedetailsdetails();
        //}
        updateSubCatdetails();
    });
    $('#ddlvendortype').change(function () {
        loadvendorsubtype($('#ddlvendortype').val());
    });
});
function loadVendorType() {
    var data = new FormData();
    data.append("Vendor_uniqueid", '');
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorProduct/loadVendorType",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlvendortype").html("");
                $("#ddlvendortype").append('<option value="">Select Vendor Type</option>');
                $.each(dat, function (j, vari) {
                    $("#ddlvendortype").append("<option value='" + vari.Id + "'>" + vari.Vendor_type + "</option>");
                });
            }
            else {
                $("#ddlvendortype").html("");
                $("#ddlvendortype").append('<option value="">No Record Found</option>');
            }
        },
        error: function (response) {

        }
    });
}
function LoadCategory() {
    var data = new FormData();
    data.append("Vendor_uniqueid", '');
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorProduct/LoadCategory",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlcategory").html("");
                $("#ddlcategory").append('<option value="">Select Category</option>');
                $.each(dat, function (j, vari) {
                    $("#ddlcategory").append("<option value='" + vari.Id + "'>" + vari.ProductCategoryName + "</option>");
                });
            }
            else {
                $("#ddlcategory").html("");
                $("#ddlcategory").append('<option value="">No Record Found</option>');
            }
        },
        error: function (response) {

        }
    });
}
function loadvendorsubtype(vId, id) {
    var data = new FormData();
    data.append("Vendor_Sub_typeId", vId);
    data.append("Vendor_typeId", id);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorProduct/loadvendorsubtype",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlvendorsubtype").html("");
                //$("#ddlvendorsubtype").append('<option value="">Select Vendor Sub Type</option>');
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
function saveProductcategorydetails() {
    // alert($("#ddlvendorsubtype").val());
    var data = new FormData();
    //data.append("Vendor_Type_Id", GetURLParameter('vid'));
    data.append("ProductCategory__Photo", $("#packagephoto1").get(0).files[0]);
    data.append("ProductCategory_TypeId", $.trim($("#ddlvendortype").val()));
    data.append("ProductCategory_SubTypeId", $.trim($("#ddlvendorsubtype").val()));
    data.append("ProductCategory_Name", $.trim($('#txtProductName').val()));
    data.append("ProductCategory_Description", $.trim($('#txtProductDiscripation').val()));
    data.append("ProductCategory_Status", $.trim($('#ddlProductStatus').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorProduct/saveProductcategorydetails",
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
function saveProductSubCatDetails() {
    // alert($("#ddlvendorsubtype").val());
    var data = new FormData();
    //data.append("Vendor_Type_Id", GetURLParameter('vid'));
    data.append("ProductSubCategory__Photo", $("#vendoreSubcatphoto1").get(0).files[0]);
    data.append("ProductCategory_TypeId", $.trim($("#ddlcategory").val()));
    data.append("ProductSubCat_Name", $.trim($('#txtProductSubCatName').val()));
    data.append("ProductSubCat_Description", $.trim($('#txtProductSubCatDiscripation').val()));
    data.append("ProductSubCat_Status", $.trim($('#ddlProductSubCatStatus').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorProduct/saveProductSubCatdetails",
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
function loadvendorProductCategorydetails() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorProduct/LoadproductCategory",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_ProductCategorylist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_ProductCategorylist').DataTable({
                    data: dat,
                    autoWidth: true,
                    responsive: true,
                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 2;
                            }
                        },
                        //{
                        //    orderable: false,
                        //    render: function (data, type, row) {
                        //        var image = row.Vendor_Photo;
                        //        return '<td><div class="sidebar-user"><div class="sidebar-user-picture"><img alt="image" src="' + image + '" width="50px" height="50px"></div></div></td>';
                        //    }
                        //},
                        //{ data: 'Vendor_typeId' },
                        //{ data: 'Id' },
                        { data: 'ProductCategoryName' },
                        { data: 'ProductCategoryDescription' },
                        { data: 'ProductCategoryStatus' },
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

                                //if (row.Vendor_Status == "Active") {
                                //    if (row.Vendor_Login_Access == "Yes") {
                                //        var code = row.Id;
                                //        return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" data-vid=' + code + ' onclick="ProductCategoryViewdetailsss(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate Credentials" onclick="deactivatevendorcredentials(\'' + code + '\')" ><i class="simple-icon-logout"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="DeactivateVendor(\'' + code + '\')" ><i class="simple-icon-trash"></i></button></td>';
                                //    }
                                //    else {
                                //        var code = row.Vendor_uniqueid;
                                //        return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" data-vid=' + code + ' onclick="ProductCategoryViewdetailsss(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Activate Credentials" onclick="createvendorcredentials(\'' + code + '\')" ><i class="simple-icon-login"></i></button>  <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="DeactivateVendor(\'' + code + '\')" ><i class="simple-icon-trash"></i></button></td>';
                                //    }
                                //}
                                //else {
                                var code = row.Id;
                                return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" data-vid=' + code + ' onclick="ProductCategoryViewdetails(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button></td>';
                                //var code = row.Vendor_uniqueid;
                                //return '<td><button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Re Activate" onclick="reactivatevendor(\'' + code + '\')" ><i class="simple-icon-reload"></i></button></td>';
                                //}
                            }
                        }
                    ]
                });
            }
            else {
                $('#tbl_ProductCategorylist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
function ProductCategoryViewdetails(code) {

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
            data.append("Id", code);
            // data.append("Id", GetURLParameter('vid'));
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/VendorProduct/ProductCategoryView",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        $('#btnVendorPackageUpdate').show();
                        $('#btnVendorPackageSave').hide();
                        $('#Vendor-Category-Modal').modal('show');
                        $.each(response, function (i, vari) {
                            if (vari.Package_Photo != "" && vari.Package_Photo != null) {
                                $('#txtvendorProductphoto1').val(vari.ProductCategory__Photo);
                                $('#vendorProductimage1').attr('src', vari.ProductCategory__Photo);
                                $('#vendorProductphoto1').prop("required", false);
                            }
                            else {
                                $('#txtvendorProductphoto1').val("");
                                $('#vendorProductimage1').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
                                $('#vendorProductphoto1').prop("required", true);
                            }
                            $('#ddlvendortype').val(vari.Vendor_typeId);
                            loadvendorsubtype(vari.Vendor_typeId, vari.Vendor_Sub_typeId);
                            // loadVendorType()(vari.Vendor_typeId, vari.Vendor_Sub_typeId);
                            //loadservicesbymaincategory(vari.Package_Main_Category_Id, vari.Package_Main_Service_Id);
                            // loadsubservicebyservice(vari.Package_Main_Category_Id, vari.Package_Main_Service_Id, vari.Package_Sub_Service_Id);

                            $('#ddlvendorsubtype').val(vari.Vendor_Sub_typeId);
                            $('#txtProductName').val(vari.ProductCategoryName);
                            //$('input:radio[name=homeservice]').filter('[value="' + vari.Package_Home_Service + '"]').attr('checked', true);
                            $('#txtProductDiscripation').val(vari.ProductCategoryDescription);
                            $('#ddlProductStatus').val(vari.ProductCategoryStatus);
                            $.each(vari.rejp, function (i, varis) {
                                console.log(varis.Rejected_reason);
                                $('#reasonSection').append(
                                    '<label>Rejected Reason</label>' +
                                    '<div class="row">' +
                                    '<div class="col-6"><input class="form-control" value="' + varis.Rejected_reason + '" ></div><div class="col-6"><input class="form-control" value="' + varis.Created_date + '" ></div><br/>' +
                                    '</div>'
                                );
                            });
                            //if (null != vari.Package_Available_Days) {
                            //    var selectedValues = vari.Package_Available_Days.split(',');
                            //    $.each($("input[name='chkpackageAvailableDay']:checked"), function () {
                            //        $("input[name='chkpackageAvailableDay']:checked").prop('checked', false);
                            //    });
                            //    $.each(selectedValues, function (i, result) {
                            //        $("input[name='chkpackageAvailableDay'][value='" + selectedValues[i] + "']").prop('checked', true);
                            //    });
                            //}
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
function loadSubCategorydetails() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorProduct/LoadSubCategory",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_ProductSubCategorylist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_ProductSubCategorylist').DataTable({
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
                        //{ data: 'Vendor_typeId' },
                        //{ data: 'Id' },
                        { data: 'ProductSubCategoryName' },
                        { data: 'ProductSubCategoryDescription' },
                        { data: 'ProductSubCategoryStatus' },
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

                                //if (row.Vendor_Status == "Active") {
                                //    if (row.Vendor_Login_Access == "Yes") {
                                //        alert("hi");
                                //        var code = row.Id;
                                //        return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" data-vid=' + code + ' onclick="viewvendordetails(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate Credentials" onclick="deactivatevendorcredentials(\'' + code + '\')" ><i class="simple-icon-logout"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="DeactivateVendor(\'' + code + '\')" ><i class="simple-icon-trash"></i></button></td>';
                                //    }
                                //    else {
                                //        var code = row.Vendor_uniqueid;
                                //        return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" data-vid=' + code + ' onclick="viewvendordetails(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Activate Credentials" onclick="createvendorcredentials(\'' + code + '\')" ><i class="simple-icon-login"></i></button>  <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="DeactivateVendor(\'' + code + '\')" ><i class="simple-icon-trash"></i></button></td>';
                                //    }
                                // }
                                //else {
                                var code = row.Id;
                                return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" data-vid=' + code + ' onclick="ProductSubCategoryViewdetails(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button></td>';
                                //var code = row.Vendor_uniqueid;
                                //return '<td><button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Re Activate" onclick="reactivatevendor(\'' + code + '\')" ><i class="simple-icon-reload"></i></button></td>';
                                // }
                            }
                        }
                    ]
                });
            }
            else {
                $('#tbl_ProductSubCategorylist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
function ProductSubCategoryViewdetails(code) {

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
            data.append("Id", code);
            //data.append("Package_Vendor_Id", GetURLParameter('vid'));
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/VendorProduct/ProductSubCategoryView",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        $('#btnVendorPackageUpdate').show();
                        $('#btnVendorPackageSave').hide();
                        $('#Vendor-SubCategory-Modal').modal('show');
                        $.each(response, function (i, vari) {
                            if (vari.Package_Photo != "" && vari.Package_Photo != null) {
                                $('#txtvendorSubcatphoto1').val(vari.ProductCategory__Photo);
                                $('#vendorSubcatimage1').attr('src', vari.ProductCategory__Photo);
                                $('#vendoreSubcatphoto1').prop("required", false);
                            }
                            else {
                                $('#txtvendorSubcatphoto1').val("");
                                $('#vendorSubcatimage1').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
                                $('#vendoreSubcatphoto1').prop("required", true);
                            }
                            $('#ddlcategory').val(vari.ProductCategoryId);
                            //loadvendorsubtype(vari.Vendor_typeId, vari.Vendor_Sub_typeId);
                            // loadVendorType()(vari.Vendor_typeId, vari.Vendor_Sub_typeId);
                            //loadservicesbymaincategory(vari.Package_Main_Category_Id, vari.Package_Main_Service_Id);
                            // loadsubservicebyservice(vari.Package_Main_Category_Id, vari.Package_Main_Service_Id, vari.Package_Sub_Service_Id);

                            //$('#ddlvendorsubtype').val(vari.Vendor_Sub_typeId);
                            $('#txtProductSubCatName').val(vari.ProductSubCategoryName);
                            //$('input:radio[name=homeservice]').filter('[value="' + vari.Package_Home_Service + '"]').attr('checked', true);
                            $('#txtProductSubCatDiscripation').val(vari.ProductSubCategoryDescription);
                            $('#ddlProductSubCatStatus').val(vari.ProductSubCategoryStatus);
                            $.each(vari.rejp, function (i, varis) {
                                console.log(varis.Rejected_reason);
                                $('#reasonSection').append(
                                    '<label>Rejected Reason</label>' +
                                    '<div class="row">' +
                                    '<div class="col-6"><input class="form-control" value="' + varis.Rejected_reason + '" ></div><div class="col-6"><input class="form-control" value="' + varis.Created_date + '" ></div><br/>' +
                                    '</div>'
                                );
                            });
                            //if (null != vari.Package_Available_Days) {
                            //    var selectedValues = vari.Package_Available_Days.split(',');
                            //    $.each($("input[name='chkpackageAvailableDay']:checked"), function () {
                            //        $("input[name='chkpackageAvailableDay']:checked").prop('checked', false);
                            //    });
                            //    $.each(selectedValues, function (i, result) {
                            //        $("input[name='chkpackageAvailableDay'][value='" + selectedValues[i] + "']").prop('checked', true);
                            //    });
                            //}
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
function updateCategorydetails() {
    var data = new FormData();
    // data.append("Id", GetURLParameter('vid'));
    // data.append("Package_Photo", $("#packagephoto1").get(0).files[0]);
    // data.append("Package_Photo_Check", $.trim($('#txtpackagephoto1').val()));
    //data.append("vid",'code')
    data.append("ProductCategory_TypeId", $.trim($('#ddlvendortype').val()));
    data.append("ProductCategory_SubTypeId", $.trim($('#ddlvendorsubtype').val()));
    data.append("ProductCategory_Name", $.trim($('#txtProductName').val()));
    data.append("ProductCategory_Description", $.trim($('#txtProductDiscripation').val()));
    data.append("ProductCategory_Status", $.trim($('#ddlProductStatus').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorProduct/UpdateCategoryDetails",
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
function updateSubCatdetails() {
    var data = new FormData();
    //data.append("Package_Vendor_Id", GetURLParameter('vid'));
    // data.append("Package_Photo", $("#packagephoto1").get(0).files[0]);
    // data.append("Package_Photo_Check", $.trim($('#txtpackagephoto1').val()));
    data.append("ProductCategory_TypeId", $.trim($('#ddlcategory').val()));
    data.append("ProductSubCat_Name", $.trim($('#txtProductSubCatName').val()));
    data.append("ProductSubCat_Description", $.trim($('#txtProductSubCatDiscripation').val()));
    data.append("ProductSubCat_Status", $.trim($('#ddlProductSubCatStatus').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorProduct/UpdateSubcatDetails",
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