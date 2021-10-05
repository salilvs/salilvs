$(function () {
    loadvendor();
    $(function () {
        $('#ddlvendor').select2();
    });
    loadCategory1();
    $('#ddlvendor').change(function () {
        var value = $.trim($('#ddlvendor').val())
        //loadproductdetails(value);
        loadVendorproductCategory(value)
        //loadCategory11(value);
        
    });

    $('#ddlprcatId1').change(function () {
        var value = $.trim($('#ddlvendor').val())
        var CatId = $.trim($('#ddlprcatId1').val());
        loadSubCategory(value, CatId);
    });
   
    //$("#ddlprcatId1").select2({
    //    placeholder: "Select Product Category",
    //   // dropdownParent: $("#Vendor-Main-Category-Modal"),
    //});
    //$("#ddlprcatId1").val("").trigger("change");

    $("#ddlprSubcatId1").select2({
        placeholder: "Select Product SubCategory",
        // dropdownParent: $("#Vendor-Main-Category-Modal"),
    });
    $("#ddlprSubcatId1").val("").trigger("change");


    $('#ddlprSubcatId1').change(function () {
        var value = $.trim($('#ddlvendor').val())
        var CatId = $.trim($('#ddlprcatId1').val());
        var SubCatId = $.trim($('#ddlprSubcatId1').val());
        loadProduct(value, CatId, SubCatId);
    });

    $("#ddlproduct").select2({
        placeholder: "Select Product",
        // dropdownParent: $("#Vendor-Main-Category-Modal"),
    });
    $("#ddlproduct").val("").trigger("change");


    //$('#btnAddProductList').unbind().click(function () {
    //        //saveproductdetails();
    //    if ($("#ddlprSubcatId1").val() == "")
    //    {
    //        saveproductdetailsCat();
    //    }
    //    else
    //    {
    //        //var SubcatId = $("#ddlprSubcatId1").val();
    //        saveproductdetailsSubCat();
    //    }
    //});
    $('#btnAddProductList').unbind().click(function () {
        if ($("#ddlprSubcatId1").val() == "") {
            saveproductdetailsCat();
        }
        else {
            //var SubcatId = $("#ddlprSubcatId1").val();
            if ($("#ddlproduct").val() == "") {
                saveproductdetailsSubCat();
            }
            else
            {
                saveproductdetailsitem();
            }
        }
    });
});
function loadVendorproductCategory(value) {
    var data = new FormData();
    data.append("Vendor_Id", value);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Product/LoadVendorProductCategoryList",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_productCategorylist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_productCategorylist').DataTable({
                    data: dat,
                    autoWidth: true,
                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                       
                        { data: 'ProductCategoryName' },
                       
                        //{
                        //    orderable: false,
                        //    render: function (data, type, row) {
                        //        var code = row.Id;
                        //        //return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewproductdetails(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button>  ';
                        //    }
                        //}
                    ]
                });
            }
            else {
                var table =$('#tbl_productCategorylist').DataTable();
                table.clear().draw();
                table.destroy();
            }
        },
        error: function (response) {

        }
    });
}

function loadCategory1() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Product/loadProductCategory",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlprcatId1").html("");
                $("#ddlprcatId1").append('<option value="All">All</option>');
                $.each(dat, function (j, vari) {
                    $("#ddlprcatId1").append("<option value='" + vari.Id + "'>" + vari.ProductCategoryName + "</option>");
                });
            }
            else {
                $("#ddlprcatId1").html("");
                $("#ddlprcatId1").append('<option value="">No Record Found</option>');
            }
        },
        error: function (response) {

        }
    });
}
function loadCategory11(value) {
    var data = new FormData();
    data.append("Vendor_Id", value);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Product/loadProductCategory_Vendor",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlprcatId1").html("");
               // $("#ddlprcatId1").append('<option value="All">All</option>');
                $.each(dat, function (j, vari) {
                    $("#ddlprcatId1").append("<option value='" + vari.Id + "'>" + vari.ProductCategoryName + "</option>");
                });
            }
            else {
                $("#ddlprcatId1").html("");
                $("#ddlprcatId1").append('<option value="">No Record Found</option>');
            }
        },
        error: function (response) {

            $("#ddlprcatId1").html("");
        }
    });
}

function loadSubCategory(value, CatId) {
    var data = new FormData();
    data.append("Vendor_Id", '');
    data.append("CatId", CatId);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Product/loadProductSubCategory_Vendor",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlprSubcatId1").html("");
                // $("#ddlprcatId1").append('<option value="All">All</option>');
                $.each(dat, function (j, vari) {
                    $("#ddlprSubcatId1").append("<option value='" + vari.Id + "'>" + vari.ProductSubCategoryName + "</option>");
                });
            }
            else {
                $("#ddlprSubcatId1").html("");
                $("#ddlprcatId1").append('<option value="">No Record Found</option>');
            }
        },
        error: function (response) {

        }
    });
}


