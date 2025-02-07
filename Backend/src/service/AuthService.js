import crypto from 'crypto';
import bcrypt from 'bcrypt'

export default class AuthService{

    async generateRandomPassword(length = 8) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = crypto.randomInt(0, characters.length);
            password += characters[randomIndex];
        }
        return password;
    }

    async hashPassword(password){
        const salts = await bcrypt.genSalt(10);
        return bcrypt.hash(password,salts);
    }

    async validatePassword(password,userPassword){
        return bcrypt.compare(password,userPassword);
    }

}