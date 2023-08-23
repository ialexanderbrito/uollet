import { useState, useEffect } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  os: string;
  browser: string;
}
export function useDetectDevice(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    os: '',
    browser: '',
  });

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const isMobile = /Mobi|Android/i.test(userAgent);
    const isTablet = /Tablet|iPad/i.test(userAgent);
    const isDesktop = !isMobile && !isTablet;
    const os = (() => {
      if (/Windows/i.test(userAgent)) return 'Windows';
      if (/Macintosh|MacIntel/i.test(userAgent)) return 'Mac';
      if (/Linux/i.test(userAgent)) return 'Linux';
      if (/Android/i.test(userAgent)) return 'Android';
      if (/iOS/i.test(userAgent)) return 'iOS';
      return 'Unknown';
    })();
    const browser = (() => {
      if (/MSIE|Trident/i.test(userAgent)) return 'Internet Explorer';
      if (/Edg/i.test(userAgent)) return 'Microsoft Edge';
      if (/Firefox/i.test(userAgent)) return 'Mozilla Firefox';
      if (/Chrome/i.test(userAgent)) return 'Google Chrome';
      if (/Safari/i.test(userAgent)) return 'Apple Safari';
      return 'Unknown';
    })();

    setDeviceInfo({
      isMobile,
      isTablet,
      isDesktop,
      os,
      browser,
    });
  }, []);

  return deviceInfo;
}
