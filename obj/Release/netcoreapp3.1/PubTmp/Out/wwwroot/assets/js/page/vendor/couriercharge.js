$(function () {
    loadCourierCharge();
    $('#btnCourierChargeSave').unbind().click(function () {
        event.preventDefault();
        $('#btnCourierChargeSave').prop('disabled', false);
        if ($('#courierchargeform').parsley().validate() !== true) {
            $('#btnCourierChargeSave').prop('disabled', false);
        }
        else {
            $('#btnCourierChargeSave').prop('disabled', true);
            saveCourierCharge();
        }
    });

    $('#btnUpdateChanges').unbind().click(function () {
            UpdateCourierCharge();
    });

   
});



function UpdateCourierCharge() {
    // alert($("#ddlvendorsubtype").val());
    var data = new FormData();
    //data.append("Vendor_Type_Id", GetURLParameter('vid'));
    data.append("Id1", $.trim($('#txId1').val()));
    //data.append("Veh_typ", $.trim($('#txtvehType').val()));
    data.append("Min_Courier_Charge", $.trim($('#txtMin_Courier_Charge1').val()));
    data.append("Max_KM_Per_Min_Courier_chg", $.trim($('#txtMax_KM_Per_Min_Courier_chg1').val()));
    data.append("Per_KM_AdditionalCharge", $.trim($('#txtPer_KM_AdditionalCharge1').val()));
    data.append("Max_Weight_Per_Min_Courier_chg", $.trim($('#txtMax_Weight_Per_Min_Courier_chg1').val()));
    data.append("Addional_Charge_Per_Weight", $.trim($('#txtAddional_Charge_Per_Weight1').val()));
    data.append("Max_ORDER_KG", $.trim($('#txtMax_ORDER_KG1').val()));
    data.append("Company_Name", $.trim($('#txtCompany_name1').val()));
    data.append("Url", $.trim($('#txturl1').val()));
  

    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Courier/UpdateCourierCharge",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                $('#CourierChargeEdit-Modal').modal('hide');
                loadCourierCharge();
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message);
               // $('#btnVendorPackageSave').prop('disabled', false);
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                //$('#btnVendorPackageSave').prop('disabled', false);
            }
            else {
                var content = "Invalid";
                var title = "Invalid username or password.";
                ErrorAlert(title, content);
                //$('#btnVendorPackageSave').prop('disabled', false);
            }
        },
        error: function (response) {

        }
    });
}
function loadCourierCharge() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        //url: "/VendorProduct/LoadproductCategory",
        url: "/Courier/LoadCourierCharge",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_couriercharge').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_couriercharge').DataTable({
                    data: dat,
                    autoWidth: true,
                    responsive: true,
                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                        { data: 'Company_Name' },
                        { data: 'Min_Courier_Charge' },
                        { data: 'Max_KM_Per_Min_Courier_chg' },
                        { data: 'Per_KM_AdditionalCharge' },
                        { data: 'Max_Weight_Per_Min_Courier_chg' },
                        { data: 'Addional_Charge_Per_Weight' },
                        { data: 'Max_ORDER_KG' },
                        { data: 'Url' },
                        //{ data: 'Status' },

                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var stat = row.Status;
                                if (stat == "Active") {
                                    return '<span class="badge badge-pill badge-success">' + stat + '</span>';
                                }
                                else { return '<span class="badge badge-pill badge-danger">' + stat + '</span>'; }
                            }
                        },

                        {

                            orderable: false,
                            render: function (data, type, row) {
                                if (row.Status == "Active") {
                                    var code = row.Id;
                                    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" data-vid=' + code + ' onclick="CourierCharge(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="DeactivateCourier(\'' + code + '\')" ><i class="simple-icon-trash"></i></button></td>';
                                }
                                else {

                                    var code = row.Id;
                                    return '<td><button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Re Activate" onclick="reactivateCourier(\'' + code + '\')" ><i class="simple-icon-reload"></i></button></td>';
                                }
                            }
                        }

                    ]
                });
            }
            else {
                $('#tbl_couriercharge').DataTable();
            }
        },
        error: function (response) {

        }
    });
}

