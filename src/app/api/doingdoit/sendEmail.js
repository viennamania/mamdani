import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    // Nodemailer transporter 생성
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'creath.park@gmail.com',
        pass: 'xjtz jqmx vfwo bcyh', // Gmail '앱 비밀번호'
      },
    });

    // 전송할 이메일 내용 설정
    const mailOptions = {
      from: 'your.email@gmail.com',
      to: 'songpalabs@gmail.com', //필자의 naver 계정에 보내보았다.
      subject: '테스트 이메일',
      text: '안녕하세요, 이것은 테스트 이메일입니다.',
    };

    // 이메일 전송
    const info = await transporter.sendMail(mailOptions);

    console.log('이메일 전송 성공:', info.response);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('이메일 전송 실패:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
  
}