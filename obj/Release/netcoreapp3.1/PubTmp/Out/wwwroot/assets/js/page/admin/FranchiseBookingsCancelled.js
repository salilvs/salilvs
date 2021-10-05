$(function () {
    //loadBookingsCancelled();
    FranchiseloadBookingsCancelled();
});

//function loadBookingsCancelled() {
function FranchiseloadBookingsCancelled() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/FranchiseDashboard/FranchiseloadBookingsCancelled",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_FranchiseBookingsCancelled').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_FranchiseBookingsCancelled').DataTable({
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
                    ]
                });
            }
            else {
                $('#tbl_FranchiseBookingsCancelled').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
