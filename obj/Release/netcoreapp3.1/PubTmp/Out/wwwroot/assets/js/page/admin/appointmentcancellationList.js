$(function () {

    app_cancellist();
});

//Appointment cancellation list
function app_cancellist() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorCreation/appointmentcancelList",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_cancellationlist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_cancellationlist').DataTable({
                    data: dat,
                    autoWidth: true,
                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                        //{ data: 'subscriptions_Type' },
                        { data: 'vendor_Name' },
                        { data: 'monthly' },
                        { data: 'daily' }
                        
                    ]
                });
            }
            else {
                $('#tbl_cancellationlist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}