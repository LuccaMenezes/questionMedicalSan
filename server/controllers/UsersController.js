const { validationResult, check } = require('express-validator');
const UsersModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = class UsersController {
    static validateFields() {
        return [
            check('nome')
                .isString()
                .withMessage('Informe o nome completo do usuário.'),
            check('senha')
                .isString()
                .withMessage('Informe a senha do usuário.'),
            check('email')
                .optional()
                .isEmail()
                .withMessage('Precisamos do e-mail do usuário válido.'),
        ];
    }

    static async create(req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { nome, senha, email } = req.body;

        try {
            const userExists = await UsersModel.findOne({ email });
            if (userExists) {
                return res.status(422).json({ message: 'E-mail já cadastrado!' });
            }

            const salt = await bcrypt.genSalt(12);
            const senhaHash = await bcrypt.hash(senha, salt);

            const user = new UsersModel({
                nome,
                email,
                senha: senhaHash,
            });

            const newUser = await user.save();
            await createUserToken(newUser, req, res);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async login(req, res) {
        const email = req.body.email
        const senha = req.body.senha

        if (!email) {
            res.status(422).json({ message: 'O e-mail é obrigatório!' })
            return
        }

        if (!senha) {
            res.status(422).json({ message: 'A senha é obrigatória!' })
            return
        }

        const user = await UsersModel.findOne({ email: email })

        if (!user) {
            return res
                .status(422)
                .json({ message: 'Não há usuário cadastrado com este e-mail!' })
        }

        const checkPassword = await bcrypt.compare(senha, user.senha)

        if (!checkPassword) {
            return res.status(422).json({ message: 'Senha inválida' })
        }

        await createUserToken(user, req, res)
    }

    static async checkUser(req, res) {
        try {
            const token = getToken(req);
            if (!token) {
                return res.status(422).json({ message: 'Token não fornecido' });
            }

            const decoded = jwt.verify(token, 'nossosecret');
            const currentUser = await UsersModel.findOne({ _id: decoded.id }).select('-senha');
            res.status(200).send(currentUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID' });
        }

        try {
            const deletedUser = await UsersModel.findByIdAndDelete(id);

            if (!deletedUser) {
                return res.status(404).json({ error: 'Usuário não encontrado!' });
            }
            return res.status(200).json({ message: 'Usuário deletado com sucesso!' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID' });
        }

        try {
            const user = await UsersModel.findById(id);

            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async getAll(req, res) {
        try {
            const user = await UsersModel.getAll();

            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado!' });
            }

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID' });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { nome, email, senha } = req.body;

        try {
            const user = await UsersModel.findOne({ id });
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            if (senha) {
                const salt = await bcrypt.genSalt(12);
                user.senha = await bcrypt.hash(senha, salt);
            }

            user.email = email !== undefined ? email : user.email;
            user.nome = nome !== undefined ? nome : user.nome;

            await user.save();

            return res.status(200).json({ message: 'Usuário atualizado com sucesso', user });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

};
