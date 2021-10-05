$(function () {
    alert('hiii');
   
   
    //loadbranches();
    loadvendorbranches();
    //$("#ddlvendorbranch").change(function () {
    //    event.preventDefault();
    //    var data = $("#ddlvendorbranch").val();
    //    //alert(data);
    //    loademployeelist(data);
    //});

    //function GetSelectedCheckBoxes() {
    //    var allVals = [];
    //    $('.chkListItem  :checked').each(function () {
    //        allVals.push($(this).val());
    //    });
    //    alert(allVals);
    //}
    

 


    $(document).on('click', '.chklistitem', function () {
        alert('hii');
       var st = $(this).is(':checked') ? 1 : 0;

        alert($(this).is(':checked'));
        var s = $(this).is(':checked');
        alert(s);
        //alert(this.value);
        if ($(this).is(':checked'))
        {
         
            var data = this.value;
            loademployeelist(data,s);
        }
        else
        {
         
            var data = this.value;
            loadremoveemployeelist(data, s);
        }
     
    });
    //$('#btnTest').unbind().click(function () {
      
    //    var chected = new Array();
    //    $("[name='chklistitem']").each(function (index, data) {
    //        alert('hii');
    //        if (data.checked) {
    //            alert(data.value);
    //            alert(data.nextSibling.textContent);
    //            chected.push(data.value);
    //        }
    //    });
    //    alert(chected);

    //});
    $('#btnUpdate').unbind().click(function () {
        //var chected = new Array();
        //$("[name='chkemplistitem']").each(function (index, data) {
        //    if (data.checked) {
        //        alert(data.value);
        //        chected.push(data.value + "---" + data.nextSibling.textContent);
        //    }
        //});
        //alert(chected);

        var chected = new Array();
        $("[name='chklistitem']").each(function (index, data) {
            if (data.checked) {
                debugger
                alert(data.value);
                chected.push(data.value);
            }
        });
        alert(chected);

    });
    $('#btnSave').unbind().click(function () {
        event.preventDefault();
        //$('#btnvendoremployeeSave').prop('disabled', true);
        //if ($('#employeeform').parsley().validate() !== true) {
        //    $('#btnvendoremployeeSave').prop('disabled', false);
        //}
        //else {
            savevendoruserdetails();
        //}
    });
});

function savevendoruserdetails() {
    var approveaccess = "No"; var rescheduleaccess = "No"; var cancelaccess = "No"; var holdaccess = "No"; var completeaccess="No";
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
    if ($('input[name=chkcompleteaccess]:checked').val() == "Yes") {
        completeaccess = "Yes";
    }
   
    var data = new FormData();
 
    data.append("vendor_Id", '');
    data.append("vendor_Username", $.trim($('#txtvendorusername').val()));
    data.append("vendor_EmailId", $.trim($('#txtemail').val()));
    data.append("vendor_Phone", $.trim($('#txtphone').val()));
    data.append("vendor_Password", $.trim($('#txtpassword').val()));
   
    data.append('Access_To_Approve', approveaccess);
    data.append('Access_To_Reschedule', rescheduleaccess);
    data.append('Access_To_Cancel', cancelaccess);
    data.append('Access_To_Hold', holdaccess);
    data.append('Access_To_Complete', completeaccess);
    //branchdata

    var branchlist = new Array();
    $("[name='chklistitem']").each(function (index, data) {
        if (data.checked) {
            //debugger
            //alert(data.value);
            branchlist.push(data.value);
        }
    });
    //alert(branchlist);

    data.append('branch_id', branchlist);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorUser/SaveVendorUser",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
               // resetvendoremployee();
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message);
                $('#btnSave').prop('disabled', false);
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message);
                $('#btnSave').prop('disabled', false);
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

