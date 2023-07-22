var attempt=10;
function validate(){
    var email=document.getElementById("email").value;
    
    var passowrd=document.getElementById("password").value;
    if(email=="stalin"&& passowrd=="1234"){
        alert("ingreso exitoso");
        window.location="elegir.html";
        return false;

    }
    else{
        attempt--;
    }
    alert("tienes " + attempt + " intentos")
    if (attempt==0){
    document.getElementById("email").disable=true;
    document.getElementById("password").disable=true;
    

    }
}