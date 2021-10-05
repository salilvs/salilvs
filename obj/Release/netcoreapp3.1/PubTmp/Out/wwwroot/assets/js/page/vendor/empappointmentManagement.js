$(function () {

    holdAppointmentdetails();
    $('input.thresold-i').maxlength()
    $("#txtdate").datetimepicker({
        // Formats
        format: 'YYYY-MM-DD hh:mm:ss',
        icons:
        {
            next: 'fa fa-angle-right',
            previous: 'fa fa-angle-left'
        },
        //minDate: new Date(),
    });

    $("#txtfrom").datetimepicker({
        // Formats
        format: 'LT',
        ignoreReadonly: true,
        //format: 'hh:mm:ss',
        icons:
        {
            up: "fa fa-arrow-up",
            down: "fa fa-arrow-down",
        },
    });

   
    $("#txtduration").datetimepicker({
        format: 'hh:mm:ss',
        icons:
        {
            next: 'fa fa-angle-right',
            previous: 'fa fa-angle-left'
        },
    });
    loademployee();
    loademployee1();
    $('#btnHold').unbind().click(function () {
        event.preventDefault();
        $('#btnHold').prop('disabled', true);
        //if ($('#EmpAppointmentform').parsley().validate() !== true) {
        //    $('#btnHold').prop('disabled', false);
        //}
        //else {
            UpdateHoldAppointment();
        //}
    });

    $('#btnRelease1').unbind().click(function () {
        event.preventDefault();
        $('#btnRelease1').prop('disabled', true);
        ReleaseHoldAppointment();
    });
    

    $('#btnReschedule1').unbind().click(function () {
        event.preventDefault();
        $('#btnReschedule1').prop('disabled', true);
        RescheduleHoldAppointment();
    });
    $('#btnCancel1').unbind().click(function () {
        event.preventDefault();
        $('#btnCancel1').prop('disabled', true);
        CancelHoldAppointment();
    });

    $('#btnReschedule').unbind().click(function () {
        event.preventDefault();
        $('#btnReschedule').prop('disabled', true);
        RescheduleHoldAppointment1();
    });
    $('#btnCancel').unbind().click(function () {
        event.preventDefault();
        $('#btnCancel').prop('disabled', true);
        CancelHoldAppointment1();
    });

});


function ReleaseHoldAppointment() {
    // alert($.trim($('#txtfrom').val()));
    var data = new FormData();
    data.append("vendor_Employee_UniqueId", $.trim($('#ddlemployee1').val()));
    data.append("AppointmentDate", $.trim($('#txtdate1').val()));
    data.append("AppointmentFrTime", $.trim($('#txtfrom1').val()));
    data.append("Appointmentdur", $.trim($('#txtduration1').val()));
    data.append("Reason", $.trim($('#txtreason1').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/EmployeeAppointment/Release_Hold",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                // resetservice();
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message);
                $('#btnRelease').prop('disabled', false);
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                $('#btnRelease').prop('disabled', false);
            }
            else {
                var content = "Invalid";
                var title = "Invalid error occured.";
                ErrorAlert(title, content);
                $('#btnRelease').prop('disabled', false);
            }
        },
        error: function (response) {

        }
    });
}
function RescheduleHoldAppointment() {
    // alert($.trim($('#txtfrom').val()));
    var data = new FormData();
    data.append("vendor_Employee_UniqueId", $.trim($('#ddlemployee1').val()));
    data.append("AppointmentDate", $.trim($('#txtdate1').val()));
    data.append("AppointmentFrTime", $.trim($('#txtfrom1').val()));
    data.append("Appointmentdur", $.trim($('#txtduration1').val()));
    data.append("Reason", $.trim($('#txtreason1').val()));
    data.append("flag", 1);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/EmployeeAppointment/Reschedule_Hold",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                // resetservice();
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message);
                $('#btnReschedule1').prop('disabled', false);
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                $('#btnReschedule1').prop('disabled', false);
            }
            else {
                var content = "Invalid";
                var title = "Invalid error occured.";
                ErrorAlert(title, content);
                $('#btnReschedule1').prop('disabled', false);
            }
        },
        error: function (response) {

        }
    });
}
function RescheduleHoldAppointment1() {
    // alert($.trim($('#txtfrom').val()));
    var data = new FormData();
    data.append("vendor_Employee_UniqueId", $.trim($('#ddlemployee').val()));
    data.append("AppointmentDate", $.trim($('#txtdate').val()));
    data.append("AppointmentFrTime", $.trim($('#txtfrom').val()));
    data.append("Appointmentdur", $.trim($('#txtduration').val()));
    data.append("Reason", $.trim($('#txtreason').val()));
    data.append("flag", 0);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/EmployeeAppointment/Reschedule_Hold",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                // resetservice();
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message);
                $('#btnReschedule1').prop('disabled', false);
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                $('#btnReschedule1').prop('disabled', false);
            }
            else {
                var content = "Invalid";
                var title = "Invalid error occured.";
                ErrorAlert(title, content);
                $('#btnReschedule1').prop('disabled', false);
            }
        },
        error: function (response) {

        }
    });
}