function loademployeelist(Vendor_Branch_Id,s) {
    //alert('status');
    //alert(s);
    var data = new FormData();
    data.append("Vendor_Id", '');

    data.append("Vendor_Branch_Id", Vendor_Branch_Id);
    data.append("IsChecked", s);
    //alert(Vendor_Branch_Id);
    //alert(st);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorUser/LoadVendorBranchEmployee",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            
            var data = response;
            var table = $('<table></table>');
            var counter = 0;
            $(data).each(function () {
                table.append($('<tr></tr>').append($('<td ></td>').append($('<input>').attr({
                  // type: 'checkbox', name: 'chklistitem', value: this.Value, id: 'chklistitem' + counter
                    type: 'checkbox', name: 'chkemplistitem', value: this.Vendor_Employee_Id, id: 'chkemplistitem' + counter
                })).append(
                    $('<label>').attr({
                        for: 'chkemplistitem' + counter++
                    }).text(this.Vendor_Employee_Name))));
            });

            $('#dvemployee').append(table);
        }
    
    });
}

function loadremoveemployeelist(Vendor_Branch_Id, s) {
    var data = new FormData();
    data.append("Vendor_Id", '');

    data.append("Vendor_Branch_Id", Vendor_Branch_Id);
    data.append("IsChecked", s);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorUser/LoadVendorBranchEmployee",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
          
            $('#dvemployee').empty();
            
            var data = response;
            var table = $('<table></table>');
            var counter = 0;
            $(data).each(function () {
                table.append($('<tr></tr>').append($('<td ></td>').append($('<input>').attr({
                    //type: 'checkbox', name: 'chklistitem', value: this.Value, id: 'chklistitem' + counter
                    type: 'checkbox', name: 'chkemplistitem', value: this.Vendor_Employee_Id, id: 'chkemplistitem' + counter
                })).append(
                    $('<label>').attr({
                        for: 'chkemplistitem' + counter++
                    }).text(this.Vendor_Employee_Name))));
            });

            $('#dvemployee').append(table);
        }

    });
}
function loadbranches(){
    var data = new FormData();
    data.append("Vendor_Id",'');
    //data.append("Vendor_Main_Category_Id", Main_Category_Id);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorUser/LoadVendorBranch",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
               
                $.each(response, function (i, vari) {

                    $("#ddlvendorbranch").append('<option value="' + vari.Vendor_Branch_Id + '">' + vari.Vendor_Branch_Name + '</option>');
                });
                //$('#ddlvendorbranch').multiselect({
                //    includeSelectAllOption: true
                //}); 
                //    $("#ddlvendorbranch").append("<optgroup id='opt" + j + "'  label='" + vari.v + "'></optgroup>");
                //    $.each(vari.ms, function (i, varis) {
                //        var id = "#opt" + j;

                //        $(id).append("<option value='" + varis.Vendor_Branch_Id + "'>" + varis.Vendor_Branch_Name + "</option>");
                //    });
                //});
            }
            else {

            }
        },
        error: function (response) {

        }
    });
}


function loadvendorbranches() {
    var data = new FormData();
    data.append("Vendor_Id", '');
    //data.append("Vendor_Main_Category_Id", Main_Category_Id);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/VendorUser/LoadVendorBranch",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            var data = response;
            alert(response);
            var table = $('<table></table>');
            var counter = 0;
            var slno = 0;
            $(data).each(function () {
               
                //table.append($('<tr></tr>').append($('<td></td>').append($('<input>').attr({
                //    type: 'checkbox', name: 'chklistitem', value: this.Value, id: 'chklistitem' + counter
                //})).append(
                //    $('<label>').attr({
                //        for: 'chklistitem' + counter++
                //    }).text(this.Vendor_Branch_Name))));
                table.append($('<tr></tr>').append($('<td></td>')
                    .append($('<label>').attr({
                        for: 'chklistitem' + counter++
                       
                    }).text(this.Vendor_Branch_Name)))
                    .append($('<input class="chklistitem">').attr({
                        //type: 'checkbox', name: 'chklistitem', value: this.Vendor_Branch_Id, id: 'chklistitem' + counter
                        type: 'checkbox', name: 'chklistitem', value: this.Vendor_Branch_Id, id: 'chklistitem' + counter

                           
                })));
            });

            $('#dvvendorbranch').append(table);
            //if (dat.length > 0) {

            //    $.each(response, function (i, vari) {

            //        $("#ddlvendorbranch").append('<option value="' + vari.Vendor_Branch_Id + '">' + vari.Vendor_Branch_Name + '</option>');
            //    });
               
            //}
            //else {

            //}
        },
        error: function (response) {

        }
    });
}