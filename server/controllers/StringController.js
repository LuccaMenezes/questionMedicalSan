module.exports = class StringController {
    static async invertString(req, res) {
        const { entrada } = req.body;

        if (!entrada || typeof entrada !== 'string') {
            return res.status(400).json({ error: 'Entrada inválida' });
        }

        const resultado = entrada.split('').reverse().join('');
        return res.json({ resultado });
    };

    static async invertWordsInString(req, res) {
        const { entrada } = req.body;

        if (!entrada || typeof entrada !== 'string') {
            return res.status(400).json({ error: 'Entrada inválida' });
        }

        const resultado = entrada.split(' ')
            .map(word => word.split('').reverse().join(''))
            .join(' ');
        return res.json({ resultado });
    };
}
