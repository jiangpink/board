var BaseURL = 'http://8.129.238.142/dzy'
window.onload=function getLoginUser(){
    if(localStorage.getItem("username")){
    document.getElementById("username").innerHTML = localStorage.getItem("username");
    }
    else{
        document.getElementById("username").innerHTML = "";
        document.getElementById("postComment").innerHTML = '<p class="guest">要留言请<a href="login.html">登录</a></p>';
        var a=document.getElementById("logout");
        a.setAttribute("style","display:none");
        var b=document.getElementById("person");
        b.setAttribute("style","display:none");
    }
}

function getAll(){
    var getRequest = new XMLHttpRequest()
    getRequest.open('GET',BaseURL + '/boards/all')
    getRequest.send()
    getRequest.onreadystatechange = function() {
        if(getRequest.readyState == 4){
            if(getRequest.status == 200){
                let obj = JSON.parse(getRequest.responseText) ;
                console.log(getRequest.responseText);
                let board = obj.boards ;
                console.log(board);
                console.log(Object.keys(board).length)
                console.log(board["0"]);
                document.getElementsByClassName('board')[0].innerHTML = "";
                for (var i=0 ; i < Object.keys(board).length ; i++ ){
                    var id =board[i].id;
                    var nickname = board[i].nickname;
                    var date = board[i].date;
                    var last = board[i].last;i
                    var text = board[i].text;
                    var username =board[i].username;
                    var a = document.createElement("li");
                    var a1 = document.createElement("p");
                    a1.innerHTML = nickname ;
                    a1.className = "nickname";
                    a.appendChild(a1);
                    var a2 = document.createElement("p");
                    a2.innerHTML = id ;
                    a2.className = "id";
                    a.appendChild(a2);
                    var a3 = document.createElement("p");
                    a3.innerHTML = username ;
                    a3.className = "username";
                    a.appendChild(a3);
                    var a4 = document.createElement("p");
                    a4.innerHTML = date ;
                    a4.className = "date";
                    a.appendChild(a4);
                    var a5 = document.createElement("p");
                    a5.innerHTML = text ;
                    a5.className = "text";
                    a5.style['overflow']='hidden';
                    a.appendChild(a5);
                    if (username==document.getElementById("username").innerText){
                        var b = document.createElement("div");
                        b.className = "bottom";
                        var a6 = document.createElement("p");
                        a6.innerHTML = '<a href = "javascript:;" class="edit">编辑</a>'+":" + last ;
                        a6.className = "last";
                        b.appendChild(a6);
                        b.innerHTML += '<a href = "javascript:;" class="delete">删除</a>';
                        a.appendChild(b);
                    }
                    else{
                        var a6 = document.createElement("p");
                        a6.innerHTML = "编辑:" + last ;
                        a6.className = "last";
                        a.appendChild(a6);
                    }
                    document.getElementsByClassName("board")[0].appendChild(a);           
                }   
            }
        }
    }
}

getAll()

