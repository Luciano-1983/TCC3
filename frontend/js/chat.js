let userChatElements = {};
let profChatElements = {};

let chatUser = null; // The user initiating the chat (e.g., {id: 1, nome: "Cliente"})
let chatProf = null; // The professional being chatted with (e.g., {id: 101, nome: "Dr. Silva"})

export function initializeChat(userChatDOM, professionalChatDOM) {
    userChatElements = userChatDOM;
    profChatElements = professionalChatDOM;

    userChatElements.sendMessageButton.addEventListener('click', sendMessageFromUserChat);
    userChatElements.messageInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessageFromUserChat();
        }
    });
    userChatElements.closeButton.addEventListener('click', closeChatSession);

    profChatElements.sendMessageButton.addEventListener('click', sendMessageFromProfessionalChat);
    profChatElements.messageInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessageFromProfessionalChat();
        }
    });
    profChatElements.closeButton.addEventListener('click', closeChatSession);
    
    if (profChatElements.releaseDataButton) { // Check if button exists
        profChatElements.releaseDataButton.addEventListener('click', handleReleaseData);
    }
}

function getFirstName(fullName) {
    if (!fullName) return "";
    return fullName.split(' ')[0];
}

export function openChatSession(interactingUser, selectedProfessional) {
    if (!userChatElements.panel || !profChatElements.panel) {
        console.error("Chat DOM elements not fully initialized.");
        return;
    }
    chatUser = interactingUser;
    chatProf = selectedProfessional;

    const userFirstName = getFirstName(interactingUser.nome);
    const profFirstName = getFirstName(selectedProfessional.nome);

    // Configure User's Chat Panel
    userChatElements.recipientName.textContent = `Chat com: ${profFirstName}`;
    userChatElements.messagesContainer.innerHTML = ''; // Clear previous messages
    userChatElements.messageInput.value = '';
    userChatElements.panel.classList.remove('hidden');

    // Configure Professional's Simulated Chat Panel
    profChatElements.recipientName.textContent = `Chat com: ${userFirstName}`;
    profChatElements.messagesContainer.innerHTML = ''; // Clear previous messages
    profChatElements.messageInput.value = '';
    profChatElements.panel.classList.remove('hidden');

    // Enable the release data button when a new session starts
    if (profChatElements.releaseDataButton) {
        profChatElements.releaseDataButton.disabled = false;
        profChatElements.releaseDataButton.textContent = 'Liberar Dados';
    }
}

export function closeChatSession() {
    if (userChatElements.panel) userChatElements.panel.classList.add('hidden');
    if (profChatElements.panel) profChatElements.panel.classList.add('hidden');
    
    if (userChatElements.messagesContainer) userChatElements.messagesContainer.innerHTML = '';
    if (userChatElements.messageInput) userChatElements.messageInput.value = '';
    
    if (profChatElements.messagesContainer) profChatElements.messagesContainer.innerHTML = '';
    if (profChatElements.messageInput) profChatElements.messageInput.value = '';

    chatUser = null;
    chatProf = null;
}

function appendMessage(container, textOrHtml, senderName, type, isDataShare = false) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type); 
    const senderFirstName = getFirstName(senderName);

    if (isDataShare) {
        messageElement.classList.add('data-shared');
        // For data-shared messages, we might not want the sender name prefix,
        // or format it differently. The content can be HTML.
        messageElement.innerHTML = textOrHtml; // Use innerHTML for data share
    } else {
        messageElement.textContent = `${senderFirstName}: ${textOrHtml}`;
    }
    container.appendChild(messageElement);
    container.scrollTop = container.scrollHeight; // Scroll to bottom
}

function sendMessageFromUserChat() {
    if (!chatUser || !chatProf || !userChatElements.messageInput) return;
    const messageText = userChatElements.messageInput.value.trim();
    if (messageText === '') return;

    // Display in User's panel as "sent"
    appendMessage(userChatElements.messagesContainer, messageText, chatUser.nome || "Você", 'sent');
    
    // Display in Professional's panel as "received"
    appendMessage(profChatElements.messagesContainer, messageText, chatUser.nome || "Usuário", 'received');

    userChatElements.messageInput.value = ''; // Clear input
}

function sendMessageFromProfessionalChat() {
    if (!chatUser || !chatProf || !profChatElements.messageInput) return;
    const messageText = profChatElements.messageInput.value.trim();
    if (messageText === '') return;

    // Display in Professional's panel as "sent"
    appendMessage(profChatElements.messagesContainer, messageText, chatProf.nome || "Profissional", 'sent');

    // Display in User's panel as "received"
    appendMessage(userChatElements.messagesContainer, messageText, chatProf.nome || "Profissional", 'received');
    
    profChatElements.messageInput.value = ''; // Clear input
}

function handleReleaseData() {
    if (!chatUser || !chatProf || !userChatElements.messagesContainer) {
        console.error("Cannot release data: chat session or elements not properly initialized.");
        return;
    }
    const profFirstName = getFirstName(chatProf.nome);

    const professionalDataHtml = `Dados do Profissional ${profFirstName}:<br>` +
                             `Nome Completo: ${chatProf.nome}<br>` +
                             `Telefone: ${chatProf.telefone}<br>` +
                             `Cidade: ${chatProf.cidade}<br>` +
                             `Especialidade: ${chatProf.especialidade}<br>` +
                             `Registro Profissional: ${chatProf.registro} ` +
                             `<a href="https://www.portalcoren-rs.gov.br/index.php?categoria=servicos&pagina=consulta-profissional" target="_blank" title="Consultar no Coren/RS" class="coren-link">` +
                             `<span class="material-symbols-outlined coren-icon">open_in_new</span>` +
                             `</a>`;

    // Display in User's panel as a special "received" message or "data-shared" message
    // The sender is implicitly the professional.
    appendMessage(userChatElements.messagesContainer, professionalDataHtml, chatProf.nome, 'received', true);
    
    // Optionally, send a confirmation in the professional's chat
    appendMessage(profChatElements.messagesContainer, "Seus dados foram compartilhados com o usuário.", "Sistema", 'sent');

    // Disable the button after data is released to prevent multiple releases in the same session
    if (profChatElements.releaseDataButton) {
        profChatElements.releaseDataButton.disabled = true;
        profChatElements.releaseDataButton.textContent = 'Dados Liberados';
    }
}