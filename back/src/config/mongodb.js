import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('|||connexion réussie à MongoDB|||');
} catch (error) {
    console.error('Erreur MongoDB:', error.message);
    process.exit(1);
}

export default mongoose;