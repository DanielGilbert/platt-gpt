const userInput = document.getElementById("user-input");
const chatArea = document.getElementById("chat");
const sendBtn = document.querySelector(".fa-paper-plane");
const form = document.getElementById('form');
const infoBtn = document.getElementById('infoBtn');
let userMeowed = false;

var selectedAvatar = Math.floor(Math.random() * 9);

var greetings = ['Moin.', 'Moin, wat geiht?'];
var greetingsIndex = Math.floor(Math.random() * greetings.length);

function createResponse(meows) {

    let newBubble2Container = document.createElement("div");
    newBubble2Container.classList.add("chat-bubble-container", "chat-gpt-bubble-container");
    newBubble2Container.innerHTML = '<div class="profile-picture"><img src="images/avatar'+selectedAvatar+'.png" height="100%" /></div>';

    let newBubble2 = document.createElement("div");
    newBubble2.classList.add("chat-bubble", "chat-gpt-bubble");
    newBubble2.innerHTML = "...."; // At first, only show an ellipsis
    newBubble2Container.appendChild(newBubble2);
    chatArea.appendChild(newBubble2Container);
    newBubble2.scrollIntoView(); // Scroll down, so the input field is at the bottom of the page again
    let currentMeow = 0;

    let meowLoop = setInterval(() => { // Interval to show more of the reply every 100 milliseconds (simulating typing behaviour)
        if (currentMeow < meows.length) {
            currentMeow += Math.floor(Math.random() * 10); // Show between 0 and 10 more characters
            newBubble2.innerHTML = meows.slice(0, currentMeow) + "█"; // While typing, end the string with a block character
        } else {
            newBubble2.innerHTML = meows; // When finished, put the entire response in the bubble, without block character
            clearInterval(meowLoop);
            userInput.focus(); // Focus the input again, so user can type a new response
        }
    }, 150);

}

function handleSubmit(event) {
    event.preventDefault(); // Prevent refresh on form submission

    if (userInput.value == "")
        return;

    let userString = userInput.value;

    let newBubbleContainer = document.createElement("div");
    newBubbleContainer.classList.add("chat-bubble-container", "user-bubble-container");
    newBubbleContainer.innerHTML = '<div class="profile-picture"><img src="images/user.png" height="100%" /></div>';

    let newBubble = document.createElement("div");
    newBubble.classList.add("chat-bubble", "user-bubble");
    newBubble.innerHTML = userInput.value;
    newBubbleContainer.appendChild(newBubble);
    chatArea.appendChild(newBubbleContainer);
    userInput.value = ""; // Clear the input vield

    // Generate the PlattGPT response
    
    let normalResponses = ['Jo.', 'Tjoar.','Jo.', 'Tjoar.', 'Jo.', 'Tjoar.'];
    normalResponseIndex = Math.floor(Math.random() * normalResponses.length);

    let questionResponses = ['Jo.','Jo.','Machste nix, kiekste doof.','Jo.','Machste nix, kiekste doof.','Jo.','Jo.','Geiht nich, givt nich!','Jo.','Jo.','Watt mutt, datt mutt']
    questionResponseIndex = Math.floor(Math.random() * questionResponses.length);

    if (userString.replace(/[\.,!?]/g,'').toLowerCase() == 'jo' && userMeowed == false) { // Hurray you found some easter eggs🐰🥚
        meows = "Naomaken is de höögte Form vun Anerkennung.";
        userMeowed = true;
    } else if (userString.replace(/[\.,!?]/g,'').toLowerCase() == 'moin moin'){
        meows = "Sabbel nich'!";
    } else if(userString.replace(/[\.\w,!"']/g,'').toLowerCase().length > 0){
        meows = questionResponses[questionResponseIndex];
    } else {
        meows = normalResponses[normalResponseIndex];
    }

    createResponse(meows);
}

sendBtn.addEventListener("click", handleSubmit); // Handle clicks to the submit button
form.addEventListener("submit", handleSubmit); // Handle default submit (e.g. pressing enter)

createResponse(greetings[greetingsIndex]);

const infoText = [
    "Hi! Mein Name ist Daniel, und ich schwimme gerade voll auf der AI-Welle. Oder auch nicht.",
    "Jedenfalls war eine Freundin von mir der Meinung, dass in der AI-Landschaft noch eine stoische, norddeutsche AI fehlt.",
    "Daher gibt's jetzt PlattGPT. Die AI antwortet auf jede Frage mit einem vollständigen, norddeutschen Satz. Also sowas wie \"Tjoar.\". Oder \"Jo.\"",
    "Oder so.",
    "...",
    "...",
    "Hier gibt es wirklich keine AI. ;)",
    'Ehre wem Ehre gebührt: Die Ursprungsidee stammt von <a href="https://github.com/woutervdijke/catgpt" target="_blank">CatGPT</a>, das Papierflieger-Icon ist von FontAwesome, der Benutzeravatar ist von Iconsax, und die AI-Avatare hat DALL-E 2 generiert.'
]; // Lines of the information chat


infoBtn.addEventListener("click", handleInfoClick); // Handle clicks to the info link

function handleInfoClick() {
    // Create a chat-bubble-container
    
    let newBubble3Container = document.createElement("div");
    newBubble3Container.classList.add("chat-bubble-container", "daniel-bubble-container");
    newBubble3Container.innerHTML = '<div class="profile-picture"><img src="/images/daniel.png" height="100%" /></div>';

    function createLine(i) { // Create each line seperately, one at a time
        if (i < infoText.length) { // Check if the line exists
            let newBubble3 = document.createElement("div");
            newBubble3.classList.add("chat-bubble", "daniel-bubble");
            let currentLineText = infoText[i];
            let currentWord = 0;
            let singlelineLoop = setInterval(() => { // Loop over the words, to simulate typing behaviour
                if (currentWord < currentLineText.length) {
                    currentWord += Math.floor(Math.random() * 10) + 5; // Return between 5 and 15 characters
                    newBubble3.innerHTML = currentLineText.slice(0, currentWord) + "█"; // While typing, end the string with a block character
                } else {
                    newBubble3.innerHTML = currentLineText; // When finished, put the entire response in the bubble, without block character
                    clearInterval(singlelineLoop);
                    form.scrollIntoView();
                    userInput.focus(); // Focus the input again, so user can type a new response
                    createLine(i + 1);  // Call this function again using i+1 so the next line is created
                }
            }, 80)

            newBubble3Container.appendChild(newBubble3);
            chatArea.appendChild(newBubble3Container);
        }

        let chats = document.getElementsByClassName("chat-bubble-container");
        let lastElement = chats[chats.length - 1];
        lastElement.scrollIntoView();
    }
    createLine(0); // Start creating the respone with the first line
}