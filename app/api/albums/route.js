import { connect } from '../../../lib/utils/mongo/index';
import ALbums from '../../../lib/utils/mongo/albums.model'
import { NextResponse } from "next/server";


export async function GET(req){
    if(req.method === 'GET'){
        try {
            await connect();
            const data = await ALbums.find();
            return NextResponse.json(data);
        } catch (error) {
            return NextResponse.json({error:error.message});
        }
    }
    NextResponse.setHeader('Allow',['GET'])
    return NextResponse.json(`Method ${req.method} is not allowed`);
}

