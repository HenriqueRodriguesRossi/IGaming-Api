const Product = require("../models/ProductsModel")
const yup = require("yup")
const User = require("../models/UserModel")

exports.newProduct = async (req, res) => {
    try {
        const user_id = req.params.user_id

        const checkIfUserExist = await User.findById({ id: user_id })

        if (!user_id) {
            return res.status(400).send({
                mensagem: "Nenhum id encontrado!"
            })
        } else if (!checkIfUserExist) {
            return res.status(404).send({
                mensagem: "Nenhum usuário com esse id foi encontrado!"
            })
        }

        const { name, price, quantity_in_stock } = req.body

        const ProductsSchema = yup.object().shape({
            name: yup.string().required("O nome do produto é obrigatório!"),

            price: yup.number().required("O preço unitário do produto é obrigatório!"),

            quantity_in_stock: yup.number().required("A quantidade em estoque é obrigatória!")
        })

        await ProductsSchema.validate(req.body, { abortEarly: false })

        const newProduct = new Product({
            name,
            price,
            quantity_in_stock,
            user_id: user_id
        })

        await newProduct.save()

        return res.status(201).send({
            mensagem: "Sucesso!",
            product_details: newProduct
        })
    } catch (error) {
        console.log(error)

        return res.status(500).send({
            mensagem: "Erro ao cadastrar o produto!"
        })
    }
}

exports.findAll = async (req, res) => {
    try {
        const allProducts = await Product.find()

        return res.status(200).send({
            success: allProducts
        })
    } catch (error) {
        console.log(error)

        return res.status(500).send({
            mensagem: "Erro ao listar os produtos cadastrados!"
        })
    }
}