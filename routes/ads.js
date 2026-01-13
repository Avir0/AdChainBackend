
// // // import express from 'express';
// // // import jwt from 'jsonwebtoken';
// // // import Ad from '../models/Ad.js';
// // // import User from '../models/User.js';

// // // const router = express.Router();

// // // // Create Ad (Company only)
// // // router.post('/', async (req, res) => {
// // //   try {
// // //     const token = req.headers.authorization?.split(' ')[1];
// // //     if (!token) {
// // //       return res.status(401).json({ message: 'No token provided' });
// // //     }

// // //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// // //     const user = await User.findById(decoded.userId);
// // //     if (!user) {
// // //       return res.status(404).json({ message: 'User not found' });
// // //     }

// // //     if (user.role !== 'company') {
// // //       return res.status(403).json({ message: 'Only companies can create ads' });
// // //     }

// // //     const { title, description, budget, category } = req.body;

// // //     const ad = new Ad({
// // //       title,
// // //       description,
// // //       budget,
// // //       category,
// // //       companyId: user._id,
// // //     });

// // //     await ad.save();

// // //     res.status(201).json(ad);
// // //   } catch (err) {
// // //     res.status(500).json({ message: 'Server error', error: err.message });
// // //   }
// // // });

// // // // Get Ads for Influencers (Matching Categories)
// // // router.get('/', async (req, res) => {
// // //   try {
// // //     const token = req.headers.authorization?.split(' ')[1];
// // //     if (!token) {
// // //       return res.status(401).json({ message: 'No token provided' });
// // //     }

// // //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// // //     const user = await User.findById(decoded.userId);
// // //     if (!user) {
// // //       return res.status(404).json({ message: 'User not found' });
// // //     }

// // //     if (user.role !== 'influencer') {
// // //       return res.status(403).json({ message: 'Only influencers can view ads' });
// // //     }

// // //     const ads = await Ad.find({
// // //       category: { $in: user.categories },
// // //       status: 'pending',
// // //     }).populate('companyId', 'name');

// // //     res.json(ads);
// // //   } catch (err) {
// // //     res.status(500).json({ message: 'Server error', error: err.message });
// // //   }
// // // });

// // // // Get Ads Created by Company
// // // router.get('/my-ads', async (req, res) => {
// // //   try {
// // //     const token = req.headers.authorization?.split(' ')[1];
// // //     if (!token) {
// // //       return res.status(401).json({ message: 'No token provided' });
// // //     }

// // //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// // //     const user = await User.findById(decoded.userId);
// // //     if (!user) {
// // //       return res.status(404).json({ message: 'User not found' });
// // //     }

// // //     if (user.role !== 'company') {
// // //       return res.status(403).json({ message: 'Only companies can view their ads' });
// // //     }

// // //     const ads = await Ad.find({ companyId: user._id }).populate('acceptedBy', 'name');
// // //     res.json(ads);
// // //   } catch (err) {
// // //     res.status(500).json({ message: 'Server error', error: err.message });
// // //   }
// // // });

// // // // Get Accepted Ads for Influencer
// // // router.get('/accepted', async (req, res) => {
// // //   try {
// // //     const token = req.headers.authorization?.split(' ')[1];
// // //     if (!token) {
// // //       return res.status(401).json({ message: 'No token provided' });
// // //     }

// // //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// // //     const user = await User.findById(decoded.userId);
// // //     if (!user) {
// // //       return res.status(404).json({ message: 'User not found' });
// // //     }

// // //     if (user.role !== 'influencer') {
// // //       return res.status(403).json({ message: 'Only influencers can view their accepted ads' });
// // //     }

// // //     const ads = await Ad.find({
// // //       acceptedBy: user._id,
// // //       status: 'accepted',
// // //     }).populate('companyId', 'name');

// // //     res.json(ads);
// // //   } catch (err) {
// // //     res.status(500).json({ message: 'Server error', error: err.message });
// // //   }
// // // });

