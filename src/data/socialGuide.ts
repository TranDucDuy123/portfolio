// Cẩm nang "Vận hành Facebook & TikTok không dính vi phạm" tại /kien-thuc/van-hanh-facebook-tiktok.
// Chính sách nền tảng đổi thường xuyên: khi sửa nội dung nhớ đổi socialGuideUpdated và đối chiếu lại nguồn chính thức.

export const socialGuideSlug = "van-hanh-facebook-tiktok";
export const socialGuideUpdated = "27/10/2026";

export type Platform = "facebook" | "tiktok" | "ca-hai";
export type Penalty = "Giảm tiếp cận" | "Gỡ bài" | "Hạn chế tính năng" | "Khoá tài khoản";

export const platformLabel: Record<Platform, string> = {
  facebook: "Facebook",
  tiktok: "TikTok",
  "ca-hai": "Cả hai"
};

// Làm 1 lần khi mở kênh: phần lớn ca mất trang là do mất tài khoản, không phải do vi phạm
export const foundation: { title: string; detail: string; platform: Platform }[] = [
  {
    title: "Bật xác thực 2 lớp bằng ứng dụng",
    detail: "Dùng Google Authenticator hoặc ứng dụng tương tự thay vì SMS, cất mã dự phòng ở nơi riêng. Đây là việc chặn được nhiều vụ mất kênh nhất.",
    platform: "ca-hai"
  },
  {
    title: "Trang có ít nhất 2 quản trị viên là người thật",
    detail: "Chủ doanh nghiệp giữ quyền cao nhất. Người chạy quảng cáo, nhân viên đăng bài chỉ được cấp đúng quyền cần dùng qua Meta Business Suite, không đưa mật khẩu.",
    platform: "facebook"
  },
  {
    title: "Một người, một tài khoản cá nhân, tên thật",
    detail: "Facebook không cho tài khoản giả hoặc một người dùng nhiều tài khoản cá nhân. Nick phụ dùng để quản trị trang là nick dễ bị khoá nhất, và kéo trang khoá theo.",
    platform: "facebook"
  },
  {
    title: "Chuyển TikTok sang tài khoản doanh nghiệp khi bán hàng",
    detail: "Có thống kê, link ở hồ sơ và đúng luật chơi với nội dung thương mại. Tài khoản doanh nghiệp chỉ nên dùng nhạc trong Thư viện nhạc thương mại.",
    platform: "tiktok"
  },
  {
    title: "Xác thực tài khoản bằng số điện thoại Việt Nam",
    detail: "Theo Nghị định 147/2024/NĐ-CP, tài khoản mạng xã hội tại Việt Nam cần xác thực bằng số điện thoại. Dùng số chính chủ của doanh nghiệp, không dùng sim rác.",
    platform: "ca-hai"
  },
  {
    title: "Không đăng nhập vào công cụ lạ",
    detail: "Phần mềm tăng like, tiện ích “tải video”, tool đăng bài hàng loạt đòi mật khẩu hoặc cookie là đường mất tài khoản phổ biến nhất.",
    platform: "ca-hai"
  }
];

export interface Violation {
  title: string;
  example: string; // Ví dụ thật hay gặp
  instead: string; // Làm gì thay thế
  platform: Platform;
  penalty: Penalty;
}

