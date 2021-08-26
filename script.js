let cardBlocks = document.querySelector('.card_blocks');

let rigthCounts = 0;
let wrongCounts = 0;

function createCard(obj, totalQuestions) {
    if (!validateQuestion(obj)) {
        let text = document.createElement('p');
        text.innerHTML = "Неправильная конфигурация";
        cardBlocks.appendChild(text);
        return;
    }
    let cardWrapper = document.createElement('div');
    cardWrapper.classList.add('card_wrapper');
    let cardBlock = document.createElement('div');
    cardWrapper.appendChild(cardBlock);
    cardBlock.classList.add('card_block');
    let circle = document.createElement('div');
    circle.classList.add('circle');
    let contentBlock = document.createElement('div');
    contentBlock.classList.add('content_block');
    cardBlock.appendChild(circle);
    cardBlock.appendChild(contentBlock);
    let question = document.createElement('h1');
    question.innerHTML = obj.questionText;
    contentBlock.appendChild(question);
    for (let i = 0; i < obj.options.length; i++) {
        let option = createOption(i, obj.options[i]);
        contentBlock.appendChild(option);
    }
    cardBlocks.appendChild(cardBlock);
    let sendBlock = document.createElement('div');
    sendBlock.classList.add('form');
    let input = document.createElement('input');
    input.maxLength = 1;
    input.placeholder = 'Выберите какой либо вариант';
    input.classList.add('input');

    input.oninput = function () {
        if (input.value.length == 0)
            return;

        if (input.value.charCodeAt(0) >= 97 && input.value.charCodeAt(0) <= 122)
            return;

        if (input.value.charCodeAt(0) < 65 || input.value.charCodeAt(0) > 90) {
            console.log("blya");
            input.value = '';
        } else {
            console.log("blyaaaaaa");
            input.value = String.fromCharCode(input.value.charCodeAt(0) + 32);
        }
    };

    let btnSend = document.createElement('button');
    btnSend.classList.add('btn_send');
    btnSend.innerHTML = 'Send';
    sendBlock.appendChild(input);
    sendBlock.appendChild(btnSend);
    contentBlock.appendChild(sendBlock);
    btnSend.addEventListener('click', function () {
        let yourAnswer = document.createElement('p');
        yourAnswer.innerHTML = `Ваш ответ: ${input.value}`;
        contentBlock.appendChild(yourAnswer);
        if (input.value.charCodeAt(0) - 97 === obj.correctAnswer) {
            cardBlock.classList.add('right');
            rigthCounts++;
            btnSend.disabled = true;
            console.log(rigthCounts)
        }
        else if (!input.value || input.value.charCodeAt(0) - 97 < 0 || input.value.charCodeAt(0) - 97 >= obj.options.length) {
            input.style.border = '1px solid red';
            input.value = '';
            yourAnswer.innerHTML = '';
        }
        else {
            cardBlock.classList.add('mistake');
            wrongCounts++;
            btnSend.disabled = true;
        }

        if (rigthCounts + wrongCounts == totalQuestions) {
            let footer = document.querySelector(".footer");
            footer.classList.add('footer');

            let rightCountsP = document.createElement("p");
            rightCountsP.innerHTML = "Количество правильных ответов: " + rigthCounts;
            footer.appendChild(rightCountsP);

            let wrongCountsP = document.createElement("p");
            wrongCountsP.innerHTML = "Количество неправильных ответов: " + wrongCounts;
            footer.appendChild(wrongCountsP);
        }
    });
}

function validateQuestion(question) {
    return !(question.correctAnswer < 0 || question.correctAnswer >= question.options.length);
}

function createOption(index, content) {
    let option = document.createElement('p');
    option.innerHTML = String.fromCharCode(97 + index) + ". " + content;

    return option;
}



const questions = [
    {
        questionText: 'Столица Азербайджана?',
        options: ["Баку", "Ленкорань", "Бардв", "Мингачевир"],
        correctAnswer: 0
    },
    {
        questionText: 'Столица России?',
        options: ["Москва", "Казань", "Санкт-Петербург", "Екатеринбург"],
        correctAnswer: 0
    },
    {
        questionText: 'Cтолица Америки?',
        options: ["Лос-Анджелес", "Массачусетс", "Вашингтон", "Маями"],
        correctAnswer: 2
    },
    {
        questionText: 'Столица Грузии?',
        options: ["Кобулети", "Батуми", "Боржоми", "Тбилиси"],
        correctAnswer: 3
    },
    {
        questionText: 'Столица Китая?',
        options: ["Шанхай", "Пекин", "Гуанчжоу", "Нанкин"],
        correctAnswer: 1
    },
    {
        questionText: 'Столица Чехии?',
        options: ["Брно", "Прага", "Либерец", "Злин"],
        correctAnswer: 1
    },
    {
        questionText: 'Столица Португалии?',
        options: ["Порту", "Коимбра", "Лиссабон", "Портман"],
        correctAnswer: 2
    },
    {
        questionText: 'Столица Малайзии?',
        options: ["Джорджтаун", "Кота-Бару", "Куала-Лумпур", "Кучинг"],
        correctAnswer: 2
    },
    {
        questionText: 'Столица Италии?',
        options: ["Рим", "Милан", "Генуя", "Турин"],
        correctAnswer: 0
    },
    {
        questionText: 'Столица Испании?',
        options: ["Мадрид", "Барселона", "Аликанте", "Севилья"],
        correctAnswer: 1
    }
];

for (let i = 0; i < questions.length; i++) {
    createCard(questions[i], questions.length);
}