// // // // Accept Ad (Influencer only)
// // // router.post('/:adId/accept', async (req, res) => {
// // //   try {
// // //     const token = req.headers.authorization?.split(' ')[1];
// // //     if (!token) {
// // //       return res.status(401).json({ message: 'No token provided' });
// // //     }

// // //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// // //     const influencer = await User.findById(decoded.userId);
// // //     if (!influencer) {
// // //       return res.status(404).json({ message: 'User not found' });
// // //     }

// // //     if (influencer.role !== 'influencer') {
// // //       return res.status(403).json({ message: 'Only influencers can accept ads' });
// // //     }

// // //     const ad = await Ad.findById(req.params.adId);
// // //     if (!ad) {
// // //       return res.status(404).json({ message: 'Ad not found' });
// // //     }

// // //     if (ad.status !== 'pending') {
// // //       return res.status(400).json({ message: 'Ad is already accepted or rejected' });
// // //     }

// // //     ad.status = 'accepted';
// // //     ad.acceptedBy = influencer._id;
// // //     await ad.save();

// // //     // Check if the company has already been notified for this ad
// // //     const company = await User.findById(ad.companyId);
// // //     const notificationExists = company.notifications.some(
// // //       (notif) => notif.message.includes(`Your ad "${ad.title}" has been accepted by ${influencer.name}`)
// // //     );

// // //     if (!notificationExists) {
// // //       company.notifications.push({
// // //         message: `Your ad "${ad.title}" has been accepted by ${influencer.name}.`,
// // //       });
// // //       await company.save();
// // //     }

// // //     res.json({ message: 'Ad accepted successfully' });
// // //   } catch (err) {
// // //     res.status(500).json({ message: 'Server error', error: err.message });
// // //   }
// // // });

// // // // Submit Proof for Accepted Ad (Influencer only)
// // // router.post('/:adId/submit-proof', async (req, res) => {
// // //   try {
// // //     const token = req.headers.authorization?.split(' ')[1];
// // //     if (!token) {
// // //       return res.status(401).json({ message: 'No token provided' });
// // //     }

// // //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// // //     const influencer = await User.findById(decoded.userId);
// // //     if (!influencer) {
// // //       return res.status(404).json({ message: 'User not found' });
// // //     }

// // //     if (influencer.role !== 'influencer') {
// // //       return res.status(403).json({ message: 'Only influencers can submit proof' });
// // //     }

// // //     const ad = await Ad.findById(req.params.adId);
// // //     if (!ad) {
// // //       return res.status(404).json({ message: 'Ad not found' });
// // //     }

// // //     if (ad.acceptedBy.toString() !== influencer._id.toString()) {
// // //       return res.status(403).json({ message: 'You are not authorized to submit proof for this ad' });
// // //     }

// // //     if (ad.proof && ad.proof.submittedAt) {
// // //       return res.status(400).json({ message: 'Proof has already been submitted for this ad' });
// // //     }

// // //     const { link, description } = req.body;

// // //     ad.proof = {
// // //       link,
// // //       description,
// // //       submittedAt: new Date(),
// // //     };
// // //     await ad.save();

// // //     res.json({ message: 'Proof submitted successfully' });
// // //   } catch (err) {
// // //     res.status(500).json({ message: 'Server error', error: err.message });
// // //   }
// // // });

// // // export default router;


// // import express from 'express';
// // import jwt from 'jsonwebtoken';
// // import Ad from '../models/Ad.js';
// // import User from '../models/User.js';

// // const router = express.Router();

// // // ===============================
// // // Create Ad (Company only) ✅ UPDATED
// // // ===============================
// // router.post('/', async (req, res) => {
// //   try {
// //     const token = req.headers.authorization?.split(' ')[1];
// //     if (!token) {
// //       return res.status(401).json({ message: 'No token provided' });
// //     }

// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     const user = await User.findById(decoded.userId);

// //     if (!user) {
// //       return res.status(404).json({ message: 'User not found' });
// //     }

// //     if (user.role !== 'company') {
// //       return res.status(403).json({ message: 'Only companies can create ads' });
// //     }

