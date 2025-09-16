interface ICategory {
  title: string;
  subTitle: string;
  color: string;
  image: string;
}

interface NotesCardProps {
  isSecret?: boolean;
  categoryColor?: string;
  categoryName?: string;
  title?: string;
  date?: string;
  description?: string;
}
