import axios from "axios";

async function musixMatchHandler(req) {
    try {
        const queryString = req.url
            .replace(/(https|http):\/\/(\w|.)+app\/ridm\/lyrics(\/)*/, '')
            .split(/(\?|\&)/)
            .map(query => query.split('='));
        
        const queries = queryString
            .map(([key, entry]) => ({ [key]: entry }))
            .reduce((entries, entry) => ({ ...entries, ...entry }), {});

        const { path } = queries;
        const params = { ...queries, apikey: process.env.MUSIXMATCH_API_KEY };

        const URL = `${process.env.MUSIXMATCH_URL}/${path}`;

        const response = await axios.get(URL, { params });
        
        return Response.json(response.data, { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(error.message, { status: 500 });
    }
};

export default musixMatchHandler;

export const config = {
    path: "/ridm/lyrics"
};