import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import BlogPost from "../models/BlogPost.js";

const AUTHOR_ID = "6a59be3f98115943aaadfecf";

const posts = [
  {
    title: "5 Habits That Actually Make You a Better Programmer",
    slug: "5-habits-better-programmer",
    excerpt:
      "Forget the productivity hacks — these are the habits that compound over time.",
    content: `Most advice about becoming a better programmer focuses on tools and frameworks. But the real gains come from a handful of unglamorous habits.

First, read other people's code regularly — not just when you're stuck, but as a deliberate practice. It rewires how you think about structure.

Second, write things down. A short note explaining why you made a decision saves hours of confusion later, for you and for anyone who touches the code after you.

Third, get comfortable being the least experienced person in the room. Growth happens at the edge of your competence, not in your comfort zone.

Fourth, ship small things often. A finished small project teaches more than an abandoned big one.

Fifth, ask "why" one level deeper than feels natural. Understanding the reasoning behind a pattern matters more than memorizing the pattern itself.`,
    tags: ["career", "learning"],
    author: AUTHOR_ID,
  },
  {
    title: "Why We Teach MERN Stack First",
    slug: "why-we-teach-mern-stack-first",
    excerpt:
      "A look at why MongoDB, Express, React, and Node form a strong foundation for new developers.",
    content: `When students ask which stack to learn first, we point them toward MERN — and there's a clear reason behind it.

JavaScript is the one language that runs consistently across the entire stack, from the browser to the server to the database queries. That consistency means less context-switching for a beginner, and more time spent on core programming concepts instead of syntax differences.

React teaches component-based thinking, which shows up in nearly every modern frontend framework. Express is minimal enough to expose what's actually happening in a web server, rather than hiding it behind heavy abstraction. MongoDB's document model maps naturally onto how JavaScript objects already work, easing the transition into working with a real database.

None of this means MERN is the only path worth taking — but as a first stack, it removes a lot of unnecessary friction.`,
    tags: ["curriculum", "web-development"],
    author: AUTHOR_ID,
  },
];

const seed = async () => {
  await connectDB();
  await BlogPost.deleteMany();
  await BlogPost.insertMany(posts);
  console.log("Blog posts seeded");
  mongoose.connection.close();
};

seed();
