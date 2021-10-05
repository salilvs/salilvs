$(function () {
    
    $("#txtvendoremployeedob,#txtvendoremployeejoindate").datetimepicker({
        // Formats
        format: 'YYYY-MM-DD',
        icons:
        {
            next: 'fa fa-angle-right',
            previous: 'fa fa-angle-left'
        },
    });
    $("#txtvendoremployeeworkinghoursfrom,#txtvendoremployeeworkinghoursto").datetimepicker({
        // Formats
        format: 'LT',
        ignoreReadonly: true,
        icons:
        {
            up: "fa fa-arrow-up",
            down: "fa fa-arrow-down",
        },
    });

   

    $('#btnCreate').unbind().click(function () {
        $('#Vendor-Employee-Working-Time-Modal').modal('show');
        $('#btnvendoremployeetimingUpdate').hide();
        $('#btnvendoremployeetimingSave').show();
        $('#DynamicShiftId').hide();
        $('#WeeklyShiftId').hide();
    });

    $('#btnClose,#btnvendoremployeetimingReset').unbind().click(function () {
        $("#dvShiftTable tbody tr").remove();
        //$("#dvWeeklyShiftTable tbody tr").remove();
    });

    $('#btnvendoremployeeSave').unbind().click(function () {
        event.preventDefault();
        $('#btnvendoremployeeSave').prop('disabled', true);
        if ($('#employeeform').parsley().validate() !== true) {
            $('#btnvendoremployeeSave').prop('disabled', false);
        }
        else {
            saveemployeedetails();
        }
    });
    $('#btnvendoremployeeUpdate').unbind().click(function () {
        event.preventDefault();
        $('#btnvendoremployeeUpdate').prop('disabled', true);
        if ($('#employeeform').parsley().validate() !== true) {
            $('#btnvendoremployeeUpdate').prop('disabled', false);
        }
        else {
            updateemployeedetails();
        }
    });
  
    $('#btnvendoremployeetimingSave').unbind().click(function () {
        $('#btnvendoremployeetimingSave').prop('disabled', false);
        //alert('hiii')
        ////if ($('#vendoremployeetiming').parsley().validate() !== true) {
        //    alert('hiii000000')
        //    $('#btnvendoremployeetimingSave').prop('disabled', false);
        //}
        //else {
            saveempoyeeworkingdetails();
        //}
    });
    $('#btnvendoremployeetimingUpdate').unbind().click(function () {
        $('#btnvendoremployeetimingUpdate').prop('disabled', false);
        //if ($('#vendoremployeetiming').parsley().validate() !== true) {
        //    $('#btnvendoremployeetimingUpdate').prop('disabled', false);
        //}
        //else {
           updateempoyeeworkingdetails();
        //}
    });
    $('#ddlvendoremployeecountry').change(function () {
        loadvendoremployeestatedetails($('#ddlvendoremployeecountry').val());
    });
    $('#ddlvendoremployeestate').change(function () {
        loadvendoremployeecitydetails($('#ddlvendoremployeestate').val());
    });
    resetvendoremployee();
    $('#btnvendoremployeeClose,#btnvendoremployeeReset').unbind().click(function () {
        resetvendoremployee();
    });
    $('#vendoremployeeimage1').click(function (e) {
        $('#vendoremployeephoto1').click();
    });
    $('#vendoremployeephoto1').change(function () {
        fasterPreviewimage1(this);
    });
    $('#btnvendoremployeeproof1remove').unbind().click(function () {
        $('#vendoremployeeproof1').show();
        $('#vendoremployeeproof1').prop('required', true);
        $('#btnvendoremployeeproof1download').hide();
        $('#btnvendoremployeeproof1remove').hide();
    });
    $('#btnvendoremployeeproof2remove').unbind().click(function () {
        $('#vendoremployeeproof2').show();
        $('#btnvendoremployeeproof2download').hide();
        $('#btnvendoremployeeproof2remove').hide();
        $('#txtvendoremployeeproof2').val('');
    });
    $('#btnvendoremployeeproof3remove').unbind().click(function () {
        $('#vendoremployeeproof3').show();
        $('#btnvendoremployeeproof3download').hide();
        $('#btnvendoremployeeproof3remove').hide();
        $('#txtvendoremployeeproof3').val('');
    });
    $('#btnvendoremployeeproof4remove').unbind().click(function () {
        $('#vendoremployeeproof4').show();
        $('#btnvendoremployeeproof4download').hide();
        $('#btnvendoremployeeproof4remove').hide();
        $('#txtvendoremployeeproof4').val('');
    });
    loadvendoremployeecountrydetails();


    //$('#rdbStaticId').change(function () {
    //    alert(this.chi)
    //    //DisplayFranchise(this.checked);
    //});

    //$("#txtDateofW").datetimepicker({
    //    // Formats
    //    format: 'YYYY-MM-DD',
    //    icons:
    //    {
    //        next: 'fa fa-angle-right',
    //        previous: 'fa fa-angle-left'
    //    },
    //    minDate: 0,
    //});
    $('#ddlWorkshift').change(function () {
        var value = $.trim($('#ddlWorkshift').val())
        if (value == "Static")
        {
            $('#StaticShiftId').show();
            $('#DynamicShiftId').hide();
            $('#WeeklyShiftId').hide();            
        }
        if (value == "Dynamic")
        {
            $('#StaticShiftId').hide();
            $('#DynamicShiftId').show();
            $('#WeeklyShiftId').hide();
        }
        if (value == "Weekly") {
            $('#StaticShiftId').hide();
            $('#DynamicShiftId').hide();
            $('#WeeklyShiftId').show();
        }
    });
    //$("#txtDateofW").datetimepicker({
    //    // Formats
    //    format: 'YYYY-MM-DD',
    //    sideBySide: true,
    //    icons:
    //    {
    //        next: 'fa fa-angle-right',
    //        previous: 'fa fa-angle-left'
    //    },
        

    //});
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
  
    $("#txtDateofW").datetimepicker({
        // Formats
        format: 'YYYY-MM-DD',
        icons:
        {
            next: 'fa fa-angle-right',
            previous: 'fa fa-angle-left'
        },
        //minDate: 0,
        minDate: today,
       // startDate: today,
    });
});

