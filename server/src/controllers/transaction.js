const {transactions, products, Users} = require("../../models");
const jwt = require("jsonwebtoken")

exports.getTransactions = async (req,res) => {
    
    try {
        const dataTransaction = await transactions.findAll({
            include: [
                {
                    model: products,
                    as: "products",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                },
                {
                    model: Users,
                    as: "buyer",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password"]
                    }
                },
                {
                    model: Users,
                    as: "seller",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", 
                        "password"]
                    }
                }
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt", 
                "idBuyer", "idSeller", "idProduct"]
            }
        })

        res.status(200).send({
            status: "Success",
            message: "Showing all Transactions",
            data: {
                transaction:dataTransaction
            }
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            status: "Failed",
            message: "Server Error, failed to show all Transactions"
        })
    }

}

exports.addTransactions = async (req,res) => {
    try {
        
        const pricing = await products.findOne({
            where: {
                id: req.body.idProduct
            }
        })

        // if(!pricing.price) {
        //     return res.status(400).send({
        //         status: "error",
        //         message: "Product Doesn't Exist!"
        //     })
        // }
        
        const buy = await transactions.create(
            {   idProduct: req.body.idProduct, 
                idBuyer: req.Users.id,
                idSeller: req.body.idSeller,
                price: pricing.price,
                status: "success"
            })
            

        res.status(200).send({
            status: "Success",
            message: "A new Transaction Added!",
            data : {
                transaction: buy
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            status: "Failed",
            message: "Server error, failed to add new Transaction"
        })
    }
}