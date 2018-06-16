document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("select_" + localStorage["SpartanPass_password_type"]).selected = true;

    document.getElementById('defaultpaste').addEventListener('change', function (evt) {
        localStorage["SpartanPass_password_type"] = evt.target[evt.target.selectedIndex].value;
    });

    document.getElementById('button').addEventListener('click', function () {
        let new_password = document.getElementById("password").value;

        if (new_password.length < 32) {
            alert("Password must be at least 32 characters.")
        } else if (confirm("Really change your master password?")) {
            localStorage["SpartanPass"] = new_password;
            document.location = "popup.html"
        }
    });

    document.getElementById('backbutton').addEventListener('click', function () {
        document.location = "popup.html"
    });

    document.getElementById('password').addEventListener('input', function () {
        document.getElementById("count").textContent = "character count: " + document.getElementById("password").value.length + " / 32"
    });

});

