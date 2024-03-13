import {TestHelper} from '../../tests/testhelper';
import request from "supertest";
import app from "../app";

const mockSensorData = [
    {
        "id": 8,
        "temperature": 22,
        "humidity": 30,
        "windspeed": 15,
        "recordedTime": "2024-03-12"
    }
]

const mockAverageMetric = {
    "AVG of temperature:": "22.0000000000000000"
}

const mockSumMetric = {
        "SUM of temperature:": "44"
    }

const mockError = {
    "errors": [
        {
            "message": "Invalid Stat: Enter either AVG,MAX, MIN, SUM",
            "context": {}
        }
    ]
}


beforeAll(async () => {
    await TestHelper.instance.setupTestDB();
  });
  
  afterAll(() => {
    TestHelper.instance.teardownTestDB();
  });

  describe("sensor data", () => {
    test("Get sensor data with id", async () => {
      const res = await request(app).get(`/api/sensorsData?sensorId=${3}`);
     expect(res.body).toEqual(mockSensorData);
    });

    test("Get Average temperature for a sensor", async() => {
        const res = await request(app).get(`/api/sensorsData?sensorId=${3}&startDate=${'2024-03-05'}&endDate=${'2024-03-12'}&metrics=${'temperature'}&stats=${'AVG'}`);
        expect(res.body).toEqual(mockAverageMetric)
    })

    test("Get Sum temperature for a sensor", async() => {
        const res = await request(app).get(`/api/sensorsData?sensorId=${3}&startDate=${'2024-03-05'}&endDate=${'2024-03-13'}&metrics=${'temperature'}&stats=${'SUM'}`);
        expect(res.body).toEqual(mockSumMetric)
    })

    test("Error when wrong stat is entered", async() => {
        const res = await request(app).get(`/api/sensorsData?sensorId=${3}&startDate=${'2024-03-05'}&endDate=${'2024-03-13'}&metrics=${'temperature'}&stats=${'SU'}`);
        expect(res.body).toEqual(mockError)
    })
  });