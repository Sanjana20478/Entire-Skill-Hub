import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import BusinessIdea from "../models/BusinessIdea.js";
import Feedback from "../models/Feedback.js";
import Interest from "../models/Interest.js";
import Mentor from "../models/Mentor.js";
import MentorSession from "../models/MentorSession.js";
import ProgressTracking from "../models/ProgressTracking.js";
import Resource from "../models/Resource.js";
import Roadmap from "../models/Roadmap.js";
import RoadmapStep from "../models/RoadmapStep.js";
import Skill from "../models/Skill.js";
import User from "../models/User.js";

dotenv.config();
await connectDB();

const reset = async () => {
  await Promise.all([
    User.deleteMany(),
    Skill.deleteMany(),
    Interest.deleteMany(),
    BusinessIdea.deleteMany(),
    Roadmap.deleteMany(),
    RoadmapStep.deleteMany(),
    Resource.deleteMany(),
    Mentor.deleteMany(),
    MentorSession.deleteMany(),
    ProgressTracking.deleteMany(),
    Feedback.deleteMany()
  ]);
};

const roadmapStepTemplates = [
  ["Idea validation", "Validate demand", ["Interview 10 target customers", "Check competitors", "Define a first paid offer"]],
  ["Required tools", "Collect essential tools", ["List must-have tools", "Compare low-cost alternatives", "Prepare a launch kit"]],
  ["Required skills", "Build missing capabilities", ["Learn pricing", "Practice delivery workflow", "Improve customer communication"]],
  ["Cost estimation", "Estimate startup budget", ["Separate one-time and monthly costs", "Set minimum viable budget", "Plan break-even sales"]],
  ["Legal registration", "Complete basic compliance", ["Choose business name", "Check local registration rules", "Prepare invoices and records"]],
  ["Marketing basics", "Find first customers", ["Create social profiles", "Post proof of work", "Ask for referrals"]],
  ["Growth tips", "Scale sustainably", ["Track repeat buyers", "Create bundles", "Build partnerships"]]
];

