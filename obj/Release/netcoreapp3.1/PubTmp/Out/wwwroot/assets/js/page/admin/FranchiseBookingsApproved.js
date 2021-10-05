$(function () {
    //loadBookingsApproved();
    FranchiseloadBookingsApproved();
});

function FranchiseloadBookingsApproved() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        //url: "/Dashboard/FranchiseloadBookingsApproved",
        url: "/FranchiseDashboard/FranchiseloadBookingsApproved",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_FranchiseBookingsApproved').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_FranchiseBookingsApproved').DataTable({
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
                $('#tbl_FranchiseBookingsApproved').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
