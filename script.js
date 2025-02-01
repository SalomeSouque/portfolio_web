fetch("./texte.json")   //J'appel mon fichier json qui est sur une autre page
    .then(response =>{
        if (!response.ok) {
            throw new Error ("Failed to load JSON data")
        } 
        return response.json()
            
        
    })
    .then(data =>{

    // console.log(data);
    

    
    
    for (let key in data) {

        let keys = Object.keys(data);
        // console.log(keys);

        let divjs = document.getElementById ("DivJS");
        let indeximage =0;
        let indexlink =0;
        // let cardall = document.createElement ("div");
        let tableau = [];
        // myArray.push(myObject)

        data.web.forEach(element => {
            indexlink ++
            let card = document.createElement ("div");
            card.id = "cardjs"+indexlink
            card.className = "cardjs";
            divjs.appendChild(card);
            tableau.push(card)
            

            // card[1].addEventListener("click", function (eve) {        //Je crée une fonction qui va servir à supprimer le li lors du click sur le bouton
            //     eve.preventDefault ();                              //           
            //     window.location.href = 'https://www.1formatik.com/creer-lien-hypertexte-html-js';                                 // Je met mon li sur mon ul
            // })
            
            // Array.prototype.push.apply(card)
            // console.log(tableau);
            
            let test = document.createElement ("a");
            test.className = "testlien";
            test.src = element["a-url"];
            card.appendChild(test)
// console.log(card);


        indeximage++
        let image = document.createElement ("div");
        image.id = "image"+indeximage;
        image.textContent = element.image;
        card.appendChild(image);
        // console.log(image);
        
        
        let trait = document.createElement("div");
        trait.className = "traitjs";
        trait.textContent = element.trait;
        card.appendChild(trait);

        let titre = document.createElement("h2");
        titre.className = "titrejs";
        titre.textContent = element.titre;
        card.appendChild(titre);

        let description = document.createElement("p");
        description.className = "descriptionjs";
        description.textContent = element.description;
        card.appendChild(description);

     
    

        });
        // tableau.push(divjs)
            console.log(tableau);
                tableau[1].addEventListener("click", function (eve) {        //Je crée une fonction qui va servir à supprimer le li lors du click sur le bouton
                eve.preventDefault ();
                                              //           
                window.location.href = 'https://yuka.io/';                                 // Je met mon li sur mon ul
            })

            function opentab (params) {
                
            }


        // let test = document.createElement (a);
        // text.className = "testlien";
        // test.src = element["a-url"];
        // card.appendChild(test)
    }})



    //ChatBot créé avec ChatGPT4
   
document.addEventListener("DOMContentLoaded", function() {
    // Définition des questions et des réponses
    const questions = [
        "Quel est ton nom ?",
        "Que fais-tu ?",
        "Où es-tu situé ?",
        "Quels sont tes services ?",
        "Comment puis-je te contacter ?",
        "As-tu des références ?",
        "Quel est ton expérience ?",
        "Combien de temps prends-tu pour un projet ?",
        "Quels outils utilises-tu ?",
        "Quel est ton tarif ?"
    ];

    const responses = [
        "Je suis ChatGPT, un assistant IA créé par OpenAI.",
        "Je suis un assistant virtuel conçu pour répondre à des questions et aider avec divers projets.",
        "Je suis un programme informatique, donc je n'ai pas de localisation physique.",
        "Je peux aider à répondre à des questions fréquentes ou à résoudre des problèmes basés sur l'IA.",
        "Tu peux me contacter directement sur ce site.",
        "Je suis un assistant basé sur l'IA et n'ai pas de références en tant qu'entité humaine.",
        "Je n'ai pas d'expérience humaine, mais je suis entraîné sur une vaste quantité de données textuelles.",
        "Le temps nécessaire dépend du projet, mais je peux t'aider à déterminer des délais.",
        "Je fonctionne grâce à des modèles d'intelligence artificielle, comme GPT-3, et d'autres outils d'apprentissage automatique.",
        "Je suis gratuit à utiliser !"
    ];

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

    // Fonction pour envoyer un message et afficher la réponse
    function sendMessage() {
        let userInput = document.getElementById('user-input').value.trim();
        let chatbox = document.getElementById('chatbox');
    
        if (userInput && userInput >= 1 && userInput <= 10) {
            // Ajouter le message de l'utilisateur
            chatbox.innerHTML += `<div class="chat-bubble user">Question ${userInput}</div>`;
    
            // Ajouter l'animation des trois points de suspension
            let typingIndicator = document.createElement('div');
            typingIndicator.classList.add('chat-bubble', 'bot', 'typing');
            typingIndicator.innerHTML = '<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>';
            chatbox.appendChild(typingIndicator);
            
            // Faire défiler automatiquement la fenêtre de chat
            chatbox.scrollTop = chatbox.scrollHeight;
    
            // Effacer l'entrée de l'utilisateur immédiatement
            document.getElementById('user-input').value = '';
    
            // Après 3 secondes, remplacer les points de suspension par la réponse du bot
            setTimeout(() => {
                // Supprimer l'animation des points de suspension
                chatbox.removeChild(typingIndicator);
    
                // Réponse du chatbot
                let response = getBotResponse(userInput);
                chatbox.innerHTML += `<div class="chat-bubble bot">${response}</div>`;
    
                // Faire défiler automatiquement la fenêtre de chat après la réponse
                chatbox.scrollTop = chatbox.scrollHeight;
            }, 3000); // 3 secondes d'animation
        } else {
            // Message d'erreur si le numéro est invalide
            chatbox.innerHTML += `<div class="chat-bubble bot">Veuillez entrer un numéro de question valide (1-10).</div>`;
            document.getElementById('user-input').value = '';
            chatbox.scrollTop = chatbox.scrollHeight;
        }
    }
    
    

    // Fonction pour obtenir la réponse du bot en fonction du numéro de la question
    function getBotResponse(questionNumber) {
        return responses[questionNumber - 1];
    }

    // Fonction pour fermer la bulle "Une question ?" quand on clique sur la croix
    function closeQuestionBubble() {
        const questionBubble = document.getElementById('question-bubble');
        questionBubble.style.display = 'none';
    }

    // Attacher l'événement pour ouvrir/fermer le chat et fermer la bulle "Une question ?"
    document.getElementById('chat-btn').addEventListener("click", toggleChat);
    document.getElementById('close-question-bubble').addEventListener("click", closeQuestionBubble);

    // Attacher l'événement pour envoyer le message
    document.getElementById('send-btn').addEventListener("click", sendMessage);

    // Ajouter un écouteur pour la touche "Entrée"
    document.getElementById('user-input').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
});
