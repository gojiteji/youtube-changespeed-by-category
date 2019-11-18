var val=""
/*cookie読み込み*/
val=Cookies.get('val');

if(isNaN(val)){
    val="1.5"
    document.querySelector('.txt').innerHTML="1.5x"
}else{
    document.querySelector('.txt').innerHTML=parseFloat(val).toFixed(1)+"x"
}
document.querySelector('.input-range').value=parseFloat(val)
sendToContents()

function update(){
    val=document.querySelector('input').value
    document.querySelector('.input-range').value=parseFloat(val)
    document.querySelector('.txt').innerHTML=parseFloat(val).toFixed(1)+"x"
    /*Cookies書き込み */
    Cookies.set('val',  val);
    sendToContents()

}


function downhandler(e) {
    update()
}


document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('input').addEventListener('click', downhandler);
});

//scriptに情報送信
function sendToContents(){
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, 
            JSON.stringify({ contents: "test value from popup" }),
            function (response) {
            });
    });    
}


function sendToContents(){
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, 
            JSON.stringify({ contents:val }),
            function (response) {
            });
    });    
}
