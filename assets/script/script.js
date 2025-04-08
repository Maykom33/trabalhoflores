async function getFrases() {
    try {
        const response = await fetch("https://api.quotable.io/quotes?limit=50");
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }
        const data = await response.json();
        let frasesAPI = data.results.map(quote => quote.content); // Converte para array de frases
        
        return frasesAPI;
    } catch (error) {
        console.error("Erro ao buscar frases:", error);
        return [];
    }
}

function embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos de lugar
    }
    return array;
}

async function loadGallery() {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = ""; // Limpa a galeria antes de carregar novas imagens

    let frasesAPI = await getFrases();
    
    // Lista de frases padrão para garantir 40 frases
    const frasesPadrao = [
        "Acredite no seu potencial.",
        "O sucesso é construído com determinação.",
        "Cada dia é uma nova chance de recomeçar.",
        "Seja a mudança que deseja ver no mundo.",
        "Nada é impossível para quem persiste.",
        "A felicidade está no caminho, não no destino.",
        "Viva com paixão e propósito.",
        "Grandes conquistas começam com pequenos passos.",
        "Transforme desafios em oportunidades.",
        "A jornada é tão importante quanto o destino.",
        "O tempo certo é agora.",
        "Acredite e faça acontecer.",
        "Persistência supera talento.",
        "O esforço de hoje é o sucesso de amanhã.",
        "Nunca é tarde para recomeçar.",
        "Confie no processo.",
        "Você é capaz de mais do que imagina.",
        "Sonhe, planeje, realize.",
        "Seja sua melhor versão todos os dias.",
        "O futuro depende do que você faz hoje.",
        "Faça com amor ou nem faça.",
        "A coragem leva à vitória.",
        "Pequenos hábitos geram grandes mudanças.",
        "O aprendizado nunca termina.",
        "Sua atitude define sua altitude.",
        "A mudança começa dentro de você.",
        "Siga seus sonhos, não sua zona de conforto.",
        "Trabalhe duro e o sucesso virá.",
        "Aprenda com o fracasso e siga em frente.",
        "A vida é uma jornada, não um destino.",
        "Crie oportunidades em vez de esperar por elas.",
        "A sorte favorece os preparados.",
        "O poder da mente é ilimitado.",
        "O segredo do sucesso é a consistência.",
        "Erga-se mais forte após cada queda.",
        "Não deixe o medo impedir seu progresso.",
        "A ação vence o medo.",
        "Grandes realizações exigem tempo.",
        "Nada muda se você não mudar.",
        "Viva sem arrependimentos, aprenda com tudo."
    ];

    // Junta as frases da API com as frases padrão para garantir 40 frases
    let frases = [...frasesAPI, ...frasesPadrao].slice(0, 40);
    
    // Embaralha as frases para evitar padrões repetitivos
    frases = embaralharArray(frases);

    for (let i = 0; i < 39; i++) {
        let imgSrc = `https://picsum.photos/300/200?random=${i}`;
        let frase = frases[i]; // Sempre haverá 40 frases disponíveis

        let figure = document.createElement("figure");
        figure.innerHTML = `
            <img src="${imgSrc}" alt="Foto Aleatória ${i + 1}" loading="lazy">
            <figcaption>${frase}</figcaption>
        `;

        gallery.appendChild(figure);
    }
}

// Executa a função após o carregamento da página


document.addEventListener("DOMContentLoaded", loadGallery);


document.addEventListener("DOMContentLoaded", function() {
    // todo seu código atual aqui
  });
  
document.getElementById("feedbackForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let comentario = document.getElementById("comentario").value;
    let estrelas = parseInt(document.querySelector("input[name='estrelas']:checked")?.value || 0);

    // Salvar no localStorage
    let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    feedbacks.push({ nome, comentario, estrelas });

    if (feedbacks.length > 2) feedbacks = feedbacks.slice(-2);
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

    exibirFeedbacks();
    this.reset();
});

function exibirFeedbacks() {
    const container = document.getElementById("reviews");
    const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

    container.innerHTML = "<h3>Últimos Comentários</h3>";

    feedbacks.slice().reverse().forEach((feedback) => {
        const div = document.createElement("div");
        div.classList.add("comentario");
        div.innerHTML = `
        <p><strong>👤 ${feedback.nome}</strong></p>
        <p>${"★".repeat(parseInt(feedback.estrelas))}</p>
        <p>💬 ${feedback.comentario}</p>
        <hr>
`;

        container.appendChild(div);
    });
}

document.addEventListener("DOMContentLoaded", exibirFeedbacks);
