$(function () {
    loadproductdetails();
    resetproduct();
    loadPrdUOM();
    loadPrdUnit();
    loadCategory1();
    loadCategory();
  
    $('#avilable_Id').hide();
    //$('#qty_Av_Id').hide();
    //$('#dvitemcode').hide();
    $('#lblitemcode').hide();
 
    
    
  //  $("#dvavilableTable tr").remove();
    $('#ddlprcatId').change(function () {
        var value = $.trim($('#ddlprcatId').val())
        loadSubCategory(value);

        $('#prData').hide();
        $('#prDataTable tbody').html('');
        loadproductData(value);
    });
  
    $('#ddlprcatId1').change(function () {
        var value = $.trim($('#ddlprcatId1').val())
        loadSubCategory1(value);
        var catId = $('#ddlprcatId1').val();
        loadproductdetails_cat(value);
    });

    $('#ddlprsubcatId1').change(function () {
        var value = $.trim($('#ddlprcatId1').val())
        var value1 = $.trim($('#ddlprsubcatId1').val())

        loadproductdetails_cat_subcat(value,value1);
    });
    //$('#prData').hide();
    //$('#prDataTable tbody').html('');
    //loadproductData();

    $(document).ready(function () {
        $("#txtname").on("keyup", function () {
            $('#prData').show();
            var value = $(this).val().toLowerCase();
            $("#prDataTable tr").filter(function () {
               $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                //$(this).toggle($(this).text());
            });
        });
    });
    $(document).ready(function () {
        $("#txtname").on("focusout", function () {
            $('#prData').hide();
            //$('#prDataTable tbody').html('');
        });
    });

    //$(document).ready(function () {
    //    $("#txtdescription").on("keyup", function () {
    //        $('#prData').hide();
    //       // $('#prDataTable tbody').html('');
    //    });
    //});
   
    //$(function () {
    //    $('#txtname').select2();
    //});
    //$('#txtname').change(function () {
    //    var value = $.trim($('#txtname').val());
    //    alert(value);
    //    //loadproductdetails(value);
    //    //loadproduct_check(value)
    //    //loadCategory11(value);

    //});



    //$(document).ready(function () {
    //    $("#txtname").on("keyup", function () {
    //        var value = $(this).val();
    //        alert(value);
    //        $("#prDataTable tr").filter(function () {
    //            //$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    //            $(this).toggle(value);
    //        });
    //    });
    //});



    $('#image1').unbind().click(function (e) {
        $('#photo1').click();
    });
    $('#photo1').change(function () {
        fasterPreviewimage1(this);
    });
    //$('#btnAdd').click(function () {
    //    var xx = $('#txtunitwt1').val();
    //    var yy = $('#ddluom option:Selected').text();
    //    var yy1 = $('#ddluom').val();
    //    var tableData = $('#dvavilableTable');
    //    tableData.append($('<tr></tr>')
    //        .append($('<td></td>')
    //            .append(xx))
    //        .append($('<td></td>')
    //            .append(yy).append($('<input>')
    //                .attr({
    //                    value: yy1, type: 'hidden', name: 'unit_id', id: 'unit_id'
    //                })))
    //         .append($('<td></td>')
    //             .append($('<input>')
    //                 .attr({
    //                     class: "form-control", type: 'text', name: 'txtOfferPr', id: 'txtOfferPr'
    //                 })))
    //        .append($('<td></td>')
    //            .append($('<input>')
    //                .attr({
    //                    onClick:"$(this).closest('tr').remove();", type: 'button', name: 'btnDelete', id: 'btnDelete'
    //                })))
    //    );
    //    var offerpr = $('#txtOfferPr').val();
    //    var itco = $('#txtitemcode').val();
    //   // SaveProductOfferPrices(itco, xx, yy1, offerpr);
    //    $('#txtunitwt1').val('');
    //    $('#txtunwt').val('');
    //    //$('#dvavilable').html(table);
    //});

    $('#btnSave').unbind().click(function () {
        event.preventDefault();
        $('#btnSave').prop('disabled', true);
        if ($('#productform').parsley().validate() !== true) {
            $('#btnSave').prop('disabled', false);
        }
        else {
            saveproductdetails();
        }
    });
    $('#btnUpdate').unbind().click(function () {
        //$('#btnUpdate').prop('disabled', false);
        if ($('#productform').parsley().validate() !== true) {
            //$('#btnUpdate').prop('disabled', false);
        }
        else {
            //$('#btnUpdate').prop('disabled', true);
            var itco = $('#txtitemcode').val();
            updateproductdetails(itco);
            //alert(itco);
            //$("#dvavilableTable tbody tr").each(function () {
            //    var row = $(this);
            //    var available_qty = row.find("td").eq(0).html();
            //    var unit_weight = row.find("td").eq(1).find('input').val();
            //    var offer_price = row.find("td").eq(2).find('input').val();
            //    SaveProductOfferPrices(itco, available_qty, unit_weight, offer_price);
            //});
        }
    });
    $('#btnClose,#btnReset').unbind().click(function () {
        resetproduct();
        $("#dvavilableTable tbody tr").remove();
    });
    
    //$('#ddlprcatId1').change(function () {
    //    var catId = $('#ddlprcatId1').val();
    //    alert(catId);
       
    //});
    //$('#ddlProductStatus').value('Active');
    //$('#ddlProductAvilable').value('Available');
});


