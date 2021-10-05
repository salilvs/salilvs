$(function () {

    loadPrdUOM();

    loadPrdUnit();
    loadPrdUnit1();
    loadCategory();
    loadCategory_search();
    $('#dvprdList').hide();
    $('#dvitemcode').hide();
    $('#ddlprcatId').change(function () {
        var value = $.trim($('#ddlprcatId').val())
        loadSubCategory(value);
    });
    $('#ddlprcatId_search').change(function () {
        var value = $.trim($('#ddlprcatId_search').val())
        loadSubCategory_search(value);
    });
    $('#image1').unbind().click(function (e) {
        $('#photo1').click();
    });
    $('#photo1').change(function () {
        fasterPreviewimage1(this);
    });
    loadproductdetails();

    $('#btnAdd').click(function () {
        var xx = $('#txtunitwt1').val();
        var yy = $('#ddluom option:Selected').text();
        var yy1 = $('#ddluom').val();
        var tableData = $('#dvavilableTable');
        tableData.append($('<tr></tr>')
            .append($('<td></td>')
                .append(xx))
            .append($('<td></td>')
                .append(yy).append($('<input>')
                    .attr({
                        value: yy1, type: 'hidden', name: 'unit_id', id: 'unit_id'
                    })))
            .append($('<td></td>')
                .append($('<input>')
                    .attr({
                        class: "form-control", type: 'text', name: 'txtOfferPr', id: 'txtOfferPr'
                    })))
            .append($('<td></td>')
                .append($('<input>')
                    .attr({
                        onClick: "$(this).closest('tr').remove();", type: 'button', name: 'btnDelete', id: 'btnDelete'
                    })))
        );
        var offerpr = $('#txtOfferPr').val();
        var itco = $('#txtitemcode').val();
        // SaveProductOfferPrices(itco, xx, yy1, offerpr);
        $('#txtunitwt1').val('');
        $('#txtunwt').val('');
        //$('#dvavilable').html(table);
    });


    $('#btnClose,#btnReset').unbind().click(function () {
        // resetproduct();
        $("#dvavilableTable tbody tr").remove();
    });
    $('#btnUpdate').unbind().click(function () {

        var itco = $('#txtitemcode').val();
        updatevendorproductdetails(itco);
        //alert(itco);


    });


    $('#ddlprcatId_search').change(function () {
        var Cat_Id = $.trim($('#ddlprcatId_search').val());
        loadproductdetails_Category(Cat_Id);
    });

    $('#ddlprsubcatId_search').change(function () {
        var Cat_Id = $.trim($('#ddlprcatId_search').val());
        var SubCat_Id = $.trim($('#ddlprsubcatId_search').val());
        loadproductdetails_SubCategory(Cat_Id, SubCat_Id);
    });
    $('#ddlstatus').change(function () {
        var Status = $.trim($('#ddlstatus').val());
        loadproductdetails_Status(Status);
    });
    $('#ddlAvilablity').change(function () {
        var Avl = $.trim($('#ddlAvilablity').val());
        loadproductdetails_Avilablity(Avl);
    });
    //$('#txtItemId').click(function () {
    //    var ItemId = $.trim($('#txtItemId').text());
    //    alert(ItemId);
    //    --loadproductdetails_Avilablity(Avl);
    //});
    $('#btnDownload').click(function () {

        $('#dvprd').hide();

        $('#dvprdList').show();

        var value_prCatId = $.trim($('#ddlprcatId_search').val());
        var value_prSubCatId = $.trim($('#ddlprsubcatId_search').val());

        if (value_prCatId == 0 && value_prSubCatId == 0) {
            var Vendor_Id = '';
            downloadproductdetails(Vendor_Id);
        }
        else {
            if (value_prSubCatId == 0) {
                var Vendor_Id = '';
                downloadproductdetailsCat(Vendor_Id, value_prCatId);
            }
            else {
                var Vendor_Id = '';
                downloadproductdetailsCat_Subcat(Vendor_Id, value_prCatId, value_prSubCatId);

            }
        }
        // $('#dvprdList').show();
        // $('#dvprdList').hide();
        //   $('#dvprdList').hide();
        //$("#dvavilableTable tbody tr").remove();
    });
    $('#btnEditAll').click(function () {
        // $('#tbl_productlist').dataTable().makeEditable();
    });

    $('#btnUpload').click(function () {
        //alert('hii');
        //var files = $("#proof1").get(0).files[0];


        //var sheet = xlsx.xl.worksheets['sheet1.xml'];
        //var mergeCells = $('mergeCells', sheet);
        //mergeCells[0].children[0].remove(); 
        //ExcelBook.ActiveSheet.Rows(1).Delete();

        //var ff = $("#upload").get(0).Rows(1).Delete();
        var files = $("#upload").get(0).files[0];
        var xl2json = new ExcelToJSON();
        xl2json.parseExcel(files);


        //var files = $("#upload").get(0).files[0];
        //var xl2json = new ExcelToJSON();
        //xl2json.parseExcel(files);




        //alert(jsonData);
        //var data = new FormData();
        //data.append("Vendor_Id", '');
        //data.append("File_name", files);
        //$.ajax({
        //    type: "Post",
        //    contentType: "application/json;charset=utf-8",
        //    url: "/Product/UploadExcel",
        //   dataType: "json",
        //    data: data,
        //    contentType: false,
        //    processData: false,
        //    success: function (response) {
        //        alert('success')
        //        var dat = response;
        //        if (dat.length > 0) {



        //        }
        //        else {
        //            alert('error');

        //        }
        //    },
        //    error: function (response) {

        //    }
        //});
    });




    var ExcelToJSON = function () {
        //alert("inner page");
        this.parseExcel = function (file) {
            var reader = new FileReader();
            //alert("innerdddd page");
            reader.onload = function (e) {
                var data = e.target.result;
                var workbook = XLSX.read(data, {
                    type: 'binary'
                });
                workbook.SheetNames.forEach(function (sheetName) {
                    // Here is your object
                    var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                    json_object = JSON.stringify(XL_row_object);
                    var formData = new FormData();
                    formData.append("Vendor_Id", '');
                    formData.append("File_name", json_object);
                    $.ajax({
                        type: "Post",
                        contentType: "application/json;charset=utf-8",
                        url: "/ProductCopy/UploadExcel",
                        dataType: "json",
                        data: formData,
                        contentType: false,
                        processData: false,
                        success: function (response) {
                            //alert('success')
                            var dat = response;
                            if (dat.length > 0) {

                                if (response[0].Type == "Success") {
                                    SuccessAlert(response[0].Title, response[0].Message);
                                    //resetproduct();
                                    //$('#Product-Modal').modal('hide');
                                }

                            }
                            else {
                                alert('error');

                            }
                        },
                        error: function (response) {

                        }
                    });
                })
            };

            reader.onerror = function (ex) {
                console.log(ex);
            };

            reader.readAsBinaryString(file);

            alert(XL_row_object)
            alert(json_object)
        };
    };
});
function downloadproductdetailsCat(Vendor_Id, value_prCatId) {
    swal({
        title: "Are you sure?",
        text: "Do you want to View the Products!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes, View it!",
    }, function (isConfirm) {
        if (isConfirm) {
            var data = new FormData();
            data.append("Vendor_Id", Vendor_Id);
            data.append("prCatId", value_prCatId);
            //  data.append("prSubCatId", value_prSubCatId)
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/ProductCopy/DownloadProductDetCat",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {


                        var table = $('#tbl_productlistdownload').DataTable({ destroy: true });
                        //table.clear();
                        table.destroy();
                        // $('#tbl_paymentreport').append('<caption style="caption-side: top;font-size: 18px; color: brown;">PerBooking Report - ' + vendor_name + ' (' + txt_fr + ' _ ' + txt_t + ')</caption>');
                        $('#tbl_productlistdownload').DataTable({
                            data: dat,
                            autoWidth: true,
                            columns: [
                                {
                                    render: function (data, type, row, meta) {
                                        return meta.row + meta.settings._iDisplayStart + 1;
                                    }
                                },
                                { data: 'Id' },
                                { data: 'ItemCode' },
                                { data: 'ProductName' },
                                { data: 'ProductDescription' },
                                //{ data: 'ProductUnitofMeasurement' },
                                //{ data: 'PerUnitWeight' },
                                //{ data: 'PerUnitWeightUOM' },
                                { data: 'ProductQty' },
                                { data: 'ProductPrice' },
                                { data: 'OfferPrice' },
                                { data: 'VendorProductRefCode' },
                                //{ data: 'ProductCategoryId' },
                                //{ data: 'ProductSubCategoryId' },

                            ],
                            "dom": 'Bfrtip',
                            "buttons": [
                                {
                                    extend: 'excel',
                                    //footer: true,
                                    filename: 'Product_',
                                    title: '',
                                    className: 'btn btn--primary',
                                    text: '<i class=""></i> Download Excel'
                                }
                            ],
                        });
                    }
                    else {
                        var table = $('#tbl_productlistdownload').DataTable(/*{ destroy: true }*/);
                        table.clear().draw();
                        table.destroy();
                    }
                },
                error: function (response) {

                }
            });

        } else {


        }
    });

}
function downloadproductdetailsCat_Subcat(Vendor_Id, value_prCatId, value_prSubCatId) {
    swal({
        title: "Are you sure?",
        text: "Do you want to View the Products!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes, View it!",
    }, function (isConfirm) {
        if (isConfirm) {
            var data = new FormData();

            data.append("Vendor_Id", Vendor_Id);
            data.append("prCatId", value_prCatId);
            data.append("prSubCatId", value_prSubCatId)
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/ProductCopy/DownloadProductDetCatSubCat",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {


                        var table = $('#tbl_productlistdownload').DataTable({ destroy: true });
                        //table.clear();
                        table.destroy();
                        // $('#tbl_paymentreport').append('<caption style="caption-side: top;font-size: 18px; color: brown;">PerBooking Report - ' + vendor_name + ' (' + txt_fr + ' _ ' + txt_t + ')</caption>');
                        $('#tbl_productlistdownload').DataTable({
                            data: dat,
                            autoWidth: true,
                            columns: [
                                {
                                    render: function (data, type, row, meta) {
                                        return meta.row + meta.settings._iDisplayStart + 1;
                                    }
                                },
                                { data: 'Id' },
                                { data: 'ItemCode' },
                                { data: 'ProductName' },
                                { data: 'ProductDescription' },
                                ////{ data: 'ProductUnitofMeasurement' },
                                //{ data: 'PerUnitWeight' },
                                //{ data: 'PerUnitWeightUOM' },
                                { data: 'ProductQty' },
                                { data: 'ProductPrice' },
                                { data: 'OfferPrice' },
                                { data: 'VendorProductRefCode' },
                                //{ data: 'ProductCategoryId' },
                                //{ data: 'ProductSubCategoryId' },

                            ],
                            "dom": 'Bfrtip',
                            "buttons": [
                                {
                                    extend: 'excel',
                                    //footer: true,
                                    //header: false,

                                    //messageTop: false,
                                    //title: false,
                                    filename: 'Product_',
                                    //+ $('#from_date').val() + '_' + $('#to_date').val() 
                                    title: '',
                                    className: 'btn btn--primary',
                                    text: '<i class=""></i> Download Excel'
                                }
                            ],
                        });
                    }
                    else {
                        var table = $('#tbl_productlistdownload').DataTable(/*{ destroy: true }*/);
                        table.clear().draw();
                        table.destroy();
                    }
                },
                error: function (response) {

                }
            });

        } else {


        }
    });

}

