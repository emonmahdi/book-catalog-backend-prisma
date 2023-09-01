import prisma from "../../../shared/prisma"

const getAllUsersFromDB = async() => {
    const users = await prisma.user.findMany({})

    return users
}

export const UserService = {
    getAllUsersFromDB
}