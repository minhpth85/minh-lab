/* Dữ liệu thư viện. Mỗi bài là một đối tượng. Thêm bài mới = thêm một khối vào mảng này.
   (Khi bạn gửi file Markdown, tôi sẽ chuyển chúng vào đây.)
   rating: 1-5 | watched: YYYY-MM-DD | topic: một trong 3 chủ đề */
window.TOPICS = ["Học nói tiếng Anh", "Mindset", "Tâm lý"];

window.POSTS = [
  {
    id: "english-fluency-framework",
    title: "English Fluency Framework: nói tiếng Anh trôi chảy với 3 lớp",
    youtube: "https://www.youtube.com/watch?v=4Q8HkIsVYi4",
    videoId: "4Q8HkIsVYi4",
    channel: "Tiffani (English teacher)",
    watched: "2026-11-07",
    topic: "Học nói tiếng Anh",
    tags: ["speaking", "fluency", "storytelling", "IELTS Speaking", "luyện mỗi ngày"],
    rating: 5,
    summary: "Người bản xứ không biết nhiều từ hơn bạn. Họ chỉ có một cấu trúc để trả lời: đưa ba chi tiết, thêm quan điểm kèm ba lý do, rồi kể một câu chuyện thật.",
    keyPoints: [
      "Bạn bị đứng hình vì trả lời một hơi rồi im lặng (\"It was good.\"). Vấn đề không nằm ở từ vựng mà ở cách tổ chức câu trả lời.",
      "Lớp 1, Chi tiết: thay vì một câu, hãy đưa ba chi tiết (Topic → Detail 1 → Detail 2 → Detail 3). Ba là đủ đầy nhưng không lan man.",
      "Lớp 2, Quan điểm + 3 lý do: mở bằng \"I think / Honestly…\" rồi đưa ba lý do. Quan điểm có thể trung lập hoặc tiêu cực, miễn là có lý do rõ ràng.",
      "Lớp 3, Câu chuyện thật: Bối cảnh → Biến cố → Kết thúc và bài học. Dùng 5W (Who, What, When, Where, Why) để không thiếu chi tiết quan trọng.",
      "Ghép ba lớp lại: lớp 1 giúp người nghe hiểu, lớp 2 cho họ thấy bạn nghĩ gì, lớp 3 khiến họ nhớ, mà không cần thêm từ vựng mới.",
      "Luyện 15 phút mỗi ngày: viết nhật ký theo ba lớp, đọc to, rồi ghi âm 60 giây và nghe lại để biết đang kẹt ở lớp nào.",
      "Bonus: hãy cho những người đã giúp bạn biết bạn trân trọng họ. Đó cũng là câu chuyện tốt để luyện lớp 3."
    ],
    quotes: [
      { text: "The problem is not your vocabulary. It is how you structure the answer.", vi: "Vấn đề không nằm ở từ vựng mà ở cách bạn tổ chức câu trả lời." },
      { text: "Three is enough to sound full, but short enough that you never ramble.", vi: "Ba chi tiết là đủ đầy nhưng không lan man." },
      { text: "Layer 1 helps listeners understand, Layer 2 shows what you think, and Layer 3 makes them remember.", vi: "Lớp 1 giúp hiểu, lớp 2 cho thấy quan điểm, lớp 3 khiến người nghe nhớ." }
    ],
    fullPage: "lessons/english-fluency-framework.html"
  }
];
