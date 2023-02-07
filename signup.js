var contact = [];
var tempArr = [];
var doublecheck = [];
var loginEmail;
var loginPassword;
var check;
$(document).ready(function () 
{
    //what kind of interface we want at the start 
    const APIKEY = "63c6bb0e969f06502871af99";
    retrieveDatabase();
    checkdatabase();
    

    //[STEP 1]: Create our submit form listener
    $("#signup-submit").on("click", function (e) 
    {
        //prevent default action of the button 
        e.preventDefault();

        //[STEP 2]: let's retrieve form data
        //for now we assume all information is valid
        //you are to do your own data validation 
        let loginEmail = $("#signup-email").val();
        let loginPassword = $("#signup-password").val();
        let loginPoints = 0;

        //[STEP 3]: get form values when user clicks on send
        //Adapted from restdb api
        let jsondata = 
        { 
            "email": loginEmail,
            "password": loginPassword,
            "points": loginPoints
        };

        let settings =
        {
            "async": true,
            "crossDomain": true,
            "url": "https://login-5bdf.restdb.io/rest/login",
            "method": "POST", //[cher] we will use post to send info
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

                //clear our form using the form id and triggering it's reset feature
                $("#signup-form").trigger("reset");
            }
        }
    
        //[STEP 4]: Create our AJAX settings. Take note of API key
        

        //[STEP 5]: Send our ajax request over to the DB and print response of the RESTDB storage to console.
        $.ajax(settings).done(function (response) 
        {
            console.log(response);
            
            $("#signup-submit").prop( "disabled", false);
            
            //update our table 
            
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

        
        
        
    });//end click 




    function retrieveDatabase()
    {
        let settings = 
        {
            "async": true,
            "crossDomain": true,
            "url": "https://login-5bdf.restdb.io/rest/login",
            "method": "GET", //[cher] we will use GET to retrieve info
            "headers": 
            {
                "content-type": "application/json",
                "x-apikey": APIKEY,
                "cache-control": "no-cache"
            },
        }
    

        //[STEP 8]: Make our AJAX calls
        //Once we get the response, we modify our table content by creating the content internally. We run a loop to continously add on data
        //RESTDb/NoSql always adds in a unique id for each data, we tap on it to have our data and place it into our links 
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