// //     // ✅ NEW: Save all fields coming from frontend
// //     const ad = new Ad({
// //       ...req.body,
// //       companyId: user._id,
// //     });

// //     await ad.save();

// //     res.status(201).json(ad);
// //   } catch (err) {
// //     res.status(500).json({ message: 'Server error', error: err.message });
// //   }
// // });

// // // ===============================
// // // Get Ads for Influencers
// // // ===============================
// // router.get('/', async (req, res) => {
// //   try {
// //     const token = req.headers.authorization?.split(' ')[1];
// //     if (!token) {
// //       return res.status(401).json({ message: 'No token provided' });
// //     }

// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     const user = await User.findById(decoded.userId);

// //     if (!user) {
// //       return res.status(404).json({ message: 'User not found' });
// //     }

// //     if (user.role !== 'influencer') {
// //       return res.status(403).json({ message: 'Only influencers can view ads' });
// //     }

// //     const ads = await Ad.find({
// //       category: { $in: user.categories },
// //       status: 'pending',
// //     }).populate('companyId', 'name');

// //     res.json(ads);
// //   } catch (err) {
// //     res.status(500).json({ message: 'Server error', error: err.message });
// //   }
// // });

// // // ===============================
// // // Get Ads Created by Company
// // // ===============================
// // router.get('/my-ads', async (req, res) => {
// //   try {
// //     const token = req.headers.authorization?.split(' ')[1];
// //     if (!token) {
// //       return res.status(401).json({ message: 'No token provided' });
// //     }

// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     const user = await User.findById(decoded.userId);

// //     if (!user) {
// //       return res.status(404).json({ message: 'User not found' });
// //     }

// //     if (user.role !== 'company') {
// //       return res.status(403).json({ message: 'Only companies can view their ads' });
// //     }

// //     const ads = await Ad.find({ companyId: user._id }).populate('acceptedBy', 'name');
// //     res.json(ads);
// //   } catch (err) {
// //     res.status(500).json({ message: 'Server error', error: err.message });
// //   }
// // });

// // // ===============================
// // // Get Accepted Ads for Influencer
// // // ===============================
// // router.get('/accepted', async (req, res) => {
// //   try {
// //     const token = req.headers.authorization?.split(' ')[1];
// //     if (!token) {
// //       return res.status(401).json({ message: 'No token provided' });
// //     }

// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     const user = await User.findById(decoded.userId);

// //     if (!user) {
// //       return res.status(404).json({ message: 'User not found' });
// //     }

// //     if (user.role !== 'influencer') {
// //       return res.status(403).json({ message: 'Only influencers can view their accepted ads' });
// //     }

// //     const ads = await Ad.find({
// //       acceptedBy: user._id,
// //       status: 'accepted',
// //     }).populate('companyId', 'name');

// //     res.json(ads);
// //   } catch (err) {
// //     res.status(500).json({ message: 'Server error', error: err.message });
// //   }
// // });

// // // ===============================
// // // Accept Ad
// // // ===============================
// // router.post('/:adId/accept', async (req, res) => {
// //   try {
// //     const token = req.headers.authorization?.split(' ')[1];
// //     if (!token) {
// //       return res.status(401).json({ message: 'No token provided' });
// //     }

// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     const influencer = await User.findById(decoded.userId);

// //     if (!influencer) {
// //       return res.status(404).json({ message: 'User not found' });
// //     }

// //     if (influencer.role !== 'influencer') {
// //       return res.status(403).json({ message: 'Only influencers can accept ads' });
// //     }

// //     const ad = await Ad.findById(req.params.adId);
// //     if (!ad) {
// //       return res.status(404).json({ message: 'Ad not found' });
// //     }

// //     if (ad.status !== 'pending') {
// //       return res.status(400).json({ message: 'Ad is already accepted or rejected' });
// //     }

// //     ad.status = 'accepted';
// //     ad.acceptedBy = influencer._id;
// //     await ad.save();

