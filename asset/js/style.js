const chatinput = document.querySelector('.chatinvoker')
const btninvoker = document.querySelector('.chatinit')
const chatRespons = document.querySelector('.chatcontant')
const toggleActive = document.querySelector('.searchOnlines')


btninvoker.addEventListener('click', function(event){

    chatRespons.append(usersChat());

    chatRespons.appendChild(robotchat());

    // letScroll()


    

    bot('', chatinput.value.trim())

    chatinput.value = '';


    // UseGemini(); 

    letScroll();



})

chatinput.addEventListener('keyup', function(event){
    if(this.value.trim() !== 0){
        btninvoker.disabled = false;
    }else{
        btninvoker.disabled = true;
    }
    if(event.key === 'Enter'){
        btninvoker.click();
    }

})
function usersChat(){
    let chatWrapper = document.createElement('div');
    chatWrapper.className = 'chats user-chat';
    chatWrapper.innerHTML = `
            <div class="chtTxt">
                    <p>${chatinput.value.trim()}</p>
                    <span class="usericon" >
                        <i class="fas fa-user-alt"></i>
                    </span>
            </div>
    `;
    
    return chatWrapper
}



    function robotchat(){
        let chatWrapper = document.createElement('div');
        chatWrapper.className = 'chats robot-chat';
        chatWrapper.innerHTML = `
                <div class="chtTxt">
                    <span class="usericon  robotIcon" >
                        <i class="fas fa-robot"></i>
                        <span class="animatewrap">
                            <!-- <span class="animatewrap"></span> -->
                            <span class="animate"></span>
                            <span class="animate"></span>
                            <span class="animate"></span>
                        </span>
                    </span>
                    <p class="thinking"></p>
                    
                </div>
        `;

    return chatWrapper
}

toggleActive.addEventListener('click', function(){
    this.classList.toggle('active');
})


function EnableWebSarch(){
    if(toggleActive.classList.contains('active')){
        return true;
    }
    return false;
}


function letScroll(){
    chatRespons.scrollTop = chatRespons.scrollHeight - 200;

    // console.log(this.clientHeight)
    // chatRespons.scrollTo({'top': 0, behavior: 'smooth'})
    // chatRespons.addEventListener('scroll', function(){
        // if(this.clientHeight > this.style.height){
            // chatRespons.scrollTo(130)
        // }
    // })
}

async function  UseGemini(txt){
    let Apikey = "AIzaSyD-N_B4Diq0v97tcRO_f8-pTKpoNVuD0Oc";


    const payload = {
        contents: [{
            parts: [{
                text: txt
            }]
        }]
            
    }


try{
    let response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key= ${Apikey}`, {
        method : "post",
        headers: {'content-type' : 'application/json'},
        body: JSON.stringify(payload)
    })

    let result = await response.json();
    // console.log(result.candidates[0].content.parts[0])
    if(result &&
        result.candidates.length > 0 &&
        result.candidates[0].content  &&
       result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0 &&
        result.candidates[0].content.parts[0].text 
        
    ){
        const ganaratedText = result.candidates[0].content.parts[0].text;
        return ganaratedText;
    }
    else{
        return " 😍Gemini response is empty or not ready";
    } 

}catch (error) {
    console.error("Error calling Gemini API:" , error);
    throw error;
}

}

// console.log(UseGemini('how many state is in nigeria'))

function useLocal(txt){
    // alert(txt)
    let userPrompt = txt;
    let cht
    let key
    let responses;
    let mychat

    if(userPrompt.includes('year')){
         cht = Respons[0];
         key = Object.keys(cht);

        

          mychat = key[Math.floor(Math.random() * key.length)];
         
        //   console.log(cht[mychat])
          
         return cht[mychat];

    }

    if(userPrompt.includes('time')){
        cht = Respons[1];
        key = Object.keys(cht);

         mychat = key[Math.floor(Math.random () * key.length)];
        

        return cht[mychat];


}

    if(userPrompt.includes('your name')){
        cht = Respons[2];
        key = Object.keys(cht);

         mychat = key[Math.floor(Math.random () * key.length)];
        

        return cht[mychat];


    }

 }

 async function bot(rtn , txt){

    let response = EnableWebSarch() ? await UseGemini(txt) : useLocal(txt);
    let AllresponsePtag = document.querySelectorAll('.thinking');
    let lastP = AllresponsePtag[AllresponsePtag.length - 1];

console.log(response)
// alert(EnableWebSarch())
    let start = 0;
    let time = setInterval(() =>{
        lastP.innerHTML += response.charAt(start);
         letScroll();


        if(start >= response.length){
            clearInterval(time);
            let think = document.querySelectorAll('.animatewrap');
            let ispan = think[think.length - 1];

            ispan.remove();
        }
        start++;
    }, 30)

}


function checkInternet(){

    return navigator.onLine;
    

}

window.addEventListener('online' , function(){
    toggleActive.click();

});
window.addEventListener('offline' , function(){
    toggleActive.click();

});