function bindAppointmentBookingSlots() {
    var EmployeeId = $('#vendoremplist').val();
    var PackageId = $('#vendoremppkg').val();
    var SlotDateTime = $('#vendorslotdate').val();
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
                    $("#TimeListMorning").html("");
                    $("#TimeListAfternoon").html("");
                    $("#TimeListEvening").html("");
                    $("#TimeListNight").html("");
                    
                    $.each(dat, function (j, vari) {

                        if (vari.SlotDayTime == 'Morning') {

                            if (vari.Booked == 'False') {

                                $("#TimeListMorning").append("<li  class='available' data-toggle='modal' data-target='.appointment-book'>" + vari.STime + "</li>");

                            }
                            else {

                                $("#TimeListMorning").append("<li class='not-available'>" + vari.STime + "</li>");
                            }

                        }
                        if (vari.SlotDayTime == 'Afternoon') {

                            if (vari.Booked == 'False') {

                                $("#TimeListAfternoon").append("<li  class='available' data-toggle='modal' data-target='.appointment-book'>" + vari.STime + "</li>");

                            }
                            else {

                                $("#TimeListAfternoon").append("<li class='not-available'>" + vari.STime + "</li>");
                            }

                        }
                        if (vari.SlotDayTime == 'Evening') {

                            if (vari.Booked == 'False') {

                                $("#TimeListEvening").append("<li  class='available' data-toggle='modal' data-target='.appointment-book'>" + vari.STime + "</li>");

                            }
                            else {

                                $("#TimeListEvening").append("<li class='not-available'>" + vari.STime + "</li>");
                            }

                        }
                        if (vari.SlotDayTime == 'Night') {

                            if (vari.Booked == 'False') {

                                $("#TimeListNight").append("<li  class='available' data-toggle='modal' data-target='.appointment-book'>" + vari.STime + "</li>");

                            }
                            else {

                                $("#TimeListNight").append("<li class='not-available'>" + vari.STime + "</li>");
                            }

                        }


                       
                    });

                }
                else {
                    
                    ResetAppointmentBookingSlot();
                }

            }
        });
    }
}