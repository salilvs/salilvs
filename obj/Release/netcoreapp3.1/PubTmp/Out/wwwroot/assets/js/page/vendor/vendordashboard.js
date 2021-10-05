$(function () {

    $('#vendoremplist').change(function (event) {
        event.preventDefault();
        bindVendorEmployeePackages();
        ResetAppointmentBookingSlot();
    });

    $('#vendoremppkg').change(function (event) {
        event.preventDefault();
        ResetAppointmentBookingSlot();
        bindAppointmentBookingSlots();
    });


    $('#vendorslotdate').change(function (event) {
        event.preventDefault();
        ResetAppointmentBookingSlot();
        bindAppointmentBookingSlots();
    });

    $("#txtPopupSmallQACustPhoneNumber").on("change", function () {
        event.preventDefault();
        bindCustomerDetails();
    });
    $("#txtPopupSmallQACustPhoneNumber").keyup(function () {
        event.preventDefault();
        bindCustomerDetails();
    });

    //large Popup QA

    $("#txtlargeQAPhoneNo").on("change", function () {
        event.preventDefault();
        bindCustomerDetailsQApopup();
    });
    $("#txtlargeQAPhoneNo").keyup(function () {
        event.preventDefault();
        bindCustomerDetailsQApopup();
    });


    $('#sellargeQAEmplist').change(function (event) {
        event.preventDefault();
        bindVendorEmployeePackageslargePopup();
        ResetLargePopupAppointmentBookingSlot();
       
    });

    $('#largeQAervicevendoremppkg').change(function (event) {
        event.preventDefault();
        ResetLargePopupAppointmentBookingSlot();
        bindAppointmentBookingSlotsLargePopup();
    });


    $('#txtlargeQADate').change(function (event) {
        event.preventDefault();
        ResetLargePopupAppointmentBookingSlot();
        bindAppointmentBookingSlotsLargePopup();
     
       
    });




    $("#btnSmallPopupBookAppointment").click(function () {
        
        BookCustomerAppointmentDetails();

    });


    $(document).on("click", "#TimeListMorning li", function () {
        var VendorSlotTime = $(this).text().trim();
        var VendorEmpSmallQADate = $('#vendorslotdate').val();

        var QADate = new Date(VendorEmpSmallQADate,);
        var dd = String(QADate.getDate()).padStart(2, '0');
        var mm = String(QADate.getMonth() + 1).padStart(2, '0');
        var yyyy = QADate.getFullYear();

        QADate = yyyy + '-' + mm + '-' + dd;
        $("#txtPopupSmallQAEmpDate").val(QADate);


        var vtime = convertDateTo24Hour(VendorSlotTime);
     
      
        var VendorEmpSmallQAEmpID = $('#vendoremplist').val();

        //bindCustomerDetails();

       // var VendorEmpSmallQAEmpName = $('#vendoremplist option:selected').text();
        var VendorEmpSmallQAPkg = $('#vendoremppkg').val();
        
        $("#txtPopupSmallQAEmpTime").attr({ 'value': vtime });

       // $("#txtPopupSmallQAEmpName").val(VendorEmpSmallQAEmpName);
       
        $("#SelPopupSmallQAService").val(VendorEmpSmallQAPkg);
        $("#SelPopupSmallQAEmp").val(VendorEmpSmallQAEmpID);

    });

    $(document).on("click", "#TimeListAfternoon li", function () {
        var VendorSlotTime = $(this).text().trim();
        var VendorEmpSmallQADate = $('#vendorslotdate').val();

        var QADate = new Date(VendorEmpSmallQADate,);
        var dd = String(QADate.getDate()).padStart(2, '0');
        var mm = String(QADate.getMonth() + 1).padStart(2, '0');
        var yyyy = QADate.getFullYear();

        QADate = yyyy + '-' + mm + '-' + dd;
        $("#txtPopupSmallQAEmpDate").val(QADate);


        var vtime = convertDateTo24Hour(VendorSlotTime);


        var VendorEmpSmallQAEmpID = $('#vendoremplist').val();

        //bindCustomerDetails();

        //var VendorEmpSmallQAEmpName = $('#vendoremplist option:selected').text();
        var VendorEmpSmallQAPkg = $('#vendoremppkg').val();

        $("#txtPopupSmallQAEmpTime").attr({ 'value': vtime });

       // $("#txtPopupSmallQAEmpName").val(VendorEmpSmallQAEmpName);

        $("#SelPopupSmallQAService").val(VendorEmpSmallQAPkg);
        $("#SelPopupSmallQAEmp").val(VendorEmpSmallQAEmpID);

    });

    $(document).on("click", "#TimeListEvening li", function () {
        var VendorSlotTime = $(this).text().trim();
        var VendorEmpSmallQADate = $('#vendorslotdate').val();

        var QADate = new Date(VendorEmpSmallQADate,);
        var dd = String(QADate.getDate()).padStart(2, '0');
        var mm = String(QADate.getMonth() + 1).padStart(2, '0');
        var yyyy = QADate.getFullYear();

        QADate = yyyy + '-' + mm + '-' + dd;
        $("#txtPopupSmallQAEmpDate").val(QADate);


        var vtime = convertDateTo24Hour(VendorSlotTime);

        var VendorEmpSmallQAEmpID = $('#vendoremplist').val();
        //bindCustomerDetails();

        //var VendorEmpSmallQAEmpName = $('#vendoremplist option:selected').text();
        var VendorEmpSmallQAPkg = $('#vendoremppkg').val();

        $("#txtPopupSmallQAEmpTime").attr({ 'value': vtime });

       // $("#txtPopupSmallQAEmpName").val(VendorEmpSmallQAEmpName);

        $("#SelPopupSmallQAService").val(VendorEmpSmallQAPkg);
        $("#SelPopupSmallQAEmp").val(VendorEmpSmallQAEmpID);

    });

    $(document).on("click", "#TimeListNight li", function () {
        var VendorSlotTime = $(this).text().trim();
        var VendorEmpSmallQADate = $('#vendorslotdate').val();

        var QADate = new Date(VendorEmpSmallQADate,);
        var dd = String(QADate.getDate()).padStart(2, '0');
        var mm = String(QADate.getMonth() + 1).padStart(2, '0');
        var yyyy = QADate.getFullYear();

        QADate = yyyy + '-' + mm + '-' + dd;
        $("#txtPopupSmallQAEmpDate").val(QADate);


        var vtime = convertDateTo24Hour(VendorSlotTime);


        var VendorEmpSmallQAEmpID = $('#vendoremplist').val();

        //bindCustomerDetails();

        //var VendorEmpSmallQAEmpName = $('#vendoremplist option:selected').text();
        var VendorEmpSmallQAPkg = $('#vendoremppkg').val();

        $("#txtPopupSmallQAEmpTime").attr({ 'value': vtime });

       // $("#txtPopupSmallQAEmpName").val(VendorEmpSmallQAEmpName);

        $("#SelPopupSmallQAService").val(VendorEmpSmallQAPkg);
        $("#SelPopupSmallQAEmp").val(VendorEmpSmallQAEmpID);

    });

    //QA large popup

    $(document).on("click", "#largePopupTimeListMorning li", function () {
        var VendorSlotTime = $(this).text().trim();
        var VendorEmpSmallQADate = $('#txtlargeQADate').val();

        var QADate = new Date(VendorEmpSmallQADate,);
        var dd = String(QADate.getDate()).padStart(2, '0');
        var mm = String(QADate.getMonth() + 1).padStart(2, '0');
        var yyyy = QADate.getFullYear();

        QADate = yyyy + '-' + mm + '-' + dd;
        $("#txtlargeQADate").val(QADate);

        var vtime = convertDateTo24Hour(VendorSlotTime);
     
        $("#txtlargeQAdefaultpicker").attr({ 'value': vtime });
      

    });

    $(document).on("click", "#largePopupTimeListAfternoon li", function () {
        var VendorSlotTime = $(this).text().trim();
        var VendorEmpSmallQADate = $('#txtlargeQADate').val();

        var QADate = new Date(VendorEmpSmallQADate,);
        var dd = String(QADate.getDate()).padStart(2, '0');
        var mm = String(QADate.getMonth() + 1).padStart(2, '0');
        var yyyy = QADate.getFullYear();

        QADate = yyyy + '-' + mm + '-' + dd;
        $("#txtlargeQADate").val(QADate);


        var vtime = convertDateTo24Hour(VendorSlotTime);

        var VendorEmpSmallQAPkg = $('#largeQAervicevendoremppkg').val();

        $("#txtlargeQAdefaultpicker").attr({ 'value': vtime });

  
    });

    $(document).on("click", "#largePopupTimeListEvening li", function () {
        var VendorSlotTime = $(this).text().trim();
        var VendorEmpSmallQADate = $('#txtlargeQADate').val();

        var QADate = new Date(VendorEmpSmallQADate,);
        var dd = String(QADate.getDate()).padStart(2, '0');
        var mm = String(QADate.getMonth() + 1).padStart(2, '0');
        var yyyy = QADate.getFullYear();

        QADate = yyyy + '-' + mm + '-' + dd;
        $("#txtlargeQADate").val(QADate);


        var vtime = convertDateTo24Hour(VendorSlotTime);

         $("#txtlargeQAdefaultpicker").attr({ 'value': vtime });


    });

    $(document).on("click", "#largePopupTimeListNight li", function () {
        var VendorSlotTime = $(this).text().trim();
        var VendorEmpSmallQADate = $('#txtlargeQADate').val();

        var QADate = new Date(VendorEmpSmallQADate,);
        var dd = String(QADate.getDate()).padStart(2, '0');
        var mm = String(QADate.getMonth() + 1).padStart(2, '0');
        var yyyy = QADate.getFullYear();

        QADate = yyyy + '-' + mm + '-' + dd;
        $("#txtlargeQADate").val(QADate);


        var vtime = convertDateTo24Hour(VendorSlotTime);

        $("#txtlargeQAdefaultpicker").attr({ 'value': vtime });
    });





});

