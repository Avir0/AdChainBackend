import express from "express";
import jwt from "jsonwebtoken";
import Ad from "../models/Ad.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/company", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.role !== "company") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const ads = await Ad.find({ companyId: user._id });

    const totalAds = ads.length;
    const acceptedAds = ads.filter(a => a.status === "accepted").length;

    const totalInfluencers = ads.reduce(
      (sum, ad) => sum + (ad.influencers?.length || 0),
      0
    );

    const revenue = acceptedAds * 500; // demo logic

    const status = [
      { name: "Accepted", value: acceptedAds },
      { name: "Pending", value: ads.filter(a => a.status === "pending").length },
      { name: "Rejected", value: ads.filter(a => a.status === "rejected").length },
    ];

    const growth = ads.map((_, i) => ({
      month: `C${i + 1}`,
      count: i + 1,
    }));

    res.json({
      totalAds,
      acceptedAds,
      totalInfluencers,
      revenue,
      status,
      growth,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
