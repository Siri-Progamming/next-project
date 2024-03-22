import clientPromise from "../../../lib/mongodb";

const client = await clientPromise;
export const db = client.db("bdd");
