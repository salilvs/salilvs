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

    $("#txtcomfrom").datetimepicker({
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
        $('#txtcomto').data("DateTimePicker").minDate(e.date)
    });


    $("#txtcomto").datetimepicker({
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
    completeAppointmentdetails();
    $('#btncomSearch').unbind().click(function () {
        searchcompleteAppointment();
    });


});
//First display for Confirm appointment
function completeAppointmentdetails() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        //  url: "/AppointmentManagement/pendingAppointmentdetails",
        url: "/AppointmentManagement/completeAppointment",
        dataType: "json",
        success: function (response) {

            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_completeAppointmentlist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_completeAppointmentlist').DataTable({
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
                                return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "View" onclick="viewcompleteAppointmentdetails(\'' + code + '\')" ><i class="feather icon-edit"></i></button></td>';

                            }
                        }
                    ]
                });
            }
            else {
                var table = $('#tbl_completeAppointmentlist').DataTable({ destroy: true });
                table.clear();
                table.destroy();

                $('#tbl_completeAppointmentlist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
//Search for Complete appointment between fromdate and todate
function searchcompleteAppointment() {
    var data = new FormData();
    data.append("from_date", $.trim($("#txtcomfrom").val()));
    data.append("to_date", $.trim($("#txtcomto").val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        //  url: "/AppointmentManagement/pendingAppointmentdetails",
        url: "/AppointmentManagement/searchcompleteAppointment",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_completeAppointmentlist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_completeAppointmentlist').DataTable({
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
                                return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "View" onclick="viewcompleteAppointmentdetails(\'' + code + '\')" ><i class="feather icon-edit"></i></button></td>';

                            }
                        }
                    ]
                });
            }
            else {
                var table = $('#tbl_completeAppointmentlist').DataTable({ destroy: true });
                table.clear();
                table.destroy();

                $('#tbl_completeAppointmentlist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
//for View Confirmed Appointment by appointmentId
function viewcompleteAppointmentdetails(code) {

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
                url: "/AppointmentManagement/LoadCompleteAppointmentId",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        $('#Complete-Appointment-Modal').modal('show');
                        $.each(response, function (i, vari) {
                            $('#txtcomvendorname').val(vari.Vendor_Name);
                            $('#txtcomvendoremployee').val(vari.Vendor_Employee_Name);
                            $('#txtcomvendorphone').val(vari.Vendor_Employee_Phone);
                            $('#txtcomcustomername').val(vari.Customer_Name);
                            $('#txtcomcustomerphone').val(vari.Customer_Phone);
                            $('#txtcomcustomerEmail').val(vari.Customer_Email);
                            $('#txtcompackagename').val(vari.Package_Name);
                            $('#txtcompackagerate').val(vari.Package_Rate);
                            $('#txtcomappointmentdate').val(vari.Appointment_Date);
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
