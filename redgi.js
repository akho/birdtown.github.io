const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-buttons");
const bgDiv = document.getElementById("bg-image");
const cardsStack = document.getElementById("cards");
var audioT = document.getElementById("music");
const sndbtns = document.querySelector("#sndbtns");
const icon = document.querySelector("#sndbtns > i");

var firstRun = true;
var currentLocationImage = "location0.jpg";
var a = rand(11, 12);
var b = rand(13, 14);
var c = rand(46, 47);
var d = rand(57, 58);
var e = rand(59, 60);
var f = rand(88, 89);

let state = {};

sndbtns.addEventListener("click", () => {
    if (audioT.paused) {
        audioT.volume = 0.2;
        audioT.loop = true;
        audioT.play();
        icon.classList.remove("fa-volume-mute");
        icon.classList.add("fa-volume-up");
    } else {
        audioT.pause();
        icon.classList.remove("fa-volume-up");
        icon.classList.add("fa-volume-mute");
    }
});

function addLocationImage() {
    var cardDiv = document.createElement("div");
    var locImg = document.createElement("img");
    locImg.src = currentLocationImage;
    cardDiv.style.setProperty("--rand", rand(-4, 4));
    cardDiv.appendChild(locImg);
    cardsStack.appendChild(cardDiv);
    var locImg2 = document.createElement("img");
    locImg2.src = currentLocationImage;
    bgDiv.appendChild(locImg2);
}

async function startGame() {
    if (!firstRun) {
        while (cardsStack.firstChild) {
            cardsStack.removeChild(cardsStack.firstChild);
        }
        while (bgDiv.firstChild) {
            bgDiv.removeChild(bgDiv.firstChild);
        }
        currentLocationImage = "";
    }
    firstRun = false;
    state = {};
    await showTextNode(1);
}

function rand(min, max, interval) {
    if (typeof interval === "undefined") interval = 1;
    var r = Math.floor((Math.random() * (max - min + interval)) / interval);
    return r * interval + min;
}

async function showTextNode(textNodeIndex) {
    const textNode = TextNodes.find(
        (textNode) => textNode.id === textNodeIndex,
    );
    textElement.innerText = await textNode.text();
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }

    if (currentLocationImage != textNode.image) {
        currentLocationImage = textNode.image;
        addLocationImage();
    }

    player.src = textNode.player_image;

    for (const option of textNode.options) {
        if (showOption(option)) {
            const button = document.createElement("button");
            button.innerText = await option.text();
            button.classList.add("btn");
            button.addEventListener("click", () => selectOption(option));
            optionButtonsElement.appendChild(button);
        }
    }
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}

async function selectOption(option) {
    const nextTextNodeId = option.nextText;
    if (nextTextNodeId <= 0) {
        return startGame();
    }
    state = Object.assign(state, option.setState);
    await showTextNode(nextTextNodeId);
}

