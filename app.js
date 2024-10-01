// Function to send message and handle different types of queries
async function sendMessage() {
    const inputElement = document.getElementById('user-input');
    const userMessage = inputElement.value.trim();
    
    if (!userMessage) return; // Prevent empty message

    // Add user's message to chat box
    addMessageToChat('user-message', userMessage);

    // Clear the input field
    inputElement.value = '';

    // Check if the user is asking for an image or a chat response
    if (userMessage.toLowerCase().startsWith("image")) {
        const imageDescription = userMessage.slice(6);  // Get the description after "image"
        const imageUrl = await getImageFromDescription(imageDescription);
        displayImage(imageUrl);
    } else {
        const chatReply = await getChatReply(userMessage);
        addMessageToChat('bot-message', chatReply);
    }
}

// Function to get a response from one of the chat APIs
async function getChatReply(message) {
    try {
        // Using BrainShop API for general chatbot queries
        const response = await fetch(`http://api.brainshop.ai/get?bid=177607&key=NwzhALqeO1kubFVD&uid=[uid]&msg=${encodeURIComponent(message)}`);
        const data = await response.json();
        return data.cnt;
    } catch (error) {
        console.error('Error communicating with BrainShop:', error);
        return "Oops! Something went wrong with the chat.";
    }
}

// Function to generate an image from text using the image API
async function getImageFromDescription(description) {
    try {
        // Using your custom image API
        const response = await fetch(`http://api.maher-zubair.tech/ai/photoleap?q=${encodeURIComponent(description)}`);
        const data = await response.json();
        
        if (data.status === 200) {
            return data.result;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error generating image:', error);
        return null;
    }
}

// Function to display an image in the chat
function displayImage(imageUrl) {
    const chatBox = document.getElementById('chat-box');

    // Create an image element
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageElement.alt = "Generated image";
    imageElement.style.maxWidth = '100%';
    imageElement.style.margin = '10px 0';

    // Append the image to chat box
    chatBox.appendChild(imageElement);

    // Scroll chat to the bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to add a text message to the chat box
function addMessageToChat(type, message) {
    const chatBox = document.getElementById('chat-box');

    // Create message element
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type);
    messageElement.textContent = message;

    // Append to chat box
    chatBox.appendChild(messageElement);

    // Scroll chat to the bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}
