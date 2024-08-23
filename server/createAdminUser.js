const USER=require("./models/user")

const createAdminUser = async ()=>{
    try {
        // const existingAdmin=await USER.findOne({role:"admin"})
        // if (!existingAdmin) {
        //     const adminUser = new USER({
        //       name: "shrey",
        //       email: "shrey@gmail.com",
        //       password: "shrey12345", // Make sure to hash this in production
        //       role: "admin",
        //     });
        //     await adminUser.save();
        //     console.log("Admin user created successfully:", adminUser);
        //   } else {
        //     console.log("Admin user already exists.");
        //   }

    } catch (err) {
        console.error("Error creating admin user:", err);
      }
}

module.exports=createAdminUser;