function convertTo12Hour(oldFormatTime) {
    console.log("oldFormatTime: " + oldFormatTime);
    var oldFormatTimeArray = oldFormatTime.split(":");

    var HH = parseInt(oldFormatTimeArray[0]);
    var min = oldFormatTimeArray[1];

    var AMPM = HH >= 12 ? "PM" : "AM";
    var hours;
    if (HH == 0) {
        hours = HH + 12;
    } else if (HH > 12) {
        hours = HH - 12;
    } else {
        hours = HH;
    }
    var newFormatTime = hours + ":" + min + " " + AMPM;
    return(newFormatTime);
}

function convertDateTo24Hour(dt) {
    var elem = dt.split(' ');
    var stSplit = elem[0].split(":");
    var stHour = stSplit[0];
    var stMin = stSplit[1];
    

    var stAmPm = elem[1];
    var newhr = 0;
    var ampm = '';
    var newtime = '';
 
    if (stAmPm == 'PM') {
        if (stHour != 12) {
            stHour = stHour * 1 + 12;
        }

    } else if (stAmPm == 'AM' && stHour == '12') {
        stHour = stHour - 12;
    } else {
        stHour = stHour;
           }

        return (stHour + ':' + stMin);
    }




function ResetAppointmentBookingSlot() {

    $("#TimeListMorning").html("");
    $("#TimeListAfternoon").html("");
    $("#TimeListEvening").html("");
    $("#TimeListNight").html("");

    $("#TimeListMorning").append('<li class="disabled">00:00 AM</li>');
    $("#TimeListMorning").append('<li class="disabled">00:01 AM</li>');
    $("#TimeListMorning").append('<li class="disabled">00:02 AM</li>');

    $("#TimeListAfternoon").append('<li class="disabled">00:00 AM</li>');
    $("#TimeListAfternoon").append('<li class="disabled">00:01 AM</li>');
    $("#TimeListAfternoon").append('<li class="disabled">00:02 AM</li>');
    $("#TimeListAfternoon").append('<li class="disabled">00:03 AM</li>');

    $("#TimeListEvening").append('<li class="disabled">00:00 AM</li>');
    $("#TimeListEvening").append('<li class="disabled">00:01 AM</li>');
    $("#TimeListEvening").append('<li class="disabled">00:02 AM</li>');
    $("#TimeListEvening").append('<li class="disabled">00:03 AM</li>');

    $("#TimeListNight").append('<li class="disabled">00:00 AM</li>');
    $("#TimeListNight").append('<li class="disabled">00:01 AM</li>');
    $("#TimeListNight").append('<li class="disabled">00:02 AM</li>');


}

