$(function () {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;

    $("#txtpfrom").datetimepicker({
        // Formats
        format: 'YYYY-MM-DD',
        sideBySide: true,
        icons:
        {
            next: 'fa fa-angle-right',
            previous: 'fa fa-angle-left'
        },
        maxDate: today,

    }).on('dp.change', function (e) {
        $('#txtpto').data("DateTimePicker").minDate(e.date)
    });


    $("#txtpto").datetimepicker({
        // Formats
        format: 'YYYY-MM-DD',
        sideBySide: true,
        icons:
        {
            next: 'fa fa-angle-right',
            previous: 'fa fa-angle-left'
        },
        maxDate: today,

    });

    //$('#txtfrmTime').datetimepicker({
    //    format: "HH:mm"
    //});
    //$('#txttoTime').datetimepicker({
    //    format: "HH:mm"
    //});
    pendingAppointmentdetails();
    $('#btnpSearch').unbind().click(function () {
        searchpendingAppointment();
    });

    $('#btnConfirm').unbind().click(function () {
            updatependingAppointment();
    });
    $('#btnReschedule').unbind().click(function () {
        $('#Reschedule-ConfirmedAppointment-Modal').modal("show");
    });
    $("#txtcondate").datetimepicker({
        // Formats
        format: 'YYYY-MM-DD hh:mm:ss',
        icons:
        {
            next: 'fa fa-angle-right',
            previous: 'fa fa-angle-left'
        },
        minDate: new Date(),
    });
    $('#btnRescheduleConSubmit').unbind().click(function () {
        event.preventDefault();
        $('#btnRescheduleConSubmit').prop('disabled', true);
        if ($('#rescheduleconfirmedAppointmentform').parsley().validate() !== true) {
            $('#btnRescheduleConSubmit').prop('disabled', false);
        }
        else {
            ReschedulependingAppointment();
        }
    });
    $('#btnCancel').unbind().click(function () {
        cancelpendingAppointment();
    });


    /// For ALl other tab click event initialization
    $('#Pending-tab').unbind().click(function () {
        //var url = "../webapp/assets/js/pages/admin/appointmentManagement.js";
        var url = "../assets/js/pages/admin/appointmentManagement.js";
        $.getScript(url, function () {
            console.log("Pending Appointment loaded");
        });
    });
  
    $('#Confirmed-tab').unbind().click(function () {
        var url = "../assets/js/page/admin/confirmAppointment.js";
        $.getScript(url, function () {
            console.log("Confirm Appointment loaded");
        });
    });
    $('#Approve-tab').unbind().click(function () {
        var url = "../assets/js/page/admin/approveAppointment.js";
        $.getScript(url, function () {
            console.log("Confirm Appointment loaded");
        });
    });
    $('#CancellationRequest-tab').unbind().click(function () {
        var url = "../assets/js/page/admin/cancellationAppointment.js";
        $.getScript(url, function () {
            console.log("Confirm Appointment loaded");
        });
    });
    $('#RescheduleRequest-tab').unbind().click(function () {
        var url = "../assets/js/page/admin/RescheduleAppointment.js";
        $.getScript(url, function () {
            console.log("Confirm Appointment loaded");
        });
    });
    $('#Completed-tab').unbind().click(function () {
        var url = "../assets/js/page/admin/CompleteAppointment.js";
        $.getScript(url, function () {
            console.log("Confirm Appointment loaded");
        });
    });
    $('#MissedBooking-tab').unbind().click(function () {
        var url = "../assets/js/page/admin/MissedBookingAppointment.js";
        $.getScript(url, function () {
            console.log("Confirm Appointment loaded");
        });
    });
});
//First display for pending appointment
function pendingAppointmentdetails() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/AppointmentManagement/pendingAppointmentdet",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_pendingAppointmentlist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_pendingAppointmentlist').DataTable({
                    data: dat,
                    autoWidth: true,
                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                        { data: 'Customer_Name' },
                        { data: 'Vendor_Name' },
                        { data: 'Package_Name' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var code = row.Appointment_Id;
                                return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "View" onclick="viewpendingAppointmentdetails(\'' + code + '\')" ><i class="feather icon-edit"></i></button></td>';
                               
                            }
                        }
                    ]
                });
            }
            else {
                var table = $('#tbl_pendingAppointmentlist').DataTable({ destroy: true });
                table.clear();
                table.destroy();

                $('#tbl_pendingAppointmentlist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
//for View pending Appointment by appointmentId
function viewpendingAppointmentdetails(code) {

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
            data.append("appointment_Id", code);
           // alert(code);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                //url: "/Subscription/LoadSubscriptionDetails",
                //url: "/AppointmentManagement/LoadPendingAppointmentById",
                url: "/AppointmentManagement/LoadPendingAppointmentId",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        $('#btnConfirm').show();
                        $('#btnReschedule').show();
                        $('#btnCancel').show();
                        $('#Pending-Appointment-Modal').modal('show');
                        $.each(response, function (i, vari) {
                            $('#txtvendorname').val(vari.Vendor_Name);
                            $('#txtvendoremployee').val(vari.Vendor_Employee_Name);
                            $('#txtvendorphone').val(vari.Vendor_Employee_Phone);
                            $('#txtcustomername').val(vari.Customer_Name);
                            $('#txtcustomerphone').val(vari.Customer_Phone);
                            $('#txtcustomerEmail').val(vari.Customer_Email);
                            $('#txtpackagename').val(vari.Package_Name);
                            $('#txtpackagerate').val(vari.Package_Rate);
                            $('#txtappointmentdate').val(vari.Appointment_Date);
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
//Search for pending appointment between fromdate and todate
function searchpendingAppointment() {
    var data = new FormData();
    data.append("from_date", $.trim($("#txtpfrom").val()));
    data.append("to_date", $.trim($("#txtpto").val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        //  url: "/AppointmentManagement/pendingAppointmentdetails",
        url: "/AppointmentManagement/searchpendingAppointment",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_pendingAppointmentlist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_pendingAppointmentlist').DataTable({
                    data: dat,
                    autoWidth: true,
                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                        { data: 'Customer_Name' },
                        { data: 'Vendor_Name' },
                        { data: 'Package_Name' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var code = row.Appointment_Id;
                                return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "View" onclick="viewpendingAppointmentdetails(\'' + code + '\')" ><i class="feather icon-edit"></i></button></td>';

                            }
                        }
                    ]
                });
            }
            else {
                var table = $('#tbl_pendingAppointmentlist').DataTable({ destroy: true });
                table.clear();
                table.destroy();

                $('#tbl_pendingAppointmentlist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
//Update confirm for the pending Appointment
function updatependingAppointment() {
        $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/AppointmentManagement/UpdatePendingAppointment",
            dataType: "json",
            success: function (response) {
                if (response[0].Type == "Success") {
                    SuccessAlert(response[0].Title, response[0].Message);
                    $('#Pending-Appointment-Modal').modal('hide');
                    //resetemployee();
                }
                else if (response[0].Type == "Warning") {
                    WarningAlert(response[0].Title, response[0].Message);
                    $('#btnConfirm').prop('disabled', false);
                }
                else if (response[0].Type == "Error") {
                    ErrorAlert(response[0].Title, response[0].Message);
                    $('#btnConfirm').prop('disabled', false);
                }
                else {
                    var content = "Invalid";
                    var title = "Invalid username or password.";
                    ErrorAlert(title, content);
                }
            },
        error: function (response) {
            //alert(response);
        }
    });
}

//for Reschedule Pending Appointment 
function ReschedulependingAppointment() {
    var data = new FormData();
    data.append("rescheduledate", $.trim($('#txtcondate').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/AppointmentManagement/ReschedulePendingAppointment",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                $('#Reschedule-ConfirmedAppointment-Modal').modal('hide');
                //resetemployee();
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message);
                $('#btnConfirm').prop('disabled', false);
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                $('#btnConfirm').prop('disabled', false);
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
//for Cancel Pending Appointment   using appointmentId
function cancelpendingAppointment() {

    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/AppointmentManagement/cancelPendingAppointment",
        dataType: "json",
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                $('#Confirmed-Appointment-Modal').modal('hide');
                //resetemployee();
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message);
                $('#btnComplete').prop('disabled', false);
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                $('#btnComplete').prop('disabled', false);
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