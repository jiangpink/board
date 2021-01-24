var BaseURL = ''
window.onload=function getLoginUser(){
    var getRequest = new XMLHttpRequest()
    getRequest.open('GET',BaseURL + '/username')
    getRequest.send()
    getRequest.onreadystatechange = function() {
        if(getRequest.readyState == 4){
            if(getRequest.status == 200){
                var x= getRequest.response;
                var y= eval("("+x+")");
                document.getElementById("username").innerHTML=y["username"];
            }
            else{
                console.log(getRequest.responseText)
            }
        }
    }
}
function getAll(){
    var getRequest = new XMLHttpRequest()
    getRequest.open('GET',BaseURL + '/board')
    getRequest.send()
    getRequest.onreadystatechange = function() {
        if(getRequest.readyState == 4){
            if(getRequest.status == 200){
                let obj = JSON.parse(getRequest.responseText) ;
                let board = obj.boards ;
                document.getElementsByClassName('board')[0].innerHTML = ""
                for (var i=0 ; i < board.length ; i++ ){
                    var nickname = board[i].nickname;
                    var date = board[i].date;
                    var text = board[i].text;
                    var last = board[i].last;
                    var username =board[i].username;
                    var id =board[i].id;
                    var a = document.createElement("div");
                    if (username==document.getElementById("username").value){
                        var a1 = document.createElement("div");
                        var b1 = document.createElement("div");
                        b1.innerHTML = nickname ;
                        b1.className = "nickname";
                        a1.appendChild(b1);
                        var b2 = document.createElement("div");
                        b2.innerHTML = nickname ;
                        b2.className = "id";
                        a1.appendChild(b2);
                        a.appendChild(a1);
                        }
                    else{
                        var a1 = document.createElement("div");
                        a1.innerHTML = nickname ;
                        a1.className = "nickname";
                        a.appendChild(a1);
                    }
                    var a2 = document.createElement("div");
                    a2.innerHTML = date ;
                    a2.className = "date";
                    a.appendChild(a2);
                    var a3 = document.createElement("div");
                    a3.innerHTML = text ;
                    a3.className = "text";
                    a3.style['overflow']='auto';
                    a.appendChild(a3);
                    var a4 = document.createElement("div");
                    a4.innerHTML = "编辑：" + last ;
                    a4.className = "last";
                    a.appendChild(a4);
                    document.getElementsByClassName("board")[0].appendChild(a);           
                }   
            }
        }
    }
}

getAll()

function postComment(){
    var postRequest = new XMLHttpRequest()
    postRequest.open("POST",BaseURL+'/board/add')
    var postData = {
        username:document.getElementById("username").value,
        text:document.getElementById("commentArea").value
    }
    postRequest.setRequestHeader("Content-type","application/json")
    postRequest.send(JSON.stringify(postData))
    postRequest.onreadystatechange=function(){
        if(postRequest.readyState == 4){
            if(postRequest.status == 200){
                var x= postRequest.responseText;
                var y= eval("("+x+")");
                console.log(y["message"]);
                document.getElementById("alert").innerHTML="";
                document.getElementById("commentArea").innerHTML="";
                getAll();
            }
            else{
                var x= postRequest.responseText;
                var y= eval("("+x+")");
                console.log(y["message"]);
                document.getElementById("alert").innerHTML=y["message"];
            }
        }
    }
}
function edit_text(){
    var putRequest = new XMLHttpRequest()
    putRequest.open('PUT',BaseURL + '/board/modification')
    var putData = {
        id:document.getElementById("id").value,
        text: document.getElementById("edit").value
    }
    putRequest.setRequestHeader("Content-type","application/json")
    putRequest.send(JSON.stringify(putData))
    putRequest.onreadystatechange = function(){
        if (putData.readyState == 4){
            if (putData.status == 200){
                var x = putRequest.responseText;
                var y = eval("("+x+")");
                console.log(y["message"]);
                document.getElementById("alert").innerHTML="";
                document.getElementById("id").innerHTML='';
                document.getElementById("edit").innerHTML='';
                getAll();
            }
            else{
                var x = putRequest.responseText;
                var y = eval("("+x+")");
                console.log(y["message"]);
                document.getElementById("alert")=y["message"];
            }
        }
    }
}
function erase() {
    var postRequest = new XMLHttpRequest()
    postRequest.open('POST',BaseURL + '/board/deletion')
    var postData = {
        id:document.getElementById("id").value
    }
    postRequest.setRequestHeader("Content-type","application/json")
    postRequest.send(JSON.stringify(postData))
    postRequest.onreadystatechange = function(){
        if (postData.readyState == 4){
            if (postData.status == 200){
                var x = postRequest.responseText;
                var y = eval("("+x+")");
                console.log(y["message"]);
                document.getElementById("alert").innerHTML=""
                getAll()
            }
            else{
                var x = postRequest.responseText;
                var y = eval("("+x+")");
                console.log(y["message"]);
                document.getElementById("alert").innerHTML=y["message"];
            }
        }
    }
}
function logout(){
    var postRequest = new XMLHttpRequest()
    postRequest.open("POST", BaseURL + '/userinfo/logout') 
    var postData = {
         username: document.getElementById("username").value
    }
    postRequest.setRequestHeader("Content-type", "application/json")
    postRequest.send(JSON.stringify(postData))
    postRequest.onreadystatechange = function() {
        if (postRequest.readyState == 4) {
            if (postRequest.status == 200) { 
                var x = postRequest.responseText;
                var y = eval("("+x+")");
                console.log(y["message"]);
                document.getElementById("alert").innerHTML="";
                window.location.href="login.html";
            } else { 
                var x = postRequest.responseText;
                var y = eval("("+x+")");
                console.log(y["message"]);
                document.getElementById("alert").innerHTML=y["message"];
        }
      }
   }
}