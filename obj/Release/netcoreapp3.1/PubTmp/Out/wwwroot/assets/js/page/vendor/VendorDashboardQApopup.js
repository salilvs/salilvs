function bindCustomerDetailsQApopup() {
    var CustmobileNo = $('#txtlargeQAPhoneNo').val();
    if (CustmobileNo == '' || CustmobileNo == null) {
        var content = "Invalid";
        var title = "Please Enter Customer Mobile No";
        ErrorAlert(title, content);
    }
    else {
        var data = new FormData();
        data.append("mobile", CustmobileNo);
        $.ajax({
            type: "POST",
            dataType: "json",
            async: "false",
            contentType: "application/json; charset=utf-8",
            url: "/VendorDashboard/CheckCustomerDetails",
            data: data,
            contentType: false,
            processData: false,
            success: function (result) {
                var dat = result;
                if (dat.length > 0) {

                    $.each(dat, function (j, vari) {
                        $("#txtlargeQACustomerId").val(vari.Customer_uniqueid);
                        $("#txtlargeQAPhoneNo").val(vari.Customer_Phone);
                        $("#txtlargeQAName").val(vari.Customer_Name);
                        $("#txtlargeQAEmail").val(vari.Customer_Email);
                        $("#txtlargeQAPhoneNo").switchClass("form-control", "form-control checked-green"); 
                    });

                }
                else {
                    $("#txtlargeQACustomerId").val('');
                    $("#txtlargeQAPhoneNo").val('');
                    $("#txtlargeQAName").val('');
                    $("#txtlargeQAEmail").val('');

                    $("#txtlargeQAPhoneNo").switchClass("form-control checked-green", "form-control"); 
                }

            },
            error: function (dat, errorThrown) {
                $("#txtlargeQACustomerId").val('');
                $("#txtlargeQAName").val('');
                $("#txtlargeQAEmail").val('');
                $("#txtlargeQAPhoneNo").switchClass("form-control checked-green", "form-control"); 
            }
        });
    }

}

function bindAppointmentBookingSlotsLargePopup() {
    var EmployeeId = $('#sellargeQAEmplist').val();
    var PackageId = $('#largeQAervicevendoremppkg').val();
    var SlotDateTime = $('#txtlargeQADate').val();
    if (EmployeeId == '' || EmployeeId == null || EmployeeId == '0') {

        var content = "Please Choose Employee";
        var title = "Invalid.";
        ErrorAlert(title, content);
    }
    else if (PackageId == '0' || PackageId == '' || PackageId == null) {

        var content = "Please Choose Package";
        var title = "Invalid.";
        ErrorAlert(title, content);
    }
    else if (SlotDateTime == '' || SlotDateTime == null) {

        var content = "Please Choose Package";
        var title = "Invalid.";
        ErrorAlert(title, content);
    }
    else {

        var data = new FormData();
        data.append("VendorEmployeeId", EmployeeId);
        data.append("PackageId", PackageId);
        data.append("DTime", SlotDateTime);
        $.ajax({
            type: "POST",
            dataType: "json",
            async: "false",
            contentType: "application/json; charset=utf-8",
            url: "/VendorDashboard/GetVendorEmployeeBookingSlots",
            data: data,
            contentType: false,
            processData: false,
            success: function (result) {
                var dat = result;
                if (dat.length > 0) {
                    $("#largePopupTimeListMorning").html("");
                    $("#largePopupTimeListAfternoon").html("");
                    $("#largePopupTimeListEvening").html("");
                    $("#largePopupTimeListNight").html("");

                    $.each(dat, function (j, vari) {

                        if (vari.SlotDayTime == 'Morning') {

                            if (vari.Booked == 'False') {

                                $("#largePopupTimeListMorning").append("<li  class='available' data-toggle='modal'>" + vari.STime + "</li>");

                            }
                            else {

                                $("#largePopupTimeListMorning").append("<li class='not-available'>" + vari.STime + "</li>");
                            }

                        }
                        if (vari.SlotDayTime == 'Afternoon') {

                            if (vari.Booked == 'False') {

                                $("#largePopupTimeListAfternoon").append("<li  class='available' data-toggle='modal'>" + vari.STime + "</li>");

                            }
                            else {

                                $("#largePopupTimeListAfternoon").append("<li class='not-available'>" + vari.STime + "</li>");
                            }

                        }
                        if (vari.SlotDayTime == 'Evening') {

                            if (vari.Booked == 'False') {

                                $("#largePopupTimeListEvening").append("<li  class='available' data-toggle='modal'>" + vari.STime + "</li>");

                            }
                            else {

                                $("#largePopupTimeListEvening").append("<li class='not-available'>" + vari.STime + "</li>");
                            }

                        }
                        if (vari.SlotDayTime == 'Night') {

                            if (vari.Booked == 'False') {

                                $("#largePopupTimeListNight").append("<li  class='available' data-toggle='modal'>" + vari.STime + "</li>");

                            }
                            else {

                                $("#largePopupTimeListNight").append("<li class='not-available'>" + vari.STime + "</li>");
                            }

                        }



                    });

                }
                else {

                    ResetLargePopupAppointmentBookingSlot();
                }

            }
        });
    }
}

