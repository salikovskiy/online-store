import axios from 'axios';
axios.defaults.baseURL = 'https://dash-ads.goit.co.ua/api/v1';
export default {
  async ads() {
    console.log('result');
    const data = await axios.post(
      '/ads',
      {
        images: [
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.vox-cdn.com%2Fthumbor%2FtpuqtWy3qfScHgF_GM63-UdpRuw%3D%2F0x0%3A1440x2594%2F1200x800%2Ffilters%3Afocal(605x1182%3A835x1412)%2Fcdn.vox-cdn.com%2Fuploads%2Fchorus_image%2Fimage%2F59677615%2Fnintendo_switch_online_art_1440.0.png&f=1&nofb=1',
        ],
        title: 'nintendo',
        category: 2,
        price: 1000000,
        phone: '0898777432',
        description: 'cool game',
      },
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZTc5ZTIyNmIzMDg2MjZiOWQ0ZTBhYiIsImlhdCI6MTU3NTQ2MDM4Nn0.F-oHdzl_uXQpB9oiMOF0b61yL59kHwIIadFzBKjfZ7U',
        },
      },
    );
    console.log(data);
  },
};
