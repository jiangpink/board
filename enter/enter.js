var BaseURL = ''
function postUser(){
    if (document.getElementById("username").value == "" && document.getElementById("password").value == ""){
        document.getElementById("alert").innerHTML= "用户名、密码不可为空"
    }
    else{
    if (document.getElementById("username").value == ""){
        document.getElementById("alert").innerHTML= "用户名不可为空"
    }
    if (document.getElementById("password").value == ""){
        document.getElementById("alert").innerHTML= "密码不可为空"
    }
    else{
    var postRequest = new XMLHttpRequest()
    postRequest.open('POST',BaseURL+'/session')
    var postData ={
        username: document.getElementById("username").value ,
        password: document.getElementById("password").value
    }
    postRequest.setRequestHeader("Content-type","application/json")
    postRequest.send(JSON,stringify(postData))
    postRequest.onreadychange = function(){
        if (postRequest.readyState == 4){
            if (postRequest.status ==200) {
                var name = document.getElementById("username").value;
                localStorage.setItem("username", name);
                var x= postRequest.responseText;
                var y= eval("("+x+")");
                console.log(y["message"]);
                document.getElementById("alert").innerHTML="";
                window.location.href="board.html";
            } else {
                var x= postRequest.responseText;
                var y= eval("("+x+")");
                console.log(y["message"]);
                document.getElementById("alert").innerHTML=y["message"];
            }
        }
    }
}
}
}
function postNewUser(){
    if (document.getElementById("username").value == "" && document.getElementById("password").value == ""){
        document.getElementById("alert").innerHTML= "用户名、密码不可为空"
    }
    else{
    if (document.getElementById("username").value == ""){
        document.getElementById("alert").innerHTML= "用户名不可为空"
    }
    if (document.getElementById("password").value == ""){
        document.getElementById("alert").innerHTML= "密码不可为空"
    }
    else{
    var postRequest = new XMLHttpRequest()
    postRequest.open("POST",BaseURL + '/register')
    var postData = {
        username: document.getElementById("username").value ,
        password: document.getElementById("password").value
    }
    postRequest.setRequestHeader("Content-type","application/json")
    postRequest.send(JSON.stringify(postData))
    postRequest.onreadystatechange = function(){
        if (postRequest.readyState ==4) {
            if (postRequest.status == 200) {
                var x= postRequest.responseText;
                var y= eval("("+x+")");
                console.log(y["message"])
                document.getElementById("alert").innerHTML=""
                window.location.href="login.html"
            } else {
                var x= postRequest.responseText;
                var y= eval("("+x+")");
                console.log(y["message"]);
                document.getElementById("alert").innerHTML=y["message"];
            }
        }
    }
}
}
}