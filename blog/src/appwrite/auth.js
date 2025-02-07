import conf from "../conf/conf";
import { Client, Account, ID } from 'appwrite'

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({name, email, password}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount) {
                return this.loginAccount({email, password})
            }else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async loginAccount({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.error("account is not logged in", error);
        }
    }

    async getCurrentUser() {
        try {
            await this.account.get();
        } catch (error) {
            console.error("get current user failed", error);
        }

        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.error("logout error", error);
        }
    }
}

const authService = new AuthService();

export default authService