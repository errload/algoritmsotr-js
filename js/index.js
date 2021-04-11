// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

const minWeightInput = document.querySelector('.minweight__input'); // минимальное значение фильтрации
const maxWeightInput = document.querySelector('.maxweight__input'); // максимальное значение фильтрации

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "коричневый", "weight": 22}
]`;

// список цветов фруктов
const priority = [
  'красный',
  'оранжевый',
  'желтый',
  'зеленый',
  'синий',
  'фиолетовый',
  'коричневый',
];

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);
// копируем исходный массив для обнуления фильтрации
let filteredFruits = fruits.slice(0);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  fruitsList.textContent = '';

  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild

    // цвет li
    function liColor() {
      let color;
      if (fruits[i].color === 'фиолетовый') return color = 'fruit_violet';
      if (fruits[i].color === 'зеленый') return color = 'fruit_green';
      if (fruits[i].color === 'красный') return color = 'fruit_red';
      if (fruits[i].color === 'желтый') return color = 'fruit_yellow';
      if (fruits[i].color === 'коричневый') return color = 'fruit_brown';
      if (fruits[i].color === 'оранжевый') return color = 'fruit_orange';
      if (fruits[i].color === 'синий') return color = 'fruit_blue';
    }

    // выводим li
    fruitItem = document.createElement('li');
    fruitItem.className = `fruit__item ${liColor()}`;
    fruitsList.appendChild(fruitItem);

    // добавляем в него div
    fruitInfo = document.createElement('div');
    fruitInfo.className = 'fruit__info';
    fruitItem.appendChild(fruitInfo);

    // и добавляем в него div'ы элемента
    div = document.createElement('div');
    div.textContent = `index: ${i}`;
    fruitInfo.appendChild(div);

    div = document.createElement('div');
    div.textContent = `kind: ${fruits[i].kind}`;
    fruitInfo.appendChild(div);

    div = document.createElement('div');
    div.textContent = `color: ${fruits[i].color}`;
    fruitInfo.appendChild(div);

    div = document.createElement('div');
    div.textContent = `weight (кг): ${fruits[i].weight}`;
    fruitInfo.appendChild(div);
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  fruitsStart = filteredFruits.slice(0); // копируем текущий массив для дальнейшего сравнения
  let randomItem; // сюда записываем рандомное число

  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)

    // находим случайный элемент из длины массива
    randomItem = getRandomInt(0, fruits.length - 1);

    // сохраняем значения объекта рандома в переменные
    let kind = fruits[randomItem].kind;
    let color = fruits[randomItem].color;
    let weight = fruits[randomItem].weight;

    // добавляем в массив новый объект
    result.push(JSON.parse(`{"kind": "${kind}", "color": "${color}", "weight": ${weight}}`));
    // удаляем из старого массива объект с этими значениями
    fruits.splice(randomItem, 1);
  }

  // особый случай, при котором старый массив совпадает с новым
  if (JSON.stringify(fruitsStart) === JSON.stringify(result)) {
    alert('Порядок не изменился');
  }

  fruits = result;
  return fruits;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  const result = [];
  fruits = filteredFruits.slice(0);

  let valueMin = minWeightInput.value;
  let valueMax = maxWeightInput.value;

  // проверка на пустые и некорректные значения
  if (!(valueMin && valueMin >= 0)) {
    alert('Минимальное значение введено некорректно');
    return;
  };

  if (!(valueMax && valueMax >= 0 && valueMax >= valueMin)) {
    alert('Максимальное значение введено некорректно');
    return;
  }; 

  fruits.filter((item, index, fruit) => {
    // TODO: допишите функцию
    let fruitWeight = fruit[index].weight;

    if (fruitWeight >= valueMin && fruitWeight <= valueMax) {
      result.push(JSON.parse(`{
        "kind": "${fruit[index].kind}", 
        "color": "${fruit[index].color}", 
        "weight": ${fruitWeight}}
      `));
    }
  });

  // обнуляем форму
  minWeightInput.value = '';
  maxWeightInput.value = '';

  fruits = result;
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  return a.color > b.color ? true : false;
};

function partition(arr, left, right) {
  let pivot = arr[Math.floor((right + left) / 2)];
  let i = left;
  let j = right;

  while (i <= j) {
    while (arr[i].color < pivot.color) {
      i++;        
    }
    while (arr[j].color > pivot.color) {
      j--;        
    }

    if (i <= j) {
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      
      i++;
      j--;
    }
  }
  return i;
}

const sortAPI = {
  bubbleSort(arr) {
    // TODO: допишите функцию сортировки пузырьком
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j].color > arr[j + 1].color) {
          let temp = arr[j + 1];
          arr[j + 1] = arr[j];
          arr[j] = temp;
        }
      }
    }
  },

  quickSort(arr, left, right) {
    // TODO: допишите функцию быстрой сортировки
    let index;

    if (arr.length > 1) {
      index = partition(arr, left, right);

      if (left < index - 1) {
        sortAPI.quickSort(arr, left, index - 1);
      }
  
      if (index < right) {
        sortAPI.quickSort(arr, index, right);
      }
    }

    return arr;
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  if (sortKind == 'bubbleSort') {
    sortKind = 'quickSort';
    sortKindLabel.textContent = sortKind;
  } else {
    sortKind = 'bubbleSort';
    sortKindLabel.textContent = sortKind;
  }
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  sortTimeLabel.textContent = 'sorting...';
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, 0, fruits.length - 1);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput

  // проверка на пустые и корректные значения
  if (kindInput.value == '') {
    alert('Фрукт должен как-то называться');
    return;
  }

  if (colorInput.value != '') {
    let priorityColor = priority.includes(colorInput.value);
    if (!priorityColor) {
      alert(`Фрукт должен иметь цвет из списка ${priority}`);
      return;
    }
  } else {
    alert('Фрукт должен иметь какой-то цвет');
    return;
  }

  if (weightInput.value != '') {
    let weightVal = parseInt(weightInput.value);
    if (!(weightVal && weightVal > 0)) {
      alert('Вес фрукта введен некорректно');
      return;
    } 
  } else {
    alert('Фрукт должен иметь какой-то вес');
    return;
  }

  // добавляем новый фрукт в конец массива
  let push = (JSON.parse(`{
    "kind": "${kindInput.value}",
    "color": "${colorInput.value}",
    "weight": ${weightInput.value}
  }`));

  fruits.push(push);
  filteredFruits.push(push);

  // очищаем форму
  kindInput.value = '';
  colorInput.value = '';
  weightInput.value = '';

  display();
  // возвращаем новый массив и новый массив для фильтрации
  return fruits, filteredFruits;
});
