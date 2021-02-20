var BaseURL = ''
window.onload=function getLoginUser(){
    document.getElementById("username").innerHTML = localStorage.getItem("username");
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
                    if (username==document.getElementById("username").innerText){
                        var a1 = document.createElement("div");
                        var b1 = document.createElement("div");
                        b1.innerHTML = nickname ;
                        b1.className = "nickname";
                        a1.appendChild(b1);
                        var b2 = document.createElement("div");
                        b2.innerHTML = id ;
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
                    a3.style['overflow']='hidden';
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
    if (document.getElementById("commentArea").value == ""){
        document.getElementById("alert").innerHTML= "留言内容不可为空"
    }
    else{
    var postRequest = new XMLHttpRequest()
    postRequest.open("POST",BaseURL+'/board/add')
    var postData = {
        username:document.getElementById("username").innerText,
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
}
function edit_text(){
    if (document.getElementById("id").value == "" && document.getElementById("edit").value == ""){
        document.getElementById("alert").innerHTML= "ID、修改内容不可为空"
    }
    else{
    if (document.getElementById("id").value == ""){
        document.getElementById("alert").innerHTML= "ID不可为空"
    }
    if (document.getElementById("edit").value == ""){
        document.getElementById("alert").innerHTML= "修改内容不可为空"
    }
    else{
    var postRequest = new XMLHttpRequest()
    postRequest.open('POST',BaseURL + '/board/modification')
    var postData = {
        id:document.getElementById("id").value,
        text: document.getElementById("edit").value
    }
    postRequest.setRequestHeader("Content-type","application/json")
    postRequest.send(JSON.stringify(postData))
    postRequest.onreadystatechange = function(){
        if (postRequest.readyState == 4){
            if (postRequest.status == 200){
                var x = postRequest.responseText;
                var y = eval("("+x+")");
                console.log(y["message"]);
                document.getElementById("alert").innerHTML="";
                document.getElementById("id").innerHTML='';
                document.getElementById("edit").innerHTML='';
                getAll();
            }
            else{
                var x = postRequest.responseText;
                var y = eval("("+x+")");
                console.log(y["message"]);
                document.getElementById("alert")=y["message"];
            }
        }
    }
}
}
function erase() {
    if (document.getElementById("ID").value == ""){
        document.getElementById("alert").innerHTML= "ID不可为空"
    }
    else{
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
}
function logout(){
    var postRequest = new XMLHttpRequest()
    postRequest.open("POST", BaseURL + '/userinfo/logout') 
    var postData = {
         username: document.getElementById("username").innerText
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
                var storage=window.localStorage;
                storage.clear();
                console.log(storage);
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
}