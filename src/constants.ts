import { getEnv } from "./helpers/getEnv";

const { API_URL, ENVIRONMENT, APP_VERSION } = getEnv();

const REGEX = {
  email: {
    valid: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    forbiddenDomains: [/mailinator/i, /tempmail/i, /10minutemail/i],
  },
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
  username: /^[a-zA-Z0-9._-]{4,}$/,
  xss: [
    /<script\b[^>]*>[\s\S]*?<\/script>/i,
    /javascript:/i,
    /on\w+\s*=\s*".*?"/i,
    /on\w+\s*=\s*.*/i,
    /<iframe\b[^>]*>/i,
    /<img\b[^>]*on\w+\s*=\s*".*?"/i,
  ],
  crlf: [/\r\n|\n|\r/g, /%0D%0A/i],
  maxInputLength: 250,
};

const API_MAP = {
  auth: {
    login: { url: `${API_URL}/api/v1/Auth/login`, method: "POST" },
    register: { url: `${API_URL}/api/v1/Auth/register`, method: "POST" },
    refreshToken: { url: `${API_URL}/api/v1/Auth/refresh`, method: "GET" },
  },
  books: {
    getAll: { url: `${API_URL}/api/v1/Books`, method: "GET" },
    getById: { url: `${API_URL}/api/v1/Books/:id`, method: "GET" },
    create: { url: `${API_URL}/api/v1/Books`, method: "POST" },
    update: { url: `${API_URL}/api/v1/Books/:id`, method: "PATCH" },
    delete: { url: `${API_URL}/api/v1/Books/:id`, method: "DELETE" },
  },
  characters: {
    getAll: { url: `${API_URL}/api/v1/Characters`, method: "GET" },
    getById: { url: `${API_URL}/api/v1/Characters/:id`, method: "GET" },
    create: { url: `${API_URL}/api/v1/Characters`, method: "POST" },
    update: { url: `${API_URL}/api/v1/Characters/:id`, method: "PATCH" },
    delete: { url: `${API_URL}/api/v1/Characters/:id`, method: "DELETE" },
  },
  scenes: {
    getAll: { url: `${API_URL}/api/v1/Scenes`, method: "GET" },
    getById: { url: `${API_URL}/api/v1/Scenes/:id`, method: "GET" },
    create: { url: `${API_URL}/api/v1/Scenes`, method: "POST" },
    update: { url: `${API_URL}/api/v1/Scenes/:id`, method: "PATCH" },
    delete: { url: `${API_URL}/api/v1/Scenes/:id`, method: "DELETE" },
  },
};

export { ENVIRONMENT, API_URL, API_MAP, APP_VERSION, REGEX };
