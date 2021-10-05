
//vendoremployeepending();
$(function () {
    vendoremployeepending();

$('#Pending-tab').unbind().click(function () {
    var url = "../assets/js/page/admin/vendorEmployeeDashboard.js";
    $.getScript(url, function () {
        console.log("Vendor Employee Dashboard");
    });
    });

    $('#Confirmed-tab').unbind().click(function () {
        //event.preventDefault();
        var url = "../assets/js/page/admin/VendorEmployeeConfirmed.js";
        $.getScript(url, function () {
            console.log("Vendor Employee Confirmed");
        });
    });


    $('#btnConfirm').unbind().click(function () {
        updatepending();
        });
    $('#btnCancel').unbind().click(function () {
            cancelpending();
        });
    });
    function vendoremployeepending() {
        $.ajax({
            type: "Post",
            contentType: "application/json;charset=utf-8",
            url: "/vendorEmployeeDashboard/vendoremployeepending",
            dataType: "json",
            success: function (response) {
                var dat = response;
                if (dat.length > 0) {
                    var table = $('#tbl_vendoremployeelist').DataTable({ destroy: true });
                    table.destroy();
                    $('#tbl_vendoremployeelist').DataTable({
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
                                    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "View" onclick="viewpendingvendoremployee(\'' + code + '\')" ><i class="feather icon-edit"></i></button></td>';

                                }
                            }
                        ]
                    });
                }
                else {
                    var table = $('#tbl_vendoremployeelist').DataTable({ destroy: true });
                    table.clear();
                    table.destroy();

                    $('#tbl_vendoremployeelist').DataTable();
                }
            },
            error: function (response) {

            }
        });
    }
    function viewpendingvendoremployee(code) {
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
                    url: "/vendorEmployeeDashboard/Loadvendoremployee",
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
                            $('#Pending-vendorEmp-Modal').modal('show');
                            $.each(response, function (i, vari) {
                                $('#txtvendorname').val(vari.vendorName);
                                $('#txtvendoremployee').val(vari.vendorEmployeeName);
                                $('#txtvendorphone').val(vari.vendorEmployeePhone);
                                $('#txtcustomername').val(vari.customerName);
                                $('#txtcustomerphone').val(vari.customerPhone);
                                $('#txtcustomerEmail').val(vari.customerEmail);
                                $('#txtpackagename').val(vari.packageName);
                                $('#txtpackagerate').val(vari.packageRate);
                                $('#txtappointmentdate').val(vari.appointmentDate);
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
function updatepending() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/vendorEmployeeDashboard/Updatepending",
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
function cancelpending() {

    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/vendorEmployeeDashboard/cancelpending",
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
