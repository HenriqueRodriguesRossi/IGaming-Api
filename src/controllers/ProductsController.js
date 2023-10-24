const Product = require("../models/ProductsModel")
const yup = require("yup")
const captureErrorYup = require("../utils/captureErrorYup")

exports.newProduct = async (req, res) => {
    try {
        const user_id = req.params.user_id

        if (!user_id) {
            return res.status(400).send({
                mensagem: "Nenhum id encontrado!"
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
        if(error instanceof yup.ValidationError){
            const errors = [captureErrorYup(error)]

            return res.status(422).send({
                mensagem: errors
            })
        }else{
            console.log(error)

            return res.status(500).send({
                mensagem: "Erro ao cadastrar o produto!"
            })
        }
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

exports.findUserProducts = async (req, res) => {
    try {
        const user_id = req.params.user_id

        if (!user_id) {
            return res.status(400).send({
                mensagem: "Nenhum id encontrado!"
            })
        }

        const products = await Product.find({ user_id })

        if (products.length === 0) {
            return res.status(404).send({
                mensagem: "Nenhum produto encontrado!"
            })
        }

        return res.status(200).send({
            mensagem: products
        })
    } catch (error) {
        console.log(error)

        return res.status(500).send({
            mensagem: "Erro ao buscar os produtos do usuário!"
        })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const user_id = req.params.user_id
        const product_id = req.params.product_id

        if (!user_id || !product_id) {
            return res.status(400).send({
                mensagem: "Não foi possível identificar o id do usuário e/ou o id do produto!"
            })
        }

        const deleteProduct = await Product.findOneAndDelete({ _id: product_id, user_id })

        if (!deleteProduct) {
            return res.status(404).send({
                mensagem: "Nenhum produto encontrado!"
            })
        } else {
            return res.status(200).send({
                mensagem: "Produto excluído com sucesso!"
            })
        }
    } catch (error) {
        console.log(error)

        return res.status(500).send({
            mensagem: "Erro ao excluir o produto!"
        })
    }
}

exports.findProductById = async (req, res) => {
    try {
        const user_id = req.params.user_id
        const product_id = req.params.product_id

        if (!user_id || !product_id) {
            return res.status(400).send({
                mensagem: "Não foi possível identificar o id do usuário e/ou o id do produto!"
            })
        }

        const product = await Product.findOne({ _id: product_id, user_id })

        if (!product) {
            return res.status(404).send({
                mensagem: "Nenhum produto encontrado!"
            })
        }

        return res.status(200).send({
            mensagem: product
        })
    } catch (error) {
        console.log(error)

        return res.status(500).send({
            mensagem: "Não foi possível buscar o produto!"
        })
    }
}

exports.editProduct = async (req, res) => {
    try {
        const user_id = req.params.user_id
        const product_id = req.params.product_id

        if (!user_id || !product_id) {
            return res.status(400).send({
                mensagem: "Não foi possível identificar o id do usuário e/ou o id do produto!"
            })
        }

        const { name, price, quantity_in_stock } = req.body

        const updatedFields = {}

        if (name) {
            updatedFields.name = name
        }

        if (price) {
            updatedFields.price = price
        }

        if (quantity_in_stock) {
            updatedFields.quantity_in_stock = quantity_in_stock
        }

        const updatedProduct = await Product.findOneAndUpdate(
            { _id: product_id, user_id },
            { $set: updatedFields },
            { new: true }
        )

        if (!updatedProduct) {
            return res.status(404).send({
                mensagem: "Nenhum produto encontrado!"
            })
        }

        return res.status(200).send({
            mensagem: "Produto atualizado com sucesso!",
            product_details: updatedProduct
        })
    } catch (error) {
        console.log(error)

        return res.status(500).send({
            mensagem: "Não foi possível atualizar o produto!"
        })
    }
}