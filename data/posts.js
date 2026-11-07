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
  },
  {
    id: "mel-robbins-seth-godin-build-a-life-that-matters",
    title: "Mel Robbins × Seth Godin: xây dựng cuộc sống có ý nghĩa, bắt đầu ngay hôm nay",
    youtube: "https://www.youtube.com/watch?v=cWZI2RyI9wM",
    videoId: "cWZI2RyI9wM",
    channel: "Mel Robbins",
    watched: "2026-03-12",
    topic: "Mindset",
    tags: ["pick yourself", "resistance", "hành động", "nhất quán", "podcast"],
    rating: 5,
    summary: "Phần lớn sự trì trệ đến từ việc chờ người khác cho phép. Cách thoát ra là tự chọn mình, làm việc có ý nghĩa, chấp nhận sự khó chịu đi kèm và làm đều đặn đến khi nó thành một phần bản sắc.",
    keyPoints: [
      "Pick yourself: tự quyết định mình sẽ làm gì rồi bắt đầu, thay vì chờ được chọn hay được cấp phép.",
      "Phân biệt hoàn cảnh (không thể đổi) và vấn đề (có lời giải). Điều khó thường là bạn không muốn trả giá cho lời giải.",
      "Đổi \"nhưng\" thành \"và\" để giữ cả hai sự thật mà không biến người khác thành cái cớ.",
      "Resistance là dấu hiệu bạn đang đứng gần việc quan trọng. Đừng né, hãy gọi tên nó.",
      "Ba động lực: địa vị, sự thuộc về và nỗi sợ. Gọi tên động lực thật sự để bớt bị nó điều khiển.",
      "Mệt mỏi là một phần của việc quan trọng, nên hãy chuẩn bị sẵn thời gian nghỉ và người hỗ trợ.",
      "Bắt đầu với nhóm người nhỏ nhất và bước nhỏ nhất đáng làm.",
      "Chia sẻ như tặng quà: đừng gắn điều kiện vào việc người khác phải thích hay đáp lại.",
      "Merely ship it: đạt chuẩn đã đặt ra rồi phát hành. Cầu toàn chỉ là cách trốn phát hành.",
      "Chúng ta trở thành điều mình làm đều đặn, nên hãy bắt đầu làm điều mình muốn trở thành.",
      "Với người xung quanh, sự nhất quán quan trọng hơn việc \"sống thật\" theo kiểu cư xử tùy hứng.",
      "Tìm một nhóm 1 đến 5 người cùng nói sự thật và giữ nhau có trách nhiệm."
    ],
    quotes: [
      { text: "Pick yourself.", vi: "Tự chọn mình thay vì chờ được chọn." },
      { text: "Merely ship it.", vi: "Đạt chuẩn rồi phát hành, đừng cầu toàn." },
      { text: "Go make a ruckus.", vi: "Làm việc có ích cho người thật sự quan tâm, dù chỉ một người, rồi lặp lại." }
    ],
    fullPage: "lessons/mel-robbins-seth-godin-build-a-life-that-matters.html"
  }
];
