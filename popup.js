let input_btn = document.querySelector('.btn');
let input_field = document.querySelector('#input');
let ul = document.querySelector('.list-item')
let input;


input_btn.addEventListener("click", function (e) {
    let input = input_field.value;
    if (input.length > 0) {
        input_field.value = "";
        let li = document.createElement("li");
        let web_name = document.createElement("div");
        let close_btn = document.createElement("div");
        web_name.setAttribute("class", "web-name");
        close_btn.setAttribute("class", "close-btn");
        web_name.innerHTML = input;
        close_btn.innerHTML = `X`;
        li.appendChild(web_name);
        li.appendChild(close_btn);
        ul.appendChild(li);
        chrome.runtime.sendMessage({ type: "add", add: input });

        close_btn.addEventListener("click", function () {
            chrome.runtime.sendMessage({ type: "remove", remove: input });
            console.log(input);
            li.remove();
        })

    }


})


function init() {
    chrome.runtime.sendMessage({ type: "sendDetails" }, function (response) {
        response.map((key) => {
            let li = document.createElement("li");
            let web_name = document.createElement("div");
            let close_btn = document.createElement("div");
            web_name.setAttribute("class", "web-name");
            close_btn.setAttribute("class", "close-btn");
            web_name.innerHTML = key;
            close_btn.innerHTML = `X`;
            li.appendChild(web_name);
            li.appendChild(close_btn);
            ul.appendChild(li);
            close_btn.addEventListener("click", function () {
                chrome.runtime.sendMessage({ type: "remove", remove: key });
                li.remove();
            });

        });
    });
}

init();























// let changeImage = document.querySelector("#change-image");


// changeImage.addEventListener("click" , function(){
//     // message should be passed to content.js file

//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//         let tabId = tabs[0].id;

//         // event send message dispatch
//         chrome.tabs.sendMessage(tabId, "Hello from popup !!!" , function(response){
//             console.log(response);
//         });


//       });


// })