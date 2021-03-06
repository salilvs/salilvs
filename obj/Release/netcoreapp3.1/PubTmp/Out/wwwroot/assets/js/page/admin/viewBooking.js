$(function () {
loadBooking();
});

function loadBooking() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Dashboard/loadBooking",
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
                        { data: 'Vendor_Name' },
                        { data:'Customer_Name'},
                       
                        { data: 'Appointment_Id' },
                       
                        { data: 'Appointment_Status'},
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
