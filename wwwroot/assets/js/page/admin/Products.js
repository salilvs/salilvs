$(function () {

    //$('#btnVendorCategoryUpdate').hide();
    $('#btnVendorProductCategoryUpdate').hide();


    //loadvendorProductCategorydetails();

    imageProductCategory();
    imageSubCategory();

    $('#vendorProductimage1').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
    $('#vendorSubcatimage1').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
    $('#btnproof1remove').unbind().click(function () {
        $('#proof1').show();
        $('#proof1').prop('required', true);
        $('#btnproof1download').hide();
        $('#btnproof1remove').hide();
    });
    //$('#vendorcategoryform').parsley().reset();
    //$('#vendorcategoryform')[0].reset();
    $('#btnvendorProductCategorySave').unbind().click(function () {
        event.preventDefault();
        $('#btnvendorProductCategorySave').prop('disabled', false);
        if ($('#vendorcategoryform').parsley().validate() !== true) {
            $('#btnvendorProductCategorySave').prop('disabled', false);
        }
        else {
            $('#btnvendorProductCategorySave').prop('disabled', true);
            saveProductcategorydetails();
        }
        //saveProductcategorydetails();
    });

    $('#btnProductSubCatSave').unbind().click(function () {
        event.preventDefault();
        $('#btnProductSubCatSave').prop('disabled', false);
        if ($('#ProductSubCategoryform').parsley().validate() !== true) {
            $('#btnProductSubCatSave').prop('disabled', false);
        }
        else {
            $('#btnProductSubCatSave').prop('disabled', true);
            saveProductSubCatDetails();
        }
        //saveProductSubCatDetails();
    });
   // $('#btnVendorCategoryUpdate').unbind().click(function () {

    $('#btnVendorProductCategoryUpdate').unbind().click(function () {
        event.preventDefault();
       
        updateCategorydetails();
    });
    $('#btnSubCategoryUpdate').unbind().click(function () {
       event.preventDefault();
        $('#btnSubCategoryUpdate').prop('disabled', true);
        if ($('#ProductSubCategoryform').parsley().validate() !== true) {
            $('#btnSubCategoryUpdate').prop('disabled', false);
        }
        else {
            updateSubCatdetails();
            $('#vendorSubcatimage1').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
            $('#ProductSubCategoryform').parsley().reset();
            $('#ProductSubCategoryform')[0].reset();
        }
        
    });
    $('#btnVendorProductCategoryReset,#btnproductcategoryClose').unbind().click(function () {
        resetproductCateory();
    });
    $('#btnVendorSubcategoryeReset,#btnSubCategoryClose').unbind().click(function () {
        resetproductSubCateory();
    });
    //$('#ddlvendortype').change(function () {
    //    loadvendorsubtype($('#ddlvendortype').val());
    //});
    $('#ddlvendortype').val(2);
    loadvendorsubtype($('#ddlvendortype').val());
    resetproductCateory();
    resetproductSubCateory();
});
function resetproductCateory() {
    //console.log("loaded");
    loadVendorType();
    LoadCategory();
    loadvendorProductCategorydetails();
    $('#btnSubCategoryUpdate').prop('disabled', false);
    $('#btnvendorProductCategorySave').prop('disabled', false);

    $('#btnvendorProductCategorySave').show();
    $('#btnSubCategoryUpdate').hide();
    $('#vendorcategoryform').parsley().reset();
    $('#vendorcategoryform')[0].reset();
    $('#productimage').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
}
function resetproductSubCateory() {
    loadSubCategorydetails();

    
    $('#ProductSubCategoryform').parsley().reset();
    $('#ProductSubCategoryform')[0].reset();
    //$('#btnVendorCategoryUpdate').prop('disabled', false);
    //$('#btnProductSubCatSave').prop('disabled', false);
    //$('#btnVendorCategoryUpdate').hide();
    //$('#btnProductSubCatSave').show();
    $('#btnSubCategoryUpdate').prop('disabled', false);
    $('#btnProductSubCatSave').prop('disabled', false);
    $('#btnSubCategoryUpdate').hide();
    $('#btnProductSubCatSave').show();
    $('#vendorSubcatimage1').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
    ////$('#btnSubCategoryUpdate').hide()
    //$('#ProductSubCategoryform').parsley().reset();
    //$('#ProductSubCategoryform')[0].reset();
}
function loadVendorType() {
    var data = new FormData();
    data.append("Vendor_uniqueid", '');
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/BookitProduct/loadVendorType",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlvendortype").html("");
                //$("#ddlvendortype").append('<option value="">Select Vendor Type</option>');
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
        url: "/BookitProduct/LoadCategory",
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
        url: "/BookitProduct/loadvendorsubtype",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlvendorsubtype").html("");
                // $("#ddlvendorsubtype").append('<option value="">Select Vendor Sub Type</option>');
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

    var data = new FormData();
    //data.append("Vendor_Type_Id", GetURLParameter('vid'));
     data.append("ProductCategory__Photo", $("#vendorProductphoto1").get(0).files[0]);
    data.append("ProductCategory_TypeId", $.trim($("#ddlvendortype").val()));
    data.append("ProductCategory_SubTypeId", $.trim($("#ddlvendorsubtype").val()));
    data.append("ProductCategory_Name", $.trim($('#txtProductName').val()));
    data.append("ProductCategory_Description", $.trim($('#txtProductDiscripation').val()));
    data.append("ProductCategory_Status", $.trim($('#ddlProductStatus1').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/BookitProduct/saveProductcategorydetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                //resetpackagedetails();
                resetproductCateory();
                $('#Vendor-Category-Modal').modal('hide');
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
        url: "/BookitProduct/saveProductSubCatdetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                //resetpackagedetails();
                resetproductSubCateory();
                $('#Vendor-SubCategory-Modal').modal('hide');
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
        //url: "/VendorProduct/LoadproductCategory",
        url: "/BookitProduct/LoadproductCategory",
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
                        
                        { data: 'ProductCategoryName' },
                        { data: 'ProductCategoryDescription' },
                        { data: 'ProductCategoryStatus' },
                    
                        {
                            orderable: false,
                            render: function (data, type, row) {

                                var code = row.Id;
                                return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" data-vid=' + code + ' onclick="ProductCategoryViewdetails(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button></td>';
                               
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
                //url: "/VendorProduct/ProductCategoryView",
                url: "/BookitProduct/ProductCategoryView",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        $('#btnVendorProductCategoryUpdate').show();
                        $('#btnvendorProductCategorySave').hide();
                        $('#Vendor-Category-Modal').modal('show');
                        $.each(response, function (i, vari) {
                            if (vari.ProductCategoryDefaultImageUrl != "" && vari.ProductCategoryDefaultImageUrl != null) {
                                $('#txtvendorProductphoto1').val(vari.ProductCategoryDefaultImageUrl);
                                $('#vendorProductimage1').attr('src', vari.ProductCategoryDefaultImageUrl);
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
                            $('#ddlProductStatus1').val(vari.ProductCategoryStatus);
                            //$.each(vari.rejp, function (i, varis) {
                            //    console.log(varis.Rejected_reason);
                            //    $('#reasonSection').append(
                            //        '<label>Rejected Reason</label>' +
                            //        '<div class="row">' +
                            //        '<div class="col-6"><input class="form-control" value="' + varis.Rejected_reason + '" ></div><div class="col-6"><input class="form-control" value="' + varis.Created_date + '" ></div><br/>' +
                            //        '</div>'
                            //    );
                            //});
                         
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
        //url: "/VendorProduct/LoadSubCategory",
       url: "/BookitProduct/LoadSubCategory",
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
                      
                        { data: 'ProductSubCategoryName' },
                        { data: 'ProductSubCategoryDescription' },
                        { data: 'ProductCategoryName' },
                        { data: 'ProductSubCategoryStatus' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var code = row.Id;
                                return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" data-vid=' + code + ' onclick="ProductSubCategoryViewdetails(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button></td>';

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
                //url: "/VendorProduct/ProductSubCategoryView",
                url: "/BookitProduct/ProductSubCategoryView",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        $('#btnSubCategoryUpdate').show();
                        $('#btnProductSubCatSave').hide();
                        $('#Vendor-SubCategory-Modal').modal('show');
                        $.each(response, function (i, vari) {
                            if (vari.ProductSubCategoryDefaultImageUrl != "" && vari.ProductSubCategoryDefaultImageUrl != null) {
                                $('#txtvendorSubcatphoto1').val(vari.ProductSubCategoryDefaultImageUrl);
                                $('#vendorSubcatimage1').attr('src', vari.ProductSubCategoryDefaultImageUrl);
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

    data.append("Category_Photo", $("#vendorProductphoto1").get(0).files[0]);
   // data.append("Category_Photo_Check", $.trim($('#vendorProductphoto1').val()));
    //data.append("vid",'code')
    data.append("ProductCategory_TypeId", $.trim($('#ddlvendortype').val()));
    data.append("ProductCategory_SubTypeId", $.trim($('#ddlvendorsubtype').val()));
    data.append("ProductCategory_Name", $.trim($('#txtProductName').val()));
    data.append("ProductCategory_Description", $.trim($('#txtProductDiscripation').val()));
    data.append("ProductCategory_Status", $.trim($('#ddlProductStatus1').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        //url: "/VendorProduct/UpdateCategoryDetails",
        url: "/BookitProduct/UpdateCategoryDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                resetproductCateory();
                $('#Vendor-Category-Modal').modal('hide');
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
    data.append("Subcat_Photo", $("#vendoreSubcatphoto1").get(0).files[0]);
   // data.append("Subcat_Photo_Check", $.trim($('#vendoreSubcatphoto1').val()));
    data.append("ProductCategory_TypeId", $.trim($('#ddlcategory').val()));
    data.append("ProductSubCat_Name", $.trim($('#txtProductSubCatName').val()));
    data.append("ProductSubCat_Description", $.trim($('#txtProductSubCatDiscripation').val()));
    data.append("ProductSubCat_Status", $.trim($('#ddlProductSubCatStatus').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        //url: "/VendorProduct/UpdateSubcatDetails",
        url: "/BookitProduct/UpdateSubcatDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                $('#Vendor-SubCategory-Modal').modal('hide');
                //resetproductSubCateory();
                
                
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message);
                //('#btnVendorPackageUpdate').prop('disabled', false);
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                //$('#btnVendorPackageUpdate').prop('disabled', false);
            }
            else {
                var content = "Invalid";
                var title = "Error.";
                ErrorAlert(title, content);
                //$('#btnVendorPackageUpdate').prop('disabled', false);
            }
        },
        error: function (response) {

        }
    });
}
function imageProductCategory() {
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
}
function imageSubCategory() {
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
}
