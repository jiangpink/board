function getAll(){
    var BaseURL = ''
    var getRequest = new XMLHttpRequest()
    getRequest.open('GET',BaseURL + '/board')
    getRequest.send()
    getRequest.onreadystatechange = function() {
        if(getRequest.readyState == 4){
            if(getRequest.status == 200){
                var x = getRequest.response;
                var comments = eval("("+x+")");
                document.getElementsByTagName('ul')[0].innerHTML = ""
                var ul = "";
                for (var i=0 ; i < comments.length ; i++ ){
                    var ls = comments["board"];
                    var nickname = ls[i]["nickname"];
                    var text = ls[i]["text"];
                    var date = ls[i]["date"];
                    var last = ls[i]["last"];
                    ul += '<li class="item">';
                    ul += '     <div class="info">';
                    ul += '         <div class="nickname">nickname</div>';
                    ul += '         <div class="date">date</div>';
                    ul += '         <div class="text">text</div>';
                    ul += '         <div class="last">last</div>';
                    ul += '     </div>'
                    ul += '</li>'
                }
                document.getElementById("UL").innerHTML= ul ;   
            }
        }
    }
}
getAll()