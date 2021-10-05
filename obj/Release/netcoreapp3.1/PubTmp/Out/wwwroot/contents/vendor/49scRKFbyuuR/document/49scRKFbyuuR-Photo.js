$(function () {
    imageDeliveryBoyImag();
    loadDeliveryBoydetails();

    //$('#vendorcategoryform')[0].reset();
    $('#btnSave').unbind().click(function () {
        event.preventDefault();
        //$('#btnvendorProductCategorySave').prop('disabled', false);
        //if ($('#vendorcategoryform').parsley().validate() !== true) {
        //    $('#btnvendorProductCategorySave').prop('disabled', false);
        //}
        //else {
        //    $('#btnvendorProductCategorySave').prop('disabled', true);
        //    saveProductcategorydetails();
        //}
        savedetails();
    });

    $('#image1').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
    $("#txtdofb").datetimepicker({
        // Formats
        format: 'YYYY-MM-DD',
        icons:
        {
            next: 'fa fa-angle-right',
            previous: 'fa fa-angle-left'
        },
    });
    $("#txtworkinghoursfrom,#txtworkinghoursto,#txtbreaktimefrom,#txtbreaktimeto").datetimepicker({
        // Formats
        format: 'LT',
        ignoreReadonly: true,
        icons:
        {
            up: "fa fa-arrow-up",
            down: "fa fa-arrow-down",
        },
    });

    $("#txtworkinghoursfrom1,#txtworkinghoursto1,#txtbreaktimefrom,#txtbreaktimeto").datetimepicker({
        // Formats
        format: 'LT',
        ignoreReadonly: true,
        icons:
        {
            up: "fa fa-arrow-up",
            down: "fa fa-arrow-down",
        },
    });

    loadcountrydetails();
    $('#ddlcountry').change(function () {
        loadstatedetails($('#ddlcountry').val());
    });
    $('#ddlstate').change(function () {
        loadcitydetails($('#ddlstate').val());
    });

    $('#ddltypeofslotgap').change(function () {
        var xxx = ($("#txtworkinghoursfrom1").val());
        var yyy = ($("#txtworkinghoursto1").val());

        if (xxx == "" && yyy == "") {
            get_Slot();
        }
        else {
            get_Slot();
            get_Slot1();

        }
    });
   
    function get_Slot()
    {
        var wfrom = ($.trim($("#txtworkinghoursfrom").val()));
        var wto = ($.trim($("#txtworkinghoursto").val()));
        var valuestart = wfrom;
        var valuestop = wto;
        var timeStart = getTwentyFourHourTime(valuestart); //new Date("01/01/2007 " + valuestart).getHours();
        var timeEnd = getTwentyFourHourTime(valuestop);//new Date("01/01/2007 " + valuestop).getHours();
        var hourDiff = timeEnd - timeStart;
        var typsl = ($.trim($("#ddltypeofslot").val()));
        var slgp = ($.trim($("#ddltypeofslotgap").val()));
        if ((typsl == 1) && (slgp == 30)) {
            var timeStops = getTimeStops(timeStart, timeEnd);
            var table = $('<table style="width:100%;" class="table table-bordered">Shift 1</table>');
            jQuery.each(timeStops, function (i, val) {

                var val2 = secondVal = '';
                if (i > 0) {
                    if (timeStops[parseInt(i + 1)]) {
                        val2 = timeStops[parseInt(i + 1)].slice(0, -3);
                        var newTime = moment(val2, 'hh:mm');
                        val2 = newTime.subtract(30, 'minutes');
                        secondVal = new moment(val2).format('hh:mm A')
                    }
                    table.append($('<tr></tr>').append($('<td>Slot</td>').append(parseFloat(i + 1))).append($('<td></td>').append(val + '-' + secondVal)));
                } else {
                    //table.append($('<tr></tr>').append($('<td>Slot</td>').append(parseFloat(i + 1))).append($('<td></td>').append(val)));
                    val2 = timeStops[parseInt(i + 1)].slice(0, -3);
                    var newTime = moment(val2, 'hh:mm');
                    val2 = newTime.subtract(30, 'minutes');
                    secondVal = new moment(val2).format('hh:mm A')
                    table.append($('<tr></tr>').append($('<td>Slot</td>').append(parseFloat(i + 1))).append($('<td></td>').append(val + '-' + secondVal)));
                }
            });
            $('#deliveryboytimeslot').html(table);
        }
        if ((typsl == 1) && (slgp == 1)) {
            var timeStops = getTimeStops1(timeStart, timeEnd);
            var table = $('<table style="width:100%;" class="table table-bordered">Shift 1</table>');
            jQuery.each(timeStops, function (i, val) {
                var val2 = secondVal = '';

                if (i > 0) {
                    if (timeStops[parseInt(i + 1)]) {
                        val2 = timeStops[parseInt(i + 1)].slice(0, -3);
                        var newTime = moment(val2, 'hh:mm');
                        val2 = newTime.subtract(60, 'minutes');
                        secondVal = new moment(val2).format('hh:mm A')
                    }
                    table.append($('<tr></tr>').append($('<td>Slot</td>').append(parseFloat(i + 1))).append($('<td></td>').append(val + '-' + secondVal)));
                } else {
                    //table.append($('<tr></tr>').append($('<td>Slot</td>').append(parseFloat(i + 1))).append($('<td></td>').append(val)));
                    val2 = timeStops[parseInt(i + 1)].slice(0, -3);
                    var newTime = moment(val2, 'hh:mm');
                    val2 = newTime.subtract(60, 'minutes');
                    secondVal = new moment(val2).format('hh:mm A')
                    table.append($('<tr></tr>').append($('<td>Slot</td>').append(parseFloat(i + 1))).append($('<td></td>').append(val + '-' + secondVal)));
                }
                // table.append($('<tr></tr>').append($('<td></td>').append(parseFloat(i + 1))).append($('<td></td>').append(val)));
            });
            $('#deliveryboytimeslot').html(table);
        }
        if ((typsl == 2) && (slgp == 30)) {
            var timeStops = getTimeStops2(timeStart, timeEnd);
            var table = $('<table style="width:100%;" class="table table-bordered">Shift 1</table>');
            jQuery.each(timeStops, function (i, val) {
                var val2 = secondVal = '';
                if (i > 0) {
                    if (timeStops[parseInt(i + 1)]) {
                        val2 = timeStops[parseInt(i + 1)].slice(0, -3);
                        var newTime = moment(val2, 'hh:mm');
                        val2 = newTime.subtract(30, 'minutes');
                        secondVal = new moment(val2).format('hh:mm A')
                    }
                    table.append($('<tr></tr>').append($('<td>Slot</td>').append(parseFloat(i + 1))).append($('<td></td>').append(val + '-' + secondVal)));
                } else {
                    //table.append($('<tr></tr>').append($('<td>Slot</td>').append(parseFloat(i + 1))).append($('<td></td>').append(val)));
                    val2 = timeStops[parseInt(i + 1)].slice(0, -3);
                    var newTime = moment(val2, 'hh:mm');
                    val2 = newTime.subtract(30, 'minutes');
                    secondVal = new moment(val2).format('hh:mm A')
                    table.append($('<tr></tr>').append($('<td>Slot</td>').append(parseFloat(i + 1))).append($('<td></td>').append(val + '-' + secondVal)));
                }
                //table.append($('<tr></tr>').append($('<td></td>').append(parseFloat(i + 1))).append($('<td></td>').append(val)));
            });
            $('#deliveryboytimeslot').html(table);
        }
        if ((typsl == 2) && (slgp == 1)) {
            var timeStops = getTimeStops3(timeStart, timeEnd);
            var table = $('<table style="width:100%;" class="table table-bordered">Shift 1</table>');
            jQuery.each(timeStops, function (i, val) {
                var val2 = secondVal = '';
                if (i > 0) {
                    if (timeStops[parseInt(i + 1)]) {
                        val2 = timeStops[parseInt(i + 1)].slice(0, -3);
                        var newTime = moment(val2, 'hh:mm');
                        val2 = newTime.subtract(60, 'minutes');
                        secondVal = new moment(val2).format('hh:mm A')
                    }
                    table.append($('<tr></tr>').append($('<td>Slot</td>').append(parseFloat(i + 1))).append($('<td></td>').append(val + '-' + secondVal)));
                } else {
                    //table.append($('<tr></tr>').append($('<td>Slot</td>').append(parseFloat(i + 1))).append($('<td></td>').append(val)));
                    val2 = timeStops[parseInt(i + 1)].slice(0, -3);
                    var newTime = moment(val2, 'hh:mm');
                    val2 = newTime.subtract(60, 'minutes');
                    secondVal = new moment(val2).format('hh:mm A')
                    table.append($('<tr></tr>').append($('<td>Slot</td>').append(parseFloat(i + 1))).append($('<td></td>').append(val + '-' + secondVal)));
                }
                //  table.append($('<tr></tr>').append($('<td></td>').append(parseFloat(i + 1))).append($('<td></td>').append(val)));
            });
            $('#deliveryboytimeslot').html(table);
        }
    }

    function get_Slot1() {
        var wfrom1 = ($.trim($("#txtworkinghoursfrom1").val()));
        var wto1 = ($.trim($("#txtworkinghoursto1").val()));
        var valuestart1 = wfrom1;
        var valuestop1 = wto1;
        var timeStart1 = getTwentyFourHourTime(valuestart1); //new Date("01/01/2007 " + valuestart).getHours();
        var timeEnd1 = getTwentyFourHourTime(valuestop1);//new Date("01/01/2007 " + valuestop).getHours();
        var hourDiff1 = timeEnd1 - timeStart1;
        var typsl1 = ($.trim($("#ddltypeofslot").val()));
        var slgp1 = ($.trim($("#ddltypeofslotgap").val()));
        if ((typsl1 == 1) && (slgp1 == 30)) {
            var timeStops1 = getTimeStops(timeStart1, timeEnd1);
            var table1 = $('<table style="width:100%;" class="table table-bordered">Shift 2</table>');
            jQuery.each(timeStops, function (i, val) {

                var val2 = secondVal = '';
                if (i > 0) {
                    if (timeStops[parseInt(i + 1)]) {
                        val2 = timeStops[parseInt(i + 1)].slice(0, -3);
                        var newTime = moment(val2, 'hh:mm');
                        val2 = newTime.subtract(30, 'minutes');
                        secondVal = new moment(val2).format('hh:mm A')
                    }
                    table.append($('<tr></tr>').append($('<td>Slot</td>').append(parseFloat(i + 1))).append($('<td></td>').append(val + '-' + secondVal)));
                } else {
                    //table.append($('<tr></tr>').append($('<td>Slot</td>').append(parseFloat(i + 1))).append($('<td></td>').append(val)));
                    val2 = timeStops[parseInt(i + 1)].slice(0, -3);
                    var newTime = moment(val2, 'hh:mm');
                    val2 = newTime.subtract(30, 'minutes');
                    secondVal = new moment(val2).format('hh:mm A')
                    table.append($('<tr></tr>').append($('<td>Slot</td>').append(parseFloat(i + 1))).append($('<td></td>').append(val + '-' + secondVal)));
                }
            });
            $('#deliveryboytimeslot').html(table);
        }
        if ((typsl == 1) && (slgp == 1)) {
            var timeStops = getTimeStops1(timeStart, timeEnd);
            var table = $('<table style="width:100%;" class="table table-bordered">Shift 2</table>');
            jQuery.each(timeStops, function (i, val) {
                var val2 = secondVal = '';

                if (i > 0) {
                    if (timeStops[parseInt(i + 1)]) {
                        val2 = timeStops[parseInt(i + 1)].slice(0, -3);
                        var newTime = moment(val2, 'hh:mm');
                        val2 = newTime.subtract(60, 'minutes');
                        secondVal = new moment(val2).format('hh:mm A')
                    }
                    table.append($('<tr></tr>').append($('<td>Slot</td>').append(parseFloat(i + 1))).append($('<td></td>').append(val + '-' + secondVal)));
                } else {
                    //table.append($('<tr></tr>').append($('<td>Slot</td>').append(parseFloat(i + 1))).append($('<td></td>').append(val)));
                    val2 = timeStops[parseInt(i + 1)].slice(0, -3);
                    var newTime = moment(val2, 'hh:mm');
                    val2 = newTime.subtract(60, 'minutes');
                    secondVal = new moment(val2).format('hh:mm A')
                    table.append($('<tr></tr>').append($('<td>Slot</td>').append(parseFloat(i + 1))).append($('<td></td>').append(val + '-' + secondVal)));
                }
                // table.append($('<tr></tr>').append($('<td></td>').append(parseFloat(i + 1))).append($('<td></td>').append(val)));
            });
            $('#deliveryboytimeslot').html(table);
        }
        if ((typsl == 2) && (slgp == 30)) {
            var timeStops = getTimeStops2(timeStart, timeEnd);
            var table = $('<table style="width:100%;" class="table table-bordered">Shift 2</table>');
            jQuery.each(timeStops, function (i, val) {
                var val2 = secondVal = '';
                if (i > 0) {
                    if (timeStops[parseInt(i + 1)]) {
                        val2 = timeStops[parseInt(i + 1)].slice(0, -3);
                        var newTime = moment(val2, 'hh:mm');
                        val2 = newTime.subtract(30, 'minutes');
                        secondVal = new moment(val2).format('hh:mm A')
                    }
                    table.append($('<tr></tr>').append($('<td>Slot</td>').append(parseFloat(i + 1))).append($('<td></td>').append(val + '-' + secondVal)));
                } else {
                    //table.append($('<tr></tr>').append($('<td>Slot</td>').append(parseFloat(i + 1))).append($('<td></td>').append(val)));
                    val2 = timeStops[parseInt(i + 1)].slice(0, -3);
                    var newTime = moment(val2, 'hh:mm');
                    val2 = newTime.subtract(30, 'minutes');
                    secondVal = new moment(val2).format('hh:mm A')
                    table.append($('<tr></tr>').append($('<td>Slot</td>').append(parseFloat(i + 1))).append($('<td></td>').append(val + '-' + secondVal)));
                }
                //table.append($('<tr></tr>').append($('<td></td>').append(parseFloat(i + 1))).append($('<td></td>').append(val)));
            });
            $('#deliveryboytimeslot').html(table);
        }
        if ((typsl == 2) && (slgp == 1)) {
            var timeStops = getTimeStops3(timeStart, timeEnd);
            var table = $('<table style="width:100%;" class="table table-bordered">Shift 2</table>');
            jQuery.each(timeStops, function (i, val) {
                var val2 = secondVal = '';
                if (i > 0) {
                    if (timeStops[parseInt(i + 1)]) {
                        val2 = timeStops[parseInt(i + 1)].slice(0, -3);
                        var newTime = moment(val2, 'hh:mm');
                        val2 = newTime.subtract(60, 'minutes');
                        secondVal = new moment(val2).format('hh:mm A')
                    }
                    table.append($('<tr></tr>').append($('<td>Slot</td>').append(parseFloat(i + 1))).append($('<td></td>').append(val + '-' + secondVal)));
                } else {
                    //table.append($('<tr></tr>').append($('<td>Slot</td>').append(parseFloat(i + 1))).append($('<td></td>').append(val)));
                    val2 = timeStops[parseInt(i + 1)].slice(0, -3);
                    var newTime = moment(val2, 'hh:mm');
                    val2 = newTime.subtract(60, 'minutes');
                    secondVal = new moment(val2).format('hh:mm A')
                    table.append($('<tr></tr>').append($('<td>Slot</td>').append(parseFloat(i + 1))).append($('<td></td>').append(val + '-' + secondVal)));
                }
                //  table.append($('<tr></tr>').append($('<td></td>').append(parseFloat(i + 1))).append($('<td></td>').append(val)));
            });
            $('#deliveryboytimeslot').html(table);
        }
    }
    $('#btntimeslot').unbind().click(function () {
        $('#Time-Slot-Modal').hide();
    });


    function getTimeStops(start, end) {
        var startTime = moment(start, 'HH:mm');
        var endTime = moment(end, 'HH:mm');
        if (endTime.isBefore(startTime)) {
            endTime.add(1, 'day');
        }
        var timeStops = [];
        while (startTime <= endTime) {
            timeStops.push(new moment(startTime).format('hh:mm A'));
            startTime.add(60, 'minutes');
            startTime.add(30, 'minutes');
        }
        return timeStops;
    }

    function getTimeStops1(start, end) {
        var startTime = moment(start, 'HH:mm');
        var endTime = moment(end, 'HH:mm');
        if (endTime.isBefore(startTime)) {
            endTime.add(1, 'day');
        }
        var timeStops = [];
        while (startTime <= endTime) {
            timeStops.push(new moment(startTime).format('hh:mm A'));
            startTime.add(60, 'minutes');
            startTime.add(60, 'minutes');
        }
        return timeStops;
    }
    function getTimeStops2(start, end) {
        var startTime = moment(start, 'HH:mm');
        var endTime = moment(end, 'HH:mm');
        if (endTime.isBefore(startTime)) {
            endTime.add(1, 'day');
        }
        var timeStops = [];
        while (startTime <= endTime) {
            timeStops.push(new moment(startTime).format('hh:mm A'));
            startTime.add(120, 'minutes');
            startTime.add(30, 'minutes');
        }
        return timeStops;
    }
    function getTimeStops3(start, end) {
        var startTime = moment(start, 'HH:mm');
        var endTime = moment(end, 'HH:mm');
        if (endTime.isBefore(startTime)) {
            endTime.add(1, 'day');
        }
        var timeStops = [];
        while (startTime <= endTime) {
            timeStops.push(new moment(startTime).format('hh:mm A'));
            startTime.add(120, 'minutes');
            startTime.add(60, 'minutes');
        }
        return timeStops;
    }

    //var timeStops = getTimeStops('11:00', '02:00');
    //alert(timeStops);
    //console.log('timeStops ', timeStops);
    //timeStops = getTimeStops('11:00', '23:59');
    //console.log('timeStops ', timeStops);


    $('#btnRequestApprove').unbind().click(function (e) {
        $('#btnRequestApprove').prop('disabled', true);
        if ($('#vendorform').parsley().validate() !== true) {
            $('#btnRequestApprove').prop('disabled', false);
        }
        else {
            approvevendordetails();
        }
    });

    $('#btnRequestReject').unbind().click(function (e) {
        $('#btnRequestReject').prop('disabled', true);
        if ($('#vendorform').parsley().validate() !== true) {
            $('#btnRequestReject').prop('disabled', false);
        }
        else {
            Rejectdetails();
        }
    });
});

