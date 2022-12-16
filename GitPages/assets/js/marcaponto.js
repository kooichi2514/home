function visualPart() {
    const h2 = document.querySelector('.container h2');
    const h1 = document.querySelector('.container h1');

    const nowDate = new Date();
    const opcoes = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    setDate(nowDate);

    function createDate() {
        const dateNow = new Date();
        return dateNow;
    }

    function setDate(date) {
        const brDate = date.toLocaleDateString('pt-BR', opcoes);
        if (brDate != h2.innerHTML) {
            h2.innerHTML = brDate;
        }

        const nowHour = date.toLocaleTimeString('pt-BR');
        h1.innerHTML = nowHour;
    }

    function renewDate() {
        setInterval(function() {
            date = createDate();
            setDate(date);
        }, 1000);
    }

    renewDate();
}
visualPart();

const checkInList = {};
const workedHours = {};
const inputCode= document.querySelector('.input-code');
const btnCode = document.querySelector('.btn-code');

function hasCheckedIn(employeeCode) {
    if (Object.keys(checkInList).length !== undefined) {
        if (employeeCode.value in checkInList) return true;
        return false;
        // for (let employee of checkInList) {
        //     for (let key of Object.keys(employee)) {
        //         if (employeeCode.value == key) return true;
        //         return false;
        //     }
        // }
    }
    return false;
}

function logEmployee(employeeCode) {
            if (hasCheckedIn(employeeCode)) {
                if (window.confirm('Deseja realmente marcar o ponto de saída?')) {
                    const checkOutTime = Date.now();
                    saveHours(employeeCode, checkOutTime);
                }
            } else {
                Object.assign(checkInList, {[employeeCode.value]: Date.now()});
            }
    }


    //have to prevent value replacement on 'workedHours'
function saveHours(employeeCode, checkOutTime) {
    Object.assign(workedHours, {[employeeCode.value]: `${checkInList[employeeCode.value]}, ${checkOutTime}`});
    delete checkInList[employeeCode.value];
}

btnCode.addEventListener('click', function() {
    if (!inputCode.value) return;
    logEmployee(inputCode); 
});




