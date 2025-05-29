export default function handler(req, res) {
  console.log("✅ Hello API ejecutada");
  res.status(200).json({ message: "Hola mundo" });
}
