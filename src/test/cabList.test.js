const request = require('supertest')
const mongoose = require('mongoose')
const {MongoMemoryServer} = require('mongodb-memory-server')
const jwt = require('jsonwebtoken')
require('dotenv').config({path : '.env.test'})

const app= require('../../app')
const cabList = require('../models/cab')
const User = require('../models/user')
const { beforeEach } = require('node:test')

let mongoServer

describe('POST /api/v1/cabs',  () => {
    let token,res
    beforeEach(async() => {
        await request(app)
            .post('/api/v1/auth/register')
            .send({
                name:"donna",
                email:"donna123@gmail.com",
                password:"qwertyu"
            })

        res = await request(app)
            .post('/api/v1/auth/login')
            .send({
                email:"donna123@gmail.com",
                password:"qwertyu"
            })

        token = res.body.token
    })

    test("should reject unauthorized access" , async() => {
        const response = await request(app)
            .post('/api/v1/cabs')
            .send({
                pickup:{
                    type:"Point",
                    coordinates:[75.7893, 26.9164]
                },
                dropoff:{
                    type:"Point",
                    coordinates:[75.7531, 26.9854]
                }
            })

        expect(response.status).toBe(401)
    })

    test("should return nearby available cabs only" , async () => {
        await cabList.create([
                {
                    driverName: "Alice Johnson",
                    carModel: "Toyota Prius",
                    carPlateNo: "KA05AB1234",
                    fuelType: "Petrol",
                    location: {
                    type: "Point",
                    coordinates: [75.7873, 26.9124]
                    },
                    status: "Available"
                },
                {
                    driverName: "Bob Smith",
                    carModel: "Honda City",
                    carPlateNo: "MH12XY5678",
                    fuelType: "Diesel",
                    location: {
                    type: "Point",
                    coordinates: [77.2090, 28.6139]
                    },
                    status: "Available"
                },
                {
                    driverName: "El Perry",
                    carModel: "Shift Prius",
                    carPlateNo: "KA05AC88765",
                    fuelType: "Petrol",
                    location: {
                    type: "Point",
                    coordinates: [75.7893, 26.9164]
                    },
                    status: "Booked"
                }
            ])

        const response = await request(app)
            .post('/api/v1/cabs')
            // .set('Authorization',`Bearer ${token}`)
            .send({
                pickup:{
                    type:"Point",
                    coordinates:[75.7893, 26.9164]
                },
                dropoff:{
                    type:"Point",
                    coordinates:[75.7531, 26.9854]
                }
            })
        expect(response.status).toBe(200)
        expect(response.body.nearbyCabs.length).toBe(1)
        expect(response.body.nearbyCabs[0].driverName).toBe("Alice Johnson")
    })

    test("no available cabs within range",async() => {
                await cabList.create([
                {
                    driverName: "Alice Johnson",
                    carModel: "Toyota Prius",
                    carPlateNo: "KA05AB1234",
                    fuelType: "Petrol",
                    location: {
                    type: "Point",
                    coordinates: [75.7873, 26.9124]
                    },
                    status: "Available"
                },
                {
                    driverName: "El Perry",
                    carModel: "Shift Prius",
                    carPlateNo: "KA05AC88765",
                    fuelType: "Petrol",
                    location: {
                    type: "Point",
                    coordinates: [75.7893, 26.9164]
                    },
                    status: "Booked"
                }
            ])

        const response = await request(app)
            .post('/api/v1/cabs')
            // .set('Authorization',`Bearer ${token}`)
            .send({
                pickup:{
                    type:"Point",
                    coordinates:[87.7893, 26.9164]
                },
                dropoff:{
                    type:"Point",
                    coordinates:[75.7531, 26.9854]
                }
            })
        expect(response.status).toBe(200)
        expect(response.body.nearbyCabs.length).toBe(0)
    } )

    test("all cabs within range are booked" , async() => {
                await cabList.create([
                {
                    driverName: "Bob Smith",
                    carModel: "Honda City",
                    carPlateNo: "MH12XY5678",
                    fuelType: "Diesel",
                    location: {
                    type: "Point",
                    coordinates: [77.2090, 28.6139]
                    },
                    status: "Available"
                },
                {
                    driverName: "El Perry",
                    carModel: "Shift Prius",
                    carPlateNo: "KA05AC88765",
                    fuelType: "Petrol",
                    location: {
                    type: "Point",
                    coordinates: [75.7893, 26.9164]
                    },
                    status: "Booked"
                }
            ])

        const response = await request(app)
            .post('/api/v1/cabs')
            // .set('Authorization',`Bearer ${token}`)
            .send({
                pickup:{
                    type:"Point",
                    coordinates:[75.7893, 26.9164]
                },
                dropoff:{
                    type:"Point",
                    coordinates:[75.7531, 26.9854]
                }
            })
        expect(response.status).toBe(200)
        expect(response.body.nearbyCabs.length).toBe(0)
    })

    test("pickup is missing", async() => {

        const response = await request(app)
            .post('/api/v1/cabs')
            // .set('Authorization',`Bearer ${token}`)
            .send({
                dropoff:{
                    type:"Point",
                    coordinates:[75.7531, 26.9854]
                }
            })
        expect(response.status).toBe(400)
    })

    test("invalid pickup" ,async() => {

        const response = await request(app)
            .post('/api/v1/cabs')
            // .set('Authorization',`Bearer ${token}`)
            .send({
                pickup:{
                    type:"Point",
                    coordinates:["hjg", 26.9164]
                },
                dropoff:{
                    type:"Point",
                    coordinates:[75.7531, 26.9854]
                }
            })
        expect(response.status).toBe(400)
    })
})

beforeAll(async () =>{
    mongoServer = await MongoMemoryServer.create()
    const uri =  mongoServer.getUri()
    await mongoose.connect(uri)
})

afterEach(async() => {
    await User.deleteMany()
    await cabList.deleteMany()
})

afterAll(async () =>{
    await mongoose.disconnect()
    await mongoServer.stop()
})


