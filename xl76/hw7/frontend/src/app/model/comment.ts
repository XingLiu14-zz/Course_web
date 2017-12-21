export class Comment {
  text: string;
  date: Date;
  author: string;
  commentId: String; // changed

  constructor(text: string,
              date: Date,
              author: string,
              commentId: string) {
    this.text = text;
    this.date = date;
    this.author = author;
    this.commentId = commentId;
  }
}
