let usuarios = [];
let usuarioLogado = null;

let profissionais = [];
let profissionalLogado = null;

export function initializeAuth() {
    usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    profissionais = JSON.parse(localStorage.getItem('profissionais') || '[]');

    const storedProfissionalLogado = localStorage.getItem('logado');
    if (storedProfissionalLogado) {
        profissionalLogado = JSON.parse(storedProfissionalLogado);
    }

    const storedUsuarioLogado = localStorage.getItem('usuarioLogado');
    if (storedUsuarioLogado) {
        usuarioLogado = JSON.parse(storedUsuarioLogado);
    }
}

export function getProfissionais() {
    return [...profissionais];
}

export function getUsuarios() {
    return [...usuarios];
}

export function getProfissionalLogado() {
    return profissionalLogado ? { ...profissionalLogado } : null;
}

export function getUsuarioLogado() {
    return usuarioLogado ? { ...usuarioLogado } : null;
}

export function setProfissionalLogado(profissional) {
    profissionalLogado = profissional;
}

export function setUsuarioLogado(usuario) {
    usuarioLogado = usuario;
}

export function loginProfissional(email, senha) {
    const profissional = profissionais.find(p => p.email === email && p.senha === senha);
    if (profissional) {
        localStorage.setItem('logado', JSON.stringify(profissional));
        profissionalLogado = profissional;
        return { ...profissional };
    }
    return null;
}

export function registerProfissional(data) {
    const novoProfissional = {
        id: Date.now(),
        ...data
    };
    profissionais.push(novoProfissional);
    localStorage.setItem('profissionais', JSON.stringify(profissionais));
    return { ...novoProfissional };
}

export function logoutProfissional() {
    localStorage.removeItem('logado');
    profissionalLogado = null;
}

export function deleteProfissionalAccount() {
    if (!profissionalLogado) return;
    profissionais = profissionais.filter(p => p.id !== profissionalLogado.id);
    localStorage.setItem('profissionais', JSON.stringify(profissionais));
    logoutProfissional();
}

export function updateProfissionalData(data) {
    if (!profissionalLogado) return null;

    const index = profissionais.findIndex(p => p.id === profissionalLogado.id);
    if (index === -1) return null;

    profissionais[index] = {
        ...profissionais[index],
        ...data
    };
    profissionalLogado = { ...profissionais[index] };

    localStorage.setItem('profissionais', JSON.stringify(profissionais));
    localStorage.setItem('logado', JSON.stringify(profissionalLogado));
    return { ...profissionalLogado };
}

export function loginUsuario(email, senha) {
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    if (usuario) {
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        usuarioLogado = usuario;
        return { ...usuario };
    }
    return null;
}

export function registerUsuario(data) {
    const novoUsuario = {
        id: Date.now(),
        ...data
    };
    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    return { ...novoUsuario };
}

export function logoutUsuario() {
    localStorage.removeItem('usuarioLogado');
    usuarioLogado = null;
}