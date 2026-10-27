// Cẩm nang "Làm affiliate cám chim trong hội nhóm mà không bị báo cáo" tại /kien-thuc/affiliate-cam-chim-hoi-nhom.
// Hướng đi: nội dung có ích quanh giải đấu và chăm chim, link minh bạch, đúng luật nhóm. Không dạy lách bộ lọc spam.

import type { Guide } from "./guideTypes";

export const birdAffiliateGuide: Guide = {
  slug: "affiliate-cam-chim-hoi-nhom",
  kicker: "Cẩm nang affiliate ngách chim cảnh",
  title: "Làm affiliate cám chim trong hội nhóm mà không bị báo cáo",
  summary: "Cách người làm affiliate cám chim đăng bài trong hội nhóm chơi chim: xoay nội dung quanh giải đấu, đăng link minh bạch, tránh những lỗi khiến bị xoá bài và chặn nick.",
  description: "Hướng dẫn làm affiliate cám chim, phụ kiện chim cảnh trên Facebook: hiểu hội nhóm chơi chim thi, lịch nội dung quanh giải đấu, cách đăng link không bị coi là spam và những lỗi dễ bị báo cáo.",
  keywords: ["affiliate cám chim", "bán cám chim facebook", "hội nhóm chim cảnh", "giải thi chim", "đăng bài không bị báo cáo", "đức duy web"],
  intro: "Bài này không dạy lách bộ lọc spam. Trong hội nhóm chơi chim, người bấm báo cáo bạn là admin và anh em trong nhóm, không phải thuật toán. Họ chỉ để yên người làm affiliate khi thấy người đó có ích: đi giải, chụp ảnh thật, trả lời câu hỏi, nói thật về cám. Cẩm nang này đi theo hướng đó.",
  breadcrumb: "Affiliate cám chim",
  updated: "27/10/2026",
  date: "2026-10-27",
  readingTime: "10 phút",
  blocks: [
    {
      kind: "cards",
      id: "hieu-san-choi",
      nav: "Hiểu sân chơi",
      icon: "users",
      title: "Hiểu sân chơi trước khi đăng",
      lead: "Hội nhóm chim cảnh là cộng đồng thân quen, ai mới vào chỉ để bán là bị nhận ra rất nhanh.",
      items: [
        {
          title: "Ai đang ở trong nhóm",
          detail: "Người chơi chim thi lâu năm, chủ trại và cửa hàng, ban tổ chức giải, và người mới nuôi đang hỏi đủ thứ. Mỗi nhóm cần một kiểu bài khác nhau."
        },
        {
          title: "Thứ họ quý",
          detail: "Kinh nghiệm thật, ảnh và video tự quay tại giải, kết quả giải cập nhật nhanh, người chịu trả lời câu hỏi mà không chèn link."
        },
        {
          title: "Thứ họ ghét",
          detail: "Nick lạ vào chỉ để rải link, bài copy, quảng cáo thổi phồng kiểu “ăn là hót”, chê chim hoặc trại người khác để bán hàng mình."
        },
        {
          title: "Luật nhóm quan trọng hơn luật Facebook",
          detail: "Nhiều nhóm chỉ cho bài bán hàng vào một ngày trong tuần, hoặc chỉ trong bài ghim, hoặc cấm link hoàn toàn. Đọc phần giới thiệu và bài ghim trước khi đăng bài đầu tiên."
        }
      ]
    },
    {
      kind: "cards",
      id: "dung-nick",
      nav: "Dựng nick và vị trí",
      icon: "shield",
      title: "Dựng nick và vị trí, làm 1 lần",
      lead: "Người ta mua qua link của người họ tin, không phải của nick họ không biết là ai.",
      items: [
        {
          title: "Nick thật, tên thật, ảnh thật",
          detail: "Trang cá nhân có ảnh chim của mình, ảnh đi giải. Một nick lập tuần trước chỉ toàn link sẽ bị admin chặn ngay từ bài đầu."
        },
        {
          title: "Nói rõ mình đang làm gì",
          detail: "Ghi trong phần giới thiệu: “Chơi chào mào 5 năm, đang cộng tác giới thiệu cám X”. Nói trước thì không ai thấy bị lừa."
        },
        {
          title: "Nhắn admin trước khi bán",
          detail: "Hỏi nhóm có cho bài giới thiệu sản phẩm không, ngày nào, có cần đóng phí hay tài trợ giải không. Admin đã đồng ý thì hiếm khi xoá bài của bạn."
        },
        {
          title: "Ít nhóm nhưng đúng ngách",
          detail: "5 nhóm đúng loài chim, đúng khu vực mà bạn hoạt động đều hơn 50 nhóm vào cho có. Đăng cùng lúc vào quá nhiều nhóm còn dễ bị Facebook hạn chế."
        },
        {
          title: "Một chỗ để dẫn về",
          detail: "Làm một bài ghim hoặc album trên trang cá nhân: cám bạn dùng, ảnh bao bì, thành phần, link. Trong nhóm chỉ cần nói “mình có ghi ở trang cá nhân” thay vì dán link khắp nơi."
        },
        {
          title: "Dùng thật rồi mới giới thiệu",
          detail: "Cho chim của mình hoặc của người quen ăn thử (có đồng ý) và ghi lại. Không có trải nghiệm thật thì đừng review."
        }
      ]
    },
    {
      kind: "cards",
      id: "lich-noi-dung",
      nav: "Lịch nội dung 4 + 1",
      icon: "calendar",
      title: "Lịch nội dung: 4 bài có ích, 1 bài có link",
      lead: "Giải đấu là nguồn nội dung tốt nhất của ngách này: có lịch, có kết quả, có ảnh, ai trong nhóm cũng quan tâm.",
      items: [
        {
          title: "Tin giải đấu",
          detail: "Lịch giải sắp tới, thể lệ, kết quả, ảnh và video tự quay tại giải. Xin phép ban tổ chức và chủ chim trước khi đăng ảnh chim của họ.",
          tag: "Có ích"
        },
        {
          title: "Nhật ký chăm chim theo mùa",
          detail: "Kể việc mình làm với chim của mình mùa thay lông, lúc trời trở lạnh, tuần trước giải. Kể như chia sẻ, không đưa lời khuyên như bác sĩ thú y.",
          tag: "Có ích"
        },
        {
          title: "Hỏi anh em, rồi tổng hợp lại",
          detail: "Đặt một câu hỏi thật (“Mùa này anh em cho chào mào ăn thêm gì?”), vài ngày sau tổng hợp câu trả lời thành một bài, nhắc tên người góp ý.",
          tag: "Có ích"
        },
        {
          title: "Đọc bao cám cùng nhau",
          detail: "Chụp thành phần in trên bao, hạn dùng, cách bảo quản, giá theo cân. So nhiều loại, nói cả điểm chưa tốt của loại mình giới thiệu.",
          tag: "Có ích"
        },
        {
          title: "Bài có link, đúng ngày nhóm cho phép",
          detail: "Review sau một thời gian dùng thật, ghi rõ “link affiliate, mình nhận hoa hồng nếu bạn mua”. Link đặt một chỗ trong bài hoặc theo cách nhóm quy định.",
          tag: "Có link"
        }
      ]
    },
    {
      kind: "violations",
      id: "loi-bi-bao-cao",
      nav: "Lỗi hay bị báo cáo",
      icon: "alert",
      title: "Những thứ khiến bài bị xoá, nick bị báo cáo",
      lead: "Có lỗi do admin xử, có lỗi do Facebook xử, có lỗi vi phạm cả pháp luật.",
      groups: [
        {
          name: "Rải link và giả tương tác",
          intro: "Đây là nhóm lỗi người làm affiliate dính nhiều nhất.",
          items: [
            {
              title: "Đăng cùng một bài vào hàng loạt nhóm",
              example: "Một nội dung, một link, dán vào 20 nhóm trong buổi sáng.",
              instead: "Mỗi nhóm viết lời riêng hợp với nhóm đó, đăng cách nhau, đúng ngày bán hàng của từng nhóm.",
              penalty: "Hạn chế tính năng"
            },
            {
              title: "Chèn link vào bình luận bài người khác",
              example: "Ai hỏi chim yếu, chim rụng lông cũng vào bình luận “dùng cám này nè” kèm link.",
              instead: "Trả lời đúng câu hỏi trước. Chỉ gửi link khi người ta hỏi mua, và gửi qua tin nhắn.",
              penalty: "Admin xoá, chặn"
            },
            {
              title: "Dùng nick phụ tự khen, tự hỏi giá",
              example: "Vài nick lạ vào khen “cám ngon quá”, “ib giá em” dưới bài của mình.",
              instead: "Xin khách thật kể lại trải nghiệm. Facebook coi nick giả và tương tác dàn dựng là hành vi không xác thực.",
              penalty: "Khoá tài khoản"
            },
            {
              title: "Che link, rút gọn link để né nhóm cấm link",
              example: "Viết link cách quãng, dùng link rút gọn, gửi ảnh có mã QR.",
              instead: "Nhóm cấm link thì chỉ đăng bài có ích và để người cần tự xem trang cá nhân. Hỏi admin nếu muốn giới thiệu sản phẩm.",
              penalty: "Gỡ bài"
            }
          ]
        },
        {
          name: "Hàng hoá và lời hứa",
          intro: "Ngách chim cảnh có nhiều sản phẩm nhạy cảm hơn người ta nghĩ.",
          items: [
            {
              title: "Hứa công dụng cho cám",
              example: "“Ăn 3 ngày là lên lửa”, “hót căng cả buổi”, “chữa chim bệnh”.",
              instead: "Kể chim của mình thay đổi ra sao sau bao lâu, nói rõ mỗi con mỗi khác, cám không phải thuốc.",
              penalty: "Gỡ bài"
            },
            {
              title: "Bán kèm thuốc, chất kích thích không rõ nguồn gốc",
              example: "Thuốc “kích lửa”, thuốc tăng hót bán theo tin nhắn, không nhãn mác.",
              instead: "Chỉ làm affiliate cám và phụ kiện. Thuốc thú y phải bán qua nơi đủ điều kiện theo quy định.",
              penalty: "Gỡ bài"
            },
            {
              title: "Rao bán chim sống trên Facebook",
              example: "Bài đăng bán chim kèm giá, hoặc nhận đặt chim bẫy ngoài tự nhiên.",
              instead: "Facebook hạn chế mua bán động vật sống. Chim bẫy ngoài tự nhiên, loài thuộc danh mục bảo vệ còn vi phạm pháp luật. Người làm affiliate nên đứng ngoài chuyện mua bán chim.",
              penalty: "Khoá tài khoản"
            }
          ]
        },
        {
          name: "Quanh giải đấu",
          intro: "Giải là nơi nội dung hay nhất, nhưng cũng dễ đụng chuyện nhất.",
          items: [
            {
              title: "Kèo, cá cược theo kết quả giải",
              example: "Nhận kèo, đặt cửa con nào vào chung kết, nhóm kín cá cược.",
              instead: "Chỉ đưa tin và kết quả. Cá độ là vi phạm pháp luật, Facebook cũng gỡ nội dung cờ bạc ăn tiền.",
              penalty: "Khoá tài khoản"
            },
            {
              title: "Lấy ảnh, video giải của người khác",
              example: "Tải clip của kênh khác về đăng lại như của mình, cắt logo.",
              instead: "Tự quay, hoặc xin phép và ghi nguồn. Một clip tự quay tại giải đáng giá hơn mười clip đăng lại.",
              penalty: "Gỡ bài"
            },
            {
              title: "Chê chim, chê trại, cãi kết quả",
              example: "Chê chim thắng giải, nói ban giám khảo thiên vị, bình luận công kích chủ chim.",
              instead: "Khen điểm mạnh, góp ý văn minh. Người bị chê thường có cả hội bạn sẵn sàng báo cáo bạn.",
              penalty: "Bị báo cáo hàng loạt"
            }
          ]
        }
      ]
    },
    {
      kind: "checklist",
      id: "truoc-khi-dang",
      nav: "Checklist trước khi đăng",
      icon: "check",
      title: "Checklist trước khi đăng vào nhóm",
      lead: "Bấm vào từng dòng khi đã kiểm tra.",
      doneMessage: "Ổn rồi. Đăng xong ở lại trả lời bình luận, đừng đăng rồi đi luôn.",
      items: [
        "Hôm nay nhóm có cho đăng bài bán hàng, hoặc bài này không có link",
        "Bài viết riêng cho nhóm này, không phải bản dán lại từ nhóm khác",
        "Ảnh, video do mình chụp, hoặc đã xin phép và ghi nguồn",
        "Không hứa công dụng, không có chữ “chữa”, “lên lửa ngay”",
        "Có ghi rõ link là link affiliate",
        "Không nhắc tới mua bán chim sống hay kèo cá cược",
        "Không chê chim, trại hay sản phẩm của người khác",
        "Mình sẵn sàng trả lời câu hỏi dưới bài trong vài giờ tới"
      ]
    },
    {
      kind: "steps",
      id: "khi-bi-xoa",
      nav: "Bị xoá bài thì làm gì",
      icon: "life",
      title: "Bị admin xoá bài hoặc bị báo cáo thì làm gì",
      lead: "Trong hội nhóm, quan hệ với admin quan trọng hơn mọi mẹo.",
      items: [
        {
          title: "Nhắn admin hỏi lý do",
          detail: "Hỏi nhẹ nhàng mình sai luật nào. Nếu sai thì nhận và hỏi lần sau nên đăng thế nào."
        },
        {
          title: "Không đăng lại ngay",
          detail: "Đăng lại bài vừa bị xoá là cách nhanh nhất để bị chặn khỏi nhóm. Đợi, sửa theo góp ý rồi mới đăng."
        },
        {
          title: "Kiểm tra trạng thái tài khoản",
          detail: "Nếu Facebook báo hạn chế, xem mục trạng thái tài khoản và làm theo cẩm nang vận hành Facebook, TikTok. Cảnh giác tin nhắn giả danh Meta kèm link."
        },
        {
          title: "Rời nhóm không hợp với mình",
          detail: "Có nhóm cấm hẳn bán hàng. Ở lại góp nội dung có ích hoặc rời đi, đừng cố lách."
        },
        {
          title: "Đưa người quan tâm về kênh của mình",
          detail: "Trang cá nhân, nhóm Zalo khách quen, một trang web nhỏ so sánh các loại cám: những chỗ này admin nhóm không xoá được."
        }
      ]
    },
    {
      kind: "faq",
      id: "hoi-dap",
      nav: "Hỏi đáp",
      title: "Hỏi đáp nhanh",
      items: [
        {
          question: "Có cần nói ra là mình làm affiliate không?",
          answer: "Nên. Dân chơi chim rất ghét cảm giác bị “seeding”. Ghi rõ link affiliate làm bạn mất vài người ngại, nhưng giữ được người tin và không bị coi là lừa. Chương trình affiliate của sàn cũng có điều khoản riêng, nên đọc kỹ trước khi đăng."
        },
        {
          question: "Một tuần nên đăng bao nhiêu bài có link vào một nhóm?",
          answer: "Facebook không công bố con số. Kinh nghiệm của mình là theo luật nhóm, và tối đa một bài có link mỗi nhóm mỗi tuần, xen giữa các bài có ích."
        },
        {
          question: "Nhóm cấm link thì còn làm affiliate được không?",
          answer: "Được, nhưng bằng uy tín: đăng tin giải, kinh nghiệm, trả lời câu hỏi. Người quan tâm sẽ tự vào trang cá nhân hoặc nhắn tin hỏi bạn dùng cám gì."
        },
        {
          question: "Đăng ảnh chim của người khác chụp ở giải có cần xin phép không?",
          answer: "Nên xin phép chủ chim và ban tổ chức, nhất là khi bài có link bán hàng. Ghi tên chủ chim, tên giải để bài vừa đúng mực vừa được chia sẻ nhiều hơn."
        }
      ]
    }
  ],
  closing: {
    title: "Hội nhóm là chợ, kênh riêng mới là cửa hàng",
    text: "Nhóm có thể đổi luật, admin có thể đổi người, nick có thể bị khoá nhầm. Giữ danh sách khách quen và một chỗ riêng để giới thiệu cám, như vậy công sức không mất theo một cú báo cáo.",
    links: [
      { label: "Luật chơi Shopee Affiliate", href: "/blog/luat-choi-shopee-affiliate-va-bi-quyet-giu-hoa-hong" },
      { label: "Vận hành Facebook, TikTok", href: "/kien-thuc/van-hanh-facebook-tiktok" }
    ]
  },
  sources: [
    { label: "Chính sách spam của Meta", href: "https://transparency.meta.com/policies/community-standards/spam/" },
    { label: "Hành vi không xác thực", href: "https://transparency.meta.com/policies/community-standards/inauthentic-behavior/" },
    { label: "Tiêu chuẩn cộng đồng của Meta", href: "https://transparency.meta.com/policies/community-standards/" }
  ]
};
