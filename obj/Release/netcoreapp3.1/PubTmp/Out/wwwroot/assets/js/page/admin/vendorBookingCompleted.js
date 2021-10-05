$(function () {
    VendorloadBookingsCompleted();
});

function VendorloadBookingsCompleted() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Dashboard/VendorloadBookingsCompleted",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_vendorBookingCompleted').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_vendorBookingCompleted').DataTable({
                    data: dat,
                    autoWidth: true,
                    responsive: true,
                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                        { data: 'date_time' },
                        { data: 'name' },
                        //{ data: 'Customer_Name' },
                        { data: 'type' },
                        { data: 'id' },

                        { data: 'newtype' },
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
                $('#tbl_vendorBookingCompleted').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
