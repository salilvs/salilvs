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

    $("#txtresfrom").datetimepicker({
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
        $('#txtresto').data("DateTimePicker").minDate(e.date)
    });


    $("#txtresto").datetimepicker({
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
    rescheduleAppointmentdetails();
    $('#btnresSearch').unbind().click(function () {
        searchrescheduleAppointment();
    });


});
//First display for Confirm appointment
function rescheduleAppointmentdetails() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        //  url: "/AppointmentManagement/pendingAppointmentdetails",
        url: "/AppointmentManagement/rescheduleAppointment",
        dataType: "json",
        success: function (response) {

            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_rescheduleAppointmentlist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_rescheduleAppointmentlist').DataTable({
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
                                return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "View" onclick="viewrescheduleAppointmentdetails(\'' + code + '\')" ><i class="feather icon-edit"></i></button></td>';

                            }
                        }
                    ]
                });
            }
            else {
                var table = $('#tbl_rescheduleAppointmentlist').DataTable({ destroy: true });
                table.clear();
                table.destroy();

                $('#tbl_rescheduleAppointmentlist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
//Search for reschedule appointment between fromdate and todate
function searchrescheduleAppointment() {
    var data = new FormData();
    data.append("from_date", $.trim($("#txtresfrom").val()));
    data.append("to_date", $.trim($("#txtresto").val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        //  url: "/AppointmentManagement/pendingAppointmentdetails",
        url: "/AppointmentManagement/searchrescheduleAppointment",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_rescheduleAppointmentlist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_rescheduleAppointmentlist').DataTable({
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
                                return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "View" onclick="viewrescheduleAppointmentdetails(\'' + code + '\')" ><i class="feather icon-edit"></i></button></td>';

                            }
                        }
                    ]
                });
            }
            else {
                var table = $('#tbl_rescheduleAppointmentlist').DataTable({ destroy: true });
                table.clear();
                table.destroy();

                $('#tbl_rescheduleAppointmentlist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
//for View Confirmed Appointment by appointmentId
function viewrescheduleAppointmentdetails(code) {

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
            alert(code);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/AppointmentManagement/LoadRescheduleAppointmentId",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        $('#btnresConfirm').show();
                        $('#btnresCancel').show();
                        $('#Rescheduled-Appointment-Modal').modal('show');
                        $.each(response, function (i, vari) {
                            $('#txtresvendorname').val(vari.Vendor_Name);
                            $('#txtresvendoremployee').val(vari.Vendor_Employee_Name);
                            $('#txtresvendorphone').val(vari.Vendor_Employee_Phone);
                            $('#txtrescustomername').val(vari.Customer_Name);
                            $('#txtrescustomerphone').val(vari.Customer_Phone);
                            $('#txtrescustomerEmail').val(vari.Customer_Email);
                            $('#txtrespackagename').val(vari.Package_Name);
                            $('#txtrespackagerate').val(vari.Package_Rate);
                            $('#txtresappointmentdate').val(vari.Appointment_Date);
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