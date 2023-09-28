
import {
    FetchView,
    Breadcrumbs,
    One,
    FieldType,
    TypedField,
    datetime,
    usePreventLeave,
} from "react-declarative";
import { Face } from '@mui/icons-material';

import fetchApi from "../../helpers/fetchApi";
import history from "../../helpers/history";

import ITodoItem from "../../model/ITodoItem";


interface UsersPageProps {
    id: string;
}

const fields: TypedField[] = [
    {
        type: FieldType.Line,
        title: 'User info',
    },
    {
        type: FieldType.Combo,
        name: 'gender',
        title: 'Пол',
        // freeSolo: true,
        description: 'Ваш пол',
        async itemList() {
            // await sleep(1e3);
            return [
                'male-unique-key',
                'female-unique-key',
                'other-unique-key',
            ];
        },
        async tr(current) {
            // await sleep(5e2);
            if (current === 'male-unique-key') {
                return 'Мужчина';
            } else if (current === 'female-unique-key') {
                return 'Женщина';
            } else if (current === 'other-unique-key') {
                return 'Другой';
            } else {
                return "";
            }
        },
        defaultValue: 'their-unique-key',
    },
    {
        type: FieldType.Combo,
        name: 'suffix',
        title: 'Списки',
        // freeSolo: true,
        description: 'Ваш статус',
        async itemList() {
            // await sleep(1e3);
            return [
                'male-unique-key',
                'female-unique-key',
                'other-unique-key',
            ];
        },
        async tr(current) {
            // await sleep(5e2);
            if (current === 'male-unique-key') {
                return 'Мужчина';
            } else if (current === 'female-unique-key') {
                return 'Женщина';
            } else if (current === 'other-unique-key') {
                return 'Другой';
            } else {
                return "";
            }
        },
        defaultValue: 'their-unique-key',
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
        // defaultValue: 'Tripolsky',
        description: 'Your last name',
        name: 'lastName',
        /*sx: {
            background: 'green'
        }*/
    },
    {
        type: FieldType.Condition,
        condition: () => false,
        child: {
            type: FieldType.Typography,
            placeholder: 'Condition not satisfied',
        }
    },
    {
        type: FieldType.Date,
        title: 'Date field',
        description: 'type a date',
        defaultValue: datetime.currentDate(),
        name: 'date',
    },
    {
        type: FieldType.Time,
        title: 'Time field',
        description: 'type a time',
        defaultValue: datetime.currentTime(),
        name: 'time',
    },
    // {
    //     type: FieldType.Group,
    //     phoneColumns: '12',
    //     tabletColumns: '6',
    //     desktopColumns: '4',
    //     fieldRightMargin: '0',
    // },
    {
        type: FieldType.Text,
        title: 'First name',
        // defaultValue: 'Petr',
        description: 'Your first name',
        leadingIcon: Face,
        focus() { console.log("focus :-)"); },
        blur() { console.log("blur :-("); },
        name: 'firstName',
    },
    {
        type: FieldType.Text,
        title: 'Last name',
        // defaultValue: 'Tripolsky',
        description: 'Your last name',
        name: 'lastName',
        /*sx: {
            background: 'green'
        }*/
    },
    {
        type: FieldType.Text,
        title: 'Email',
        defaultValue: 'tripolskypetr@gmail.com',
        description: 'Gmail. Yahoo, Yandex...',
        name: 'email',
    },
    {
        type: FieldType.Text,
        title: 'Snils',
        name: 'snils',
        inputFormatterTemplate: '##-#-###-### ##',
        inputFormatterSymbol: '#',
        inputFormatterAllowed: /^[0-9]/,
    },
    {
        type: FieldType.Group,
        phoneColumns: '12',
        tabletColumns: '6',
        desktopColumns: '4',
        fieldRightMargin: '0',
        fields: [
            {
                type: FieldType.Combo,
                name: 'gender',
                title: 'Gender',
                // freeSolo: true,
                description: 'Your gender',
                async itemList() {
                    // await sleep(1e3);
                    return [
                        'male-unique-key',
                        'female-unique-key',
                        'other-unique-key',
                    ];
                },
                async tr(current) {
                    // await sleep(5e2);
                    if (current === 'male-unique-key') {
                        return 'Male';
                    } else if (current === 'female-unique-key') {
                        return 'Female';
                    } else if (current === 'other-unique-key') {
                        return 'Other';
                    } else {
                        return "";
                    }
                },
                defaultValue: 'their-unique-key',
            },
            {
                type: FieldType.Items,
                name: 'lists',
                title: 'User lists',
                // freeSolo: true,
                description: 'Multiple input',
                async itemList() {
                    // await sleep(1e3);
                    return [
                        'vip-value',
                        'allow-value',
                        'other-value',
                    ];
                },
                async tr(current) {
                    // await sleep(5e2);
                    if (current === 'vip-value') {
                        return 'Vip';
                    } else if (current === 'allow-value') {
                        return 'Allow';
                    } else if (current === 'other-value') {
                        return 'Other';
                    } else {
                        return "";
                    }
                },
                defaultValue: ['vip-value', 'allow-value'],
            },
            {
                type: FieldType.Text,
                inputType: 'number',
                title: 'Age',
                defaultValue: '21',
                description: '25',
                name: 'How old are you?',
            },
        ],
    },
    {
        type: FieldType.Group,
        phoneColumns: '12',
        tabletColumns: '6',
        desktopColumns: '4',
        fieldRightMargin: '0',
        fields: [
            {
                type: FieldType.Text,
                name: 'phone',
                title: 'Phone',
                description: 'Your phone',
                inputType: 'tel',
                defaultValue: '8999',
            },
            {
                type: FieldType.Text,
                name: 'fax',
                title: 'Fax',
                description: 'Your fax',
                inputType: 'tel',
                defaultValue: '8999',
            },
        ],
    },
    {
        type: FieldType.Text,
        name: 'comment',
        title: 'Any comment',
        inputRows: 4,
    },
    /*{
        type: FieldType.Component,
        compute: (props) => <small>{props.comment}</small>
    }*/
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
