export default async function hander(req, res) {
  res.status(200).json({ success: true, data: "hello" });
}
