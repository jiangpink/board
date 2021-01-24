function getAll(){
    var BaseURL = ''
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
                    var a = document.createElement("div");
                    var a1 = document.createElement("div");
                    a1.innerHTML = nickname ;
                    a1.className = "nickname";
                    a.appendChild(a1);
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