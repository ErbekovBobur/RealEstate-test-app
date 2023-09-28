
import {
    FetchView,
    Breadcrumbs,
    One,
    FieldType,
    TypedField,
    datetime,
    usePreventLeave,
} from "react-declarative";

import fetchApi from "../../helpers/fetchApi";
import history from "../../helpers/history";

import ITodoItem from "../../model/ITodoItem";


interface UsersPageProps {
    id: string;
}

const fields: TypedField[] = [
    {
        type: FieldType.Group,
        phoneColumns: '4',
        tabletColumns: '3',
        desktopColumns: '2',
        fieldRightMargin: '0',
        fields: [
            {
                type: FieldType.Div,
                style: {
                    width: "100",
                    height: "100",
                    backgroundColor: 'green',

                },
            }
        ],
    },
    {
        type: FieldType.Group,
        phoneColumns: '8',
        tabletColumns: '9',
        desktopColumns: '10',
        fieldRightMargin: '0',
        fields: [
            {
                type: FieldType.Line,
                title: 'Профиль',
            },
            {
                type: FieldType.Combo,
                name: 'prefix',
                title: 'Пол',
                async itemList(prefix) {
                    return [prefix.prefix];
                },
                async tr(current) {
                    if (current === 'Mr.') {
                        return 'Мужчина';
                    } else if (current === 'Mrs.' || current === 'Miss') {
                        return 'Женщина';
                    } else {
                        return 'Другой';
                    }
                },
                defaultValue: 'their-unique-key',
            },
            {
                type: FieldType.Combo,
                name: 'suffix',
                title: 'Списки',
                description: 'Ваш статус',
                async itemList(suffix) {
                    return [suffix.suffix]
                },
            },
            {
                type: FieldType.Div,
                style: {
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                },
                fields: [
                    {
                        type: FieldType.Text,
                        title: 'Кодовая фраза',
                        focus() { console.log("focus :-)"); },
                        blur() { console.log("blur :-("); },
                        name: 'keyword',
                    },
                    {
                        type: FieldType.Checkbox,
                        fieldBottomMargin: "0",
                        title: "Кодовая фраза",
                    },
                ],
            },
        ],
    },
    {
        type: FieldType.Line,
        title: 'Общая информация',
    },
    {
        type: FieldType.Text,
        title: 'First name',
        // defaultValue: 'Petr',
        description: 'Your first name',
        focus() { console.log("focus :-)"); },
        blur() { console.log("blur :-("); },
        name: 'firstName',
    },
    {
        type: FieldType.Text,
        title: 'Last name',
        description: 'Your last name',
        name: 'lastName',
    },
    {
        type: FieldType.Text,
        inputType: 'number',
        title: 'Возраст',
        description: '43',
        name: 'age',
    },
    {
        type: FieldType.Expansion,
        title: 'Подписка',
        description: 'Подписка на уведомления',
        style: {
            marginBottom: 20,
        },
        fields: [
            {
                type: FieldType.Switch,
                title: 'Подписка',
                name: 'subscribed',
            },
        ],
    },
    {
        type: FieldType.Group,
        phoneColumns: '12',
        tabletColumns: '6',
        desktopColumns: '6',
        fieldRightMargin: '15',
        fields: [
            {
                type: FieldType.Line,
                title: 'Работа',
            },
            {
                type: FieldType.Text,
                name: 'jobTitle',
                title: 'Должность',
            },
            {
                type: FieldType.Text,
                name: 'jobArea',
                title: 'Место работы',
            },
        ],
    },
    {
        type: FieldType.Group,
        phoneColumns: '12',
        tabletColumns: '6',
        desktopColumns: '6',
        fieldRightMargin: '0',
        fields: [
            {
                type: FieldType.Line,
                title: 'Домашний адрес',
            },
            {
                type: FieldType.Text,
                name: 'country',
                title: 'Страна',
            },
            {
                type: FieldType.Text,
                name: 'city',
                title: 'Город',
            },
            {
                type: FieldType.Text,
                name: 'state',
                title: 'Область',
            },
            {
                type: FieldType.Text,
                name: 'address',
                title: 'Адрес',
            },
        ],
    },
];

export const UsersOnePage = ({ id }: UsersPageProps) => {
    const fetchState = () => [
        fetchApi<ITodoItem>(`/users/${id}`)
    ] as const;

    const Content = (props: any) => {
        const { data, oneProps, beginSave } = usePreventLeave({
            history,
            onSave: () => {
                alert(JSON.stringify(data, null, 2));
                return true;
            },
        });

        return (
            <>
                <Breadcrumbs
                    withSave
                    title="Users"
                    subtitle={props.todo.title}
                    onSave={beginSave}
                    onBack={() => history.push("/users")}
                    saveDisabled={!data}
                />
                <One<ITodoItem>
                    handler={() => props.todo}
                    fields={fields}
                    {...oneProps}
                />
            </>
        );
    };

    return (
        <FetchView state={fetchState}>
            {(todo) => <Content todo={todo} />}
        </FetchView>
    );
};

export default UsersOnePage;
