$(function () {
    //var url = "../assets/js/page/admin/dashboard/vendorpackages.js";
    //$.getScript(url, function () {
    //    console.log("Package loaded");
    //});


    $('#Package-tab').unbind().click(function () {
        var url = "../assets/js/page/admin/dashboard/vendorpackages.js";
        $.getScript(url, function () {
            console.log("Package loaded");
        });
    });
       $('#Sub_Service-tab').unbind().click(function () {
        alert('service-tab profile');
        var url = "../assets/js/page/admin/dashboard/vendorsubservices.js";
           $.getScript(url, function () {
               alert(url);
            console.log("employee loaded");


        });
    });
});