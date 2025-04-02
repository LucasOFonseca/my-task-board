import { faker } from '@faker-js/faker';
import { Task } from '../models/task.model';

export const makeTask = (): Task => ({
  id: faker.number.int().toString(),
  title: faker.lorem.sentence(),
  isCompleted: faker.datatype.boolean(),
  categoryId: faker.number.int().toString(),
});

export const makeTasks = (count = 3): Task[] =>
  Array.from({ length: count }, makeTask);
