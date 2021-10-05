$(function () {
    //loadBooking();
    FranchiseloadBooking();
});

//function loadBooking() {
function FranchiseloadBooking() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        //url: "/Dashboard/FranchiseloadBooking",
        url: "/FranchiseDashboard/FranchiseloadBooking",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_FranchiseBookinglist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_FranchiseBookinglist').DataTable({
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
                        { data: 'type' },
                        { data: 'id' },

                        { data: 'newtype' },
                    ]
                });
            }
            else {
                $('#tbl_FranchiseBookinglist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
