interface QRProcessingOptions {
  threshold?: number;
  grayscale?: boolean;
}

export class QRProcessor {
  private options: QRProcessingOptions;

  constructor(options: QRProcessingOptions = {}) {
    this.options = {
      threshold: options.threshold || 128, // Default threshold value
      grayscale: options.grayscale ?? true, // Default grayscale to true
    };
  }

  /**
   * Convert the image to grayscale using luminance formula
   */
  public convertToGrayscale(imageData: ImageData): ImageData {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      data[i] = data[i + 1] = data[i + 2] = gray;
    }
    return imageData;
  }

  /**
   * Apply binary thresholding to the image
   */
  public applyThreshold(imageData: ImageData): ImageData {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const value = data[i] < this.options.threshold! ? 0 : 255;
      data[i] = data[i + 1] = data[i + 2] = value;
    }
    return imageData;
  }

  /**
   * Detect finder patterns in the QR code
   */
  public findFinderPatterns(imageData: ImageData): { x: number; y: number }[] {
    const patterns: { x: number; y: number }[] = [];
    const width = imageData.width;
    const height = imageData.height;
    const data = imageData.data;

    for (let y = 0; y < height - 7; y++) {
      for (let x = 0; x < width - 7; x++) {
        if (this.isFinderPattern(data, x, y, width)) {
          patterns.push({ x, y });
        }
      }
    }

    return patterns;
  }

  /**
   * Check if a region contains a finder pattern
   */
  private isFinderPattern(
    data: Uint8ClampedArray,
    startX: number,
    startY: number,
    width: number
  ): boolean {
    const pattern = [1, 1, 1, 1, 1, 1, 1];
    let matches = true;

    for (let i = 0; i < 7; i++) {
      const pixel = data[((startY + i) * width + startX) * 4];
      if ((pixel === 0) !== (pattern[i] === 1)) {
        matches = false;
        break;
      }
    }

    return matches;
  }

  /**
   * Extract QR matrix from finder patterns
   */
  public extractQRMatrix(
    imageData: ImageData,
    finderPatterns: { x: number; y: number }[]
  ): number[][] {
    if (finderPatterns.length !== 3) {
      throw new Error("Invalid number of finder patterns");
    }

    const size = this.estimateQRSize(finderPatterns);
    const matrix: number[][] = Array.from({ length: size }, () =>
      Array(size).fill(0)
    );

    // Placeholder logic for matrix extraction
    return matrix;
  }

  /**
   * Estimate the QR code size based on distances between finder patterns
   */
  private estimateQRSize(patterns: { x: number; y: number }[]): number {
    const distances = patterns
      .map((p1, i) =>
        patterns.slice(i + 1).map((p2) =>
          Math.sqrt(
            Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
          )
        )
      )
      .flat();

    return Math.round(Math.min(...distances) / 7) * 7;
  }

  /**
   * Extract QR data from the image matrix
   */
  public extractQRData(imageData: ImageData): string | null {
    // Implement logic to extract QR data from imageData
    // This is a placeholder implementation
    const qrCodeData = "123456789"; // Replace with actual QR code data extraction logic
    return qrCodeData;
  }
  
  /**
   * ຟັງຊັນແປງ binary ເປັນຂໍ້ຄວາມ
   */
  private binaryToText(binaryData: string): string {
    let text = "";
  
    for (let i = 0; i < binaryData.length; i += 8) {
      const byte = binaryData.slice(i, i + 8);
      if (byte.length === 8) {
        text += String.fromCharCode(parseInt(byte, 2));
      }
    }
  
    return text;
  }
  

  /**
   * Main method to process the QR image and decode it
   */
  public async processImage(imageUrl: string): Promise<string> {
    try {
      const image = await this.loadImage(imageUrl);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Failed to get canvas context");
      }

      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      if (this.options.grayscale) {
        imageData = this.convertToGrayscale(imageData);
      }

      imageData = this.applyThreshold(imageData);
      const patterns = this.findFinderPatterns(imageData);
      const matrix = this.extractQRMatrix(imageData, patterns);
      return this.decodeQRData(matrix);
    } catch (error) {
      console.error(error.message);
      throw new Error("QR processing failed");
    }
  }

  /**
   * Load an image from a given URL
   */
  private loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }

  /**
   * Decode the QR code matrix into data
   */
  private decodeQRData(matrix: number[][]): string {
    // Placeholder logic for decoding QR data
    return "Decoded QR Code Data";
  }
}
