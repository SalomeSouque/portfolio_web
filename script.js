enterrorMessage =[]
let currentResponses = [];
let isLoadingLanguage = false;

async function changeLanguage(language) {
    if (isLoadingLanguage) {
        return;
    }

    isLoadingLanguage = true;


    try {
        // Déterminer le nom du fichier JSON en fonction de la langue
        const fileName = language === 'fr' ? 'fr.json' : 'en.json';


        const response = await fetch(fileName);
        if (!response.ok) {
            throw new Error('Erreur lors du chargement du fichier de langue');
        }
        const translations = await response.json();
        console.log('Traductions chargées:', translations); // Vérifiez les données chargées

        for (const [key, value] of Object.entries(translations)) {
            const element = document.querySelector(`[data-lang="${key}"]`);
            if (element) {
                element.textContent = value;
            }
        }

        updateCards(translations.cards);
        updateChatbotDynamicContent(translations.questions, translations.responses, translations.invalidMessage, translations.test);

    } catch (error) {
        console.error('Erreur lors du changement de langue:', error);
    } finally {
        isLoadingLanguage = false;
    }
}





function updateCards(cardsData) {
    let divjs = document.getElementById("DivJS");
    if (!divjs) {
        console.error('Conteneur de cartes non trouvé');
        return;
    }
    divjs.innerHTML = ""; // Réinitialiser le contenu avant de remplir

    let indeximage = 0;
    let indexlink = 0;
    let tableauCard = [];



    cardsData.forEach(element => {
        indexlink++;
        let card = document.createElement("div");
        card.id = "cardjs" + indexlink;
        card.className = "cardjs";
        divjs.appendChild(card);
        tableauCard.push(card)

        // Ajouter le lien
        let link = document.createElement("a");
        link.className = "lien";
        link.href = element["a-url"];
        card.appendChild(link);

        // Ajouter l'image
        indeximage++;
        let image = document.createElement("div");
        image.id = "image" + indeximage;
        image.textContent = element.image;
        card.appendChild(image);

        // Ajouter le trait
        let trait = document.createElement("div");
        trait.className = "traitjs";
        trait.textContent = element.trait;
        card.appendChild(trait);

        // Ajouter le titre
        let titre = document.createElement("h2");
        titre.className = "titrejs";
        titre.textContent = element.titre;
        card.appendChild(titre);

        // Ajouter la description
        let description = document.createElement("p");
        description.className = "descriptionjs";
        description.textContent = element.description;
        card.appendChild(description);
    });

    console.log(tableauCard);
    tableauCard[0].addEventListener("click", function (eve){
        eve.preventDefault ();

        window.location.href = 'https://salomesouque.github.io/Rendu_JS/';
    }),
    tableauCard[1].addEventListener("click", function (eve){
        eve.preventDefault ();

        window.location.href = 'https://yuka.io/';
    }),
    tableauCard[2].addEventListener("click", function (eve){
        eve.preventDefault ();

        window.location.href = 'https://yuka.io/';
    }),
    tableauCard[3].addEventListener("click", function (eve){
        eve.preventDefault ();

        window.location.href = 'https://yuka.io/';
    }),
    tableauCard[4].addEventListener("click", function (eve){
        eve.preventDefault ();

        window.location.href = 'https://yuka.io/';
    }),
    tableauCard[5].addEventListener("click", function (eve){
        eve.preventDefault ();

        window.location.href = 'https://yuka.io/';
    })
}










