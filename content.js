category = ""
speed=1.0
var video = document.querySelector('video')

/*---- 非遷移ページ用 -----*/
var href = location.href;
var observer = new MutationObserver(function (mutations) {
    if (href !== location.href) {
        video = document.querySelector('video')
        showmore().then(get_category).then(set_speed)
        href = location.href;
    }
});

observer.observe(document, { childList: true, subtree: true });

/*---- 初期動作 ----*/
window.onload = function () {
    try {
        //open show more


        showmore().then(get_category).then(set_speed)//get category

    } catch (error) {
        console.error("not supporting page")
    }
}


function showmore() {
    return new Promise((resolve, reject) => {
        document.querySelector('ytd-expander').removeAttribute("collapsed");
        resolve();
    })
}
function get_category() {
    return new Promise((resolve, reject) => {
        category = document.querySelector('#collapsible').querySelector('.yt-simple-endpoint').innerHTML;
        console.log(category)
        resolve();
    })
}

function set_speed() {
    if (!(category == "Music" || category == "音楽")) {
        video.playbackRate = speed
    } else {
        video.playbackRate = 1
    }
}

/*
chrome.runtime.sendMessage(
    { value: { contents: "test value from contents" } }
);
*/

// 受信側 other tab -> contents(popup/option -> contents)
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    speed=JSON.parse(message).contents
    showmore().then(get_category).then(set_speed)//メッセが来たら更新
    return;
});
