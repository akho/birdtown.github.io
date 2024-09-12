const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const backgroundMusic = new Audio('music1.mp3')

var a = rand(11,12);
var b = rand(13,14);
var c = rand(46,47);

let state = {}

async function startGame() {
    state = {}
    await showTextNode(1)
}

function rand(min,max,interval)
{
    if (typeof(interval)==='undefined') interval = 1;
    var r = Math.floor(Math.random()*(max-min+interval)/interval);
    return r*interval+min;
}

async function showTextNode(textNodeIndex) {
    const textNode = TextNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = await textNode.text()
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    journey.src = textNode.image;
    player.src = textNode.player_image;

    for (const option of textNode.options) {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = await option.text()
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            backgroundMusic.play()
            backgroundMusic.volume = 0.5
            backgroundMusic.loop = true
            optionButtonsElement.appendChild(button)
        }
    }
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

async function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    await showTextNode(nextTextNodeId)
}

const TextNodes = [
    {id: 1,
        text: async () => `Добро пожаловать в игру "Птицбург"! На прохождение игры вам потребуется от 2 до 15 минут в зависимости от выбранного вами пути. У этой игры много концовок, поэтому крайне рекомендую пройти ее несколько раз по-разному!`,
        image: 'location0.jpg',
        player_image: 'player1.png',
        options:[
            {
                text: async () => 'Понятно!',
                nextText: 2
            }
        ]
     },
    {id: 2, 
        text: async () => 'Храбрый, крайне амбициозный птиц по имени Реджинальд приехал в город, дабы поступить в Птицбургский Государственный Университет имени М.В.Канарейкина на программиста!',
        image: 'location1.jpg',
        player_image: 'player1.png',
        options:[
            {
                text: async () => 'Начать игру!',
                nextText: 3              
            }
        ]
    },
    {id: 3,
        text: async () => 'Университет предоставил Реджи комнату на время сдачи вступительных испытаний. Реджинальд стал раскладывать свои птичьи вещички, как вдруг раздался стук в дверь. Наверное, это сосед по блоку.',
        image: 'location2.jpg',
        player_image: 'player1.png',
        options: [
            {
                text: async () => 'Открыть дверь',
                nextText: 4
            }
        ]
    },
    {id: 4, 
        text: async () => 'Открыв дверь, Реджи увидел улыбающегося, веселого фламинго по имени Арчибальд. Арчибальд: "Привет, привет! Меня зовут Арчи, я с философского факультета. Рад знакомству. А тебя как зовут?"',
        image: 'location2.jpg',
        player_image: 'player2.png',
        options: [
            {
                text: async () => '"Я Реджи, приехал поступать на программиста"',
                nextText:5
            }
        ]
    },
    {id:5,
        text: async () => '"Так ты совсем новичок в студенческой жизни! Ну ничего, бросай вещи и пойдем за мной, я отведу тебя в лучший птицклуб этого города!"',
        image: 'location2.jpg',
        player_image: 'player3.png',
        options: [
            {
                text: async () => 'Пойти с Арчи в клуб "Пташка"',
                nextText:6
            },
            {
                text: async () => 'Остаться и готовиться к вступительному экзамену',
                nextText: 10
            }
        ]
    },
    {id:6,
        text: async () => 'Арчи и Реджи приехали в клуб "Пташка" и начали свой птичий кутеж! Неожиданно Арчи наклонился к Реджи и прокричал ему на ухо "Видишь того птица? В VIP зоне?"',
        image: 'location3.jpg',
        player_image: 'player4.png',
        options: [
            {
                text: async () => 'Посмотреть на птица в VIP зоне',
                nextText:7
            }
        ]

    },
    {id:7,
        text: async () => 'Голубя? Ну да, вижу, а что с ним? - Это Валентин, глава Люберецкой голубиной группировки. Я его немного знаю, очень крутой птиц. Пойдем познакомлю!',
        image: 'location3.jpg',
        player_image: 'player5.png',
        options: [
            {
                text: async () => '"Давай! Почему нет!"',
                nextText: 8
            },
            {
                text: '"Нет, Арчи! Уже поздно, а у меня завтра экзамен, лучше в следующий раз. Я полечу". Реджи побежал в общагу!',
                nextText: 10
            }
        ]
    },
    {id:8,
        text: async () => 'Арчи и Реджи поднялись в VIP-зону. За столом сидели очень опасные голуби и оживленно вели беседу за картами. Во главе стола восседал Валентин. Валентин внимательно посмотрел на Арчи и Реджи и махнул крылом своей охране, чтобы пташек пропустили',
        image: 'location4.jpg',
        player_image: 'player6.png',
        options: [
            {
                text: async () => 'Подойти к Валентину',
                nextText: 9
            }
        ]        
    },
    {id:9,
        text: async () => 'Арчи и Реджи присоединились к голубиной компании и начали беседу. Спустя какое-то время Реджи посмотрел на часы и обомлел, 8 утра, надо срочно бежать на экзамен!',
        image: 'location4.jpg',
        player_image: 'player7.png',
        options:[
            {
                text: async () => 'Быстрее бежать на экзамен!',
                nextText: b
            }
        ]
    },
    {id:10,
        text: async () => 'Реджи еще раз осмотрел свою комнату, после чего сел за стол, достал учебники и углубился в чтение. Когда на часах пробило 3 часа ночи, Реджи задумался: лечь ли ему спать или продолжить заниматься до самого упора?',
        image: 'location2.jpg',
        player_image: 'player8.png',       
        options:[
            {
                text: async () => 'Ботать до самого утра',
                nextText: a
            },
            {
                text: async () => 'Выспаться перед экзаменом',
                nextText: a
            },           
        ]                
    },
    {id:11,
        text: async () => 'Реджи успешно сдал все экзамены и получил комнату в общежитии и стипендию!',
        image: 'location5.jpg',
        player_image: 'player1.png',
        options:[
            {
                text: async () => 'Ураааа! Лететь на пары!',
                setState: {stypendy: true},
                nextText: 25
            },
            {
                text: async () => 'Все равно хочу найти подработку!',
                nextText: 22
            }
        ]           
    },
    {id:12,
        text: async () => 'Реджи задремал из-за усталости во время экзамена и с трудом сумел набрать вступительный балл. Но этих баллов не хватило на комнату в общежитии, и теперь Реджи необходимо найти подработку для съема жилья!',
        image: 'location5.jpg',
        player_image: 'player1.png',
        options: [
            {
                text: async () => 'Искать подработку!',
                nextText: 22
            },
            {
                text: async () => 'Сдаться и вернуться в родной городок',
                nextText: -1
            }
        ]             
    },
    {id:13,
        text: async () => 'Реджи заснул на экзамене и провалил вступительные испытания в университет!',
        image: 'location6.jpg',
        player_image: 'player9.png',  
        options: [
            {
                text: async () => 'Отказаться от жизни в Птицбурге и вернуться в родное гнездо!',
                nextText: 15
            },
            {
                text: async () => 'Вернуться в клуб и попросить у голубя Валентина денег или работу!',
                nextText: 16
            },
            {
                text: async () => 'Встретиться с Арчибальдом на улице и попросить денег или работу!',
                nextText: 19               
            }
        ]           
    },
    {id:14,
        text: async () => 'Реджи не успел вовремя прийти на экзамен и провалил вступительные испытания в университет!',
        image: 'location6.jpg',
        player_image: 'player9.png', 
        options: [
            {
                text: async () => 'Отказаться от жизни в Птицбурге и вернуться в родное гнездо!',
                nextText: 15
            },
            {
                text: async () => 'Вернуться в клуб и попросить у голубя Валентина денег или работу!',
                nextText: 16
            },
            {
                text: async () => 'Встретиться с Арчибальдом на улице и попросить денег или работу!',
                nextText: 21              
            }
        ]              
    },
    {id:15,
        text: async () => {
            const response = await fetch("https://birdtown-visit-counter.akho.name/visits");
            const json = await response.json();
            return 'Реджи вернулся к своим родителям, отказавшись от мечты покорить Птицбург!';
        },
        image: 'location00.jpg',
        player_image: 'player0.png',
        options: [
            {
                text: async () =>'Начать заново!',
                nextText: -1
            }
        ]
    },
    {id:16,
        text: async () =>'Реджинальд вернулся в клуб "Пташка" и рассказал Валентину о своей ситуации. Валентин, внимательно выслушав, предложить дать Реджи одно дельце за небольшие деньги, чтобы проверить его способности! В соседнем городке один скат по имени Скотт кое-что задолжал Валентину',
        image: 'location3.jpg',
        player_image: 'player10.png',
        options: [
            {
                text: async () =>'Взяться за работу!',
                nextText: 17
            },
            {
                text: async () =>'Отказаться и встретиться с Арчибальдом',
                nextText: 21
            },
            {
                text: async () =>'Отказаться и уехать в родной городок',
                nextText: 15
            }
        ]
    } ,
    {id:17,
        text: async () => 'Реджинальд на метро, трех автобусах и велосипеде доехал до соседнего городка и нашел дом ската по имени Скотт, адрес которого ему дал Валентин. Он поднялся на крыльцо и позвонил в дверь, однако никто не открыл. Реджинальд позвонил еще раз, но ничего не произошло. Обойдя дом с другой стороны, Реджи заглянул в окно и увидел страшное.',
        image: 'location11.jpg',
        player_image: 'player1.png',
        options: [
            {
                text: async () => 'Найти камень во дворе, разбить окно и попасть внутрь!',
                nextText: 18
            },
            {
                text: async () => 'Пробраться внутрь дома через дымовую трубу!',
                nextText: 18
            }
        ]
    },
    {id:18,
        text: async () => 'Реджинальд ворвался в комнату и увидел, как Скотт захватил Арчибальда в крайне опасный скатский захват!',
        image: 'location12.jpg',
        player_image: 'player11.png',
        options: [
            {
                text: async () => 'Прыгнуть на Скота, чтобы он выплюнул Арчи!',
                nextText: 19
            }
        ]
    },
    {id:19, 
        text: async () => 'Реджи разогнался и прыгнул на Скота, Арчибальд выскочил из захвата, крикнул "Бежим!" и поскакал в сторону выхода.',
        image: 'location12.jpg',
        player_image: 'player12.png',   
        options: [
            {
                text: async () => 'Бежать за Арчи!',
                nextText: 20                
            }
        ]     
    },
    {id:20, 
        text: async () => 'Пробежав несколько районов, птицы остановились. Реджи упал на землю без сил, пока Арчибальд расхаживал туда-сюда. "Спасибо, Реджи! Я этого никогда не забуду! А из хороших новостей: я успел забрать эту бумагу! Валентин будет доволен. А почему ты приехал сюда, Реджи?"',
        image: 'location13.jpg',
        player_image: 'player0.png',   
        options: [
            {
                text: async () => 'Подняться с земли и подойти к Арчи',
                nextText: 21               
            }
        ]     
    },
    {id:21, 
        text: async () => '"Арчи, я провалил вступительные и теперь мне нужна работа" - "Провалил? Эх, блин, ну ничего, в следующий раз повезет! Ты умный птенчик! Помогу тебе вообще без проблем, есть несколько идей! Выбирай сам"',
        image: 'location13.jpg',
        player_image: 'player2.png',   
        options: [
            {
                text: async () => 'Занять деньги у Арчи и пойти работать в птицтакси',
                setState: {taxi: true},
                nextText: -1              
            },
            {
                text: async () => 'Работать вдвоем на голубя Валентина',
                setState: {Valentin: true},
                nextText: -1              

            }
        ]     
    },
    {id:22, 
        text: async () => 'Реджи направился в булочную рядом с университетом, чтобы узнать о студенческих вакансиях. Неожиданно он остановился у стэнда рядом с университетским входом. Там висело объявление. "Хочешь стать самым богатым птицем в городе? Хочешь купить себе самое дорогое лакшери гнездо? Тогда регистрируйся на курс главного бизнес-цыпа этого города и получи первый заработок уже сейчас!"',
        image: 'location13.jpg',
        player_image: 'player1.png',   
        options: [
            {
                text: async () => 'Зарегистрироваться на курс инфо-цыпана и получить деньги на съем жилья',
                setState: {infocypan: true},
                nextText: 24
          
            },
            {
                text: async () => 'Пойти в булочную узнать о вакансиях',
                nextText: 23
            }
        ]     
    },
    {id:23, 
        text: async () => 'В булочной Реджи предложили работу за не очень большие деньги, однако этих денег должно было хватить на съем комнаты. В самой булочной приятно пахло свежей выпечкой и было очень уютно.',
        image: 'location14.jpg',
        player_image: 'player1.png',   
        options: [
            {
                text: async () => 'Согласиться на работу в булочной',
                setState: {bakery: true},
                nextText: 24
          
            },
            {
                text: async () => 'Отказаться от этой работы и зарегистрироваться на курсы инфо-цыпана',
                setState: {infocypan: true},
                nextText: 24        

            }
        ]     
    },
    {id:24, 
        text: async () => 'С первого заработка Реджи смог снять себе комнату недалеко от университета, Арчи помог ему перевезти все его птичьи вещички.',
        image: 'location15.jpg',
        player_image: 'player1.png',   
        options: [
            {
                text: async () => 'Лететь на пары!',
                nextText: 25
          
            }
        ]     
    },
    {id:25, 
        text: async () => 'В аудитории Реджи встретила староста его группы - птичка по имени Эми. "Привет, я Эми, твоя староста, вот твое расписание, сегодня будет лекция профессора Пауля, не опаздывай и веди себя там тихо! Он только кажется милым со стороны, в мгновение ока может сильно разозлиться и отчислить из университета. Пауль Джуниор, его аспирант, будет нашим семинаристом!"',
        image: 'location16.jpg',
        player_image: 'player13.png',   
        options: [
            {
                text: async () => '"Приятно познакомиться, Эми! Спасибо за советы, учту, я Реджи, кстати говоря!"',
                nextText: 26
          
            }
        ]     
    },   
    {id:26, 
        text: async () => 'Эми улыбнулась, и ее глаза засияли еще ярче. "Я знаю, посмотрела всех одногруппников в птицеграмме, было интересно! Ты только ничего плохого не подумай!" В аудиторию зашел профессор.',
        image: 'location16.jpg',
        player_image: 'player13.png',   
        options: [
            {
                text: async () => 'Улыбнуться в ответ Эми и сесть за стол рядом с ней',
                nextText: 27
          
            }
        ]     
    },    
    {id:27, 
        text: async () => '"Всем добрый день! Я профессор Пауль, это мой аспирант Пауль Джуниор, и сегодня мы начнем изучение линейной алгребы!"',
        image: 'location16.jpg',
        player_image: 'player14.png',   
        options: [
            {
                text: async () => 'Открыть тетрадь и начать писать конспекты',
                nextText: 28
          
            }
        ]     
    },    
    {id:28, 
        text: async () => 'Неожиданно в аудиторию ворвалась компания шумных птиц. Профессор Пауль сделал им замечание. Тройка ненадолго затихла, села недалеко от Реджи с Эми и уже букквально через пару минут стала общаться еще громче. Один из птицев резко дернул Реджи за пиджак "псс, эй, псс, какая тема сегодня?" Эми прошептала "Не поворачивайся! Профессор Пауль выгонит нас"', 
        image: 'location16.jpg',
        player_image: 'player14.png',   
        options: [
            {
                text: async () => 'Тихо прошептать в ответ "Матрицы"',
                nextText: 29
          
            }
        ]     
    },   
    {id:29, 
        text: async () => 'Раздался грозный голос профессора Пауля. Он был сильно зол. "Молодые люди, если вам не хочется учиться, то просьба покинуть это учебное заведение! Вы, девушка (показывая на Эми), подойдите сюда! Как вам нестыдно! Вы староста этой группы, а отвлекаете себя и других от занятий!"', 
        image: 'location16.jpg',
        player_image: 'player15.png',   
        options: [
            {
                text: async () => 'Встать и заступиться за Эми, взяв вину на себя',
                nextText: 30
          
            },
            {
                text: async () => 'Промолчать',
                setState: {Amyhate: true},
                nextText: 31
          
            }           
        ]     
    },
    {id:30, 
        text: async () => '"Профессор Пауль, Эми ни в чем не виновата, это я разговаривал". Профессор Пауль: "Ладно, молодой человек, на первый раз прощаю, однако теперь вы у меня на карандаше!"', 
        image: 'location16.jpg',
        player_image: 'player16.png',   
        options: [
            {
                text: async () => 'Пересесть с Эми за другой стол подальше от шумных птицев',
                nextText: 32
          
            }      
        ]     
    },
    {id:31, 
        text: async () => 'Профессор Пауль отчитал Эми, и она, расплакавшись, убежала из аудитории.', 
        image: 'location16.jpg',
        player_image: 'player20.png',   
        options: [
            {
                text: async () => 'Молча ждать конца пары',
                nextText: 33
          
            }       
        ]     
    },
    {id:32, 
        text: async () => 'После пары Эми подошла к Реджи "Спасибо тебе большое, птиц! А ... ты не хочешь пойти в летнее кино на набережной сегодня вечером?"', 
        image: 'location16.jpg',
        player_image: 'player13.png',   
        options: [
            {
                text: async () => 'Пойти на свидание с Эми',
                nextText: 34
          
            },
            {
                text: async () => 'Отказаться и пойти домой готовиться к сессии',
                requiredState: (currentState) => currentState.stypendy,
                nextText: -1
          
            }, 
            {
                text: async () => 'Отказаться и взять дополнительную смену в булочной',
                requiredState: (currentState) => currentState.bakery,
                nextText: 48
          
            }, 
            {
                text: async () => 'Отказаться и пойти на курсы от инфо-цыпана',
                requiredState: (currentState) => currentState.infocypan,
                nextText: 36
          
            }      
        ]     
    },
    {id:33, 
        text: async () => 'После пары Реджи нашел Эми, однако Эми не захотела с ним разговаривать и попросила больше никогда ее не беспокоить.', 
        image: 'location16.jpg',
        player_image: 'player9.png',   
        options: [
            {
                text: async () => 'Пойти домой готовиться к сессии',
                requiredState: (currentState) => currentState.stypendy,
                nextText: -1
          
            },
            {
                text: async () => 'Пойти на работу в булочную',
                requiredState: (currentState) => currentState.bakery,
                nextText: 48
          
            },
            {
                text: async () => 'Пойти на курсы от инфо-цыпана',
                requiredState: (currentState) => currentState.infocypan,
                nextText: 36
          
            }                     
        ]     
    },
    {id:34, 
        text: async () => 'Этим же вечером Реджи, надев свой лучший костюм и расчесав перышки, залетел по пути в цветочный и радостно прискакал на набережную.', 
        image: 'location17.jpg',
        player_image: 'player18.png',   
        options: [
            {
                text: async () => 'Искать глазами Эми',
                nextText: 35
          
            }
               
        ]     
    },  
    {id:35, 
        text: async () => 'Увидев Эми, Реджи слегка застеснялся и покраснел. Пташки обнялись и побежали смотреть замечательный фильм под открытым небом. А после кино гугяли вдоль набережной до самого утра. Разлетаться им совсем не хотелось! Наступило утро.', 
        image: 'location17.jpg',
        player_image: 'player19.png',   
        options: [
            {
                text: async () => 'Поцеловать Эми и побежать на работу в булочную',
                requiredState: (currentState) => currentState.bakery,
                nextText: 48
          
            },
            {
                text: async () => 'Поцеловать Эми и побежать на курсы от инфо-цыпана',
                requiredState: (currentState) => currentState.infocypan,
                nextText: 36 
            },
            {
                text: async () => 'Поцеловать Эми и побежать на работу',
                requiredState: (currentState) => currentState.taxi,
                nextText: -1
            }       
        ]     
    },
    {id:36, 
        text: async () => 'Реджи приехал на виллу Щегола, главного бизнес-цыпана этого города, на семинар по марафону успеха. В конференц-зале собралось множество щебечущих птичек со всего города. Реджи занял свободное место на заднем ряду. Неождианно в зале погас свет, заиграла торжественная музыка, и Щегол под громкие апплодисменты зашел в зал и встал у экрана.', 
        image: 'location18.jpg',
        player_image: 'player1.png',   
        options: [
            {
                text: async () => 'Смотреть на экран',
                nextText: 37
          
            }, 
        ]     
    },
    {id:37, 
        text: async () => 'Начался семинар. Бизнес-цыпан включил свою презентацию и начал активно рассуждать об успехе путем вложения в различные ценные бумаги, а начать свою дорогу успеха он крайне рекоммендовал с покупки акций компании ЦыпПром уже сейчас. На слайдах появились воодушевляющие графики по динамике цен акций ЦыпПрома.', 
        image: 'location18.jpg',
        player_image: 'player1.png',   
        options: [
            {
                text: async () => 'Внимательно изучить информацию по ЦыпПрому',
                nextText: 38
          
            }
        ]     
    },
    {id:38, 
        text: async () => 'Акции ЦыпПрома казались крайне притягательной инвестицией, исходя из информации на слайдах. Однако Реджи сильно сомневался. К птичкам стали подходить советники Щегола и настойчиво предлагать покупку акций. Началась суета.', 
        image: 'location18.jpg',
        player_image: 'player1.png',   
        options: [
            {
                text: async () => 'Дождаться своей очереди и потратить последние деньги на покупку акций ПтицПрома',
                setState: {infocypan: false},
                nextText: 39      
            }, 
            {
                text: async () => 'Встать и незаметно покинуть виллу, не покупая акции',
                nextText: 40  
        },
            {
                text: async () => 'В суете пробраться к компьютеру, скачать файлы с предыдущими презентациями и быстро покинуть виллу',
                nextText: 41
          
            }
        ]     
    },
    {id:39, 
        text: async () => 'Реджи вернулся домой, а через пару дней он узнал, что акции компании ПтицПрома обесценились, а инфоцыпан Щегол, применив мошенническую схему, оставил всех птичек с клювом.', 
        image: 'location15.jpg',
        player_image: 'player9.png',   
        options: [
            {
                text: async () => 'Устроиться на подработку в булочную у университета',
                setState: {bakery: true},
                nextText: 48
          
            }, 
            {
                text: async () => 'Остаться жить на стипендии и не искать подработку',
                requiredState: (currentState) => currentState.stypendy,
                nextText: -1
          
            }
        ]     
    },
    {id:40, 
        text: async () => 'Реджи вернулся домой после марафона и задумался, что ему стоит делать дальше.', 
        image: 'location15.jpg',
        player_image: 'player9.png',   
        options: [
            {
                text: async () => 'Устроиться на подработку в булочную у университета',
                setState: {bakery: true},
                nextText: 48
          
            }, 
            {
                text: async () => 'Остаться жить на стипендии и не искать подработку',
                requiredState: (currentState) => currentState.stypendy,
                nextText: -1
          
            }
        ]     
    },
    {id:41, 
        text: async () => 'Вернувшись домой, Реджинальд начал изучать все презентации. Изучив историю всех рекомендованных ранее акций компаний, он смог разглядеть четкую мошенническую схему: рекоммендуя активно покупку или продажу определенных бумаг птенцам, Щегол зарабатывал миллионы со своим окружением. Однако доказать его обман в полиции было невозможно.', 
        image: 'location15.jpg',
        player_image: 'player9.png',   
        options: [
            {
                text: async () => 'Использовать эту информацию и отнять часть заработка у инфо-цыпана',
                nextText: 42
          
            }
        ]     
    },
    {id:42, 
        text: async () => 'Одну неделю спустя на счету Реджи лежало несколько миллионов. Ему предстояло сделать непростой выбор.', 
        image: 'location15.jpg',
        player_image: 'player1.png',   
        options: [
            {
                text: async () => 'Забыть о всей этой истории и заняться подготовкой к сесии',
                setState: {infocypan: false},
                nextText: -1
            },
            {
                text: async () => 'Сходить еще на один семинар, чтобы тем же путем заработать еще денег и потратить их на открытие своего дела',
                nextText: 43
            }              
        ]     
    },
    {id:43, 
        text: async () => 'Реджи под выдуманным именем зарегистрировался еще на один семинар, чтобы собрать необходимую информацию. Рядом с ним села компания таких же молоденьких пташек. Реджи задумался.', 
        image: 'location15.jpg',
        player_image: 'player1.png',   
        options: [
            {
                text: async () => 'Незаметно рассказать пташкам о мошенничестве',
                nextText: 44
            },
            {
                text: async () => 'Промолчать',
                nextText: 45
            }                      
        ]     
    },  
    {id:44, 
        text: async () => 'Реджи рассказал птичкам о мошенничестве и покинул семинар. Через неделю он заработал необходимую сумму на открытие своего бизнеса.', 
        image: 'location15.jpg',
        player_image: 'player1.png',   
        options: [
            {
                text: async () => 'Отчислиться из университета и открыть свой бизнес',
                nextText: 54
            },
            {
                text: async () => 'Попытаться без подготовки сдать сессию',
                nextText: c
            }                    
        ]     
    },  
    {id:45, 
        text: async () => 'Реджи подслушал необходимую информацию и покинул семинар. Через неделю он заработал необходимую сумму на открытие своего бизнеса.', 
        image: 'location15.jpg',
        player_image: 'player1.png',   
        options: [
            {
                text: async () => 'Отчислиться из университета и открыть свой бизнес',
                nextText: 54
            },
            {
                text: async () => 'Попытаться без подготовки сдать сессию',
                nextText: c
            }                    
        ]     
    },   
    {id:46, 
        text: async () => 'Реджи провалил большую часть экзаменов, однако это был это допустимый максимум для пересдачи.', 
        image: 'location5.jpg',
        player_image: 'player9.png',   
        options: [
            {
                text: async () => 'Отчислиться из университета и открыть свой бизнес',
                nextText: 54
            },
            {
                text: async () => 'Потратить все заработанное на курсы по подготовке и пересдать все в следующем семестре',
                nextText: -1
            }                      
        ]     
    },  
    {id:47, 
        text: async () => 'Реджи провалил почти все экзамены и был отчислен.', 
        image: 'location6.jpg',
        player_image: 'player9.png',   
        options: [
            {
                text: async () => 'Открыть свой бизнес',
                nextText: 54
            },
            {
                text: async () => 'Отказаться от жизни в Птицбурге и улететь в родное гнездо',
                nextText: -1
            }                      
        ]     
    },
    {id:48, 
        text: async () => 'Реджи ранним утром пришел в булочную и приступил к работе, ему нужно было испечь множество булочек и батонов до открытия кафе. Он начал потихоньку замешивать тесто.', 
        image: 'location14.jpg',
        player_image: 'player1.png',   
        options: [
            {
                text: async () => 'Добавить щепотку любви',
                nextText: 49
            }                 
        ]     
    },
    {id:49, 
        text: async () => 'Реджинальд полетел в кладовку за мешком муки. У входа в нее на полу он увидел голубиные следы, хммм, странно. Он хотел проследовать по ним, но неожиданно кто-то постучался во входную дверь.', 
        image: 'location14.jpg',
        player_image: 'player1.png',   
        options: [
            {
                text: async () => 'Пойти посмотреть кто стучит',
                nextText: 50
            }                 
        ]     
    },   
    {id:50, 
        text: async () => 'У двери Реджи увидел Арчи. Что ты тут делаешь, Арчи? - А я тебе еще не говорил? Теперь эта булочная моя! Совсем недавно ее купил. - Но как? Где ты столько заработал? - Да там, долгая история. А ты здесь работаешь? - Да - А хочешь стать менеджером?', 
        image: 'location14.jpg',
        player_image: 'player2.png',   
        options: [
            {
                text: async () => 'Продолжить работу на кухне',
                nextText: 51
            },
            {
                text: async () => 'Согласиться стать менеджером',
                nextText: 51
            }                            
        ]     
    },  
    {id:51, 
        text: async () => 'Реджи продолжал много работать в булочной и параллельно учиться. Последние дни он очень активно зубрил все к предстоящей сессии.', 
        image: 'location15.jpg',
        player_image: 'player8.png',   
        options: [
            {
                text: async () => 'Лететь на сессию',
                nextText: -1
            }                        
        ]     
    },  
    {id:52, 
        text: async () => 'Реджинальд закрыл всю сессию на отлично и был номинирован на студент года! Профессор Пауль порекоммендовал его на стажировку в ПтицТрейдинг.', 
        image: 'location5.jpg',
        player_image: 'player1.png',   
        options: [
            {
                text: async () => 'Ураааааа! Бежать на стажировку!',
                nextText: -1
            }                        
        ]     
    },  
    {id:53, 
        text: async () => 'Спустя несколько птичьих лет. Реджинальд выпустился с красным дипломом из Птицбургского Государственного Университета и получил очередное повышение в ПтицТрейдинге.', 
        image: 'location5.jpg',
        player_image: 'player1.png',   
        options: [
            {
                text: async () => 'Пойти на работу',
                nextText: -1
            }                        
        ]     
    },  
    {id:54, 
        text: async () => 'Спустя несколько птичьих лет. Реджинальд заработал огромное состояние и начал задумываться о покупке собственной виллы.', 
        image: 'location5.jpg',
        player_image: 'player1.png',   
        options: [
            {
                text: async () => 'Пойти на работу',
                nextText: -1
            }                        
        ]     
    },  
] 

startGame()
