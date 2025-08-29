import dbconnect from "../../../../../config/db";
import PostItem from "../../../../../models/PostItems";

dbconnect();

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // Await params before accessing properties

  try {
    const postitem = await PostItem.findById(id).select('-__v');
    
    if (!postitem) {
      return new Response(JSON.stringify({ message: "Post not found" }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return Response.json(postitem);
  } catch (error) {
    console.error('Error fetching post item:', error);
    return new Response(
      JSON.stringify({ message: "Server error" }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