function approvevendordetails() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/DeliveryBoy/ApproveDeliveryBoyDetails",
        dataType: "json",
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                $('#Vendor-Modal').modal("hide");
                resetvendor();
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message);
                $('#btnRequestApprove').prop('disabled', false);
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                $('#btnRequestApprove').prop('disabled', false);
            }
            else {
                var content = "Invalid";
                var title = "Invalid.";
                ErrorAlert(title, content);
                $('#btnRequestApprove').prop('disabled', false);
            }
        },
        error: function (response) {

        }
    });
}
function Rejectdetails() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/DeliveryBoy/RejectDeliveryBoyDetails",
        dataType: "json",
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                $('#Vendor-Modal').modal("hide");
                resetvendor();
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message);
                $('#btnRequestApprove').prop('disabled', false);
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                $('#btnRequestApprove').prop('disabled', false);
            }
            else {
                var content = "Invalid";
                var title = "Invalid.";
                ErrorAlert(title, content);
                $('#btnRequestApprove').prop('disabled', false);
            }
        },
        error: function (response) {

        }
    });
}
function loadDeliveryBoydetails() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/DeliveryBoy/LoadDeliverBoy",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_deliveryBoy').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_deliveryBoy').DataTable({
                    data: dat,
                    autoWidth: true,
                    responsive: true,
                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                        //{
                        //    orderable: false,
                        //    render: function (data, type, row) {
                        //        var image = row.Vendor_Photo;
                        //        return '<td><div class="sidebar-user"><div class="sidebar-user-picture"><img alt="image" src="' + image + '" width="50px" height="50px"></div></div></td>';
                        //    }
                        //},
                        { data: 'Name' },
                        { data: 'DOB' },
                        { data: 'Address' },
                        { data: 'Gender' },
                        { data: 'Email' },
                        { data: 'Phone' },
                        { data: 'Status' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                //        var stat = row.Vendor_Status;
                                //        if (stat == "Pending") {
                                //            return '<span class="badge badge-pill badge-warning">' + stat + '</span>';
                                //        }
                                //        else { return '<span class="badge badge-pill badge-danger">' + stat + '</span>'; }
                                //    }
                                //},
                                //{
                                //    orderable: false,
                                //    render: function (data, type, row) {
                                //if (row.Vendor_Status == "Pending" || row.Vendor_Status == "Rejected") {
                                //if (row.Vendor_Status == "Pending" || row.Vendor_Status == "Rejected") {
                                var code = row.Id;
                                return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" data-vid=' + code + ' onclick="viewDeliveryBoydetail(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button></td>';
                                //return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" data-vid=' + code + ' onclick="viewDeliveryBoydetail(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button></td>';

                                //}
                                //else {
                                //    var code = row.Vendor_uniqueid;
                                //    return '<td>Nothing to perform</td>';
                                //}
                            }
                        }
                    ]
                });
            }
            else {
                $('#tbl_deliveryBoy').DataTable();
            }
        },
        error: function (response) {

        }
    });
}


