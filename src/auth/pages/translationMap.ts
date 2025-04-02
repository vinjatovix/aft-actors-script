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
  es_gl: {
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
  es_gl: {
    header: "Iniciar Sesión",
    email: "Correo",
    password: "Contrasinal",
    callToAction: " Non tes conta?",
    action: "Rexístrate",
    submit: "Entrar",
  },
};

const characterBuildingTranslationMap: {
  [key: string]: {
    header: string;
    at: string;
    updated: string;
    save: string;
    center: {
      label: string;
      instinctive: string;
      emotional: string;
      mental: string;
    };
    sceneCircumstances: {
      label: string;
      placeholder: string;
    };
    previousCircumstances: {
      label: string;
      placeholder: string;
    };
    startingPoint: {
      label: string;
      placeholder: string;
    };
    relationshipCircumstances: string;
    character: string;
    circumstance: string;
    actionUnits: {
      label: string;
      action: string;
      strategies: string;
      strategy: string;
    };
  };
} = {
  es_gl: {
    header: "Construcción de Persoaxes",
    at: "no",
    updated: "Actualizado",
    save: "Gardar",
    center: {
      label: "Centro",
      instinctive: "Instintivo",
      emotional: "Emocional",
      mental: "Mental",
    },
    sceneCircumstances: {
      label: "Circunstancias da Escea",
      placeholder: "É a cea de cumpreanos do avó",
    },
    previousCircumstances: {
      label: "Circunstancias Previas",
      placeholder:
        "El Doctor acaba de decirle a Brick que el abuelo sí tiene cáncer",
    },
    startingPoint: {
      label: "Punto de Partida",
      placeholder: "Brick está medio borracho e solo quere evadirse",
    },
    relationshipCircumstances: "Circunstancias de Relación",
    character: "Personaxe",
    circumstance: "Circunstancia",
    actionUnits: {
      label: "Unidades de Acción",
      action: "Acción",
      strategies: "Estratexias",
      strategy: "Estratexia",
    },
  },
};

export {
  registerTranslationMap,
  loginTranslationMap,
  characterBuildingTranslationMap,
};
