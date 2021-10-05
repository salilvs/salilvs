$(function () {
    loadvendors();
    loadcustomers();
    $('input.thresold-i').maxlength();
    $('#ddlvendors,#ddlcustomers,#ddlemployee').select2();
    $('#ddlvendors').change(function () {
        var vendorId = $('#ddlvendors').val();
        loademployees(vendorId);
    });
    loadnotificationlist();
    $('#btnempSave').unbind().click(function () {
        $('#btnempSave').prop('disabled', true);
        if ($('#notificationemployeeform').parsley().validate() !== true) {
            $('#btnempSave').prop('disabled', false);
        }
        else {
            sendNotification("Employee");
        }
    });
    $('#btncustSave').unbind().click(function () {
        $('#btncustSave').prop('disabled', true);
        if ($('#notificationcustomerform').parsley().validate() !== true) {
            $('#btncustSave').prop('disabled', false);
        }
        else {
            sendNotification("Customer");
        }
    });
});
function resetNotification() {
    loadnotificationlist();
    loadvendors();
    loadcustomers();
    $('#notificationcustomerform').parsley().reset();
    $('#notificationemployeeform').parsley().reset();
    $('#notificationcustomerform').reset();
    $('#notificationemployeeform').reset();
}
function loadnotificationlist(code, date) {
    var data = new FormData();
    data.append("vendor_Id", code);
    data.append("from_Date", date);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Notification/loadnotificationlist",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_notificationlist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_notificationlist').DataTable({
                    data: dat,
                    responsive: true,
                    dom: 'Bfrtip',
                    buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                        { data: 'Name' },
                        { data: 'Notification_Title' },
                        { data: 'Notification_Description' },
                        { data: 'Notification_By' },
                        { data: 'Notification_Datetime' }
                    ]
                });
            }
            else {
                var table = $('#tbl_notificationlist').DataTable({ destroy: true });
                table.clear();
                table.destroy();
                $('#tbl_notificationlist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}

function loadvendors() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Notification/Vendor_List",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlvendors").html("");
                $("#ddlvendors").append('<option value="">Select Vendor</option>');
                $("#ddlvendors").append('<option value="All">All</option>');
                $.each(dat, function (j, vari) {
                    $("#ddlvendors").append("<option value='" + vari.Vendor_uniqueid + "'>" + vari.Vendor_Name + "</option>");
                });
            }
            else {
                $("#ddlvendors").html("");
                $("#ddlvendors").append('<option value="">No Record Found</option>');
            }
        },
        error: function (response) {

        }
    });
}
function loadcustomers() {

    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Notification/Customer_List",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlcustomers").html("");
                $("#ddlcustomers").append('<option value="">Select Customer</option>');
                $("#ddlcustomers").append('<option value="All-Customer">All</option>');
                $.each(dat, function (j, vari) {
                    $("#ddlcustomers").append("<option value='" + vari.Customer_uniqueid + "'>" + vari.Customer_Name + "</option>");
                });
            }
            else {
                $("#ddlcustomers").html("");
                $("#ddlcustomers").append('<option value="">No Record Found</option>');
            }
        },
        error: function (response) {

        }
    });
}
function loademployees(vendorId) {
    if (vendorId == "All") {
        $("#ddlemployee").html("");
        $("#ddlemployee").append('<option value="">Select Vendor Employee</option>');
        $("#ddlemployee").append('<option value="All-Employee">All</option>');
    }
    else {
        var data = new FormData();
        data.append("vendor_Id", vendorId);
        $.ajax({
            type: "Post",
            contentType: "application/json;charset=utf-8",
            url: "/Notification/Vendor_Employee_List",
            dataType: "json",
            data: data,
            contentType: false,
            processData: false,
            success: function (response) {
                var dat = response;
                if (dat.length > 0) {
                    $("#ddlemployee").html("");
                    $("#ddlemployee").append('<option value="">Select Vendor Employee</option>');
                    $("#ddlemployee").append('<option value="All-Employee">All</option>');
                    $.each(dat, function (j, vari) {
                        $("#ddlemployee").append("<option value='" + vari.Vendor_Employee_Uniqueid + "'>" + vari.Vendor_Employee_Name + "</option>");
                    });
                }
                else {
                    $("#ddlemployee").html("");
                    $("#ddlemployee").append('<option value="">No Record Found</option>');
                }
            },
            error: function (response) {

            }
        });
    }
}
function sendNotification(For) {
    var data = new FormData();
    if (For == "Customer") {
        data.append("senderslist", $.trim($('#ddlcustomers').val()));
        data.append("notificationTitle", $.trim($('#txtcustnotificationtitle').val()));
        data.append("notificaitionDescription", $.trim($('#txtcustnotificationdescription').val()));
    }
    else {
        data.append("senderslist", $.trim($('#ddlemployee').val()));
        data.append("notificationTitle", $.trim($('#txtempnotificationtitle').val()));
        data.append("notificaitionDescription", $.trim($('#txtempnotificationdescription').val()));
    }
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Notification/sendNotification",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (responce) {
            var dat = responce;
            if (dat.length > 0) {
                if (responce[0].Type == "Success") {
                    SuccessAlert(responce[0].Title, responce[0].Message);
                    $('#btncustSave').prop('disabled', false);
                    $('#btnempSave').prop('disabled', false);
                }
                else if (responce == "Warning") {
                    WarningAlert(responce[0].Title, responce[0].Message);
                }
                else {
                    ErrorAlert(responce[0].Title, responce[0].Message);
                }
            }
        },
        error: function (responce) {
            var title = "Opps! somthing wents wrong";
            var content = "Some issues found on server side.";
            ErrorAlert(title, content);
            $('#btnSave').prop('disabled', false);
        }
    });
}
