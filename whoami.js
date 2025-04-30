document.addEventListener('DOMContentLoaded', function() {
    // Função para criar o efeito de digitação
    function typeWriter(textElement, text, i, speed) {
        if (i < text.length) {
            textElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(function() {
                typeWriter(textElement, text, i, speed);
            }, speed);
        } else if (textElement.id === 'text1') {
            // Quando terminar o primeiro texto, inicia o segundo
            setTimeout(function() {
                const terminalText2 = document.getElementById('terminal-text2');
                terminalText2.style.visibility = 'visible';
                
                const text2Element = document.getElementById('text2');
                const text2Content = text2Element.textContent;
                text2Element.textContent = '';
                typeWriter(text2Element, text2Content, 0, 30);
            }, 500);
        }
    }

    // Inicia o efeito de digitação para o primeiro texto
    const text1Element = document.getElementById('text1');
    const text1Content = text1Element.textContent;
    text1Element.textContent = '';
    
    // Pequeno atraso para iniciar o efeito após a página carregar
    setTimeout(function() {
        typeWriter(text1Element, text1Content, 0, 50);
    }, 1000);
});