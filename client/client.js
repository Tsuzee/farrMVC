$(document).ready(() => {

    const handleError = (message) => {
        $("#errorMessage").text(message);
        $("#message").animate({width:'toggle'},350);
    }
    
    const sendAjax = (action, data) => {
        $.ajax({
            cache: false,
            type: "POST",
            url: action,
            data: data,
            dataType: "json",
            success: (result, status, xhr) => {
                $("#message").animate({width:'hide'},350);
                
                console.log("Users Unique ID: " + result.data);
                
                window.location = result.redirect;
				var idKey = ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4);
                window.sessionStorage.setItem('id', idKey);
				//window.sessionStorage.setItem('id', result.data);
            },
            error: (xhr, status, error) => {
                const messageObj = JSON.parse(xhr.responseText);
            
                handleError(messageObj.error);
            }
        });        
    }
    
    $("#signupSubmit").on("click", (e) => {
        e.preventDefault();
    
        $("#message").animate({width:'hide'},350);
    
        if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
            handleError("RAWR! All fields are required");
            return false;
        }
        
        if($("#pass").val() !== $("#pass2").val()) {
            handleError("RAWR! Passwords do not match");
            return false;           
        }

        sendAjax($("#signupForm").attr("action"), $("#signupForm").serialize());
        
        return false;
    });

    $("#loginSubmit").on("click", (e) => {
        e.preventDefault();
    
        $("#message").animate({width:'hide'},350);
    
        if($("#user").val() == '' || $("#pass").val() == '') {
            handleError("RAWR! Username or password is empty");
            return false;
        }
    
        sendAjax($("#loginForm").attr("action"), $("#loginForm").serialize());

        return false;
    });
});