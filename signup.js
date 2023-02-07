////////////////////////////////////////////////////////////////////////////////////////////
// Create 3 arrays                                                                       //
// Use GET method to compare with the input for email and password                      //
// Use POST method to add the new user to the database                                 //
// -if the email is already in the database then it will not be added again           //
// -if the email is not in the database then it will be added to the database        //
// -it will then display a message to the user to say that they have been added     //
// Then we move to login page                                                      //
////////////////////////////////////////////////////////////////////////////////////

var contact = [];
var tempArr = [];
var doublecheck = [];
var loginEmail;
var loginPassword;
var check;
$(document).ready(function () 
{
    const APIKEY = "63c6bb0e969f06502871af99";
    retrieveDatabase();
    checkdatabase();
    
    $("#signup-submit").on("click", function (e) 
    {

        e.preventDefault();


        let loginEmail = $("#signup-email").val();
        let loginPassword = $("#signup-password").val();


        let jsondata = 
        { 
            "email": loginEmail,
            "password": loginPassword
        };

        let settings =
        {
            "async": true,
            "crossDomain": true,
            "url": "https://login-5bdf.restdb.io/rest/login",
            "method": "POST", 
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


                $("#signup-form").trigger("reset");
            }
        }

        $.ajax(settings).done(function (response) 
        {
            console.log(response);
            
            $("#signup-submit").prop( "disabled", false);
            
        });
        
        
        if (checkdatabase() == false)
        {
            alert("Sign in failed");
            console.log(check);
        }
        else 
        {
            alert("Sign in ok");
            console.log(check);  
            window.location.href = "login.html";
        }

        
        
        
    });




    function retrieveDatabase()
    {
        let settings = 
        {
            "async": true,
            "crossDomain": true,
            "url": "https://login-5bdf.restdb.io/rest/login",
            "method": "GET",
            "headers": 
            {
                "content-type": "application/json",
                "x-apikey": APIKEY,
                "cache-control": "no-cache"
            },
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

    function checkdatabase()
    {
        let i = 0;
        while(i < contact.length)
        {

            if (contact[i][0] == $("#signup-email").val())
            {
                console.log("Sign in unsuccessful");
                check = false;
                doublecheck.push(check);
               
            }
            else
            {
                console.log("Sign in successful");
                check = true;
                doublecheck.push(check);
            }
            i++;
        }

        for (let i = 0; i < doublecheck.length; i++)
        {
            if (doublecheck[i] == false)
            {
                return false;
            }


        }

    
    }

        
      
    
    
    
});
