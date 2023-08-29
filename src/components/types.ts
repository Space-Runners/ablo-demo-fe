export interface ImageGenerationOptions {
  styles: object;
  tones: {
    string: string[];
  };
  suggestions: object;
}

export interface TextToImageRequest {
  style: string;
  tone?: string;
  freeText: string;
  subjectSuggestions: string[];
  background: boolean;
}

export interface Template {
  name: string;
  img: string;
}

export interface Filters {
  sizes?: string[];
  colors?: string[];
  clothingTypes?: string[];
  fits?: string[];
  productTypes?: string[];
  collections?: string[];
  genders?: string[];
  brands?: string[];
  price?: [number, number];
}

export interface Garment {
  productId: number;
  variant: string;
  size: string;
}

export interface Variant {
  name: string;
  color: string;
}

type PrintableAreaDimensions = {
  left: number;
  top: number;
  height: number;
  width: number;
};

export interface Product {
  fabric: string;
  id: number;
  madeIn: string;
  name: string;
  fit: string;
  price: number;
  urlPrefix: string;
  description: string;
  printableAreas: {
    front: PrintableAreaDimensions;
    back: PrintableAreaDimensions;
  };
  variants: Variant[];
  tags: string[];
}

export interface AiImageOptions {
  style: string;
  tone: string;
  keywords?: string[];
  subject?: string;
  background: boolean;
}

export interface AiImage {
  options: AiImageOptions;
  url: string;
  noBackgroundUrl?: string;
  withBackgroundUrl?: string;
}

export interface CanvasState {
  canvas?: string;
  canvasUrl?: string;
  previewUrl?: string;
}

export interface EditorState {
  front: CanvasState;
  back: CanvasState;
}

export interface Design {
  id?: string;
  name: string;
  garmentId: number;
  garmentColor: string;
  editorState: EditorState;
  size?: string;
  updatedAt?: string;
}

export interface CanvasObject {
  angle: number;
  aiImage?: AiImage;
  clone: (callback: (clone: CanvasObject) => void) => void;
  left: number;
  set: (key: string, property: number | string) => void | ((properties: object) => void);
  top: number;
}

export interface CanvasEvent {
  ctx: object;
  target: CanvasObject;
}

export interface Canvas {
  add: (object: object) => void;
  aiImage: AiImage;
  remove: (object: CanvasObject) => void;
  freeDrawingBrush: {
    width: number;
  };
  isDrawingMode: boolean;
  getActiveObject: () => CanvasObject;
  setActiveObject: (object: CanvasObject) => void;
  centerObject: (object: CanvasObject) => void;
  on: (event: string, callback: (e: CanvasEvent) => void) => void;
  sendBackwards: (object: CanvasObject) => void;
  bringForward: (object: CanvasObject) => void;
  _objects: [CanvasObject];
  renderAll: () => void;
  toDataURL: (object: object) => string;
}
