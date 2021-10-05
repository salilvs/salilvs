$(function () {
    loadcustomerdetails();
    $("#txtdurationfrom,#txtdurationto").datetimepicker({
        // Formats
        format: 'YYYY-MM-DD',
        icons:
        {
            next: 'fa fa-angle-right',
            previous: 'fa fa-angle-left'
        },
    });
    $("#btnView").click(function () {
        var date1 = $("#txtdurationfrom").val(); var date2 = $("#txtdurationto").val();
        loadcustomerdetails(date1, date2);
    });
});

function loadcustomerdetails(date1, date2) {
    var data = new FormData();
    data.append("From_Date", date1);
    data.append("To_Date", date2);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Reports/LoadCustomerDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            console.log(dat);
            if (dat.length > 0) {
                console.log(dat);
                var table = $('#tbl_customerslist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_customerslist').DataTable({
                    data: dat,
                    autoWidth: true,
                    dom: 'Bfrtip',
                    buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var image = row.customer_Photo;
                                return '<td><div class="sidebar-user"><div class="sidebar-user-picture"><img alt="image" src="' + image + '" width="50px" height="50px"></div></div></td>';
                            }
                        },
                        { data: 'customer_Name' },
                        { data: 'customer_Address' },
                        { data: 'customer_Email' },
                        { data: 'customer_Mobile' },
                        { data: 'customer_Appointment_Date' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var code = row.customer_Uniqueid;
                                return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewvendormaincategorydetails(\'' + code + '\')" ><i class="feather icon-edit"></i></button> ';
                            }
                        }
                    ]
                });
            }
            else {
                var table = $('#tbl_customerslist').DataTable({ destroy: true });
                table.clear();
                table.destroy();

                $('#tbl_customerslist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}