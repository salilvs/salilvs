$(function () {
    $('#Search_delId').hide();
    loadDeliveryBoydetails();
    loadcountrydetails();
    $('#ddlcountry').change(function () {
        loadstatedetails($('#ddlcountry').val());
    });
    $('#ddlstate').change(function () {
        loadcitydetails($('#ddlstate').val());
    });
    var veh_ty;
    $('#btnSearch').unbind().click(function () {
        event.preventDefault();
        searchDeliveryBoy();
    });
    $('#btnResetChanges,#btndeliverrychargeClose').unbind().click(function () {
        $('#DeliveryBoyCharge-Modal').modal('hide');
    });
    $('#btnUpdateChanges').unbind().click(function () {
        event.preventDefault();
        //$('#btnUpdateChanges').prop('disabled', false);
        if ($('#deliverychargeform').parsley().validate() !== true) {
            //$('#btnUpdateChanges').prop('disabled', false);
        }
        else {
            //$('#btnUpdateChanges').prop('disabled', true);
            UpdateDeliveryCharge();
        }
    });
    $('#btn_Close').unbind().click(function () {
        $('#DeliveryBoy-Modal').modal('hide');
    });
});

function loadDeliveryBoydetails() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/DeliveryBoy/DeliverBoyLoad",
        dataType: "json",
        //contentType: false,
        //processData: false,
        success: function (response) {
            var dat = response;
            // alert(dat.length);
            if (dat.length > 0) {
                var table = $('#tbl_listDeliverBoy').DataTable({ destroy: true });
                table.clear();
                // table.clear.draw();
                table.destroy();

                //$('#tbl_paymentreport').append('<caption style="caption-side: top;font-size: 18px; color: brown;">PerBooking Report - ' + vendor_name + ' (' + xx + ' _ ' + yy + ')</caption>');
                $('#tbl_listDeliverBoy').DataTable({
                    data: dat,
                    autoWidth: true,
                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },

                        { data: 'Name' },
                        { data: 'Gender' },
                        { data: 'Email' },
                        { data: 'Phone' },
                        {data: 'Status'},
                        //{ data: 'VehicleType' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var code = row.Id;
                                //veh_ty = row.Vehicle_Type;
                                ///*<button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="inactivateDeliveryBoy(\'' + code + '\')" ><i class="simple-icon-trash"></i></button>*/
                                return '<td><button type="button" class="btn btn-icon" title = "View" onclick="viewDeliveryCharge(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button> <button type="button" class="btn btn-icon" title = "View" onclick="viewDeliveryBoydetail(\'' + code + '\')" ><i class="fa fa-eye"></i></button> <button type="button" class="button button-small" title = "Delete" onclick="deleteDeliveryBoy(\'' + code + '\')" ><i class="fa fa-trash"></i></button> ';
                            }
                        }
                    ],
                });

            }
            else {
                var table = $('#tbl_listDeliverBoy').DataTable(/{ destroy: true }/);
                table.clear().draw();
                table.destroy();
            }
        },
        error: function (response) {
        }
    });
}


