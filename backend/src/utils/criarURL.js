const criarURL = (nomeEstabelecimento, thereEst) => {
    let url;
    if(thereEst){
        randomCode = generateRandomString(5);
        url =  nomeEstabelecimento.replace(/\s/g, '-') + "-" + randomCode;
    } else{
        url =  nomeEstabelecimento.replace(/\s/g, '-');
    }

    return url
}

function generateRandomString(length) {
    if (length < 3) {
        throw new Error('O comprimento deve ser pelo menos 3 para incluir 3 números.');
    }

    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    // Primeiro, adicione pelo menos 3 números
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * 10) + 26; // Começa a partir do índice 26 (onde os números começam)
        result += characters.charAt(randomIndex);
    }

    // Em seguida, preencha o restante dos caracteres
    for (let i = 3; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}


module.exports = {
    criarURL
}