// //     const company = await User.findById(ad.companyId);

// //     const notificationExists = company.notifications.some(
// //       (notif) =>
// //         notif.message.includes(`Your ad "${ad.title}" has been accepted by ${influencer.name}`)
// //     );

// //     if (!notificationExists) {
// //       company.notifications.push({
// //         message: `Your ad "${ad.title}" has been accepted by ${influencer.name}.`,
// //       });
// //       await company.save();
// //     }

// //     res.json({ message: 'Ad accepted successfully' });
// //   } catch (err) {
// //     res.status(500).json({ message: 'Server error', error: err.message });
// //   }
// // });

// // // ===============================
// // // Submit Proof
// // // ===============================
// // router.post('/:adId/submit-proof', async (req, res) => {
// //   try {
// //     const token = req.headers.authorization?.split(' ')[1];
// //     if (!token) {
// //       return res.status(401).json({ message: 'No token provided' });
// //     }

// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     const influencer = await User.findById(decoded.userId);

// //     if (!influencer) {
// //       return res.status(404).json({ message: 'User not found' });
// //     }

// //     if (influencer.role !== 'influencer') {
// //       return res.status(403).json({ message: 'Only influencers can submit proof' });
// //     }

// //     const ad = await Ad.findById(req.params.adId);
// //     if (!ad) {
// //       return res.status(404).json({ message: 'Ad not found' });
// //     }

// //     if (ad.acceptedBy.toString() !== influencer._id.toString()) {
// //       return res.status(403).json({ message: 'You are not authorized to submit proof for this ad' });
// //     }

// //     if (ad.proof && ad.proof.submittedAt) {
// //       return res.status(400).json({ message: 'Proof has already been submitted for this ad' });
// //     }

// //     const { link, description } = req.body;

// //     ad.proof = {
// //       link,
// //       description,
// //       submittedAt: new Date(),
// //     };

// //     await ad.save();

// //     res.json({ message: 'Proof submitted successfully' });
// //   } catch (err) {
// //     res.status(500).json({ message: 'Server error', error: err.message });
// //   }
// // });

// // export default router;


// import express from 'express';
// import jwt from 'jsonwebtoken';
// import Ad from '../models/Ad.js';
// import User from '../models/User.js';

// const router = express.Router();

// // ===============================
// // Create Ad (Company only)
// // ===============================
// router.post('/', async (req, res) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) return res.status(401).json({ message: 'No token provided' });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId);

//     if (!user) return res.status(404).json({ message: 'User not found' });
//     if (user.role !== 'company') {
//       return res.status(403).json({ message: 'Only companies can create ads' });
//     }

//     const ad = new Ad({
//       ...req.body,
//       companyId: user._id,
//     });

//     await ad.save();
//     res.status(201).json(ad);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // ===============================
// // Get Ads for Influencers
// // ===============================
// router.get('/', async (req, res) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) return res.status(401).json({ message: 'No token provided' });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId);

//     if (!user) return res.status(404).json({ message: 'User not found' });
//     if (user.role !== 'influencer') {
//       return res.status(403).json({ message: 'Only influencers can view ads' });
//     }

//     const ads = await Ad.find({
//       category: { $in: user.categories },
//       status: 'pending',
//     }).populate('companyId', 'name');

//     res.json(ads);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // ===============================
// // Get Ads Created by Company
// // ===============================
// router.get('/my-ads', async (req, res) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) return res.status(401).json({ message: 'No token provided' });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId);

//     if (!user) return res.status(404).json({ message: 'User not found' });
//     if (user.role !== 'company') {
//       return res.status(403).json({ message: 'Only companies can view their ads' });
//     }

//     const ads = await Ad.find({ companyId: user._id })
//       .sort({ createdAt: -1 })   // ✅ recent ads first (also helps frontend)
//       .populate('acceptedBy', 'name');

//     res.json(ads);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // ===============================
// // Get Accepted Ads for Influencer
// // ===============================
// router.get('/accepted', async (req, res) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) return res.status(401).json({ message: 'No token provided' });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId);