function postComment(){
    if (document.getElementById("commentArea").value == ""){
        document.getElementById("alert").innerHTML= "留言内容不可为空";
    }
    else{
        var time=new Date();
        var year=time.getFullYear();
        var month=time.getMonth()+1;
        var date1=time.getDate();
        var hour=time.getHours(); 
        var minute=time.getMinutes(); 
        var second=time.getSeconds();
        var postRequest = new XMLHttpRequest()
        postRequest.open("POST",BaseURL+'/board/add')
        var postData = {
            username:document.getElementById("username").innerText,
            text:document.getElementById("commentArea").value,
            date:year+"-"+month+"-"+date1+" "+hour+":"+minute+":"+second,
            last:year+"-"+month+"-"+date1+" "+hour+":"+minute+":"+second
        }
        postRequest.setRequestHeader("Content-type","application/json")
        postRequest.send(JSON.stringify(postData))
        postRequest.onreadystatechange=function(){
            if(postRequest.readyState == 4){
                if(postRequest.status == 200){
                    let obj = JSON.parse(postRequest.responseText) ;
                    console.log(obj.message);
                    var id=obj.id;
                    var nickname=obj.nickname;
                    var date = year+"-"+month+"-"+date1+" "+hour+":"+minute+":"+second;
                    var last = year+"-"+month+"-"+date1+" "+hour+":"+minute+":"+second;
                    var text = document.getElementById("commentArea").value ;
                    var username = document.getElementById("username").innerText;
                    var a = document.createElement("li");
                    var a1 = document.createElement("p");
                    a1.innerHTML = nickname ;
                    a1.className = "nickname";
                    a.appendChild(a1);
                    var a2 = document.createElement("p");
                    a2.innerHTML = id ;
                    a2.className = "id";
                    a.appendChild(a2);
                    var a3 = document.createElement("p");
                    a3.innerHTML = username ;
                    a3.className = "username";
                    a.appendChild(a3);
                    var a4 = document.createElement("p");
                    a4.innerHTML = date ;
                    a4.className = "date";
                    a.appendChild(a4);
                    var a5 = document.createElement("p");
                    a5.innerHTML = text ;
                    a5.className = "text";
                    a5.style['overflow']='hidden';
                    a.appendChild(a5);
                    var b = document.createElement("div");
                    b.className = "bottom";
                    var a6 = document.createElement("p");
                    a6.innerHTML = '<a href = "javascript:;" class="edit">编辑</a>'+":" + last ;
                    a6.className = "last";
                    b.appendChild(a6);
                    b.innerHTML += '<a href = "javascript:;" class="delete">删除</a>';
                    a.appendChild(b);
                    document.getElementsByClassName("board")[0].appendChild(a);  
                    document.getElementById("alert").innerHTML="";
                    document.getElementById("commentArea").innerHTML=""; 
                }
            }
        }
    }
}


var btn = document.querySelectorAll('a');
for (var i = 0; i < btn.length; i++) {
    btn[i].onclick = function(){
        if(this.innerText=="编辑"){
            var text = this.parentNode.parentNode.parentNode.childNodes[9].innerText;
            console.log(this.parentNode.parentNode.parentNode.childNodes[9].innerText);
            var last = this.parentNode.innerText;
            this.parentNode.parentNode.parentNode.childNodes[9].innerHTML='<textarea>'+text+'</textarea>';
            this.parentNode.innerHTML='<a href = "javascript:;" class="save">'+"保存"+"</a>"
            this.parentNode.innerHTML+='<a href = "javascript:;" class="cancel">'+"取消"+"</a>"
            for (var i = 0; i < btn.length; i++) {
                btn[i].onclick = function(){
                    if(this.innerText="保存"){
                        if(this.parentNode.parentNode.parentNode.childNodes[9].childNodes[0].value==""){
                            alert("修改内容不可为空")
                        }
                        else{
                            var postRequest = new XMLHttpRequest()
                            postRequest.open('POST',BaseURL + '/board/modification')
                            var time=new Date();
                            var year=time.getFullYear();
                            var month=time.getMonth()+1;
                            var date1=time.getDate();
                            var hour=time.getHours(); 
                            var minute=time.getMinutes();
                            var postData = {
                            id:this.parentNode.parentNode.parentNode.childNodes[3].innerText,
                            text:this.parentNode.parentNode.parentNode.childNodes[9].childNodes[0].value,
                            last:year+"-"+month+"-"+date1+" "+hour+":"+minute+":"+second
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
                                        this.parentNode.parentNode.parentNode.childNodes[9].innerHTML=this.parentNode.parentNode.parentNode.childNodes[9].childNodes[0].value;
                                        this.parentNode.innerHTML='<a href = "javascript:;" class="edit">编辑</a>'+":" + year+"-"+month+"-"+date1+"-"+" "+hour+":"+minute+":"+second;
                                    }
                                }
                            }
                        }
                    if(this.innerText="取消"){
                        this.parentNode.parentNode.parentNode.childNodes[9].innerHTML=text;
                        this.parentNode.innerHTML=last;
                    }
                }
            }
        }
        if(this.innerHTML=="删除"){
            var postRequest = new XMLHttpRequest()
            postRequest.open('POST',BaseURL + '/board/deletion')
            var postData = {
                username:document.getElementById("username").innerText,
                id:this.parentNode.parentNode.childNodes[3].innerText
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
                        var ul = document.querySelector('ul');
                        ul.removeChild(this.parentNode.parentNode);
                    }
                }
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
            } 
        }
    }
}