const TelegramApi = require('node-telegram-bot-api')
const token = '5235756990:AAFL5NmqfDMpEluD8qDfIT2kbYwbrSmAe5U'

const bot = new TelegramApi(token, {polling: true})

const chats = {}

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'}, {text: '3', callback_data: '3'}],
            [{text: '4', callback_data: '4'}, {text: '5', callback_data: '5'}, {text: '6', callback_data: '6'}],
            [{text: '7', callback_data: '7'}, {text: '8', callback_data: '8'}, {text: '9', callback_data: '9'}],
            [{text: '0', callback_data: '0'}]
        ]
    })
}
const againOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Сыграть ещё раз.', callback_data: '/again'}]
        ]
    })
}
const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Сейчас я загадаю число от 0 до 9, а ты должен её угадать')
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber
    await bot.sendMessage(chatId, 'Отгадывай', gameOptions)

}


const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Позвать бота'},
        {command: '/info', description: 'Узнать моё имя и фамилию'},
        {command: '/game', description: 'Давай поиграем!'},
    ])

    bot.on('message', async msg => {
        const chatId = msg.chat.id;
        const messageText = msg.text;
        if (messageText === '/start') {
            await bot.sendSticker(chatId, "https://cdn.tlgrm.app/stickers/151/86b/15186be3-bc84-3dac-b03e-30b251b3750f/256/1.webp")
            return bot.sendMessage(chatId, `Приветствую ${msg.from.first_name}, мой драгоценный друг! Чем я могу быть полезен?`)
        }
        if (messageText === '/info') {
            return bot.sendMessage(chatId, `Тебя зовут ${msg.from.last_name} ${msg.from.first_name}`)
        }
        if (messageText === '/game') {
            return startGame(chatId)
        }
        return bot.sendMessage(chatId, 'Что-то я не понял вас... Повторите пожалуйста.')
    })
    bot.on('callback_query', async msg => {
        const data = msg.data;
        const messageId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(messageId)
        }
        if (chats[messageId] === data) {
            return bot.sendMessage(messageId, `Поздравляю, ты отгадал цифру ${chats[messageId]}`, againOptions)
        } else {
            return bot.sendMessage(messageId, `К сожалению ты не угадал, бот загадал ${chats[messageId]}`, againOptions)
        }
    })
}

start()
