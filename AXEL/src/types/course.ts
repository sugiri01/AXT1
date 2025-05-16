
export interface Chapter {
  id: string;
  title: string;
  hasPreview?: boolean;
  content?: string;
  description?: string;
  materials?: string[];
  assignment?: string;
  completed?: boolean;
}

export interface Section {
  id: string;
  title: string;
  chapters: Chapter[];
  lessonsCount: number;
}

export interface ChapterProgress {
  chapterId: string;
  completed: boolean;
  lastAccessed?: Date;
}
