import { timeElapsed } from './time';

describe('timeElapsed', () => {
  test('should return correct elapsed time in seconds', () => {
    const now = new Date();
    const pastTimeDate = new Date(now.getTime() - 30 * 1000).toISOString();
    const text = timeElapsed(pastTimeDate);
    expect(text).toBe('30 seconds ago');
  });
  test('should return correct elapsed time in minutes', () => {
    const now = new Date();
    const pastTimeDate = new Date(now.getTime() - 10 * 60 * 1000).toISOString();
    const text = timeElapsed(pastTimeDate);
    expect(text).toBe('10 minutes ago');
  });
  test('should return correct elapsed time in hours', () => {
    const now = new Date();
    const pastTimeDate = new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString();
    const text = timeElapsed(pastTimeDate);
    expect(text).toBe('3 hours ago');
  });
  test('should return correct elapsed time in days', () => {
    const now = new Date();
    const pastTimeDate = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString();
    const text = timeElapsed(pastTimeDate);
    expect(text).toBe('5 days ago');
  });
  test('should return correct elapsed time in weeks', () => {
    const now = new Date();
    const pastTimeDate = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString();
    const text = timeElapsed(pastTimeDate);
    expect(text).toBe('2 weeks ago');
  });
  test('should return correct elapsed time in month', () => {
    const now = new Date();
    const pastTimeDate = new Date(now.getTime() - 122 * 24 * 60 * 60 * 1000).toISOString();
    const text = timeElapsed(pastTimeDate);
    expect(text).toBe('4 months ago');
  });
  test('should return correct elapsed time in years', () => {
    const now = new Date();
    const pastTimeDate = new Date(now.getTime() - 730 * 24 * 60 * 60 * 1000).toISOString();
    const text = timeElapsed(pastTimeDate);
    expect(text).toBe('2 years ago');
  });
  test('should return correct elapsed time in seconds using correct locale', () => {
    const now = new Date();
    const pastTimeDate = new Date(now.getTime() - 30 * 1000).toISOString();
    const text = timeElapsed(pastTimeDate, 'fr');
    expect(text).toBe('il y a 30 secondes');
  });
});