function updateChatbotDynamicContent(questionsData, responsesData, invalidMessage) {
    console.log('Questions chargées:', questionsData);
    console.log('Réponses chargées:', responsesData);

    let questionsliste = document.getElementById('questionsliste');
    if (!questionsliste) {
        console.error('Conteneur de questions non trouvé');
        return;
    }

    questionsliste.innerHTML = ''; // Effacer les questions existantes

    // Afficher les questions
    questionsData.forEach((question, index) => {
        questionsliste.innerHTML += `<div class="chat-bubble bot">${index + 1}. ${question}</div>`;
    });


    // Fonction pour ouvrir/fermer le chat avec l'effet de scaling
    function toggleChat() {
        const chatWindow = document.getElementById('chat-window');
        const questionBubble = document.getElementById('question-bubble');
        
        // Si la fenêtre du chatbot est fermée, l'ouvrir et masquer la bulle "Une question ?"
        if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
            chatWindow.style.display = 'flex';
            chatWindow.classList.add('open');
            questionBubble.style.display = 'none'; // Masque la bulle "Une question ?" quand on ouvre le chat
        } else {
            chatWindow.classList.remove('open');
            setTimeout(() => {
                chatWindow.style.display = 'none';
            }, 300);
        }
    }






    // Mettre à jour les réponses actuelles
    currentResponses = responsesData;
    currenterrorMessage = invalidMessage
    // Fonction pour obtenir la réponse du bot
    function getBotResponse(questionNumber) {
        return currentResponses[questionNumber - 1];
    }

    // Fonction pour envoyer un message
    function sendMessage() {
        let userInput = document.getElementById('user-input').value.trim(); // Récupérer l'entrée utilisateur
        let answer = document.getElementById('answer');
        let validInput = parseInt(userInput); // Vérifier si c'est un nombre entier

        // Vérifier si l'entrée est un nombre valide et compris entre 1 et le nombre de questions
        if (!isNaN(validInput) &&validInput >= 1 && validInput <= questionsData.length) {
            answer.innerHTML += `<div class="chat-bubble user">Question ${validInput}</div>`;

            // Ajouter l'animation des trois points de suspension
            let typingIndicator = document.createElement('div');
            typingIndicator.classList.add('chat-bubble', 'bot', 'typing');
            typingIndicator.innerHTML = '<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>';
            answer.appendChild(typingIndicator);
            
            // Faire défiler automatiquement la fenêtre de chat
            chatbox.scrollTop = chatbox.scrollHeight;
    
            // Effacer l'entrée de l'utilisateur immédiatement
            document.getElementById('user-input').value = '';


            // Après 3 secondes, remplacer les points de suspension par la réponse du bot
            setTimeout(() => {
                // Supprimer l'animation des points de suspension
                answer.removeChild(typingIndicator);
    
                // Réponse du chatbot
                let response = getBotResponse(validInput); // Récupérer la réponse basée sur l'entrée utilisateur
            answer.innerHTML += `<div class="chat-bubble bot">${response}</div>`; // Afficher la réponse
    
                // Faire défiler automatiquement la fenêtre de chat après la réponse
                chatbox.scrollTop = chatbox.scrollHeight;
            }, 3000); // 3 secondes d'animation

            



        } else if (userInput !== '') {
            // Si l'entrée est invalide, afficher le message d'erreur
            answer.innerHTML += `<div class="chat-bubble user">Question ${validInput}</div>`;
            chatbox.scrollTop = chatbox.scrollHeight;
            document.getElementById('user-input').value = ''; // Réinitialiser l'entrée utilisateur
            setTimeout(() => {
                answer.innerHTML += `<div class="chat-bubble bot">${currenterrorMessage}</div>`;
            // document.getElementById('user-input').value = ''; // Réinitialiser l'entrée utilisateur
            chatbox.scrollTop = chatbox.scrollHeight; // Scroll jusqu'au bas du chat
            }, 600);
            
        }
    }



    // Fonction pour fermer la bulle "Une question ?" quand on clique sur la croix
    function closeQuestionBubble() {
        const questionBubble = document.getElementById('question-bubble');
        questionBubble.style.display = 'none';
    }



    // Attacher l'événement pour ouvrir/fermer le chat
    document.getElementById('chat-btn').addEventListener("click", toggleChat);
    document.getElementById('close-question-bubble').addEventListener("click", closeQuestionBubble);
    document.getElementById('close-chatbox').addEventListener("click", toggleChat);



    // Supprimer les anciens écouteurs d'événements avant d'en ajouter de nouveaux
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');

    sendBtn.removeEventListener("click", sendMessage);
    userInput.removeEventListener('keydown', handleEnterKey);

    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener('keydown', handleEnterKey);

    function handleEnterKey(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    }
}

document.getElementById('language-selector').addEventListener('change', (event) => {
    const selectedLanguage = event.target.value;
    changeLanguage(selectedLanguage);
});



document.addEventListener('DOMContentLoaded', () => {
    const defaultLanguage = 'en'; // ou 'fr' selon votre préférence
    changeLanguage(defaultLanguage);
});
