export const violationGroups: { name: string; intro: string; items: Violation[] }[] = [
  {
    name: "Tương tác và tăng trưởng",
    intro: "Thuật toán hai nền tảng đều chấm điểm độ thật của tương tác. Lách luật thì thắng vài ngày, thua cả kênh.",
    items: [
      {
        title: "Mua like, follow, mắt xem, bình luận",
        example: "Gói “1.000 follow 99k”, nhóm đổi like chéo, live treo mắt ảo.",
        instead: "Chấp nhận lớn chậm. 300 người theo dõi thật có hỏi giá đáng hơn 10.000 nick ảo.",
        platform: "ca-hai",
        penalty: "Khoá tài khoản"
      },
      {
        title: "Câu kéo tương tác",
        example: "“Like nếu đồng ý”, “Share bài này để nhận quà”, “Tag 3 người bạn”, “Comment 1 để nhận giá”.",
        instead: "Hỏi một câu thật khách muốn trả lời: “Quán bạn đang gặp chuyện này chưa?”.",
        platform: "facebook",
        penalty: "Giảm tiếp cận"
      },
      {
        title: "Minigame bắt chia sẻ lên trang cá nhân",
        example: "Điều kiện tham gia là share bài về tường nhà hoặc tag bạn bè.",
        instead: "Cho tham gia bằng bình luận hoặc nhắn tin cho trang, ghi rõ thể lệ và ghi chú chương trình không liên quan tới Facebook.",
        platform: "facebook",
        penalty: "Gỡ bài"
      },
      {
        title: "Spam tin nhắn, bình luận, kết bạn",
        example: "Dán cùng một link vào 30 nhóm trong 10 phút, nhắn tin hàng loạt cho người lạ, kết bạn ồ ạt.",
        instead: "Đăng ít mà đều. Mỗi nhóm viết lời riêng, trả lời bình luận bằng câu của mình.",
        platform: "ca-hai",
        penalty: "Hạn chế tính năng"
      }
    ]
  },
  {
    name: "Nội dung không phải của mình",
    intro: "Cả hai nền tảng đều đẩy nội dung nguyên bản và hạn chế nội dung đăng lại.",
    items: [
      {
        title: "Reup video, ảnh của người khác",
        example: "Tải video người khác về, cắt logo, lồng tiếng rồi đăng lại.",
        instead: "Tự quay, kể bằng trải nghiệm của mình. Muốn dùng lại thì xin phép và ghi nguồn.",
        platform: "ca-hai",
        penalty: "Giảm tiếp cận"
      },
      {
        title: "Đăng chéo video còn logo nền tảng khác",
        example: "Video TikTok còn watermark đăng sang Reels, hoặc ngược lại.",
        instead: "Xuất file gốc từ máy hoặc ứng dụng dựng video rồi đăng riêng từng nơi.",
        platform: "ca-hai",
        penalty: "Giảm tiếp cận"
      },
      {
        title: "Nhạc có bản quyền trong video bán hàng",
        example: "Lấy bài hit đang thịnh hành làm nhạc nền clip quảng cáo sản phẩm.",
        instead: "Dùng Thư viện nhạc thương mại của TikTok, Sound Collection của Meta, hoặc nhạc đã mua quyền.",
        platform: "ca-hai",
        penalty: "Gỡ bài"
      }
    ]
  },
  {
    name: "Ngành nhạy cảm và lời hứa quá đà",
    intro: "Spa, thẩm mỹ, thực phẩm chức năng, tài chính là những ngành bị soi kỹ nhất, cả bài thường lẫn quảng cáo.",
    items: [
      {
        title: "Ảnh trước – sau, cam kết kết quả",
        example: "“Giảm 10kg trong 7 ngày”, “Khỏi nám 100%”, ảnh so sánh cơ thể trước và sau.",
        instead: "Kể quy trình, chia sẻ cảm nhận thật của khách (có đồng ý), không hứa con số.",
        platform: "ca-hai",
        penalty: "Gỡ bài"
      },
      {
        title: "Quảng cáo nói thẳng vào đặc điểm cá nhân",
        example: "“Bạn đang bị nám?”, “Bạn đang nợ xấu?”, “Bạn bị hói?”.",
        instead: "Nói về giải pháp thay vì nói về người đọc: “Liệu trình chăm sóc da nám cho dân văn phòng”.",
        platform: "facebook",
        penalty: "Gỡ bài"
      },
      {
        title: "Hàng hoá bị cấm hoặc hạn chế",
        example: "Thuốc kê đơn, thuốc lá điện tử, vũ khí, hàng nhái thương hiệu, cho vay nóng.",
        instead: "Kiểm tra danh mục hàng cấm của nền tảng trước khi mở bán. Quảng cáo thực phẩm chức năng, mỹ phẩm, dịch vụ y tế còn cần giấy xác nhận nội dung quảng cáo theo luật Việt Nam.",
        platform: "ca-hai",
        penalty: "Khoá tài khoản"
      }
    ]
  },
  {
    name: "An toàn và quyền riêng tư",
    intro: "Nhóm này phạt nặng và ít được nương tay, kể cả khi bạn không cố ý.",
    items: [
      {
        title: "Trẻ em trong video",
        example: "Quay trẻ mặc ít đồ, để con dưới 18 tuổi tự livestream hoặc đứng bán hàng một mình.",
        instead: "Trẻ chỉ xuất hiện cùng người lớn, ăn mặc kín đáo. TikTok chỉ cho người từ 18 tuổi livestream.",
        platform: "ca-hai",
        penalty: "Khoá tài khoản"
      },
      {
        title: "Hành động nguy hiểm, nghề có rủi ro",
        example: "Leo cao không dây an toàn, sửa điện khi chưa ngắt nguồn, thử thách ăn uống quá mức.",
        instead: "Quay đúng quy trình an toàn, có đồ bảo hộ, ghi chú “người có chuyên môn thực hiện, không tự làm theo”.",
        platform: "tiktok",
        penalty: "Giảm tiếp cận"
      },
      {
        title: "Lộ thông tin cá nhân của khách",
        example: "Đăng ảnh đơn hàng còn số điện thoại, địa chỉ; chụp tin nhắn khách khoe feedback mà không che tên.",
        instead: "Che hết tên, số điện thoại, ảnh đại diện và hỏi ý khách trước. Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân cũng áp dụng cho việc này.",
        platform: "ca-hai",
        penalty: "Gỡ bài"
      },
      {
        title: "Tin giật gân, công kích, phân biệt",
        example: "Tin chưa kiểm chứng để câu view, chê bai vùng miền, chửi đối thủ, nói tục nhiều.",
        instead: "Góp ý về việc, không về người. Chưa chắc thì không đăng.",
        platform: "ca-hai",
        penalty: "Gỡ bài"
      },
      {
        title: "Nhận tiền hoặc quà của nhãn hàng mà không công khai",
        example: "Review sản phẩm được tài trợ nhưng nói như tự mua.",
        instead: "Bật “Nội dung thương hiệu” trên Facebook hoặc “Công khai nội dung” trên TikTok khi đăng bài hợp tác.",
        platform: "ca-hai",
        penalty: "Giảm tiếp cận"
      }
    ]
  }
];

