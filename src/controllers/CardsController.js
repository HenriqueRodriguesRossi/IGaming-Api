const Card = require("../models/CardModel")
const User = require("../models/UserModel")
const Products = require("../models/ProductsModel")

exports.newCard = async (req, res) => {
    try{
        const user_id = req.params.user_id
        const verifyIdUser = await User.findById({_id: user_id})
    
        if (!user_id) {
            return res.status(400).send({
                mensagem: "Não foi possível identificar o id do usuário!"
            })
        }else if(!verifyIdUser){
            return res.status(404).send({
                mensagem: "Nenhum usuário foi encontrado com esse id!"
            })
        }
    
        const {id_game, amount} = req.body

        if(!amount || !id_game){
            return res.status(400).send({
                mensagem: "Por favor, digite o id do jogo bem como quantas unidades você deseja adiquirir!"
            })
        }

        const verifyIfGameExist = await Products.findOne({_id: id_game})

        if(!verifyIfGameExist){
            return res.status(404).send({
                mensagem: "Nenhum produto encontrado!"
            })
        }

        const total_price = verifyIfGameExist.price * amount

        const newCard = new Card({
            user_id,
            id_game,
            amount,
            total_price
        })

        await newCard.save()

        return res.status(201).send({
            mensagem: "Card de compra cadastrado com sucesso!",
            card_details: newCard
        })
    }catch(error){
        console.log(error)
        return res.status(500).send({
            mensagem: "Erro ao cadastrar card!"
        })
    }
}

exports.findAllCards = async(req, res)=>{
    try{
        const user_id = req.params.user_id

        if(!user_id){
            return res.status(400).send({
                mensagem: "Não foi possível encontrar o id do usuário!"
            })
        }
    
        const findCard = await Card.findById({user_id})
    
        if(!findCard){
            return res.status(404).send({
                mensagem: "Nenhuma compra encontrada!"
            })
        }else{
            return res.status(200).send({
                mensagem: "Sucesso!",
                detalhes: findCard
            })
        }
    }catch(error){
        console.log(error)

        return res.status(500).send({
            mensagem: "Erro ao listar todas as compras desse usuário!"
        })
    }  
}

exports.findCard = async(req, res)=>{
    try{
        const user_id = req.params.user_id
        const card_id = req.params.card_id

        if(!user_id || !card_id){
            return res.status(400).send({
                mensagem: "Por favor, forneça todas as informações necessárias para retornar um card!"
            })
        }

        const getCard = await Card.findById({
            _id: card_id,
            user_id: user_id 
        })

        if(!getCard){
            return res.status(404).send({
                mensagem: "Não foi encontrado nenhum card!"
            })
        }else{
            return res.status(200).send({
                sucesso: "Busca efetuada com sucesso!",
                card_detils: getCard
            })
        }
    }catch(error){
        console.log(error)

        return res.status(500).send({
            mensagem: "Erro ao retornar esse card!"
        })
    }
}