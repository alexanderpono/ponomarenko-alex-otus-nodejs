[< А.Пономаренко. Домашние задания к курсам OTUS / Алгоритмы и структуры данных-2022-10 ](../README.md) / Домашнее задание 6. BubbleSort, InsertionSort, ShellSort

# Домашнее задание 6. BubbleSort, InsertionSort, ShellSort

## Цель:

Создание, тестирование и сравнений алгоритмов сортировки.

## Описание/Пошаговая инструкция выполнения домашнего задания:

```
УРОВЕНЬ JUNIOR.
Выполнить все пункты.
BUB1. +1 байт. Реализовать алгоритм BubbleSort.
INS1. +1 байт. Реализовать алгоритм InsertionSort.
SHS1. +1 байт. Реализовать алгоритм ShellSort.
+2 байта. Занести в сравнительную таблицу время сортировки случайного массива размером 100, 1000 и 10000 для каждого алгоритма.

УРОВЕНЬ MIDDLE.
Выполнить не менее двух пунктов и обязательно последний пункт.
BUB2. +1 байт. Оптимизировать алгоритм BubbleSort.
INS2. +1 байт. Оптимизировать алгоритм InsertionSort, сделать сдвиг элементов вместо обмена.
INS3. +1 байт. Оптимизировать алгоритм InsertionSort, сделать бинарный поиск места вставки.
SHS2, SHS3. +1 байт. Оптимизировать алгоритм ShellSort, выбрать два других варианта выбора шагов.
+1 байт. Занести в сравнительную таблицу время сортировки случайного массива размером 10^2, 10^3, 10^4, 10^5, 10^6 для каждого реализованного алгоритма (дольше двух минут можно не ждать).

УРОВЕНЬ SENIOR.
На выбор:
+5 байт. Сделать визуализацию работы алгоритмов сортировки (заготовка для проектной работы).
+5 байт. Выполнить комплексное тестирование алгоритмов сортировки.
Выполнить прогон всех алгоритмов по всем тестам.
Файл с тестами приложен к заданию (563 мегабайта).
На первой строчке указан размер массива, на второй строчке через пробел перечислены элементы массива.
В файл результата записать числа из отсортированного массива в одну строчку через пробел.
Тестировать алгоритмы следует на массивах таких размеров:
1, 10, 100, 1.000, 10.000, 100.000, 1.000.000, 10.000.000 (этот по желанию)
И с различным характером данных:
а) random - массив из случайных чисел
б) digits - массив из случайных цифр
в) sorted - на 99% отсортированный массив
г) revers - обратно-отсортированный массив
Напишите, какие пункты вы сделали, сколько байт набрали и сколько времени ушло на каждый пункт.
Приложите ссылку на ваш код и на заполненную таблицу.
Укажите, на каком языке вы выполнили ДЗ.

Компетенции:

    Создание алгоритма для сортировки массива
        - Оценка сложности алгоритма
        - Сравнение сложности алгоритмов
        - Анализ алгоритмов по критериям
        - Использование рекурсии



```




## Выполнение д/з №6
### JUNIOR

BUB1. +1 байт. Реализовать алгоритм BubbleSort.
- см. Sort::bubble() в файле https://github.com/alexanderpono/ponomarenko-alex-otus/blob/master/algo-2022-10/hw06-simpleSort/src/Sort.ts  

INS1. +1 байт. Реализовать алгоритм InsertionSort.
- см. Sort::insertion() в файле https://github.com/alexanderpono/ponomarenko-alex-otus/blob/master/algo-2022-10/hw06-simpleSort/src/Sort.ts  


SHS1. +1 байт. Реализовать алгоритм ShellSort.
- см. Sort::shell() в файле https://github.com/alexanderpono/ponomarenko-alex-otus/blob/master/algo-2022-10/hw06-simpleSort/src/Sort.ts  


+2 байта. Занести в сравнительную таблицу время сортировки случайного массива размером 100, 1000 и 10000 для каждого алгоритма.


N | 100 | 1000 | 10000
--- | --- | --- | ---
Метод | msec | msec | msec
bubble | 1 | 6 | 314
insertion | 0 | 3 | 71
shell | 8 | 53 | 570

### MIDDLE

INS2. +1 байт. Оптимизировать алгоритм InsertionSort, сделать сдвиг элементов вместо обмена.
- см. Sort::insertionShift() в файле https://github.com/alexanderpono/ponomarenko-alex-otus/blob/master/algo-2022-10/hw06-simpleSort/src/Sort.ts  

INS3. +1 байт. Оптимизировать алгоритм InsertionSort, сделать бинарный поиск места вставки.
- см. Sort::insertionBinarySearch() в файле https://github.com/alexanderpono/ponomarenko-alex-otus/blob/master/algo-2022-10/hw06-simpleSort/src/Sort.ts 

+1 байт. Занести в сравнительную таблицу время сортировки случайного массива размером 10^2, 10^3, 10^4, 10^5, 10^6 для каждого реализованного алгоритма (дольше двух минут можно не ждать).

N | 100 | 1000 | 10000 | 100_000 | 1_000_000
--- | --- | --- | --- | --- | ---
Метод | msec | msec | msec | msec | msec
bubble | 1 | 6 | 314 | 29787 | > 2min
insertion | 0 | 3 | 71 | 6719 | > 2min
insertionShift | 1 | 3 | 79 | 6696 | > 2min
insertionBinarySearch | 1 | 4 | 54 | 5124 | > 2min
shell | 8 | 53 | 570 | 5667 | 68641

### Байты и затраты времени:
JUNIOR
* BUB1. +1 байт.
* INS1. +1 байт.
* SHS1. +1 байт.
* +2 байта. Занести в сравнительную таблицу время сортировки 100 .. 10000

MIDDLE
* INS2. +1 байт.
* INS3. +1 байт.
* +1 байт. Занести в сравнительную таблицу время сортировки случайного массива размером 10^2 .. 10^6

Итого:
* Всего +8 байт
* Затрачено времени: 3 часа.

### Язык программы: Javascript/Typescript