// Checklist 30 giây trước khi bấm Đăng
export const prePostChecklist = [
  "Video, ảnh, nhạc trong bài đều do mình làm hoặc đã có quyền dùng",
  "Không còn logo, watermark của nền tảng khác",
  "Không có câu “like, share, tag bạn bè để…”",
  "Không hứa kết quả, không có ảnh trước – sau nếu là ngành sức khoẻ, làm đẹp",
  "Thông tin của khách (tên, số điện thoại, địa chỉ) đã được che",
  "Trẻ em, nếu có, xuất hiện cùng người lớn và ăn mặc phù hợp",
  "Cảnh làm việc nguy hiểm có đồ bảo hộ và lời nhắc không tự làm theo",
  "Bài hợp tác có tài trợ đã bật nhãn nội dung thương hiệu"
];

// Khi đã bị gỡ bài hoặc hạn chế
export const whenFlagged: { title: string; detail: string }[] = [
  {
    title: "Xem đúng chỗ nền tảng báo lỗi",
    detail: "Facebook: Meta Business Suite → Chất lượng tài khoản (hoặc Trạng thái trang). TikTok: Cài đặt và quyền riêng tư → Tài khoản → Trạng thái tài khoản. Chỉ tin thông báo ở đây."
  },
  {
    title: "Cảnh giác tin nhắn giả danh Meta, TikTok",
    detail: "Tin nhắn báo “trang của bạn vi phạm, bấm vào link để kháng nghị” gần như luôn là lừa đảo lấy tài khoản. Nền tảng không nhắn tin riêng đòi mật khẩu."
  },
  {
    title: "Kháng nghị nếu bị gỡ nhầm",
    detail: "Bấm kháng nghị ngay trong mục trạng thái, viết ngắn: nội dung là gì, vì sao không vi phạm. Không gửi đi gửi lại nhiều lần."
  },
  {
    title: "Không đăng lại bài đã bị gỡ, không lập kênh mới để né",
    detail: "Cả hai nền tảng coi việc lập tài khoản mới để tránh hạn chế là vi phạm riêng, có thể khoá luôn tài khoản mới."
  },
  {
    title: "Gậy có thời hạn, cứ đăng sạch là hồi lại",
    detail: "Theo chính sách công bố, TikTok tính vi phạm trong 90 ngày, Facebook tính trong 1 năm. Trong thời gian này đăng đều, đúng luật để kênh hồi tiếp cận."
  }
];

export const faq: { question: string; answer: string }[] = [
  {
    question: "Bao lâu thì hết bị hạn chế trên Facebook, TikTok?",
    answer: "Hạn chế tạm thường kéo dài từ vài giờ tới vài tuần tuỳ lỗi. Gậy vi phạm được TikTok tính trong 90 ngày, Facebook tính trong 1 năm. Xem thời hạn chính xác trong mục trạng thái tài khoản của từng nền tảng."
  },
  {
    question: "Ghi “ib zalo”, số điện thoại trong bài có bị phạt không?",
    answer: "Bản thân thông tin liên hệ không phải vi phạm, nhưng dán cùng một số điện thoại, một link vào hàng loạt bình luận, nhóm thì dễ bị xem là spam. Cách an toàn là để liên hệ ở hồ sơ trang và trong một bài ghim."
  },
  {
    question: "Dùng nhạc đang hot trên TikTok cho video bán hàng được không?",
    answer: "Tài khoản doanh nghiệp chỉ nên dùng nhạc trong Thư viện nhạc thương mại. Nhạc thịnh hành thường không được cấp quyền cho mục đích thương mại, video có thể bị tắt tiếng hoặc gỡ."
  },
  {
    question: "Vì sao bài đăng không vi phạm mà vẫn ít người xem?",
    answer: "Thường do nội dung đăng lại, câu kéo tương tác, hoặc kênh từng bị gậy nên đang bị giảm phân phối. Kiểm tra trạng thái tài khoản trước, rồi tập trung vào nội dung tự quay, nói chuyện thật với đúng khách."
  }
];

export const officialSources: { label: string; href: string }[] = [
  { label: "Tiêu chuẩn cộng đồng của Meta", href: "https://transparency.meta.com/policies/community-standards/" },
  { label: "Tiêu chuẩn quảng cáo của Meta", href: "https://transparency.meta.com/policies/ad-standards/" },
  { label: "Nguyên tắc cộng đồng TikTok", href: "https://www.tiktok.com/community-guidelines" }
];
