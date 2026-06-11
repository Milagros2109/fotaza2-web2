import * as z from "zod";

const LoginSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string("Contraseña inválida")
    .min(4, "La contraseña debe tener al menos 4 caracteres")
});

const RegisterSchema = z.object({
  firstName: z.string("Nombre inválido")
    .min(2, "El nombre debe tener al menos 2 caracteres"),

  lastName: z.string("Apellido inválido")
    .min(2, "El apellido debe tener al menos 2 caracteres"),

  email: z.email("Email inválido"),

  password: z.string("Contraseña inválida")
    .min(4, "La contraseña debe tener al menos 4 caracteres")
});

const PostSchema = z.object({
  title: z.string("Título inválido")
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(50, "El título debe tener como máximo 50 caracteres"),

  description: z.string("Descripción inválida")
    .min(5, "La descripción debe tener al menos 5 caracteres")
});
export function loginValidation(data) {

  const result = LoginSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: z.flattenError(result.error).fieldErrors
    };
  }

  return {
    success: true
  };
}

export function registerValidation(data) {

  const result = RegisterSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: z.flattenError(result.error).fieldErrors
    };
  }

  return {
    success: true
  };
}

export function postValidation(data) {

  const result = PostSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: z.flattenError(result.error).fieldErrors
    };
  }

  return {
    success: true
  };
}