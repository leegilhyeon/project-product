import express from "express";
import Product from "../schemas/products.schema.js";

const router = express.Router();

//상품 등록 api만들기
router.post("/products", async (req, res, next) => {
  // 전달받은 데이터를 변수에 저장
  const { name, description, manager, password } = req.body;

  if (!name || !description || !manager || !password) {
    return res
      .status(400)
      .json({ status: "400", errorMessage: "상품 정보를 모두 입력해 주세요." });
  }
  // 새 상품 생성
  const product = new Product({ name, description, manager, password });

  await product.save();
  return res
    .status(201)
    .json({
      status: "201",
      message: "상품 생성에 성공했습니다.",
      product: product,
    });
});

// 상품 목록조회 API
router.get("/products", async (req, res, next) => {
  const products = await Product.find().sort({ createdAt: -1 }).exec();

  return res
    .status(200)
    .json({
      status: "200",
      message: "상품 목록 조회에 성공했습니다.",
      products,
    });
});
// 상품 상세 조회 API
router.get("/products/:productId", async (req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findById(productId).exec();

  if (!product) {
    return res.status(404).json({ errorMessage: "존재하지 않는 상품입니다" });
  }
  return res
    .status(200)
    .json({
      status: "200",
      message: "상품 상세 조회에 성공했습니다.",
      product,
    });
});

// 상품 정보 수정 API

router.patch("/products/:productId", async (req, res, next) => {
  const { productId } = req.params;
  const { name, description, manager, status, password } = req.body;

  if (!name || !description || !manager || !status || !password) {
    return res.status(404).json({ message: "상품이 존재하지 않습니다." });
  }

  const targetProduct = await Product.findById(productId).exec();

  if (targetProduct.password !== Number(password)) {
    return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
  }
  if (name) {
    targetProduct.name = name;
  }
  await targetProduct.save();

  // // await targetProduct.updateOne({Product},{$set:{name, description, manager, status, password}});
  // res.status(200).json({message:"상품 수정에 성공했습니다"})
});

// 상품 삭제 API
router.delete("/products/:todoId", async (req, res, next) => {});

export default router;