function resetvendoremployee() {
    //$("#dvWeeklyShiftTable tbody tr").remove();
    loademployeedetails();
    $('#btnvendoremployeeUpdate').prop('disabled', false);
    $('#btnvendoremployeeSave').prop('disabled', false);
    $('#btnvendoremployeeUpdate').hide();
    $('#btnvendoremployeeSave').show();
    $('#employeeform').parsley().reset();
    $('#employeeform')[0].reset();
    $('#btnvendoremployeeproof1remove').hide();
    $('#btnvendoremployeeproof2remove').hide();
    $('#btnvendoremployeeproof3remove').hide();
    $('#btnvendoremployeeproof4remove').hide();
    $('#btnvendoremployeeproof1download').hide();
    $('#btnvendoremployeeproof2download').hide();
    $('#btnvendoremployeeproof3download').hide();
    $('#btnvendoremployeeproof4download').hide();
    $('#vendoremployeeimage1').attr('src', "../assets/img/bookit/no-image-found-360x250.png");
}
function loademployeedetails() {
    var data = new FormData();
    data.append("Vendor_Employee_Vendor_Id", GetURLParameter('vid'));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorEmployee/LoadVendorEmployees",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_vendoremployeelist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_vendoremployeelist').DataTable({
                    data: dat,
                    autoWidth: true,
                    responsive: true,
                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var image = row.Vendor_Employee_Photo;
                                return '<td><div class="sidebar-user"><div class="sidebar-user-picture"><img alt="image" src="' + image + '" width="50px" height="50px"></div></div></td>';
                            }
                        },
                        { data: 'Vendor_Employee_Name' },
                        { data: 'Vendor_Employee_Email' },
                        { data: 'Vendor_Employee_Phone' },
                        { data: 'Vendor_Employee_Designation' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var stat = row.Vendor_Employee_Status;
                                if (stat == "Active") {
                                    return '<span class="badge badge-pill badge-success">' + stat + '</span>';
                                }
                                else { return '<span class="badge badge-pill badge-danger">' + stat + '</span>'; }
                            }
                        },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                if (row.Vendor_Employee_Status == "Active") {
                                    if (row.Vendor_Employee_Login_Access == "Yes") {
                                        var code = row.Vendor_Employee_Uniqueid;
                                        return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewemployeedetails(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate Credentials" onclick="deactivateemployeecredentials(\'' + code + '\')" ><i class="simple-icon-user"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="inactivateemployee(\'' + code + '\')" ><i class="simple-icon-trash"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-info" title = "Working Hours" onclick="loademployeeworkinghour(\'' + code + '\')" ><i class="simple-icon-clock"></i></button></td>';
                                    }
                                    else {
                                        var code = row.Vendor_Employee_Uniqueid;
                                        return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewemployeedetails(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Activate Credentials" onclick="createemployeecredentials(\'' + code + '\')" ><i class="simple-icon-user"></i></button>  <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="inactivateemployee(\'' + code + '\')" ><i class="simple-icon-trash"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-info" title = "Working Hours" onclick="loademployeeworkinghour(\'' + code + '\')" ><i class="simple-icon-clock"></i></button></td>';
                                    }
                                }
                                else {
                                    var code = row.Vendor_Employee_Uniqueid;
                                    return '<td><button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Re Activate" onclick="reactivateemployee(\'' + code + '\')" ><i class="simple-icon-reload"></i></button></td>';
                                }
                            }
                        }
                    ]
                });
            }
            else {
                $('#tbl_vendoremployeelist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
function saveemployeedetails() {
    var approveaccess = "No"; var rescheduleaccess = "No"; var cancelaccess = "No"; var holdaccess = "No";
    if ($('input[name=chkapproveaccess]:checked').val() == "Yes") {
        approveaccess = "Yes";
    }
    if ($('input[name=chkrescheduleaccess]:checked').val() == "Yes") {
        rescheduleaccess = "Yes";
    }
    if ($('input[name=chkcancelaccess]:checked').val() == "Yes") {
        cancelaccess = "Yes";
    }
    if ($('input[name=chkholdaccess]:checked').val() == "Yes") {
        holdaccess = "Yes";
    }
    var data = new FormData();
    data.append("Vendor_Employee_Vendor_Id", GetURLParameter('vid'));
    data.append("Vendor_Employee_Photo", $("#vendoremployeephoto1").get(0).files[0]);
    //data.append("Vendor_Branch_Id", ($('#ddlvendoremployeebranch').val()));
    data.append("Vendor_Branch_Id", '');
    data.append("Vendor_Employee_Name", $.trim($('#txtvendoremployeename').val()));
    data.append("Vendor_Employee_Address", $.trim($('#txtvendoremployeeaddress').val()));
    data.append("Vendor_Employee_Country", $.trim($('#ddlvendoremployeecountry').val()));
    data.append("Vendor_Employee_State", $.trim($('#ddlvendoremployeestate').val()));
    data.append("Vendor_Employee_City", $.trim($('#ddlvendoremployeecity').val()));
    data.append("Vendor_Employee_Designation", $.trim($('#ddlvendoremployeedesignation').val()));
    data.append("Vendor_Employee_Role", $.trim($('#ddlvendoremployeerole').val()));
    data.append("Vendor_Employee_Email", $.trim($('#txtvendoremployeeemail').val()));
    data.append("Vendor_Employee_Phone", $.trim($('#txtvendoremployeephone').val()));
    data.append("Vendor_Employee_Date_Of_Birth", $.trim($('#txtvendoremployeedob').val()));
    data.append("Vendor_Employee_Join_Date", $.trim($('#txtvendoremployeejoindate').val()));
    data.append('Vendor_Employee_Gender', $('input[name=rdogender]:checked').val());
    data.append('Vendor_Employee_Access_To_Approve_Appointments', approveaccess);
    data.append('Vendor_Employee_Access_To_Reschedule_Appointments', rescheduleaccess);
    data.append('Vendor_Employee_Access_To_Cancel_Appointments', cancelaccess);
    data.append('Vendor_Employee_Access_To_Hold_Appointments', holdaccess);
    data.append("Vendor_Employee_Document_Doc_1", $("#vendoremployeeproof1").get(0).files[0]);
    data.append("Vendor_Employee_Document_Doc_2", $("#vendoremployeeproof2").get(0).files[0]);
    data.append("Vendor_Employee_Document_Doc_3", $("#vendoremployeeproof3").get(0).files[0]);
    data.append("Vendor_Employee_Document_Doc_4", $("#vendoremployeeproof4").get(0).files[0]);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorEmployee/SaveVendorEmployeeDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                $('#Vendor-Employee-Modal').modal('hide');
                resetvendoremployee();
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message);
                $('#btnvendoremployeeSave').prop('disabled', false);
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                $('#btnvendoremployeeSave').prop('disabled', false);
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
function viewemployeedetails(code) {

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
            data.append("Vendor_Employee_Uniqueid", code);
            data.append("Vendor_Employee_Vendor_Id", GetURLParameter('vid'));
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/VendorEmployee/LoadVendorEmployees",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        $('#btnvendoremployeeUpdate').show();
                        $('#btnvendoremployeeSave').hide();
                        $('#Vendor-Employee-Modal').modal('show');
                        $.each(response, function (i, vari) {
                            if (vari.Vendor_Employee_Photo != "" && vari.Vendor_Employee_Photo != null) {
                                $('#txtvendoremployeephoto1').val(vari.Vendor_Employee_Photo);
                                $('#vendoremployeeimage1').attr('src', vari.Vendor_Employee_Photo);
                                $('#vendoremployeephoto1').prop('required', false);
                            }
                            else {
                                $('#vendoremployeephoto1').prop('required', true);
                            }
                            $('#ddlvendoremployeebranch').val(vari.Vendor_Branch_Id);
                            $('#txtvendoremployeename').val(vari.Vendor_Employee_Name);
                            $('#txtvendoremployeeaddress').val(vari.Vendor_Employee_Address);
                            $('#ddlvendoremployeecountry').val(vari.Vendor_Employee_Country);
                            loadvendoremployeestatedetails(vari.Vendor_Employee_Country, vari.Vendor_Employee_State);
                            loadvendoremployeecitydetails(vari.Vendor_Employee_State, vari.Vendor_Employee_City);
                            $('#txtvendoremployeedob').val(vari.Vendor_Employee_Date_Of_Birth);
                            $('#txtvendoremployeeemail').val(vari.Vendor_Employee_Email);
                            $('#txtvendoremployeephone').val(vari.Vendor_Employee_Phone);
                            $('#ddlvendoremployeedesignation').val(vari.Vendor_Employee_Designation);
                            $('input:radio[name=rdogender]').filter('[value="' + vari.Vendor_Employee_Gender + '"]').attr('checked', true);
                            var selectvendorEmployeeAccessToApproveAppointments = vari.Vendor_Employee_Access_To_Approve_Appointments.split(',');
                            $.each(selectvendorEmployeeAccessToApproveAppointments, function (i, result) {
                                $("input[name='chkapproveaccess'][value='" + selectvendorEmployeeAccessToApproveAppointments[i] + "']").prop('checked', true);
                            });
                            var selectvendorEmployeeAccessToRescheduleAppointments = vari.Vendor_Employee_Access_To_Reschedule_Appointments.split(',');
                            $.each(selectvendorEmployeeAccessToRescheduleAppointments, function (i, result) {
                                $("input[name='chkrescheduleaccess'][value='" + selectvendorEmployeeAccessToRescheduleAppointments[i] + "']").prop('checked', true);
                            });
                            var selectvendorEmployeeAccessToCancelAppointments = vari.Vendor_Employee_Access_To_Cancel_Appointments.split(',');
                            $.each(selectvendorEmployeeAccessToCancelAppointments, function (i, result) {
                                $("input[name='chkcancelaccess'][value='" + selectvendorEmployeeAccessToCancelAppointments[i] + "']").prop('checked', true);
                            });
                            $('#ddlvendoremployeerole').val(vari.Vendor_Employee_Role);
                            $('#txtvendoremployeejoindate').val(vari.Vendor_Employee_Join_Date);
                            $("#txtvendoremployeeproof1").val(vari.Vendor_Employee_Document_Doc_1);
                            $("#txtvendoremployeeproof2").val(vari.Vendor_Employee_Document_Doc_2);
                            $("#txtvendoremployeeproof3").val(vari.Vendor_Employee_Document_Doc_3);
                            $("#txtvendoremployeeproof4").val(vari.Vendor_Employee_Document_Doc_4);
                            if (vari.Vendor_Employee_Document_Doc_1 != "") {
                                $('#vendoremployeeproof1').hide();
                                $('#vendoremployeeproof1').prop('required', false);
                                $('#btnvendoremployeeproof1download').show();
                                $('#btnvendoremployeeproof1remove').show();
                                $('#btnvendoremployeeproof1download').unbind().click(function () {
                                    var iframe = "<iframe width='100%' height='100%' src='" + vari.Vendor_Employee_Document_Doc_1 + "'></iframe>"
                                    var x = window.open();
                                    x.document.open();
                                    x.document.Title = "Document 3";
                                    x.document.write(iframe);
                                    x.document.close();
                                });
                            }
                            else {
                                $('#vendoremployeeproof1').show();
                                $('#vendoremployeeproof1').prop('required', true);
                                $('#btnvendoremployeeproof1download').hide();
                                $('#btnvendoremployeeproof1remove').hide();
                            }
                            if (vari.Vendor_Employee_Document_Doc_2 != "") {
                                $('#vendoremployeeproof2').hide();
                                $('#btnvendoremployeeproof2download').show();
                                $('#btnvendoremployeeproof2remove').show();
                                $('#btnvendoremployeeproof2download').unbind().click(function () {
                                    var iframe = "<iframe width='100%' height='100%' src='" + vari.Vendor_Employee_Document_Doc_2 + "'></iframe>"
                                    var x = window.open();
                                    x.document.open();

                                    x.document.Title = "Document 3";
                                    x.document.write(iframe);
                                    x.document.close();
                                });
                            }
                            else {
                                $('#vendoremployeeproof2').show();
                                $('#btnvendoremployeeproof2download').hide();
                                $('#btnvendoremployeeproof2remove').hide();
                            }
                            if (vari.Vendor_Employee_Document_Doc_3 != "") {
                                $('#vendoremployeeproof3').hide();
                                $('#btnvendoremployeeproof3download').show();
                                $('#btnvendoremployeeproof3remove').show();
                                $('#btnvendoremployeeproof3download').unbind().click(function () {
                                    var iframe = "<iframe width='100%' height='100%' src='" + vari.Vendor_Employee_Document_Doc_3 + "'></iframe>"
                                    var x = window.open();
                                    x.document.open();

                                    x.document.Title = "Document 3";
                                    x.document.write(iframe);
                                    x.document.close();
                                });
                            }
                            else {
                                $('#vendoremployeeproof3').show();
                                $('#btnvendoremployeeproof3download').hide();
                                $('#btnvendoremployeeproof3remove').hide();
                            }
                            if (vari.Vendor_Employee_Document_Doc_4 != "") {
                                $('#vendoremployeeproof4').hide();
                                $('#btnvendoremployeeproof4download').prop('href', vari.Vendor_Employee_Document_Doc_4);
                                $('#btnvendoremployeeproof4download').show();
                                $('#btnvendoremployeeproof4remove').show();
                                $('#btnvendoremployeeproof4download').unbind().click(function () {
                                    var iframe = "<iframe width='100%' height='100%' src='" + vari.Vendor_Employee_Document_Doc_4 + "'></iframe>"
                                    var x = window.open();
                                    x.document.open();

                                    x.document.Title = "Document 3";
                                    x.document.write(iframe);
                                    x.document.close();
                                });
                            }
                            else {
                                $('#vendoremployeeproof4').show();
                                $('#btnvendoremployeeproof4download').hide();
                                $('#btnvendoremployeeproof4remove').hide();
                            }
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
function updateemployeedetails() {
    var approveaccess = "No"; var rescheduleaccess = "No"; var cancelaccess = "No"; var holdaccess = "No";
    if ($('input[name=chkapproveaccess]:checked').val() == "Yes") {
        approveaccess = "Yes";
    }
    if ($('input[name=chkrescheduleaccess]:checked').val() == "Yes") {
        rescheduleaccess = "Yes";
    }
    if ($('input[name=chkcancelaccess]:checked').val() == "Yes") {
        cancelaccess = "Yes";
    }
    if ($('input[name=chkholdaccess]:checked').val() == "Yes") {
        holdaccess = "Yes";
    }
    var data = new FormData();
    data.append("Vendor_Employee_Vendor_Id", GetURLParameter('vid'));
    data.append("Vendor_Employee_Photo", $("#vendoremployeephoto1").get(0).files[0]);
    data.append("Vendor_Employee_Photo_Check", $.trim($('#txtvendoremployeephoto1').val()));
    data.append("Vendor_Branch_Id", '');
    //data.append("Vendor_Branch_Id", ($('#ddlvendoremployeebranch').val()));
    data.append("Vendor_Employee_Name", $.trim($('#txtvendoremployeename').val()));
    data.append("Vendor_Employee_Address", $.trim($('#txtvendoremployeeaddress').val()));
    data.append("Vendor_Employee_Country", $.trim($('#ddlvendoremployeecountry').val()));
    data.append("Vendor_Employee_State", $.trim($('#ddlvendoremployeestate').val()));
    data.append("Vendor_Employee_City", $.trim($('#ddlvendoremployeecity').val()));
    data.append("Vendor_Employee_Designation", $.trim($('#ddlvendoremployeedesignation').val()));
    data.append('Vendor_Employee_Gender', $('input[name=rdogender]:checked').val());
    data.append('Vendor_Employee_Access_To_Approve_Appointments', approveaccess);
    data.append('Vendor_Employee_Access_To_Reschedule_Appointments', rescheduleaccess);
    data.append('Vendor_Employee_Access_To_Cancel_Appointments', cancelaccess);
    data.append('Vendor_Employee_Access_To_Hold_Appointments', holdaccess);
    data.append("Vendor_Employee_Role", $.trim($('#ddlvendoremployeerole').val()));
    data.append("Vendor_Employee_Email", $.trim($('#txtvendoremployeeemail').val()));
    data.append("Vendor_Employee_Phone", $.trim($('#txtvendoremployeephone').val()));
    data.append("Vendor_Employee_Date_Of_Birth", $.trim($('#txtvendoremployeedob').val()));
    data.append("Vendor_Employee_Join_Date", $.trim($('#txtvendoremployeejoindate').val()));
    data.append("Vendor_Employee_Document_Doc_1", $("#vendoremployeeproof1").get(0).files[0]);
    data.append("Vendor_Employee_Document_Doc_2", $("#vendoremployeeproof2").get(0).files[0]);
    data.append("Vendor_Employee_Document_Doc_3", $("#vendoremployeeproof3").get(0).files[0]);
    data.append("Vendor_Employee_Document_Doc_4", $("#vendoremployeeproof4").get(0).files[0]);
    data.append("Vendor_Employee_Document_Doc_1_Check", $.trim($("#txtvendoremployeeproof1").val()));
    data.append("Vendor_Employee_Document_Doc_2_Check", $.trim($("#txtvendoremployeeproof2").val()));
    data.append("Vendor_Employee_Document_Doc_3_Check", $.trim($("#txtvendoremployeeproof3").val()));
    data.append("Vendor_Employee_Document_Doc_4_Check", $.trim($("#txtvendoremployeeproof4").val()));

    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorEmployee/UpdateVendorEmployeeDetails",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                $('#Vendor-Employee-Modal').modal('hide');
                resetvendoremployee();
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message);
                $('#btnvendoremployeeUpdate').prop('disabled', false);
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                $('#btnvendoremployeeUpdate').prop('disabled', false);
            }
            else {
                var content = "Invalid";
                var title = "Invalid username or password.";
                ErrorAlert(title, content);
                $("#txtvendoremployeeusername").val("");
                $("#txtvendoremployeepassword").val("");
            }
        },
        error: function (response) {

        }
    });
}
function inactivateemployee(code) {
    swal({
        title: "Are you sure?",
        text: "Do you want to in activate the data!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes",
    }, function (isConfirm) {
        if (isConfirm) {
            var data = new FormData();
            data.append("Vendor_Employee_Vendor_Id", GetURLParameter('vid'));
            data.append("Vendor_Employee_Id", code);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/VendorEmployee/DeactivateVendorEmployee",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response.length > 0) {
                        if (response[0].Type == "Success") {
                            SuccessAlert(response[0].Title, response[0].Message);
                            resetvendoremployee();
                        }
                        else if (response[0].Type == "Warning") {
                            WarningAlert(response[0].Title, response[0].Message)
                        }
                        else if (response[0].Type == "Error") {
                            ErrorAlert(response[0].Title, response[0].Message)
                        }
                        else {
                            var content = "Invalid";
                            var title = "Invalid username or password.";
                            ErrorAlert(title, content);
                        }
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
function reactivateemployee(code) {
    swal({
        title: "Are you sure?",
        text: "Do you want to re-activate of the employee",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes",
    }, function (isConfirm) {
        if (isConfirm) {
            var data = new FormData();
            data.append("Vendor_Employee_Vendor_Id", GetURLParameter('vid'));
            data.append("Vendor_Employee_Id", code);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/VendorEmployee/ReactivateVendorEmployee",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response.length > 0) {
                        if (response[0].Type == "Success") {
                            SuccessAlert(response[0].Title, response[0].Message);
                            resetvendoremployee();
                        }
                        else if (response[0].Type == "Warning") {
                            WarningAlert(response[0].Title, response[0].Message)
                        }
                        else if (response[0].Type == "Error") {
                            ErrorAlert(response[0].Title, response[0].Message)
                        }
                        else {
                            var content = "Invalid";
                            var title = "Invalid username or password.";
                            ErrorAlert(title, content);
                        }
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
function createemployeecredentials(code) {
    swal({
        title: "Are you sure?",
        text: "Do you want to activate credentials of the employee",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes",
    }, function (isConfirm) {
        if (isConfirm) {
            var data = new FormData();
            data.append("Vendor_Employee_Vendor_Id", GetURLParameter('vid'));
            data.append("Vendor_Employee_Id", code);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/VendorEmployee/CreateVendorEmployeeCredentials",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response.length > 0) {
                        if (response[0].Type == "Success") {
                            SuccessAlert(response[0].Title, response[0].Message);
                            resetvendoremployee();
                        }
                        else if (response[0].Type == "Warning") {
                            WarningAlert(response[0].Title, response[0].Message)
                        }
                        else if (response[0].Type == "Error") {
                            ErrorAlert(response[0].Title, response[0].Message)
                        }
                        else {
                            var content = "Invalid";
                            var title = "Invalid username or password.";
                            ErrorAlert(title, content);
                        }
                    }
                },
                error: function (response) {

                }
            });

        } else {

        }
    });
    
}
function deactivateemployeecredentials(code) {
    swal({
        title: "Are you sure?",
        text: "Do you want to in-activate credentials of the employee",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes",
    }, function (isConfirm) {
        if (isConfirm) {
            var data = new FormData();
            data.append("Vendor_Employee_Vendor_Id", GetURLParameter('vid'));
            data.append("Vendor_Employee_Id", code);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/VendorEmployee/DeactivateVendorEmployeeCredentials",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response.length > 0) {
                        if (response[0].Type == "Success") {
                            SuccessAlert(response[0].Title, response[0].Message);
                            resetvendoremployee();
                        }
                        else if (response[0].Type == "Warning") {
                            WarningAlert(response[0].Title, response[0].Message)
                        }
                        else if (response[0].Type == "Error") {
                            ErrorAlert(response[0].Title, response[0].Message)
                        }
                        else {
                            var content = "Invalid";
                            var title = "Invalid username or password.";
                            ErrorAlert(title, content);
                        }
                    }
                },
                error: function (response) {

                }
            });

        } else {

        }
    });
    
}
function loadvendoremployeecountrydetails() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorEmployee/LoadCountry",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlvendoremployeecountry").html("");
                $("#ddlvendoremployeecountry").append('<option value="">Select Country</option>');
                $.each(response, function (i, vari) {
                    $("#ddlvendoremployeecountry").append('<option value="' + vari.id + '">' + vari.name + '</option>');
                });
            }
            else {

            }
        },
        error: function (response) {

        }
    });
}
function loadvendoremployeestatedetails(country, state) {
    var data = new FormData();
    data.append("country", country);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorEmployee/LoadState",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlvendoremployeestate").html("");
                $("#ddlvendoremployeestate").append('<option value="">Select State</option>');
                var code = "";
                $.each(response, function (i, vari) {
                    $("#ddlvendoremployeestate").append('<option value="' + vari.id + '">' + vari.name + '</option>');
                    code = vari.phone_code;
                });
                $('#ddlvendoremployeestate').val(state);
            }
            else {

            }
        },
        error: function (response) {

        }
    });
}
function loadvendoremployeecitydetails(state, city) {
    var data = new FormData();
    data.append("state", state);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorEmployee/LoadCity",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $("#ddlvendoremployeecity").html("");
                $("#ddlvendoremployeecity").append('<option value="">Select City</option>');
                $.each(response, function (i, vari) {
                    $("#ddlvendoremployeecity").append('<option value="' + vari.id + '">' + vari.name + '</option>');
                });
                $("#ddlvendoremployeecity").val(city);
            }
            else {

            }
        },
        error: function (response) {

        }
    });
}
function fasterPreviewimage1(uploader) {
    if (uploader.files && uploader.files[0]) {
        $('#vendoremployeeimage1').attr('src', window.URL.createObjectURL(uploader.files[0]));
    }
}
function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return decodeURIComponent(sParameterName[1]);
        }
    }
};
function resetemployeeworkinghour() {
    $('#btnvendoremployeetimingUpdate').prop('disabled', false);
    $('#btnvendoremployeetimingSave').prop('disabled', false);
    $('#btnvendoremployeetimingUpdate').hide();
    $('#btnvendoremployeetimingSave').show();
    $('#vendoremployeetiming').parsley().reset();
    $('#vendoremployeetiming')[0].reset();
    loadvendoremployeworking('');
}
function loadvendoremployeworking(employeecode) {
    var data = new FormData();
    data.append("Vendor_Employee_Id", employeecode);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorEmployee/LoadEmployeeWorkingTime",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                var table = $('#tbl_vendoremployeetiminglist').DataTable({ destroy: true });
                table.destroy();
                $('#tbl_vendoremployeetiminglist').DataTable({
                    data: dat,
                    autoWidth: true,
                    columns: [
                        {
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                        { data: 'Vendor_Employee_Timing_Dynamic_Status' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var stat = row.Vendor_Employee_Timing_Holiday;
                                if (stat != "" && stat != null) {
                                    return stat;
                                }
                                else { return 'No Holiday'; }
                            }
                        },
                        { data: 'Vendor_Employee_Working_Time' },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                var stat = row.Vendor_Employee_Timing_Status;
                                if (stat == "Active") {
                                    return '<span class="badge badge-pill badge-success">' + stat + '</span>';
                                }
                                else { return '<span class="badge badge-pill badge-danger">' + stat + '</span>'; }
                            }
                        },
                        {
                            orderable: false,
                            render: function (data, type, row) {
                                if (row.Vendor_Employee_Timing_Status == "Active") {
                                    var time_sta = row.Vendor_Employee_Timing_Dynamic_Status;
                                    //alert(time_sta);
                                    //if (time_sta != "Dynamic") {
                                    //    var code = row.Vendor_Employee_Timing_Id;
                                    //    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewemployeeworkinghour(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="inactivateemployeeworkingtime(\'' + code + '\')" ><i class="simple-icon-trash"></i></button></td>';
                                    //}
                                    //else
                                    //{
                                    //    var code = row.Vendor_Employee_Timing_Id;
                                    //    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewemployeeworkinghourDynamic(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="inactivateemployeeworkingtime(\'' + code + '\')" ><i class="simple-icon-trash"></i></button></td>';
                                    //}

                                    if (time_sta == "Static") {

                                        var code = row.Vendor_Employee_Timing_Id;
                                        return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewemployeeworkinghour(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="inactivateemployeeworkingtime(\'' + code + '\')" ><i class="simple-icon-trash"></i></button></td>';


                                    }
                                    else if (time_sta == "Dynamic") {
                                        var code = row.Vendor_Employee_Timing_Id;
                                        return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewemployeeworkinghourDynamic(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="inactivateemployeeworkingtime(\'' + code + '\')" ><i class="simple-icon-trash"></i></button></td>';
                                    }
                                    else
                                    {
                                        var code = row.Vendor_Employee_Timing_Id;
                                        return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewemployeeworkinghourWeekly(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="inactivateemployeeworkingtime(\'' + code + '\')" ><i class="simple-icon-trash"></i></button></td>';
                                    }
                                }
                                else {
                                    var code = row.Vendor_Employee_Timing_Id;
                                    return '<td><button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Re Activate" onclick="reactivateemployeeworkingtime(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button></td>';
                                }
                            }
                        }
                    ]
                });
            }
            else {
                $('#tbl_vendoremployeetiminglist').DataTable();
            }
        },
        error: function (response) {

        }
    });
}
function loademployeeworkinghour(employeecode) {

    swal({
        title: "Are you sure?",
        text: "Do you want to view the data!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fec107",
        confirmButtonText: "Yes, Edit it!",
    }, function (isConfirm) {
        if (isConfirm) {
            $('#Vendor-Employee-Workinglist-Modal').modal('show');
            var data = new FormData();
            data.append("Vendor_Employee_Id", employeecode);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/VendorEmployee/LoadEmployeeWorkingTime",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        var table = $('#tbl_vendoremployeetiminglist').DataTable({ destroy: true });
                        table.destroy();
                        $('#tbl_vendoremployeetiminglist').DataTable({
                            data: dat,
                            autoWidth: true,
                            columns: [
                                {
                                    render: function (data, type, row, meta) {
                                        return meta.row + meta.settings._iDisplayStart + 1;
                                    }
                                },
                                { data: 'Vendor_Employee_Timing_Dynamic_Status' },
                                {
                                    orderable: false,
                                    render: function (data, type, row) {
                                        var stat = row.Vendor_Employee_Timing_Holiday;
                                        if (stat != "" && stat != null) {
                                            return stat;
                                        }
                                        else { return 'No Holiday'; }
                                    }
                                },
                                { data: 'Vendor_Employee_Working_Time' },
                                {
                                    orderable: false,
                                    render: function (data, type, row) {
                                        var stat = row.Vendor_Employee_Timing_Status;
                                        if (stat == "Active") {
                                            return '<span class="badge badge-pill badge-success">' + stat + '</span>';
                                        }
                                        else { return '<span class="badge badge-pill badge-danger">' + stat + '</span>'; }
                                    }
                                },
                                {
                                    orderable: false,
                                    render: function (data, type, row) {
                                        if (row.Vendor_Employee_Timing_Status == "Active") {
                                            var time_sta = row.Vendor_Employee_Timing_Dynamic_Status;
                                            //alert(time_sta);
                                            //if (time_sta != "Dynamic") {
                                            //    var code = row.Vendor_Employee_Timing_Id;
                                            //    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewemployeeworkinghour(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="inactivateemployeeworkingtime(\'' + code + '\')" ><i class="simple-icon-trash"></i></button></td>';
                                            //}
                                            //else {
                                            //    var code = row.Vendor_Employee_Timing_Id;
                                            //    return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewemployeeworkinghourDynamic(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="inactivateemployeeworkingtime(\'' + code + '\')" ><i class="simple-icon-trash"></i></button></td>';
                                            //}
                                            if (time_sta == "Static") {

                                                var code = row.Vendor_Employee_Timing_Id;
                                                return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewemployeeworkinghour(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="inactivateemployeeworkingtime(\'' + code + '\')" ><i class="simple-icon-trash"></i></button></td>';


                                            }
                                            else if (time_sta == "Dynamic") {
                                                var code = row.Vendor_Employee_Timing_Id;
                                                return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewemployeeworkinghourDynamic(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="inactivateemployeeworkingtime(\'' + code + '\')" ><i class="simple-icon-trash"></i></button></td>';
                                            }
                                            else {
                                                var code = row.Vendor_Employee_Timing_Id;
                                                return '<td> <button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Edit" onclick="viewemployeeworkinghourWeekly(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button> <button type="button" class="btn btn-icon btn-rounded btn-outline-danger" title = "De Activate" onclick="inactivateemployeeworkingtime(\'' + code + '\')" ><i class="simple-icon-trash"></i></button></td>';
                                            }
                                        }
                                        else {
                                            var code = row.Vendor_Employee_Timing_Id;
                                            return '<td><button type="button" class="btn btn-icon btn-rounded btn-outline-success" title = "Re Activate" onclick="reactivateemployeeworkingtime(\'' + code + '\')" ><i class="simple-icon-pencil"></i></button></td>';
                                        }
                                    }
                                }
                            ]
                        });
                    }
                    else {
                        var table = $('#tbl_vendoremployeetiminglist').DataTable({ destroy: true });
                        table.clear();
                        table.destroy();
                        $('#tbl_vendoremployeetiminglist').DataTable();
                    }
                },
                error: function (response) {

                }
            });

        } else {


        }
    });
}
function viewemployeeworkinghour(code) {
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
            data.append("Vendor_Employee_Timing_Id", code);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/VendorEmployee/LoadEmployeeWorkingTime",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        $('#btnvendoremployeetimingUpdate').show();
                        $('#btnvendoremployeetimingSave').hide();
                        $('#Vendor-Employee-Working-Time-Modal').modal('show');
                        $.each(response, function (i, vari) {
                            if (vari.Vendor_Employee_Timing_Dynamic_Status != "Dynamic") {
                                $('#StaticShiftId').show();
                                $('#DynamicShiftId').hide();
                                $('#WeeklyShiftId').hide();
                                $('#ddlWorkshift').val("Static");
                                $('#txtvendoremployeeworkinghoursfrom').val(vari.Vendor_Employee_Timing_From_Time);
                                $('#txtvendoremployeeworkinghoursto').val(vari.Vendor_Employee_Timing_To_Time);
                                $.each($("input[name='chkvendoremployeeholiday']:checked"), function () {
                                    $("input[name='chkvendoremployeeholiday']:checked").prop('checked', true);
                                });
                                var selectedValues = vari.Vendor_Employee_Timing_Holiday.split(',');
                                $.each(selectedValues, function (i, result) {
                                    $("input[name='chkvendoremployeeholiday'][value='" + selectedValues[i] + "']").prop('checked', false);
                                });
                            }
                            else
                            {
                                $('#StaticShiftId').hide();
                                $('#DynamicShiftId').show();
                                $('#WeeklyShiftId').hide();
                                $('#ddlWorkshift').val("Dynamic");

                             }
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

//Dynamic Working time load

function viewemployeeworkinghourDynamic(code) {
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
            data.append("Vendor_Employee_Timing_Id", code);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/VendorEmployee/LoadEmployeeWorkingTimeDynamic",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;
                    if (dat.length > 0) {
                        $('#btnvendoremployeetimingUpdate').show();
                        $('#btnvendoremployeetimingSave').hide();
                        $('#Vendor-Employee-Working-Time-Modal').modal('show');
                        //$.each(response, function (i, vari) {
                        //    //if (vari.Vendor_Employee_Timing_Dynamic_Status != "Dynamic") {
                        //    //    $('#StaticShiftId').show();
                        //    //    $('#DynamicShiftId').hide();
                        //    //    $('#ddlWorkshift').val("Static");
                        //    //    $('#txtvendoremployeeworkinghoursfrom').val(vari.Vendor_Employee_Timing_From_Time);
                        //    //    $('#txtvendoremployeeworkinghoursto').val(vari.Vendor_Employee_Timing_To_Time);
                        //    //    $.each($("input[name='chkvendoremployeeholiday']:checked"), function () {
                        //    //        $("input[name='chkvendoremployeeholiday']:checked").prop('checked', true);
                        //    //    });
                        //    //    var selectedValues = vari.Vendor_Employee_Timing_Holiday.split(',');
                        //    //    $.each(selectedValues, function (i, result) {
                        //    //        $("input[name='chkvendoremployeeholiday'][value='" + selectedValues[i] + "']").prop('checked', false);
                        //    //    });
                        //    //}
                        //    //else {
                                

                        //    //}
                        //});
                        $('#StaticShiftId').hide();
                        $('#WeeklyShiftId').hide();
                        $('#DynamicShiftId').show();
                        $('#ddlWorkshift').val("Dynamic");
                        var tableData = $('#dvShiftTable');
                        $.each(response, function (i, vari) {
                            //alert(vari.Vendor_Employee_Timing_Date);
                            tableData.append($('<tr></tr>')
                                .append($('<td></td>')
                                    .append(vari.Vendor_Employee_Timing_Date))
                                .append($('<td></td>')
                                    .append(vari.Vendor_Employee_Timing_From_Time))
                                .append($('<td></td>')
                                    .append(vari.Vendor_Employee_Timing_To_Time))
                                .append($('<td></td>')
                                    .append(vari.Vendor_Employee_Timing_Break_From_Time))
                                .append($('<td></td>')
                                    .append(vari.Vendor_Employee_Timing_Break_To_Time))
                                .append($('<td></td>')
                                    .append($('<input>')
                                        .attr({
                                            onClick: "$(this).closest('tr').remove();", type: 'button', name: 'btnDelete', id: 'btnDelete'
                                        })))
                            )

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


//Weekly Working time load

function viewemployeeworkinghourWeekly(code) {
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
            data.append("Vendor_Employee_Timing_Id", code);
            $.ajax({
                type: "Post",
                contentType: "application/json;charset=utf-8",
                url: "/VendorEmployee/LoadEmployeeWorkingTimeWeekly",
                dataType: "json",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    var dat = response;

                    if (dat.length > 0) {
                        $("#dvWeeklyShiftTable tbody tr").remove();
                        $('#btnvendoremployeetimingUpdate').show();
                        $('#btnvendoremployeetimingSave').hide();
                        $('#Vendor-Employee-Working-Time-Modal').modal('show');
                        $('#StaticShiftId').hide();
                        $('#DynamicShiftId').hide();
                        $('#WeeklyShiftId').show();
                        
                        $('#ddlWorkshift').val("Weekly");
                        var tableData = $('#dvWeeklyShiftTable');
                        $.each(response, function (i, vari) {
                            //alert(vari.Vendor_Employee_Timing_Date);
                            tableData.append($('<tr></tr>')
                                .append($('<td></td>')
                                    .append(vari.Vendor_Employee_Timing_Day))
                                    .append($('<td></td>')
                                    .append($('<input>')
                                        .attr({
                                            value: vari.Vendor_Employee_Timing_From_Time, class: "form-control", type: 'text', name: 'txtvendoremployeeworkinghoursfrom_1', id: 'txtvendoremployeeworkinghoursfrom_1'
                                        })))
                                .append($('<td></td>')
                                .append($('<input>')
                                    .attr({
                                        value: vari.Vendor_Employee_Timing_To_Time, class: "form-control", type: 'text', name: 'txtvendoremployeeworkinghoursTo_1', id: 'txtvendoremployeeworkinghoursTo_1'
                                    })))
                                .append($('<td></td>')
                                    .append($('<input>')
                                        .attr({
                                            value: vari.Vendor_Employee_Timing_Break_From_Time, class: "form-control", type: 'text', name: 'txtbreaktimefrom_1', id: 'txtbreaktimefrom_1'
                                        })))
                                .append($('<td></td>')
                                    .append($('<input>')
                                        .attr({
                                            value: vari.Vendor_Employee_Timing_Break_To_Time, class: "form-control", type: 'text', name: 'txtbreaktimeTo_1', id: 'txtbreaktimeTo_1'
                                        })))
                            )

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


function saveempoyeeworkingdetails(employeecode, vendorcode) {
    var employeeholidays = [];
    $.each($("input[name='chkvendoremployeeholiday']").not(":checked"), function () {
        employeeholidays.push($(this).val());
    });
    var data = new FormData();
    data.append("Vendor_Employee_Vendor_Id", GetURLParameter('vid'));
    data.append("Vendor_Employee_Timing_Holiday", employeeholidays);
    data.append("Vendor_Employee_Timing_From_Time", $.trim($('#txtvendoremployeeworkinghoursfrom').val()));
    data.append("Vendor_Employee_Timing_To_Time", $.trim($('#txtvendoremployeeworkinghoursto').val()));
    data.append("Vendor_Employee_Timing_Dynamic_Status", $.trim($('#ddlWorkshift').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorEmployee/SaveEmployeeWorkingTime",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                if ($.trim($('#ddlWorkshift').val()) == "Static") {
                    SuccessAlert(response[0].Title, response[0].Message);
                    resetemployeeworkinghour();
                    $('#Vendor-Employee-Working-Time-Modal').modal('hide');
                }
                else if ($.trim($('#ddlWorkshift').val()) == "Dynamic") {
                    var Time_Id = response[0].Time_Id;
                    //alert(Time_Id);
                    var rowCount = $('#dvShiftTable tr').length;
                    // alert(rowCount);
                    if (rowCount > 1) {
                        $("#dvShiftTable tbody tr").each(function () {
                            //alert(itco);
                           // alert('hii');
                            var row = $(this);
                            var Time_Date = row.find("td").eq(0).html();
                            var Time_From = row.find("td").eq(1).html();
                            var Time_To = row.find("td").eq(2).html();
                            var Break_From = row.find("td").eq(3).html();
                            var Break_To = row.find("td").eq(4).html();
                            //alert(Time_Date);
                            SaveDynamicWorkingTime(Time_Id, Time_Date, Time_From, Time_To, Break_From, Break_To);
                        });
                        $("#dvShiftTable tbody tr").remove();
                    }

                    SuccessAlert(response[0].Title, response[0].Message);
                    resetemployeeworkinghour();
                    $('#Vendor-Employee-Working-Time-Modal').modal('hide');
                }
                else
                {
                    var Time_Id = response[0].Time_Id;
                    //alert(Time_Id);
                    var rowCount = $('#dvWeeklyShiftTable tr').length;
                    //alert(rowCount);
                    var i = 0;
                    if (rowCount > 0) {
                        $("#dvWeeklyShiftTable tbody tr").each(function () {
                            //alert(itco);
                            //alert('hii');
                            i = i + 1;
                            if (i == 1) {
                                    var row = $(this);
                                    var Time_Day = row.find("td").eq(0).html();
                                    //var Time_From_1 = row.find("td").eq(1).html();
                                    var Time_From_1 = $.trim($('#txtvendoremployeeworkinghoursfrom_1').val());
                                var Time_To_1 = $.trim($('#txtvendoremployeeworkinghoursto_1').val());
                                var Break_From_1 = $.trim($('#txtbreaktimefrom_1').val());
                                var Break_To_1 = $.trim($('#txtbreaktimeto_1').val());
                                SaveWeeklyWorkingTime(Time_Id, Time_Day, Time_From_1, Time_To_1, Break_From_1, Break_To_1);
                            }
                            if (i == 2) {
                                var row = $(this);
                                var Time_Day = row.find("td").eq(0).html();
                                //var Time_From_1 = row.find("td").eq(1).html();
                                var Time_From_1 = $.trim($('#txtvendoremployeeworkinghoursfrom_2').val());
                                var Time_To_1 = $.trim($('#txtvendoremployeeworkinghoursto_2').val());
                                var Break_From_1 = $.trim($('#txtbreaktimefrom_2').val());
                                var Break_To_1 = $.trim($('#txtbreaktimeto_2').val());
                                SaveWeeklyWorkingTime(Time_Id, Time_Day, Time_From_1, Time_To_1, Break_From_1, Break_To_1);
                            }
                            if (i == 3) {
                                var row = $(this);
                                var Time_Day = row.find("td").eq(0).html();
                                //var Time_From_1 = row.find("td").eq(1).html();
                                var Time_From_1 = $.trim($('#txtvendoremployeeworkinghoursfrom_3').val());
                                var Time_To_1 = $.trim($('#txtvendoremployeeworkinghoursto_3').val());
                                var Break_From_1 = $.trim($('#txtbreaktimefrom_3').val());
                                var Break_To_1 = $.trim($('#txtbreaktimeto_3').val());
                                SaveWeeklyWorkingTime(Time_Id, Time_Day, Time_From_1, Time_To_1, Break_From_1, Break_To_1);
                            }
                            if (i == 4) {
                                var row = $(this);
                                var Time_Day = row.find("td").eq(0).html();
                                //var Time_From_1 = row.find("td").eq(1).html();
                                var Time_From_1 = $.trim($('#txtvendoremployeeworkinghoursfrom_4').val());
                                var Time_To_1 = $.trim($('#txtvendoremployeeworkinghoursto_4').val());
                                var Break_From_1 = $.trim($('#txtbreaktimefrom_4').val());
                                var Break_To_1 = $.trim($('#txtbreaktimeto_4').val());
                                SaveWeeklyWorkingTime(Time_Id, Time_Day, Time_From_1, Time_To_1, Break_From_1, Break_To_1);
                            }

                            if (i == 5) {
                                var row = $(this);
                                var Time_Day = row.find("td").eq(0).html();
                                //var Time_From_1 = row.find("td").eq(1).html();
                                var Time_From_1 = $.trim($('#txtvendoremployeeworkinghoursfrom_5').val());
                                var Time_To_1 = $.trim($('#txtvendoremployeeworkinghoursto_5').val());
                                var Break_From_1 = $.trim($('#txtbreaktimefrom_5').val());
                                var Break_To_1 = $.trim($('#txtbreaktimeto_5').val());
                                SaveWeeklyWorkingTime(Time_Id, Time_Day, Time_From_1, Time_To_1, Break_From_1, Break_To_1);
                            }
                            if (i == 6) {
                                var row = $(this);
                                var Time_Day = row.find("td").eq(0).html();
                                //var Time_From_1 = row.find("td").eq(1).html();
                                var Time_From_1 = $.trim($('#txtvendoremployeeworkinghoursfrom_6').val());
                                var Time_To_1 = $.trim($('#txtvendoremployeeworkinghoursto_6').val());
                                var Break_From_1 = $.trim($('#txtbreaktimefrom_6').val());
                                var Break_To_1 = $.trim($('#txtbreaktimeto_6').val());
                                SaveWeeklyWorkingTime(Time_Id, Time_Day, Time_From_1, Time_To_1, Break_From_1, Break_To_1);
                            }
                            if (i == 7) {
                                var row = $(this);
                                var Time_Day = row.find("td").eq(0).html();
                                //var Time_From_1 = row.find("td").eq(1).html();
                                var Time_From_1 = $.trim($('#txtvendoremployeeworkinghoursfrom_7').val());
                                var Time_To_1 = $.trim($('#txtvendoremployeeworkinghoursto_7').val());
                                var Break_From_1 = $.trim($('#txtbreaktimefrom_7').val());
                                var Break_To_1 = $.trim($('#txtbreaktimeto_7').val());
                                SaveWeeklyWorkingTime(Time_Id, Time_Day, Time_From_1, Time_To_1, Break_From_1, Break_To_1);
                            }
                           // SaveDynamicWorkingTime(Time_Id, Time_Date, Time_From, Time_To, Break_From, Break_To);
                        });
                        $("#dvShiftTable tbody tr").remove();
                    }

                    SuccessAlert(response[0].Title, response[0].Message);
                    resetemployeeworkinghour();
                    $('#Vendor-Employee-Working-Time-Modal').modal('hide');

                }
                
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message)
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message)
            }
            else {
                var content = "Invalid";
                var title = ".";
                ErrorAlert(title, content);
            }
        },
        error: function (response) {

        }
    });
}

function SaveDynamicWorkingTime(Time_Id, Time_Date, Time_From, Time_To, Break_From, Break_To) {
    var data = new FormData();
    data.append("Time_Id", Time_Id);
    data.append("Time_Date", Time_Date);
    data.append("Time_From", Time_From);
    data.append("Time_To", Time_To);
    data.append("Break_From", Break_From);
    data.append("Break_To", Break_To);
    data.append("Vendor_Employee_Id", "");
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorEmployee/SaveDynamicWorkingTime",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                //SuccessAlert(response[0].Title, response[0].Message);
                //$('#VendorCompany-Modal').modal('hide');
                // resetproduct() 

               // $('#Product-Modal').modal('hide');
                // resetproduct();
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
                //var content = "Invalid";
                //var title = "Invalid username or password.";
                //ErrorAlert(title, content);
            }
        },
        error: function (response) {

        }

    });
}

function SaveWeeklyWorkingTime(Time_Id, Time_Day, Time_From_1, Time_To_1, Break_From_1, Break_To_1,id) {
    var data = new FormData();
    data.append("Time_Id", Time_Id);
    data.append("Time_Day", Time_Day);
    data.append("Time_From", Time_From_1);
    data.append("Time_To", Time_To_1);
    data.append("Break_From", Break_From_1);
    data.append("Break_To", Break_To_1);
    data.append("Vendor_Employee_Id", "");
    data.append("id", id);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorEmployee/SaveWeeklyWorkingTime",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                //SuccessAlert(response[0].Title, response[0].Message);
                //$('#VendorCompany-Modal').modal('hide');
                // resetproduct() 

                // $('#Product-Modal').modal('hide');
                // resetproduct();
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
                //var content = "Invalid";
                //var title = "Invalid username or password.";
                //ErrorAlert(title, content);
            }
        },
        error: function (response) {

        }

    });
}

