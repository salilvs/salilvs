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

    $("#txtfrom").datetimepicker({
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
        $('#txtto').data("DateTimePicker").minDate(e.date)
    });


    $("#txtto").datetimepicker({
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
    confirmAppointmentdetails();
    $('#btnSearch').unbind().click(function () {
        searchconfirmAppointment();
    });
  
    $('#btnComplete').unbind().click(function () {
            updateconfirmAppointment();
    });

    $('#btnconReschedule').unbind().click(function () {
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
        RescheduleconfirmAppointment();
    }
    });
    $('#btnconCancel').unbind().click(function () {
        cancelconfirmAppointment();
    });
});
//First display for Confirm appointment
function confirmAppointmentdetails() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        //  url: "/AppointmentManagement/pendingAppointmentdetails",
        url: "/AppointmentManagement/confirmedAppointmentdet",
        dataType: "json",
        success: function (response) {
            
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_confirmedgAppointmentlist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_confirmedgAppointmentlist').DataTable({
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
                                return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "View" onclick="viewconfirmedAppointmentdetails(\'' + code + '\')" ><i class="feather icon-edit"></i></button></td>';

                            }
                        }
                    ]
                });
            }
            else {
                var table = $('#tbl_confirmedgAppointmentlist').DataTable({ destroy: true });
                table.clear();
                table.destroy();

                $('#tbl_confirmedgAppointmentlist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
//Search for Confirm appointment between fromdate and todate
function searchconfirmAppointment() {
    var data = new FormData();
    data.append("from_date", $.trim($("#txtfrom").val()));
    data.append("to_date", $.trim($("#txtto").val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        //  url: "/AppointmentManagement/pendingAppointmentdetails",
        url: "/AppointmentManagement/searchconfirmedAppointment",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_confirmedgAppointmentlist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_confirmedgAppointmentlist').DataTable({
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
                                return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "View" onclick="viewconfirmedAppointmentdetails(\'' + code + '\')" ><i class="feather icon-edit"></i></button></td>';

                            }
                        }
                    ]
                });
            }
            else {
                var table = $('#tbl_confirmedgAppointmentlist').DataTable({ destroy: true });
                table.clear();
                table.destroy();

                $('#tbl_confirmedgAppointmentlist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
//for View Confirmed Appointment by appointmentId
function viewconfirmedAppointmentdetails(code) {

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
            //alert(code);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/AppointmentManagement/LoadConfirmedAppointmentId",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        $('#btnComplete').show();
                        $('#btnReschedule').show();
                        $('#btnCancel').show();
                        $('#Confirmed-Appointment-Modal').modal('show');
                        $.each(response, function (i, vari) {
                            $('#txtconvendorname').val(vari.Vendor_Name);
                            $('#txtconvendoremployee').val(vari.Vendor_Employee_Name);
                            $('#txtconvendorphone').val(vari.Vendor_Employee_Phone);
                            $('#txtconcustomername').val(vari.Customer_Name);
                            $('#txtconcustomerphone').val(vari.Customer_Phone);
                            $('#txtconcustomerEmail').val(vari.Customer_Email);
                            $('#txtconpackagename').val(vari.Package_Name);
                            $('#txtconpackagerate').val(vari.Package_Rate);
                            $('#txtconappointmentdate').val(vari.Appointment_Date);
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
//for Update Confirmed Appointment to Completed  using appointmentId
function updateconfirmAppointment() {
   
       $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/AppointmentManagement/UpdateConfirmAppointment",
        dataType: "json",
        //data: data,
        //contentType: false,
        //processData: false,
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
//for Reschedule Confirmed Appointment 
function RescheduleconfirmAppointment() {
    var data = new FormData();
    data.append("rescheduledate", $.trim($('#txtcondate').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/AppointmentManagement/RescheduleConfirmAppointment",
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
//for Cancel Confirmed Appointment   using appointmentId
function cancelconfirmAppointment() {

    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/AppointmentManagement/cancelConfirmAppointment",
        dataType: "json",
        //data: data,
        //contentType: false,
        //processData: false,
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