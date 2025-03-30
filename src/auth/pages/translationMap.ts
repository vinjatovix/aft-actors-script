const registerTranslationMap: {
  [key: string]: {
    header: string;
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
    callToAction: string;
    action: string;
    submit: string;
  };
} = {
  GL: {
    header: "Rexistro",
    username: "Nome",
    email: "Correo",
    password: "Contrasinal",
    repeatPassword: "Confirma contrasinal",
    callToAction: "Xa tes conta?",
    action: "Entra",
    submit: "Rexístrate",
  },
};

const loginTranslationMap: {
  [key: string]: {
    header: string;
    email: string;
    password: string;
    callToAction: string;
    action: string;
    submit: string;
  };
} = {
  GL: {
    header: "Iniciar Sesión",
    email: "Correo",
    password: "Contrasinal",
    callToAction: " Non tes conta?",
    action: "Rexístrate",
    submit: "Entrar",
  },
};

export { registerTranslationMap, loginTranslationMap };
