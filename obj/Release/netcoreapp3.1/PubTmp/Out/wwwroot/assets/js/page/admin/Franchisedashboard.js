$(function () {
    loadcounts();
    //recentBookings();
    //loadBooking();
});

function loadBooking() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/FranchiseDashboard/loadBooking",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_Bookinglist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_Bookinglist').DataTable({
                    data: dat,
                    autoWidth: true,
                    responsive: true,
                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },

                        { data: 'Appointment_Date' },
                        { data: 'Appointment_Id' },
                        { data: 'Appointment_Status' },
                        //{
                        //    orderable: false,
                        //    render: function (data, type, row) {
                        //        var stat = row.Vendor_Status;
                        //        if (stat == "Active") {
                        //            return '<span class="badge badge-pill badge-success">' + stat + '</span>';
                        //        }
                        //        else { return '<span class="badge badge-pill badge-danger">' + stat + '</span>'; }
                        //    }
                        //},
                        //{
                        //    orderable: false,
                        //    render: function (data, type, row) {
                        //        if (row.Vendor_Status == "Active") {
                        //            if (row.Vendor_Login_Access == "Yes") {
                        //                var code = row.Vendor_uniqueid;
                        //                return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" data-vid=' + code + ' onclick="viewvendordetails(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate Credentials" onclick="deactivatevendorcredentials(\'' + code + '\')" ><i class="simple-icon-logout"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="DeactivateVendor(\'' + code + '\')" ><i class="simple-icon-trash"></i></button></td>';
                        //            }
                        //            else {
                        //                var code = row.Vendor_uniqueid;
                        //                return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" data-vid=' + code + ' onclick="viewvendordetails(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Activate Credentials" onclick="createvendorcredentials(\'' + code + '\')" ><i class="simple-icon-login"></i></button>  <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="DeactivateVendor(\'' + code + '\')" ><i class="simple-icon-trash"></i></button></td>';
                        //            }
                        //        }
                        //        else {
                        //            var code = row.Vendor_uniqueid;
                        //            return '<td><button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Re Activate" onclick="reactivatevendor(\'' + code + '\')" ><i class="simple-icon-reload"></i></button></td>';
                        //        }
                        //    }
                        //}
                    ]
                });
            }
            else {
                $('#tbl_Bookinglist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
function loadcounts() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/FranchiseDashboard/loadcounts",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $.each(response, function (i, vari) {
                    $("#txttotalbooking").text(vari.Total_Booking);
                    $("#txtbookingconfirmed").text(vari.Confirmed_Booking);
                    $("#txtbookingapproved").text(vari.Approved_Booking);
                    $("#txtbookingcompleted").text(vari.Completed_Booking);
                    $("#txtbookingcancelled").text(vari.Cancelled_Bookings);
                    $("#txtbookingmissed").text(vari.Missed_Bookings);
                    $("#txtvendors").text(vari.Total_Vendors);
                    $("#txtpackages").text(vari.Total_Packages);
                    $("#txtcustomer").text(vari.Total_Customers);
                });
            }
            else {

            }
        },
        error: function (response) {

        }
    });
}
function recentBookings() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/FranchiseDashboard/recentBookings",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $('#recentBookings').html("");
                var statuslabel = "";
                $.each(response, function (i, vari) {
                    $('#recentBookings').append(
                        '<div class="d-flex flex-row mb-3">' +
                        '<a class="d-block position-relative" href="#"><img src="' + vari.Package_Photo + '" alt="" class="list-thumbnail border-0" style=" height: 90px; width: 150px; "> <span class="badge badge-pill badge-theme-3 position-absolute badge-top-right">' + vari.Appointment_Status + '</span></a>' +
                        '<div class="pl-3 pt-2 pr-2 pb-2">' +
                        '<a href="#">' +
                        '<p class="list-item-heading">' + vari.Package_Name + '</p>' +
                        '<div class="pr-4 d-none d-sm-block">' +
                        '<p class="text-muted mb-1 text-small">' + vari.Customer_Name + ' has taken appointment for ' + vari.Package_Name + ' attended by ' + vari.Vendor_Employee_Name + '</p>' +
                        '</div>' +
                        '<div class="text-primary text-small font-weight-medium d-none d-sm-block">' + vari.Booked_Time + '</div>' +
                        '</a>' +
                        '</div>' +
                        '</div>'
                    );
                });
            }
            else {

            }
        },
        error: function (response) {

        }
    });
}