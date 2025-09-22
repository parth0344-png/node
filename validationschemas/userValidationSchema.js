const zod = require("zod")

const userValidationSchema = zod.object({
     name: zod.string(),
     age: zod.number().min(18).max(60, "max age should be <=60"),
     status: zod.boolean().default(true),
     hobbies: zod.array(zod.string()),
     bloodGroup: zod.enum(["A+", "A-", "O+", "O-"], "invalid blood group"),
     roleId: zod.string()
}).strict()

module.exports = userValidationSchema