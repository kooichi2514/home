function cliqueBotoes(){
    document.addEventListener('click', e => {
        const el = e.target;

        if (el.classList.contains('btn-imc')) {
            window.location.href = "./CalcIMC.html";
        }

        if (el.classList.contains('btn-timer')) {
            window.location.href = "./timer.html";
        }

        if (el.classList.contains('btn-lista')) {
            window.location.href = "./listadetarefas.html";
        }

        if (el.classList.contains('btn-calc')) {
            window.location.href = "./Calculadora.html";
        }

        if (el.classList.contains('btn-projetin')) {
            window.location.href = "./MarcaPonto.html";
        }
    })
}

cliqueBotoes();