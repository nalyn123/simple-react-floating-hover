export class CommonUtils {
  static isMobile = () => {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  }
}
