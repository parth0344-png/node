const zod = require("zod")

const empValidationSchema = zod.object({
     firstName: zod.string(),
     lastName: zod.string(),
     gender:zod.string(),
     email:zod.string(),
     salary:zod.number(),
     department: zod.array(zod.string()),
}).strict()

module.exports = empValidationSchema