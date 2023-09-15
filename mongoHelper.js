import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient("MONGO_URI", {maxIdleTimeMS: 2000});

export const aggregate = async (stages = [], collection, options = {}) => {
    try {
        await client.connect();

        let allOps = [
            ...stages
        ]

        if (options.limit != undefined) {
            allOps.push({'$limit': parseInt(options.limit)});
        }

        if (options.sort != undefined) {
            allOps.push({'$sort': options.sort});
        }

        let db = client.db("REPLACE_DB");
        let result = db.collection(collection);
        
        return result
        .aggregate(
            allOps
        )
        .toArray();
    }
    catch (e) {
        console.error(e);
        return false;
    }
}

export const find = async (filter = {}, collection, options = {limit: 0, projection: {}, sort: {}}) => {
    await client.connect();

    let db = client.db("REPLACE_DB");
    let result = db.collection(collection);
    try {
        return result
            .find(filter, {projection: options.projection})
            .limit(parseInt(options.limit))
            .sort(options.sort)
            .toArray();
    }
    catch (e) {
        console.error(e);
        return false;
    }
}

export const insert = async (data, collection) => {
    await client.connect();

    let db = client.db("REPLACE_DB");
    let result = db.collection(collection);
    try {
        result.insertOne(data);
        return true;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}

export const update = async (filter, update, collection) => {
    await client.connect();

    let db = client.db("REPLACE_DB");
    let result = db.collection(collection);
    try {
        result.updateMany(filter, update);
        return true;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}