function deleteDeliveryBoy(code) {
    swal({
        title: "Are you sure?",
        text: "Do you want Delete this Delivery Boy!",
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
                //url: "/VendorCreation/Delete_User",
                url: "/DeliveryBoy/DeleteDeliverBoy",
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
                            loadDeliveryBoydetails();
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




//function inactivateDeliveryBoy(code) {
//    swal({
//        title: "Are you sure?",
//        text: "Do you want to deactivate the Delivery boy!",
//        type: "warning",
//        showCancelButton: true,
//        confirmButtonColor: "#fec107",
//        confirmButtonText: "Yes",
//    }, function (isConfirm) {
//        if (isConfirm) {
//            var data = new FormData();
//            data.append("Main_Category_Id", code);
//            $.ajax({
//                type: "Post",
//                contentType: "application/json;charset=utf-8",
//                //url: "/MainCategory/DeactivateMainCategoryDetails",
//                url: "/DeliveryBoy/DeactivateDeliverBoy",
//                dataType: "json",
//                data: data,
//                contentType: false,
//                processData: false,
//                success: function (response) {
//                    if (response.length > 0) {
//                        if (response[0].Type == "Success") {
//                            SuccessAlert(response[0].Title, response[0].Message);
//                            resetmaincategory();
//                        }
//                        else if (response[0].Type == "Warning") {
//                            WarningAlert(response[0].Title, response[0].Message)
//                        }
//                        else if (response[0].Type == "Error") {
//                            ErrorAlert(response[0].Title, response[0].Message)
//                        }
//                        else {
//                            var content = "Invalid";
//                            var title = "Invalid username or password.";
//                            ErrorAlert(title, content);
//                        }
//                    }
//                    else {

//                    }
//                },
//                error: function (response) {

//                }
//            });

//        } else {

//        }
//    });

//}


function searchDeliveryBoy() {

    var data = new FormData();
    var xx = $.trim($("#txtdeliveryBoyId").val());
    data.append("DeliveryBoyId", $.trim($("#txtdeliveryBoyId").val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/DeliveryBoy/searchDeliveryBoyDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            // alert(dat.length);
            if (dat.length > 0) {
                var table = $('#tbl_serchDeliverBoy').DataTable({ destroy: true });
                table.clear();
                // table.clear.draw();
                table.destroy();
                $('#Search_delId').show();
                //$('#tbl_paymentreport').append('<caption style="caption-side: top;font-size: 18px; color: brown;">PerBooking Report - ' + vendor_name + ' (' + xx + ' _ ' + yy + ')</caption>');
                $('#tbl_serchDeliverBoy').DataTable({
                    data: dat,
                    autoWidth: true,
                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },

                        { data: 'Name' },
                        { data: 'Gender' },
                        { data: 'Email' },
                        { data: 'Phone' },
                        //{ data: 'VehicleType' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var code = row.Id;
                                veh_ty = row.Vehicle_Type;
                                return '<td> <button type="button" class="fa fa-download btn btn-icon" title = "Add to Vendor" onclick="addDelBoyVendor(\'' + code + '\')" ><i class="glyphicon glyphicon-download-alt"></i></button>';
                            }
                        }
                    ],
                });

            }
            else {
                var table = $('#tbl_serchDeliverBoy').DataTable(/*{ destroy: true }*/);
                table.clear().draw();
                table.destroy();
            }
        },
        error: function (response) {
        }
    });
}
function addDelBoyVendor(code) {

    swal({
        title: "Are you sure?",
        text: "Do you want to   Add the delivery Boy!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes, Add it!",
    }, function (isConfirm) {
        if (isConfirm) {
            var data = new FormData();
            data.append("Id", code);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/DeliveryBoy/addDelBoyVendor",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        if (response[0].Type == "Success") {
                            SuccessAlert(response[0].Title, response[0].Message);
                            loadDeliveryBoydetails();
                        }
                        else if (response[0].Type == "Warning") {
                            WarningAlert(response[0].Title, response[0].Message)
                        }
                        else if (response[0].Type == "Error") {
                            ErrorAlert(response[0].Title, response[0].Message)
                        }
                    }
                    else {
                        ErrorAlert(response[0].Title, response[0].Message)
                    }
                },
                error: function (response) {

                }
            });

        } else {


        }
    });
}
function viewDeliveryCharge(code) {

    swal({
        title: "Are you sure?",
        text: "Do you want to  display the delivery charges!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes, Display it!",
    }, function (isConfirm) {
        if (isConfirm) {
            var data = new FormData();
            data.append("Id", code);
           // data.append("Veh_type", '');
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/DeliveryBoy/ViewDeliveryCharge",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        $('#DeliveryBoyCharge-Modal').modal('show');
                        $.each(response, function (i, vari) {
                           // alert(vari.Id);
                            if (code == vari.Delivery_Boy_ID) {
                                //alert(vari.Delivery_Boy_ID)
                                
                                $('#txtDelId').val(vari.Delivery_Boy_ID);
                                $('#txtId').val(vari.Id);
                                //$('#txtvehType').val(vari.Vehicle_Type);
                                $('#txtMin_Delivery_Charge').val(vari.Min_Delivery_Charge);
                                $('#txtMin_Delivery_Charge1').val(vari.Min_Delivery_Charge12);
                                $('#txtMax_KM_Per_Min_Del_chg').val(vari.Max_KM_Per_Min_Del_chg);
                                $('#txtMax_KM_Per_Min_Del_chg1').val(vari.Max_KM_Per_Min_Del_chg1);
                                $('#txtPer_KM_AdditionalCharge').val(vari.Per_KM_AdditionalCharge);
                                $('#txtPer_KM_AdditionalCharge1').val(vari.Per_KM_AdditionalCharge1);

                                $('#txtMax_Weight_Per_Min_Del_chg').val(vari.Max_Weight_Per_Min_Del_chg13);
                                $('#txtMax_Weight_Per_Min_Del_chg1').val(vari.Max_Weight_Per_Min_Del_chg1);

                                $('#txtAddional_Charge_Per_Weight').val(vari.Addional_Charge_Per_Weight);
                                $('#txtAddional_Charge_Per_Weight1').val(vari.Addional_Charge_Per_Weight1);

                                $('#txtMin_ORDER_VALUE_FREE_DEL').val(vari.Min_ORDER_VALUE_FREE_DEL2);
                                $('#txtMin_ORDER_VALUE_FREE_DEL1').val(vari.Min_ORDER_VALUE_FREE_DEL21);
                                $('#txtMax_ORDER_KG').val(vari.Max_ORDER_KG);
                                $('#txtMax_ORDER_KG1').val(vari.Max_ORDER_KG1);
                                //if (response[0].Type == "Success") {
                                //    SuccessAlert(response[0].Title, response[0].Message);

                                //}
                                //else if (response[0].Type == "Warning") {
                                //    WarningAlert(response[0].Title, response[0].Message)
                                //}
                                //else if (response[0].Type == "Error") {
                                //    ErrorAlert(response[0].Title, response[0].Message)
                                //}
                            }
                        });
                    }
                    else {
                      //  ErrorAlert(response[0].Title, response[0].Message)
                    }
                },
                error: function (response) {

                }
            });

        } else {


        }
    });
}
function saveDeliveryCharge() {
    // alert($("#ddlvendorsubtype").val());
    var data = new FormData();
    //data.append("Vendor_Type_Id", GetURLParameter('vid'));
    data.append("Min_Delivery_Charge", $.trim($('#txtMin_Delivery_Charge').val()));

    data.append("Max_KM_Per_Min_Del_chg", $.trim($('#txtMax_KM_Per_Min_Del_chg').val()));
    data.append("Per_KM_AdditionalCharge", $.trim($('#txtPer_KM_AdditionalCharge').val()));
    data.append("Max_Weight_Per_Min_Del_chg", $.trim($('#txtMax_Weight_Per_Min_Del_chg').val()));
    data.append("Addional_Charge_Per_Weight", $.trim($('#txtAddional_Charge_Per_Weight').val()));
    data.append("Min_ORDER_VALUE_FREE_DEL", $.trim($('#txtMin_ORDER_VALUE_FREE_DEL').val()));
    data.append("Max_ORDER_KG", $.trim($('#txtMax_ORDER_KG').val()));
    data.append("Vehicle_Type", $.trim($('#ddltypeofveh').val()));

    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/DeliveryBoy/saveDeliveryCharge",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                $('#DeliveryBoyCharge-Modal').modal('hide');
                resetDeliveryCharge();
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
function UpdateDeliveryCharge() {
    // alert($("#ddlvendorsubtype").val());
    var data = new FormData();
    //data.append("Vendor_Type_Id", GetURLParameter('vid'));
    data.append("Id", $.trim($('#txid').val()));
    data.append("Delivery_Boy_ID", $.trim($('#txtDelId').val())); 
    //data.append("Veh_typ", $.trim($('#txtvehType').val()));
    data.append("Veh_typ", '');
    data.append("Min_Delivery_Charge", $.trim($('#txtMin_Delivery_Charge').val()));
    data.append("Min_Delivery_Charge1", $.trim($('#txtMin_Delivery_Charge1').val()));

    data.append("Max_KM_Per_Min_Del_chg", $.trim($('#txtMax_KM_Per_Min_Del_chg').val()));
    data.append("Max_KM_Per_Min_Del_chg1", $.trim($('#txtMax_KM_Per_Min_Del_chg1').val()));

    data.append("Per_KM_AdditionalCharge", $.trim($('#txtPer_KM_AdditionalCharge').val()));
    data.append("Per_KM_AdditionalCharge1", $.trim($('#txtPer_KM_AdditionalCharge1').val()));

    data.append("Max_Weight_Per_Min_Del_chg", $.trim($('#txtMax_Weight_Per_Min_Del_chg').val()));
    data.append("Max_Weight_Per_Min_Del_chg1", $.trim($('#txtMax_Weight_Per_Min_Del_chg1').val()));

    data.append("Addional_Charge_Per_Weight", $.trim($('#txtAddional_Charge_Per_Weight').val()));
    data.append("Addional_Charge_Per_Weight1", $.trim($('#txtAddional_Charge_Per_Weight1').val()));

    data.append("Min_ORDER_VALUE_FREE_DEL", $.trim($('#txtMin_ORDER_VALUE_FREE_DEL').val()));
    data.append("Min_ORDER_VALUE_FREE_DEL1", $.trim($('#txtMin_ORDER_VALUE_FREE_DEL1').val()));

    data.append("Max_ORDER_KG", $.trim($('#txtMax_ORDER_KG').val()));
    data.append("Max_ORDER_KG1", $.trim($('#txtMax_ORDER_KG1').val()));

    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/DeliveryBoy/UpdateDeliveryChargevendor",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                $('#DeliveryBoyCharge-Modal').modal('hide');
                resetDeliveryCharge();
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message);
                //$('#btnVendorPackageSave').prop('disabled', false);
                $('#DeliveryBoyCharge-Modal').modal('hide');
                resetDeliveryCharge();
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


function viewDeliveryBoydetail(code) {
    swal({
        title: "Are you sure?",
        text: "Do you want to View the data!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes, View it!",
    }, function (isConfirm) {
        if (isConfirm) {
            var data = new FormData();
            data.append("Id", code);
            // data.append("Id", GetURLParameter('vid'));
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                //url: "/VendorProduct/ProductCategoryView",
                url: "/DeliveryBoy/DeliveryBoyView1",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        //$('#btnVendorCategoryUpdate').show();
                        //$('#btnvendorProductCategorySave').hide();
                        //$('#btnRequestApprove').hide();
                        //$('#btnRequestReject').hide();

                        $('#DeliveryBoy-Modal').modal('show');
                        $.each(response, function (i, vari) {
                            if (vari.DeliveryBoyImgURL != "" && vari.DeliveryBoyImgURL != null) {
                                $('#txtphoto1').val(vari.DeliveryBoyImgURL);
                                $('#image1').attr('src', vari.DeliveryBoyImgURL);
                                $('#photo1').prop("required", false);
                            }
                            else {
                                $('#txtphoto1').val("");
                                $('#image1').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
                                $('#photo1').prop("required", true);
                            }
                            //$('#ddlvendortype').val(vari.Vendor_typeId);
                            //loadvendorsubtype(vari.Vendor_typeId, vari.Vendor_Sub_typeId);
                            // loadVendorType()(vari.Vendor_typeId, vari.Vendor_Sub_typeId);
                            //loadservicesbymaincategory(vari.Package_Main_Category_Id, vari.Package_Main_Service_Id);
                            // loadsubservicebyservice(vari.Package_Main_Category_Id, vari.Package_Main_Service_Id, vari.Package_Sub_Service_Id);


                            $('#txtname').val(vari.Name);
                            $('#txtdofb').val(vari.DOB);
                            $('#txtaddress').val(vari.Address);
                            $('#txtgender').val(vari.Gender);
                            $('#txtemail').val(vari.Email);
                            $('#txtphone').val(vari.Phone);
                            $('#ddlcountry').val(vari.DeliverBoy_Country);
                            //$('#ddlstate').val(vari.DeliverBoy_State);
                            loadstatedetails(vari.DeliverBoy_Country, vari.DeliverBoy_State)
                            loadcitydetails(vari.DeliverBoy_State, vari.DeliverBoy_City);
                            var selectedValues = vari.Workingdays.split(',');
                            $.each(selectedValues, function (i, result) {
                                //$("input[name='chkholiday'][value='" + selectedValues[i] + "']").prop('checked', false);
                                $("input[name='chkholiday'][value='" + selectedValues[i] + "']").prop('checked', 'checked');
                            });
                            $("#txtproof1").val(vari.Documents1);
                            $("#txtproof2").val(vari.Documents2);
                            $("#txtproof3").val(vari.Documents3);
                            $("#txtproof4").val(vari.Documents4);
                            if (vari.Documents1 != "") {
                                $('#proof1').hide();
                                $('#proof1').prop('required', false);
                                $('#btnproof1download').show();
                                $('#btnproof1remove').show();
                                $('#btnproof1download').unbind().click(function () {
                                    var iframe = "<iframe width='100%' height='100%' src='" + vari.Documents1 + "'></iframe>"
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
                            if (vari.Documents2 != "") {
                                $('#proof2').hide();
                                $('#btnproof2download').show();
                                $('#btnproof2remove').show();
                                $('#btnproof2download').unbind().click(function () {
                                    var iframe = "<iframe width='100%' height='100%' src='" + vari.Documents2 + "'></iframe>"
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
                            if (vari.Documents3 != "") {
                                $('#proof3').hide();
                                $('#btnproof3download').show();
                                $('#btnproof3remove').show();
                                $('#btnproof3download').unbind().click(function () {
                                    var iframe = "<iframe width='100%' height='100%' src='" + vari.Documents3 + "'></iframe>"
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
                            if (vari.Documents4 != "") {
                                $('#proof4').hide();
                                $('#btnproof4download').show();
                                $('#btnproof4remove').show();
                                $('#btnproof4download').unbind().click(function () {
                                    var iframe = "<iframe width='100%' height='100%' src='" + vari.Documents4 + "'></iframe>"
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
                            $('#txtbankname').val(vari.BankName);
                            $('#txtaccountnumber').val(vari.AccountNumber);
                            $('#txtifsccode').val(vari.IFSC_Code);
                            $('#ddltypeofveh').val(vari.VehicleType);
                            $('#txtvehicleDescription').val(vari.VehicleDescription);

                            //$('input:radio[name=homeservice]').filter('[value="' + vari.Package_Home_Service + '"]').attr('checked', true);
                            $('#txtProductDiscripation').val(vari.ProductCategoryDescription);
                            $('#ddlProductStatus').val(vari.ProductCategoryStatus);

                            $('#txtworkinghoursfrom').val(vari.Hoursfrom);
                            $('#txtworkinghoursto').val(vari.Hoursto);
                            $('#txtworkinghoursfrom1').val(vari.Hoursfrom1);
                            $('#txtworkinghoursto1').val(vari.Hoursto1);
                            $('#ddltypeofslot').val(vari.Typeofslot);
                            $('#ddltypeofslotgap').val(vari.Slotgap);
                            viewDeliveryboy(code);

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

function viewDeliveryboy(code) {
    var data = new FormData();
    data.append("id", code);
    $('#deliveryboytimeslot').html('');
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/DeliveryBoy/loadslot1",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var tableData = $('#deliveryboytimeslot');
                $.each(response, function (i, vari) {
                    tableData.append($('<tr></tr>')
                        .append($('<td  style ="width: 60px;height: 25px;"></td>')
                            //.append(vari.SlotName))
                            .append(i + 1))
                        .append($('<td  style ="width: 42px;height: 25px;"></td>'))
                        .append($('<td  style ="width: 300px;height: 25px;"></td>')
                            .append(vari.SlotTime))
                    )


                });
            }
        },
        error: function (response) {

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