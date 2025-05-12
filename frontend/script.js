document.addEventListener('DOMContentLoaded', () => {
    console.log('Aplicação carregada com sucesso!');

    const canvas = document.getElementById('partituraCanvas');
    const ctx = canvas.getContext('2d');
    const feedback = document.getElementById('feedback');
    const notas = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    let notaAtual = '';
    const selectClave = document.getElementById('clave');

    function desenharPauta(clave) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Desenhar as linhas da pauta
        const espacamento = 20;
        const inicioY = 50;
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.moveTo(10, inicioY + i * espacamento);
            ctx.lineTo(canvas.width - 10, inicioY + i * espacamento);
            ctx.stroke();
        }

        // Desenhar a clave de sol usando a imagem local
        if (clave === 'sol') {
            const img = new Image();
            img.src = 'clave_sol.png'; // Nome do arquivo da imagem enviada
            img.onload = () => {
                ctx.drawImage(img, 10, inicioY - 30, 40, 100);
            };
        }

        // Desenhar a clave de fá
        if (clave === 'fa') {
            const img = new Image();
            img.src = 'https://upload.wikimedia.org/wikipedia/commons/2/21/Fclef.svg'; // URL da imagem da clave de fá
            img.onload = () => {
                ctx.drawImage(img, 10, inicioY - 30, 40, 100);
            };
        }
    }

    function desenharNotaAleatoria() {
        const clave = selectClave.value;
        desenharPauta(clave);

        notaAtual = notas[Math.floor(Math.random() * notas.length)];
        ctx.font = '48px Arial';
        ctx.fillText(notaAtual, canvas.width / 2, 120); // Ajustar posição da nota
    }

    document.querySelectorAll('#controles button').forEach(button => {
        button.addEventListener('click', (e) => {
            const notaEscolhida = e.target.textContent;
            if (notaEscolhida === notaAtual) {
                feedback.textContent = 'Correto!';
                feedback.style.color = 'green';
                desenharNotaAleatoria();
            } else {
                feedback.textContent = 'Tente novamente!';
                feedback.style.color = 'red';
            }
        });
    });

    selectClave.addEventListener('change', desenharNotaAleatoria);

    desenharNotaAleatoria();
});
