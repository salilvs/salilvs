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

    $("#txtmsfrom").datetimepicker({
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
        $('#txtmsto').data("DateTimePicker").minDate(e.date)
    });


    $("#txtmsto").datetimepicker({
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
    missedBookingAppointment();
    $('#btnmsSearch').unbind().click(function () {
        searchmissedBookingAppointment();
    });


});
//First display for Missed Booking appointment
function missedBookingAppointment() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        //  url: "/AppointmentManagement/pendingAppointmentdetails",
        url: "/AppointmentManagement/missedBookingAppointment",
        dataType: "json",
        success: function (response) {

            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_missedBookingAppointmentlist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_missedBookingAppointmentlist').DataTable({
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
                                return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "View" onclick="viewmissedBoookingAppointment(\'' + code + '\')" ><i class="feather icon-edit"></i></button></td>';

                            }
                        }
                    ]
                });
            }
            else {
                var table = $('#tbl_missedBookingAppointmentlist').DataTable({ destroy: true });
                table.clear();
                table.destroy();

                $('#tbl_missedBookingAppointmentlist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
//Search for Complete appointment between fromdate and todate
function searchmissedBookingAppointment() {
    var data = new FormData();
    data.append("from_date", $.trim($("#txtmsfrom").val()));
    data.append("to_date", $.trim($("#txtmsto").val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        //  url: "/AppointmentManagement/pendingAppointmentdetails",
        url: "/AppointmentManagement/searchmissedBookingAppointment",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_missedBookingAppointmentlist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_missedBookingAppointmentlist').DataTable({
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
                                return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "View" onclick="viewmissedBoookingAppointment(\'' + code + '\')" ><i class="feather icon-edit"></i></button></td>';

                            }
                        }
                    ]
                });
            }
            else {
                var table = $('#tbl_missedBookingAppointmentlist').DataTable({ destroy: true });
                table.clear();
                table.destroy();

                $('#tbl_missedBookingAppointmentlist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
//for View Missed Booking Appointment by appointmentId
function viewmissedBoookingAppointment(code) {

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
                url: "/AppointmentManagement/LoadmissedBookingAppointmentId",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        $('#MissedBooking-Appointment-Modal').modal('show');
                        $.each(response, function (i, vari) {
                            $('#txtmsvendorname').val(vari.Vendor_Name);
                            $('#txtmsvendoremployee').val(vari.Vendor_Employee_Name);
                            $('#txtmsvendorphone').val(vari.Vendor_Employee_Phone);
                            $('#txtmscustomername').val(vari.Customer_Name);
                            $('#txtmscustomerphone').val(vari.Customer_Phone);
                            $('#txtmscustomerEmail').val(vari.Customer_Email);
                            $('#txtmspackagename').val(vari.Package_Name);
                            $('#txtmspackagerate').val(vari.Package_Rate);
                            $('#txtmsappointmentdate').val(vari.Appointment_Date);
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
