import {v2 as cloudinary} from 'cloudinary'
import { config } from 'dotenv'
import { cloud_api_key, cloud_api_secret, cloud_name } from '../env/envImportFile.js';

config()

cloudinary.config({
    cloud_name: cloud_name,
    api_key: cloud_api_key,
    api_secret: cloud_api_secret
})

export default cloudinary;