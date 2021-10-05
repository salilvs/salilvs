$(function () {

    $('input.thresold-i').maxlength()
    $("#txtduedate").datetimepicker({
        // Formats
        format: 'YYYY-MM-DD hh:mm:ss',
        icons:
        {
            next: 'fa fa-angle-right',
            previous: 'fa fa-angle-left'
        },
        minDate: new Date(),
    });
    loadvendor();
    //$(function () {
    //    $('#ddlvendor').select2();
    //});
    resetsubscription();
    $('#btnSave').unbind().click(function () {
        event.preventDefault();
        $('#btnSave').prop('disabled', true);
        if ($('#subscriptionform').parsley().validate() !== true) {
            $('#btnSave').prop('disabled', false);
        }
        else {
            savesubscriptiondetails();
        }
    });
    $('#btnUpdate').unbind().click(function () {
        event.preventDefault();
        $('#btnUpdate').prop('disabled', true);
        if ($('#subscriptionform').parsley().validate() !== true) {
            $('#btnUpdate').prop('disabled', false);
        }
        else {
            updatesubscriptiondetails();
        }
    });
    $('#btnClose,#btnReset').unbind().click(function () {
        resetsubscription();
    });

    $('#btnSubClose').unbind().click(function () {
     $('#tbl_subscriptionlistvendor').html('');
    });
    $('#btnRenew').unbind().click(function () {
        event.preventDefault();
        $('#btnRenew').prop('disabled', true);
        if ($('#subscriptionform').parsley().validate() !== true) {
            $('#btnRenew').prop('disabled', false);
        }
        else {
            renewsubscriptiondetails();
        }
    });
      
    
});
function loadvendor() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorCreation/LoadVendor",
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
//Save subscriptiondetails
function savesubscriptiondetails() {
    var data = new FormData();
    data.append("subscriptions_Type", $.trim($('#ddlsubscriptiontype').val()));
    data.append("subscriptions_Of", $.trim($('#ddlvendor').val()));
    data.append("subscriptions_Plan", $.trim($('#ddlsubscriptionplan').val()));
    data.append("subscriptions_Status", $.trim($('#ddlsubscriptionstatus').val()));
    data.append("subscriptions_Due_Date", $.trim($('#txtduedate').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Subscription/SaveSubscriptionDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                resetsubscription();
            }
            else if (response[0].type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message);
                $('#btnSave').prop('disabled', false);
            }
            else if (response[0].type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                $('#btnSave').prop('disabled', false);
            }
            else {
                var content = "Invalid";
                var title = "Invalid username or password.";
                ErrorAlert(title, content);
                $('#btnSave').prop('disabled', false);
            }
        },
        error: function (response) {

        }
    });
}
function renewsubscriptiondetails() {
    var data = new FormData();
    data.append("subscriptions_Type", $.trim($('#ddlsubscriptiontype').val()));
    data.append("subscriptions_Of", $.trim($('#ddlvendor').val()));
    data.append("subscriptions_Plan", $.trim($('#ddlsubscriptionplan').val()));
    data.append("subscriptions_Status", $.trim($('#ddlsubscriptionstatus').val()));
    data.append("subscriptions_Due_Date", $.trim($('#txtduedate').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Subscription/renewSubscriptionDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                resetsubscription();
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
                $('#btnSave').prop('disabled', false);
            }
        },
        error: function (response) {

        }
    });
}
function loadsubscriptiondetails() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Subscription/LoadSubscriptionDetails",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_subscriptionlist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_subscriptionlist').DataTable({
                    data: dat,
                    autoWidth: true,
                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                        //{ data: 'subscriptions_Type' },
                        { data: 'vendorname' },
                        { data: 'subscriptions_Plan' },
                        { data: 'subscriptions_Status' },
                        { data: 'subscriptions_Due_Date' },
                        //{ data: 'subscriptions_Created_By' },
                        //{ data: 'subscriptions_Created_Date' },
                        {
                            orderable: false,
                            render: function (data, type, row) {

                                if (row.subscriptions_Status == "cancel") {
                                    var vendorid = row.subscriptions_Of;
                                    return '<td>  <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "View" onclick="viewsubscription(\'' + vendorid + '\')" ><i class="feather icon-view"></i></button> </td>';
                                }
                                else {


                                    var code = row.subscription_Id;
                                    var vendorid = row.subscriptions_Of;
                                    /* <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewsubscriptiondetails(\'' + code + '\')" ><i class="feather icon-edit"></i></button> */
                                    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "View" onclick="viewsubscription(\'' + vendorid + '\')" ><i class="feather icon-view"></i></button>  <button type="button" class="btn btn-icon btn-outline-info" title = "Notify" onclick="sendNotification(\'' + vendorid + '\')" ><i class="feather icon-view"></i></button><button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "Cancel" onclick="cancelSubscription(\'' + vendorid + '\')" ><i class="feather icon-trash"></i></button></td>';
                                }
                            }
                        }
                    ]
                });
            }
            else {
                $('#tbl_subscriptionlist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
//send notification for remember the  subscription due date

function sendNotification(vendorid) {
    var data = new FormData();
    data.append("subscriptions_Of", vendorid);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Subscription/sendNotification",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.length > 0) {
                if (response[0].type == "Success") {
                    SuccessAlert(response[0].title, response[0].message);
                    resetsubscription();
                }
                else if (response[0].type == "Warning") {
                    WarningAlert(response[0].title, response[0].message)
                }
                else if (response[0].type == "Error") {
                    ErrorAlert(response[0].title, response[0].message)
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

//Cancel Subscription 


function cancelSubscription(vendorid) {
    swal({
        title: "Are you sure?",
        text: "Do you want to Cancel the Subscription of this vendor!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes, Cancel it!",
    }, function (isConfirm) {
        if (isConfirm) {

    var data = new FormData();
    data.append("subscriptions_Of", vendorid);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Subscription/cancelSubscription",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.length > 0) {
                if (response[0].type == "Success") {
                    SuccessAlert(response[0].title, response[0].message);
                    resetsubscription();
                }
                else if (response[0].type == "Warning") {
                    WarningAlert(response[0].title, response[0].message)
                }
                else if (response[0].type == "Error") {
                    ErrorAlert(response[0].title, response[0].message)
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
        } else {


        }
    });
}

//for edit
function viewsubscriptiondetails(code) {

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
            data.append("subscription_Id", code);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                //url: "/Subscription/LoadSubscriptionDetails",
                url: "/Subscription/LoadSubscriptionById",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        $('#btnUpdate').show();
                        $('#btnSave').hide();
                        $('#Subscription-Modal').modal('show');
                        $.each(response, function (i, vari) {
                            $('#ddlsubscriptiontype').val(vari.subscriptions_Type);
                            $('#ddlvendor').val(vari.subscriptions_Of);
                           // alert(vari.subscriptions_Plan);
                            $('#ddlsubscriptionplan').val(vari.subscriptions_Plan);
                            $('#ddlsubscriptionstatus').val(vari.subscriptions_Status);
                            $('#txtduedate').val(vari.subscriptions_Due_Date);
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
//for renew subscription
function renewsubscription(code) {

    swal({
        title: "Are you sure?",
        text: "Do you want to Renew the data!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes, Renew it!",
    }, function (isConfirm) {
        if (isConfirm) {
            var data = new FormData();
            data.append("subscription_Id", code);
          //  alert(code);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                //url: "/Subscription/LoadSubscriptionDetails",
                url: "/Subscription/renewSubscriptionById",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        $('#btnRenew').show();
                        $('#btnUpdate').hide();
                        $('#btnSave').hide();
                        $('#Subscription-Modal').modal('show');
                        $.each(response, function (i, vari) {
                            
                            $('#ddlsubscriptiontype').val(vari.subscriptions_Type);
                            $('#ddlvendor').val(vari.subscriptions_Of);
                            // alert(vari.subscriptions_Plan);
                            $('#ddlsubscriptionplan').val(vari.subscriptions_Plan);
                            $('#ddlsubscriptionstatus').val(vari.subscriptions_Status);
                            $('#txtduedate').val(vari.subscriptions_Due_Date);
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


//for view the particular vendor subscription details
function viewsubscription(vendorid) {

    swal({
        title: "Are you sure?",
        text: "Do you want to view the subscriptions!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes, View it!",
    }, function (isConfirm) {
        if (isConfirm) {
            var data = new FormData();
            data.append("subscriptions_Of", vendorid);
            //alert(vendorid);
           
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                //url: "/Subscription/LoadSubscriptionDetails",
                url: "/Subscription/LoadSubscriptionByvendorId",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        var vendorn = ""; var plan = "";
                        $.each(dat, function (j, vari) {
                             vendorn=vari.vendorname;
                            plan=vari.subscriptions_Plan;
                        });
                        var table = $('#tbl_subscriptionlistvendor').DataTable({ destroy: true });
                        table.destroy();
                       $('#VendorSubscription-Modal').modal('show');
                        $('#tbl_subscriptionlistvendor').append('<caption style="caption-side: top;font-size: 18px; color: brown;"> ' + vendorn + '-' + plan + ' Subscription Plan Details  </caption>');
                        $('#tbl_subscriptionlistvendor').DataTable({
                            data: dat,
                            autoWidth: true,
                            columns: [
                                {
                                    render: function (data, type, row, meta) {
                                        return meta.row + meta.settings._iDisplayStart + 1;
                                    }
                                },
                                //{ data: 'subscriptions_Type' },
                                //{ data: 'vendorname' },
                                //{ data: 'subscriptions_Plan' },
                                
                                { data: 'subscriptions_Updated_Date' },
                                { data: 'subscriptions_Status' },
                                { data: 'subscriptions_Due_Date' },
                              
                                { data: 'subscriptions_Created_By' },
                                { data: 'subscriptions_Created_Date' },
                                {
                                    orderable: false,
                                    render: function (data, type, row) {

                                        if (row.subscriptions_Status == "ongoing") {
                                            var code = row.subscription_Id;
                                            //alert(code);
                                            return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewsubscriptiondetails(\'' + code + '\')" ><i class="feather icon-edit"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Renew" onclick="renewsubscription(\'' + code + '\')" ><i class="feather icon-view"></i></button>';
                                        }
                                        else if (row.subscriptions_Status == "cancel") {
                                            //var code = row.subscription_Id;
                                            return '<td> </td>';
                                        }
                                        else
                                        {
                                            var code = row.subscription_Id;
                                       // var vendorid = row.subscriptions_Of;
                                        return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewsubscriptiondetails(\'' + code + '\')" ><i class="feather icon-edit"></i></button>';


                                        }
                                    }
                                }
                            ]
                        });
                    }
                },
                error: function (response) {

                }
            });

        } else {


        }
    });
}
    
        
   
function updatesubscriptiondetails() {
    var data = new FormData();
    data.append("subscriptions_Plan", $.trim($('#ddlsubscriptionplan').val()));
    data.append("subscriptions_Status", $.trim($('#ddlsubscriptionstatus').val()));
    data.append("subscriptions_Due_Date", $.trim($('#txtduedate').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
       // url: "/Subscription/LoadSubscriptionById",
        url: "/Subscription/UpdateSubscriptionDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                $('#Subscription-Modal').modal('hide');
                resetsubscription();
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message);
                $('#btnUpdate').prop('disabled', false);
            }
            else if (response[0].type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                $('#btnUpdate').prop('disabled', false);
            }
            else {
                var content = "Invalid";
                var title = "Server Error.";
                ErrorAlert(title, content);
                $('#btnUpdate').prop('disabled', false);
            }
        },
        error: function (response) {

        }
    });
}
 function resetsubscription()
 {
    loadsubscriptiondetails();
    loadvendor();
    $('#btnSave').prop('disabled', false);
    $('#btnUpdate').prop('disabled', false);
    $('#btnUpdate').hide();
    $('#btnRenew').prop('disabled', false);
    $('#btnRenew').hide();
    $('#btnSave').show();
    $('#subscriptionform').parsley().reset();
    $('#subscriptionform')[0].reset();
    $('#Subscription-Modal').modal('hide');
}