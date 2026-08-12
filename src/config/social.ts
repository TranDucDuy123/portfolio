export interface SocialConfig {
  zalo: string;
  phone: string;
  phoneDisplay: string;
  facebookPersonal: string;
  facebookFanpage: string;
  youtube: string;
  email: string;
  qrZalo: string; // URL or placeholder for Zalo QR
  address: string;
}

export const socialConfig: SocialConfig = {
  zalo: "https://zalo.me/0938415218", // placeholder for user to update
  phone: "0938415218",
  phoneDisplay: "0938.415.218",
  facebookPersonal: "https://www.facebook.com/tran.duc.duy.742865/",
  facebookFanpage: "http://facebook.com/profile.php?id=61589111863156",
  youtube: "https://youtube.com/@ducduyweb",
  email: "contact@ducduyweb.vn",
  qrZalo: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://zalo.me/0938415218",
  address: "Quận 1, Thành phố Hồ Chí Minh, Việt Nam"
};
