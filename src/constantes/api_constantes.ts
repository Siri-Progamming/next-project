export const JWT_SECRET:string = process.env.JWT_KEY as string;
export const TOKEN_EXP = Math.floor(Date.now() / 1000) + (60 * 60); // Durée de validité du token, ici 1 heur
export const COOKIE_EXP = new Date(Date.now() + (60 * 60 * 1000)).toUTCString();
