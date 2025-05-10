import {
  initializeAuth,
  getProfissionalLogado,
  getUsuarioLogado,
  loginProfissional,
  registerProfissional,
  logoutProfissional,
  deleteProfissionalAccount,
  updateProfissionalData,
  loginUsuario,
  registerUsuario,
  getProfissionais,
  getUsuarios,
  setProfissionalLogado,
  setUsuarioLogado
} from 'app/auth';

import {
  initializeUI,
  showSection,
  updateDashboardView,
  displaySearchResults,
  getDomElements,
  setActiveNavButton
} from 'app/ui';

import {
  initializeChat,
  openChatSession
} from 'app/chat';

document.addEventListener('DOMContentLoaded', () => {
  const domElements = getDomElements();
  initializeAuth();
  initializeUI();
  initializeChat(domElements.userChatPanel, domElements.professionalChatPanel);

  // Helper function to toggle visibility and requirement of professional registration field
  function toggleRegistroField(selectElement, labelElement, inputElement) {
    if (!selectElement || !labelElement || !inputElement) {
        console.warn("Missing elements for toggleRegistroField");
        return;
    }
    const selectedEspecialidade = selectElement.value;
    if (selectedEspecialidade === 'Cuidador') {
      labelElement.style.display = 'none';
      inputElement.style.display = 'none';
      inputElement.required = false;
      inputElement.value = ''; // Clear value when hidden
    } else {
      labelElement.style.display = 'block';
      inputElement.style.display = 'block';
      inputElement.required = true;
    }
  }

  // Setup for Professional Registration Form
  if (domElements.profissionalEspecialidadeSelect && domElements.profissionalRegistroLabel && domElements.profissionalRegistroInput) {
    domElements.profissionalEspecialidadeSelect.addEventListener('change', () => {
      toggleRegistroField(
        domElements.profissionalEspecialidadeSelect,
        domElements.profissionalRegistroLabel,
        domElements.profissionalRegistroInput
      );
    });
    // Initial check for registration form
    toggleRegistroField(
      domElements.profissionalEspecialidadeSelect,
      domElements.profissionalRegistroLabel,
      domElements.profissionalRegistroInput
    );
  }

  const initialProfissionalLogado = getProfissionalLogado();
  if (initialProfissionalLogado) {
    updateDashboardView(initialProfissionalLogado);
    showSection(domElements.profissionalDashboardSection);
  }

  const initialUsuarioLogado = getUsuarioLogado();
  if (initialUsuarioLogado) {
    showSection(domElements.usuarioBuscaSection);
  }

  if (!initialProfissionalLogado && !initialUsuarioLogado) {
    if (!domElements.initialScreen.classList.contains('hidden')) {
      setActiveNavButton(domElements.initialScreen);
    }
  } else if (initialUsuarioLogado && domElements.usuarioBuscaSection && !domElements.usuarioBuscaSection.classList.contains('hidden')) {
    setActiveNavButton(domElements.usuarioBuscaSection);
  } else if (initialProfissionalLogado && domElements.profissionalDashboardSection && !domElements.profissionalDashboardSection.classList.contains('hidden')) {
     setActiveNavButton(domElements.profissionalDashboardSection);
  }

  domElements.souProfissionalButton.addEventListener('click', () => {
    showSection(domElements.profissionalLoginSection);
  });

  domElements.buscoProfissionalButton.addEventListener('click', () => {
    // Always show the user login section first as per new requirement
    showSection(domElements.usuarioLoginSection);
  });

  domElements.souProfissionalNavButton.addEventListener('click', () => {
     const profLogado = getProfissionalLogado();
     if (profLogado) {
        updateDashboardView(profLogado);
        showSection(domElements.profissionalDashboardSection);
     } else {
        showSection(domElements.profissionalLoginSection);
     }
  });

  domElements.buscoProfissionalNavButton.addEventListener('click', () => {
    // Always show the user login section first as per new requirement
    showSection(domElements.usuarioLoginSection);
  });

  domElements.voltarInicialNavButton.addEventListener('click', () => {
    showSection(domElements.initialScreen);
  });

  domElements.profissionalRegisterButton.addEventListener('click', () => {
    showSection(domElements.registerProfissionalFormSection);
  });

  domElements.voltarInicialProfissionalLoginButton.addEventListener('click', () => {
    showSection(domElements.initialScreen);
  });

  domElements.profissionalLoginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = domElements.profissionalLoginEmailInput.value;
    const senha = domElements.profissionalLoginPasswordInput.value;
    const profissional = loginProfissional(email, senha);

    if (profissional) {
      updateDashboardView(profissional);
      showSection(domElements.profissionalDashboardSection);
    } else {
      alert('Credenciais inválidas.');
    }
  });

  domElements.voltarLoginButton.addEventListener('click', () => {
    showSection(domElements.profissionalLoginSection);
  });

  domElements.registerProfissionalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nome = domElements.profissionalNomeInput.value;
    const telefone = domElements.profissionalTelefoneInput.value;
    const email = domElements.profissionalEmailInput.value;
    const cidade = domElements.profissionalCidadeInput.value;
    const especialidade = domElements.profissionalEspecialidadeSelect.value;
    const registro = domElements.profissionalRegistroInput.value;
    const senha = domElements.profissionalSenhaInput.value;

    registerProfissional({ nome, telefone, email, cidade, especialidade, registro, senha });
    alert('Cadastro realizado com sucesso!');
    domElements.profissionalLoginForm.reset();
    domElements.registerProfissionalForm.reset();
    showSection(domElements.profissionalLoginSection);
  });

  domElements.editarDadosButton.addEventListener('click', () => {
    const profissional = getProfissionalLogado();
    if (profissional) {
      domElements.editarProfissionalNomeInput.value = profissional.nome;
      domElements.editarProfissionalTelefoneInput.value = profissional.telefone;
      domElements.editarProfissionalCidadeInput.value = profissional.cidade;
      domElements.editarProfissionalEspecialidadeSelect.value = profissional.especialidade;
      domElements.editarProfissionalRegistroInput.value = profissional.registro;
      
      // Setup for Edit Professional Form's registration field visibility
      if (domElements.editarProfissionalEspecialidadeSelect && domElements.editarProfissionalRegistroLabel && domElements.editarProfissionalRegistroInput) {
        toggleRegistroField(
          domElements.editarProfissionalEspecialidadeSelect,
          domElements.editarProfissionalRegistroLabel,
          domElements.editarProfissionalRegistroInput
        );
        // Ensure event listener is attached if not already, or re-attach if section is recreated (though not in this app structure)
        // For simplicity, we can assume it's attached once and remains.
        // If we were detaching/re-attaching listeners dynamically, this would be more complex.
        // Let's add it here to be safe, idempotent if already added outside.
        // A more robust way would be to manage listeners more centrally or ensure they are only added once.
        // However, addEventListener is idempotent for same function reference.
        if (!domElements.editarProfissionalEspecialidadeSelect.dataset.listenerAttached) {
             domElements.editarProfissionalEspecialidadeSelect.addEventListener('change', () => {
                toggleRegistroField(
                    domElements.editarProfissionalEspecialidadeSelect,
                    domElements.editarProfissionalRegistroLabel,
                    domElements.editarProfissionalRegistroInput
                );
            });
            domElements.editarProfissionalEspecialidadeSelect.dataset.listenerAttached = 'true';
        }
      }
      showSection(domElements.editarProfissionalFormSection);
    }
  });

  domElements.logoutProfissionalButton.addEventListener('click', () => {
    logoutProfissional();
    showSection(domElements.initialScreen);
  });

  domElements.excluirCadastroButton.addEventListener('click', () => {
    if (confirm('Tem certeza que deseja excluir seu cadastro? Esta ação não poderá ser desfeita.')) {
      deleteProfissionalAccount();
      showSection(domElements.initialScreen);
    }
  });

  domElements.cancelarEdicaoButton.addEventListener('click', () => {
    const profissional = getProfissionalLogado();
    if (profissional) {
      updateDashboardView(profissional); 
      showSection(domElements.profissionalDashboardSection); 
    }
  });

  domElements.editarRegisterProfissionalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const profissional = getProfissionalLogado();
    if (profissional) {
      const updatedData = {
        nome: domElements.editarProfissionalNomeInput.value,
        telefone: domElements.editarProfissionalTelefoneInput.value,
        cidade: domElements.editarProfissionalCidadeInput.value,
        especialidade: domElements.editarProfissionalEspecialidadeSelect.value,
        registro: domElements.editarProfissionalRegistroInput.value,
      };
      const updatedProfissional = updateProfissionalData(updatedData);
      if (updatedProfissional) {
        updateDashboardView(updatedProfissional);
        showSection(domElements.profissionalDashboardSection);
      }
    }
  });

  domElements.voltarInicialBuscaButton.addEventListener('click', () => {
    showSection(domElements.initialScreen);
  });

  domElements.buscaProfissionalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const especialidade = domElements.buscaEspecialidadeSelect.value;
    const cidade = domElements.buscaCidadeInput.value;
    const todosProfissionais = getProfissionais();

    const resultados = todosProfissionais.filter(profissional => {
      const especialidadeMatch = !especialidade || profissional.especialidade === especialidade;
      const cidadeMatch = !cidade || profissional.cidade.toLowerCase().includes(cidade.toLowerCase());
      return especialidadeMatch && cidadeMatch;
    });

    displaySearchResults(resultados, (profissionalSelecionado) => {
        const usuarioAtual = getUsuarioLogado();
        if (usuarioAtual) {
            openChatSession(usuarioAtual, profissionalSelecionado);
        } else {
            alert("Você precisa estar logado para iniciar um chat.");
            showSection(domElements.usuarioLoginSection); 
        }
    });
  });

  domElements.usuarioRegisterButton.addEventListener('click', () => {
    showSection(domElements.usuarioRegisterFormSection);
  });

  domElements.voltarInicialUsuarioLoginButton.addEventListener('click', () => {
    showSection(domElements.initialScreen);
  });

  domElements.usuarioLoginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = domElements.usuarioLoginEmailInput.value;
    const senha = domElements.usuarioLoginPasswordInput.value;
    const usuario = loginUsuario(email, senha);

    if (usuario) {
      showSection(domElements.usuarioBuscaSection);
    } else {
      alert('Credenciais inválidas.');
    }
  });

  domElements.voltarLoginUsuarioButton.addEventListener('click', () => {
    showSection(domElements.usuarioLoginSection);
  });

  domElements.registerUsuarioForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nome = domElements.usuarioNomeInput.value;
    const email = domElements.usuarioEmailInput.value;
    const senha = domElements.usuarioSenhaInput.value;

    registerUsuario({ nome, email, senha });
    alert('Cadastro realizado com sucesso!');
    domElements.usuarioLoginForm.reset();
    domElements.registerUsuarioForm.reset();
    showSection(domElements.usuarioLoginSection);
  });
});