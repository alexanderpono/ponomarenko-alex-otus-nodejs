А.Пономаренко. Домашние задания к курсам OTUS / Administrator Linux. Professional-2024-10 / Домашнее задание 2. Vagrant. Обновление ядра Linux

# Домашнее задание 2. Vagrant. Обновление ядра Linux

Обновить ядро в базовой системе
## Цель:

Получить навыки работы с Git, Vagrant;
Обновлять ядро в ОС Linux.

## Описание/Пошаговая инструкция выполнения домашнего задания:
Для выполнения домашнего задания используйте методичку
1. Выполните действия, описанные в методичке.
2. Полученный в ходе выполнения ДЗ Vagrantfile и отчет залейте в ваш git-репозиторий.
3. Пришлите ссылку на него в чате для проверки ДЗ. Обычно мы проверяем ДЗ в течение 48 часов.


## Критерии оценки:

Статус «Принято» ставится при выполнении следующих условий:

1. Ссылка на репозиторий GitHub в котором находятся файлы указанные в последующих пунктах.
2. Vagrantfile, который будет разворачивать виртуальную машину в которой вы обновляли ядро.
3. Документация по каждому заданию:
    Создайте файл README.md и снабдите его следующей информацией:

    название выполняемого задания;
    текст задания;
    особенности проектирования и реализации решения,
    заметки, если считаете, что имеет смысл их зафиксировать в репозитории.

## Выполнение д/з №2

### Репозиторий доступен по адресу:
https://github.com/alexanderpono/ponomarenko-alex-otus/tree/master/linux-pro-2024-10/hw02-vagrantUpdateKernel

### Пояснительная записка к проекту доступна по адресу:
https://github.com/alexanderpono/ponomarenko-alex-otus/blob/master/linux-pro-2024-10/hw02-vagrantUpdateKernel/README.md

### Запуск программы

Предусловия
* на компьютере установлен Linux
* на компьютере включена виртуализация
* установлен Vagrant


1. Клонировать проект: 
```
git clone https://github.com/alexanderpono/ponomarenko-alex-otus.git
```

2. Зайти в папку д/з №2: 
```
cd ./ponomarenko-alex-otus/linux-pro-2024-10/hw02-vagrantUpdateKernel 
```

3. Запустить настройку виртуальной машины
```
vagrant up
```

При настройке виртуальной машины: 
* распечатывается текущая версия ядра
* скачиваются пакеты ядра 5.19.17-generic Ubuntu с сайта https://kernel.ubuntu.com/mainline/v5.19.17/amd64/
* устанавливаются пакеты ядра
* виртуальная машина отправляется на перезагрузку
* примерно через минуту после начала перезагрузки виртуальная машина должна быть доступа для входа:


```
vagrant ssh
```

Проверить версию ядра рперационной системы:
```
uname -r
```