function viewDeliveryBoydetail(code) {
    swal({
        title: "Are you sure?",
        text: "Do you want to edit the data!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes, Edit it!",
    }, function (isConfirm) {
        if (isConfirm) {
            var data = new FormData();
            data.append("Id", code);
            // data.append("Id", GetURLParameter('vid'));
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                //url: "/VendorProduct/ProductCategoryView",
                url: "/DeliveryBoy/DeliveryBoyView",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        $('#btnVendorCategoryUpdate').show();
                        $('#btnvendorProductCategorySave').hide();
                        $('#DeliveryBoy-Modal').modal('show');
                        $.each(response, function (i, vari) {
                            if (vari.Package_Photo != "" && vari.Photo != null) {
                                $('#txtphoto1').val(vari.Photo);
                                $('#image1').attr('src', vari.ProductCategory__Photo);
                                $('#photo1').prop("required", false);
                            }
                            else {
                                $('#txtphoto1').val("");
                                $('#image1').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
                                $('#photo1').prop("required", true);
                            }
                            //$('#ddlvendortype').val(vari.Vendor_typeId);
                            //loadvendorsubtype(vari.Vendor_typeId, vari.Vendor_Sub_typeId);
                            // loadVendorType()(vari.Vendor_typeId, vari.Vendor_Sub_typeId);
                            //loadservicesbymaincategory(vari.Package_Main_Category_Id, vari.Package_Main_Service_Id);
                            // loadsubservicebyservice(vari.Package_Main_Category_Id, vari.Package_Main_Service_Id, vari.Package_Sub_Service_Id);

                            
                            $('#txtname').val(vari.Name);
                            $('#txtdofb').val(vari.DOB); 
                            $('#txtaddress').val(vari.Address);
                            $('#txtgender').val(vari.Gender);
                            $('#txtemail').val(vari.Email);
                            $('#txtphone').val(vari.Phone);
                            $('#ddlcountry').val(vari.DeliverBoy_Country);
                            //$('#ddlstate').val(vari.DeliverBoy_State);
                            loadstatedetails(vari.DeliverBoy_Country, vari.DeliverBoy_State)
                            loadcitydetails(vari.DeliverBoy_State, vari.DeliverBoy_City);
                            var selectedValues = vari.Workingdays.split(',');
                            $.each(selectedValues, function (i, result) {
                                $("input[name='chkholiday'][value='" + selectedValues[i] + "']").prop('checked', false);
                            });
                            $("#txtproof1").val(vari.Documents1);
                            $("#txtproof2").val(vari.Documents2);
                            $("#txtproof3").val(vari.Documents3);
                            $("#txtproof4").val(vari.Documents4);
                            if (vari.Documents1 != "") {
                                $('#proof1').hide();
                                $('#proof1').prop('required', false);
                                $('#btnproof1download').show();
                                $('#btnproof1remove').show();
                                $('#btnproof1download').unbind().click(function () {
                                    var iframe = "<iframe width='100%' height='100%' src='" + vari.Documents1 + "'></iframe>"
                                    var x = window.open();
                                    x.document.open();

                                    x.document.Title = "Document 1";
                                    x.document.write(iframe);
                                    x.document.close();
                                });
                            }
                            else {
                                $('#proof1').show();
                                $('#proof1').prop('required', true);
                                $('#btnproof1download').hide();
                                $('#btnproof1remove').hide();
                            }
                            if (vari.Documents2 != "") {
                                $('#proof2').hide();
                                $('#btnproof2download').show();
                                $('#btnproof2remove').show();
                                $('#btnproof2download').unbind().click(function () {
                                    var iframe = "<iframe width='100%' height='100%' src='" + vari.Documents2 + "'></iframe>"
                                    var x = window.open();
                                    x.document.open();

                                    x.document.Title = "Document 2";
                                    x.document.write(iframe);
                                    x.document.close();
                                });
                            }
                            else {
                                $('#proof2').show();
                                $('#btnproof2download').hide();
                                $('#btnproof2remove').hide();
                            }
                            if (vari.Documents3 != "") {
                                $('#proof3').hide();
                                $('#btnproof3download').show();
                                $('#btnproof3remove').show();
                                $('#btnproof3download').unbind().click(function () {
                                    var iframe = "<iframe width='100%' height='100%' src='" + vari.Documents3 + "'></iframe>"
                                    var x = window.open();
                                    x.document.open();

                                    x.document.Title = "Document 3";
                                    x.document.write(iframe);
                                    x.document.close();
                                });
                            }
                            else {
                                $('#proof3').show();
                                $('#btnproof3download').hide();
                                $('#btnproof3remove').hide();
                            }
                            if (vari.Documents4 != "") {
                                $('#proof4').hide();
                                $('#btnproof4download').show();
                                $('#btnproof4remove').show();
                                $('#btnproof4download').unbind().click(function () {
                                    var iframe = "<iframe width='100%' height='100%' src='" + vari.Documents4 + "'></iframe>"
                                    var x = window.open();
                                    x.document.open();
                                    x.document.Title = "Document 4";
                                    x.document.write(iframe);
                                    x.document.close();
                                });
                            }
                            else {
                                $('#proof4').show();
                                $('#btnproof4download').hide();
                                $('#btnproof4remove').hide();
                            }
                            $('#txtbankname').val(vari.BankName);
                            $('#txtaccountnumber').val(vari.AccountNumber);
                            $('#txtifsccode').val(vari.IFSC_Code);
                            $('#ddltypeofveh').val(vari.VehicleType);
                            $('#txtvehicleDescription').val(vari.VehicleDescription);

                            //$('input:radio[name=homeservice]').filter('[value="' + vari.Package_Home_Service + '"]').attr('checked', true);
                            $('#txtProductDiscripation').val(vari.ProductCategoryDescription);
                            $('#ddlProductStatus').val(vari.ProductCategoryStatus);
                            $.each(vari.rejp, function (i, varis) {
                                console.log(varis.Rejected_reason);
                                $('#reasonSection').append(
                                    '<label>Rejected Reason</label>' +
                                    '<div class="row">' +
                                    '<div class="col-6"><input class="form-control" value="' + varis.Rejected_reason + '" ></div><div class="col-6"><input class="form-control" value="' + varis.Created_date + '" ></div><br/>' +
                                    '</div>'
                                );
                            });
                            //if (null != vari.Package_Available_Days) {
                            //    var selectedValues = vari.Package_Available_Days.split(',');
                            //    $.each($("input[name='chkpackageAvailableDay']:checked"), function () {
                            //        $("input[name='chkpackageAvailableDay']:checked").prop('checked', false);
                            //    });
                            //    $.each(selectedValues, function (i, result) {
                            //        $("input[name='chkpackageAvailableDay'][value='" + selectedValues[i] + "']").prop('checked', true);
                            //    });
                            //}
                        });
                    }
                    else {

                    }
                },
                error: function (response) {

                }
            });

        } else {


        }
    });
}
function savedetails() {
    var holidays = [];
    $.each($("input[name='chkholiday']").not(":checked"), function () {
        holidays.push($(this).val());
    });
    var data = new FormData();
    //data.append("Vendor_Type_Id", GetURLParameter('vid'));
    data.append("Boy__Photo", $("#photo1").get(0).files[0]);
    data.append("Name", $.trim($('#txtname').val()));
    data.append("DateOfBrithday", $.trim($('#txtdofb').val()));
    data.append("Address", $.trim($('#txtaddress').val()));
    data.append('Gender', $('input[name=rdogender]:checked').val());
    data.append("Mail", $.trim($('#txtemail').val()));
    data.append("Phone", $.trim($('#txtphone').val()));
    data.append("Country", $.trim($("#ddlcountry").val()));
    data.append("State", $.trim($("#ddlstate").val()));
    data.append("City", $.trim($("#ddlcity").val()));
    data.append("Vendor_Document_Doc_1", $("#proof1").get(0).files[0]);
    data.append("Vendor_Document_Doc_2", $("#proof2").get(0).files[0]);
    data.append("Vendor_Document_Doc_3", $("#proof3").get(0).files[0]);
    data.append("Vendor_Document_Doc_4", $("#proof4").get(0).files[0]);
    data.append("Vendor_Document_Doc_1_Check", $.trim($("#txtproof1").val()));
    data.append("Vendor_Document_Doc_2_Check", $.trim($("#txtproof2").val()));
    data.append("Vendor_Document_Doc_3_Check", $.trim($("#txtproof3").val()));
    data.append("Vendor_Document_Doc_4_Check", $.trim($("#txtproof4").val()));
    data.append("Workingdays", holidays);

    data.append("BankName", $.trim($('#txtbankname').val()));
    data.append("AccountNumber", $.trim($('#txtaccountnumber').val()));
    data.append("Ifsc", $.trim($('#txtifsccode').val()));
    data.append("TypeOfVeh", $.trim($('#ddltypeofveh').val()));
    data.append("vehicleDescription", $.trim($('#txtvehicleDescription').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        //url: "/VendorProduct/saveProductcategorydetails",
        url: "/DeliveryBoy/saveDeliveryBoyDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                resetpackagedetails();
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message);
                $('#btnVendorPackageSave').prop('disabled', false);
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                $('#btnVendorPackageSave').prop('disabled', false);
            }
            else {
                var content = "Invalid";
                var title = "Invalid username or password.";
                ErrorAlert(title, content);
                $('#btnVendorPackageSave').prop('disabled', false);
            }
        },
        error: function (response) {

        }
    });
}