const TextNodes = [
    {
        id: 1,
        text: async () =>
            `Добро пожаловать в игру 'Птицбург'! На прохождение игры вам потребуется от 2 до 15 минут в зависимости от выбранного вами пути. У этой игры 10 концовок, поэтому крайне рекомендую пройти ее несколько раз по-разному!`,
        image: "location0.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () => "Понятно!",
                nextText: 2,
            },
        ],
    },
    {
        id: 2,
        text: async () =>
            "Храбрый, крайне амбициозный птиц по имени Реджинальд приехал в город, дабы поступить в Птицбургский Государственный Университет имени М.В.Канарейкина на программиста!",
        image: "location1.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () => "Начать игру!",
                nextText: 3,
            },
        ],
    },
    {
        id: 3,
        text: async () =>
            "Университет предоставил Реджи комнату на время сдачи вступительных испытаний. Реджинальд стал раскладывать свои птичьи вещички, как вдруг раздался стук в дверь. Наверное, это сосед по блоку.",
        image: "location2.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () => "Открыть дверь",
                nextText: 4,
            },
        ],
    },
    {
        id: 4,
        text: async () =>
            `Открыв дверь, Реджи увидел улыбающегося, веселого фламинго по имени Арчибальд. Арчибальд: «Привет, привет! Меня зовут Арчи, я с философского факультета. Рад знакомству. А тебя как зовут?»`,
        image: "location2.jpg",
        player_image: "player2.webp",
        options: [
            {
                text: async () =>
                    `«Я Реджи, приехал поступать на программиста»`,
                nextText: 5,
            },
        ],
    },
    {
        id: 5,
        text: async () =>
            `«Так ты совсем новичок в студенческой жизни! Ну ничего, бросай вещи и пойдем за мной, я отведу тебя в лучший птицклуб этого города!»`,
        image: "location2.jpg",
        player_image: "player3.webp",
        options: [
            {
                text: async () => `Пойти с Арчи в клуб «Пташка»`,
                nextText: 6,
            },
            {
                text: async () =>
                    "Остаться и готовиться к вступительному экзамену",
                nextText: 10,
            },
        ],
    },
    {
        id: 6,
        text: async () =>
            `Арчи и Реджи приехали в клуб «Пташка» и начали свой птичий кутеж! Неожиданно Арчи наклонился к Реджи и прокричал ему на ухо: «Видишь того птица? В VIP зоне?»`,
        image: "location3.jpg",
        player_image: "player4.webp",
        options: [
            {
                text: async () => "Посмотреть на птица в VIP зоне",
                nextText: 7,
            },
        ],
    },
    {
        id: 7,
        text: async () =>
            "«Голубя? Ну да, вижу, а что с ним?» — «Это Валентин, глава Люберецкой голубиной группировки. Я его немного знаю, очень крутой птиц. Пойдем познакомлю!»",
        image: "location3.jpg",
        player_image: "player5.webp",
        options: [
            {
                text: async () => "«Давай! Почему нет!»",
                nextText: 8,
            },
            {
                text: async() => "«Нет, Арчи! Уже поздно, а у меня завтра экзамен, лучше в следующий раз. Я полечу». Реджи побежал в общагу!",
                nextText: 10,
            },
        ],
    },
    {
        id: 8,
        text: async () =>
            "Арчи и Реджи поднялись в VIP-зону. За столом сидели очень опасные голуби и оживленно вели беседу за картами. Во главе стола восседал Валентин. Валентин внимательно посмотрел на Арчи и Реджи и махнул крылом своей охране, чтобы пташек пропустили",
        image: "location4.jpg",
        player_image: "player6.webp",
        options: [
            {
                text: async () => "Подойти к Валентину",
                nextText: 9,
            },
        ],
    },
    {
        id: 9,
        text: async () =>
            "Арчи и Реджи присоединились к голубиной компании и начали беседу. Спустя какое-то время Реджи посмотрел на часы и обомлел, 8 утра, надо срочно бежать на экзамен!",
        image: "location4.jpg",
        player_image: "player7.webp",
        options: [
            {
                text: async () => "Быстрее бежать на экзамен!",
                nextText: b,
            },
        ],
    },
    {
        id: 10,
        text: async () =>
            "Реджи еще раз осмотрел свою комнату, после чего сел за стол, достал учебники и углубился в чтение. Когда на часах пробило 3 часа ночи, Реджи задумался: лечь ли ему спать или продолжить заниматься до самого упора?",
        image: "location2.jpg",
        player_image: "player8.webp",
        options: [
            {
                text: async () => "Ботать до самого утра",
                nextText: a,
            },
            {
                text: async () => "Выспаться перед экзаменом",
                nextText: a,
            },
        ],
    },
    {
        id: 11,
        text: async () =>
            "Реджи успешно сдал все экзамены и получил комнату в общежитии и стипендию!",
        image: "location5.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () => "Ураааа! Лететь на пары!",
                setState: { stypendy: true },
                nextText: 25,
            },
            {
                text: async () => "Все равно хочу найти подработку!",
                setState: { stypendy: true },
                nextText: 22,
            },
        ],
    },
    {
        id: 12,
        text: async () =>
            "Реджи задремал из-за усталости во время экзамена и с трудом сумел набрать вступительный балл. Но этих баллов не хватило на комнату в общежитии, и теперь Реджи необходимо найти подработку для съема жилья!",
        image: "location5.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () => "Искать подработку!",
                nextText: 22,
            },
            {
                text: async () => "Сдаться и вернуться в родной городок",
                nextText: 15,
            },
        ],
    },
    {
        id: 13,
        text: async () =>
            "Реджи заснул на экзамене и провалил вступительные испытания в университет!",
        image: "location6.jpg",
        player_image: "player9.webp",
        options: [
            {
                text: async () =>
                    "Отказаться от жизни в Птицбурге и вернуться в родное гнездо!",
                nextText: 15,
            },
            {
                text: async () =>
                    "Вернуться в клуб и попросить у голубя Валентина денег или работу!",
                nextText: 16,
            },
            {
                text: async () =>
                    "Встретиться с Арчибальдом на улице и попросить денег или работу!",
                nextText: 21,
            },
        ],
    },
    {
        id: 14,
        text: async () =>
            "Реджи не успел вовремя прийти на экзамен и провалил вступительные испытания в университет!",
        image: "location6.jpg",
        player_image: "player9.webp",
        options: [
            {
                text: async () =>
                    "Отказаться от жизни в Птицбурге и вернуться в родное гнездо!",
                nextText: 15,
            },
            {
                text: async () =>
                    "Вернуться в клуб и попросить у голубя Валентина денег или работу!",
                nextText: 16,
            },
            {
                text: async () =>
                    "Встретиться с Арчибальдом на улице и попросить денег или работу!",
                nextText: 21,
            },
        ],
    },
    {
        id: 15,
        text: async () => {
            const response = await fetch(
                "https://birdtown-studios.akho.name/visits",
                {
                    method: "POST",
                    body: JSON.stringify("game_over_1"),
                },
            );
            const json = await response.json();
            return `GAME OVER! Реджи вернулся в гнездо к своим родителям, отказавшись от мечты покорить Птицбург! Вы ${json}я птичка, прилетевшая на эту веточку Game Over!`;
        },
        image: "location10.jpg",
        player_image: "player0.webp",
        options: [
            {
                text: async () => "Начать заново!",
                nextText: -1,
            },
        ],
    },
    {
        id: 16,
        text: async () =>
            "Реджинальд вернулся в клуб «Пташка» и рассказал Валентину о своей ситуации. Валентин, внимательно выслушав, предложил дать Реджи одно дельце за небольшие деньги, чтобы проверить его способности! В соседнем городке один скат по имени Скотт кое-что задолжал Валентину",
        image: "location3.jpg",
        player_image: "player10.webp",
        options: [
            {
                text: async () => "Взяться за работу!",
                nextText: 17,
            },
            {
                text: async () => "Отказаться и встретиться с Арчибальдом",
                nextText: 21,
            },
            {
                text: async () => "Отказаться и уехать в родной городок",
                nextText: 15,
            },
        ],
    },
    {
        id: 17,
        text: async () =>
            "Реджинальд на метро, трех автобусах и велосипеде доехал до соседнего городка и нашел дом ската по имени Скотт, адрес которого ему дал Валентин. Он поднялся на крыльцо и позвонил в дверь, однако никто не открыл. Реджинальд позвонил еще раз, но ничего не произошло. Обойдя дом с другой стороны, Реджи заглянул в окно и увидел страшное.",
        image: "location11.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () =>
                    "Найти камень во дворе, разбить окно и попасть внутрь!",
                nextText: 18,
            },
            {
                text: async () => "Пробраться внутрь дома через дымовую трубу!",
                nextText: 18,
            },
        ],
    },
    {
        id: 18,
        text: async () =>
            "Реджинальд ворвался в комнату и увидел, как Скотт захватил Арчибальда в крайне опасный скатский захват!",
        image: "location12.jpg",
        player_image: "player11.webp",
        options: [
            {
                text: async () => "Прыгнуть на Скотта, чтобы он выплюнул Арчи!",
                nextText: 19,
            },
        ],
    },
    {
        id: 19,
        text: async () =>
            "Реджи разогнался и прыгнул на Скотта, Арчибальд выскочил из захвата, крикнул «Бежим!» и поскакал в сторону выхода.",
        image: "location12.jpg",
        player_image: "player12.webp",
        options: [
            {
                text: async () => "Бежать за Арчи!",
                nextText: 20,
            },
        ],
    },
    {
        id: 20,
        text: async () =>
            "Пробежав несколько районов, птицы остановились. Реджи упал на землю без сил, пока Арчибальд расхаживал туда-сюда. «Спасибо, Реджи! Я этого никогда не забуду! А из хороших новостей: я успел забрать этот конверт! Валентин будет доволен. А почему ты приехал сюда, Реджи?»",
        image: "location13.jpg",
        player_image: "player0.webp",
        options: [
            {
                text: async () => "Подняться с земли и подойти к Арчи",
                nextText: 21,
            },
        ],
    },
    {
        id: 21,
        text: async () =>
            "Реджи обратился к Арчибальду: «Арчи, я провалил вступительные и теперь мне нужна работа» — «Провалил? Эх, блин, ну ничего, в следующий раз повезет! Ты умный птенчик! Помогу тебе вообще без проблем, есть несколько идей! Выбирай сам»",
        image: "location13.jpg",
        player_image: "player2.webp",
        options: [
            {
                text: async () =>
                    "Занять деньги у Арчи и пойти работать в птицтакси",
                setState: { taxi: true },
                nextText: 86,
            },
            {
                text: async () => "Работать вдвоем на голубя Валентина",
                setState: { Valentin: true },
                nextText: 108,
            },
        ],
    },
    {
        id: 22,
        text: async () =>
            "Реджи направился в булочную рядом с университетом, чтобы узнать о студенческих вакансиях. Неожиданно он остановился у стэнда рядом с университетским входом. Там висело объявление. «Хочешь стать самым богатым птицем в городе? Хочешь купить себе самое дорогое лакшери гнездо? Тогда регистрируйся на курс главного бизнес-цыпа этого города и получи первый заработок уже сейчас!»",
        image: "location13.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () =>
                    "Зарегистрироваться на курс инфо-цыпана и получить деньги на съем жилья",
                setState: { infocypan: true },
                nextText: 24,
            },
            {
                text: async () => "Пойти в булочную узнать о вакансиях",
                nextText: 23,
            },
        ],
    },
    {
        id: 23,
        text: async () =>
            "В булочной Реджи предложили работу за не очень большие деньги, однако этих денег должно было хватить на съем комнаты. В самой булочной приятно пахло свежей выпечкой и было очень уютно.",
        image: "location14.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () => "Согласиться на работу в булочной",
                setState: { bakery: true },
                nextText: 24,
            },
            {
                text: async () =>
                    "Отказаться от этой работы и зарегистрироваться на курсы инфо-цыпана",
                setState: { infocypan: true },
                nextText: 24,
            },
        ],
    },
    {
        id: 24,
        text: async () =>
            "С первого заработка Реджи смог снять себе комнату недалеко от университета, Арчи помог ему перевезти все его птичьи вещички.",
        image: "location15.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () => "Лететь на пары!",
                nextText: 25,
            },
        ],
    },
    {
        id: 25,
        text: async () =>
            "В аудитории Реджи встретила староста его группы — птичка по имени Эми. «Привет, я Эми, твоя староста, вот твое расписание, сегодня будет лекция профессора Пауля, не опаздывай и веди себя там тихо! Он только кажется милым со стороны, в мгновение ока может сильно разозлиться и отчислить из университета. Пауль Джуниор, его аспирант, будет нашим семинаристом!»",
        image: "location16.jpg",
        player_image: "player13.webp",
        options: [
            {
                text: async () =>
                    "«Приятно познакомиться, Эми! Спасибо за советы, учту, я Реджи, кстати говоря!»",
                nextText: 26,
            },
        ],
    },
    {
        id: 26,
        text: async () =>
            "Эми улыбнулась, и ее глаза засияли еще ярче. «Я знаю, посмотрела всех одногруппников в птицаграмме, было интересно! Ты только ничего плохого не подумай!» В аудиторию зашел профессор.",
        image: "location16.jpg",
        player_image: "player13.webp",
        options: [
            {
                text: async () =>
                    "Улыбнуться в ответ Эми и сесть за стол рядом с ней",
                nextText: 27,
            },
        ],
    },
    {
        id: 27,
        text: async () =>
            "«Всем добрый день! Я профессор Пауль, это мой аспирант Пауль Джуниор, и сегодня мы начнем изучение низкоуровневых языков программирования!»",
        image: "location16.jpg",
        player_image: "player14.webp",
        options: [
            {
                text: async () => "Открыть ноутбук и начать кодить",
                nextText: 28,
            },
        ],
    },
    {
        id: 28,
        text: async () =>
            "Неожиданно в аудиторию ворвалась компания шумных птиц. Профессор Пауль сделал им замечание. Тройка ненадолго затихла, села недалеко от Реджи с Эми и уже букквально через пару минут стала общаться еще громче. Один из птицев резко дернул Реджи за пиджак «псс, эй, псс, какая тема сегодня?» Эми прошептала «Не поворачивайся! Профессор Пауль выгонит нас»",
        image: "location16.jpg",
        player_image: "player14.webp",
        options: [
            {
                text: async () => "Тихо прошептать в ответ «Rust»",
                nextText: 29,
            },
        ],
    },
    {
        id: 29,
        text: async () =>
            "Раздался грозный голос профессора Пауля. Он был сильно зол. «Молодые люди, если вам не хочется учиться, то просьба покинуть это учебное заведение! Вы, девушка (показывая на Эми), подойдите сюда! Как вам нестыдно! Вы староста этой группы, а отвлекаете себя и других от занятий!»",
        image: "location16.jpg",
        player_image: "player15.webp",
        options: [
            {
                text: async () =>
                    "Встать и заступиться за Эми, взяв вину на себя",
                setState: { Amyfriend: true },
                nextText: 30,
            },
            {
                text: async () => "Промолчать",
                setState: { Amyhate: true },
                nextText: 31,
            },
        ],
    },
    {
        id: 30,
        text: async () =>
            "«Профессор Пауль, Эми ни в чем не виновата, это я разговаривал». Профессор Пауль: «Ладно, молодой человек, на первый раз прощаю, однако теперь вы у меня на карандаше!»",
        image: "location16.jpg",
        player_image: "player16.webp",
        options: [
            {
                text: async () =>
                    "Пересесть с Эми за другой стол подальше от шумных птицев",
                nextText: 32,
            },
        ],
    },
    {
        id: 31,
        text: async () =>
            "Профессор Пауль отчитал Эми, и она, расплакавшись, убежала из аудитории.",
        image: "location16.jpg",
        player_image: "player20.webp",
        options: [
            {
                text: async () => "Молча ждать конца пары",
                nextText: 33,
            },
        ],
    },
    {
        id: 32,
        text: async () =>
            "После пары Эми подошла к Реджи «Спасибо тебе большое, птиц! А ... ты не хочешь пойти в летнее кино на набережной сегодня вечером?»",
        image: "location16.jpg",
        player_image: "player13.webp",
        options: [
            {
                text: async () => "Пойти на свидание с Эми",
                nextText: 34,
            },
            {
                text: async () =>
                    "Отказаться и пойти домой готовиться к сессии",
                requiredState: (currentState) => currentState.stypendy,
                nextText: 55,
            },
            {
                text: async () =>
                    "Отказаться и взять дополнительную смену в булочной",
                requiredState: (currentState) => currentState.bakery,
                nextText: 48,
            },
            {
                text: async () => "Отказаться и пойти на курсы от инфо-цыпана",
                requiredState: (currentState) => currentState.infocypan,
                nextText: 36,
            },
        ],
    },
    {
        id: 33,
        text: async () =>
            "После пары Реджи нашел Эми, однако Эми не захотела с ним разговаривать и попросила больше никогда ее не беспокоить.",
        image: "location16.jpg",
        player_image: "player9.webp",
        options: [
            {
                text: async () => "Пойти домой готовиться к сессии",
                requiredState: (currentState) => currentState.stypendy,
                nextText: 55,
            },
            {
                text: async () => "Пойти на работу в булочную",
                requiredState: (currentState) => currentState.bakery,
                nextText: 48,
            },
            {
                text: async () => "Пойти на курсы от инфо-цыпана",
                requiredState: (currentState) => currentState.infocypan,
                nextText: 36,
            },
        ],
    },
    {
        id: 34,
        text: async () =>
            "Этим же вечером Реджи, надев свой лучший костюм и расчесав перышки, залетел по пути в цветочный и радостно прискакал на набережную.",
        image: "location17.jpg",
        player_image: "player18.webp",
        options: [
            {
                text: async () => "Искать глазами Эми",
                nextText: 35,
            },
        ],
    },
    {
        id: 35,
        text: async () =>
            "Увидев Эми, Реджи слегка застеснялся и покраснел. Пташки обнялись и побежали смотреть замечательный фильм под открытым небом. А после кино гугяли вдоль набережной до самого утра. Разлетаться им совсем не хотелось! Наступило утро.",
        image: "location17.jpg",
        player_image: "player19.webp",
        options: [
            {
                text: async () =>
                    "Поцеловать Эми и побежать на работу в булочную",
                requiredState: (currentState) => currentState.bakery,
                nextText: 48,
            },
            {
                text: async () =>
                    "Поцеловать Эми и побежать на курсы от инфо-цыпана",
                requiredState: (currentState) => currentState.infocypan,
                nextText: 36,
            },
            {
                text: async () =>
                    "Поцеловать Эми и полететь домой ботать и кодить",
                requiredState: (currentState) => currentState.stypendy,
                nextText: 55,
            },
            {
                text: async () => "Поцеловать Эми и полететь на работу",
                requiredState: (currentState) => currentState.taxi,
                nextText: 97,
            },
        ],
    },
    {
        id: 36,
        text: async () =>
            "Реджи приехал на виллу Скворца Сергея, главного бизнес-цыпана этого города, на семинар по марафону успеха. В конференц-зале собралось множество щебечущих птичек со всего города. Реджи занял свободное место на заднем ряду. Неожиданно в зале погас свет, заиграла торжественная музыка, и Скворец под громкие апплодисменты зашел в зал и встал у экрана.",
        image: "location18.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () => "Смотреть на экран",
                nextText: 37,
            },
        ],
    },
    {
        id: 37,
        text: async () =>
            "Начался семинар. Бизнес-цыпан включил свою презентацию и начал активно рассуждать об успехе путем вложения в различные ценные бумаги, а начать свою дорогу успеха он крайне рекоммендовал с покупки акций компании ЦыпПром уже сейчас. На слайдах появились воодушевляющие графики по динамике цен акций ЦыпПрома.",
        image: "location18.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () => "Внимательно изучить информацию по ЦыпПрому",
                nextText: 38,
            },
        ],
    },
    {
        id: 38,
        text: async () =>
            "Акции ЦыпПрома казались крайне притягательной инвестицией, исходя из информации на слайдах. Однако Реджи сильно сомневался. К птичкам стали подходить советники Скворца Сергея и настойчиво предлагать покупку акций. Началась суета.",
        image: "location18.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () =>
                    "Дождаться своей очереди и потратить последние деньги на покупку акций ПтицПрома",
                setState: { infocypan: false },
                nextText: 39,
            },
            {
                text: async () =>
                    "Встать и незаметно покинуть виллу, не покупая акции",
                setState: { infocypan: false },
                nextText: 40,
            },
            {
                text: async () =>
                    "В суете пробраться к компьютеру, скачать файлы с предыдущими презентациями и быстро покинуть виллу",
                nextText: 41,
            },
        ],
    },
    {
        id: 39,
        text: async () =>
            "Реджи вернулся домой, а через пару дней он узнал, что акции компании ПтицПрома обесценились, а инфоцыпан Скворец Сергей, применив мошенническую схему, оставил всех птичек с клювом. Доверяй после такого скворцам или сергеям, — подумал Реджи.",
        image: "location15.jpg",
        player_image: "player21.webp",
        options: [
            {
                text: async () =>
                    "Устроиться на подработку в булочную у университета",
                setState: { bakery: true },
                nextText: 48,
            },
            {
                text: async () =>
                    "Остаться жить на стипендии и не искать подработку",
                requiredState: (currentState) => currentState.stypendy,
                nextText: 55,
            },
        ],
    },
    {
        id: 40,
        text: async () =>
            "Реджи вернулся домой после марафона и задумался, что ему стоит делать дальше.",
        image: "location15.jpg",
        player_image: "player9.webp",
        options: [
            {
                text: async () =>
                    "Устроиться на подработку в булочную у университета",
                setState: { bakery: true },
                nextText: 48,
            },
            {
                text: async () =>
                    "Остаться жить на стипендии и не искать подработку",
                requiredState: (currentState) => currentState.stypendy,
                nextText: 55,
            },
        ],
    },
    {
        id: 41,
        text: async () =>
            "Вернувшись домой, Реджинальд начал изучать все презентации. Изучив историю всех рекомендованных ранее акций компаний, он смог разглядеть четкую мошенническую схему: рекоммендуя активно покупку или продажу определенных бумаг птенцам, Скворец Сергей зарабатывал миллионы со своим окружением. Однако доказать его обман в полиции было невозможно, поскольку главный прокурор Птицбурга птичка Юла Петра была соучастником.",
        image: "location15.jpg",
        player_image: "player9.webp",
        options: [
            {
                text: async () =>
                    "Использовать информацию про ПтицПром и отнять часть заработка у инфо-цыпана",
                nextText: 42,
            },
        ],
    },
    {
        id: 42,
        text: async () =>
            "Одну неделю спустя на счету Реджи лежало несколько миллионов. Ему предстояло сделать непростой выбор.",
        image: "location15.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () =>
                    "Забыть о всей этой истории и заняться подготовкой к сесии",
                setState: { infocypan: false },
                nextText: 55,
            },
            {
                text: async () =>
                    "Сходить еще на один семинар, чтобы тем же путем заработать еще денег и потратить их на открытие своего дела",
                nextText: 43,
            },
        ],
    },
    {
        id: 43,
        text: async () =>
            "Реджи под выдуманным именем зарегистрировался еще на один семинар, чтобы собрать необходимую информацию. Рядом с ним села компания молоденьких пташек. Реджи задумался.",
        image: "location15.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () =>
                    "Незаметно рассказать пташкам о мошенничестве",
                nextText: 44,
            },
            {
                text: async () => "Промолчать",
                nextText: 45,
            },
        ],
    },
    {
        id: 44,
        text: async () =>
            "Реджи рассказал птичкам о мошенничестве и покинул семинар. Через неделю он заработал необходимую сумму на открытие своего бизнеса.",
        image: "location15.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () =>
                    "Отчислиться из университета и открыть свой бизнес",
                nextText: 54,
            },
            {
                text: async () => "Попытаться без подготовки сдать сессию",
                nextText: c,
            },
        ],
    },
    {
        id: 45,
        text: async () =>
            "Реджи подслушал необходимую информацию и покинул семинар. Через неделю он заработал необходимую сумму на открытие своего бизнеса.",
        image: "location15.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () =>
                    "Отчислиться из университета и открыть свой бизнес",
                nextText: 54,
            },
            {
                text: async () => "Попытаться без подготовки сдать сессию",
                nextText: c,
            },
        ],
    },
    {
        id: 46,
        text: async () =>
            "Реджи провалил большую часть экзаменов, однако это был это допустимый максимум для пересдачи.",
        image: "location5.jpg",
        player_image: "player9.webp",
        options: [
            {
                text: async () =>
                    "Отчислиться из университета и открыть свой бизнес",
                nextText: 54,
            },
            {
                text: async () =>
                    "Потратить все заработанное на курсы по подготовке и пересдать все в следующем семестре",
                nextText: 56,
            },
        ],
    },
    {
        id: 47,
        text: async () => "Реджи провалил почти все экзамены и был отчислен.",
        image: "location6.jpg",
        player_image: "player9.webp",
        options: [
            {
                text: async () => "Открыть свой бизнес",
                nextText: 54,
            },
            {
                text: async () =>
                    "Отказаться от жизни в Птицбурге и улететь в родное гнездо",
                nextText: 15,
            },
        ],
    },
    {
        id: 48,
        text: async () =>
            "Реджи ранним утром пришел в булочную и приступил к работе, ему нужно было испечь множество булочек и батонов до открытия кафе. Он начал потихоньку замешивать тесто.",
        image: "location14.jpg",
        player_image: "player22.webp",
        options: [
            {
                text: async () => "Добавить щепотку любви",
                nextText: 49,
            },
        ],
    },
    {
        id: 49,
        text: async () =>
            "Реджинальд полетел в кладовку за мешком муки. У входа в нее на полу он увидел голубиные следы, хммм, странно. Он хотел проследовать по ним, но неожиданно кто-то постучался во входную дверь.",
        image: "location14.jpg",
        player_image: "player22.webp",
        options: [
            {
                text: async () => "Пойти посмотреть кто стучит",
                nextText: 50,
            },
        ],
    },
    {
        id: 50,
        text: async () =>
            "У двери Реджи увидел Арчи. «Что ты тут делаешь, Арчи?» — «А я тебе еще не говорил? Теперь эта булочная моя! Совсем недавно ее купил.» — «Но как? Где ты столько заработал?» — «Да там, долгая история. А ты здесь работаешь?» — «Да» — «А хочешь стать менеджером?»",
        image: "location14.jpg",
        player_image: "player2.webp",
        options: [
            {
                text: async () => "Продолжить работу на кухне",
                nextText: 51,
            },
            {
                text: async () => "Согласиться стать менеджером",
                nextText: 51,
            },
        ],
    },
    {
        id: 51,
        text: async () =>
            "Реджи продолжал много работать в булочной и параллельно учиться. Последние дни он очень активно зубрил все к предстоящей сессии.",
        image: "location15.jpg",
        player_image: "player8.webp",
        options: [
            {
                text: async () => "Лететь на сессию",
                nextText: 52,
            },
        ],
    },
    {
        id: 52,
        text: async () =>
            "Реджинальд закрыл всю сессию на отлично и был номинирован на студент года! Профессор Пауль порекоммендовал его и Эми на стажировку в ВКурятнике.",
        image: "location5.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () => "Ураааааа! Бежать на стажировку!",
                nextText: 53,
            },
        ],
    },
    {
        id: 53,
        text: async () =>
            "Спустя несколько птичьих лет. Реджинальд выпустился с красным дипломом из Птицбургского Государственного Университета и получил очередное повышение в ВКурятнике.",
        image: "location5.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () => "Пойти на работу",
                nextText: 71,
            },
        ],
    },
    {
        id: 54,
        text: async () =>
            "Реджи решил использовать приобретенные навыки анализы рынка и открыть свою маленькую трейдинговую компанию! Он снял небольшое помещение недалеко от ПтицБиржи и принялся за написание алгоритмических стратегий. В процессе Реджи задумался, может ему удастся угадывать динамику рынка без помощи компьютера. Он посмотрел на супер положительную динамику акций ВКурятнике.",
        image: "location7.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () => "Купить акции ВКурятнике",
                nextText: d,
            },
            {
                text: async () => "Не покупать акции ВКурятнике",
                nextText: e,
            },
        ],
    },
    {
        id: 55,
        text: async () =>
            "Реджинальд отчаянно кодил и ботал долгое время! И теперь готов покорить сессию!",
        image: "location15.jpg",
        player_image: "player8.webp",
        options: [
            {
                text: async () => "Лететь на сессию!",
                nextText: 52,
            },
        ],
    },
    {
        id: 56,
        text: async () =>
            "Реджи долго и упорно корпел над учебой! И благодаря своей целеустремленности смог пересдать сессию и впоследствии заполучить звание студент года! Он долго и упорно проходил собеседования и получил долгожданное приглашение на стажировку ВКурятнике!",
        image: "location15.jpg",
        player_image: "player8.webp",
        options: [
            {
                text: async () => "Лететь на стажировку!",
                nextText: 53,
            },
        ],
    },
    {
        id: 57,
        text: async () =>
            "Рынок непредсказуем, но Реджи повезло и он смог заработать на акциях ВКурятнике. Однако он был мудрым птицем и не стал считать удачное стечение обстоятельств подходящей стратегией, поэтому продолжил писать алго-стратегии.",
        image: "location7.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () => "Кодить стратегии!",
                nextText: 61,
            },
        ],
    },
    {
        id: 58,
        text: async () =>
            "Рынок непредсказуем, и Реджи потерял на акциях ВКурятнике. Однако он был мудрым птицем и не стал отчаиваться, поэтому продолжил писать алго-стратегии.",
        image: "location7.jpg",
        player_image: "player21.webp",
        options: [
            {
                text: async () => "Кодить стратегии!",
                nextText: 61,
            },
        ],
    },
    {
        id: 59,
        text: async () =>
            "Рынок непредсказуем, акции ВКурятнике сильно выросли в цене, и Реджи потерял возможную прибыль. Однако он был мудрым птицем и не стал отчаиваться, поэтому продолжил писать алго-стратегии.",
        image: "location7.jpg",
        player_image: "player21.webp",
        options: [
            {
                text: async () => "Кодить стратегии!",
                nextText: 61,
            },
        ],
    },
    {
        id: 60,
        text: async () =>
            "Рынок непредсказуем, и акции ВКурятнике сильно упали. Реджи чудом отказался от вкладывания своих средств в них. Однако он был мудрым птицем и не стал считать удачное стечение обстоятельств подходящей стратегией, поэтому продолжил писать алго-стратегии.",
        image: "location7.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () => "Кодить стратегии!",
                nextText: 61,
            },
        ],
    },
    {
        id: 61,
        text: async () =>
            "Спустя несколько лет Реджи сколотил огромное состояние и решил купить собственную виллу! В пути на просмотр дома он решил позвонить своим друзьям и позвать их с собой!",
        image: "location8.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () => "Позвонить Арчи!",
                nextText: 62,
            },
        ],
    },
    {
        id: 62,
        text: async () =>
            "Трубку взял крайне обеспокоенный Арчи, он извинился и сказал, что не сможет сейчас никуда подъехать. Реджи заволновался и спросил «Арчи, все в порядке?» — «Нет, мне стыдно признаться, но нет, я задолжал очень большную сумму, я должен 20 миллионов. И я не знаю, где их достать»",
        image: "location8.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () =>
                    "«Кому ты задолжал, Арчи? Может надо пойти в полицию?»",
                nextText: 63,
            },
        ],
    },
    {
        id: 63,
        text: async () =>
            "«Нет, только не полиция! Это будет конец» Реджи некоторое время подумал. «Хорошо, давай я одолжу тебе эту сумму» — «Ты серьезно?» — «Абсолютно, сейчас все переведу, а ты обязательно приезжай в гости» — «Да, конечно, Реджи, спасибо, ты спас мне жизнь»",
        image: "location8.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () => "Перевести деньги Арчи",
                requiredState: (currentState) => currentState.Amyhate,
                nextText: 65,
            },
            {
                text: async () =>
                    "Перевести деньги Арчи и позвонить пригласить Эми",
                requiredState: (currentState) => currentState.Amyfriend,
                nextText: 64,
            },
        ],
    },
    {
        id: 64,
        text: async () =>
            "Эми с Реджи выбрали прекрасную виллу, после чего Реджи ее купил! Они быстро накрыли стол и стали ждать Арчи!",
        image: "location9.jpg",
        player_image: "player23.webp",
        options: [
            {
                text: async () => "Ждать Арчи",
                nextText: 66,
            },
        ],
    },
    {
        id: 65,
        text: async () =>
            "Реджи выбрал прекрасную виллу, после чего ее купил! Он быстро накрыл стол и стал ждать Арчи!",
        image: "location9.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () => "Ждать Арчи",
                nextText: 66,
            },
        ],
    },
    {
        id: 66,
        text: async () =>
            "Раздался звонок в дверь: Реджи встретил улыбающегося Арчи. И весь оставшийся вечер прошел под гул музыки, звон бокалов и радостных возгласов в честь покупки первой недвижимости!",
        image: "location9.jpg",
        player_image: "player24.webp",
        options: [
            {
                text: async () => "Праздновать до самого утра",
                nextText: 67,
            },
        ],
    },
    {
        id: 67,
        text: async () =>
            "С утра Реджи проснулся с улыбкой, несмотря на головную боль. Неожиданно раздался звонок. Обеспокоенный Реджи поднял трубку. «Реджинальд, вас беспокоит налоговая. Мы видим несоответствие, хотим пригласить вас на разговор»",
        image: "location9.jpg",
        player_image: "player9.webp",
        options: [
            {
                text: async () =>
                    "Поехать в налоговую и уплатить все просроченные налоги",
                requiredState: (currentState) => currentState.Amyhate,
                nextText: 69,
            },
            {
                text: async () =>
                    "Поехать в налоговую и уплатить все просроченные налоги",
                requiredState: (currentState) => currentState.Amyfriend,
                nextText: 70,
            },
            {
                text: async () => "Уклониться от уплаты налогов",
                nextText: 68,
            },
        ],
    },
    {
        id: 68,
        text: async () => {
            const response = await fetch(
                "https://birdtown-studios.akho.name/visits",
                {
                    method: "POST",
                    body: JSON.stringify("game_over_2"),
                },
            );
            const json = await response.json();
            return `GAME OVER! За неуплату налогов Реджи посадили в тюрьму! Вы ${json}я птичка, прилетевшая на эту веточку Game Over!`;
        },
        image: "location19.jpg",
        player_image: "player0.webp",
        options: [
            {
                text: async () => "Начать заново!",
                nextText: -1,
            },
        ],
    },
    {
        id: 69,
        text: async () => {
            const response = await fetch(
                "https://birdtown-studios.akho.name/visits",
                {
                    method: "POST",
                    body: JSON.stringify("game_over_3"),
                },
            );
            const json = await response.json();
            return `GAME OVER! Реджи честным образом заработал огромное состояние и стал самым успешным птицем в Птицбурге! Про него была написана книга «Крылья успеха», однако кроме Арчи в его жизни так и не появились значимые птички. Вы ${json}я птичка, прилетевшая на эту веточку Game Over!`;
        },
        image: "location9.jpg",
        player_image: "player25.webp",
        options: [
            {
                text: async () => "Начать заново!",
                nextText: -1,
            },
        ],
    },
    {
        id: 70,
        text: async () => {
            const response = await fetch(
                "https://birdtown-studios.akho.name/visits",
                {
                    method: "POST",
                    body: JSON.stringify("game_over_4"),
                },
            );
            const json = await response.json();
            return `GAME OVER! Реджи честным образом заработал огромное состояние и стал самым успешным птицем в Птицбурге! Про него была написана книга «Крылья успеха», Арчи и Эми поддерживали его во всех его начинаниях! Вы ${json}я птичка, прилетевшая на эту веточку Game Over!`;
        },
        image: "location9.jpg",
        player_image: "player25.webp",
        options: [
            {
                text: async () => "Начать заново!",
                nextText: -1,
            },
        ],
    },
    {
        id: 71,
        text: async () =>
            "Реджи и Эми вышли на должность senior программистов ВКурятнике и приступили к разработке встроенных птичьих игр.",
        image: "location20.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () => "Упорно работать",
                nextText: 72,
            },
        ],
    },
    {
        id: 72,
        text: async () =>
            "Неожиданно раздался звонок от Арчи. «Реджи, Реджи, я в огромной беде, я задолжал 20 миллионов. Помоги мне, пожалуйста» — «Арчи, у меня нет такой суммы, что можно сделать еще?» — «Не знаю». Звонок оборвался. На работе сегодня была очень важная презентация. Реджи знал, если он не пойдет туда, его сразу уволят.",
        image: "location20.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () =>
                    "Попросить Эми прикрыть на работе и побежать искать Арчи",
                requiredState: (currentState) => currentState.Amyfriend,
                nextText: 74,
            },
            {
                text: async () => "Уволиться с работы и побежать искать Арчи",
                setState: { nojob: true },
                nextText: 74,
            },
            {
                text: async () => "Сохранить работу и забить на судьбу Арчи",
                nextText: 73,
            },
        ],
    },
    {
        id: 73,
        text: async () => {
            const response = await fetch(
                "https://birdtown-studios.akho.name/visits",
                {
                    method: "POST",
                    body: JSON.stringify("game_over_5"),
                },
            );
            const json = await response.json();
            return `GAME OVER! Спутя некоторое время Реджи поднялся до владельца компании ВКурятнике и, заработав огромную сумму, вошел в топ-5 самых успешных птиц! Однако он был очень одинок! Вы ${json}я птичка, прилетевшая на эту веточку Game Over!`;
        },
        image: "location20.jpg",
        player_image: "player21.webp",
        options: [
            {
                text: async () => "Начать заново!",
                nextText: -1,
            },
        ],
    },
    {
        id: 74,
        text: async () =>
            "Встревоженный Реджи прибежал в дом Арчи. Дома никого не было. Он начал искать повсюду подсказки. Неожиданно раздался звонок в дверь.",
        image: "location21.jpg",
        player_image: "player9.webp",
        options: [
            {
                text: async () => "Открыть дверь",
                nextText: 75,
            },
        ],
    },
    {
        id: 75,
        text: async () =>
            "У двери стоял бегемот. «А вы кто?» — «А вы кто?» — «Я Персик, детектив, хочу увидеть Арчибальда» — «Я Реджинальд, друг Арчибальда, Арчи пропал» — «Хммм, дело осложняется» — «О чем вы?» — «Нам лучше зайти внутрь и поговорить наедине»",
        image: "location21.jpg",
        player_image: "player26.webp",
        options: [
            {
                text: async () =>
                    "«Да, конечно». Впустить детектива Персика внутрь",
                nextText: 76,
            },
        ],
    },
    {
        id: 76,
        text: async () =>
            "«Не хочу вас пугать, Реджинальд, но дела плохи» — «Что с Арчи?» — «Он попал не в ту компанию. Я надеялся решить эту проблему через полицию, однако мне дали понять, что это невозможно.»",
        image: "location21.jpg",
        player_image: "player27.webp",
        options: [
            {
                text: async () =>
                    "«Что? О чем вы говорите? А вы не из полиции? Вы же детектив!»",
                nextText: 77,
            },
        ],
    },
    {
        id: 77,
        text: async () =>
            "«Уже нет, я частный детектив. Арчибальд нанял меня, почуяв неладное. Он знал, что в Птицбурге и Океанвилле нет смысла искать спасения. Поэтому позвонил мне.» — «Океанвилль? Он здесь при чем? Это просто городок рядом» — «Для обывателей да, но некоторые их жители пустили свои щупальца в Птицбург. Но это совсемя другая история»",
        image: "location21.jpg",
        player_image: "player27.webp",
        options: [
            {
                text: async () => "«Это все неважно! Как спасти Арчи?»",
                nextText: 78,
            },
        ],
    },
    {
        id: 78,
        text: async () =>
            "«Арчибальд недавно приобрел булочную недалеко от Птицбургского Государственного Университета, деньги на нее он взял, к сожалению, не в банке, а у одного авторитета» — «О господи» — «Да, полагаю возникили проблемы. Нам нужно замаскироваться и пробраться в булочную»",
        image: "location21.jpg",
        player_image: "player27.webp",
        options: [
            {
                text: async () => "Замаскироваться вместе с детективом",
                nextText: 79,
            },
        ],
    },
    {
        id: 79,
        text: async () =>
            "Ночью Персик и Реджи пробрались в булочную. Весь пол был усыпан голубиными перьями. По спине Реджи пробежал холодок. Детектив: «Следы свежие, они были здесь совсем недавно, мы еще можем успеть»",
        image: "location14.jpg",
        player_image: "player28.webp",
        options: [
            {
                text: async () => "Бежать за Персиком",
                nextText: 80,
            },
        ],
    },
    {
        id: 80,
        text: async () =>
            "Персик и Реджи выбежали на улицу через черный ход и направились к улице. Неожиданно в районе мусорки послышалось шуршание. Детектив, достав пистолет, направился к контейнерам. Персик крикнул: «Выходи с поднятыми руками». Шорох усилился, мешки с мусором зашевелились, и перед Персик и Реджи неожиданно возник...",
        image: "location22.jpg",
        player_image: "player28.webp",
        options: [
            {
                text: async () => "Нервно сглотнуть",
                nextText: 81,
            },
        ],
    },
    {
        id: 81,
        text: async () =>
            "«Арчи!Ты жив!» — «Да, Реджи, жив, но ненадолго, я влез в такую авантюру. Добрый вечер, детектив!» Персик неопределенно хмыкнул и сказал «Главное — вы живы, насчет остального: я все проверил, к сожалению, решить эту ситуацию в вашу пользу не получится». Арчи грустно вздохнул «Я понял, детектив, спасибо вам за все! Дальше мы сами» Персик кивнул, попрощался и ушел.",
        image: "location22.jpg",
        player_image: "player30.webp",
        options: [
            {
                text: async () => "Подойти к Арчи",
                nextText: 82,
            },
        ],
    },
    {
        id: 82,
        text: async () =>
            "«Арчи!» — «Боюсь, Реджи, мне придется покинуть город. Я неудачно провел одну бизнес-операцию с голубем Валентином и теперь мне нужно возместить ему потери, 20 миллионов» — «Откуда такая сумма?» — «Я должен был ему долю булочек по вечерам, но я все распродал и пришлось отдать ему плесневелые батоны»",
        image: "location22.jpg",
        player_image: "player29.webp",
        options: [
            {
                text: async () => "Уронить клюв от удивления",
                nextText: 83,
            },
        ],
    },
    {
        id: 83,
        text: async () =>
            "«Но я слышал, что голуби любят плесневелые батоны, они...наркоманы» — «Да, но в этот раз заказ был не для голубей, я сильно подставил Валентина. Делать нечего, либо деньги, либо срочно покинуть Птицбург, подождать пока все уляжется. Ты со мной, Реджи?»",
        image: "location22.jpg",
        player_image: "player29.webp",
        options: [
            {
                text: async () =>
                    "«Арчи, я слышал, что у моей подруги влиятельный и богатый отец. Может он одолжит нам деньги под процент»",
                requiredState: (currentState) => currentState.Amyfriend,
                nextText: 84,
            },
            {
                text: async () =>
                    "«Конечно, Арчи, лучше дома у тебя больше не появляться. Зайдем ко мне, соберем вещи и поедем. В ближайшее время в Птицбурге нам делать нечего.»",
                requiredState: (currentState) => currentState.Amyhate,
                nextText: 85,
            },
        ],
    },
    {
        id: 84,
        text: async () => {
            const response = await fetch(
                "https://birdtown-studios.akho.name/visits",
                {
                    method: "POST",
                    body: JSON.stringify("game_over_6"),
                },
            );
            const json = await response.json();
            return `GAME OVER! Отец Эми погасил долг Арчи, Арчи устроился на работу и выплачивал его частями. Спутя некоторое время Реджи поднялся до владельца компании ВКурятнике и заработал огромную сумму и вошел в топ-5 самых успешных птиц! Эми и Арчи всегда его во всем поддерживают! Вы ${json}я птичка, прилетевшая на эту веточку Game Over!`;
        },
        image: "location20.jpg",
        player_image: "player25.webp",
        options: [
            {
                text: async () => "Начать заново!",
                nextText: -1,
            },
        ],
    },
    {
        id: 85,
        text: async () => {
            const response = await fetch(
                "https://birdtown-studios.akho.name/visits",
                {
                    method: "POST",
                    body: JSON.stringify("game_over_7"),
                },
            );
            const json = await response.json();
            return `GAME OVER! ! Реджи с Арчи покинули Птицбург и начали промышлять разными небольшими подработками! Вы ${json}я птичка, прилетевшая на эту веточку Game Over!`;
        },
        image: "location23.jpg",
        player_image: "player24.webp",
        options: [
            {
                text: async () => "Начать заново!",
                nextText: -1,
            },
        ],
    },
    {
        id: 86,
        text: async () =>
            "Реджинальд устроился в ПтицТакси и начал работу. Первым клиентом оказался крайне взбалмошный, самовлюбленный Щегол по имени Святослав, который всю дорогу рассказывал о миллионе своих бизнесов и своем невероятном успехе. В какой-то момент он спросил Реджи про его работу.",
        image: "location29.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () =>
                    "Сказать «Вообще я тоже бизнесмен, а такси это так, для души»",
                nextText: 87,
            },
        ],
    },
    {
        id: 87,
        text: async () =>
            "Реджинальд высадил в конечной точке клиента и поехал в сторону дома. Неожиданно ему пришел заказ, и появилась необходимость развернуться. Можно ли выполнить тут разворот?",
        image: "location25.JPG",
        player_image: "player1.webp",
        options: [
            {
                text: async () => "Можно",
                nextText: f,
            },
            {
                text: async () => "Можно, но только по траектории А",
                nextText: f,
            },
            {
                text: async () => "Можно, но только по траектории Б",
                nextText: f,
            },
            {
                text: async () => "Нельзя",
                nextText: 90,
            },
        ],
    },
    {
        id: 88,
        text: async () =>
            "Реджи нарушил правила, его сразу остановили птицы автоинспекции и оштрафовали. Реджи решил повторить все правила дорожного движения, чтобы больше не попадать в такие ситуации!",
        image: "location29.jpg",
        player_image: "player9.webp",
        options: [
            {
                text: async () =>
                    "Повторить правила дорожного движения и продолжить работу!",
                nextText: 91,
            },
        ],
    },
    {
        id: 89,
        text: async () =>
            "Реджи нарушил правила, однако, к счастью, птицы автоинспекции не заметили этого и не оштрафовали бедняжку. Реджи решил повторить все правила дорожного движения, чтобы больше не попадать в такие ситуации!",
        image: "location29.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () =>
                    "Повторить правила дорожного движения и продолжить работу!",
                nextText: 91,
            },
        ],
    },
    {
        id: 90,
        text: async () =>
            "Реджи хорошо знал правила дорожного движения, поэтому не стал разворачиваться в этом месте! Какой умный птиц!",
        image: "location29.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () => "Продолжить работу!",
                nextText: 91,
            },
        ],
    },
    {
        id: 91,
        text: async () =>
            "Реджи работал в такси уже некоторое время, он смог выплатить Арчи свой долг и начал копить на курсы по программированию. Однажды поздно вечером ему пришел новый заказ. Его клиентом оказалась милая птичка по имени Эми.",
        image: "location26.jpg",
        player_image: "player23.webp",
        options: [
            {
                text: async () => "Подвезти девушку",
                nextText: 92,
            },
        ],
    },
    {
        id: 92,
        text: async () =>
            "Реджи и Эми мило пообщались в пути, она ему очень понравилась. Он подвез ее к дому и попрощался. Эми вышла из машины и направилась к подъезду.",
        image: "location26.jpg",
        player_image: "player23.webp",
        options: [
            {
                text: async () =>
                    "Нажать в приложении ПтицТакси «Окончание заказа»",
                nextText: 93,
            },
        ],
    },
    {
        id: 93,
        text: async () =>
            "Неожиданно прямо у подъезда на Эми напали гоп-голуби, они хотели украсть ее сумочку. Эми отчаянно сопротивлялась и кричала.",
        image: "location27.jpg",
        player_image: "player17.webp",
        options: [
            {
                text: async () => "Выйти из машины и побежать спасать Эми",
                setState: { Amyfriend: true },
                nextText: 94,
            },
            {
                text: async () => "Быстро уехать",
                setState: { Amyhate: true },
                nextText: 97,
            },
        ],
    },
    {
        id: 94,
        text: async () =>
            "Реджи побежал спасать Эми. Он изо всех своих птичьих сил дрался с гоп-голубями, однако все равно был сильно избит. Эми пригласила его в дом, чтобы обработать его раны. «Огромное спасибо тебе, птиц! Ты спас мне жизнь»",
        image: "location27.jpg",
        player_image: "player23.webp",
        options: [
            {
                text: async () =>
                    "Глупо улыбаться, несмотря на боль во всем теле",
                nextText: 95,
            },
        ],
    },
    {
        id: 95,
        text: async () =>
            "Реджи рассказал Эми о том, что почти накопил на курсы программиста и собирается пойти работать в IT-компанию. Эми похвалила его начинания и сказала, что она работает middle программистом ВКурятнике и скоро ее ждет повышение. Она пообещала, что как только Реджи закончит курсы, она сразу его порекоммендует в команду.",
        image: "location28.jpg",
        player_image: "player23.webp",
        options: [
            {
                text: async () => "Поблагодарить Эми и попросить чай",
                nextText: 96,
            },
        ],
    },
    {
        id: 96,
        text: async () =>
            "Напоив Реджи чаем, Эми оставила его спать на диване. А с утра, провожая его, сказала: «Не хочу выглядеть чрезмерно настойчивой, но хотела бы вознаградить моего героя и позвать тебя на летнее кино на набережной сегодня. Только если ты хочешь»",
        image: "location28.jpg",
        player_image: "player23.webp",
        options: [
            {
                text: async () => "«С большим удовольствием, Эми, до вечера!»",
                nextText: 34,
            },
            {
                text: async () => "«Извини, я не смогу! Очень много работы»",
                nextText: 97,
            },
        ],
    },
    {
        id: 97,
        text: async () =>
            "Реджи продолжал активно работать таксистом и накопил нужную сумму для курсов по программированию. Уже сегодня он собирался внести оплату за обучение! Неожиданно ему поступил новый заказ.",
        image: "location29.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () => "Взять заказ",
                nextText: 98,
            },
        ],
    },
    {
        id: 98,
        text: async () =>
            "В машину к Реджи сели два очень тревожных птица. Одному из них было очень плохо. Реджи узнал его, это был знаменитый гонщик Формулы 1, Орел Михаэль Бердмахер. Он крикнул «В больницу! Умоляю! Быстрее» Второй птиц похлопал Реджи по плечу и сказал «Любые деньги, только быстрее, у него разорвался птиц аппендикс»",
        image: "location29.jpg",
        player_image: "player9.webp",
        options: [
            {
                text: async () => "Гнать в больницу",
                nextText: 99,
            },
        ],
    },
    {
        id: 99,
        text: async () =>
            "Реджи с огромной скоростью вез бедного птица в больницу и все-таки успел! Жизнь знаменитого гонщика была вне опасности. Второй птиц подошел к Реджи: «Спасибо тебе, даже не знаю как тебя отблагодарить, я менеджер Бердмахера, ты спас его жизнь. Я знаю, что не вправе просить тебя о чем-то большем, но все же, хочу попробовать»",
        image: "location30.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () => "«Что-то не так?»",
                nextText: 100,
            },
        ],
    },
    {
        id: 100,
        text: async () =>
            "«Михаэль нескоро придет в себя, а завтра гонка. Я видел, как ты водишь, ты очень крутой птиц. Я хочу предложить тебе работу! Ты согласен?»",
        image: "location30.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () =>
                    "Отказаться и пойти по намеченному пути: курсы программиста и рекоммендации Эми",
                requiredState: (currentState) => currentState.Amyfriend,
                nextText: 101,
            },
            {
                text: async () => "Согласиться стать гонщиком!",
                nextText: 102,
            },
        ],
    },
    {
        id: 101,
        text: async () =>
            "Реджинальд отказался от возможности стать гонщиком и этим же вечером поступил на курсы программиста. Отучившись с невероятным успехом, он натренировался для собеседований и, воспользовавшись рекоммендации Эми, заполучил сразу высокую должность ВКурятнике.",
        image: "location15.jpg",
        player_image: "player8.webp",
        options: [
            {
                text: async () => "Пойти на работу!",
                nextText: 71,
            },
        ],
    },
    {
        id: 102,
        text: async () =>
            "Реджинальд согласился на эту невероятно авантюрную затею и на следующий день пришел на стадион.",
        image: "location31.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () => "Нервничать перед гонкой",
                nextText: 103,
            },
        ],
    },
    {
        id: 103,
        text: async () =>
            "Несмотря на огромное волнение, Реджи смог выиграть в гонке и получил свой первый гонорар! С ним сразу подписали контракт! Счастливый Реджи направлялся домой, как раздался телефонный звонок от Арчи.",
        image: "location31.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () => "Взять трубку",
                nextText: 104,
            },
        ],
    },
    {
        id: 104,
        text: async () =>
            "«Реджи, мне стыдно признаться, но я в огромной беде, только не говори полиции. Я должен 20 миллионов страшному птицу. Это конец» — «Арчи, объясни что случилось» — «Это не телефонный разговор, наверное, мне надо уехать из города» — «Я дам тебе эти деньги, сегодня же вечером встретимся» — «О боже, Реджи, ты спас мою жизнь»",
        image: "location31.jpg",
        player_image: "player1.webp",
        options: [
            {
                text: async () =>
                    "Перевести Арчи весь заработанный гонорар и встретиться с ним вечером",
                nextText: 105,
            },
        ],
    },
    {
        id: 105,
        text: async () =>
            "Реджи встретился дома у Арчи этим же вечером. И Арчи слезно поблагодарив друга, все ему рассказал: как занял деньги у голубя Валентина на булочную, как совершил ошибку, как благодаря Реджи смог спасти свои перышки и решил завязать с преступным миром. Реджи задумался.«Арчи, а ты не хочешь стать моим менеджером? Я теперь гонщик» — «Правда? Я с огромным удовольствием»",
        image: "location21.jpg",
        player_image: "player24.webp",
        options: [
            {
                text: async () => "Стать великим гонщиком",
                requiredState: (currentState) => currentState.Amyfriend,
                nextText: 106,
            },
            {
                text: async () => "Стать великим гонщиком",
                requiredState: (currentState) => currentState.Amyhate,
                nextText: 107,
            },
        ],
    },
    {
        id: 106,
        text: async () => {
            const response = await fetch(
                "https://birdtown-studios.akho.name/visits",
                {
                    method: "POST",
                    body: JSON.stringify("game_over_8"),
                },
            );
            const json = await response.json();
            return `GAME OVER! Реджи стал самым знаменитым гонщиком Формулы 1 и стал несметно богат и популярен! Арчи и Эми навсегда остались в его жизни! Вы ${json}я птичка, прилетевшая на эту веточку Game Over!`;
        },
        image: "location31.jpg",
        player_image: "player25.webp",
        options: [
            {
                text: async () => "Начать заново!",
                nextText: -1,
            },
        ],
    },
    {
        id: 107,
        text: async () => {
            const response = await fetch(
                "https://birdtown-studios.akho.name/visits",
                {
                    method: "POST",
                    body: JSON.stringify("game_over_9"),
                },
            );
            const json = await response.json();
            return `GAME OVER! Реджи стал самым знаменитым гонщиком Формулы 1 и стал несметно богат и популярен! Арчи был с ним всегда! Однако свою единственную птичку Реджи так и не встретил! Вы ${json}я птичка, прилетевшая на эту веточку Game Over!`;
        },
        image: "location31.jpg",
        player_image: "player31.webp",
        options: [
            {
                text: async () => "Начать заново!",
                nextText: -1,
            },
        ],
    },
    {
        id: 108,
        text: async () =>
            "Реджи и Арчи отправились в клуб «Пташка», чтобы получить задание от Валентина. Валентин, внимательно осмотрев птичек, приказал им сесть рядом и начал свой рассказ. «Я думаю, ни для кого здесь не секрет, что голуби держут большую часть преступного мира Птицбурга, однако недавно у нас появились конкуренты»",
        image: "location4.jpg",
        player_image: "player7.webp",
        options: [
            {
                text: async () => "Кивнуть с серьезным видом",
                nextText: 109,
            },
        ],
    },
    {
        id: 109,
        text: async () =>
            "Валентин продолжал «Есть много разных бизнесов, которые я не собираюсь прибирать к своим крыльям, но есть те, поводья которых я предпочитаю держать крепко-накрепко» Окружающие его голуби загоготали, видимо, любое высказывание Валентина автоматически казалось им остроумным.",
        image: "location4.jpg",
        player_image: "player6.webp",
        options: [
            {
                text: async () =>
                    "«О каком бизнесе мы говорим сейчас?» Спросил Реджи",
                nextText: 110,
            },
        ],
    },
    {
        id: 110,
        text: async () =>
            "«Сразу к делу, мне нравится твой подход, птиц. Меня интересует семечковый бизнес. Я раньше контролировал поставки семечек в Птицбург, но с недавних пор, ни один из моих поставщиков не хочет со мной сотрудничать. Есть кто-то, кого они сильно боятся. И я хочу узнать кто это. Я бы отправил своих ребят, но вы сами видите: интеллект и аккуратность — это не их сильаня сторона»",
        image: "location4.jpg",
        player_image: "player6.webp",
        options: [
            {
                text: async () => "«С чего начать?»",
                nextText: 111,
            },
        ],
    },
    {
        id: 111,
        text: async () =>
            "«Последняя зацепка находится в Океанвилле, скат по имени Скотт имел неосторожность проиграть мне в карты один документ. Отдал он его не сразу, но Арчибальд с этим делом помог. Это для начала. Я хочу, чтобы вы узнали, кто за всем этим делом стоит и назвали мне его имя.»",
        image: "location4.jpg",
        player_image: "player7.webp",
        options: [
            {
                text: async () => "«Все понятно, Валентин! Тогда мы пойдем»",
                nextText: 112,
            },
        ],
    },
    {
        id: 112,
        text: async () =>
            "«Что будем делать, Реджи?» — «Для начала изучим документ Скотта, а оттуда будем двигаться» — «Логично, что ж, пойдем ко мне домой, документы лежат там»",
        image: "location13.jpg",
        player_image: "player24.webp",
        options: [
            {
                text: async () => "Пойти домой к Арчи",
                nextText: 113,
            },
        ],
    },
    {
        id: 113,
        text: async () =>
            "Открыв конверт, пташки обнаружили в нем записку и одну фотографию. На фотографии была изображена красивая птичка. На записке же был написан номер и фраза «его дочь». «Хмм, Реджи, что бы это значило? Чья дочь? Ты знаешь эту птичку?» — «Нет, но она пока наша единственная ниточка. Боюсь, если мы напрямую ей позвоним, мы можем ее спугнуть» — «Давай пробьем ее в птицаграмме»",
        image: "location21.jpg",
        player_image: "player24.webp",
        options: [
            {
                text: async () => "Пробить Эми по соцсетям",
                nextText: 114,
            },
        ],
    },
    {
        id: 114,
        text: async () =>
            "Проверив ее соцсети, птенчики так ничего и не нашли. «Вроде просто красивая пташка, учится в Птицбургском Государственном Университете, ничего непонятно» — «Судя по записке, нам нужен ее отец, а не она сама» — «Что делать?» — «Может попробуем поймать ее у университета?» — «Давай»",
        image: "location21.jpg",
        player_image: "player24.webp",
        options: [
            {
                text: async () => "Поймать Эми у университета",
                nextText: 115,
            },
        ],
    },
    {
        id: 115,
        text: async () =>
            "Реджи с Арчи встретиили Эми у университета и подошли познакомиться. Она оказалась очень приветливой, дружелюбной птичкой, дело становилось все запутаннее. Неожиданно Реджи пришла в голову идея: можно случайно проронить имя Валентина в диалоге и посмотреть на реакцию Эми. Эми замерла. «Валентин? Голубь Валентин?»",
        image: "location5.jpg",
        player_image: "player13.webp",
        options: [
            {
                text: async () => "«Да, ты его знаешь?»",
                nextText: 116,
            },
        ],
    },
    {
        id: 116,
        text: async () =>
            "«Слышала, а что? Вы его птички на привязи?» с подозрением спросила Эми. Реджи вздохнул «Можно и так сказать, мы никакого зла тебя не желаем, ты не подумай, мы просто кое-кого ищем» — «Кого?» — «Сами не знаем» — «И почему я должна вам помогать?» — «Не знаю, глупо вышло, прости» — «Вы вроде неплохие птицы, зачем вы на него работаете?»",
        image: "location5.jpg",
        player_image: "player13.webp",
        options: [
            {
                text: async () => "«Деньги»",
                nextText: 117,
            },
        ],
    },
    {
        id: 117,
        text: async () =>
            "«Понятно, я не могу ничего обещать, но выслушать вас точно могу, однако не здесь, пойдемте в булочную, она тут рядом»",
        image: "location5.jpg",
        player_image: "player13.webp",
        options: [
            {
                text: async () => "Пойти в булочную",
                nextText: 118,
            },
        ],
    },
    {
        id: 118,
        text: async () =>
            "«А теперь давайте по порядку» Пташки рассказали Эми все. Она задумалась. «Получается, этот Скотт хотел через меня выйти на моего отца, хмм, и это все касается семечек. Прошу прощения, мне надо сделать телефонный звонок»",
        image: "location14.jpg",
        player_image: "player13.webp",
        options: [
            {
                text: async () => "Повернуться к Арчи",
                nextText: 119,
            },
        ],
    },
    {
        id: 119,
        text: async () =>
            "«Реджи,а вдруг она сейчас нас сдаст» — «Мне кажется, ей можно доверять» — «Я вижу, как ты на нее смотришь, ты влюбился, но, пожалуйста, включи разум, мы не знаем, кто она такая, а главное — кто ее отец» — «В этом ты прав, но отступать некуда»",
        image: "location14.jpg",
        player_image: "player24.webp",
        options: [
            {
                text: async () => "Ждать Эми",
                nextText: 120,
            },
        ],
    },
    {
        id: 120,
        text: async () =>
            "Неожиданно к булочной подъехад полностью затонированный джип. Эми вышла на улицу и села в него. Казалось, прошла целая вечность. Арчи: «Реджи, давай просто убежим через задний вход и уедем в другой город, я что-то боюсь»",
        image: "location32.jpg",
        player_image: "player24.webp",
        options: [
            {
                text: async () => "Незаметно убежать и уехать в другой город",
                nextText: 121,
            },
            {
                text: async () => "Ждать Эми",
                nextText: 122,
            },
        ],
    },
    {
        id: 121,
        text: async () =>
            "Реджи с Арчи незаметно выскользнули через черный ход булочной и галопом побежали домой собирать вещи!",
        image: "location22.jpg",
        player_image: "player24.webp",
        options: [
            {
                text: async () => "Покинуть Птицбург",
                nextText: 85,
            },
        ],
    },
    {
        id: 122,
        text: async () =>
            "Спустя некоторое время Эми вышла из машины и, снова зайдя в булочную, села рядом с ребятами. «Дела обстоят следующим образом, вам следует съездить в Океанвилль и вновь поговорить со Скоттом, он будет гораздо более разговорчив в этот раз» — «Спасибо, Эми» — «Пока не за что, я вот что вам скажу, я не советую работать вам на Валентина, он любит искажать факты и обманывать. Рано или поздно он вас подставит»",
        image: "location14.jpg",
        player_image: "player13.webp",
        options: [
            {
                text: async () =>
                    "Реджи тяжело вздохнул «Понятно, в любом случае спасибо, мы учтем твое предупреждение»",
                nextText: 123,
            },
        ],
    },
    {
        id: 123,
        text: async () =>
            "Эми кивнула и загадочно улыбнулась «Что ж, удачи вам, птенчики, думаю, мы еще увидимся» Реджинальд встал и в порыве чувств ее обнял «Ой, боже, прости, я просто очень благодарен» — «Ну ничего, ничего, все будет хорошо». Эми еще раз улыбнулась, вышла из булочной и села в джип.",
        image: "location14.jpg",
        player_image: "player23.webp",
        options: [
            {
                text: async () => "Поехать в Океанвилль",
                nextText: 124,
            },
        ],
    },
    {
        id: 124,
        text: async () =>
            "Скат по имени Скотт действительно в этот раз был очень разговорчив. «Вы, пташки, не подумайте ничего, я никого не хотел и не хочу обидеть. Я делаю только то, что мне велят. Я скажу вам все, вы ему так и передайте» — «Ему?» — «Ну да, Бескрылому, я не знал, что в конверте, не знал, что там фотография его дочери» — «Ммм» — «Я бы никогда не перешел ему дорогу, он самый влиятельный криминальный лорд на нашем континенте, да что там, в мире»",
        image: "location12.jpg",
        player_image: "player32.webp",
        options: [
            {
                text: async () => "Открыть клюв от удивления",
                nextText: 125,
            },
        ],
    },
    {
        id: 125,
        text: async () =>
            "«Так что? Вы ему все объясните?» — «Попробуем, а теперь к делу». Арчи с Реджи переглянулись, они и представить не могли, насколько сильно они увязли. «Так вот, мой бывший заказчик очень захотел долю в семечковом бизнесе, но это птичья территория, все знают, голубь Валентин всегда хотел ее держать при себе.» — «Кто твой бывший заказчик?» — «Обо всем по порядку, лучше присядьте»",
        image: "location12.jpg",
        player_image: "player32.webp",
        options: [
            {
                text: async () => "Присесть",
                nextText: 126,
            },
        ],
    },
    {
        id: 126,
        text: async () =>
            "«Он хотел семечковый бизнес, потому что это большие доходы и голубиная зависимость. Удачное сочетание. Он хотел договориться с Бескрылым, чтобы тот его .. хмм «взял под крыло», даже Валентин его боится. Но видимо что-то пошло не совсем по плану» — «Он не договорился?» — «Он не успел, он проник в Птицбург под прикрытием, и вероятно, потратил на все это слишком много времени, Валентин своим голубиным чутьем понял что что-то не так»",
        image: "location12.jpg",
        player_image: "player32.webp",
        options: [
            {
                text: async () => "«Продолжай»",
                nextText: 127,
            },
        ],
    },
    {
        id: 127,
        text: async () =>
            "«Остаток истории вы и так знаете, Валентин решил использовать мою слабость за карточным столом, он шулер, но я повелся и очень виноват. У меня была информация, которая должна была помочь моему заказчику выйти на Бескрылого, я должен был передать ему ее в тот день.» — «Кто твой заказчик?» — «В Птицбурге его знают как Пауль Джуниор, аспирант одного профессора в Птицбургском Государственном Университете»",
        image: "location12.jpg",
        player_image: "player32.webp",
        options: [
            {
                text: async () => "«Пауль Джуниор?»",
                nextText: 128,
            },
        ],
    },
    {
        id: 128,
        text: async () =>
            "«Да, вот его фото, не обманывайтесь его внешностью, это очень умный и опасный осьминог, он давно запустил свои щупальца в Птицбург» — «Понятно, Скотт, ты уверен, что тебя не тронут?» — «Да, у меня есть пара козырей в плавнике. Но вот что я вам скажу, пташки, исходя из своего опыта. В этом бизнесе есть только четыре пути: быть в чьей-то банде, иметь залог безопасности, уйти, пока еще есть время, или стать настоящим криминальным лордом. И Валентин не голубей в свою банду по-настоящему не принимает. Думайте сами»",
        image: "location12.jpg",
        player_image: "player33.webp",
        options: [
            {
                text: async () => "«Спасибо Скотт, прощай»",
                nextText: 129,
            },
        ],
    },
    {
        id: 129,
        text: async () =>
            "«Что думаешь, Арчи?» — «Что дело сделано, можно занять денег у Валетина и выкупить ту булочную у университета, уж очень она мне понравилась!» — «Нет, Арчи, это плохая идея, все они правы, работа на Валентина небезопасна. Мы завершим это дело и выйдем из его игры» — «А дальше что, Реджи? Уехать в никуда, все бросить?»",
        image: "location13.jpg",
        player_image: "player24.webp",
        options: [
            {
                text: async () => "Бросить все и покинуть Птицбург»",
                nextText: 85,
            },
            {
                text: async () =>
                    "Подняться с 0 и стать криминальными лордами Птицбурга",
                nextText: 130,
            },
        ],
    },
    {
        id: 130,
        text: async () => {
            const response = await fetch(
                "https://birdtown-studios.akho.name/visits",
                {
                    method: "POST",
                    body: JSON.stringify("game_over_10"),
                },
            );
            const json = await response.json();
            return `GAME OVER! Реджи и Арчи спустя много лет и испытаний смогли стать крайне значимым криминальными лордами. Сам Бескрылый с большим удовольствием вел с ними дела! Вы ${json}я птичка, прилетевшая на эту веточку Game Over!`;
        },
        image: "location1.jpg",
        player_image: "player31.webp",
        options: [
            {
                text: async () => "Начать заново!",
                nextText: -1,
            },
        ],
    },
];

startGame();
