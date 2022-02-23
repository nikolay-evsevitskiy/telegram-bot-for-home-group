module.exports = {
    gameOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Боровки', callback_data: 'borovkiDanilchiki'}],
                [{text: 'Восточный', callback_data: 'vostocnyEvsevitskiy'}],
                [{text: 'Аэропорт', callback_data: 'aeroportAlesyaRusina'}],
                [{text: 'ц. Новая Жизнь', callback_data: 'churchNewLife'}]
            ]
        })
    }
}