function ResetLargePopupAppointmentBookingSlot() {

    $("#largePopupTimeListMorning").html("");
    $("#largePopupTimeListAfternoon").html("");
    $("#largePopupTimeListEvening").html("");
    $("#largePopupTimeListNight").html("");

    $("#largePopupTimeListMorning").append('<li class="disabled">00:00 AM</li>');
    $("#largePopupTimeListMorning").append('<li class="disabled">00:01 AM</li>');
    $("#largePopupTimeListMorning").append('<li class="disabled">00:02 AM</li>');

    $("#largePopupTimeListAfternoon").append('<li class="disabled">00:00 AM</li>');
    $("#largePopupTimeListAfternoon").append('<li class="disabled">00:01 AM</li>');
    $("#largePopupTimeListAfternoon").append('<li class="disabled">00:02 AM</li>');
    $("#largePopupTimeListAfternoon").append('<li class="disabled">00:03 AM</li>');

    $("#largePopupTimeListEvening").append('<li class="disabled">00:00 AM</li>');
    $("#largePopupTimeListEvening").append('<li class="disabled">00:01 AM</li>');
    $("#largePopupTimeListEvening").append('<li class="disabled">00:02 AM</li>');
    $("#largePopupTimeListEvening").append('<li class="disabled">00:03 AM</li>');

    $("#largePopupTimeListNight").append('<li class="disabled">00:00 AM</li>');
    $("#largePopupTimeListNight").append('<li class="disabled">00:01 AM</li>');
    $("#largePopupTimeListNight").append('<li class="disabled">00:02 AM</li>');
 

}


function BookCustomerAppointmentDetailslargePopup() {

    var CustId = $("#txtlargeQACustomerId").val();
    var CustName = $("#txtlargeQAName").val();
    var CustEmail = $("#txtlargeQAEmail").val();
    var Custmobile = $("#txtlargeQAPhoneNo").val();
    var AppointmentDate = $("#txtlargeQADate").val();
    var AppointmentTime = $("#txtlargeQAdefaultpicker").val();
    var AService = $("#largeQAervicevendoremppkg").val();
    var APostedEmp = $("#sellargeQAEmplist").val();
    var CusAddress = $("#txtlargeQAName").val();


    if (Custmobile == '' || Custmobile == null) {
        var content = "Invalid";
        var title = "Please Enter Customer Mobile";
        ErrorAlert(title, content);
    }
    else if (CustName == '' || CustName == null) {
        var content = "Invalid";
        var title = "Please Enter Customer Name";
        alert(title, content);
    }
    else if (AppointmentDate == '' || AppointmentDate == null) {
        var content = "Invalid";
        var title = "Please Enter Customer Appointment Date";
        ErrorAlert(title, content);
    }
    else if (AppointmentTime == '' || AppointmentTime == null) {
        var content = "Invalid";
        var title = "Please Enter Customer Appointment Time";
        ErrorAlert(title, content);
    }
    else if (AService == '' || AService == null) {
        var content = "Invalid";
        var title = "Please Select Service for Customer";
        ErrorAlert(title, content);
    }
    else {

        //var Appointment_Details = JSON.stringify( {
        //    'packageId': AService,
        //    'selectedDate': AppointmentDate,
        //    'timeFrom': AppointmentTime,
        //    'address': CusAddress,
        //    'customer_name': CustName,
        //    'customer_phone': Custmobile,
        //    'customer_email': CustEmail
        //});


        var VendorEmpSmallQAEmpID = $('#sellargeQAEmplist').val();
        var CustomerId = $("#txtPopupSmallQACustId").val();

        var data = new FormData();
        //data.append("temporaryBooking", Appointment_Details);
        data.append("_packageId", AService);
        data.append("_selectedDate", AppointmentDate);
        data.append("_timeFrom", AppointmentTime);
        data.append("_customername", CustName);
        data.append("_customerphone", Custmobile);
        data.append("_customeremail", CustEmail);
        data.append("employeeId", VendorEmpSmallQAEmpID);
        data.append("customerId", txtlargeQACustomerId);

        //debugger;
        $.ajax({
            type: "POST",
            dataType: "json",
            async: "false",
            contentType: "application/json; charset=utf-8",
            url: "/VendorDashboard/MakeingNewBooking",
            data: data,
            contentType: false,
            processData: false,

            success: function (result) {
                var dat = result;
                if (dat != null) {

                    if (dat['booking_id'] != null) {

                        var title = "Success";
                        var content = "Booking Confirmed ID " + dat['booking_id'];
                        ErrorAlert(title, content);


                    }
                    else if (dat['message'] != null) {
                        var content = dat['message'];
                        var title = "Warning";
                        ErrorAlert(title, content);
                    }


                }

                else {
                    var content = "Unable Book Appointment";
                    var title = "Invalid";
                    ErrorAlert(title, content);
                }

            },
            error: function (dat, errorThrown) {
                var content = "Error Unable Book Appointment";
                var title = "Invalid";
                ErrorAlert(title, content);
            }
        });
    }
}