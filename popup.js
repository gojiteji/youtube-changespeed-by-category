
state=true

function update(){
    var val=document.querySelector('input').value
    document.querySelector('.txt').innerHTML=parseFloat(val).toFixed(1)+"x"
}

function downhandler(e) {
    update()
}




document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('input').addEventListener('click', downhandler);
});


