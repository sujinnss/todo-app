import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import './TodoTemplate.scss';
import ColorContext, { ColorConsumer, ColorProvider } from '../contexts/color';
import SelectColor from './SelectColor';
import TodoInsert from './TodoInsert';
import TodoList from './TodoList';
import { StarOutlined } from '@ant-design/icons';

const TodoStarItem = () => {
    const value = useContext(ColorContext);
    const [stars, setStars] = useState(
        JSON.parse(localStorage.getItem('stars')) || []
    );

    const currentStars = useRef(stars);

    // 테마 변경은 전체에 먹혀야함
    const [isShowConfig, setIsShowConfig] = useState(false);
    const onClickThem = useCallback(() => {
        setIsShowConfig(!isShowConfig);
    }, [isShowConfig]);

    // currentTodos.current 를 사용해서 star,remove,check 를 해야 오류가 안남.
    // 렌더링 될때매다 특정작업을 수행
    useEffect(() => {
        currentStars.current = stars;
    });

    // 공백이면 경고창 => TodoInsert.js에서 Context를 사용함
    const onInsert = useCallback(
        (text, date) => {
            const todo = {
                id: +new Date(),
                text,
                date,
                checked: false,
                star: true,
            };
            localStorage.setItem(
                'stars',
                JSON.stringify(currentStars.current.concat(todo))
            );
            setStars(stars.concat(todo));
        },
        [stars]
    );

    // 원하는 항목 지우는 함수
    const onRemove = (id) => {
        localStorage.setItem(
            'stars',
            JSON.stringify(
                currentStars.current.filter((todo) => todo.id !== id)
            )
        );
        setStars(currentStars.current.filter((todo) => todo.id !== id));
    };

    //check하는 함수 만들기
    const onToggle = useCallback(
        (id) => {
            localStorage.setItem(
                'stars',
                JSON.stringify(
                    currentStars.current.map((todo) =>
                        todo.id === id
                            ? { ...todo, checked: !todo.checked }
                            : todo
                    )
                )
            );
            setStars(
                currentStars.current.map((todo) =>
                    todo.id === id ? { ...todo, checked: !todo.checked } : todo
                )
            );
        },
        [stars]
    );

    // TODO star가 false가 될경우 localStorage.star에서 삭제
    // 별 클릭시 중요라우터에서 할일 목록으로 이동(즉 localStorage의 stars애서 삭제 된다)
    const onToggleStar = useCallback(
        (id) => {
            setStars(
                currentStars.current.map((todo) =>
                    todo.id === id ? { ...todo, star: !todo.star } : todo
                )
            );
        },
        [stars]
    );

    // star로 sort()하는법
    const onTodoSort = useCallback((a, b) => {
        let starA = a.star ? 0 : 1;
        let starB = b.star ? 0 : 1;
        return starA - starB;
    }, []);

    return (
        <div
            className="TodoTemplate"
            style={{ background: value.state.color }}
            isShowConfig={isShowConfig}
            onClickThem={onClickThem}
            onClick={isShowConfig && onClickThem}
        >
            <SelectColor
                isShowConfig={isShowConfig}
                onClickThem={onClickThem}
            />
            <div className="title">중요한 일</div>
            <div className="contents">
                <TodoInsert onInsert={onInsert} />
                <TodoList
                    todos={stars}
                    onRemove={onRemove}
                    onToggle={onToggle}
                    onToggleStar={onToggleStar}
                    onTodoSort={onTodoSort}
                />
            </div>
        </div>
    );
};

export default TodoStarItem;
