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

    $("#txtaprfrom").datetimepicker({
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
        $('#txtaprto').data("DateTimePicker").minDate(e.date)
    });


    $("#txtaprto").datetimepicker({
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
    approveAppointmentdetails();
    $('#btnaprSearch').unbind().click(function () {
        searchapproveAppointment();
    });

    $('#btnaprConfirm').unbind().click(function () {
        UpdateapproveConfirmAppointment();
    });
    $('#btnaprCancel').unbind().click(function () {
        cancelapproveAppointment();
    });
});
//First display for Approve appointment
function approveAppointmentdetails() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        //  url: "/AppointmentManagement/pendingAppointmentdetails",
        url: "/AppointmentManagement/approvedAppointmentdet",
        dataType: "json",
        success: function (response) {

            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_approveAppointmentlist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_approveAppointmentlist').DataTable({
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
                                return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "View" onclick="viewapprovedAppointmentdetails(\'' + code + '\')" ><i class="feather icon-edit"></i></button></td>';

                            }
                        }
                    ]
                });
            }
            else {
                var table = $('#tbl_approveAppointmentlist').DataTable({ destroy: true });
                table.clear();
                table.destroy();

                $('#tbl_approveAppointmentlist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
//Search for Confirm appointment between fromdate and todate
function searchapproveAppointment() {
    var data = new FormData();
    data.append("from_date", $.trim($("#txtaprfrom").val()));
    data.append("to_date", $.trim($("#txtaprto").val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        //  url: "/AppointmentManagement/pendingAppointmentdetails",
        url: "/AppointmentManagement/searchapprovedAppointment",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_approvedAppointmentlist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_approvedAppointmentlist').DataTable({
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
                                return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "View" onclick="viewapprovedAppointmentdetails(\'' + code + '\')" ><i class="feather icon-edit"></i></button></td>';

                            }
                        }
                    ]
                });
            }
            else {
                var table = $('#tbl_approvedAppointmentlist').DataTable({ destroy: true });
                table.clear();
                table.destroy();

                $('#tbl_approvedAppointmentlist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
//for View Approved Appointment by appointmentId
function viewapprovedAppointmentdetails(code) {

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
                url: "/AppointmentManagement/LoadApprovedAppointmentId",
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
                        $('#Approved-Appointment-Modal').modal('show');
                        $.each(response, function (i, vari) {
                            $('#txtaprvendorname').val(vari.Vendor_Name);
                            $('#txtaprvendoremployee').val(vari.Vendor_Employee_Name);
                            $('#txtaprvendorphone').val(vari.Vendor_Employee_Phone);
                            $('#txtaprcustomername').val(vari.Customer_Name);
                            $('#txtaprcustomerphone').val(vari.Customer_Phone);
                            $('#txtaprcustomerEmail').val(vari.Customer_Email);
                            $('#txtaprpackagename').val(vari.Package_Name);
                            $('#txtaprpackagerate').val(vari.Package_Rate);
                            $('#txtaprappointmentdate').val(vari.Appointment_Date);
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
//for Update Approved Appointment to Confirmed   using appointmentId
function UpdateapproveConfirmAppointment() {

    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/AppointmentManagement/UpdateapproveConfirmAppointment",
        dataType: "json",
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                $('#Approved-Appointment-Modal').modal('hide');
                //resetemployee();
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message);
                $('#btnaprConfirm').prop('disabled', false);
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                $('#btnaprConfirm').prop('disabled', false);
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
function cancelapproveAppointment() {

    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/AppointmentManagement/cancelApproveAppointment",
        dataType: "json",
        //data: data,
        //contentType: false,
        //processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                $('#Approved-Appointment-Modal').modal('hide');
                //resetemployee();
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message);
                $('#btnaprCancel').prop('disabled', false);
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                $('#btnaprCancel').prop('disabled', false);
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