function loadproductData(value) {
    var data = new FormData();
    data.append("Id", value);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Product/loadproductData",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var tableData = $('#prDataTable');
            var dat = response;
            if (dat.length > 0) {
                $.each(dat, function (i, vari) {
                  //  alert(vari.ProductName);
                   // $("#ddlunitmeasure").append("<option value='" + vari.Id + "'>" + vari.UnitOfMeasurement + "</option>");
                    tableData.append($('<tr></tr>').append($('<td></td>').append(vari.ProductName)).append($('<td></td>')));
                });
            }
            else {
                //$("#ddlunitmeasure").html("");
                //$("#ddlunitmeasure").append('<option value="">No Record Found</option>');
            }
        },
        error: function (response) {

        }
    });
}
function SaveProductOfferPrices(itco, available_qty, unit_weight, offer_price) {
    var data = new FormData();
    data.append("Item_code", itco);
    data.append("xx", available_qty);
    data.append("yy", unit_weight);
    data.append("offerpr", offer_price);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Product/SaveProductOfferPrice",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                //$('#VendorCompany-Modal').modal('hide');
                //resetproduct() 
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message);
                $('#btnUpdate').prop('disabled', false);
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                $('#btnUpdate').prop('disabled', false);
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

function resetproduct() {
    //loadproductdetails();
    //$('#btnUpdate').prop('disabled', false);
    $('#btnSave').prop('disabled', false);
    //$('#btnUpdate').hide();
    $('#btnSave').show();
    $('#productform').parsley().reset();
    $('#productform')[0].reset();
    //$('#productimage').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
   // $('#image1').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
    
    // $('#vendorProductimage1').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
    
}

function loadproductdetails() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Product/LoadProducts",
        dataType: "json",
        success: function (response) {
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
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var code = row.Id;
                                var code_1 = row.ItemCode
                                        //return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewproductdetails(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button>  ';
                                return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewproductdetails(\'' + code_1 + '\')" ><i class="simple-icon-pencil"></i></button>  ';
                            }
                        }
                    ]
                });
            }
            else {
                $('#tbl_productlist').DataTable();

                //var table = $('#tbl_productlist').DataTable(/*{ destroy: true }*/);
                //table.clear().draw();
                //table.destroy();
            }
        },
        error: function (response) {

        }
    });
}

function loadproductdetails_cat(value) {
    var data = new FormData();
    data.append("p_Cat_Id", value)
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Product/LoadProducts_Category",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
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
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var code = row.Id;
                                var code_1 = row.ItemCode;
                                return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewproductdetails(\'' + code_1 + '\')" ><i class="simple-icon-pencil"></i></button>  ';
                            }
                        }
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