function downloadproductdetails(Vendor_Id) {
    swal({
        title: "Are you sure?",
        text: "Do you want to download the Products!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes, Download it!",
    }, function (isConfirm) {
        if (isConfirm) {
            var data = new FormData();
            data.append("Vendor_Id", Vendor_Id);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/ProductCopy/DownloadProductDet",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {


                        //var table = $('#tbl_productlistdownload').DataTable({ destroy: true });
                        var table = $('#tbl_productlistdownload').DataTable({ destroy: true });
                        //table.clear();
                        table.destroy();
                        // table.header.remove();
                        // $('#tbl_productlistdownload').append('<caption style="caption-side: top;font-size: 18px; color: brown;">Vendor Product </caption>');
                        $('#tbl_productlistdownload').DataTable({
                            data: dat,
                            autoWidth: true,
                            columns: [
                                {
                                    render: function (data, type, row, meta) {
                                        return meta.row + meta.settings._iDisplayStart + 1;
                                    }
                                },
                                { data: 'Id' },
                                { data: 'ItemCode' },
                                { data: 'ProductName' },
                                { data: 'ProductDescription' },
                                //{ data: 'ProductUnitofMeasurement' },
                                //{ data: 'PerUnitWeight' },
                                //{ data: 'PerUnitWeightUOM'},
                                { data: 'ProductQty' },
                                { data: 'ProductPrice' },
                                { data: 'OfferPrice' },
                                { data: 'VendorProductRefCode' },
                                //{ data: 'ProductSubCategoryId' },
                            ],
                            "dom": 'Bfrtip',
                            "buttons": [
                                {
                                    extend: 'excel',
                                    //footer: true,
                                    //filename: 'Data_1',
                                    //messageTop:false,
                                    //header:false,
                                    filename: 'Product_',
                                    //+ $('#from_date').val() + '_' + $('#to_date').val() 

                                    title: '',
                                    className: 'btn btn--primary',
                                    text: '<i class=""></i> Download Excel'

                                }
                            ],
                        });
                    }
                    else {
                        var table = $('#tbl_productlistdownload').DataTable(/*{ destroy: true }*/);
                        table.clear().draw();
                        table.destroy();
                    }
                },
                error: function (response) {

                }
            });

        } else {


        }
    });

}

