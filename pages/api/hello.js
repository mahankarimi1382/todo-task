// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export const baseUrl = "https://hr-todo.sahda.ir";
export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}
