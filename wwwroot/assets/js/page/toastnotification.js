function SuccessAlert(title,content) {
    $.toast({
        heading: title,
        text: content,
        position: 'top-right',
        icon: 'success',
        allowToastClose: false,
        hideAfter: 3500,
        stack: false,
        //afterHidden: function () { window.location.reload(); }
    });
}
function WarningAlert(title, content) {
    $.toast({
        heading: title,
        text: content,
        position: 'top-right',
        icon: 'warning',
        allowToastClose: false,
        hideAfter: 3500,
        stack: false,
        //afterHidden: function () { window.location.reload(); }
    });
}
function ErrorAlert(title, content) {
    $.toast({
        heading: title,
        text: content,
        position: 'top-right',
        icon: 'error',
        allowToastClose: false,
        hideAfter: 3500,
        stack: false,
        //afterHidden: function () { window.location.reload(); }
    });
}