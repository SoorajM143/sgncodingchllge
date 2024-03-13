import {TestHelper} from '../../tests/testhelper';
import request from "supertest";
import app from "../app";

const mockSensors = [
    { id: 1, name: 'SENSOR1' },
      { id: 2, name: 'SENSOR2' },
      { id: 3, name: 'SENSOR3' },
      { id: 4, name: 'SENSOR4' },
      { id: 5, name: 'SENSOR5' }
]
const mockSensor = {id: 1, name: 'SENSOR1' }

beforeAll(async () => {
    await TestHelper.instance.setupTestDB();
  });
  
  afterAll(() => {
    TestHelper.instance.teardownTestDB();
  });

  describe("sensor routes", () => {
    test("Get all sensors", async () => {
      const res = await request(app).get("/api/sensors");
     expect(res.body).toEqual(mockSensors);
    });

    test("Get Sensor with :id", async() => {
        const res = await request(app).get(`/api/sensors/${1}`);
        expect(res.body).toEqual(mockSensor)
    })
  });
