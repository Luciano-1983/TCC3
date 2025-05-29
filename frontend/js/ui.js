let domElements = {};

// Store all DOM element getters in one place for easy access and management.
export function getDomElements() {
    if (Object.keys(domElements).length === 0) { // Initialize only once
        domElements = {
            // Screens and Sections
            initialScreen: document.getElementById('initial-screen'),
            profissionalLoginSection: document.getElementById('profissional-login'),
            registerProfissionalFormSection: document.getElementById('profissional-register-form'),
            profissionalDashboardSection: document.getElementById('profissional-dashboard'),
            editarProfissionalFormSection: document.getElementById('editar-profissional-form'),
            usuarioBuscaSection: document.getElementById('usuario-busca'),
            resultadosBuscaSection: document.getElementById('resultados-busca'),
            usuarioLoginSection: document.getElementById('usuario-login'),
            usuarioRegisterFormSection: document.getElementById('usuario-register-form'),
            
            // Navigation Buttons
            souProfissionalNavButton: document.getElementById('sou-profissional-nav'),
            buscoProfissionalNavButton: document.getElementById('busco-profissional-nav'),
            voltarInicialNavButton: document.getElementById('voltar-inicial-nav'),

            // Initial Screen Buttons
            souProfissionalButton: document.getElementById('sou-profissional'),
            buscoProfissionalButton: document.getElementById('busco-profissional'),

            // Professional Login Form
            profissionalLoginForm: document.getElementById('profissional-login-form'),
            profissionalLoginEmailInput: document.getElementById('profissional-login-email'),
            profissionalLoginPasswordInput: document.getElementById('profissional-login-password'),
            profissionalRegisterButton: document.getElementById('profissional-register'),
            voltarInicialProfissionalLoginButton: document.getElementById('voltar-inicial-profissional-login'),

            // Professional Register Form
            registerProfissionalForm: document.getElementById('register-profissional-form'),
            profissionalNomeInput: document.getElementById('profissional-nome'),
            profissionalTelefoneInput: document.getElementById('profissional-telefone'),
            profissionalEmailInput: document.getElementById('profissional-email'),
            profissionalCidadeInput: document.getElementById('profissional-cidade'),
            profissionalEspecialidadeSelect: document.getElementById('profissional-especialidade'),
            profissionalRegistroInput: document.getElementById('profissional-registro'),
            profissionalSenhaInput: document.getElementById('profissional-senha'),
            voltarLoginButton: document.getElementById('voltar-login'),
            profissionalRegistroLabel: document.getElementById('profissional-registro-label'),

            // Professional Dashboard
            profissionalNomeExibicao: document.getElementById('profissional-nome-exibicao'),
            profissionalNomeValor: document.getElementById('profissional-nome-valor'),
            profissionalTelefoneValor: document.getElementById('profissional-telefone-valor'),
            profissionalCidadeValor: document.getElementById('profissional-cidade-valor'),
            profissionalEspecialidadeValor: document.getElementById('profissional-especialidade-valor'),
            profissionalRegistroValor: document.getElementById('profissional-registro-valor'),
            editarDadosButton: document.getElementById('editar-dados'),
            logoutProfissionalButton: document.getElementById('logout-profissional'),
            excluirCadastroButton: document.getElementById('excluir-cadastro'),

            // Edit Professional Form
            editarRegisterProfissionalForm: document.getElementById('editar-register-profissional-form'),
            editarProfissionalNomeInput: document.getElementById('editar-profissional-nome'),
            editarProfissionalTelefoneInput: document.getElementById('editar-profissional-telefone'),
            editarProfissionalCidadeInput: document.getElementById('editar-profissional-cidade'),
            editarProfissionalEspecialidadeSelect: document.getElementById('editar-profissional-especialidade'),
            editarProfissionalRegistroInput: document.getElementById('editar-profissional-registro'),
            editarProfissionalRegistroLabel: document.getElementById('editar-profissional-registro-label'),
            cancelarEdicaoButton: document.getElementById('cancelar-edicao'),

            // User Search
            buscaProfissionalForm: document.getElementById('busca-profissional-form'),
            buscaEspecialidadeSelect: document.getElementById('busca-especialidade'),
            buscaCidadeInput: document.getElementById('busca-cidade'),
            voltarInicialBuscaButton: document.getElementById('voltar-inicial-busca'),
            listaProfissionais: document.getElementById('lista-profissionais'),

            // User Login Form
            usuarioLoginForm: document.getElementById('usuario-login-form'),
            usuarioLoginEmailInput: document.getElementById('usuario-login-email'),
            usuarioLoginPasswordInput: document.getElementById('usuario-login-password'),
            usuarioRegisterButton: document.getElementById('usuario-register'),
            voltarInicialUsuarioLoginButton: document.getElementById('voltar-inicial-usuario-login'),

            // User Register Form
            registerUsuarioForm: document.getElementById('register-usuario-form'),
            usuarioNomeInput: document.getElementById('usuario-nome'),
            usuarioEmailInput: document.getElementById('usuario-email'),
            usuarioSenhaInput: document.getElementById('usuario-senha'),
            voltarLoginUsuarioButton: document.getElementById('voltar-login-usuario'),

            // Chat Panel for User
            userChatPanel: {
                panel: document.getElementById('user-chat-panel'),
                header: document.getElementById('user-chat-header'),
                recipientName: document.getElementById('user-chat-recipient-name'),
                messagesContainer: document.getElementById('user-chat-messages'),
                messageInput: document.getElementById('user-chat-message-input'),
                sendMessageButton: document.getElementById('user-chat-send-button'),
                closeButton: document.getElementById('user-chat-close-button'),
                inputArea: document.getElementById('user-chat-input-area'), // Added for completeness
            },
            // Chat Panel for Professional (Simulated)
            professionalChatPanel: {
                panel: document.getElementById('professional-chat-panel'),
                header: document.getElementById('professional-chat-header'),
                recipientName: document.getElementById('professional-chat-recipient-name'),
                messagesContainer: document.getElementById('professional-chat-messages'),
                messageInput: document.getElementById('professional-chat-message-input'),
                sendMessageButton: document.getElementById('professional-chat-send-button'),
                closeButton: document.getElementById('professional-chat-close-button'),
                inputArea: document.getElementById('professional-chat-input-area'), // Added for completeness
                releaseDataButton: document.getElementById('professional-release-data-button') // Added new button
            }
        };
    }
    return domElements;
}