function bindCustomerDetails() {

    var CustmobileNo = $('#txtPopupSmallQACustPhoneNumber').val();
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
                        $("#txtPopupSmallQACustId").val(vari.Customer_uniqueid);
                        $("#txtPopupSmallQACustPhoneNumber").val(vari.Customer_Phone);
                        $("#txtPopupSmallQACustName").val(vari.Customer_Name);
                        $("#txtPopupSmallQACustEmail").val(vari.Customer_Email);

                    });

                }
                else {
                    $("#txtPopupSmallQACustId").val('');
                    $("#txtPopupSmallQACustPhoneNumber").val('');
                    $("#txtPopupSmallQACustName").val('');
                    $("#txtPopupSmallQACustEmail").val('');
                }

            },
            error: function (dat, errorThrown) {
                $("#txtPopupSmallQACustId").val('');
                $("#txtPopupSmallQACustName").val('');
                $("#txtPopupSmallQACustEmail").val('');
            }
        });
    }
}





function BookCustomerAppointmentDetails() {

    var CustId = $("#txtPopupSmallQACustId").val();
    var CustName = $("#txtPopupSmallQACustName").val();
    var CustEmail = $("#txtPopupSmallQACustEmail").val();
    var Custmobile = $("#txtPopupSmallQACustPhoneNumber").val();
    var AppointmentDate = $("#txtPopupSmallQAEmpDate").val();
    var AppointmentTime = $("#txtPopupSmallQAEmpTime").val(); 
    var AService = $("#SelPopupSmallQAService").val();
    var APostedEmp = $("#SelPopupSmallQAEmp").val();
    var CusAddress = $("#txtPopupSmallQACustName").val();

       
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

     
        var VendorEmpSmallQAEmpID = $('#vendoremplist').val();
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
        data.append("customerId", CustomerId);
        
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
                if (dat!=null) {

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
function SuccessAlert(title, content) {
    $.toast({
        heading: title,
        text: content,
        position: 'top-right',
        icon: 'success',
        allowToastClose: false,
        hideAfter: 3500,
        stack: false,
        //afterHidden: function () { window.location.reload(); }
    });
}
function WarningAlert(title, content) {
    $.toast({
        heading: title,
        text: content,
        position: 'top-right',
        icon: 'warning',
        allowToastClose: false,
        hideAfter: 3500,
        stack: false,
        //afterHidden: function () { window.location.reload(); }
    });
}
function ErrorAlert(title, content) {
    $.toast({
        heading: title,
        text: content,
        position: 'top-right',
        icon: 'error',
        allowToastClose: false,
        hideAfter: 3500,
        stack: false,
        //afterHidden: function () { window.location.reload(); }
    });
}