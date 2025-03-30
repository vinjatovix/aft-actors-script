export interface Book {
  id: string;
  title: string;
  author: {
    id: string;
    name: string;
    metadata: {
      createdAt: string;
      updatedAt: string;
      createdBy: string;
      updatedBy: string;
    };
  };
  metadata: {
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
  };
  pages: number;
}
