import { ReferenceSource } from '../types';

export const VERIFIED_REFERENCES: ReferenceSource[] = [
  {
    id: 'ref-1',
    title: 'Từ điển tiếng Việt',
    authorOrOrg: 'GS. Hoàng Phê (Chủ biên) – Viện Ngôn ngữ học',
    yearOrEdition: 'Nhà xuất bản Đà Nẵng / NXB Hồng Đức (Tái bản nhiều lần)',
    category: 'Từ điển chuẩn',
    description:
      'Công trình từ điển học tiếng Việt có thẩm quyền cao nhất tại Việt Nam hiện nay, do tập thể các nhà ngôn ngữ học đầu ngành biên soạn dưới sự chủ trì của Viện Ngôn ngữ học. Được dùng làm căn cứ định danh nghĩa từ, chính tả chuẩn và phân biệt từ đồng âm/từ sai phổ biến.',
    appliedAspects: [
      'Căn cứ thẩm định các cặp từ dễ nhầm lẫn (xán lạn / sáng lạng, chẩn đoán / chuẩn đoán)',
      'Định dạng chuẩn phụ âm đầu s/x, tr/ch, d/r/gi và thanh điệu hỏi/ngã',
      'Giải nghĩa từ vựng và ngữ cảnh sử dụng chính xác',
    ],
    url: 'http://vienngonnguhoc.vass.gov.vn',
    isVerified: true,
  },
  {
    id: 'ref-2',
    title: 'Quyết định số 1989/QĐ-BGDĐT về Quy định chính tả trong chương trình, sách giáo khoa',
    authorOrOrg: 'Bộ Giáo dục và Đào tạo Việt Nam',
    yearOrEdition: 'Ban hành ngày 25 tháng 5 năm 2018',
    category: 'Văn bản quy phạm',
    description:
      'Văn bản quy phạm chuyên môn chuẩn hóa quy tắc chính tả trong hệ thống giáo dục quốc dân, bao gồm quy tắc viết hoa tên riêng, địa danh, quy tắc đặt dấu thanh và phiên âm thuật ngữ nước ngoài.',
    appliedAspects: [
      'Quy tắc đặt dấu thanh điệu trên nguyên âm chính',
      'Quy chuẩn viết hoa danh từ riêng, tên cơ quan tổ chức',
      'Chuẩn hóa chính tả trong bài tập cho học sinh, sinh viên',
    ],
    url: 'https://moet.gov.vn',
    isVerified: true,
  },
  {
    id: 'ref-3',
    title: 'Viện Ngôn ngữ học Việt Nam (Tạp chí Ngôn ngữ)',
    authorOrOrg: 'Viện Hàn lâm Khoa học Xã hội Việt Nam (VASS)',
    yearOrEdition: 'Cơ quan nghiên cứu khoa học cấp quốc gia',
    category: 'Cơ quan học thuật',
    description:
      'Viện nghiên cứu đầu ngành về ngôn ngữ học, ngôn ngữ các dân tộc và chuẩn hóa tiếng Việt tại Việt Nam. Tạp chí Ngôn ngữ là nơi công bố các công trình nghiên cứu chuyên sâu về ngữ âm, ngữ pháp, ngữ nghĩa và phong cách học tiếng Việt.',
    appliedAspects: [
      'Căn cứ phân biệt sự biến đổi ngữ âm theo vùng miền',
      'Xử lý các hiện tượng từ cổ, từ địa phương và cách dùng chưa chuẩn',
      'Định hướng bảo vệ sự trong sáng của tiếng Việt thời đại số',
    ],
    url: 'http://vienngonnguhoc.vass.gov.vn',
    isVerified: true,
  },
  {
    id: 'ref-4',
    title: 'Giáo trình Cơ sở Ngôn ngữ học & Tiếng Việt thực hành',
    authorOrOrg: 'GS. Đinh Văn Đức, PGS.TS. Nguyễn Hồng Cổn, PGS.TS. Bùi Minh Toán',
    yearOrEdition: 'Nhà xuất bản Đại học Quốc gia Hà Nội / NXB Giáo dục Việt Nam',
    category: 'Giáo trình đại học',
    description:
      'Giáo trình đại học chuẩn mực giảng dạy tại các khoa Ngữ văn, Báo chí, Ngôn ngữ học trên toàn quốc. Đào sâu cấu trúc ngữ pháp câu tiếng Việt, các lỗi dùng từ lặp, thừa từ, sai kết hợp từ và phong cách văn bản khoa học - hành chính.',
    appliedAspects: [
      'Tiêu chuẩn phân loại lỗi ngữ pháp, lỗi logic liên kết câu',
      'Bộ nguyên tắc diễn đạt trong sáng, mạch lạc trong văn bản học thuật',
      'Thiết kế ngân hàng câu hỏi luyện tập và mẹo ghi nhớ chính tả',
    ],
    url: 'https://vnu.edu.vn',
    isVerified: true,
  },
  {
    id: 'ref-5',
    title: 'Chuyên mục “Giữ gìn sự trong sáng của tiếng Việt”',
    authorOrOrg: 'Đài Tiếng nói Việt Nam (VOV) & Báo Giáo dục và Thời đại',
    yearOrEdition: 'Chương trình phát thanh & chuyên trang truyền thông giáo dục',
    category: 'Báo chí chính thống',
    description:
      'Chương trình truyền thông ngôn luận chính thống có sự tham gia của các chuyên gia ngôn ngữ, phê phán các lỗi dùng từ lệch chuẩn trên mạng xã hội, phân tích các từ cổ và bảo tồn nét đẹp tiếng Việt trong đời sống thường nhật.',
    appliedAspects: [
      'Tổng hợp các lỗi sai phổ biến của người trẻ trên mạng xã hội và truyền thông',
      'Căn cứ thực tiễn để thiết kế ví dụ trực quan gần gũi với đời sống',
      'Định hướng phản biện nhẹ nhàng, mang tính giáo dục cộng đồng',
    ],
    url: 'https://vov.vn',
    isVerified: true,
  },
];
