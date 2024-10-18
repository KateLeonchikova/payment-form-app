import { isCardNumberValid, isCvcValid, createDOM } from './index.js';

describe('Проверка номера карты', () => {
  test('Валидация номера карты пропускает корректный номер карты', () => {
    expect(isCardNumberValid('1234 5678 9012 3456')).toBe(true);
  });

  test('Валидация номера карты не пропускает произвольную строку, содержащую любые нецифровые символы', () => {
    expect(isCardNumberValid('1234 5678 9012 3456!@#$')).toBe(false);
    expect(isCardNumberValid('1234 5678 9012 345A')).toBe(false);
    expect(isCardNumberValid('1234 5678 9012 345абв')).toBe(false);
  });

  test('Валидация номера карты не пропускает строку с недостаточным количеством цифр', () => {
    expect(isCardNumberValid('1234 5678 9012')).toBe(false);
  });

  test('Валидация номера карты не пропускает строку со слишком большим количеством цифр', () => {
    expect(isCardNumberValid('1234 5678 9012 3456 7890')).toBe(false);
  });
});

describe('Проверка CVC/CVV', () => {
  test('Валидация CVV/CVC пропускает строку с тремя цифровыми символами', () => {
    expect(isCvcValid('123')).toBe(true);
  });

  test('Валидация CVV/CVC не пропускает строки с 1-2 цифровыми символами', () => {
    expect(isCvcValid('1')).toBe(false);
    expect(isCvcValid('12')).toBe(false);
  });

  test('Валидация CVV/CVC не пропускает строки с 4+ цифровыми символами', () => {
    expect(isCvcValid('1234')).toBe(false);
  });

  test('Валидация CVV/CVC не пропускает строки с тремя нецифровыми символами (латиница, кириллица и знаки препинания)', () => {
    expect(isCvcValid('abc')).toBe(false);
    expect(isCvcValid('абв')).toBe(false);
    expect(isCvcValid('12.')).toBe(false);
  });
});

describe('Проверка DOM-дерева', () => {
  const inputs = [...createDOM().querySelectorAll('.form-control')];
  test('Функция создания DOM-дерева должна вернуть строго четыре поля для ввода', () => {
    expect(inputs.length === 4).toBe(true);
  });

  test('Функция создания DOM-дерева должна вернуть поля для ввода', () => {
    const allInputsAreCorrectType = inputs.every(
      (input) => input instanceof HTMLInputElement
    );
    expect(allInputsAreCorrectType).toBe(true);
  });

  test('Функция создания DOM-дерева должна вернуть DOM-элемент, в котором содержится поле для ввода с плейсхолдером "Номер карты"', () => {
    expect(inputs[0].placeholder).toBe('Номер карты');
  });

  test('Функция создания DOM-дерева должна вернуть DOM-элемент, в котором содержится поле для ввода с плейсхолдером "ММ/ГГ"', () => {
    expect(inputs[1].placeholder).toBe('ММ/ГГ');
  });

  test('Функция создания DOM-дерева должна вернуть DOM-элемент, в котором содержится поле для ввода с плейсхолдером "CVV/CVC"', () => {
    expect(inputs[2].placeholder).toBe('CVV/CVC');
  });

  test('Функция создания DOM-дерева должна вернуть DOM-элемент, в котором содержится поле для ввода с плейсхолдером "Email"', () => {
    expect(inputs[3].placeholder).toBe('Email');
  });
});