function CancelHoldAppointment() {
    // alert($.trim($('#txtfrom').val()));

    swal({
        title: "Are you sure?",
        text: "Do you want to Cancel the Appointments!",
        type: "warning",
        showCancelButton: true,
        cancelButtonText:"Yes,duration time cancel it",
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes, full day Cancel it!",
        
    }, function (isConfirm) {
            if (isConfirm) {
                var data = new FormData();
                data.append("vendor_Employee_UniqueId", $.trim($('#ddlemployee1').val()));
                data.append("AppointmentDate", $.trim($('#txtdate1').val()));
                data.append("AppointmentFrTime", $.trim($('#txtfrom1').val()));
                data.append("Appointmentdur", $.trim($('#txtduration1').val()));
                data.append("Reason", $.trim($('#txtreason1').val()));
                data.append("flag", 1);
                data.append("fullday",'true')
                $.ajax({
                    type: "Post",
                    contentType: "application/json;charset=utf-8",
                    url: "/EmployeeAppointment/Cancel_Hold",
                    dataType: "json",
                    data: data,
                    contentType: false,
                    processData: false,
                    success: function (response) {
                        if (response[0].Type == "Success") {
                            SuccessAlert(response[0].Title, response[0].Message);
                            // resetservice();
                        }
                        else if (response[0].Type == "Warning") {
                            WarningAlert(response[0].Title, response[0].Message);
                            $('#btnCancel1').prop('disabled', false);
                        }
                        else if (response[0].Type == "Error") {
                            ErrorAlert(response[0].Title, response[0].Message);
                            $('#btnCancel1').prop('disabled', false);
                        }
                        else {
                            var content = "Invalid";
                            var title = "Invalid error occured.";
                            ErrorAlert(title, content);
                            $('#btnCancel1').prop('disabled', false);
                        }
                    },
                    error: function (response) {

                    }
                        
                });
            } else {
                var data = new FormData();
                data.append("vendor_Employee_UniqueId", $.trim($('#ddlemployee1').val()));
                data.append("AppointmentDate", $.trim($('#txtdate1').val()));
                data.append("AppointmentFrTime", $.trim($('#txtfrom1').val()));
                data.append("Appointmentdur", $.trim($('#txtduration1').val()));
                data.append("Reason", $.trim($('#txtreason1').val()));
                data.append("flag", 1);
                data.append("fullday", 'false')
                $.ajax({
                    type: "Post",
                    contentType: "application/json;charset=utf-8",
                    url: "/EmployeeAppointment/Cancel_Hold",
                    dataType: "json",
                    data: data,
                    contentType: false,
                    processData: false,
                    success: function (response) {
                        if (response[0].Type == "Success") {
                            SuccessAlert(response[0].Title, response[0].Message);
                            // resetservice();
                        }
                        else if (response[0].Type == "Warning") {
                            WarningAlert(response[0].Title, response[0].Message);
                            $('#btnCancel1').prop('disabled', false);
                        }
                        else if (response[0].Type == "Error") {
                            ErrorAlert(response[0].Title, response[0].Message);
                            $('#btnCancel1').prop('disabled', false);
                        }
                        else {
                            var content = "Invalid";
                            var title = "Invalid error occured.";
                            ErrorAlert(title, content);
                            $('#btnCancel1').prop('disabled', false);
                        }
                    },
                    error: function (response) {

                    }

                });
        }
    });
}
function CancelHoldAppointment1() {
    // alert($.trim($('#txtfrom').val()));

    swal({
        title: "Are you sure?",
        text: "Do you want to Cancel the Appointments!",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "Yes,duration time cancel it",
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes, full day Cancel it!",

    }, function (isConfirm) {
        if (isConfirm) {
            var data = new FormData();
            data.append("vendor_Employee_UniqueId", $.trim($('#ddlemployee').val()));
            data.append("AppointmentDate", $.trim($('#txtdate').val()));
            data.append("AppointmentFrTime", $.trim($('#txtfrom').val()));
            data.append("Appointmentdur", $.trim($('#txtduration').val()));
            data.append("Reason", $.trim($('#txtreason').val()));
            data.append("flag", 0);
            data.append("fullday", 'true')
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/EmployeeAppointment/Cancel_Hold",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response[0].Type == "Success") {
                        SuccessAlert(response[0].Title, response[0].Message);
                        // resetservice();
                    }
                    else if (response[0].Type == "Warning") {
                        WarningAlert(response[0].Title, response[0].Message);
                        $('#btnCancel1').prop('disabled', false);
                    }
                    else if (response[0].Type == "Error") {
                        ErrorAlert(response[0].Title, response[0].Message);
                        $('#btnCancel1').prop('disabled', false);
                    }
                    else {
                        var content = "Invalid";
                        var title = "Invalid error occured.";
                        ErrorAlert(title, content);
                        $('#btnCancel1').prop('disabled', false);
                    }
                },
                error: function (response) {

                }

            });
        } else {
            var data = new FormData();
            data.append("vendor_Employee_UniqueId", $.trim($('#ddlemployee').val()));
            data.append("AppointmentDate", $.trim($('#txtdate').val()));
            data.append("AppointmentFrTime", $.trim($('#txtfrom').val()));
            data.append("Appointmentdur", $.trim($('#txtduration').val()));
            data.append("Reason", $.trim($('#txtreason').val()));
            data.append("flag", 0);
            data.append("fullday", 'false')
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/EmployeeAppointment/Cancel_Hold",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response[0].Type == "Success") {
                        SuccessAlert(response[0].Title, response[0].Message);
                        // resetservice();
                    }
                    else if (response[0].Type == "Warning") {
                        WarningAlert(response[0].Title, response[0].Message);
                        $('#btnCancel1').prop('disabled', false);
                    }
                    else if (response[0].Type == "Error") {
                        ErrorAlert(response[0].Title, response[0].Message);
                        $('#btnCancel1').prop('disabled', false);
                    }
                    else {
                        var content = "Invalid";
                        var title = "Invalid error occured.";
                        ErrorAlert(title, content);
                        $('#btnCancel1').prop('disabled', false);
                    }
                },
                error: function (response) {

                }

            });
        }
    });
}
function loademployee() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/EmployeeAppointment/LoadEmployee",
        dataType: "json",
        success: function (response) {
            var dat = response;
            alert(dat);
            if (dat.length > 0) {
                $("#ddlemployee").html("");
                $("#ddlemployee").append('<option value="">Select Employee</option>');
                $.each(response, function (i, vari) {
                    $("#ddlemployee").append('<option value="' + vari.Vendor_Employee_UniqueId + '">' + vari.Vendor_Employee_Name + '</option>');
                });

                //$("#ddlemployee").html("");
                //$("#ddlemployee").append('<option value="">Select Employee</option>');
                //$.each(response, function (i, vari) {
                //    $("#ddlemployee").append('<option value="' + vari.Vendor_Employee_UniqueId + '">' + vari.Vendor_Employee_Name + '</option>');
                //});
            }
            else {

            }
        },
        error: function (response) {

        }
    });
}
function loademployee1() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/EmployeeAppointment/LoadEmployee",
        dataType: "json",
        success: function (response) {
            var dat = response;
            alert(dat);
            if (dat.length > 0) {
                $("#ddlemployee1").html("");
                $("#ddlemployee1").append('<option value="">Select Employee</option>');
                $.each(response, function (i, vari) {
                    $("#ddlemployee1").append('<option value="' + vari.Vendor_Employee_UniqueId + '">' + vari.Vendor_Employee_Name + '</option>');
                });

                //$("#ddlemployee").html("");
                //$("#ddlemployee").append('<option value="">Select Employee</option>');
                //$.each(response, function (i, vari) {
                //    $("#ddlemployee").append('<option value="' + vari.Vendor_Employee_UniqueId + '">' + vari.Vendor_Employee_Name + '</option>');
                //});
            }
            else {

            }
        },
        error: function (response) {

        }
    });
}


