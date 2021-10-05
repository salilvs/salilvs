$(function () {
    $('input.thresold-i').maxlength()
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;

    $("#txtfrom").datetimepicker({
        // Formats
        format: 'YYYY-MM-DD',
        sideBySide: true,
        icons:
        {
            next: 'fa fa-angle-right',
            previous: 'fa fa-angle-left'
        },
        maxDate: today,

    }).on('dp.change', function (e) {
        $('#txtto').data("DateTimePicker").minDate(e.date)
    });


    $("#txtto").datetimepicker({
        // Formats
        format: 'YYYY-MM-DD',
        sideBySide: true,
        icons:
        {
            next: 'fa fa-angle-right',
            previous: 'fa fa-angle-left'
        },
        maxDate: today,

    });
    //loadpaymentdetails();
    $('#btnList').unbind().click(function () {
      ListPaymentDetails();
    });
    
});

function ListPaymentDetails() {

    var data = new FormData();
    var xx = $.trim($("#txtfrom").val());
    var yy = $.trim($("#txtto").val());
    data.append("Appointment_From_date", $.trim($("#txtfrom").val()));
    data.append("Appointment_To_date", $.trim($("#txtto").val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorCreation/ListPaymentdetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
          //  $("#tbl_paymentreport").empty();
           // alert(dat.length);
            //var table = null;
            if (dat.length > 0) {
                //var table = $('#tbl_paymentreport').DataTable({ destroy: true });

                var table = $('#tbl_paymentreport').DataTable();
                table.clear();
                table.destroy();
            //    document.getElementById("#tbl_paymentreport").deleteTFoot();
               // table.append.clear();
                //$('#tbl_paymentreport').DataTable.h
               // $("#tbl_paymentreport").empty();
                
                $('#tbl_paymentreport').append('<caption style="caption-side: top;font-size: 18px; color: brown;">PerBooking Report  (' + xx +' _ '+ yy + ')</caption>');
                $('#tbl_paymentreport').DataTable({
                    data: dat,
                    autoWidth: true,
                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },

                        { data: 'customer_Name' },
                        { data: 'vendor_Name' },
                        { data: 'vendor_Employee_Name' },
                        { data: 'package_Name' },
                        { data: 'package_Rate' },
                        { data: 'commission_Type' },
                        { data: 'commission' },
                        { data: 'payment_Total' },
                        { data: 'commission_Amt' },
                        { data: 'payment_Type' },
                        { data: 'amount' },
                        { data: 'gst' },

                    ],
                   
                    "dom": 'Bfrtip',
                    "buttons": [
                        {
                            extend: 'copy', footer: true,
                            className: 'btn btn-dark rounded-0',
                            text: '<i class="far fa-copy"></i> Copy'
                        },
                        {
                            extend: 'excel', footer: true ,
                            className: 'btn btn-dark rounded-0',
                            text: '<i class="far fa-file-excel"></i> Excel'
                        },
                        {
                            //extend: 'pdf',footer:true,
                            //className: 'btn btn-dark rounded-0',
                            //text: '<i class="far fa-file-pdf"></i> Pdf'
                            extend: 'pdfHtml5', footer: true,
                            className: 'btn btn-dark rounded-0',
                            text: '<i class="far fa-file-pdf"></i> Pdf',
                            orientation: 'landscape',
                            pageSize: 'LEGAL'
                        },
                        {
                            extend: 'csv', footer: true,
                            className: 'btn btn-dark rounded-0',
                            text: '<i class="fas fa-file-csv"></i> CSV'
                        },
                        {
                            extend: 'print', footer: true,
                            className: 'btn btn-dark rounded-0',
                            text: '<i class="fas fa-print"></i> Print'
                        }],
                    "footerCallback": function (row, data, start, end, display) {
                        console.log('aaya');
                        var api = this.api(), data;
                        // converting to interger to find total
                        var intVal = function (i) {
                            return typeof i === 'string' ?
                                i.replace(/[\$,]/g, '') * 1 :
                                typeof i === 'number' ?
                                    i : 0;
                        };
                        // computing column Total of the complete result 
                        var totamt= api
                            .column(8)
                            .data()
                            .reduce(function (a, b) {
                                // return intVal(a) + intVal(b);
                                var yy = intVal(a) + intVal(b);
                                return yy.toLocaleString('en-IN');
                                }, 0);

                       

                          var commamt = api
                            .column(9)
                            .data()
                              .reduce(function (a, b) {
                                  return (intVal(a) + intVal(b)).toLocaleString('en-IN');
                            }, 0);
                        var amt = api
                            .column(11)
                            .data()
                            .reduce(function (a, b) {
                                var tot1 = intVal(a) + intVal(b);

                                return parseFloat(tot1).toFixed(2);
                            }, 0);
                        var gst = api
                            .column(12)
                            .data()
                            .reduce(function (a, b) {
                                var tot2 = intVal(a) + intVal(b);
                                return parseFloat(tot2).toFixed(2);
                                //return intVal(a) + intVal(b);
                            }, 0);

                        var credittotal = api
                            .column(8)
                            .data()
                            .reduce(function (a, b) {
                                // Find index of current value for accessing sumCondition value in same row
                                var cur_index = api.column(8).data().indexOf(b);
                                if (api.column(10).data()[cur_index] != "Cash") {
                                    return parseInt(a) + parseInt(b);
                                }
                                else { return parseInt(a); }
                            }, 0);

                        var cashtotal = api
                            .column(8)
                            .data()
                            .reduce(function (a, b) {
                                // Find index of current value for accessing sumCondition value in same row
                                var cur_index = api.column(8).data().indexOf(b);
                                if (api.column(10).data()[cur_index] != "Credit") {
                                    return parseInt(a) + parseInt(b);
                                }
                                //var xx = xy.toLocaleString('en-IN');
                                //return (xx);
                               else { return parseInt(a); }
                            }, 0);

                        var netpay = api
                            .column(9)
                            .data()
                            .reduce(function (a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);

                        var netpayable = (credittotal - netpay).toLocaleString('en-IN');
                        var casht = cashtotal.toLocaleString('en-IN');
                        var creditt = credittotal.toLocaleString('en-IN');
                       // netpayable.toLocaleString('en-IN');

                        $(api.column(8).footer()).html(totamt);
                        $(api.column(9).footer()).html(commamt);
                        $(api.column(10).footer()).html('Credit Total- ' + creditt + '<br>' + ' Cash Total-' + casht);
                        $(api.column(11).footer()).html(amt);
                        $(api.column(12).footer()).html(gst);
                        $(api.column(6).footer()).html('Net Payable- ' + netpayable);
                      
                    }
                
                });
               
            }
            else {
                var table = $('#tbl_paymentreport').DataTable(/*{ destroy: true }*/);
                table.clear().draw();
                //$('#tbl_paymentreport tfoot').empty();
                table.destroy();
               // $("#tbl_paymentreport").empty();
               // alert("This report is already taken");
            }
        },
        error: function (response) {
           
            //$('#tbl_paymentreport').DataTable().clear();
            //$('#tbl_paymentreport').DataTable().destroy();
        }
    });
}

function loadpaymentdetails() {
    console.log("payment loaded");
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorCreation/loadpaymentdetails",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_paymentreport').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_paymentreport').DataTable({
                    data: dat,
                    autoWidth: true,
                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                       
                        { data: 'customer_Name' },
                        { data: 'vendor_Employee_Name' },
                        { data: 'package_Name' },
                        { data: 'package_Rate' },
                        { data: 'commission_Type' },
                        { data: 'commission' },
                        { data: 'payment_Total' },
                        { data: 'payment_Type' },
                       
                    ]
                });
            }
            else {
                $('#tbl_paymentreport').DataTable();
            }
        },
        error: function (response) {

        }
    });
}