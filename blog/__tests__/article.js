import '../src/config/loadTestEnv'
import supertest from 'supertest'
import { bootstrap } from '../src/app'
import User from '../src/models/user'
import { redisClient } from '../src/config/redis'
import { logger, mongoTransport } from '../src/utils/logger'

let request, user, article

const fakeUser = {
  username: 'ali',
  password: '123',
  email: 'ali@gmail.com'
}

const fakeArticle = {
  title: 'Article title',
  text: 'Article text',
  image: 'Article-image'
}

beforeAll(async () => {
  const app = await bootstrap()
  request = supertest(app)

  await request.post('/register').send(fakeUser)

  const response = await request
    .post('/api/login')
    .send({ username: 'ali', password: '123' })

  user = response.body
  await User.update({ role: 'ADMIN' }, { where: { username: user.username } })
})

describe('Admin article api', () => {
  test('list articles 401', async () => {
    const response = await request.get('/api/admin/article')
    expect(response.statusCode).toBe(401)
  })

  test('list articles 200', async () => {
    const response = await request
      .get('/api/admin/article')
      .set('Authorization', `Bearer ${user.token}`)

    expect(response.statusCode).toBe(200)
  })

  test('create article', async () => {
    const response = await request
      .post('/api/admin/article')
      .set('Authorization', `Bearer ${user.token}`)
      .send(fakeArticle)

    article = response.body

    expect(response.statusCode).toBe(200)
    checkArticle(response.body)
  })

  test('get article', async () => {
    const response = await request
      .get(`/api/admin/article/${article.id}`)
      .set('Authorization', `Bearer ${user.token}`)

    expect(response.statusCode).toBe(200)
    checkArticle(response.body)
  })

  test('update article', async () => {
    const response = await request
      .put(`/api/admin/article/${article.id}`)
      .set('Authorization', `Bearer ${user.token}`)
      .send({ ...article, title: 'New article' })

    expect(response.statusCode).toBe(200)
    expect(response.body.title).toBe('New article')
  })

  test('delete article', async () => {
    const response = await request
      .delete(`/api/admin/article/${article.id}`)
      .set('Authorization', `Bearer ${user.token}`)

    expect(response.statusCode).toBe(200)
  })

  test('get deleted article', async () => {
    const response = await request
      .get(`/api/admin/article/${article.id}`)
      .set('Authorization', `Bearer ${user.token}`)

    expect(response.statusCode).toBe(404)
  })
})

afterAll(async () => {
  await User.destroy({ where: { username: fakeUser.username } })

  redisClient.disconnect()
  logger.clear()
  logger.remove(mongoTransport)
})

function checkArticle (article) {
  expect(article.title).toBe(fakeArticle.title)
  expect(article.text).toBe(fakeArticle.text)
  expect(article.image).toBe(fakeArticle.image)
  expect(article).toHaveProperty('id')
}