function loadproductdetails_cat_subcat(value,value1) {
    var data = new FormData();
    data.append("p_Cat_Id", value)
    data.append("p_subcatId",value1)
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Product/LoadProducts_Category_subCat",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
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
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var code = row.Id;
                                var code_1 = row.ItemCode;
                                return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewproductdetails(\'' + code_1 + '\')" ><i class="simple-icon-pencil"></i></button>  ';
                            }
                        }
                    ]
                });
            }
            else {
               // $('#tbl_productlist').DataTable();
                var table = $('#tbl_productlist').DataTable({ destroy: true });
                table.clear().draw();
                table.destroy();
            }
        },
        error: function (response) {

        }
    });
}
function loadPrdUOM() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Product/loadPrdUOM",
        dataType: "json",
        //data: data,
        //contentType: false,
        //processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlunitmeasure").html("");
                $("#ddlunitmeasure").append('<option value="">Select Unit of Measurement</option>');
                $.each(dat, function (j, vari) {
                    $("#ddlunitmeasure").append("<option value='" + vari.Id + "'>" + vari.UnitOfMeasurement + "</option>");
                });
            }
            else {
                $("#ddlunitmeasure").html("");
                $("#ddlunitmeasure").append('<option value="">No Record Found</option>');
            }
        },
        error: function (response) {

        }
    });
}

function loadPrdUnit() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Product/loadPrdUnit",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddluom").html("");
                $("#ddluom").append('<option value="">Select Unit of Measurement</option>');
                $.each(dat, function (j, vari) {
                    $("#ddluom").append("<option value='" + vari.Id + "'>" + vari.UnitOfMeasurement + "</option>");
                });
            }
            else {
                $("#ddluom").html("");
                $("#ddluom").append('<option value="">No Record Found</option>');
            }
        },
        error: function (response) {

        }
    });
}
function loadCategory() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Product/loadProductCategory",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlprcatId").html("");
                $("#ddlprcatId").append('<option value="">Select Category</option>');
                $.each(dat, function (j, vari) {
                    $("#ddlprcatId").append("<option value='" + vari.Id + "'>" + vari.ProductCategoryName + "</option>");
                });
            }
            else {
                $("#ddlprcatId").html("");
                $("#ddlprcatId").append('<option value="">No Record Found</option>');
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
        url: "/Product/loadProductCategory11",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlprcatId1").html("");
                $("#ddlprcatId1").append('<option value="">Select Category</option>');
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
function loadSubCategory(value, ProductSubCategoryId) {
    var data = new FormData();
    data.append("Id", value);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Product/loadProductSubCategory",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlprsubcatId").html("");
                $("#ddlprsubcatId").append('<option value="">Select Sub Category</option>');
                $.each(dat, function (j, vari) {
                    $("#ddlprsubcatId").append("<option value='" + vari.Id + "'>" + vari.ProductSubCategoryName + "</option>");
                });
                if (ProductSubCategoryId != "" && ProductSubCategoryId != null) {
                    $("#ddlprsubcatId").val(ProductSubCategoryId);/*.trigger('change');*/
                }
            }
            else {
                $("#ddlprsubcatId").html("");
                $("#ddlprsubcatId").append('<option value="">No Record Found</option>');
            }
        },
        error: function (response) {

        }
    });
}
function loadSubCategory1(value, ProductSubCategoryId) {
    var data = new FormData();
    data.append("Id", value);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Product/loadProductSubCategory",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlprsubcatId1").html("");
                $("#ddlprsubcatId1").append('<option value="">Select Sub Category</option>');
                $.each(dat, function (j, vari) {
                    $("#ddlprsubcatId1").append("<option value='" + vari.Id + "'>" + vari.ProductSubCategoryName + "</option>");
                });
                if (ProductSubCategoryId != "" && ProductSubCategoryId != null) {
                    $("#ddlprsubcatId1").val(ProductSubCategoryId);/*.trigger('change');*/
                }
            }
            else {
                $("#ddlprsubcatId1").html("");
                $("#ddlprsubcatId1").append('<option value="">No Record Found</option>');
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

function saveproductdetails() {
      var data = new FormData();
    data.append("ItemCode", '');
    data.append("ProductName", $.trim($('#txtname').val()));
    data.append("ProductDefaultImageUrl", $("#photo1").get(0).files[0]);
    data.append("ProductDescription", $.trim($('#txtdescription').val()));
    data.append("ProductUnitofMeasurement", $.trim($('#ddlunitmeasure').val()));
    data.append("PerUnitWeight", $.trim($('#txtunitwt').val()));
    data.append("PerUnitWeightUOM", $.trim($('#ddluom').val()));
    data.append("ProductQty", $.trim($('#txtproductqty').val()));
    data.append("ProductPrice", $.trim($('#txtproductprice').val()));
    data.append("ProductCategoryId", $.trim($('#ddlprcatId').val()));
    data.append("ProductSubCategoryId", $.trim($('#ddlprsubcatId').val()));
    data.append("ProductAvilable", $.trim($('#ddlProductAvilable').val()));
    data.append("ProductStatus", $.trim($('#ddlProductStatus').val()));

    data.append("offerpr", $.trim($('#txtofferprice').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Product/SaveProductDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
              //  alert(response[0].It_Code);
               // resetproduct();
               // $('#Product-Modal').modal('hide');
                //$('#txtitemcode').val(response[0].It_Code);

                //$('#dvitemcode').show();
                var itco = response[0].It_Code;
                //$("#dvavilableTable tbody tr").each(function () {
                //   // var row = $(this);
                //   // var available_qty = row.find("td").eq(0).html();
                //   // var unit_weight = row.find("td").eq(1).find('input').val();
                //   // var offer_price = row.find("td").eq(2).find('input').val();
                //   //SaveProductOfferPrices(itco, available_qty, unit_weight, offer_price);
                //});
                resetproduct();
                $('#image1').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
                $('#Product-Modal').modal('hide');
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
                var title = "Invalid username or password.";
                ErrorAlert(title, content);
            }
        },
        error: function (response) {

        }
    });
}

