const {MongoClient} = require('mongodb');
const mongoConfig = require('../config/db.config')

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoConfig.testUrl, {
      useNewUrlParser: true,
    });
    db = await connection.db("fwjbDB");
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it('should insert a doc into collection', async () => {
    const skills = db.collection('skills');

    const mockSkill = {_id: 'some-skill-id', name: 'Photography'};
    await users.insertOne(mockSkill);

    const insertedSkill = await users.findOne({_id: 'some-skill-id'});
    expect(insertedSkill).toEqual(mockSkill);
  });
});