// Função para exibir o texto com efeito de digitação
function mostrarTextoComEfeito(texto, elemento) {
    let i = 0;
    elemento.value = '';
    const intervalo = setInterval(function() {
        elemento.value += texto.charAt(i);
        i++;
        if (i > texto.length - 1) {
            clearInterval(intervalo);
        }
    }, 50); // Ajuste o intervalo para mais lento ou mais rápido
}

// Função para criptografar o texto
function criptografarTexto(texto) {
    return texto
        .replace(/e/g, 'enter')
        .replace(/i/g, 'imes')
        .replace(/a/g, 'ai')
        .replace(/o/g, 'ober')
        .replace(/u/g, 'ufat');
}

// Função para descriptografar o texto
function descriptografarTexto(texto) {
    return texto
        .replace(/enter/g, 'e')
        .replace(/imes/g, 'i')
        .replace(/ai/g, 'a')
        .replace(/ober/g, 'o')
        .replace(/ufat/g, 'u');
}

// Função para manipular os botões e exibir o resultado
document.addEventListener('DOMContentLoaded', function() {
    // Botão de criptografar
    document.getElementById('btnEncrypt').onclick = function() {
        let texto = document.getElementById('inputText').value;
        if (validarTexto(texto)) {
            let textoCriptografado = criptografarTexto(texto);
            mostrarTextoComEfeito(textoCriptografado, document.getElementById('outputText'));
            document.getElementById('error-message').style.display = 'none';
        } else {
            document.getElementById('error-message').style.display = 'block';
            document.getElementById('outputText').value = '';
        }
    };

    // Botão de descriptografar
    document.getElementById('btnDecrypt').onclick = function() {
        let texto = document.getElementById('inputText').value;
        if (validarTexto(texto)) {
            let textoDescriptografado = descriptografarTexto(texto);
            mostrarTextoComEfeito(textoDescriptografado, document.getElementById('outputText'));
            document.getElementById('error-message').style.display = 'none';
        } else {
            document.getElementById('error-message').style.display = 'block';
            document.getElementById('outputText').value = '';
        }
    };

    // Botão de colar
    document.getElementById('btnPaste').onclick = function() {
        navigator.clipboard.readText().then(function(textoCopiado) {
            document.getElementById('inputText').value = textoCopiado;
        }).catch(function(err) {
            console.error('Erro ao colar o texto:', err);
            alert('Erro ao colar o texto. Certifique-se de que o texto foi copiado corretamente.');
        });
    };

    // Função para validar o texto
    function validarTexto(texto) {
        let regex = /^[a-z\s]*$/; // Permite apenas letras minúsculas e espaços
        return regex.test(texto);
    }

    // Função para copiar o texto criptografado ou descriptografado
    document.getElementById('btnCopy').onclick = function() {
        let texto = document.getElementById('outputText').value;
        if (texto.trim() === '') {
            alert('Não há nada a copiar');
        } else {
            navigator.clipboard.writeText(texto).then(function() {
                let btnCopy = document.getElementById('btnCopy');
                let originalText = btnCopy.value;
                btnCopy.value = 'Copiado!';
                setTimeout(function() {
                    btnCopy.value = originalText;
                }, 2000); // Retorna ao texto original após 2 segundos
            }).catch(function(err) {
                console.error('Erro ao copiar texto:', err);
            });
        }
    };

    // Evento do botão de limpar campos
    document.getElementById('btnClear').onclick = function() {
        document.getElementById('inputText').value = '';
        document.getElementById('outputText').value = '';
        document.getElementById('error-message').style.display = 'none';
    };
});
