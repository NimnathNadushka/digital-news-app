import dbconnect from "../../../../config/db";
import PostItem from "../../../../models/PostItems";

dbconnect();

export async function GET() {
    try {
        const postitems = await PostItem.find().select('-__v').sort({ createdAt: -1 });
        return Response.json(postitems);
    } catch (error) {
        console.error('Error fetching post items:', error);
        return new Response(
            JSON.stringify({ message: "Server error" }), 
            { 
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}

export async function POST(request: Request) {
    try {
        // Check if request has content-type header
        const contentType = request.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            return new Response(
                JSON.stringify({ 
                    message: "Content-Type must be application/json",
                    received: contentType 
                }), 
                { 
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Get the request body
        const body = await request.text();
        if (!body || body.trim() === '') {
            return new Response(
                JSON.stringify({ message: "Request body cannot be empty" }), 
                { 
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Parse JSON
        let postitem;
        try {
            postitem = JSON.parse(body);
            console.log("Received post item data:", postitem); // Debug log
        } catch (parseError) {
            return new Response(
                JSON.stringify({ 
                    message: "Invalid JSON format",
                    error: (parseError as Error).message
                }), 
                { 
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Validate required fields
        if (!postitem.title || !postitem.img || !postitem.category) {
            return new Response(
                JSON.stringify({ 
                    message: "Missing required fields: title, img, category",
                    received: {
                        title: postitem.title || null,
                        img: postitem.img || null,
                        category: postitem.category || null
                    }
                }), 
                { 
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        try {
            const savedItem = await new PostItem({ ...postitem }).save();
            console.log("Saved item:", savedItem); // Debug log
            return new Response(JSON.stringify(savedItem), {
                headers: {
                    'Content-Type': 'application/json',
                },
                status: 201,
            });
        } catch (dbError) {
            console.error("Database error:", dbError);
            return new Response(
                JSON.stringify({ 
                    message: "Database error", 
                    error: (dbError as Error).message 
                }), 
                { 
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }
    } catch (error) {
        console.error('Error creating post item:', error);
        return new Response(
            JSON.stringify({ 
                message: "Server error",
                error: (error as Error).message 
            }), 
            { 
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}