import * as Yup from "yup";

export const validationLoginSchema = Yup.object({
  email: Yup.string().email("Por favor, use um email válido!").required("Email é obrigatório."),
  password: Yup.string().min(8, "Password precisa ter ao menos 8 caracteres.").required("Password é obrigatório."),
});

export const validationRecoverPassSchema = Yup.object({
  email: Yup.string().email("Por favor, use um email válido!").required("Email é obrigatório."),
});

export const validationResetPassSchema = Yup.object({
  password: Yup.string().min(8, "Password precisa ter ao menos 8 caracteres.").required("Password é obrigatório"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords precisam ser iguais")
    .required("Confirmação de password é obrigatória"),
});


export const validationRegistrationSchema = Yup.object({
  email: Yup.string().email("Por favor, use um email válido!").required("Email é obrigatório."),
  password: Yup.string().min(8, "Password precisa ter ao menos 8 caracteres.").required("Password é obrigatório."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords devem corresponder.")
    .required("Confirmação de senha é obrigatória."),
  name: Yup.string()
    .min(2, "Nome é obrigatório")
    .matches(/^[a-zA-Z\s]{2,50}$/, "Nome inválido.")
    .required("Nome é obrigatório."),
  aptoNumber: Yup.string().required("Nº apartamento é obrigatório."),
});
