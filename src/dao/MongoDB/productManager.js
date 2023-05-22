const { Products } = require('./models')

class ProductManager {
    async addProduct(title, description, code, price, status, stock, category, thumbnails) {
        try {
            if (!title || !description || !code || !price || !status || !stock || !category)
                return 'Todos los campos son obligatorios'
            const productByCode = await Products.find({ code }).select('-__v').lean()
            if (productByCode.length > 0) return 'El valor de code debe ser único'
            const product = {
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnails
            }
            return await Products.create(product)
        } catch (error) {
            console.log(error)
        }
    }
    async getProducts() {
        try {
            let products = await Products.find().select('-__v').lean()
            return products
        } catch (error) {
            console.log(error)
        }
    }
    async getProductById(id) {
        try {
            const product = await Products.findById(id).select('-__v').lean()
            if (product) return product
            return 'Not found'
        } catch (error) {
            console.log(error)
        }
    }
    async updateProduct(id, object) {
        try {
            const product = await Products.findById(id)
            if (!product) return 'Not found'
            if (object.hasOwnProperty('code')) {
                const product2 = await Products.find({ code: object['code'] })
                if (product2.length > 0 && product2[0]._id.toString() !== id)
                    return 'El valor de code debe ser único'
            }
            await Products.findByIdAndUpdate(id, object)
            return await Products.findById(id).select('-__v').lean()
        } catch (error) {
            console.log(error)
        }
    }
    async deleteProduct(id) {
        try {
            const product = await Products.findById(id)
            if (!product) return 'Not found'
            const deleted = await Products.findByIdAndRemove(id).select('-__v').lean()
            return deleted
        } catch (error) {
            console.log(error)
        }
    }

    async getAggregations(type) {
        try {
            switch (type) {
                case '1':
                    const products1 = await Products.aggregate([
                        {
                            $match: { title: 'Galletas artesanales' }
                        }
                    ])
                    return products1

                    break
                case '2':
                    const products2 = await Products.aggregate([
                        {
                            $match: { category: 'Galletas' }
                        },
                        {
                            $group: { _id: '$title', totalStock: { $sum: '$stock' } }
                        }
                    ])
                    return products2

                    break
                case '3':
                    const products3 = await Products.aggregate([
                        {
                            $match: { category: 'Galletas' }
                        },
                        {
                            $group: { _id: '$title', totalStock: { $sum: '$stock' } }
                        },
                        {
                            $sort: { totalStock: -1 }
                        }
                    ])
                    return products3

                    break
                case '4':
                    const products4 = await Products.aggregate([
                        {
                            $match: { category: 'Galletas' }
                        },
                        {
                            $group: { _id: '$title', totalStock: { $sum: '$stock' } }
                        },
                        {
                            $sort: { totalStock: -1 }
                        },
                        {
                            $group: { _id: 1, orders: { $push: '$$ROOT' } }
                        }
                    ])
                    return products4
                    break
                case '5':
                    const products5 = await Products.aggregate([
                        {
                            $match: { category: 'Galletas' }
                        },
                        {
                            $group: { _id: '$title', totalStock: { $sum: '$stock' } }
                        },
                        {
                            $sort: { totalStock: -1 }
                        },
                        {
                            $group: { _id: 1, orders: { $push: '$$ROOT' } }
                        },
						{
							$project: { _id: 0, orders: '$orders' }
						}
                    ])
                    return products5
                    break
                case '6':
                    const products6 = await Products.aggregate([
                        {
                            $match: { category: 'Galletas' }
                        },
                        {
                            $group: { _id: '$title', totalStock: { $sum: '$stock' } }
                        },
                        {
                            $sort: { totalStock: -1 }
                        },
                        {
                            $group: { _id: 1, orders: { $push: '$$ROOT' } }
                        },
						{
							$project: { _id: 0, orders: '$orders' }
						},
						{
							$merge: { into: 'reportes' }
						}
                    ])
                    return products6
                    break
                default:
                    break
            }
        } catch (error) {
            console.log(error)
        }
    }
}

const products = new ProductManager()
module.exports = products
