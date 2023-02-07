var contact = [];
var tempArr = []
var loginEmail;
var loginPassword;
var check;
$(document).ready(function () 
{
    //what kind of interface we want at the start 
    const APIKEY = "63c6bb0e969f06502871af99";
    checkLogin();
    
    
    

    //[STEP 1]: Create our submit form listener
    $("#login-submit").on("click", function (e) {
        //prevent default action of the button 
        e.preventDefault();

        //[STEP 2]: let's retrieve form data
        //for now we assume all information is valid
        //you are to do your own data validation 
        let loginEmail = $("#login-email").val();
        let loginPassword = $("#login-password").val();

        //[STEP 3]: get form values when user clicks on send
        //Adapted from restdb api
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
            //prevent default action of the button 
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
                    //console.log(total);

                    
                }
            });

            console.log(totalPoint);

            let loginPoints = totalPoint;
            //[STEP 3]: get form values when user clicks on send
            //Adapted from restdb api
            
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
                "method": "PUT", //[cher] we will use post to send info
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
        
            //[STEP 4]: Create our AJAX settings. Take note of API key
            

            //[STEP 5]: Send our ajax request over to the DB and print response of the RESTDB storage to console.
            $.ajax(setting).done(function (response) 
            {
                console.log(response);
                

                
                //update our table 
                
            });
        });
    }
    
});
