export interface TypeImageInfo {
  size: number,
  width: number,
  height: number,
  name: string,
  type: string,
  sizeType?: string,
  fileMd5?:string
}

export async function getImageInfo(imageFile: File): Promise<TypeImageInfo> {
  const imageSrc = URL.createObjectURL(imageFile)
  const image = new Image()
  const { name, size, type } = imageFile
  image.src = imageSrc
  return new Promise((resolve, reject) => {
    image.addEventListener('error', error => {
      reject(error)
    })
    image.addEventListener('load', () => {
      resolve({
        width: image.width,
        height: image.height,
        name,
        size,
        type
      })
    })
  })
}

export interface TypeAllVideoInfo {
  saturation: number;
  video: HTMLVideoElement;
  width: number;
  height: number;
  duration: number;
  name: string;
  size: number;
  type: string;
  posterFile: TypeFileInfo;
  sizeType?: string,
  fileMd5?:string
}


interface TypeVideoInfo {
  video: HTMLVideoElement,
  width: number,
  height: number,
  duration: number
}

interface TypeRGBA {
  r: number,
  g: number,
  b: number,
  a?: number
}

interface TypePosterVideo extends TypeVideoInfo {
  posterUrl: string,
  saturation: number
}

export interface TypeFileInfo extends File {
  fileInfo: TypeAllVideoInfo | TypeImageInfo;
  thumbnailUrl?: string
}

// 获取视频基本信息
function getVideoBasicInfo(videoSrc: string): Promise<TypeVideoInfo> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.src = videoSrc
    // 视频一定要添加预加载
    video.preload = 'auto'
    // 视频一定要同源或者必须允许跨域
    video.crossOrigin = 'Anonymous'
    // 监听：异常
    video.addEventListener('error', error => {
      reject(error)
    })
    // 监听：加载完成基本信息,设置要播放的时长
    video.addEventListener('loadedmetadata', () => {
      const videoInfo = {
        video,
        width: video.videoWidth,
        height: video.videoHeight,
        duration: video.duration
      }
      resolve(videoInfo)
    })
  })
}

// 将获取到的视频信息，转化为图片地址
function getVideoPosterInfo(videoInfo: TypeVideoInfo): Promise<TypePosterVideo> {
  return new Promise(resolve => {
    const { video, width, height } = videoInfo
    video.addEventListener('canplay', () => {
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(video, 0, 0, width, height)
        const saturation = getImageSaturation(canvas)
        const posterUrl = canvas.toDataURL('image/png')
        resolve({ posterUrl, saturation, ...videoInfo })
      }
    })
  })
}
// 获取一个图片的平均饱和度
function getImageSaturation(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  const uint8ClampedArray = ctx ? ctx.getImageData(0, 0, canvas.width, canvas.height).data : null
  if (uint8ClampedArray) {
    const rgbaList = binary2rgba(uint8ClampedArray)
    const hslList = rgbaList.map(item => {
      return rgb2hsl(item.r, item.g, item.b)
    })
    const avarageSaturation = hslList.reduce((total, curr) => total + curr.s, 0) / hslList.length
    return avarageSaturation
  } else {
    return 0
  }
}

function rgb2hsl(r: number, g: number, b: number) {
  r = r / 255;
  g = g / 255;
  b = b / 255;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const difference = max - min;
  let l = (min + max) / 2, h = 0, s = 0;
  if (max == min) {
    h = 0;
    s = 0;
  } else {
    s = l > 0.5 ? difference / (2.0 - max - min) : difference / (max + min);
    switch (max) {
      case r: h = (g - b) / difference + (g < b ? 6 : 0); break;
      case g: h = 2.0 + (b - r) / difference; break;
      case b: h = 4.0 + (r - g) / difference; break;
    }
    h = Math.round(h * 60);
  }
  s = Math.round(s * 100);//转换成百分比的形式
  l = Math.round(l * 100);
  return { h, s, l };
}

function binary2rgba(uint8ClampedArray: Uint8ClampedArray) {
  const rgbaList: TypeRGBA[] = []
  for (let i = 0; i < uint8ClampedArray.length; i++) {
    if (i % 4 === 0) {
      rgbaList.push({ r: uint8ClampedArray[i], g: 0, b: 0 })
      continue
    }
    const currentRgba = rgbaList[rgbaList.length - 1]
    if (i % 4 === 1) {
      currentRgba.g = uint8ClampedArray[i]
      continue
    }
    if (i % 4 === 2) {
      currentRgba.b = uint8ClampedArray[i]
      continue
    }
    if (i % 4 === 3) {
      currentRgba.a = uint8ClampedArray[i]
      continue
    }
  }
  return rgbaList
}

// 根据视频地址与播放时长获取图片信息与图片平均饱和度
async function getVideoPosterByFrame(videoSrc: string, targetTime: number) {
  const videoInfo = await getVideoBasicInfo(videoSrc)
  const { video } = videoInfo
  video.currentTime = targetTime
  return await getVideoPosterInfo(videoInfo)
}

function dataURLtoFile(videoUrl: string, filename: string) {
  const arr = videoUrl.split(',')
  const mime = arr[0] ? arr[0].match(/:(.*?);/)?.[1] : ''
  const bstr = window.atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  const typeSuffix = mime ? mime.split('/')[1] : 'png'
  return new File([u8arr], filename + '.' + typeSuffix, { type: mime });
}

export async function getBestPoster(videoSrc: string, targetSaturation = 0) {
  for (let i = 1; i <= 3; i++) {
    const newVideoInfo = await getVideoPosterByFrame(videoSrc, i * 0.5)
    if (newVideoInfo.saturation > targetSaturation) {
      return newVideoInfo
    }
  }
  return await getVideoPosterByFrame(videoSrc, 1)
}

export async function getPoster(videoFile: File, targetSaturation = 0): Promise<TypeAllVideoInfo> {
  const videoSrc = URL.createObjectURL(videoFile)
  const fileInfo = await getBestPoster(videoSrc, targetSaturation)
  const { name, size, type } = videoFile
  const lastIndex = name.lastIndexOf(".");
  let filename = name
  if (lastIndex > -1) filename = name.substring(0, lastIndex);
  const { posterUrl, ...newFileInfo } = fileInfo
  const posterFile = dataURLtoFile(posterUrl, filename) as TypeFileInfo
  const imageInfo = await getImageInfo(posterFile)
  posterFile.fileInfo = imageInfo
  return {
    name,
    size,
    type,
    posterFile,
    ...newFileInfo
  }
}
