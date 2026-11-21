// Cẩm nang "Chatbot AI cho website bán hàng" tại /kien-thuc/chatbot-ai-cho-website.
// Bài SEO tiếp cận chủ shop, chủ doanh nghiệp đang mất khách vì trả lời chậm. Nội dung bám tờ chào chatbot AI của Duy Web.
// Không hứa con số doanh thu, không nói chatbot thay hẳn người bán.

import type { Guide } from "./guideTypes";

export const chatbotAiGuide: Guide = {
  slug: "chatbot-ai-cho-website",
  kicker: "Cẩm nang chatbot AI cho chủ shop",
  title: "Chatbot AI cho website: nhân viên tư vấn trả lời khách cả lúc nửa đêm",
  summary: "Khi nào website nên gắn chatbot AI, chatbot làm được gì và không nên làm gì, cách triển khai 4 bước để bot trả lời đúng giá, đúng giọng shop và chuyển khách nóng về cho bạn chốt.",
  description: "Chatbot AI cho website bán hàng: dấu hiệu shop đang mất khách vì trả lời chậm, chatbot AI khác chatbot kịch bản thế nào, sai lầm hay gặp, 4 bước triển khai và checklist chuẩn bị. Đăng ký demo miễn phí trên chính website của bạn.",
  keywords: ["chatbot AI cho website", "làm chatbot cho website", "chatbot bán hàng", "chatbot tư vấn khách hàng", "chatbot trả lời tự động", "gắn chatbot lên website", "đức duy web"],
  intro: "Khách nhắn hỏi size lúc 11 giờ đêm, sáng hôm sau bạn trả lời thì họ đã mua ở shop khác. Chatbot AI không thay bạn bán hàng, nhưng nó giữ chân khách trong lúc bạn bận: trả lời ngay câu hỏi quen, gợi ý đúng sản phẩm và báo cho bạn những khách đáng gọi lại. Bài này giúp bạn tự xem shop mình đã cần chatbot chưa, và nếu cần thì làm sao để bot không nói sai.",
  breadcrumb: "Chatbot AI cho website",
  updated: "21/11/2026",
  date: "2026-11-21",
  readingTime: "8 phút",
  topic: "Chiến lược & chốt khách",
  blocks: [
    {
      kind: "cards",
      id: "dau-hieu",
      nav: "Dấu hiệu đang mất khách",
      icon: "alert",
      title: "Bạn có đang mất khách vì những điều này?",
      lead: "Phần lớn khách không bỏ đi vì giá. Họ bỏ đi vì hỏi mà không ai trả lời kịp.",
      items: [
        {
          title: "Khách nhắn lúc bạn bận",
          detail: "Đang giao hàng, đang họp, đang ngủ. Vài tiếng sau bạn trả lời thì khách đã hỏi thêm ba shop khác và chốt ở shop trả lời trước."
        },
        {
          title: "Hỏi đi hỏi lại cùng một câu",
          detail: "Giá bao nhiêu, có size không, ship mấy ngày, đổi trả thế nào. Cả ngày gõ lại những câu đã trả lời cả trăm lần."
        },
        {
          title: "Hỏi giá rồi im",
          detail: "Khách đang quan tâm nhưng không ai dẫn dắt tiếp: không gợi ý mẫu phù hợp, không hỏi lại nhu cầu, không có nút đặt hàng. Thế là rơi mất."
        },
        {
          title: "Web có người vào mà ít người liên hệ",
          detail: "Xem thống kê thấy có lượt truy cập từ Google, nhưng số cuộc gọi, tin nhắn Zalo lại rất ít. Khách đọc xong, còn thắc mắc mà không biết hỏi ai nhanh."
        }
      ]
    },
    {
      kind: "cards",
      id: "chatbot-lam-gi",
      nav: "Chatbot AI làm gì",
      icon: "bot",
      title: "Chatbot AI làm được gì cho website của bạn",
      lead: "Một chatbot tốt giống một nhân viên tư vấn mới được bạn dạy kỹ: nói đúng điều shop cho phép, biết lúc nào phải gọi chủ.",
      items: [
        {
          title: "Trả lời theo kịch bản của shop",
          detail: "Câu hỏi thường gặp được soạn sẵn từ trước: đúng giá, đúng chính sách đổi trả, đúng giọng nói của shop, không phải văn máy móc."
        },
        {
          title: "Hiểu cả câu hỏi “lạ”",
          detail: "Khách viết tắt, viết sai chính tả, hỏi vòng vo, bot vẫn nắm được ý. Câu khó hơn thì AI soạn trả lời dựa trên thông tin shop đã cung cấp."
        },
        {
          title: "Biết lúc nào nên chốt",
          detail: "Thấy khách hỏi giá, size, phí ship là bot đưa ngay sản phẩm phù hợp kèm nút đặt hàng, thay vì chỉ trả lời rồi để đó."
        },
        {
          title: "Chuyển khách cho bạn đúng lúc",
          detail: "Khách muốn gặp người thật, hỏi đơn số lượng lớn hay đang phàn nàn: bot xin số điện thoại và báo ngay về Zalo hoặc Telegram của bạn."
        },
        {
          title: "Càng chạy càng giỏi",
          detail: "Mỗi tuần, những câu bot trả lời chưa tốt được gom lại để bạn duyệt. Bot học đúng điều bạn muốn, không tự ý nói sai giá hay chính sách."
        },
        {
          title: "Trực cả ngày lễ, cả nửa đêm",
          detail: "Khách hỏi giờ nào cũng có người đáp ngay. Sáng ra bạn chỉ cần xem danh sách khách bot đã lọc và gọi lại người đáng gọi."
        }
      ]
    },
    {
      kind: "cards",
      id: "ai-hay-kich-ban",
      nav: "AI hay kịch bản",
      icon: "users",
      title: "Chatbot AI khác chatbot kịch bản thế nào, và khi nào chưa cần",
      lead: "Không phải shop nào cũng cần AI. Chọn đúng loại tiết kiệm được cả tiền lẫn công.",
      items: [
        {
          title: "Chatbot kịch bản (bấm nút)",
          detail: "Khách bấm vào các nút có sẵn như “Xem giá”, “Hỏi ship”. Rẻ, dễ làm, không bao giờ nói sai, nhưng khách gõ câu ngoài kịch bản là bot bí.",
          tag: "Kịch bản"
        },
        {
          title: "Chatbot AI",
          detail: "Khách gõ tự nhiên như nhắn với người. AI hiểu ý và trả lời bằng thông tin shop đã duyệt. Hợp với shop nhiều sản phẩm, khách hỏi đa dạng.",
          tag: "AI"
        },
        {
          title: "Cách Duy hay làm: ghép cả hai",
          detail: "Câu quan trọng như giá, chính sách đổi trả dùng câu trả lời soạn sẵn để chắc chắn đúng. Phần còn lại để AI xử lý. Vừa linh hoạt vừa không nói bừa.",
          tag: "Kết hợp"
        },
        {
          title: "Khi nào chưa cần chatbot",
          detail: "Mỗi ngày chỉ vài tin nhắn và bạn trả lời kịp, hoặc web chưa có người vào. Lúc đó nên làm SEO, Google Maps để có khách trước, chatbot để sau.",
          tag: "Chưa cần"
        }
      ]
    },
    {
      kind: "violations",
      id: "sai-lam",
      nav: "Sai lầm hay gặp",
      icon: "shield",
      title: "Những sai lầm khiến chatbot làm hại shop",
      lead: "Gắn chatbot lên web rất nhanh. Gắn sai thì khách bực hơn cả khi không có bot.",
      groups: [
        {
          name: "Bot nói sai, nói bừa",
          intro: "Lỗi đáng sợ nhất, vì khách tin bot là lời của shop.",
          items: [
            {
              title: "Để AI tự trả lời giá và khuyến mãi",
              example: "Bot đọc lung tung trên web rồi báo giá cũ, hứa freeship sai điều kiện, nhận đổi trả shop không nhận.",
              instead: "Giá, khuyến mãi, chính sách chỉ lấy từ bảng dữ liệu shop đã duyệt. Không chắc thì bot nói “để shop xác nhận lại” và chuyển cho bạn.",
              penalty: "Mất uy tín"
            },
            {
              title: "Cài xong rồi bỏ đó",
              example: "Hàng hết, đổi giá, đổi mẫu mà bot vẫn giới thiệu như cũ suốt mấy tháng.",
              instead: "Mỗi tuần xem lại báo cáo câu hỏi, cập nhật sản phẩm và câu trả lời. Mười lăm phút một tuần là đủ.",
              penalty: "Mất khách"
            }
          ]
        },
        {
          name: "Bot làm khách khó chịu",
          intro: "Chatbot là để giữ khách, không phải để chặn khách.",
          items: [
            {
              title: "Không cho khách gặp người thật",
              example: "Khách gõ “cho gặp nhân viên” mấy lần, bot vẫn lặp lại menu.",
              instead: "Luôn có lối ra: xin số điện thoại, nút Zalo, hoặc báo giờ shop sẽ gọi lại. Khách phàn nàn thì chuyển người ngay.",
              penalty: "Mất khách"
            },
            {
              title: "Giả làm người thật",
              example: "Đặt tên bot như nhân viên, nói “em vừa đi kho về”, khách phát hiện thì thấy bị lừa.",
              instead: "Nói rõ đây là trợ lý tự động của shop. Khách không ngại nói chuyện với bot, họ ngại bị lừa.",
              penalty: "Mất uy tín"
            },
            {
              title: "Bật lên che hết màn hình điện thoại",
              example: "Vừa vào web, khung chat tự mở to, khách phải tìm nút tắt mới đọc được sản phẩm.",
              instead: "Để biểu tượng nhỏ ở góc, chỉ gợi ý mở chat khi khách đã xem trang một lúc hoặc đang ở trang sản phẩm.",
              penalty: "Mất khách"
            }
          ]
        },
        {
          name: "Kỹ thuật và dữ liệu",
          intro: "Hai chuyện ít người để ý nhưng ảnh hưởng lâu dài.",
          items: [
            {
              title: "Gắn khung chat làm web chậm",
              example: "Mã chatbot tải nặng ngay khi mở trang, điểm tốc độ trên điện thoại tụt, Google đánh giá trải nghiệm kém hơn.",
              instead: "Chỉ tải khung chat sau khi trang đã hiện xong hoặc khi khách bấm vào. Đo lại tốc độ trước và sau khi gắn.",
              penalty: "Ảnh hưởng SEO"
            },
            {
              title: "Xin số điện thoại mà không nói để làm gì",
              example: "Bot đòi số điện thoại ngay câu đầu, không nói dùng vào việc gì, lưu chung một file ai cũng xem được.",
              instead: "Xin số khi khách cần được gọi lại, nói rõ mục đích, chỉ người phụ trách xem được và không dùng để gửi quảng cáo khi khách chưa đồng ý.",
              penalty: "Rủi ro pháp lý"
            }
          ]
        }
      ]
    },
    {
      kind: "steps",
      id: "trien-khai",
      nav: "Triển khai 4 bước",
      icon: "calendar",
      title: "Triển khai nhẹ nhàng trong 4 bước",
      lead: "Bạn không cần biết kỹ thuật. Việc của bạn là kể cho Duy nghe khách hay hỏi gì.",
      items: [
        {
          title: "Gửi câu hỏi hay gặp",
          detail: "Liệt kê những điều khách hay hỏi, chụp lại vài đoạn chat cũ trên Zalo, Facebook, và chọn các sản phẩm chủ lực muốn bot giới thiệu."
        },
        {
          title: "Dựng kịch bản",
          detail: "Duy soạn câu trả lời theo giọng shop, gắn sản phẩm vào đúng tình huống và đặt các điểm chốt: lúc nào gợi ý mua, lúc nào chuyển cho bạn."
        },
        {
          title: "Gắn lên website",
          detail: "Chạy thử cùng bạn trên chính website, hỏi thử như khách thật. Ổn rồi mới mở cho khách dùng."
        },
        {
          title: "Theo dõi, cập nhật",
          detail: "Báo cáo hằng tuần: khách hỏi gì nhiều, câu nào bot trả lời chưa tốt, bao nhiêu khách để lại số. Bổ sung theo câu hỏi thật."
        }
      ]
    },
    {
      kind: "checklist",
      id: "chuan-bi",
      nav: "Checklist chuẩn bị",
      icon: "check",
      title: "Chuẩn bị gì trước khi làm chatbot",
      lead: "Bấm vào từng dòng khi đã có. Đủ những thứ này thì bot làm ra sẽ dùng được ngay.",
      doneMessage: "Đủ rồi. Gửi những thứ này cho Duy để dựng bản demo trên chính website của bạn.",
      items: [
        "Danh sách 15 đến 30 câu khách hay hỏi nhất",
        "Bảng giá hiện tại và các chương trình khuyến mãi đang chạy",
        "Chính sách giao hàng, đổi trả, bảo hành viết rõ ràng",
        "Danh sách sản phẩm chủ lực muốn bot ưu tiên giới thiệu",
        "Vài đoạn chat cũ với khách để bot học giọng nói của shop",
        "Số Zalo hoặc Telegram sẽ nhận thông báo khi có khách cần gọi lại",
        "Những điều bot không bao giờ được hứa (giảm giá thêm, giao trong ngày…)",
        "Người sẽ dành 15 phút mỗi tuần duyệt câu trả lời của bot"
      ]
    },
    {
      kind: "faq",
      id: "hoi-dap",
      nav: "Hỏi đáp",
      title: "Hỏi đáp nhanh",
      items: [
        {
          question: "Website của tôi làm ở chỗ khác thì có gắn chatbot được không?",
          answer: "Được. Chatbot gắn vào web bằng một đoạn mã nhỏ, dùng được cho phần lớn website: WordPress, Sapo, Haravan, Nasani hay web viết riêng. Duy sẽ xem web của bạn trước khi làm demo."
        },
        {
          question: "Chatbot có tự nói sai giá không?",
          answer: "Nếu để AI tự do thì có thể. Vì vậy giá, khuyến mãi và chính sách chỉ được lấy từ dữ liệu bạn đã duyệt. Câu nào bot không chắc, nó sẽ hẹn shop xác nhận và báo cho bạn thay vì tự đoán."
        },
        {
          question: "Có cần người trực chatbot không?",
          answer: "Không cần trực liên tục. Bot trả lời các câu quen, còn khách cần người thật thì bot báo về Zalo hoặc Telegram để bạn gọi lại khi rảnh. Mỗi tuần dành khoảng 15 phút duyệt các câu bot trả lời chưa tốt."
        },
        {
          question: "Chatbot có làm website chậm, ảnh hưởng SEO không?",
          answer: "Có thể, nếu mã chat tải ngay khi mở trang. Duy cài để khung chat chỉ tải sau khi trang đã hiện xong, rồi đo lại tốc độ trên điện thoại trước và sau khi gắn."
        },
        {
          question: "Chi phí làm chatbot AI khoảng bao nhiêu?",
          answer: "Tuỳ số sản phẩm, số câu hỏi cần soạn và việc có nối với Zalo, Telegram hay không. Cách tốt nhất là xem demo miễn phí trên chính website của bạn trước, thấy hợp rồi Duy mới báo giá."
        },
        {
          question: "Chatbot trên web và chatbot trên Facebook, Zalo khác gì?",
          answer: "Chatbot trên web đón khách tìm thấy bạn qua Google, những người đang đọc sản phẩm và sắp quyết định mua. Chatbot trên Facebook, Zalo phục vụ khách đã theo dõi kênh. Nên bắt đầu ở nơi khách đang hỏi nhiều nhất."
        }
      ]
    }
  ],
  closing: {
    title: "Xem chatbot trả lời thử bằng sản phẩm thật của shop bạn",
    text: "Gửi cho Duy link website và vài câu khách hay hỏi. Duy dựng một bản demo chạy trên chính website của bạn để bạn hỏi thử như khách thật, thấy hợp rồi mới quyết định. Demo miễn phí, không ràng buộc.",
    links: [
      { label: "Xem các dịch vụ của Duy", href: "/services" }
    ],
    zaloLabel: "Đăng ký demo miễn phí qua Zalo"
  },
  sourcesNote: "Hai điểm kỹ thuật và pháp lý nhắc trong bài có thể đọc thêm ở nguồn chính thức:",
  sources: [
    { label: "Core Web Vitals (Google Search Central)", href: "https://developers.google.com/search/docs/appearance/core-web-vitals" },
    { label: "Văn bản pháp luật về bảo vệ dữ liệu cá nhân (Cổng văn bản Chính phủ)", href: "https://vanban.chinhphu.vn/" }
  ]
};
