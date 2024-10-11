module.exports = class MatrizController {
    static async gerarMatriz(req, res) {
        const { linhas, colunas, preenchimento } = req.body;

        if (!linhas || !colunas || !preenchimento) {
            return res.status(400).json({ error: 'Parâmetros inválidos' });
        }

        const totalElementos = linhas * colunas;
        let matriz = [];

        if (preenchimento === 'row-major') {
            matriz = Array.from({ length: totalElementos }, (_, i) => i + 1);
        } else {
            for (let j = 0; j < colunas; j++) {
                for (let i = 0; i < linhas; i++) {
                    matriz.push(i * colunas + (j + 1));
                }
            }
        }

        return res.json({ matriz });
    };

    static async transporMatriz(req, res) {
        const { matriz, linhas, colunas } = req.body;

        if (!matriz || matriz.length === 0 || !linhas || !colunas) {
            return res.status(400).json({ error: 'Parâmetros inválidos' });
        }

        // Transformar o array unidimensional em uma matriz bidimensional
        let matrizBidimensional = [];
        for (let i = 0; i < linhas; i++) {
            matrizBidimensional.push(matriz.slice(i * colunas, (i + 1) * colunas));
        }

        // Transpor a matriz
        let matrizTransposta = [];
        for (let j = 0; j < colunas; j++) {
            let newRow = [];
            for (let i = 0; i < linhas; i++) {
                newRow.push(matrizBidimensional[i][j]);
            }
            matrizTransposta.push(newRow);
        }

        return res.json({ matrizTransposta });
    }
}