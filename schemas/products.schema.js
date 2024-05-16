import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // 상품명
  },
  description: {
    type: String, // 상품 설명
    required: true,
  },
  manager: {
    type: String, // 담당자
    required: true,
  },
  password: {
    type: String, // 비밀번호
    required: true,
  },
  status: {
    type: String,
    default: "FOR_SALE",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

// product스키마를 바탕으로 product 모델 생성후 외부로 내보내기
export default mongoose.model("Product", ProductSchema);
