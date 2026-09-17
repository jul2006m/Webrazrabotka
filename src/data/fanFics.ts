export interface FanFic {
  id: number;
  title: string;
  author: string;
  genre: string;
  rating: string;
  size: string;
  annotation: string;
  likes: number;
  comments: number;
  views: string;
  status: string;
  coverColor: string;
}

export const fanFics: FanFic[] = [
  {
    id: 1,
    title: "Тени прошлого",
    author: "MidnightWriter",
    genre: "Драма",
    rating: "PG-13",
    size: "Миди",
    annotation: "Когда прошлое возвращается, чтобы изменить настоящее...",
    likes: 142,
    comments: 23,
    views: "1.2k",
    status: "completed",
    coverColor: "from-purple-900 to-indigo-900"
  },
  {
    id: 2,
    title: "Новая реальность",
    author: "DreamSeeker",
    genre: "Приключения",
    rating: "R",
    size: "Макси",
    annotation: "Попаданец в мире магии должен выжить любой ценой.",
    likes: 256,
    comments: 45,
    views: "2.8k",
    status: "process",
    coverColor: "from-violet-900 to-purple-900"
  },
  {
    id: 3,
    title: "Секреты Хогвартса",
    author: "MagicLover",
    genre: "Юмор",
    rating: "G",
    size: "Мини",
    annotation: "Что скрывают стены древнего замка?",
    likes: 89,
    comments: 12,
    views: "890",
    status: "completed",
    coverColor: "from-indigo-900 to-purple-800"
  },
  {
    id: 4,
    title: "Любовь и магия",
    author: "RomanceQueen",
    genre: "Романтика",
    rating: "PG-13",
    size: "Миди",
    annotation: "История о запретной любви в мире волшебства.",
    likes: 312,
    comments: 67,
    views: "3.5k",
    status: "completed",
    coverColor: "from-fuchsia-900 to-purple-900"
  },
  {
    id: 5,
    title: "Последний маг",
    author: "ShadowCaster",
    genre: "Драма",
    rating: "R",
    size: "Макси",
    annotation: "Последний из своего рода должен спасти мир от забвения.",
    likes: 198,
    comments: 34,
    views: "2.1k",
    status: "process",
    coverColor: "from-purple-950 to-violet-900"
  },
  {
    id: 6,
    title: "Хроники Астрала",
    author: "StarWeaver",
    genre: "Приключения",
    rating: "PG-13",
    size: "Макси",
    annotation: "Межзвёздные путешествия и древние тайны вселенной.",
    likes: 421,
    comments: 89,
    views: "5.2k",
    status: "process",
    coverColor: "from-indigo-950 to-purple-900"
  }
];

export const quotes: string[] = [
  "Магия существует только тогда, когда в неё веришь.",
  "Не все те, кто блуждают, потеряны.",
  "Счастье можно найти даже в тёмные времена, если не забывать обращаться к свету.",
  "Выбор определяет нас гораздо больше, чем способности.",
  "Любовь сильнее смерти.",
  "Слова — наш самый неисчерпаемый источник магии.",
  "Не жалей о мёртвых. Жалей о живых, особенно о тех, кто живёт без любви."
];
