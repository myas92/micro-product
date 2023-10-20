import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import { app } from '../app';
import request from 'supertest';
declare global {
    function signin(): string[];
}

jest.mock('../nats-wrapper')

let mongo: any;
beforeAll(async () => {

});

beforeEach(async () => {

});

afterAll(async () => {

});
