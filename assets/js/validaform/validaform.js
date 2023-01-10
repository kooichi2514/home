class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario');
        this.eventos();
    }

    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const camposValidos = this.camposSaoValidos();
        const senhasValidas = this.senhasSaoValidas();
    }

    senhasSaoValidas() {
        let valido = true;
        const senha = this.formulario.querySelector('.senha');
        const repetirSenha = this.formulario.querySelector('.repetir-senha');

        if(senha.value !== repetirSenha.value) {
            valido = false;
            this.criaErro(senha, 'Campos senha e repetir senha precisam ser iguais.');
            this.criaErro(repetirSenha, 'Campos senha e repetir senha precisam ser iguais.');
        }
        if(senha.value.length < 6 || senha.value.length > 12) {
            valido = false;
            this.criaErro(senha, 'Senha precisa ter entre 6 e 12 caracteres');
        }
        return valido;
    }

    camposSaoValidos() {
        let valido = true;

        for(let errorText of this.formulario.querySelectorAll('.error-txt')) {
            errorText.remove();
        }

        for(let campo of this.formulario.querySelectorAll('.validar')) {
            const label = campo.previousElementSibling.innerText;
            if(!campo.value) {
                this.criaErro(campo, `Campo "${label}" não pode estar em branco.`);
                valido = false;
            }

            if(campo.classList.contains('cpf')) {
                if(!this.validaCPF(campo)) valido = false;
            }
            if(campo.classList.contains('usuario')) {
                if(!this.validaUsuario(campo)) valido = false;
            }
        }

        return valido;
    }

    validaUsuario(campo) {
        const usuario = campo.value;
        let valido = true;
        if(usuario.length < 3 || usuario.length > 12) {
            this.criaErro(campo, 'Usuário deverá ter entre 3 e 12 caracteres');
            valido = false;
        }
        if(!usuario.match(/^[a-zA-Z0-9]+$/g)) {
            this.criaErro(campo, 'Usuário só poderá conter letras e/ou números');
            valido = false;
        };
        return valido;
    }
    validaCPF(campo) {
        const cpf = new ValidaCPF(campo.value);
        
        if(!cpf.valida()) {
            this.criaErro(campo, 'CPF Inválido.');
            return false;
        }
        return true;
    }

    criaErro(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-txt');
        campo.insertAdjacentElement('afterend', div);
    }
}

const valida = new ValidaFormulario();