function loadProduct(value, CatId, SubCatId) {
    var data = new FormData();
    data.append("Vendor_Id", '');
    data.append("CatId", CatId);
    data.append("SubCatId", SubCatId);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Product/loadProduct_Vendor",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlproduct").html("");
                // $("#ddlprcatId1").append('<option value="All">All</option>');
                $.each(dat, function (j, vari) {
                    $("#ddlproduct").append("<option value='" + vari.ItemCode + "'>" + vari.ProductName + "</option>");
                });
            }
            else {
                $("#ddlproduct").html("");
                $("#ddlproduct").append('<option value="">No Record Found</option>');
            }
        },
        error: function (response) {

        }
    });
}

function loadproductdetails(value) {
    var data = new FormData();
    data.append("Vendor_Id", value);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Product/LoadVendorProducts",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
           // alert(JSON.stringify(response));
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_productlist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_productlist').DataTable({
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
                                var image = row.ProductDefaultImageUrl;
                                return '<td><div class="sidebar-user"><div class="sidebar-user-picture"><img alt="image" src="' + image + '" width="50px" height="50px"></div></div></td>';
                            }
                        },
                        { data: 'ProductName' },
                        { data: 'ProductQty' },
                        { data: 'ProductPrice' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var stat = row.ProductStatus;
                                if (stat == "Active") {
                                    return '<span class="badge badge-pill badge-success">' + stat + '</span>';
                                }
                                else { return '<span class="badge badge-pill badge-danger">' + stat + '</span>'; }
                            }
                        },
                        //{
                        //    orderable: false,
                        //    render: function (data, type, row) {
                        //        var code = row.Id;
                        //        return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewproductdetails(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button>  ';
                        //    }
                        //}
                    ]
                });
            }
            else {
                $('#tbl_productlist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
function saveproductdetails() {
    var data = new FormData();
    var v_Id = $('#ddlvendor').val();
    data.append("Vendor_Id", $.trim($('#ddlvendor').val()));

    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Product/SaveVendorProductDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                //SaveOfferpriceDetails();
                loadproductdetails(v_Id);
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message);
                $('#btnSbtnAddProductListave').prop('disabled', false);
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                $('#btnAddProductList').prop('disabled', false);
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

function saveproductdetailsCat() {
    var data = new FormData();
    var v_Id = $('#ddlvendor').val();
    data.append("Vendor_Id", $.trim($('#ddlvendor').val()));
    data.append("Product_CatId", $.trim($('#ddlprcatId1').val()));

    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Product/SaveVendorProductDetailsCat",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                //SaveOfferpriceDetails();
                //loadproductdetails(v_Id);
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message);
                $('#btnSbtnAddProductListave').prop('disabled', false);
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                $('#btnAddProductList').prop('disabled', false);
            }
            else {
                var content = "Vendor Product already exists";
                var title = "Already Exists";
                ErrorAlert(title, content);
            }
        },
        error: function (response) {

        }
    });
}

function saveproductdetailsSubCat() {
    var data = new FormData();
    var v_Id = $('#ddlvendor').val();
    data.append("Vendor_Id", $.trim($('#ddlvendor').val()));
    data.append("Product_CatId", $.trim($('#ddlprcatId1').val()));
    data.append("Product_SubCatId", $.trim($('#ddlprSubcatId1').val()));

    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Product/SaveVendorProductDetailsSubCat",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                //SaveOfferpriceDetails();
                //loadproductdetails(v_Id);
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message);
                $('#btnSbtnAddProductListave').prop('disabled', false);
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                $('#btnAddProductList').prop('disabled', false);
            }
            else {
                //var content = "Invalid";
                //var title = "Invalid username or password.";
                //ErrorAlert(title, content);
            }
        },
        error: function (response) {

        }
    });
}


function saveproductdetailsitem() {
    var data = new FormData();
    var v_Id = $('#ddlvendor').val();
    data.append("Vendor_Id", $.trim($('#ddlvendor').val()));
    data.append("Product_CatId", $.trim($('#ddlprcatId1').val()));
    data.append("Product_SubCatId", $.trim($('#ddlprSubcatId1').val()));
    data.append("Product_Items", $.trim($('#ddlproduct').val()));

    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Product/SaveVendorProductDetailsItem",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                //SaveOfferpriceDetails();
                //loadproductdetails(v_Id);
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message);
                $('#btnSbtnAddProductListave').prop('disabled', false);
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                $('#btnAddProductList').prop('disabled', false);
            }
            else {
                //var content = "Invalid";
                //var title = "Invalid username or password.";
                //ErrorAlert(title, content);
            }
        },
        error: function (response) {

        }
    });
}


function SaveOfferpriceDetails() {
    var data = new FormData();
    var v_Id = $('#ddlvendor').val();
    data.append("Vendor_Id", $.trim($('#ddlvendor').val()));

    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Product/SaveVendorOfferpricetDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                SaveOfferpriceDetails();
                loadproductdetails(v_Id);
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message);
                $('#btnSbtnAddProductListave').prop('disabled', false);
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                $('#btnAddProductList').prop('disabled', false);
            }
            else {
                //var content = "Invalid";
                //var title = "Invalid username or password.";
                //ErrorAlert(title, content);
            }
        },
        error: function (response) {

        }
    });
}
function loadvendor() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorCreation/LoadVendor1",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {

                $.each(response, function (i, vari) {

                    $("#ddlvendor").append('<option value="' + vari.vendor_uniqueid + '">' + vari.vendor_Name + '</option>');
                });
            }
            else {

            }
        },
        error: function (response) {

        }
    });
}