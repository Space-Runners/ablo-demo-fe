export interface ImageGenerationOptions {
  styles: object;
  moods: object;
  suggestions: object;
}

export interface TextToImageRequest {
  style: string;
  mood: string;
  freeText: string;
  subjectSuggestions: string[];
}

export interface Template {
  name: string;
  img: string;
}
