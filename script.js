function verificarCaracteres() {
    const caracteres = document.getElementById('characters').value;
    let texto = document.getElementById('text').value;
    const caracteresParaRemover = document.getElementById('remover').value;
    const ignoreCase = document.getElementById('ignoreCase').checked;

    // Remove caracteres indesejados do texto
    for (let char of caracteresParaRemover) {
        const regex = new RegExp(char, 'g');
        texto = texto.replace(regex, '');
    }

    // Atualiza o campo de texto com o texto filtrado
    document.getElementById('text').value = texto;

    // Chama a função para verificar caracteres após remover os não desejados
    exibirResultados(caracteres, texto, ignoreCase);
}

function exibirResultados(caracteres, texto, ignoreCase) {
    let presentes = [];
    let extra = new Set();
    let contagemCaracteres = {};

    // Verifica caracteres presentes e extras no texto
    for (let char of caracteres) {
        const regex = ignoreCase ? new RegExp(char, 'gi') : new RegExp(char, 'g');
        if (texto.match(regex)) {
            presentes.push(char);
        } else {
            extra.add(char);
        }
    }

    // Conta caracteres repetidos no texto
    for (let char of texto) {
        if (ignoreCase) {
            char = char.toLowerCase();
        }
        if (contagemCaracteres[char]) {
            contagemCaracteres[char]++;
        } else {
            contagemCaracteres[char] = 1;
        }
    }

    // Filtra apenas os caracteres repetidos
    let repetidos = Object.entries(contagemCaracteres).filter(([char, count]) => count > 1);

    // Calcula a porcentagem de caracteres que você conhece
    const presentesCount = presentes.length;
    const extraCount = extra.size;
    const totalCaracteres = presentesCount + extraCount;
    const porcentagem = totalCaracteres === 0 ? 0 : ((presentesCount / totalCaracteres) * 100).toFixed(2);

    // Exibe o resultado na página
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `
        <p><strong>Caracteres existentes no texto (${presentesCount}):</strong> ${presentes.join(', ')}</p>
        <p><strong>Caracteres não existentes (${extraCount}):</strong> ${Array.from(extra).join(', ')}</p>
        <p><strong>Porcentagem de caracteres: </strong> ${porcentagem}%</p>
        <p><strong>Total de caracteres no texto:</strong> ${texto.length}</p>
    `;

    // Exibe os caracteres repetidos na página
    const caracteresRepetidos = document.getElementById('caracteresRepetidos');
    caracteresRepetidos.innerHTML = `
        <h2>Caracteres Repetidos</h2>
        ${repetidos.map(([char, count]) => `<p>${char}: ${count} vezes</p>`).join('')}
    `;
}
