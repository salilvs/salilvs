$(function () {
   // alert('hii');
    $('#btnSave').unbind().click(function () {
        savedetails();
    });

});

function savedetails() {
    var holidays = [];

    //$.each($("input[name='chkholiday']").prop('checked', 'checked'), function () {
    //    holidays.push($(this).val());
    //    alert($(this).val());
    //});


    $("input:checkbox[name='chkholiday']:checked").each(function () {
      //  alert($(this).val());
        holidays.push($(this).val());
    });
    alert(holidays);
    //var holidays = [];
    //$("input[name='options[]']:checked").each(function () {
    //    holidays.push($(this).val());
    //});
}