let navButtons = [];

export function initializeUI() {
    // Ensure DOM elements are loaded
    getDomElements();
    navButtons = [domElements.voltarInicialNavButton, domElements.souProfissionalNavButton, domElements.buscoProfissionalNavButton];
}

export function setActiveNavButton(currentSection) {
    if (!domElements || Object.keys(domElements).length === 0) {
        console.error("DOM elements not initialized in UI module.");
        return;
    }
    navButtons.forEach(button => button.classList.remove('active'));

    if (currentSection === domElements.initialScreen) {
        domElements.voltarInicialNavButton.classList.add('active');
    } else if (
        currentSection === domElements.profissionalLoginSection ||
        currentSection === domElements.registerProfissionalFormSection ||
        currentSection === domElements.profissionalDashboardSection ||
        currentSection === domElements.editarProfissionalFormSection
    ) {
        domElements.souProfissionalNavButton.classList.add('active');
    } else if (
        currentSection === domElements.usuarioLoginSection ||
        currentSection === domElements.usuarioRegisterFormSection ||
        currentSection === domElements.usuarioBuscaSection
    ) {
        domElements.buscoProfissionalNavButton.classList.add('active');
    }
}

export function showSection(section) {
    if (!section) {
        console.error("Attempted to show an undefined section.");
        return;
    }
    document.querySelectorAll('main > section').forEach(sec => sec.classList.add('hidden'));
    section.classList.remove('hidden');
    setActiveNavButton(section);
}

export function updateDashboardView(profissional) {
    if (!profissional || !domElements.profissionalNomeExibicao) { // Check if DOM elements are ready
        console.warn("Dashboard elements not ready or profissional data missing for updateDashboardView");
        return;
    }
    domElements.profissionalNomeExibicao.textContent = profissional.nome;
    domElements.profissionalNomeValor.textContent = profissional.nome;
    domElements.profissionalTelefoneValor.textContent = profissional.telefone;
    domElements.profissionalCidadeValor.textContent = profissional.cidade;
    domElements.profissionalEspecialidadeValor.textContent = profissional.especialidade;
    domElements.profissionalRegistroValor.textContent = profissional.registro;
}

export function displaySearchResults(resultados, onChatOpenCallback) {
    domElements.listaProfissionais.innerHTML = ''; // Limpa resultados anteriores
    if (resultados.length > 0) {
        resultados.forEach(profissional => {
            const li = document.createElement('li');
            
            const infoDiv = document.createElement('div');
            infoDiv.classList.add('professional-info');

            const nameSpan = document.createElement('span');
            nameSpan.classList.add('professional-name');
            nameSpan.textContent = profissional.nome;
            infoDiv.appendChild(nameSpan);

            const specialtySpan = document.createElement('span');
            specialtySpan.classList.add('professional-specialty');
            specialtySpan.textContent = `Especialidade: ${profissional.especialidade}`;
            infoDiv.appendChild(specialtySpan);

            const citySpan = document.createElement('span');
            citySpan.classList.add('professional-city');
            citySpan.textContent = `Cidade: ${profissional.cidade}`;
            infoDiv.appendChild(citySpan);
            
            li.appendChild(infoDiv);
            
            const chatButton = document.createElement('button');
            chatButton.classList.add('contact-chat-button');
            
            const chatIcon = document.createElement('span');
            chatIcon.classList.add('material-symbols-outlined');
            chatIcon.textContent = 'chat';
            chatButton.appendChild(chatIcon);

            const chatText = document.createTextNode(' Chat'); // Add space for separation
            chatButton.appendChild(chatText);
            
            chatButton.addEventListener('click', () => onChatOpenCallback(profissional));
            li.appendChild(chatButton);
            
            domElements.listaProfissionais.appendChild(li);
        });
    } else {
        const p = document.createElement('p');
        p.textContent = 'Nenhum profissional encontrado com os critérios de busca.';
        domElements.listaProfissionais.appendChild(p);
    }
    domElements.resultadosBuscaSection.classList.remove('hidden');
}