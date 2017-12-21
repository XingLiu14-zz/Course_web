import { Comment } from './comment';

export class Article {
  text: string;
  date: Date;
  img: string;
  comments: Comment[];
  author: string;
  display: boolean;
  id: string;

  constructor(text: string,
              date: Date,
              img: string,
              comments: Comment[],
              author: string) {
    this.text = text;
    this.date = date;
    this.img = img;
    this.comments = comments;
    this.author = author;
    this.display = true;
  }
}
