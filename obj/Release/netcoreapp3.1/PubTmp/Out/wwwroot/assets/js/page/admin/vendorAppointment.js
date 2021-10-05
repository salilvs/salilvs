$(function () {
    loadvendors();
    $('#ddlvendors').select2();
    $('#ddlvendors').change(function () {
        var id = $('#ddlvendors').val();
        var date = $('#txtfromDate').val();
        loadAppointmentlist(id, date);
    });
    loadAppointmentlist();
    $("#txtfromDate").datetimepicker({
        // Formats
        format: 'YYYY-MM-DD',
        icons:
        {
            next: 'fa fa-angle-right',
            previous: 'fa fa-angle-left'
        },
    });
    $('#txtfromDate').datetimepicker(
        {
            format: 'YYYY-MM-DD',
            icons:
            {
                next: 'fa fa-angle-right',
                previous: 'fa fa-angle-left'
            },
        }).on('dp.change', function (e) {
            var id = $('#ddlvendors').val();
            var date = $('#txtfromDate').val();
            loadAppointmentlist(id, date);
        });
});
function loadAppointmentlist(code, date) {
    var data = new FormData();
    data.append("vendor_Id", code);
    data.append("from_Date", date);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Appointments/loadAppointmentlist",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_appointmentslist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_appointmentslist').DataTable({
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
                        { data: 'Vendor_Name' },
                        { data: 'Vendor_Phone' },
                        { data: 'Customer_Name' },
                        { data: 'Customer_Address' },
                        { data: 'Customer_Email' },
                        { data: 'Customer_Phone' },
                        { data: 'Customer_Booking_Id' },
                        { data: 'Appointment_Date' },
                        { data: 'Booking_Date' },
                        { data: 'Booking_Time' },
                        { data: 'Package_Name' },
                        { data: 'Employee_Name' },
                        { data: 'Total_Amount' },
                        { data: 'Payment_Type' },
                        { data: 'Payment_Status' },
                        { data: 'Booking_Status' },
                        { data: 'Cancel_Reason' },
                        { data: 'Refunded_by' },
                        { data: 'Refunded_Date' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var code = row.Customer_Booking_Id;
                                var paymenttype = row.Payment_Type;
                                var paymentstat = row.Payment_Status;
                                var bookingstat = row.Booking_Status;
                                if (paymenttype.toUpperCase() == ("Card").toUpperCase()) {
                                    if (paymentstat.toUpperCase() == ("Paid").toUpperCase()) {
                                        if (bookingstat.toUpperCase() != ("Completed").toUpperCase()) {
                                            return '<td><button type="button" class="btn btn-danger btn-outline-danger" title = "Refund" onclick="refund(\'' + code + '\')" >Refund</button></td>';
                                        }
                                        else {
                                            return '<td><label class="label label-info">Nothing to perform</label></td>';
                                        }
                                    }
                                    else {
                                        return '<td><label class="label label-info">Nothing to perform</label></td>';
                                    }
                                }
                                else {
                                    return '<td><label class="label label-info">Nothing to perform</label></td>';
                                }
                            }
                        }
                    ]
                });
            }
            else {
                var table = $('#tbl_appointmentslist').DataTable({ destroy: true });
                table.clear();
                table.destroy();
                $('#tbl_appointmentslist').DataTable();
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
        url: "/VendorCreation/Loadvendordetails",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlvendors").html("");
                $("#ddlvendors").append('<option value="">Select Vendor</option>');
                $.each(dat, function (j, vari) {
                    $("#ddlvendors").append("<option value='" + vari.vendor_uniqueid + "'>" + vari.vendor_Name + "</option>");
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
function refund(code) {
    var data = new FormData();
    data.append("appointmentId", code);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Appointments/paymentRefund",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (responce) {
            var dat = responce;
            if (dat.length > 0) {
                if (responce[0].Type == "Success") {
                    SuccessAlert(responce[0].Title, responce[0].Message);
                    var id = $('#ddlvendors').val();
                    var date = $('#txtfromDate').val();
                    loadAppointmentlist(id, date);
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
