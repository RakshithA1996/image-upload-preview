export const browserSupportability = () => {
  const is_chrome = navigator.userAgent.indexOf("Chrome") > -1;
  const is_explorer = navigator.userAgent.indexOf("MSIE") > -1;
  const is_firefox = navigator.userAgent.indexOf("Firefox") > -1;
  const is_safari =
    navigator.userAgent.indexOf("Safari") != -1 &&
    navigator.userAgent.indexOf("Chrome") == -1;
  const is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;

  if (is_chrome || is_firefox || is_opera) {
    return true;
  } else if (is_explorer || is_safari) {
    return false;
  } else {
    return true;
  }
};

export const imageBaseUrl =
  "https://cp-assets-public.s3.ap-south-1.amazonaws.com/classplus-websites/common";
