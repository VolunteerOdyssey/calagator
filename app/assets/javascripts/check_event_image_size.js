$(function () {
    $(".input_action").click(function () {
        var upload_files = $("#event_image")[0].files;
        if (typeof (upload_files) != "undefined") {
            var size = parseFloat(upload_files[0].size / 1024).toFixed(2);

            if (size > 30000) {
                alert("The image cannot be larger than 30 MB, please select another and try again");
                return false;
            }
        }
    });
});