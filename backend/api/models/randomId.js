import { customAlphabet } from 'nanoid';

const alphabet = '123456789ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz';

export default function randomId() {
  return customAlphabet(alphabet, 9);
}