//     if (!user) return res.status(404).json({ message: 'User not found' });
//     if (user.role !== 'influencer') {
//       return res.status(403).json({ message: 'Only influencers can view their accepted ads' });
//     }

//     const ads = await Ad.find({
//       acceptedBy: user._id,
//       status: 'accepted',
//     }).populate('companyId', 'name');

//     res.json(ads);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // ===============================
// // Accept Ad
// // ===============================
// router.post('/:adId/accept', async (req, res) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) return res.status(401).json({ message: 'No token provided' });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const influencer = await User.findById(decoded.userId);

//     if (!influencer) return res.status(404).json({ message: 'User not found' });
//     if (influencer.role !== 'influencer') {
//       return res.status(403).json({ message: 'Only influencers can accept ads' });
//     }

//     const ad = await Ad.findById(req.params.adId);
//     if (!ad) return res.status(404).json({ message: 'Ad not found' });

//     if (ad.status !== 'pending') {
//       return res.status(400).json({ message: 'Ad already processed' });
//     }

//     ad.status = 'accepted';
//     ad.acceptedBy = influencer._id;
//     await ad.save();

//     const company = await User.findById(ad.companyId);

//     const notificationExists = company.notifications.some((notif) =>
//       notif.message.includes(`"${ad.title}"`)
//     );

//     if (!notificationExists) {
//       company.notifications.push({
//         message: `Your ad "${ad.title}" has been accepted by ${influencer.name}.`,
//       });
//       await company.save();
//     }

//     res.json({ message: 'Ad accepted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // ===============================
// // Submit Proof
// // ===============================
// router.post('/:adId/submit-proof', async (req, res) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) return res.status(401).json({ message: 'No token provided' });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const influencer = await User.findById(decoded.userId);

//     if (!influencer) return res.status(404).json({ message: 'User not found' });
//     if (influencer.role !== 'influencer') {
//       return res.status(403).json({ message: 'Only influencers can submit proof' });
//     }

//     const ad = await Ad.findById(req.params.adId);
//     if (!ad) return res.status(404).json({ message: 'Ad not found' });

//     if (ad.acceptedBy.toString() !== influencer._id.toString()) {
//       return res.status(403).json({ message: 'Not authorized' });
//     }

//     if (ad.proof?.submittedAt) {
//       return res.status(400).json({ message: 'Proof already submitted' });
//     }

//     const { link, description } = req.body;

//     ad.proof = {
//       link,
//       description,
//       submittedAt: new Date(),
//     };

//     await ad.save();
//     res.json({ message: 'Proof submitted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // ===============================
// // 🆕 DELETE AD (Company only)
// // ===============================
// router.delete('/:id', async (req, res) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) return res.status(401).json({ message: 'No token provided' });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId);

//     if (!user || user.role !== 'company') {
//       return res.status(403).json({ message: 'Not authorized' });
//     }

//     const ad = await Ad.findOneAndDelete({
//       _id: req.params.id,
//       companyId: user._id,
//     });

//     if (!ad) return res.status(404).json({ message: 'Ad not found' });

//     res.json({ message: 'Ad deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// export default router;


// import express from 'express';
// import jwt from 'jsonwebtoken';
// import Ad from '../models/Ad.js';
// import User from '../models/User.js';

// const router = express.Router();

// // ===============================
// // Helper: Simple AI Score
// // ===============================
// function calculateAIScore(title, desc = "") {
//   let score = 50;
//   if (desc.toLowerCase().includes(title.toLowerCase())) score += 20;
//   if (desc.length > 80) score += 15;
//   if (desc.includes("#")) score += 10;
//   return Math.min(score, 100);
// }

// // ===============================
// // Create Ad (Company only)
// // ===============================
// router.post('/', async (req, res) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) return res.status(401).json({ message: 'No token provided' });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId);

//     if (!user) return res.status(404).json({ message: 'User not found' });
//     if (user.role !== 'company') {
//       return res.status(403).json({ message: 'Only companies can create ads' });
//     }