function getTwentyFourHourTime(amPmString) {
    var d = new Date("1/1/2013 " + amPmString);
    return d.getHours() + ':' + d.getMinutes();
}
function tConv24(time24) {
    var ts = time24;
    var H = +ts.substr(0, 2);
    var h = (H % 12) || 12;
    h = (h < 10) ? ("0" + h) : h;  // leading 0 at the left for 1 digit hours
    var ampm = H < 12 ? " AM" : " PM";
    ts = h + ts.substr(2, 3) + ampm;
    return ts;
};
function loadcountrydetails() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorCreation/LoadCountry",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlcountry").html("");
                $("#ddlcountry").append('<option value="">Select Country</option>');
                $.each(response, function (i, vari) {
                    $("#ddlcountry").append('<option value="' + vari.id + '">' + vari.name + '</option>');
                });
            }
            else {

            }
        },
        error: function (response) {

        }
    });
}
function loadstatedetails(country, state) {
    var data = new FormData();
    data.append("country", country);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorCreation/LoadState",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlstate").html("");
                $("#ddlstate").append('<option value="">Select State</option>');
                var code = "";
                $.each(response, function (i, vari) {
                    $("#ddlstate").append('<option value="' + vari.id + '">' + vari.name + '</option>');
                    code = vari.phone_code;
                });
                $('#txtphonecode').text(code);
                if (state != "" && state != null) {
                    $('#ddlstate').val(state);
                }
            }
            else {

            }
        },
        error: function (response) {

        }
    });
}
function loadcitydetails(state, city) {
    var data = new FormData();
    data.append("state", state);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorCreation/LoadCity",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlcity").html("");
                $("#ddlcity").append('<option value="">Select City</option>');
                $.each(response, function (i, vari) {
                    $("#ddlcity").append('<option value="' + vari.id + '">' + vari.name + '</option>');
                });
                $("#ddlcity").val(city);
            }
            else {

            }
        },
        error: function (response) {

        }
    });
}
function imageDeliveryBoyImag() {
    $('#image1').click(function (e) {
        $('#photo1').click();
    });
    $('#photo1').change(function () {
        fasterPreviewimage1(this);
    });

    function fasterPreviewimage1(uploader) {
        if (uploader.files && uploader.files[0]) {
            $('#image1').attr('src', window.URL.createObjectURL(uploader.files[0]));
        }
    }
}