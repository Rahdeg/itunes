import { connect } from '../../../lib/utils/mongo/index';
import Users from '../../../lib/utils/mongo/song.model'
import admin from '../../config/firebase'
import { NextResponse } from "next/server";


export async function GET(req){
    if(req.method === 'GET'){
        if (!req.headers.authorization) {
            return NextResponse.json({message:"invalid token"});
          }
          const token= req.headers.authorization.split(" ")[1];
          await connect();
        try {
            const decodeValue= await admin.auth().verifyIdToken(token)
            if (!decodeValue) {
                return NextResponse.json({message:"Un Authorised"});
            }else{
                const userExist= await Users.findOne({'userId':decodeValue.user_id})
                if (userExist) {
                    const filter={userId:decodeValue.user_id}
                   const option={
                    upsert:true,
                    new:true
                   }
                   try {
                    const user= await Users.findOneAndUpdate(filter,{authTime:decodeValue.auth_time},option);
                    return NextResponse.json(user);
                   } catch (error) {
                    return NextResponse.json({success:false,message:error});
                   }
    
                  }else {
                    const details={
                        name: decodeValue.name,
                        email: decodeValue.email,
                        imageUrl: decodeValue.picture,
                        userId: decodeValue.user_id,
                        role: 'admin',
                        authTime:decodeValue.auth_time,
                        emailVerified:decodeValue.email_verified,
                    };
                    try {
                    const user = new Users(details);
                    user.save();
                    return NextResponse.json(user);
                    } catch (error) {
                        return NextResponse.json({success:false,message:error});
                    }
                  }
            }
        } catch (error) {
            return NextResponse.json({error:error.message});
        }
    }
    NextResponse.setHeader('Allow',['GET'])
    return NextResponse.json(`Method ${req.method} is not allowed`);
}