const run = async () => {
  await reset();

  const skills = await Skill.insertMany([
    { name: "Cooking", category: "Food" },
    { name: "Tailoring", category: "Fashion" },
    { name: "Digital Skills", category: "Technology" },
    { name: "Handicrafts", category: "Creative" },
    { name: "Teaching", category: "Education" },
    { name: "Photography", category: "Creative" },
    { name: "Social Media", category: "Marketing" }
  ]);

  const interests = await Interest.insertMany([
    { name: "Food" },
    { name: "Fashion" },
    { name: "Online Work" },
    { name: "Home Business" },
    { name: "Education" },
    { name: "Creative Products" }
  ]);

  const byName = (items, name) => items.find((item) => item.name === name)._id;

  const admin = await User.create({
    name: "Admin User",
    email: "admin@skillbiz.com",
    password: "admin123",
    role: "admin"
  });

  const user = await User.create({
    name: "Demo Learner",
    email: "user@skillbiz.com",
    password: "user123",
    role: "user",
    skills: [byName(skills, "Cooking"), byName(skills, "Digital Skills")],
    interests: [byName(interests, "Food"), byName(interests, "Online Work")]
  });

  const mentorUser = await User.create({
    name: "Meera Mentor",
    email: "mentor@skillbiz.com",
    password: "mentor123",
    role: "mentor",
    bio: "Micro-business mentor for home brands and online selling.",
    location: "Bengaluru"
  });

  const mentor = await Mentor.create({
    user: mentorUser._id,
    expertise: ["Food business", "Social media marketing", "Pricing"],
    experienceYears: 6,
    availability: "Saturday evenings",
    isApproved: true,
    mentees: [user._id]
  });

  await MentorSession.create({
    mentor: mentor._id,
    mentee: user._id,
    topic: "Pricing and first customer plan",
    preferredDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    mode: "Online",
    status: "requested"
  });

  const ideas = await BusinessIdea.insertMany([
    {
      title: "Home Bakery Business",
      description: "Sell cakes, cookies, and healthy snacks from home with pre-order delivery.",
      category: "Food",
      startupCost: "Rs. 8,000 - Rs. 25,000",
      earningPotential: "Rs. 15,000+/month",
      matchingSkills: [byName(skills, "Cooking")],
      matchingInterests: [byName(interests, "Food"), byName(interests, "Home Business")],
      tags: ["Cooking", "Bakery", "Home Business"],
      createdBy: admin._id
    },
    {
      title: "Boutique Alteration Studio",
      description: "Provide custom stitching, alterations, and small fashion collections.",
      category: "Fashion",
      startupCost: "Rs. 10,000 - Rs. 40,000",
      earningPotential: "Rs. 20,000+/month",
      matchingSkills: [byName(skills, "Tailoring")],
      matchingInterests: [byName(interests, "Fashion"), byName(interests, "Home Business")],
      tags: ["Tailoring", "Boutique", "Fashion"],
      createdBy: admin._id
    },
    {
      title: "Freelance Digital Services",
      description: "Offer design, data entry, social media, and website support to local businesses.",
      category: "Technology",
      startupCost: "Rs. 2,000 - Rs. 15,000",
      earningPotential: "Rs. 25,000+/month",
      matchingSkills: [byName(skills, "Digital Skills"), byName(skills, "Social Media")],
      matchingInterests: [byName(interests, "Online Work")],
      tags: ["Digital Skills", "Freelancing", "Online Work"],
      createdBy: admin._id
    },
    {
      title: "Handmade Store",
      description: "Create handmade gifts, decor items, and craft products for online marketplaces.",
      category: "Creative",
      startupCost: "Rs. 5,000 - Rs. 20,000",
      earningPotential: "Rs. 12,000+/month",
      matchingSkills: [byName(skills, "Handicrafts"), byName(skills, "Photography")],
      matchingInterests: [byName(interests, "Creative Products"), byName(interests, "Home Business")],
      tags: ["Handicrafts", "Handmade", "Marketplace"],
      createdBy: admin._id
    },
    {
      title: "Online Tutoring Micro-Academy",
      description: "Teach school subjects or practical skills through live sessions and worksheets.",
      category: "Education",
      startupCost: "Rs. 3,000 - Rs. 12,000",
      earningPotential: "Rs. 18,000+/month",
      matchingSkills: [byName(skills, "Teaching"), byName(skills, "Digital Skills")],
      matchingInterests: [byName(interests, "Education"), byName(interests, "Online Work")],
      tags: ["Teaching", "Tutoring", "Education"],
      createdBy: admin._id
    }
  ]);

  for (const idea of ideas) {
    const roadmap = await Roadmap.create({
      title: `${idea.title} Roadmap`,
      businessIdea: idea._id,
      overview: `A practical launch plan for starting and growing a ${idea.title.toLowerCase()}.`,
      estimatedDuration: "8 weeks",
      phases: [
        { title: "Validate", summary: "Confirm customer demand and pricing." },
        { title: "Launch", summary: "Prepare tools, legal basics, and first offer." },
        { title: "Grow", summary: "Market consistently and improve repeat sales." }
      ]
    });

    await RoadmapStep.insertMany(
      roadmapStepTemplates.map(([type, title, tasks], index) => ({
        roadmap: roadmap._id,
        type,
        title,
        description: `${title} for ${idea.title}.`,
        order: index + 1,
        tasks
      }))
    );

    await Resource.create({
      title: `${idea.category} launch checklist`,
      description: `Beginner-friendly checklist for ${idea.title}.`,
      type: "Checklist",
      url: "https://www.sba.gov/business-guide/10-steps-start-your-business",
      category: idea.category,
      relatedIdea: idea._id,
      uploadedBy: mentorUser._id,
      isApproved: true
    });
  }

  console.log("Seed completed");
  console.log("Demo logins: admin@skillbiz.com/admin123, user@skillbiz.com/user123, mentor@skillbiz.com/mentor123");
  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
