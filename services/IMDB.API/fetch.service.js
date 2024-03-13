import fetch from "node-fetch";
import {tmdbGetOption} from "./config.service";

async function getData(res, url) {
    const response = await fetch(url, tmdbGetOption);
    if(response.ok){
        const datas = await response.json();
        return res.status(200).json({ status: 200, datas });
    }else{
        return res.status(404).json({ status: 404, error: "Not Found" });
    }
}
export async function switchGetData(req, res, url) {
    switch (req.method) {
        case "GET":
            await getData(res, url, tmdbGetOption);
            break;
        default:
            res.status(405).json({status: 405, error: "Method Not Allowed"});
    }
}