function UpdateHoldAppointment() {
   // alert($.trim($('#txtfrom').val()));
    var data = new FormData();
    data.append("vendor_Employee_UniqueId", $.trim($('#ddlemployee').val()));
    data.append("AppointmentDate", $.trim($('#txtdate').val()));
    data.append("AppointmentFrTime", $.trim($('#txtfrom').val()));
    data.append("Appointmentdur", $.trim($('#txtduration').val()));
    data.append("Reason", $.trim($('#txtreason').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/EmployeeAppointment/UpdateHoldAppointment",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
               // resetservice();
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message);
                $('#btnHold').prop('disabled', false);
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                $('#btnHold').prop('disabled', false);
            }
            else {
                var content = "Invalid";
                var title = "Invalid error occured.";
                ErrorAlert(title, content);
                $('#btnHold').prop('disabled', false);
            }
        },
        error: function (response) {

        }
    });
}
//First display for Hold appointment- vendor Employee
function holdAppointmentdetails() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/EmployeeAppointment/holdAppointmentdet",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_HoldAppointmentlist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_HoldAppointmentlist').DataTable({
                    data: dat,
                    autoWidth: true,
                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                        { data: 'VendorEmployee' },
                        { data: 'App_Date' },
                        { data: 'App_fr' },
                        { data: 'App_dur' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var code = row.Id;
                                return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "View" onclick="viewholdAppointmentdetails(\'' + code + '\')" ><i class="feather icon-edit"></i></button></td>';

                            }
                        }
                    ]
                });
            }
            else {
                var table = $('#tbl_HoldAppointmentlist').DataTable({ destroy: true });
                table.clear();
                table.destroy();

                $('#tbl_HoldAppointmentlist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
//for View Hold Appointment by vendor employeeId
function viewholdAppointmentdetails(code) {

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
            data.append("Id", code);
            alert(code);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                //url: "/Subscription/LoadSubscriptionDetails",
                //url: "/AppointmentManagement/LoadPendingAppointmentById",
                url: "/EmployeeAppointment/LoadHoldAppointmentId",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        $('#btnRelease').show();
                        $('#btnReschedule').show();
                        $('#btnCancel').show();
                        $('#Hold-Appointment-Modal').modal('show');
                        $.each(response, function (i, vari) {
                            alert(vari.Vendor_Employee_UniqueId);
                            alert(vari.AppDate);
                            $('#ddlemployee1').val(vari.Vendor_Employee_UniqueId);
                            $('#txtdate1').val(vari.AppDate);
                            $('#txtfrom1').val(vari.Appfr);
                            $('#txtduration1').val(vari.Appdur);
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