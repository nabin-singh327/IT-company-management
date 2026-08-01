import crypto from "crypto";


export const generateEsewaSignature = (totalAmount, transactionId, productCode, secretKey) => {
  const message = `total_amount=${totalAmount},transaction_uuid=${transactionId},product_code=${productCode}`;
  return crypto.createHmac("sha256", secretKey).update(message).digest("base64");
};


export const verifyEsewaResponseSignature = (responseData, secretKey) => {
  const fields = responseData.signed_field_names.split(",");
  const message = fields.map((field) => `${field}=${responseData[field]}`).join(",");
  const expectedSignature = crypto.createHmac("sha256", secretKey).update(message).digest("base64");
  return expectedSignature === responseData.signature;
};

export const decodeEsewaResponse = (encodedData) => {
  const decoded = Buffer.from(encodedData, "base64").toString("utf-8");
  return JSON.parse(decoded);
};