
const { z } = require("zod");

const userValidationSchema = z.object({
  name: z.string(),
  age: z.preprocess((val) => Number(val), z.number().min(18).max(60)),
  status: z.preprocess((val) => val === "true", z.boolean()).default(true),
  hobbies: z.preprocess(
    (val) => {
      if (typeof val === "string") return val.split(",").map(s => s.trim());
      return val;
    },
    z.array(z.string())
  ),
  bloodGroup: z.enum(["A+", "A-", "O+", "O-"], "invalid blood group"),
  roleId: z.string(),
   password:z.string(),
  email:z.string(),
  file: z
    .object({
      originalname: z.string(),
      mimetype: z.string(),
      size: z.number(),
      path: z.string(),
    })
    .optional(),
});

module.exports = userValidationSchema