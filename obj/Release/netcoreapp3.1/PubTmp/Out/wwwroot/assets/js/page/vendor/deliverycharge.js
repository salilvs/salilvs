$(function () {
    $('#btnDelChargeSave').unbind().click(function () {
        event.preventDefault();
        $('#btnDelChargeSave').prop('disabled', false);
        if ($('#deliverychargeform').parsley().validate() !== true) {
            $('#btnDelChargeSave').prop('disabled', false);
        }
        else {
            $('#btnDelChargeSave').prop('disabled', true);
            saveDeliveryCharge();
        }
    });
    loadDeliveryCharge();
    $('#btnUpdateChanges').unbind().click(function () {
        event.preventDefault();
        //$('#btnUpdateChanges').prop('disabled', false);
        if ($('#deliverychargeform1').parsley().validate() !== true) {
            //$('#btnUpdateChanges').prop('disabled', false);
        }
        else {
            $('#btnUpdateChanges').prop('disabled', true);
            UpdateDeliveryCharge();
        }
    });
});
function resetDeliveryCharge() {
    loadDeliveryCharge();
    $('#deliverychargeform').parsley().reset();
    $('#deliverychargeform')[0].reset();
    $('#deliverychargeform1').parsley().reset();
    $('#deliverychargeform1')[0].reset();
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
    //data.append("Vehicle_Type", $.trim($('#ddltypeofveh').val()));

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

function loadDeliveryCharge() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        //url: "/VendorProduct/LoadproductCategory",
        url: "/DeliveryBoy/LoadDeliveryCharge",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_deliverycharge').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_deliverycharge').DataTable({
                    data: dat,
                    autoWidth: true,
                    responsive: true,
                    //createdRow: function (row, data, dataIndex) {
                    //    // Set the data-status attribute, and add a class
                    //    $(row).find('td:eq(1)')
                    //        .addClass('Min_Delivery_Charge');
                    //    $(row).find('td:eq(3)')
                    //        .attr('data-field', 'Per_KM_AdditionalCharge');
                    //    $(row).find('td:eq(5)')
                    //        .attr('data-field', 'Addional_Charge_Per_Weight');
                    //    $(row).find('td:eq(6)')
                    //        .attr('data-field', 'Min_ORDER_VALUE_FREE_DEL');
                    //    $(row).find('td:eq(7)')
                    //        .attr('data-field', 'Max_ORDER_KG');
                    //},


                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 2;
                            }
                        },
                        { data: 'Min_Delivery_Charge' },
                        { data: 'Max_KM_Per_Min_Del_chg' },
                        { data: 'Per_KM_AdditionalCharge' },
                        { data: 'Max_Weight_Per_Min_Del_chg' },
                        { data: 'Addional_Charge_Per_Weight' },
                        { data: 'Min_ORDER_VALUE_FREE_DEL' },
                        { data: 'Max_ORDER_KG' },
                        //{ data: 'Vehicle_Type' },
                        {

                            orderable: false,
                            render: function (data, type, row) {
                                var code = row.Id;
                                return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" data-vid=' + code + ' onclick="DeliveryCharge(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button></td>';
                            }
                        }
                        
                    ]
                });
            }
            else {
                $('#tbl_deliverycharge').DataTable();
            }
        },
        error: function (response) {

        }
    });
}

function DeliveryCharge(code) {

    swal({
        title: "Are you sure?",
        text: "Do you want to  Edit the delivery Charge!",
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
                url: "/DeliveryBoy/EditDeliveryCharge",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        $('#DeliveryBoyChargeEdit-Modal').modal('show');
                        $.each(response, function (i, vari) {
                            // alert(vari.Id);
                            if (code == vari.Id) {
                                $('#txtvehType1').val(vari.Vehicle_Type);
                                $('#txtMin_Delivery_Charge1').val(vari.Min_Delivery_Charge);
                                $('#txtMax_KM_Per_Min_Del_chg1').val(vari.Max_KM_Per_Min_Del_chg);
                                $('#txtPer_KM_AdditionalCharge1').val(vari.Per_KM_AdditionalCharge);
                                $('#txtMax_Weight_Per_Min_Del_chg1').val(vari.Max_Weight_Per_Min_Del_chg);
                                $('#txtAddional_Charge_Per_Weight1').val(vari.Addional_Charge_Per_Weight);
                                $('#txtMin_ORDER_VALUE_FREE_DEL1').val(vari.Min_ORDER_VALUE_FREE_DEL);
                                $('#txtMax_ORDER_KG1').val(vari.Max_ORDER_KG);
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
function UpdateDeliveryCharge() {
    // alert($("#ddlvendorsubtype").val());
    var data = new FormData();
    //data.append("Vendor_Type_Id", GetURLParameter('vid'));
    data.append("Id1", $.trim($('#txId1').val()));
    //data.append("Veh_typ", $.trim($('#txtvehType').val()));
    data.append("Min_Delivery_Charge", $.trim($('#txtMin_Delivery_Charge1').val()));
    data.append("Max_KM_Per_Min_Del_chg", $.trim($('#txtMax_KM_Per_Min_Del_chg1').val()));
    data.append("Per_KM_AdditionalCharge", $.trim($('#txtPer_KM_AdditionalCharge1').val()));
    data.append("Max_Weight_Per_Min_Del_chg", $.trim($('#txtMax_Weight_Per_Min_Del_chg1').val()));
    data.append("Addional_Charge_Per_Weight", $.trim($('#txtAddional_Charge_Per_Weight1').val()));
    data.append("Min_ORDER_VALUE_FREE_DEL", $.trim($('#txtMin_ORDER_VALUE_FREE_DEL1').val()));
    data.append("Max_ORDER_KG", $.trim($('#txtMax_ORDER_KG1').val()));


    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/DeliveryBoy/UpdateDeliveryCharge",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                $('#DeliveryBoyChargeEdit-Modal').modal('hide');
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