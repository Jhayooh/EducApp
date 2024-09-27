import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email("You must give a valid email"),
  password: z
    .string()
    .min(8, { message: "Your password must be atleast 8 characters long" })
    .max(64, {
      message: "Your password can not be longer then 64 characters long",
    })
    .refine(
      (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""),
      "password should contain only alphabets and numbers"
    ),
});

export const SignUpSchema = z.object({
  firstname: z
    .string()
    .min(3, { message: "first name must be atleast 3 characters" }),
  lastname: z
    .string()
    .min(3, { message: "last name must be atleast 3 characters" }),
  email: z.string().email("You must give a valid email"),
  password: z
    .string()
    .min(8, { message: "Your password must be atleast 8 characters long" })
    .max(64, {
      message: "Your password can not be longer then 64 characters long",
    })
    .refine(
      (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""),
      "password should contain only alphabets and numbers"
    ),
});

export const CourseSchema = z.object({
  name: z.string().min(1, { message: "Course name is required" }),
  description: z.string().min(1, { message: "Course description is required" }),
  imageUrl: z.string().min(1, { message: "Course image is required" }),
});

export const ModuleSchema = z.object({
  number: z.coerce.number().min(1, { message: "Module number is required" }),
  name: z.string().min(1, { message: "Module name is required" }),
  content: z.string().min(1, { message: "Module content is required" }),
});

export const CourseContentSchema = z.object({
  content: z
    .string()
    .min(100, {
      message: "description must have atleast 100 characters",
    })
    .optional()
    .or(z.literal("").transform(() => undefined)),
  htmlcontent: z
    .string()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  jsoncontent: z
    .string()
    .min(100, {
      message: "description must have atleast 100 characters",
    })
    .optional()
    .or(z.literal("").transform(() => undefined)),
});

export const VideoSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  videoUrl: z.string().min(1, { message: "Video is required" }),
  method: z.enum(["local", "youtube"], {
    required_error: "You need to select an upload method.",
  }),
});

export const QuizSchema = z.object({
  howManyQuiz: z.coerce.number().min(1, { message: "You must have atleast 1 question" }),
  type: z.enum(["multipleChoice", "trueFalse"]),
  questions: z.array(
    z.object({
      question: z.string().min(1, {message: "Question is required"}),
      answers: z.string().optional(),
      correctAnswer: z.string().min(1, {message: "Correct answer is required"}),
    })
  ),
});

export const CodeSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  correctOutput: z.string().min(1, { message: "Correct output is required" }),
});