function loadproductdetails_Avilablity(Avl) {
    var data = new FormData();
    data.append("Vendor_Id", '');
    data.append("ProductAvilable", Avl)
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        //url: "/Product/LoadVendorProducts",
        url: "/ProductCopy/LoadVendorProductdet_Avilability",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_productlist').DataTable({ destroy: true });
                table.destroy();
                var table = $('#tbl_productlist').DataTable({
                    data: dat,
                    autoWidth: true,
                    createdRow: function (row, data, dataIndex) {
                        // Set the data-status attribute, and add a class
                        $(row).find('td:eq(1)')
                            .addClass('itemCode');
                        $(row).find('td:eq(3)')
                            .attr('data-field', 'status');
                        $(row).find('td:eq(5)')
                            .attr('data-field', 'quantity');
                        $(row).find('td:eq(6)')
                            .attr('data-field', 'unitPrice');
                        $(row).find('td:eq(7)')
                            .attr('data-field', 'offerPrice');
                    },
                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                        { data: 'ItemCode' },
                        { data: 'ProductName' },
                        {
                            data: 'ProductStatus'
                        },
                        { data: 'UnitOfMeasurement' },
                        {
                            //data: 'balance',
                            data: 'ProductQty',
                            orderable: false,
                            render: function (data, type, row) {
                                //var code = row.balance;
                                var code = row.ProductQty;
                                return '<td data-field="name">' + code + '</td>';
                            }
                        },
                        { data: 'ProductPrice' },
                        { data: 'OfferPrice' },
                        { data: 'ProductCategoryName' },
                        { data: 'ProductSubCategoryName' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var code = row.Id;
                                return '<td><button type="button" class="button button-small edit" onclick="editTable();" title="Edit"  ><i class="fa fa-pencil"></i></button> <button type="button"class="button button-small" onclick="viewproductdetails(\'' + code + '\')" > <i class="fa fa-eye" aria-hidden="true" style="font-size: 18px;"></i></button></td>';
                            }
                        }
                    ]
                });
            }
            else {
                var table = $('#tbl_productlist').DataTable(/*{ destroy: true }*/);
                table.clear().draw();
                table.destroy();
                //-- $('#tbl_productlist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
function loadproductdetails_Status(Status) {
    var data = new FormData();
    data.append("Vendor_Id", '');
    data.append("ProductStatus", Status)
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        //url: "/Product/LoadVendorProducts",
        url: "/ProductCopy/LoadVendorProductdet_Status",
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
                    createdRow: function (row, data, dataIndex) {
                        // Set the data-status attribute, and add a class
                        $(row).find('td:eq(1)')
                            .addClass('itemCode');
                        $(row).find('td:eq(3)')
                            .attr('data-field', 'status');
                        $(row).find('td:eq(5)')
                            .attr('data-field', 'quantity');
                        $(row).find('td:eq(6)')
                            .attr('data-field', 'unitPrice');
                        $(row).find('td:eq(7)')
                            .attr('data-field', 'offerPrice');
                    },
                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                        { data: 'ItemCode' },
                        { data: 'ProductName' },
                        {
                            data: 'ProductStatus'
                        },
                        { data: 'UnitOfMeasurement' },
                        {
                            //data: 'balance',
                            data: 'ProductQty',
                            orderable: false,
                            render: function (data, type, row) {
                                //var code = row.balance;
                                var code = row.ProductQty;
                                return '<td data-field="name">' + code + '</td>';
                            }
                        },
                        { data: 'ProductPrice' },
                        { data: 'OfferPrice' },
                        { data: 'ProductCategoryName' },
                        { data: 'ProductSubCategoryName' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var code = row.Id;
                                return '<td><button type="button" class="button button-small edit" onclick="editTable();" title="Edit"  ><i class="fa fa-pencil"></i></button> <button type="button"class="button button-small" onclick="viewproductdetails(\'' + code + '\')" > <i class="fa fa-eye" aria-hidden="true" style="font-size: 18px;"></i></button></td>';
                            }
                        }
                    ]
                });
            }
            else {
                var table = $('#tbl_productlist').DataTable(/*{ destroy: true }*/);
                table.clear().draw();
                table.destroy();
                //-- $('#tbl_productlist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
function loadproductdetails_SubCategory(Cat_Id, SubCat_Id) {
    var data = new FormData();
    data.append("Vendor_Id", '');
    data.append("ProductCategoryId", Cat_Id)
    data.append("ProductSubCategoryId", SubCat_Id)
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        //url: "/Product/LoadVendorProducts",
        url: "/ProductCopy/LoadVendorProductdet_Subcategory",
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
                    createdRow: function (row, data, dataIndex) {
                        // Set the data-status attribute, and add a class
                        $(row).find('td:eq(1)')
                            .addClass('itemCode');
                        $(row).find('td:eq(3)')
                            .attr('data-field', 'status');
                        $(row).find('td:eq(5)')
                            .attr('data-field', 'quantity');
                        $(row).find('td:eq(6)')
                            .attr('data-field', 'unitPrice');
                        $(row).find('td:eq(7)')
                            .attr('data-field', 'offerPrice');
                    },
                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                        { data: 'ItemCode' },
                        { data: 'ProductName' },
                        {
                            data: 'ProductStatus'
                        },
                        { data: 'UnitOfMeasurement' },
                        {
                            //data: 'balance',
                            data: 'ProductQty',
                            orderable: false,
                            render: function (data, type, row) {
                                //var code = row.balance;
                                var code = row.ProductQty;
                                return '<td data-field="name">' + code + '</td>';
                            }
                        },
                        { data: 'ProductPrice' },
                        { data: 'OfferPrice' },
                        { data: 'ProductCategoryName' },
                        { data: 'ProductSubCategoryName' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var code = row.Id;
                                return '<td><button type="button" class="button button-small edit" onclick="editTable();" title="Edit"  ><i class="fa fa-pencil"></i></button> <button type="button"class="button button-small" onclick="viewproductdetails(\'' + code + '\')" > <i class="fa fa-eye" aria-hidden="true" style="font-size: 18px;"></i></button> <button type="button" class="button button-small" title = "Delete" onclick="deleteProduct(\'' + code + '\')" ><i class="fa fa-trash"></i></button></td>';
                            }
                        }
                    ]
                });
            }
            else {
                var table = $('#tbl_productlist').DataTable(/*{ destroy: true }*/);
                table.clear().draw();
                table.destroy();
                //-- $('#tbl_productlist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}

function loadproductdetails_Category(Cat_Id) {
    var data = new FormData();
    data.append("Vendor_Id", '');
    data.append("ProductCategoryId", Cat_Id)
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        //url: "/Product/LoadVendorProducts",
        url: "/ProductCopy/LoadVendorProductdet_category",
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
                    createdRow: function (row, data, dataIndex) {
                        // Set the data-status attribute, and add a class
                        $(row).find('td:eq(1)')
                            .addClass('itemCode');
                        $(row).find('td:eq(3)')
                            .attr('data-field', 'status');
                        $(row).find('td:eq(5)')
                            .attr('data-field', 'quantity');
                        $(row).find('td:eq(6)')
                            .attr('data-field', 'unitPrice');
                        $(row).find('td:eq(7)')
                            .attr('data-field', 'offerPrice');
                    },
                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                        { data: 'ItemCode' },
                        { data: 'ProductName' },
                        {
                            data: 'ProductStatus'
                        },
                        { data: 'UnitOfMeasurement' },
                        {
                            //data: 'balance',
                            data: 'ProductQty',
                            orderable: false,
                            render: function (data, type, row) {
                                //var code = row.balance;
                                var code = row.ProductQty;
                                return '<td data-field="name">' + code + '</td>';
                            }
                        },
                        { data: 'ProductPrice' },
                        { data: 'OfferPrice' },
                        { data: 'ProductCategoryName' },
                        { data: 'ProductSubCategoryName' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var code = row.Id;
                                return '<td><button type="button" class="button button-small edit" onclick="editTable();" title="Edit"  ><i class="fa fa-pencil"></i></button> <button type="button"class="button button-small" onclick="viewproductdetails(\'' + code + '\')" > <i class="fa fa-eye" aria-hidden="true" style="font-size: 18px;"></i></button> <button type="button" class="button button-small" title = "Delete" onclick="deleteProduct(\'' + code + '\')" ><i class="fa fa-trash"></i></button></td>';
                            }
                        }
                    ]
                });
            }
            else {
                var table = $('#tbl_productlist').DataTable(/*{ destroy: true }*/);
                table.clear().draw();
                table.destroy();
                //-- $('#tbl_productlist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
function updateProductDet(values) {

    //console.log(values)
    //console.log(values.itemCode)
    //console.log(values.quantity)
    //console.log(values.unitPrice)
    //console.log(values.offerPrice)
    //console.log(values.status)
    var data = new FormData();
    data.append("ItemCode", values.itemCode);
    data.append("ProductQty", values.quantity);
    data.append("ProductPrice", values.unitPrice);
    data.append("offerpr", values.offerPrice);
    data.append("ProductStatus", values.status);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        //url: "/VendorCreation/UpdateVendorDetails",
        url: "/ProductCopy/UpdateVendor_ProductDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                //SuccessAlert(response[0].Title, response[0].Message);
                //resetproduct();
                //$('#Product-Modal').modal('hide');
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

function SaveProductOfferPrices(itco, available_qty, unit_weight, offer_pr) {
    var data = new FormData();
    data.append("Item_code", itco);
    data.append("xx", available_qty);
    data.append("yy", unit_weight);
    data.append("offerpr", offer_pr);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/ProductCopy/SaveVendorProductOfferPrice",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                //$('#VendorCompany-Modal').modal('hide');
                // resetproduct() 

                $('#Product-Modal').modal('hide');
                // resetproduct();
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
                //var content = "Invalid";
                //var title = "Invalid username or password.";
                //ErrorAlert(title, content);
            }
        },
        error: function (response) {

        }

    });
}
function updatevendorproductdetails(itco) {

    var code = GetURLParameter('vid');
    var data = new FormData();
    data.append("ItemCode", itco);
    data.append("Id", code);

    data.append("VendorProductRefCode", $.trim($('#txtrefno').val()));
    data.append("ProductName", $.trim($('#txtname').val()));
    data.append("ProductDescription", $.trim($('#txtdescription').val()));
    data.append("ProductUnitofMeasurement", $.trim($('#ddlunitmeasure').val()));
    data.append("PerUnitWeight", $.trim($('#txtunitwt').val()));
    data.append("PerUnitWeightUOM", $.trim($('#ddluom1').val()));
    data.append("ProductQty", $.trim($('#txtproductqty').val()));
    data.append("ProductPrice", $.trim($('#txtproductprice').val()));
    data.append("offerpr", $.trim($('#txtofferprice').val()));
    data.append("ProductStatus", $.trim($('#ddlProductStatus').val()));
    data.append("ProductAvilable", $.trim($('#ddlAvilablity').val()));
    data.append("ProductDefaultImageUrl", $("#photo1").get(0).files[0]);
    //alert($('#ddlAvilablity').val());

    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        //url: "/VendorCreation/UpdateVendorDetails",
        url: "/ProductCopy/UpdateVendorProductDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                //SuccessAlert(response[0].Title, response[0].Message);
                //resetproduct();
                //$('#Product-Modal').modal('hide');
                var itco = $('#txtitemcode').val();
                var rowCount = $('#dvavilableTable tr').length;
                // alert(rowCount);
                if (rowCount > 1) {
                    $("#dvavilableTable tbody tr").each(function () {
                        //alert(itco);
                        var row = $(this);
                        var available_qty = row.find("td").eq(0).html();
                        var unit_weight = row.find("td").eq(1).find('input').val();
                        var offer_pr = row.find("td").eq(2).find('input').val();
                        SaveProductOfferPrices(itco, available_qty, unit_weight, offer_pr);
                    });
                    $("#dvavilableTable tbody tr").remove();
                }
                else {
                    SuccessAlert(response[0].Title, response[0].Message);
                    // resetproduct();
                    $('#Product-Modal').modal('hide');

                }
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
function resetproduct() {
    $("#dvavilableTable tbody tr").remove();
    loadproductdetails();
    $('#btnUpdate').prop('disabled', false);
    $('#btnSave').prop('disabled', false);
    $('#btnUpdate').hide();
    $('#btnSave').show();
    $('#productform').parsley().reset();
    $('#productform')[0].reset();
    $('#productimage').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
}
function loadproductdetails() {
    var data = new FormData();
    data.append("Vendor_Id", '');
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        //url: "/Product/LoadVendorProducts",
        url: "/ProductCopy/LoadVendorProductdet",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            //  alert(JSON.stringify(response));
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_productlist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_productlist').DataTable({
                    data: dat,
                    autoWidth: true,
                    createdRow: function (row, data, dataIndex) {
                        // Set the data-status attribute, and add a class
                        $(row).find('td:eq(1)')
                            .addClass('itemCode');
                        $(row).find('td:eq(3)')
                            .attr('data-field', 'status');
                        $(row).find('td:eq(5)')
                            .attr('data-field', 'quantity');
                        $(row).find('td:eq(6)')
                            .attr('data-field', 'unitPrice');
                        $(row).find('td:eq(7)')
                            .attr('data-field', 'offerPrice');
                    },
                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                        //{
                        //    orderable: false,
                        //    render: function (data, type, row) {
                        //        var image = row.ProductDefaultImageUrl;
                        //        return '<td><div class="sidebar-user"><div class="sidebar-user-picture"><img alt="image" src="' + image + '" width="50px" height="50px"></div></div></td>';
                        //    }
                        //},
                        { data: 'ItemCode' },
                        { data: 'ProductName' },
                        {
                            data: 'ProductStatus'

                        },
                        { data: 'UnitOfMeasurement' },
                        {
                            //data: 'balance',
                            data: 'ProductQty',
                            orderable: false,
                            render: function (data, type, row) {
                                //var code = row.balance;
                                var code = row.ProductQty;
                                return '<td data-field="name">' + code + '</td>';
                            }
                        },
                        //{
                        //    data: 'ProductQty',
                        //    orderable: false,
                        //    render: function (data, type, row) {
                        //        var code = row.ProductQty;
                        //        return '<td data-field="name">' + code+'</td>';
                        //    }
                        //},
                        { data: 'ProductPrice' },
                        { data: 'OfferPrice' },
                        { data: 'ProductCategoryName' },
                        { data: 'ProductSubCategoryName' },



                        //{
                        //    orderable: false,
                        //    render: function (data, type, row) {
                        //        var stat = row.ProductStatus;
                        //        if (stat == "Active") {
                        //            return '<span class="badge badge-pill badge-success">' + stat + '</span>';
                        //        }
                        //        else { return '<span class="badge badge-pill badge-danger">' + stat + '</span>'; }
                        //    }
                        //},
                        //{
                        //    orderable: false,
                        //    render: function (data, type, row) {
                        //        var code = row.Id;
                        //        return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewproductdetails(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button>  ';
                        //    }
                        //}
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var code = row.Id;
                                return '<td><button type="button" class="button button-small edit" onclick="editTable();" title="Edit"  ><i class="fa fa-pencil"></i></button> <button type="button"class="button button-small" onclick="viewproductdetails(\'' + code + '\')" > <i class="fa fa-eye" aria-hidden="true" style="font-size: 18px;"></i></button>  <button type="button" class="button button-small" title = "Delete" onclick="deleteProduct(\'' + code + '\')" ><i class="fa fa-trash"></i></button> </td>';
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


function deleteProduct(code) {
    swal({
        title: "Are you sure?",
        text: "Do you want Delete this Product!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes",
    }, function (isConfirm) {
        if (isConfirm) {
            var data = new FormData();
            data.append("Vendor_Id", '');
            data.append("Id1", code);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/ProductCopy/Delete_Product",
                //url: "/VendorUser/Delete_User",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response.length > 0) {
                        if (response[0].Type == "Success") {
                            SuccessAlert(response[0].Title, response[0].Message);
                            //resetvendoruser();
                            loadproductdetails();
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
                },
                error: function (response) {
                }
            });
        }
        else {

        }
    });

}


