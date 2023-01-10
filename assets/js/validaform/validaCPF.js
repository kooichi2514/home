class ValidaCPF {
    constructor(cpfEnviado) {
        Object.defineProperty(this, 'cpfLimpo', {
            writable: false,
            enumerable: false,
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, ''),
        });
    }

    éSequencia() {
        return this.cpfLimpo.charAt(0).repeat(this.cpfLimpo.length) === this.cpfLimpo;
    }

    static geraDigito(cpfSemDigitos) {
        const cpfArray = Array.from(cpfSemDigitos);
        let revers = cpfArray.length + 1;
        const total = cpfArray.reduce((ac, val) => {
            ac += revers * Number(val);
            revers --;
            return ac;
        }, 0);
        const digito = 11 - (total % 11);
        return digito <= 9 ? String(digito) : '0';
    }

    geraNovoCPF() {
        const cpfSemDigitos = this.cpfLimpo.slice(0, -2)
        const digito1 = ValidaCPF.geraDigito(cpfSemDigitos);
        const digito2 = ValidaCPF.geraDigito(cpfSemDigitos + digito1);
        this.novoCpf = cpfSemDigitos + digito1 + digito2;
    }

    valida() {
        if(!this.cpfLimpo) return false;
        if(typeof this.cpfLimpo != 'string') return false;
        if(this.cpfLimpo.length != 11) return false;
        if(this.éSequencia()) return false;
        this.geraNovoCPF();
        return this.novoCpf === this.cpfLimpo;
    }

}

// const validacpf = new ValidaCPF('336.987.488-19');
// // const validacpf = new ValidaCPF('111.111.111-11');
// console.log(validacpf.valida());
// console.log(validacpf)