//function SaveWeeklyWorkingTime(Time_Id, Time_Date, Time_From, Time_To, Break_From, Break_To) {
//    var data = new FormData();
//    data.append("Time_Id", Time_Id);
//    data.append("Time_Date", Time_Date);
//    data.append("Time_From", Time_From);
//    data.append("Time_To", Time_To);
//    data.append("Break_From", Break_From);
//    data.append("Break_To", Break_To);
//    data.append("Vendor_Employee_Id", "");
//    $.ajax({
//        type: "Post",
//        contentType: "application/json;charset=utf-8",
//        url: "/VendorEmployee/SaveWeeklyWorkingTime",
//        dataType: "json",
//        data: data,
//        contentType: false,
//        processData: false,
//        success: function (response) {
//            if (response[0].Type == "Success") {
//                //SuccessAlert(response[0].Title, response[0].Message);
//                //$('#VendorCompany-Modal').modal('hide');
//                // resetproduct() 

//                // $('#Product-Modal').modal('hide');
//                // resetproduct();
//            }
//            else if (response[0].Type == "Warning") {
//                WarningAlert(response[0].Title, response[0].Message);
//                $('#btnUpdate').prop('disabled', false);
//            }
//            else if (response[0].Type == "Error") {
//                ErrorAlert(response[0].Title, response[0].Message);
//                $('#btnUpdate').prop('disabled', false);
//            }
//            else {
//                //var content = "Invalid";
//                //var title = "Invalid username or password.";
//                //ErrorAlert(title, content);
//            }
//        },
//        error: function (response) {

