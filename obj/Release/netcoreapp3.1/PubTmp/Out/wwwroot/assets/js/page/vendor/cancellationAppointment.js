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

    $("#txtcanfrom").datetimepicker({
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
        $('#txtcanto').data("DateTimePicker").minDate(e.date)
    });


    $("#txtcanto").datetimepicker({
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
    cancelledAppointmentdetails();
    $('#btncanSearch').unbind().click(function () {
        searchcancelledAppointment();
    });

});
//First display for Canceled appointment
function cancelledAppointmentdetails() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        //  url: "/AppointmentManagement/pendingAppointmentdetails",
        url: "/AppointmentManagement/cancelledAppointment",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_cancelledAppointmentlist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_cancelledAppointmentlist').DataTable({
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
                                return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "View" onclick="viewcancelledAppointmentdetails(\'' + code + '\')" ><i class="feather icon-edit"></i></button></td>';

                            }
                        }
                    ]
                });
            }
            else {
                var table = $('#tbl_cancelledAppointmentlist').DataTable({ destroy: true });
                table.clear();
                table.destroy();

                $('#tbl_cancelledAppointmentlist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
//Search for cancelled appointment between fromdate and todate
function searchcancelledAppointment() {
    var data = new FormData();
    data.append("from_date", $.trim($("#txtcanfrom").val()));
    data.append("to_date", $.trim($("#txtcanto").val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        //  url: "/AppointmentManagement/pendingAppointmentdetails",
        url: "/AppointmentManagement/searchcancelledAppointment",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_cancelledAppointmentlist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_cancelledAppointmentlist').DataTable({
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
                                return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "View" onclick="viewcancelledAppointmentdetails(\'' + code + '\')" ><i class="feather icon-edit"></i></button></td>';

                            }
                        }
                    ]
                });
            }
            else {
                var table = $('#tbl_cancelledAppointmentlist').DataTable({ destroy: true });
                table.clear();
                table.destroy();

                $('#tbl_cancelledAppointmentlist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
//for View cancelled Appointment by appointmentId
function viewcancelledAppointmentdetails(code) {

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
                url: "/AppointmentManagement/LoadCancelledAppointmentId",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        $('#btncanConfirm').show();
                        $('#btncanCancel').show();
                        $('#Cancelled-Appointment-Modal').modal('show');
                        $.each(response, function (i, vari) {
                            $('#txtcanvendorname').val(vari.Vendor_Name);
                            $('#txtcanvendoremployee').val(vari.Vendor_Employee_Name);
                            $('#txtcanvendorphone').val(vari.Vendor_Employee_Phone);
                            $('#txtcancustomername').val(vari.Customer_Name);
                            $('#txtcancustomerphone').val(vari.Customer_Phone);
                            $('#txtcancustomerEmail').val(vari.Customer_Email);
                            $('#txtcanpackagename').val(vari.Package_Name);
                            $('#txtcanpackagerate').val(vari.Package_Rate);
                            $('#txtcanappointmentdate').val(vari.Appointment_Date);
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