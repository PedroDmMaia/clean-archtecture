import { QuestionRepository } from '@/domain/forum/application/repositories/question.reposotory'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionRepository implements QuestionRepository {
  public items: Question[] = []

  async findById(id: string) {
    const question = this.items.find((item) => item.id.toString() === id)

    if (!question) return null

    return question
  }

  async findBySlug(slug: string) {
    const questions = this.items.find((item) => item.slug.value === slug)

    if (!questions) {
      return null
    }

    return questions
  }

  async create(question: Question) {
    this.items.push(question)
    return question
  }

  async delete(question: Question) {
    const itemIndex = this.items.findIndex((items) => items.id === question.id)

    this.items.splice(itemIndex, 1)
  }
}
