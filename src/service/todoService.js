export const setTodos = (list) => {
    localStorage.setItem(
        'todos',
        JSON.stringify(list)
    )
}

export const getAllDatass = (list) => {
    return JSON.parse(localStorage.getItem('allDatas'))
}

// todo : 그 외 localStorage에 set하거나 get하는 비즈니스로직들