//     const ad = new Ad({
//       ...req.body,
//       companyId: user._id,
//     });

//     await ad.save();
//     res.status(201).json(ad);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // ===============================
// // Get Ads for Influencers
// // ===============================
// router.get('/', async (req, res) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) return res.status(401).json({ message: 'No token provided' });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId);

//     if (!user) return res.status(404).json({ message: 'User not found' });
//     if (user.role !== 'influencer') {
//       return res.status(403).json({ message: 'Only influencers can view ads' });
//     }

//     const ads = await Ad.find({
//       category: { $in: user.categories },
//       status: 'pending',
//     }).populate('companyId', 'name');

//     res.json(ads);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // ===============================
// // Get Ads Created by Company
// // ===============================
// router.get('/my-ads', async (req, res) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) return res.status(401).json({ message: 'No token provided' });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId);

//     if (!user) return res.status(404).json({ message: 'User not found' });
//     if (user.role !== 'company') {
//       return res.status(403).json({ message: 'Only companies can view their ads' });
//     }

//     const ads = await Ad.find({ companyId: user._id })
//       .sort({ createdAt: -1 })
//       .populate('influencers.influencer', 'name email');

//     res.json(ads);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // ===============================
// // Accept Ad (Multi influencer)
// // ===============================
// router.post('/:adId/accept', async (req, res) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) return res.status(401).json({ message: 'No token provided' });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const influencer = await User.findById(decoded.userId);

//     if (!influencer || influencer.role !== 'influencer') {
//       return res.status(403).json({ message: 'Not authorized' });
//     }

//     const ad = await Ad.findById(req.params.adId);
//     if (!ad) return res.status(404).json({ message: 'Ad not found' });

//     const already = ad.influencers?.find(
//       (i) => i.influencer?.toString() === influencer._id.toString()
//     );

//     if (already) {
//       return res.status(400).json({ message: 'Already accepted' });
//     }

//     ad.influencers.push({
//       influencer: influencer._id,
//       acceptedAt: new Date(),
//     });

//     ad.status = 'accepted';
//     await ad.save();

//     res.json({ message: 'Ad accepted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // ===============================
// // Submit Proof (per influencer)
// // ===============================
// router.post('/:adId/submit-proof', async (req, res) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) return res.status(401).json({ message: 'No token provided' });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const influencer = await User.findById(decoded.userId);

//     const { link, description, likes, comments, views } = req.body;

//     const ad = await Ad.findById(req.params.adId);
//     if (!ad) return res.status(404).json({ message: 'Ad not found' });

//     const entry = ad.influencers.find(
//       (i) => i.influencer?.toString() === influencer._id.toString()
//     );

//     if (!entry) {
//       return res.status(403).json({ message: 'You must accept ad first' });
//     }

//     entry.proof = { link, description, submittedAt: new Date() };
//     entry.metrics = { likes, comments, views };
//     entry.aiScore = calculateAIScore(ad.title, description);

//     await ad.save();

//     res.json({ message: 'Proof submitted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // ===============================
// // Mark Payment Paid
// // ===============================
// router.patch('/:adId/pay/:influencerId', async (req, res) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId);

//     if (!user || user.role !== 'company') {
//       return res.status(403).json({ message: 'Not authorized' });
//     }

//     const ad = await Ad.findById(req.params.adId);

//     const entry = ad.influencers.find(
//       (i) => i.influencer?.toString() === req.params.influencerId
//     );

//     if (!entry) return res.status(404).json({ message: 'Influencer not found' });

//     entry.paymentStatus = 'paid';
//     await ad.save();

//     res.json({ message: 'Payment marked as paid' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // ===============================
// // Delete Ad
// // ===============================
// router.delete('/:id', async (req, res) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) return res.status(401).json({ message: 'No token provided' });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId);

//     if (!user || user.role !== 'company') {
//       return res.status(403).json({ message: 'Not authorized' });
//     }

