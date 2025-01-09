document.addEventListener("DOMContentLoaded", () => {
  // Seleciona os elementos do DOM
  const minNumberInput = document.getElementById("min-number"); // Campo de entrada para o número mínimo
  const maxNumberInput = document.getElementById("max-number"); // Campo de entrada para o número máximo
  const quantityInput = document.getElementById("quantity"); // Campo de entrada para a quantidade de números a serem sorteados
  const drawButton = document.getElementById("draw-button"); // Botão para iniciar o sorteio
  const numberDisplay = document.getElementById("number-display"); // Exibição dos números sorteados
  const drawCountDisplay = document.getElementById("draw-count"); // Exibição do número total de sorteios realizados
  const drawnNumbersDisplay = document.getElementById("drawn-numbers"); // Exibição de todos os números sorteados
  const countdownContainer = document.getElementById("countdown-container"); // Contêiner para o temporizador de contagem regressiva
  const countdownDisplay = document.getElementById("countdown"); // Exibição do temporizador de contagem regressiva
  const resetButton = document.getElementById("reset-button"); // Botão para resetar o sorteio
  const toggleThemeButton = document.getElementById("toggle-theme"); // Botão para alternar entre temas (claro e escuro)
  const orderCheckbox = document.getElementById("order-checkbox"); // Checkbox para ordenar os números sorteados
  const showCountdownCheckbox = document.getElementById(
    "show-countdown-checkbox"
  ); // Checkbox para habilitar/desabilitar a contagem regressiva

  let drawCount = 0; // Contador para o total de sorteios
  const allDrawnNumbers = []; // Array para armazenar todos os números sorteados

  // Evento de clique no botão de sorteio
  drawButton.addEventListener("click", () => {
    const minNumber = parseInt(minNumberInput.value); // Converte o valor mínimo para número inteiro
    const maxNumber = parseInt(maxNumberInput.value); // Converte o valor máximo para número inteiro
    const quantity = parseInt(quantityInput.value); // Converte a quantidade para número inteiro

    // Verifica se os campos estão preenchidos corretamente
    if (
      isNaN(minNumber) ||
      isNaN(maxNumber) ||
      isNaN(quantity) ||
      quantity < 1
    ) {
      alert("Por favor, preencha os campos corretamente."); // Exibe uma mensagem de erro se algo estiver errado
      return;
    }

    // Verifica se a contagem regressiva está habilitada
    if (showCountdownCheckbox.checked) {
      countdownContainer.classList.add("visible"); // Torna o contêiner da contagem regressiva visível
      let countdownValue = 5; // Define o valor inicial da contagem
      countdownDisplay.textContent = countdownValue; // Atualiza a exibição do contador

      // Intervalo para realizar a contagem regressiva
      const countdownInterval = setInterval(() => {
        countdownValue--;
        countdownDisplay.textContent = countdownValue; // Atualiza a exibição do valor decrementado

        if (countdownValue <= 0) {
          clearInterval(countdownInterval); // Para o intervalo quando chega a 0
          countdownContainer.classList.remove("visible"); // Oculta o contêiner da contagem

          drawRandomNumbers(minNumber, maxNumber, quantity); // Realiza o sorteio
        }
      }, 1000); // Intervalo de 1 segundo
    } else {
      drawRandomNumbers(minNumber, maxNumber, quantity); // Realiza o sorteio imediatamente
    }
  });

  // Função para sortear números aleatórios
  const drawRandomNumbers = (minNumber, maxNumber, quantity) => {
    const drawnNumbers = []; // Array para armazenar os números sorteados no sorteio atual
    const uniqueNumbers = new Set(); // Conjunto para garantir que não haja números repetidos

    while (drawnNumbers.length < quantity) {
      const randomNumber =
        Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber; // Gera um número aleatório entre o mínimo e o máximo

      if (!uniqueNumbers.has(randomNumber)) {
        uniqueNumbers.add(randomNumber); // Adiciona o número ao conjunto para evitar duplicatas
        drawnNumbers.push(randomNumber); // Adiciona o número ao array
      }
    }

    // Verifica se a ordenação está habilitada e ordena os números
    if (orderCheckbox.checked) {
      drawnNumbers.sort((a, b) => a - b);
    }

    allDrawnNumbers.push(...drawnNumbers); // Adiciona os números sorteados ao array global

    numberDisplay.classList.add("animate"); // Adiciona uma classe de animação para exibição dos números

    setTimeout(() => {
      numberDisplay.textContent = drawnNumbers.join(", "); // Exibe os números sorteados
      drawCount++; // Incrementa o contador de sorteios
      drawCountDisplay.textContent = drawCount; // Atualiza a exibição do total de sorteios

      drawnNumbersDisplay.textContent = allDrawnNumbers.join(", "); // Exibe todos os números sorteados

      setTimeout(() => {
        numberDisplay.classList.remove("animate"); // Remove a animação para que possa ser reaplicada posteriormente
      }, 1000); // Remove a classe após 1 segundo
    }, 500); // Exibe o número com um pequeno atraso para permitir a animação
  };

  // Evento de clique no botão de reset
  resetButton.addEventListener("click", () => {
    minNumberInput.value = 1; // Reseta o valor mínimo para 1
    maxNumberInput.value = 100; // Reseta o valor máximo para 100
    quantityInput.value = 1; // Reseta a quantidade para 1
    numberDisplay.textContent = "Clique no botão abaixo para sortear"; // Reseta o texto de exibição
    drawnNumbersDisplay.textContent = ""; // Limpa os números exibidos
    allDrawnNumbers.length = 0; // Limpa o array global de números sorteados
    drawCount = 0; // Reseta o total de sorteios
    drawCountDisplay.textContent = drawCount; // Atualiza a exibição do total de sorteios
  });

  // Evento de clique no botão de alternância de tema
  toggleThemeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme"); // Alterna a classe de tema escuro no corpo da página
    toggleThemeButton.textContent = document.body.classList.contains(
      "dark-theme"
    )
      ? "🌞" // Ícone para o tema claro
      : "🌙"; // Ícone para o tema escuro
  });
});
