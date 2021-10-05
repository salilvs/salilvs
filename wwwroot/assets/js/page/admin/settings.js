$(function () {
    $('#templateEmailotp,#templateEmailpassword').dropify();
    loadzonecurrency();
    loadLogos();
    LoadappVersions();
    LoadappLinks();
    $('#btnTime_CurrencySave').unbind().click(function () {
        $('#btnTime_CurrencySave').prop('disabled', false);
        if ($('#timezonecurrentform').parsley().validate() !== true) {
            $('#btnTime_CurrencySave').prop('disabled', false);
        }
        else {
            updatezonecurrency();
        }
    });
    $('#btnTime_CurrencyReset').unbind().click(function () {
        loadzonecurrency();
    });
    $('#btnsettingLogofReset').unbind().click(function () {
        loadLogos();
    });
    $('#btnappversionReset').unbind().click(function () {
        LoadappVersions();
    });
    $('#btnappReset').unbind().click(function () {
        LoadappLinks();
    });
    $('#btnsettingLogofSave').unbind().click(function () {
        $('#btnsettingLogofSave').prop('disabled', false);
        if ($('#settingLogoform').parsley().validate() !== true) {
            $('#btnsettingLogofSave').prop('disabled', false);
        }
        else {
            updateLogos();
        }
    });
    $('#btnappversionSave').unbind().click(function () {
        $('#btnappversionSave').prop('disabled', false);
        if ($('#appversionform').parsley().validate() !== true) {
            $('#btnappversionSave').prop('disabled', false);
        }
        else {
            UpdateappVersions();
        }
    });
});
function loadzonecurrency() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Settings/loadZonecurrency",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $.each(dat, function (j, vari) {
                    $('#txttimezone').val("");
                    $('#txtcurrency').val("");
                    $('#txttimezone').val(vari.Settings_Time_Zone_Used);
                    $('#txtcurrency').val(vari.Settings_Curreny_Symbol_Used);
                });
            }
        },
        error: function (response) {

        }
    });
}
function updatezonecurrency() {
    var data = new FormData();
    data.append("Time_Zone", $.trim($('#txttimezone').val()));
    data.append("currency", $.trim($('#txtcurrency').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Settings/UpdateZonecurrency",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                resetemployee();
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
        },
        error: function (response) {

        }
    });
}
function loadLogos() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Settings/loadLogos",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $.each(dat, function (j, vari) {
                    var image0Path = vari.Settings_Logo;
                    var image1Path = vari.Settings_Mobile_Logo;

                    $('#settingWindowimage').attr("data-default-file", image0Path);
                    $('#settingWindowimage').dropify();
                    $('#settingMobileimage').attr("data-default-file", image1Path);
                    $('#settingMobileimage').dropify();
                });
            }
        },
        error: function (response) {

        }
    });
}
function updateLogos() {
    var data = new FormData();
    data.append("window_Logo", $('#settingWindowimage').get(0).files[0]);
    data.append("mobile_Logo", $('#settingMobileimage').get(0).files[0]);
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Settings/UpdateLogos",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                resetemployee();
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message)
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message)
            }
            else {
                var content = "Invalid";
                var title = "Server Side error";
                ErrorAlert(title, content);
            }
        },
        error: function (response) {

        }
    });
}
function LoadappVersions() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Settings/LoadappVersions",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $.each(dat, function (j, vari) {
                    $('#txtAppcustomerApkversion').val("");
                    $('#txtAppemployeeApkversion').val("");
                    $('#txtAppcustomerIosversion').val("");
                    $('#txtAppemployeeIosversion').val("");
                    $('#txtAppcustomerApkversion').val(vari.Settings_Customer_APK_Version);
                    $('#txtAppemployeeApkversion').val(vari.Settings_Employee_APK_Version);
                    $('#txtAppcustomerIosversion').val(vari.Settings_Customer_IOS_Version);
                    $('#txtAppemployeeIosversion').val(vari.Settings_Employee_IOS_Version);
                });
            }
        },
        error: function (response) {

        }
    });
}
function UpdateappVersions() {
    var data = new FormData();
    data.append("Customer_apk_Version", $.trim($('#txtAppcustomerApkversion').val()));
    data.append("Employee_apk_Version", $.trim($('#txtAppemployeeApkversion').val()));
    data.append("Customer_ios_Version", $.trim($('#txtAppcustomerIosversion').val()));
    data.append("Employee_ios_Version", $.trim($('#txtAppemployeeIosversion').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Settings/UpdateappVersions",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                resetemployee();
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message)
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message)
            }
            else {
                var content = "Invalid";
                var title = "Server Side error";
                ErrorAlert(title, content);
            }
        },
        error: function (response) {

        }
    });
}
function LoadappLinks() {
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Settings/LoadappLinks",
        dataType: "json",
        success: function (response) {
            var dat = response;
            if (dat.length > 0) {
                $.each(dat, function (j, vari) {
                    $('#txtlinklabel1').val("");
                    $('#txtlinklabel2').val("");
                    $('#txtlinklabel3').val("");
                    $('#txtlinklabel4').val("");
                    $('#txtlinklabel1').val(vari.Settings_App_Web_Link_1_Title);
                    $('#txtlinklabel2').val(vari.Settings_App_Web_Link_2_Title);
                    $('#txtlinklabel3').val(vari.Settings_App_Web_Link_3_Title);
                    $('#txtlinklabel4').val(vari.Settings_App_Web_Link_4_Title);

                    $('#txtlinkUrl1').val("");
                    $('#txtlinkUrl2').val("");
                    $('#txtlinkUrl3').val("");
                    $('#txtlinkUrl4').val("");
                    $('#txtlinkUrl1').val(vari.Settings_App_Web_Link_1_URL);
                    $('#txtlinkUrl2').val(vari.Settings_App_Web_Link_2_URL);
                    $('#txtlinkUrl3').val(vari.Settings_App_Web_Link_3_URL);
                    $('#txtlinkUrl4').val(vari.Settings_App_Web_Link_4_URL);
                });
            }
        },
        error: function (response) {

        }
    });
}
function UpdateappLinks() {
    var data = new FormData();
    data.append("link_Label_1", $.trim($('#txtlinklabel1').val()));
    data.append("link_Label_2", $.trim($('#txtlinklabel2').val()));
    data.append("link_Label_3", $.trim($('#txtlinklabel3').val()));
    data.append("link_Label_4", $.trim($('#txtlinklabel4').val()));
    data.append("link_Url_1", $.trim($('#txtlinkUrl1').val()));
    data.append("link_Url_2", $.trim($('#txtlinkUrl2').val()));
    data.append("link_Url_3", $.trim($('#txtlinkUrl3').val()));
    data.append("link_Url_4", $.trim($('#txtlinkUrl4').val()));
    $.ajax({
        type: "Post",
        contentType: "application/json;charset=utf-8",
        url: "/Settings/UpdateappLinks",
        dataType: "json",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response[0].Type == "Success") {
                SuccessAlert(response[0].Title, response[0].Message);
                resetemployee();
            }
            else if (response[0].Type == "Warning") {
                WarningAlert(response[0].Title, response[0].Message)
            }
            else if (response[0].Type == "Error") {
                ErrorAlert(response[0].Title, response[0].Message)
            }
            else {
                var content = "Invalid";
                var title = "Server Side error";
                ErrorAlert(title, content);
            }
        },
        error: function (response) {

        }
    });
}