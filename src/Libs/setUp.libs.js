import Role from "../Models/Role.model.js";

export const createRoles = async () => {

    try {
            
        const count = await Role.estimatedDocumentCount();

        if (count > 0) return;

        await Promise.all([
            new Role({ name: "user" }).save(),
            new Role({ name: "moderator" }).save(),
            new Role({ name: "admin" }).save()
        ]);
       
    } catch (error) {
        console.error(error);
    }
    
};