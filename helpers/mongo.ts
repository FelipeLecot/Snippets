import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("MONGO_URI", { maxIdleTimeMS: 2000 });
const database = 'REPLACE_DB';

export const aggregate = async (
	stages: object[] = [],
	collection: string,
	options: { 
        limit?: number; 
        sort?: object; 
    } = {}
) => {
	try {
		await client.connect();

		let allOps = [...stages];

		if (options.limit != undefined) {
			allOps.push({ $limit: options.limit});
		}

		if (options.sort != undefined) {
			allOps.push({ $sort: options.sort });
		}

		let db = client.db(database);
		let result = db.collection(collection);

		return result.aggregate(allOps).toArray();
	} catch (e) {
		console.error(e);
		return false;
	}
};

export const find = async (
	filter: object = {},
	collection: string,
	options: { 
		limit?: number; 
		sort?: object; 
		projection?: object; 
 	}
	= { limit: 0, projection: {}, sort: {} }
) => {
	await client.connect();

	let db = client.db(database);
	let result = db.collection(collection);
	try {
		return result
			.find(filter, { projection: options.projection })
			.limit(options.limit)
			.sort(options.sort)
			.toArray();
	} catch (e) {
		console.error(e);
		return false;
	}
};

export const insert = async (data: object, collection: string) => {
	await client.connect();

	let db = client.db(database);
	let result = db.collection(collection);
	try {
		result.insertOne(data);
		return true;
	} catch (e) {
		console.error(e);
		return false;
	}
};

export const update = async (filter: object, update: object, collection: string) => {
	await client.connect();

	let db = client.db(database);
	let result = db.collection(collection);
	try {
		result.updateMany(filter, update);
		return true;
	} catch (e) {
		console.error(e);
		return false;
	}
};
