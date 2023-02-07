///////////////////////////////////////////////////////////////////////////////////////////////
// Create 3 arrays                                                                          //
// Use GET method to compare with the input for email and password                         //
// -If the email and password entered is same as one of the set of data in database       //
// Then we move to homepage page                                                         // 
// -Else will continue to stay as the login page                                         //
/////////////////////////////////////////////////////////////////////////////////////////

var contact = [];
var tempArr = []
var loginEmail;
var loginPassword;
var check;
$(document).ready(function () 
{
    const APIKEY = "63c6bb0e969f06502871af99";
    checkLogin();
    
    
    $("#login-submit").on("click", function (e) {

        e.preventDefault();

        let loginEmail = $("#login-email").val();
        let loginPassword = $("#login-password").val();


        let jsondata = 
        { 
            "email": loginEmail,
            "password": loginPassword
        };
        
        
        if(checkLogin2() == true)
        {
            alert("Login successful");
            console.log(check);
            window.location.href = "homepage.html";
            
        }
        else if (checkLogin2() == false)
        {
            alert("Login failed");
            console.log("Login Unsuccessful");
            console.log(check);
            
        }
        

    }); 
    
    addPoints();



    function checkLogin() 
    {
        let settings = 
        {
            "async": true,
            "crossDomain": true,
            "url": "https://login-5bdf.restdb.io/rest/login",
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "x-apikey": APIKEY,
                "cache-control": "no-cache"
            }
        }
        $.ajax(settings).done(function (response) 
        {
            console.log(response);
            for (let i = 0; i < response.length; i++) 
            {
                tempArr.push(response[i].email);
                tempArr.push(response[i].password);
                contact.push(tempArr);
                tempArr = [];
            }
            console.log(contact); 
        });

        
    }

    function checkLogin2() 
    {
        let i = 0;
        while(i < contact.length)
        {
            if (contact[i][0] == $("#login-email").val() && contact[i][1] == $("#login-password").val())
            {
                console.log("Login successful");
                check = true;
                contact = [];
                return check;
            }

            else
            {
                console.log("Login Failed");
                check = false;
                i++;
            }
        }
        
        
    }

    function addPoints()
    {   
        var total = 0 ;
        var totalPoint = 0;
        $("#total-points").on("click", function (e) {

            e.preventDefault();

            let settings = 
            {
                "async": true,
                "crossDomain": true,
                "url": "https://login-5bdf.restdb.io/rest/login",
                "method": "GET",
                "headers": {
                    "content-type": "application/json",
                    "x-apikey": APIKEY,
                    "cache-control": "no-cache"
                }
            }
            
            $.ajax(settings).done(function (response) 
            {

                for (let i = 0; i < response.length; i++) 
                {
                
                    var point = document.getElementById("point").value;

                    total = response[i].points += point;
                    totalPoint = total;

                    
                }
            });

            console.log(totalPoint);

            let loginPoints = totalPoint;

            
            let jsondata = 
            { 
                "email": loginEmail,
                "password": loginPassword,
                "points": loginPoints
            };

            let setting =
            {
                "async": true,
                "crossDomain": true,
                "url": `https://login-5bdf.restdb.io/rest/login/${response[i].id}`,
                "method": "PUT", 
                "headers": 
                {
                    "content-type": "application/json",
                    "x-apikey": APIKEY,
                    "cache-control": "no-cache"
                },
                "processData": false,
                "data": JSON.stringify(jsondata),
                "beforeSend": function()
                {

                }
            }
            $.ajax(setting).done(function (response) 
            {
                console.log(response);
                
            });
        });
    }
    
});
