const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { MessageMedia } = require('whatsapp-web.js/src/structures');

// equivalent to:
const client = new Client({
    authStrategy: new LocalAuth(),
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
    },
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message_create', async msg => {

    let mensagge = msg.body.toLowerCase()
    let media = MessageMedia.fromFilePath("./src/LecharmStore.pdf")

    if (mensagge == 'oi' || mensagge == "bom dia" || mensagge == "boa tarde" || mensagge == "boa noite") {

        client.sendMessage(msg.from, `🌟 Bem-vindo à Lecharm! 🌟
        Olá! Aqui é a equipe Lecharm, prontos para ajudar você a encontrar os acessórios perfeitos para realçar o seu estilo! 💁‍♀️`);
        client.sendMessage(msg.from, `Na Lecharm, somos especializados em bijoux deslumbrantes e acessórios únicos, feitos com qualidade e amor. Nossa missão é oferecer a você uma experiência de compra fácil e gratificante, com produtos que realmente se destacam. 💼✨`)
        client.sendMessage(msg.from, `Para facilitar seu atendimento, digite o numero correspondente com oque você precisa
        1. Nossos produtos
        2. Quem somos
        3. Nosso endereço
        4. Loja Virtual
        5. Falar com um atendente
        `)
    }

    switch (mensagge) {
        case "1":
            await client.sendMessage(msg.from, media)
            break;
        case "2":
            await client.sendMessage(msg.from, `https://linktr.ee/lecharmstore793`)
            break;
        case "3":
            await client.sendMessage(msg.from, `R. Vinte e Cinco de Março, 793 - São Paulo - SP
https://g.co/kgs/SVXAp5X`)
            break;
        case "4":
            await client.sendMessage(msg.from, `https://codewithsadee.github.io/footcap/#`)
            break;
        case "5":
            await client.sendMessage(msg.from, `Um momento, voce ja sera atendido`)
            break;
        default:
            console.log("erro 404")

    }
});


client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});

client.initialize();

