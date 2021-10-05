$(function () {
   // loadBookingCompleted();
    FranchiseloadBookingCompleted();
});

//function loadBookingCompleted() {
function FranchiseloadBookingCompleted() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/FranchiseDashboard/FranchiseloadBookingCompleted",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_FranchiseBookingCompleted').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_FranchiseBookingCompleted').DataTable({
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
                $('#tbl_FranchiseBookingCompleted').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
