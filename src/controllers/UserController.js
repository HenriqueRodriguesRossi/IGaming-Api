const User = require("../models/UserModel")
const yup = require("yup")
const captureErrorYup = require("../utils/captureErrorYup")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.newUser = async (req, res) => {
    try {
        const { full_name, cpf, email, password, repeat_password } = req.body

        const UserSchema = yup.object().shape({
            full_name: yup.string().required("O nome completo é obrigatório!").min(3, "O nome completo deve ter no mínimo 3 caracteres!"),

            cpf: yup.string().required("O cpf é obrigatório!").min(11, "O cpf deve ter 11 caracteres!").max(11, "O cpf deve ter 11 caracteres!"),

            email: yup.string().email("Digite um email válido!").required("O email é obrigatório!"),

            password: yup.string().required("A senha é obrigatória!").min(6, "A senha deve ter no mínimo 6 caracteres!"),

            repeat_password: yup.string().required("A confirmação da senha é obrigatória!").oneOf([password, null], "As senhas devem ser iguais!")
        })

        await UserSchema.validate(req.body, { abortEarly: false })

        const checkEmail = await User.findOne({ email })
        const checkCpf = await User.findOne({ cpf })

        if (checkEmail) {
            return res.status(422).send({
                mensagem: "Este email já foi cadastrado!"
            })
        } else if (checkCpf) {
            return res.status(422).send({
                mensagem: "Este cpf já foi cadastrado!"
            })
        }

        const passwordHash = await bcrypt.hash(password, 20)

        const newUser = new User({
            full_name,
            cpf,
            email,
            password: passwordHash,
        })

        await newUser.save()

        return res.status(201).send({
            mensagem: "Usuário cadastrado com sucesso!",
            user_id: newUser.id
        })
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            const errors = [captureErrorYup(error)]

            return res.status(422).send({
                Erro: errors
            })
        } else {
            console.log("Erro: " + error)
            return res.status(500).send({
                mensagem: "Erro ao cadastrar o usuário!"
            })
        }
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        const checkIfEmailExist = await User.findOne({ email })

        if (!email || !password) {
            return res.status(400).send({
                mensagem: "Email e senha são obrigatórios!"
            })
        } else if (!checkIfEmailExist) {
            return res.status(422).send({
                mensagem: "Email ou senha estão incorretos!"
            })
        }

        const checkPass = await bcrypt.compare(password, checkIfEmailExist.password)

        if (!checkPass) {
            return res.status(422).send({
                mensagem: "Email ou senha estão incorretos!"
            })
        }

        const secret = process.env.SECRET

        const token = jwt.sign({
            id: checkIfEmailExist.id
        }, secret)

        return res.status(200).send({
            mensagem: "Login efetuado com sucesso!",
            token: token,
            user_id: checkIfEmailExist.id
        })
    } catch (error) {
        console.log("Erro: " + error)
        return res.status(500).send({
            mensagem: "Erro ao efetuar o login!"
        })
    }
}

exports.findAll = async (req, res) => {
    try {
        const users = [await User.find()]

        if (!users) {
            return res.status(404).send({
                mensagem: "Nenhum usuário cadastrado!"
            })
        } else {
            return res.status(200).send({
                mensagem: users
            })
        }
    } catch (error) {
        console.log("Erro: " + error)

        return res.status(500).send({
            mensagem: "Erro ao listar os usuários!"
        })
    }
}

exports.findUser = async (req, res) => {
    try {
        const user_id = req.params.user_id

        if (!user_id) {
            return res.status(433).send({
                mensagem: "Acesso negado, não foi possível resgatar o id do usuário!"
            })
        }

        const user = await User.findById({ id: user_id })

        if (!user) {
            return res.status(404).send({
                mensagem: "Nenhum usuário encontrado!"
            })
        } else {
            return res.status(200).send({
                mensagem: user
            })
        }
    } catch (error) {
        console.log("Erro: " + error)

        return res.status(500).send({
            mensagem: "Erro ao buscar o usuário!"
        })
    }
}