require("dotenv").config();
const express = require("express");
const crypto = require("crypto");
const path = require("path");
const Razorpay = require("razorpay");
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, DEVICE_TOKEN } = process.env;
const PORT = Number(process.env.PORT || 3000);
const AMOUNT_PAISE = Number(process.env.AMOUNT_PAISE || 500);
if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET || !DEVICE_TOKEN) {
  console.error("Copy .env.example to .env and fill in test credentials/token."); process.exit(1);
}
const razorpay = new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET });
// Prototype only: memory storage clears when Node restarts.
const orders = new Map();
const queue = [];
function safeEqual(a,b) { const x=Buffer.from(String(a||"")), y=Buffer.from(String(b||"")); return x.length===y.length && crypto.timingSafeEqual(x,y); }
function requireDevice(req,res,next) {
  const token=(req.headers.authorization||"").replace(/^Bearer\s+/i,"");
  if(!safeEqual(token,DEVICE_TOKEN)) return res.status(401).json({error:"Unauthorized device"});
  next();
}
app.get("/api/config",(_req,res)=>res.json({keyId:RAZORPAY_KEY_ID,amountPaise:AMOUNT_PAISE}));
app.post("/api/create-order",async(_req,res)=>{
  try {
    const receipt="water_"+Date.now()+"_"+crypto.randomBytes(3).toString("hex");
    const order=await razorpay.orders.create({amount:AMOUNT_PAISE,currency:"INR",receipt,notes:{project:"ESP32 water vending test"}});
    orders.set(order.id,{id:order.id,amount:order.amount,status:"created",queued:false});
    res.json({orderId:order.id,amount:order.amount,currency:order.currency,keyId:RAZORPAY_KEY_ID});
  } catch(e) { console.error("Order creation failed:",e.message); res.status(500).json({error:"Could not create test order"}); }
});
app.post("/api/verify-payment",(req,res)=>{
  const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body||{};
  const record=orders.get(razorpay_order_id);
  if(!record) return res.status(400).json({verified:false,error:"Unknown order"});
  if(!razorpay_payment_id||!razorpay_signature) return res.status(400).json({verified:false,error:"Missing payment fields"});
  const expected=crypto.createHmac("sha256",RAZORPAY_KEY_SECRET).update(`${record.id}|${razorpay_payment_id}`).digest("hex");
  if(!safeEqual(expected,razorpay_signature)) return res.status(400).json({verified:false,error:"Invalid signature"});
  if(!record.queued) { record.queued=true; record.status="test_signature_verified"; queue.push({orderId:record.id,delivered:false,acked:false}); }
  res.json({verified:true,message:"Test payment verified; ESP32 can blink."});
});
app.get("/api/device/next",requireDevice,(req,res)=>{
  const item=queue.find(x=>!x.delivered);
  if(!item) return res.json({authorized:false});
  item.delivered=true; res.json({authorized:true,orderId:item.orderId});
});
app.post("/api/device/ack",requireDevice,(req,res)=>{
  const item=queue.find(x=>x.orderId===(req.body||{}).orderId&&x.delivered&&!x.acked);
  if(!item) return res.status(404).json({ok:false,error:"Pending authorization not found"});
  item.acked=true; res.json({ok:true});
});
app.get("/health",(_req,res)=>res.json({ok:true,mode:"test-demo"}));
app.listen(PORT,"0.0.0.0",()=>console.log(`Test demo at http://localhost:${PORT}`));
