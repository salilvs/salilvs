//How to call the notification
//customnotify('New Order Placed', 'Please wait for kitchen staff to comfirm the order placed', 'Thank you');

document.addEventListener('DOMContentLoaded', function () {
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
});

function customnotify(title, desc, url) {

    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
    else {
        var notification = new Notification(title, {
            icon: 'http://Your_Website.com/logo.png',
            body: desc,
        });

        /* Remove the notification from Notification Center when clicked.*/
        notification.onclick = function () {
            window.open(url);
        };

        /* Callback function when the notification is closed. */
        notification.onclose = function () {
            console.log('Notification closed');
        };

    }
}  