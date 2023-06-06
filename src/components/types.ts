export interface ClothingItem {
  id?: number;
  description: string;
  modelHeight: number;
  modelUrl: string;
  name: string;
  price: number;
}

export interface Video {
  id?: number;
  url: string;
  maskUrl: string;
  metadata: string;
  name: string;
  items?: [];
}

export interface CollectionItem {
  itemId: string;
}

export interface Collection {
  id?: number;
  order?: number;
  name: string;
  description: string;
  collectionItems: CollectionItem[];
  videoId?: string | null;
}
