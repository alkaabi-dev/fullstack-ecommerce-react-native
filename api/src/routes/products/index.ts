import { Router } from "express";

// products endpoint
const router = Router();

router.get("/", (req, res) => {
  res.send("the list of products");
});

router.get("/:id", (req, res) => {
  console.log(req.params);
  res.send("the list of products aaaaaaaaaa");
});

router.post("/", (req, res) => {
  res.send("product created");
});

export default router;
