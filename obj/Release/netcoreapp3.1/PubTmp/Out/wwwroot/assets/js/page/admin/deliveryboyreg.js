$(function () {
    imageDeliveryBoyImag();
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

    $('#btnproof1remove').unbind().click(function () {
        $('#proof1').show();
        $('#proof1').prop('required', true);
        $('#btnproof1download').hide();
        $('#btnproof1remove').hide();
    });
    $('#btnproof2remove').unbind().click(function () {
        $('#proof2').show();
        $('#btnproof2download').hide();
        $('#btnproof2remove').hide();
        $('#txtproof2').val('');
    });
    $('#btnproof3remove').unbind().click(function () {
        $('#proof3').show();
        $('#btnproof3download').hide();
        $('#btnproof3remove').hide();
        $('#txtproof3').val('');
    });
    $('#btnproof4remove').unbind().click(function () {
        $('#proof4').show();
        $('#btnproof4download').hide();
        $('#btnproof4remove').hide();
        $('#txtproof4').val('');
    });

    $('#ddltypeofslotgap').change(function () {
        var xxx = ($("#txtworkinghoursfrom1").val());
        var yyy = ($("#txtworkinghoursto1").val());
  
        if (xxx == "" && yyy == "") {
           // get_Slot();
            get_DeliverySlot();
            get_DeliverySlot1();
        }
        else
        {
          // get_Slot();
            //get_Slot1();
           get_DeliverySlot();
            get_DeliverySlot1();

        }
    });

    $('#ddltypeofslot').change(function () {
        var xxx = ($("#txtworkinghoursfrom1").val());
        var yyy = ($("#txtworkinghoursto1").val());
       //var  j=0;
        if (xxx == "" && yyy == "") {
           // get_Slot();
           get_DeliverySlot();
           get_DeliverySlot1();
        }
        else {
           // get_Slot();
            //get_Slot1();
            get_DeliverySlot();
           get_DeliverySlot1();

        }
    });


   
    function get_DeliverySlot() {
        $('#deliveryboytimeslotTable tbody').html('');
        var wfrom = ($.trim($("#txtworkinghoursfrom").val()));
        var wto = ($.trim($("#txtworkinghoursto").val()));
        var valuestart = wfrom;
        var valuestop = wto;
        var timeStart = getTwentyFourHourTime(valuestart); //new Date("01/01/2007 " + valuestart).getHours();
        var timeEnd = getTwentyFourHourTime(valuestop);//new Date("01/01/2007 " + valuestop).getHours();
        var hourDiff = timeEnd - timeStart;
        var typsl = ($.trim($("#ddltypeofslot").val()));
        var slgp = ($.trim($("#ddltypeofslotgap").val()));
        var typ;
        if (typsl == 1) {
            typ = 60;
        }
        if (typsl == 2) {
            typ = 120;
        }
        if (typsl == 3) {
            typ = 30;
        }
        var gp;
        if (slgp == 30) {
            gp = 30;
        }
        if (slgp == 1) {
            gp = 60;
        }
        if (slgp == 0) {
            gp = 0;
        }
        var timeStops = getDeliveryTimeStops(timeStart, timeEnd, typ, gp);

        //var table = $('<table style="width:100%;" class="table table-bordered">Shift 1</table>');
        var tableData = $('#deliveryboytimeslotTable');
        jQuery.each(timeStops, function (i, val) {
            $('#txtslotno').val(i); 
            var val1 = val2 = secondVal = firstVal = '';
            
            if (i > 0) {
                if (timeStops[parseInt(i + 1)]) {
                    val2 = timeStops[parseInt(i + 1)].slice(0, -3);
                    
                    

                    var newTime = moment(val2, 'hh:mm');
                    val2 = newTime.subtract(gp, 'minutes');
                    secondVal = new moment(val2).format('hh:mm A')

                    val1 = val.slice(0, -3);
                    var newFirstTime = moment(val1, 'hh:mm');
                    val1 = newFirstTime;
                    firstVal = new moment(val1).format('hh:mm A')
                    tableData.append($('<tr></tr>').append($('<td>Slot</td>').append(parseFloat(i + 1))).append($('<td></td>').append(firstVal + '-' + secondVal)));

                }
            }
            else {
                    //table.append($('<tr></tr>').append($('<td>Slot</td>').append(parseFloat(i + 1))).append($('<td></td>').append(val)));
                    val2 = timeStops[i+1].slice(0, -3);
                    var newTime = moment(val2, 'hh:mm');
                    val2 = newTime.subtract(gp, 'minutes');
                    secondVal = new moment(val2).format('hh:mm A')

                    val1 = val.slice(0, -3);
                    var newFirstTime = moment(val1, 'hh:mm');
                    val1 = newFirstTime;
                    firstVal = new moment(val1).format('hh:mm A')

                tableData.append($('<tr></tr>').append($('<td>Slot</td>').append(parseFloat(i + 1))).append($('<td></td>').append(firstVal + '-' + secondVal)));
            }
          
        });
    }

    function get_DeliverySlot1() {
        var slotno = ($.trim($("#txtslotno").val()));
        //var slotno1 = parseInt(slotno);
        //alert(slotno1);
        $('#deliveryboytimeslotTable1 tbody').html('');
        var wfrom = ($.trim($("#txtworkinghoursfrom1").val()));
        var wto = ($.trim($("#txtworkinghoursto1").val()));
        var valuestart = wfrom;
        var valuestop = wto;
        var timeStart = getTwentyFourHourTime(valuestart); //new Date("01/01/2007 " + valuestart).getHours();
        var timeEnd = getTwentyFourHourTime(valuestop);//new Date("01/01/2007 " + valuestop).getHours();
        var hourDiff = timeEnd - timeStart;
        var typsl = ($.trim($("#ddltypeofslot").val()));
        var slgp = ($.trim($("#ddltypeofslotgap").val()));
        var typ;
        if (typsl == 1) {
            typ = 60;
        }
        if (typsl == 2) {
            typ = 120;
        }
        if (typsl == 3) {
            typ = 30;
        }
        var gp;
        if (slgp == 30) {
            gp = 30;
        }
        if (slgp == 1) {
            gp = 60;
        }
        if (slgp == 0) {
            gp = 0;
        }
        var timeStops = getDeliveryTimeStops1(timeStart, timeEnd, typ, gp);
      
        //var table = $('<table style="width:100%;" class="table table-bordered">Shift 1</table>');
        var tableData = $('#deliveryboytimeslotTable1');
        jQuery.each(timeStops, function (i, val) {

            var val1 = val2 = secondVal = firstVal = '';

            if (i > 0) {
                if (timeStops[parseInt(i + 1)]) {
                    val2 = timeStops[parseInt(i + 1)].slice(0, -3);



                    var newTime = moment(val2, 'hh:mm');
                    val2 = newTime.subtract(gp, 'minutes');
                    secondVal = new moment(val2).format('hh:mm A')

                    val1 = val.slice(0, -3);
                    var newFirstTime = moment(val1, 'hh:mm');
                    val1 = newFirstTime;
                    firstVal = new moment(val1).format('hh:mm A')
                    //tableData.append($('<tr></tr>').append($('<td>Slot</td>').append(parseFloat(i + 1))).append($('<td></td>').append(firstVal + '-' + secondVal)));
                    tableData.append($('<tr></tr>').append($('<td>Slot</td>').append(parseFloat(i + 1))).append($('<td></td>').append(firstVal + '-' + secondVal)));

                }
            }
            else {
                //table.append($('<tr></tr>').append($('<td>Slot</td>').append(parseFloat(i + 1))).append($('<td></td>').append(val)));
                val2 = timeStops[i + 1].slice(0, -3);
                var newTime = moment(val2, 'hh:mm');
                val2 = newTime.subtract(gp, 'minutes');
                secondVal = new moment(val2).format('hh:mm A')

                val1 = val.slice(0, -3);
                var newFirstTime = moment(val1, 'hh:mm');
                val1 = newFirstTime;
                firstVal = new moment(val1).format('hh:mm A')

                //tableData.append($('<tr></tr>').append($('<td>Slot</td>').append(parseFloat(i + 1))).append($('<td></td>').append(firstVal + '-' + secondVal)));
                tableData.append($('<tr></tr>').append($('<td>Slot</td>').append(parseFloat(i + 1))).append($('<td></td>').append(firstVal + '-' + secondVal)));
            }

        });

       
    }


   
    $('#btntimeslot').unbind().click(function () {
        $('#Time-Slot-Modal').hide();
    });


    function getDeliveryTimeStops(start, end,typ,gp) {
        var startTime = moment(start, 'HH:mm');
        //console.log(startTime)
        var endTime = moment(end, 'HH:mm');
        //console.log(startTime)
        if (endTime.isBefore(startTime)) {
            endTime.add(1, 'day');
        }
        var timeStops = [];
        while (startTime <= endTime) {
            timeStops.push(new moment(startTime).format('HH:mm A'));
            startTime.add(typ, 'minutes');
            startTime.add(gp, 'minutes');
        }
       console.log(timeStops)
        return timeStops;
    }

    function getDeliveryTimeStops1(start, end, typ, gp) {
        var startTime = moment(start, 'HH:mm');
        var endTime = moment(end, 'HH:mm');
        if (endTime.isBefore(startTime)) {
            endTime.add(1, 'day');
        }
        var timeStops = [];
        while (startTime <= endTime) {
            timeStops.push(new moment(startTime).format('HH:mm A'));
            startTime.add(typ, 'minutes');
            startTime.add(gp, 'minutes');
        }
        return timeStops;
    }
    $('#btnSave').unbind().click(function () {
        event.preventDefault();
       
        if ($('#deliveryboyform').parsley().validate() !== true) {
            //$('#btnSave').prop('disabled', false);
        }
        else {
            //$('#btnSave').prop('disabled', true);
            savedetails();
        }

            //$("#deliveryboytimeslotTable tbody tr").each(function () {
            //    var row = $(this);
            //    var slId = row.find("td").eq(0).html();
            //    var slTm = row.find("td").eq(1).html();
            //    var DelvId = 1;
            //    SaveTimeSlot(DelvId, slId, slTm);
            //});
    });
    // loadDeliveryBoydetails();
    //loadAddDeliveryBoydetails();
    //$('#btnRequestApprove').unbind().click(function (e) {
    //    $('#btnRequestApprove').prop('disabled', true);
    //    if ($('#vendorform').parsley().validate() !== true) {
    //        $('#btnRequestApprove').prop('disabled', false);
    //    }
    //    else {
    //        approvevendordetails();
    //    }
    //});

    //$('#btnRequestReject').unbind().click(function (e) {
    //    $('#btnRequestReject').prop('disabled', true);
    //    if ($('#vendorform').parsley().validate() !== true) {
    //        $('#btnRequestReject').prop('disabled', false);
    //    }
    //    else {
    //        Rejectdetails();
    //    }
    //});

   
});

