import { connect } from '../../../lib/utils/mongo/index';
import Songs from '../../../lib/utils/mongo/song.model'
import { NextResponse } from "next/server";


export async function GET(req){
    if(req.method === 'GET'){
        try {
            await connect();
            const data = await Songs.find();
            return NextResponse.json(data);
        } catch (error) {
            return NextResponse.json({error:error.message});
        }
    }
    NextResponse.setHeader('Allow',['GET'])
    return NextResponse.json(`Method ${req.method} is not allowed`);
}

