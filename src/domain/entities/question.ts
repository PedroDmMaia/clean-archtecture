import { randomUUID } from "node:crypto"

interface QuestionProps {
  title: string
  content: string
  slug: string
  authorId: string
}

export class Question {
  public id: string
  public title: string
  public slug: string
  public content: string
  public authorId: string

  constructor({ title, content, authorId, slug }: QuestionProps, id?: string) {
    this.title = title
    this.content = content
    this.slug = slug
    this.authorId = authorId
    this.id = id ?? randomUUID()
  }
}