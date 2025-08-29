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

// ADD PUT METHOD FOR UPDATING POSTS
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    // Check if request has content-type header
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return new Response(
        JSON.stringify({ message: "Content-Type must be application/json" }), 
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
    let updates;
    try {
      updates = JSON.parse(body);
    } catch (parseError) {
      return new Response(
        JSON.stringify({ message: "Invalid JSON format" }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate required fields
    if (!updates.title || !updates.category) {
      return new Response(
        JSON.stringify({ message: "Missing required fields: title, category" }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Find and update the post
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

// ADD DELETE METHOD FOR DELETING POSTS
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
    
    return new Response(
      JSON.stringify({ message: "Post deleted successfully" }), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
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