function viewproductdetails(code_1) {

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
            //data.append("Id", code);
            data.append("ItemCode", code_1);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/Product/LoadProduct",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        $('#btnUpdate').show();
                        $('#btnSave').hide();
                        $('#Product-Modal').modal('show');
                        $.each(response, function (i, vari) {
                            if (vari.ProductDefaultImageUrl != "" && vari.ProductDefaultImageUrl != null) {
                                $('#txtphoto1').val(vari.ProductDefaultImageUrl);
                                $('#image1').attr('src', vari.ProductDefaultImageUrl);
                                $('#photo1').prop('required', false);
                                
                            }
                            else {
                                $('#photo1').prop('required', true);
                            }
                            $('#dvitemcode').show();
                           
                            $('#txtitemcode').val(vari.ItemCode);
                            $('#txtname').val(vari.ProductName);
                            $('#txtdescription').val(vari.ProductDescription);
                            $('#ddlunitmeasure').val(vari.ProductUnitofMeasurement);
                            $('#txtunitwt').val(vari.PerUnitWeight);
                            $('#ddluom').val(vari.PerUnitWeightUOM);
                            $('#txtproductqty').val(vari.ProductQty);
                            $('#txtproductprice').val(vari.ProductPrice);
                            $('#ddlprcatId').val(vari.ProductCategoryId);
                            $('#txtofferprice').val(vari.Offerprice);
                            $('#ddlProductStatus').val(vari.ProductStatus);
                            $('#ddlProductAvilable').val(vari.ProductAvailable1);
                            loadSubCategory(vari.ProductCategoryId, vari.ProductSubCategoryId);
                           // $('#ddlprsubcatId').val(vari.ProductSubCategoryId);
                          //  viewproductoffer(vari.ItemCode);
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

function viewproductoffer(ItemCode) {
    var data = new FormData();
    data.append("ItemCode", ItemCode);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Product/loadProductOffer",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var tableData = $('#dvavilableTable');
                $.each(response, function (i, vari) {
                    tableData.append($('<tr></tr>')
                        .append($('<td></td>')
                            .append(vari.AvailableWeights))
                        .append($('<td></td>')
                            .append(vari.UnitOfMeasurement).append($('<input>')
                                .attr({
                                    value: vari.ProductUnitofMeasurement, type: 'hidden', name: 'unit_id', id: 'unit_id'
                                })))
                        .append($('<td></td>')
                            .append($('<input>')
                                .attr({
                                    value: vari.Offer_price, class: "form-control", type: 'text', name: 'txtOfferPr', id: 'txtOfferPr'
                                })))
                        .append($('<td></td>')
                            .append($('<input>')
                                .attr({
                                    onClick: "$(this).closest('tr').remove();", type: 'button', name: 'btnDelete', id: 'btnDelete'
                                }))))

                });

            }
        },
        error: function (response) {

        }
    });
}

