import BlogPost from "../models/BlogPost.js";

export const getBlogPosts = async (req, res) => {
  try {
    const { tag } = req.query;
    const filter = { isPublished: true };
    if (tag) filter.tags = tag;

    const posts = await BlogPost.find(filter)
      .populate("author", "name")
      .select("-content")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBlogPostBySlug = async (req, res) => {
  try {
    const post = await BlogPost.findOne({
      slug: req.params.slug,
      isPublished: true,
    }).populate("author", "name");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.create({ ...req.body, author: req.user.id });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