function SaveTimeSlot(DelvId, slId, slTm) {
    var data = new FormData();
    data.append("DelvId", DelvId);
    data.append("slId", slId);
    data.append("slTm", slTm);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/DeliveryBoy/SaveTimeSlot",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                //window.location.href = "https://www.tutorialrepublic.com/";
                window.location.href = "https://portal.bookitindia.com/Home/Login";
                //$('#VendorCompany-Modal').modal('hide');
                // resetproduct() 
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message);
                $('#btnUpdate').prop('disabled', false);
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                $('#btnUpdate').prop('disabled', false);
            }
            else {
                var content = "Invalid";
                var title = "Invalid username or password.";
                ErrorAlert(title, content);
            }
        },
        error: function (response) {

        }

    });
}



function savedetails() {
    //var holidays = [];
    //   $.each($("input[name='chkholiday']").prop('checked', 'checked'), function () {
    //    holidays.push($(this).val());
    //    alert($(this).val());
    //   });
    
    var holidays = [];
    $("input:checkbox[name='chkholiday']:checked").each(function () {
        holidays.push($(this).val());
    });

    //var selected = [];
    //$('#chkholiday input:checked').each(function () {
    //    //selected.push($(this).attr('name'));
    //    holidays.push($(this).val());
    //});

    //alert(holidays);
   
    var data = new FormData();
    //data.append("Vendor_Type_Id", GetURLParameter('vid'));
    data.append("Boy_Photo", $("#photo1").get(0).files[0]);
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
    data.append("WorkinghoursFrom", $.trim($('#txtworkinghoursfrom').val()));
    data.append("WorkinghoursTo", $.trim($('#txtworkinghoursto').val()));
    data.append("WorkinghoursFrom1", $.trim($('#txtworkinghoursfrom1').val()));
    data.append("WorkinghoursTo1", $.trim($('#txtworkinghoursto1').val()));

    data.append("TypeofSlot", $.trim($('#ddltypeofslot').val()));
    data.append("SlotGap", $.trim($('#ddltypeofslotgap').val()));
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
                //SuccessAlert(response[0].Title, response[0].Message);
                //resetpackagedetails();

                //alert(response[0].response_Id);
                //var email_1 = $.trim($('#txtemail').val());
                //alert(email_1);
     
                //Get_DeliveryBoyId(email_1);

                var Id = response[0].response_Id;
                $("#deliveryboytimeslotTable tbody tr").each(function () {
                    var row = $(this);
                    var slId = row.find("td").eq(0).html();
                    var slTm = row.find("td").eq(1).html();
                    var DelvId = Id;
                    SaveTimeSlot(DelvId, slId, slTm);
                });
                $("#deliveryboytimeslotTable1 tbody tr").each(function () {
                    var row = $(this);
                    var slId = row.find("td").eq(0).html();
                    var slTm = row.find("td").eq(1).html();
                    var DelvId = Id;
                    SaveTimeSlot(DelvId, slId, slTm);
                });
              
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



            function Get_DeliveryBoyId(email_1) {
                var data = new FormData();
                data.append("Email", email_1);
                $.ajax({
                    type: "Post",
                    contentType: "application/json;charset=utf-8",
                    url: "/DeliveryBoy/GetDeliveryBoyId",
                    dataType: "json",
                    data: data,
                    contentType: false,
                    processData: false,
                    success: function (response) {
                        var dat = response;
                        if (dat.length > 0) {
                            alert(dat.length);
                            alert('hiii');
                            $(dat).each(function () {
                                //alert('heloo');
                               // alert(this.Id)
                                var Id11 = this.Id;
                              //  alert(Id11);
                            });
                            //var Id = val(this.Id);
                                 $("#deliveryboytimeslotTable tbody tr").each(function () {
                                var row = $(this);
                                var slId = row.find("td").eq(0).html();
                                var slTm = row.find("td").eq(1).html();
                                var DelvId = Id;
                                SaveTimeSlot(DelvId, slId, slTm);
                            });

                            //$(dat).each(function () {
                            //    alert('heloo');
                            //    alert(this.Id)
                            //});
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

function loadAddDeliveryBoydetails() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/DeliveryBoy/LoadAddDeliverBoy",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_AddDeliveryBoy').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_AddDeliveryBoy').DataTable({
                    data: dat,
                    autoWidth: true,
                    responsive: true,
                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
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
                             
                                var code = row.Id;
                                return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" data-vid=' + code + ' onclick="viewDeliveryBoydetail(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button></td>';
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