function DeactivateCourier(code) {
    swal({
        title: "Are you sure?",
        text: "Do you want to deactivate the details!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes",
    }, function (isConfirm) {
        if (isConfirm) {
            var data = new FormData();
            data.append("Id", code);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/Courier/DeactivateCourier",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response.length > 0) {
                        if (response[0].Type == "Success") {
                            SuccessAlert(response[0].Title, response[0].Message);
                            loadCourierCharge();
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

        } else {

        }
    });

}



function reactivateCourier(code) {

    swal({
        title: "Are you sure?",
        text: "Do you want to reactivate the Courier !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes",
    }, function (isConfirm) {
        if (isConfirm) {
            var data = new FormData();
            data.append("Id", code);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/Courier/reactivateCourier",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response.length > 0) {
                        if (response[0].Type == "Success") {
                            SuccessAlert(response[0].Title, response[0].Message);
                            loadCourierCharge();
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

        } else {

        }
    });

}



function CourierCharge(code) {

    swal({
        title: "Are you sure?",
        text: "Do you want to  Edit the Courier Charge!",
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
                url: "/Courier/EditCourierCharge",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        $('#CourierChargeEdit-Modal').modal('show');
                        $.each(response, function (i, vari) {
                            // alert(vari.Id);
                            if (code == vari.Id) {

                                $('#txtCompany_name1').val(vari.Company_Name);
                                $('#txtMin_Courier_Charge1').val(vari.Min_Courier_Charge);
                                $('#txtMax_KM_Per_Min_Courier_chg1').val(vari.Max_KM_Per_Min_Courier_chg);
                                $('#txtPer_KM_AdditionalCharge1').val(vari.Per_KM_AdditionalCharge);
                                $('#txtMax_Weight_Per_Min_Courier_chg1').val(vari.Max_Weight_Per_Min_Courier_chg);
                                $('#txtAddional_Charge_Per_Weight1').val(vari.Addional_Charge_Per_Weight);
                                $('#txtMax_ORDER_KG1').val(vari.Max_ORDER_KG);
                                $('#txturl1').val(vari.Url);
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

function saveCourierCharge() {
    // alert($("#ddlvendorsubtype").val());
    var data = new FormData();
    data.append("Vendor_ID", '');
    data.append("Company_Name", $.trim($('#txtCompany_name').val()));
    data.append("Min_Courier_Charge", $.trim($('#txtMin_Courier_Charge').val()));
    data.append("Max_KM_Per_Min_Courier_chg", $.trim($('#txtMax_KM_Per_Min_Courier_chg').val()));
    data.append("Per_KM_AdditionalCharge", $.trim($('#txtPer_KM_AdditionalCharge').val()));
    data.append("Max_Weight_Per_Min_Courier_chg", $.trim($('#txtMax_Weight_Per_Min_Courier_chg').val()));
    data.append("Addional_Charge_Per_Weight", $.trim($('#txtAddional_Charge_Per_Weight').val()));
   // data.append("Min_ORDER_VALUE_FREE_DEL", $.trim($('#txtMin_ORDER_VALUE_FREE_DEL').val()));
    data.append("Max_ORDER_KG", $.trim($('#txtMax_ORDER_KG').val()));
    data.append("Url", $.trim($('#txturl').val()));
    //data.append("Vehicle_Type", $.trim($('#ddltypeofveh').val()));

    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        //url: "/DeliveryBoy/saveDeliveryCharge",
        url: "/Courier/saveCourierCharge",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                $('#CourierCharge-Modal').modal('hide');
                //resetDeliveryCharge();
                loadCourierCharge();
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
                //$('#btnVendorPackageSave').prop('disabled', false);
            }
        },
        error: function (response) {

        }
    });
}