import express from "express";
import Product from "../schemas/products.schema.js";

const router = express.Router();

//상품 등록 api만들기  ( status 판매 중(FOR_SALE)은 상품 등록시 기본상태, 판매 완료(SOLD_OUT))
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

// 상품 목록조회 API (비밀번호 포함X)
router.get("/products", async (req, res, next) => {
  const products = await Product.find({},'-password').sort({ createdAt: -1 }).exec();

  return res
    .status(200)
    .json({
      status: "200",
      message: "상품 목록 조회에 성공했습니다.",
      products,
    });
});
// 상품 상세 조회 API (비밀번호 포함X)
router.get("/products/:productId", async (req, res, next) => {  
  const { productId } = req.params;   // productId는 :productId(경로매개변수)의 값을 받아오고 params에 들어있는 값을 받아옴
  const product = await Product.findById(productId,'-password').exec();   //findById 메서드는 ProductId에 들어있는 특정한 값을 가져온다

  if (!product) {
    return res.status(404).json({ errorMessage: "상품이 존재하지 않습니다." });
  }
  return res
    .status(200)
    .json({
      status: "200",
      message: "상품 상세 조회에 성공했습니다.",
      product,
    });
});

// 상품 정보 수정 API (수정할 상품과 비밀번호 일치 여부를 확인한 후 수정 가능)

router.patch("/products/:productId", async (req, res, next) => {
  const { productId } = req.params;
  const { name, description, manager, status, password } = req.body;
  //상품 찾기
  try{
    const product =await Product.findById(productId).exec();
    if(!product) {
    return res.status(404).json({ message: "상품이 존재하지 않습니다." });
  }
  if(product.password !== password) {
    return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
  }
  // 수정할 데이터
  if(name) product.name = name;
  if(description) product.description = description;
  if(manager) product.manager = manager;
  if(status) product.status = status;

  product.updatedAt = Date.now(); //업데이트 시간 갱신

  const updatedProduct = await product.save();
  res.status(200).json({status: "200",message:"상품 수정에 성공했습니다", updatedProduct});
  } catch (error){
    res.status(500).json({errorMessage:"예상치 못한 에러가 발생했습니다. 관리자에게 문의해 주세요."});
  }
});

// 상품 삭제 API (삭제할 상품과 비밀번호 일치 여부를 확인한 후 삭제가능)
router.delete("/products/:productId", async (req, res, next) => {
    const { productId } = req.params;
    const { password } = req.body;

    try {
      const product =await Product.findById(productId).exec();

    if(!product) {
      return res.status(404).json({ message: "상품이 존재하지 않습니다." });
    }

    if(product.password !== password) {
      return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    }
    await Product.deleteOne({ _id: productId }); 

    res.status(200).json({ message: "상품이 삭제되었습니다." });
} catch (error) {
    res.status(500).json({errorMessage:"예상치 못한 에러가 발생했습니다. 관리자에게 문의해 주세요."});
}
});

export default router;
