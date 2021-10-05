function bindVendorEmployeePackages() {
    var EmployeeId = $('#vendoremplist').val();
    var data = new FormData();
    data.append("VendorEmployeeId", EmployeeId);
    $.ajax({
        type: "POST",
        dataType: "json",
        async: "false",
        contentType: "application/json; charset=utf-8",
        url: "/VendorDashboard/GetVendorEmployeePackageList",
        data: data,
        contentType: false,
        processData: false,
        success: function (result) {
            var dat = result;
            if (dat.length > 0) {
                $("#vendoremppkg").html("");
                $("#vendoremppkg").append('<option value="">Choose Package</option>');

                $("#SelPopupSmallQAService").html("");
                $("#SelPopupSmallQAService").append('<option value="">Choose Package</option>');
                

                $.each(dat, function (j, vari) {
                    $("#vendoremppkg").append("<option value='" + vari.Package_Uniqueid + "'>" + vari.Package_Name + "</option>");
                    $("#SelPopupSmallQAService").append("<option value='" + vari.Package_Uniqueid + "'>" + vari.Package_Name + "</option>");
                 
                }); 
                $("#vendoremppkg").prop("selectedIndex", 1);
                $("#SelPopupSmallQAService").prop("selectedIndex", 1);
              

                bindAppointmentBookingSlots();
               
               }
            else {
                $("#vendoremppkg").html("");
                $("#vendoremppkg").append('<option value="0">No Record Found</option>');

                $("#SelPopupSmallQAService").html("");
                $("#SelPopupSmallQAService").append('<option value="0">No Record Found</option>');

                $("#largeQAervicevendoremppkg").html("");
                $("#largeQAervicevendoremppkg").append('<option value="0">No Record Found</option>');

                ResetAppointmentBookingSlot();
            }

        }
    });
}

function bindVendorEmployeePackageslargePopup() {
    var EmployeeId = $('#sellargeQAEmplist').val();
    var data = new FormData();
    data.append("VendorEmployeeId", EmployeeId);
    $.ajax({
        type: "POST",
        dataType: "json",
        async: "false",
        contentType: "application/json; charset=utf-8",
        url: "/VendorDashboard/GetVendorEmployeePackageList",
        data: data,
        contentType: false,
        processData: false,
        success: function (result) {
            var dat = result;
            if (dat.length > 0) {
        
                $("#largeQAervicevendoremppkg").html("");
                $("#largeQAervicevendoremppkg").append('<option value="">Choose Package</option>');



                $.each(dat, function (j, vari) {
                    $("#largeQAervicevendoremppkg").append("<option value='" + vari.Package_Uniqueid + "'>" + vari.Package_Name + "</option>");


                });
            
                $("#largeQAervicevendoremppkg").prop("selectedIndex", 1);

                bindAppointmentBookingSlotsLargePopup();
            }
            else {
      
                $("#largeQAervicevendoremppkg").html("");
                $("#largeQAervicevendoremppkg").append('<option value="0">No Record Found</option>');

                ResetLargePopupAppointmentBookingSlot();
            }

        }
    });
}