function updateproductdetails(itco) {
    var code = GetURLParameter('vid');
    var data = new FormData();
    data.append("ItemCode", itco);
  //  data.append("Id", code);
    data.append("ProductName", $.trim($('#txtname').val()));
    //alert($("#photo1").get(0).files[0]);
    //alert($('#txtphoto1').val());
    //if ($("#photo1").get(0).files[0] = "undefined")
    //{
    //   // data.append("ProductDefaultImageUrl", $.trim($('#txtphoto1').val()));
    //}
    //else
    //{
    //alert($.trim($('#txtphoto1').val()));
    data.append("ProductDefaultImageUrl", $("#photo1").get(0).files[0]);
    //if ($("#photo1").get(0).files[0] = "undefined")
    //{
    //    data.append("ProductDefaultImageUrl", $.trim($('#txtphoto1').val()));
    //}
  //  }
   // data.append("ProductDefaultImageUrl", $("#txtphoto1").get(0).files[0]);
    
    data.append("ProductDescription", $.trim($('#txtdescription').val()));
    data.append("ProductUnitofMeasurement", $.trim($('#ddlunitmeasure').val()));
    data.append("PerUnitWeight", $.trim($('#txtunitwt').val()));
    data.append("PerUnitWeightUOM", $.trim($('#ddluom').val()));
    data.append("ProductQty", $.trim($('#txtproductqty').val()));
    data.append("ProductPrice", $.trim($('#txtproductprice').val()));
    data.append("ProductCategoryId", $.trim($('#ddlprcatId').val()));
    data.append("ProductSubCategoryId", $.trim($('#ddlprsubcatId').val()));
    data.append("ProductAvilable", $.trim($('#ddlProductAvilable').val()));
    data.append("ProductStatus", $.trim($('#ddlProductStatus').val()));
    
    data.append("offerpr", $.trim($('#txtofferprice').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        //url: "/VendorCreation/UpdateVendorDetails",
        url: "/Product/UpdateProductDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {

                var itco = $('#txtitemcode').val();
                //$("#dvavilableTable tbody tr").each(function () {
                //    var row = $(this);
                //   // alert(row);
                //    var available_qty = row.find("td").eq(0).html();
                //    var unit_weight = row.find("td").eq(1).find('input').val();
                //    var offer_price = row.find("td").eq(2).find('input').val();
                //    SaveProductOfferPrices(itco, available_qty, unit_weight, offer_price);
                //});
               SuccessAlert(response[0].Title, response[0].Message);
                //resetproduct();
                $('#Product-Modal').modal('hide');
                $('#productform').parsley().reset();
                $('#productform')[0].reset();
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message)
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message)
            }
            else {
                //var content = "Invalid";
                //var title = "Invalid username or password.";
                //ErrorAlert(title, content);
                //$("#txtusername").val("");
                //$("#txtpassword").val("");
            }
        },
        error: function (response) {

        }
    });
}