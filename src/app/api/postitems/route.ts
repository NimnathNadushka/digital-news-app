import dbconnect from "../../../../config/db";
import PostItem from "../../../../models/PostItems";

dbconnect();

export async function GET() {
    const postitems = await PostItem.find().select('-__v');
    return Response.json(postitems);
}


export async function POST(request: Request) {
    const postitem = await request.json();
    
    try{
        const savedItem = await new PostItem( {...postitem}).save();
        return new Response(JSON.stringify(savedItem),{
            headers:{
                'content-Type':'application/json',
            },
            status:201,
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: "SERVER ERROR" }), { status: 500 });
    }
}