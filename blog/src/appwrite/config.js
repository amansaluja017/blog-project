import conf from "../conf/conf";
import { Client, ID, Databases, Query, Storage } from 'appwrite'

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client.setEndpoint(conf.appwriteURL).setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionID,
                slug,
                { title, content, featuredImage, status, userId })
        } catch (error) {
            console.error("create Post", error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionID,
                slug,
                { title, content, featuredImage, status }
            )
        } catch (error) {
            console.error("update Post", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionID,
                slug
            )
            return true;
        } catch (error) {
            console.error("delete Post", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionID,
                slug
            )
        } catch (error) {
            console.error("getPost", error);
            return false;
        }
    }

    async getAllPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionID,
                queries,
                { limit: 100 }
            )
        } catch (error) {
            console.error("get All Posts", error)
            return false;
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.error("upload file", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.error("delete file", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        try {
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId,
                { maxWidth: 400, maxHeight: 400 }
            )
        } catch (error) {
            console.error("file preview", error)
            return false;
        }
    }
}

const service = new Service();

export default service;