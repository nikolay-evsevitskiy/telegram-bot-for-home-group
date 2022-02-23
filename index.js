const TelegramApi = require('node-telegram-bot-api')
const token = '5235756990:AAFL5NmqfDMpEluD8qDfIT2kbYwbrSmAe5U'
//const {gameOptions, againOptions} = require('./options')

const bot = new TelegramApi(token, {polling: true})

const addresses = [
    {
        id: 1,
        name: 'vostochnyEvsevitskiy',
        address: 'ул. Энтузиастов д.56 2-ой подъезд, 4 этаж, кв.63',
        yandexLocation: 'https://yandex.by/maps/21015/baranavichy/?bookmarks%5Bpid%5D=home&bookmarks%5Buri%5D=ymapsbm1%3A%2F%2Fpin%3Fll%3D26.075649%252C53.132757&ll=26.017609%2C53.132368&z=13'
    },
    {
        id: 2,
        name: 'borovkiDanilchiki',
        address: 'ул. Багрима д.11/2-65',
        yandexLocation: 'https://yandex.by/maps/21015/baranavichy/house/ZkwYfw5iSkYGQFtpfX1wcHtmYw==/?ll=25.991667%2C53.111894&z=18.02'
    },
    {
        id: 3,
        name: 'aeropportAlesyaRusina',
        address: '3 переулок Славянский,  дом 3',
        yandexLocation: 'https://yandex.com/maps?whatshere%5Bpoint%5D=25.966266%2C53.126705&whatshere%5Bzoom%5D=18.2395&ll=25.96667267425653%2C53.126818598157236&z=18.2395'
    },
    {
        id: 4,
        name: 'churchNewLife',
        address: 'ул. Вагонная д.6',
        yandexLocation: 'https://yandex.by/maps/21015/baranavichy/house/Zk8YdgdmQEUGQFtpfX11cXlgYg==/?ll=26.006901%2C53.140537&z=16.23'
    },
]
//const adminPassword = '2131My01'


const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Позвать бота'},
        {command: '/info', description: 'Узнать адрес, где будет проходить домашка'},
        {command: '/admin', description: 'Кнопка для хозяина бота'}
    ])


    bot.on('message', async msg => {
        const chatId = msg.chat.id;
        const messageText = msg.text;
        if (messageText === '/start') {
            await bot.sendSticker(chatId, "https://cdn.tlgrm.app/stickers/151/86b/15186be3-bc84-3dac-b03e-30b251b3750f/256/1.webp")
            return bot.sendMessage(chatId, `Приветствую ${msg.from.first_name}, мой драгоценный друг! Чем я могу быть полезен?`)
        }
        if (messageText === '/info') {
            const idAddress = 4;
            const currentAddress = addresses.filter(i => i.id === idAddress)
            const pray = 'молитва'
            const homeGroup = 'домашняя группа'
            return bot.sendMessage(chatId, `Молодёжная ${idAddress === 4 ? pray : homeGroup} будет проходить по адресу ${currentAddress[0].address}, вот геометка: ${currentAddress[0].yandexLocation}`)
        }

        return bot.sendMessage(chatId, 'Что-то я не понял вас... Повторите пожалуйста.')

    })
    // bot.on('callback_query', async msg => {
    //     const data = msg.data;
    //     const messageId = msg.message.chat.id;
    //     if (data === '/again') {
    //         return startGame(messageId)
    //     }
    //     if (chats[messageId] == data) {
    //         return bot.sendMessage(messageId, `Поздравляю, ты отгадал цифру ${chats[messageId]}`, againOptions)
    //     } else {
    //         return bot.sendMessage(messageId, `К сожалению ты не угадал, бот загадал ${chats[messageId]}`, againOptions)
    //     }
    // })
}

start()
