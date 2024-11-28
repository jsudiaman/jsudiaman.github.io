---
layout: default
title: "Functional Python"
---

A collection of list transformations in [Python](https://www.python.org).

## Map

Applies a function to each element of a list.

```python
numbers = [1, 2, 3, 4, 5]

def double(x):
    return x * 2

doubled_numbers = map(double, numbers)
print(list(doubled_numbers))
# Output: [2, 4, 6, 8, 10]
```

## Filter

Applies a **boolean** function to each element of a list. Only keep elements that return `True`.

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

def is_even(x):
    return x % 2 == 0

even_numbers = filter(is_even, numbers)
print(list(even_numbers))
# Output: [2, 4, 6, 8, 10]
```

## Reduce

Combines a list into a single value, using a function that combines each value with the running total.

```python
from functools import reduce

numbers = [1, 2, 3, 4, 5]

def add(running_total, next_element):
    return running_total + next_element

sum_of_numbers = reduce(add, numbers, 0)
print(sum_of_numbers)
# Output: 15
```

## Find

Similar to `filter`, but returns the first passing value. If no values pass, return `None`.

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

def find(test_function, values):
    filtered = filter(test_function, values)
    return next(filtered, None)

def is_even(x):
    return x % 2 == 0

first_even_number = find(is_even, numbers)
print(first_even_number)
# Output: 2

def is_above_ten(x):
    return x > 10

first_number_above_ten = find(is_above_ten, numbers)
print(first_number_above_ten)
# Output: None
```

## Flatten

Combines a list of lists into a single list.

```python
from itertools import chain

nested = [[1, 2, 3], [4, 5], [6, 7, 8, 9]]
flattened = chain.from_iterable(nested)
print(list(flattened))
# Output: [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## Unique

Removes duplicate values from a list.

```python
numbers = [1, 2, 2, 3, 4, 4, 5]
unique_numbers = dict.fromkeys(numbers)
print(list(unique_numbers))
# Output: [1, 2, 3, 4, 5]
```
