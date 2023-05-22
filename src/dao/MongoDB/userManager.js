const { Users } = require('./models')

class UserManager {
    // async addProduct(title, description, code, price, status, stock, category, thumbnails) {
    //     try {
    //         if (!title || !description || !code || !price || !status || !stock || !category)
    //             return 'Todos los campos son obligatorios'
    //         const productByCode = await Products.find({ code }).select('-__v').lean()
    //         if (productByCode.length > 0) return 'El valor de code debe ser único'
    //         if (!thumbnails) thumbnails = []
    //         const product = {
    //             title,
    //             description,
    //             code,
    //             price,
    //             status,
    //             stock,
    //             category,
    //             thumbnails
    //         }
    //         return await Products.create(product)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    async getUsers() {
        try {
            const users = await Users.find().select('-__v').lean()
            // const users = await Users.find({first_name: 'Vlad'}).explain('executionStats').select('-__v').lean()
            // const users = await Users.find().select('-__v').lean().explain('executionStats')
            // const users = await Users.find().explain('executionStats')
            return users
        } catch (error) {
            console.log(error)
        }
    }
    async getPaginatedUsers(limit, page) {
        try {
            const {
                docs: users,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage
            } = await Users.paginate({}, { limit, page, lean: true })
            return { users, hasPrevPage, hasNextPage, prevPage, nextPage }
        } catch (error) {
            console.log(error)
        }
    }
    async getUserById(id) {
        try {
            const user = await Users.findById(id).select('-__v').lean()
            if (user) return user
            return 'Not found'
        } catch (error) {
            console.log(error)
        }
    }
    // async updateProduct(id, object) {
    //     try {
    //         const product = await Products.findById(id)
    //         if (!product) return 'Not found'
    //         if (object.hasOwnProperty('code')) {
    //             const product2 = await Products.find({ code: object['code'] })
    //             if (product2[0]._id.toString() !== id) return 'El valor de code debe ser único'
    //         }
    //         await Products.findByIdAndUpdate(id, object)
    //         return await Products.findById(id).select('-__v').lean()
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // async deleteProduct(id) {
    //     try {
    //         const product = await Products.findById(id)
    //         if (!product) return 'Not found'
    //         const deleted = await Products.findByIdAndRemove(id).select('-__v').lean()
    //         return deleted
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
}

const users = new UserManager()
module.exports = users