//        }

//    });
//}
function updateempoyeeworkingdetails(employeecode, vendorcode) {
    var employeeholidays = [];
    $.each($("input[name='chkvendoremployeeholiday']").not(":checked"), function () {
        employeeholidays.push($(this).val());
    });
    var data = new FormData();
    data.append("Vendor_Employee_Vendor_Id", GetURLParameter('vid'));
    data.append("Vendor_Employee_Timing_Holiday", employeeholidays);
    data.append("Vendor_Employee_Timing_From_Time", $.trim($('#txtvendoremployeeworkinghoursfrom').val()));
    data.append("Vendor_Employee_Timing_To_Time", $.trim($('#txtvendoremployeeworkinghoursto').val()));
    data.append("Vendor_Employee_Timing_Dynamic_Status", $.trim($('#ddlWorkshift').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorEmployee/UpdateEmployeeWorkingTime",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            //if (response[0].Type == "Success") {
            //    SuccessAlert(response[0].Title, response[0].Message);
            //    resetemployeeworkinghour();
            //    $('#Vendor-Employee-Working-Time-Modal').modal('hide');

            if (response[0].Type == "Success") {
                if ($.trim($('#ddlWorkshift').val()) == "Static") {
                    SuccessAlert(response[0].Title, response[0].Message);
                    resetemployeeworkinghour();
                    $('#Vendor-Employee-Working-Time-Modal').modal('hide');
                }
                else if ($.trim($('#ddlWorkshift').val()) == "Dynamic") {
                    var Time_Id = response[0].Time_Id;
                    // alert(Time_Id);
                    var rowCount = $('#dvShiftTable tr').length;
                    //alert(rowCount);
                    if (rowCount > 1) {
                        $("#dvShiftTable tbody tr").each(function () {
                            //alert(itco);
                            var row = $(this);
                            var Time_Date = row.find("td").eq(0).html();
                            var Time_From = row.find("td").eq(1).html();
                            var Time_To = row.find("td").eq(2).html();
                            var Break_From = row.find("td").eq(3).html();
                            var Break_To = row.find("td").eq(4).html();
                            SaveDynamicWorkingTime(Time_Id, Time_Date, Time_From, Time_To, Break_From, Break_To);
                        });
                        $("#dvShiftTable tbody tr").remove();
                    }

                    SuccessAlert(response[0].Title, response[0].Message);
                    resetemployeeworkinghour();
                    $('#Vendor-Employee-Working-Time-Modal').modal('hide');
                }
                else {

                    var Time_Id = response[0].Time_Id;
                    //alert(Time_Id);
                    var rowCount = $('#dvWeeklyShiftTable tr').length;
                    if (rowCount > 0) {
                        $("#dvWeeklyShiftTable tbody tr").each(function () {
                            //alert(itco);
                            var row = $(this);
                            var Time_Day = row.find("td").eq(0).html();
                            var Time_From_1 = row.find("td").eq(1).find('input').val();
                            var Time_To_1 = row.find("td").eq(2).find('input').val();
                            var Break_From_1 = row.find("td").eq(3).find('input').val();
                            var Break_To_1 = row.find("td").eq(4).find('input').val();
                             SaveWeeklyWorkingTime(Time_Id, Time_Day, Time_From_1, Time_To_1, Break_From_1, Break_To_1);
                            
                        });
                       // $("#dvavilableTable tbody tr").remove();
                    }


                    SuccessAlert(response[0].Title, response[0].Message);
                    resetemployeeworkinghour();
                    $('#Vendor-Employee-Working-Time-Modal').modal('hide');
                }

            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message)
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message)
            }
            else {
                var content = "Invalid";
                var title = ".";
                ErrorAlert(title, content);
            }
        },
        error: function (response) {

        }
    });
}
function inactivateemployeeworkingtime(code) {
    var data = new FormData();
    data.append("Vendor_Employee_Timing_Id", code);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorEmployee/DeactivateVendorEmployeeWorkingTime",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.length > 0) {
                if (response[0].Type == "Success") {
                    SuccessAlert(response[0].Title, response[0].Message);
                    resetemployeeworkinghour();
                }
                else if (response[0].Type == "Warning") {
                    WarningAlert(response[0].Title, response[0].Message)
                }
                else if (response[0].Type == "Error") {
                    ErrorAlert(response[0].Title, response[0].Message)
                }
                else {
                    var content = "Invalid";
                    var title = "Invalid username or password.";
                    ErrorAlert(title, content);
                }
            }
            else {

            }
        },
        error: function (response) {

        }
    });
}
function reactivateemployeeworkingtime(code) {
    var data = new FormData();
    data.append("Vendor_Employee_Timing_Id", code);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorEmployee/ReactivateVendorEmployeeWorkingTime",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.length > 0) {
                if (response[0].Type == "Success") {
                    SuccessAlert(response[0].Title, response[0].Message);
                    resetvendoremployee();
                }
                else if (response[0].Type == "Warning") {
                    WarningAlert(response[0].Title, response[0].Message)
                }
                else if (response[0].Type == "Error") {
                    ErrorAlert(response[0].Title, response[0].Message)
                }
                else {
                    var content = "Invalid";
                    var title = "Invalid username or password.";
                    ErrorAlert(title, content);
                }
            }
            else {

            }
        },
        error: function (response) {

        }
    });
}