//     const ad = await Ad.findOneAndDelete({
//       _id: req.params.id,
//       companyId: user._id,
//     });

//     if (!ad) return res.status(404).json({ message: 'Ad not found' });

//     res.json({ message: 'Ad deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// export default router;



import express from 'express';
import jwt from 'jsonwebtoken';
import Ad from '../models/Ad.js';
import User from '../models/User.js';

const router = express.Router();

// ===============================
// Helper: Simple AI Score
// ===============================
function calculateAIScore(title, desc = "") {
  let score = 50;
  if (desc.toLowerCase().includes(title.toLowerCase())) score += 20;
  if (desc.length > 80) score += 15;
  if (desc.includes("#")) score += 10;
  return Math.min(score, 100);
}

// ===============================
// Create Ad (Company)
// ===============================
router.post('/', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.role !== 'company') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const ad = new Ad({
      ...req.body,
      companyId: user._id,
    });

    await ad.save();
    res.status(201).json(ad);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===============================
// Feed for Influencers
// ===============================
router.get('/', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.role !== 'influencer') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const ads = await Ad.find({
      category: { $in: user.categories },
    }).populate('companyId', 'name');

    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===============================
// Company: My Ads
// ===============================
router.get('/my-ads', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.role !== 'company') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const ads = await Ad.find({ companyId: user._id })
      .sort({ createdAt: -1 })
      .populate('influencers.influencer', 'name email');

    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===============================
// Influencer: Accepted Ads
// ===============================
router.get('/accepted', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.role !== 'influencer') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const ads = await Ad.find({
      "influencers.influencer": user._id,
    })
      .populate('companyId', 'name')
      .populate('influencers.influencer', 'name email');

    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===============================
// Accept Ad (multi influencer)
// ===============================
router.post('/:adId/accept', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const influencer = await User.findById(decoded.userId);

    if (!influencer || influencer.role !== 'influencer') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const ad = await Ad.findById(req.params.adId);
    if (!ad) return res.status(404).json({ message: 'Ad not found' });

    const already = ad.influencers.find(
      (i) => i.influencer?.toString() === influencer._id.toString()
    );

    if (already) {
      return res.status(400).json({ message: 'Already accepted' });
    }

    ad.influencers.push({
      influencer: influencer._id,
      acceptedAt: new Date(),
    });

    ad.status = 'accepted';
    await ad.save();

    res.json({ message: 'Ad accepted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===============================
// Submit Proof (per influencer)
// ===============================
router.post('/:adId/submit-proof', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const influencer = await User.findById(decoded.userId);

    const { link, description, likes, comments, views } = req.body;

    const ad = await Ad.findById(req.params.adId);
    if (!ad) return res.status(404).json({ message: 'Ad not found' });

    const entry = ad.influencers.find(
      (i) => i.influencer?.toString() === influencer._id.toString()
    );

    if (!entry) {
      return res.status(403).json({ message: 'You must accept ad first' });
    }

    entry.proof = {
      link,
      description,
      submittedAt: new Date(),
    };

    entry.metrics = { likes, comments, views };
    entry.aiScore = calculateAIScore(ad.title, description);

    await ad.save();

    res.json({ message: 'Proof submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===============================
// Mark payment paid (company)
// ===============================
router.patch('/:adId/pay/:influencerId', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.role !== 'company') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const ad = await Ad.findById(req.params.adId);
    const entry = ad.influencers.find(
      (i) => i.influencer?.toString() === req.params.influencerId
    );

    if (!entry) return res.status(404).json({ message: 'Influencer not found' });

    entry.paymentStatus = 'paid';
    await ad.save();

    res.json({ message: 'Payment updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===============================
// Delete Ad
// ===============================
router.delete('/:id', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.role !== 'company') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const ad = await Ad.findOneAndDelete({
      _id: req.params.id,
      companyId: user._id,
    });

    if (!ad) return res.status(404).json({ message: 'Ad not found' });

    res.json({ message: 'Ad deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;


