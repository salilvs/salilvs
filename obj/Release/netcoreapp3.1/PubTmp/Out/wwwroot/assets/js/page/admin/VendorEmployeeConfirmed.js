$(function () {
    
    vendorempdashboardDetails();
    $('#btnComplete').unbind().click(function () {
        updateconfirmedAppointment();
    });
    $('#btnconCancel').unbind().click(function () {
        cancelconfirmed();
    });
});
function vendorempdashboardDetails() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/vendorEmployeeDashboard/Loadvendorempdetails",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_vendoremployeeConfirmedlist').DataTable({ destroy: true });
                table.destroy();
                $('#Pending-tab').prop('disabled', true);
                $('#tbl_vendoremployeeConfirmedlist').DataTable({
                    data: dat,
                    autoWidth: true,
                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                        { data: 'customerName' },
                        { data: 'vendorName' },
                        { data: 'packageName' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var code = row.appointment_Id;
                                return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "View" onclick="viewconfirmedvendormployee(\'' + code + '\')" ><i class="feather icon-edit"></i></button></td>';

                            }
                        }
                    ]
                });
            }
            else {
                var table = $('#tbl_vendoremployeeConfirmedlist').DataTable({ destroy: true });
                //table.clear();
                //table.destroy();

                $('#tbl_vendoremployeeConfirmedlist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
function viewconfirmedvendormployee(code) {
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
            data.append("Appointment_Id", code);

            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                //url: "/Subscription/LoadSubscriptionDetails",
                //url: "/AppointmentManagement/LoadPendingAppointmentById",
                url: "/vendorEmployeeDashboard/Loadconfirmedvendoremployee",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        //$('#btnConfirm').show();
                        //$('#btnReschedule').show();
                        //$('#btnCancel').show();
                        $('#Confirmed-confirmed-Modal').modal('show');
                        $.each(response, function (i, vari) {
                            $('#txtconvendorname').val(vari.vendorName);
                            $('#txtconvendoremployee').val(vari.vendorEmployeeName);
                            $('#txtconvendorphone').val(vari.vendorEmployeePhone);
                            $('#txtconcustomername').val(vari.customerName);
                            $('#txtconcustomerphone').val(vari.customerPhone);
                            $('#txtconcustomerEmail').val(vari.customerEmail);
                            $('#txtconpackagename').val(vari.packageName);
                            $('#txtconpackagerate').val(vari.packageRate);
                            $('#txtconappointmentdate').val(vari.appointmentDate);
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
function updateconfirmedAppointment() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/vendorEmployeeDashboard/UpdateConfirmedAppointment",
        dataType: "json",
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                $('#Confirmed-confirmed-Modal').modal('hide');
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
function cancelconfirmed() {

    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/vendorEmployeeDashboard/cancelconfirmed",
        dataType: "json",
        success: function (response) {
            if (response[0].Type == "Success") {
                alert('hii');
                SuccessAlert(response[0].Title, response[0].Message);
                $('#Confirmed-confirmed-Modal').modal('hide');
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