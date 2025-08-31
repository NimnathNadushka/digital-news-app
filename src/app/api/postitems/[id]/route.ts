import dbconnect from "../../../../../config/db";
import PostItem from "../../../../../models/PostItems";

dbconnect();

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

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

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    let updates;
    
    try {
      updates = await request.json();
    } catch (error) {
      console.error('JSON parse error:', error);
      return new Response(
        JSON.stringify({ message: "Invalid JSON format" }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    if (!updates.title || !updates.category) {
      return new Response(
        JSON.stringify({ message: "Missing required fields: title, category" }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const updatedPost = await PostItem.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return new Response(
        JSON.stringify({ message: "Post not found" }), 
        { 
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    return Response.json(updatedPost);
  } catch (error) {
    console.error('Error updating post item:', error);
    return new Response(
      JSON.stringify({ message: "Server error" }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const deletedPost = await PostItem.findByIdAndDelete(id);
    
    if (!deletedPost) {
      return new Response(
        JSON.stringify({ message: "Post not found" }), 
        { 
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    return Response.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error('Error deleting post item:', error);
    return new Response(
      JSON.stringify({ message: "Server error" }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
