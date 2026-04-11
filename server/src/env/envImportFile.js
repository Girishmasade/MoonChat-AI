import { config } from "dotenv";
config({
  path: "./.env",
});

export const port = process.env.PORT
export const mongo_url = process.env.MONGO_URI

// Production and development url

export const dev_frontend_url = process.env.FRONTEND_URL
export const prod_frontend_url = process.env.DEPLOY_FRONTEND_URL;

// secret key for admin

export const admin_secret_key = process.env.SECRET_KEY

// JWT secret key

export const jwt_secret = process.env.JWT_SECRET
export const jwt_exp = process.env.JWT_EXPIRY

// Cloudinary setup

export const cloud_name = process.env.CLOUD_NAME
export const cloud_api_key = process.env.CLOUD_API_KEY
export const cloud_api_secret = process.env.CLOUD_API_SECRET

// google id and key

export const google_client_id = process.env.GOOGLE_CLIENT_ID
export const google_client_secret = process.env.GOOGLE_CLIENT_SECRET

// github key and id

export const github_client_id = process.env.GITHUB_CLIENT_ID
export const github_client_secret = process.env.GITHUB_CLIENT_SECRET

// Groq AI KEY setup

export const groq_api_key = process.env.GROQ_API_KEY
export const groq_user_id = process.env.AI_USER_ID

// OPENAI Key

export const openai_api_key = process.env.OPENAI_API_KEY

// HuggingFace Api key

export const huggingface_api_key = process.env.HUGGINGFACE_API_KEY

// email user and pass

export const smtp_user = process.env.SMTP_USER
export const smtp_pass = process.env.SMTP_PASS