function viewproductdetails(code) {
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
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/ProductCopy/EditVendorProduct",
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
                            // alert(vari.VendorProductRefCode);
                            $('#txtrefno').val(vari.VendorProductRefCode);
                            $('#txtname').val(vari.ProductName);
                            $('#txtdescription').val(vari.ProductDescription);
                            $('#ddlunitmeasure').val(vari.ProductUnitofMeasurement);
                            $('#txtunitwt').val(vari.PerUnitWeight);
                            $('#ddluom1').val(vari.PerUnitWeightUOM);
                            $('#txtproductqty').val(vari.ProductQty);
                            $('#txtproductprice').val(vari.ProductPrice);




                            $('#ddlprcatId').val(vari.ProductCategoryId);
                            $('#txtofferprice').val(vari.OfferPrice);
                            $('#ddlProductStatus').val(vari.ProductStatus);
                            $('#ddlProductAvilable').val(vari.ProductAvailable1);
                            loadSubCategory(vari.ProductCategoryId, vari.ProductSubCategoryId);
                            // $('#ddlprsubcatId').val(vari.ProductSubCategoryId);
                            viewproductoffer(vari.ItemCode);
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
        url: "/ProductCopy/loadProductOffer1",
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
                $("#ddlunitmeasure").append('<option value="">Select Unit of Meaurement</option>');
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
        url: "/ProductCopy/loadPrdUnit",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddluom").html("");
                $("#ddluom").append('<option value="">Select Unit of Meaurement</option>');
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
function loadPrdUnit1() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/ProductCopy/loadPrdUnit1",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddluom1").html("");
                $("#ddluom1").append('<option value=""></option>');
                $.each(dat, function (j, vari) {
                    $("#ddluom1").append("<option value='" + vari.Id + "'>" + vari.UnitOfMeasurement + "</option>");
                });
            }
            else {
                $("#ddluom1").html("");
                $("#ddluom1").append('<option value="">No Record Found</option>');
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
        url: "/ProductCopy/loadProductCategory",
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
function loadCategory_search() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/ProductCopy/loadProductCategory",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlprcatId_search").html("");
                $("#ddlprcatId_search").append('<option value="0">All</option>');
                $.each(dat, function (j, vari) {
                    $("#ddlprcatId_search").append("<option value='" + vari.Id + "'>" + vari.ProductCategoryName + "</option>");
                });
            }
            else {
                $("#ddlprcatId_search").html("");
                $("#ddlprcatId_search").append('<option value="">No Record Found</option>');
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
        url: "/ProductCopy/loadProductSubCategory",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlprsubcatId").html("");
                $("#ddlprsubcatId").append('<option value="">Select SubCategory</option>');
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

function loadSubCategory_search(value, ProductSubCategoryId) {
    var data = new FormData();
    data.append("Id", value);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/ProductCopy/loadProductSubCategory",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlprsubcatId_search").html("");
                $("#ddlprsubcatId_search").append('<option value="0">Select SubCategory</option>');
                $.each(dat, function (j, vari) {
                    $("#ddlprsubcatId_search").append("<option value='" + vari.Id + "'>" + vari.ProductSubCategoryName + "</option>");
                });
                if (ProductSubCategoryId != "" && ProductSubCategoryId != null) {
                    $("#ddlprsubcatId_search").val(ProductSubCategoryId);/*.trigger('change');*/
                }
            }
            else {
                $("#ddlprsubcatId_search").html("");
                $("#ddlprsubcatId_search").append('<option value="">No Record Found</option>');
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