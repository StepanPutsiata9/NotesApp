interface ICategory {
  title: string;
  subTitle: string;
  color: string;
  image: string;
}

interface INote {
  isSecret?: boolean;
  categoryColor?: string;
  categoryName?: string;
  title?: string;
  date?: string;
  description?: string;
}
interface SelectedCategory {
  title: string;
  color: string;
}
