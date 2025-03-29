const { AirplaneRepo } = require('../repo');

const airplaneRepo = new AirplaneRepo();

const createAirplane = async (data) => {
    try {
        const airplane = await airplaneRepo.create(data);
        return airplane;
    } catch (error) {
        throw error
    }
}

module.exports = {
    createAirplane
}