import Calendario from "./calendario";

export default async function Agenda(props: any) {
    let obj = {
        "dados": [
            {
                "dia": "",
                "ative": false
            },
            {
                "dia": "",
                "ative": false
            },
            {
                "dia": "",
                "ative": false
            },
            {
                "dia": "1",
                "ative": false
            },
            {
                "dia": "2",
                "ative": true
            },
            {
                "dia": "3",
                "ative": false
            },
            {
                "dia": "4",
                "ative": false
            },
            {
                "dia": "5",
                "ative": false
            },
            {
                "dia": "6",
                "ative": true
            },
            {
                "dia": "7",
                "ative": true
            },
            {
                "dia": "8",
                "ative": true
            },
            {
                "dia": "9",
                "ative": false
            },
            {
                "dia": "10",
                "ative": true
            },
            {
                "dia": "11",
                "ative": false
            },
            {
                "dia": "12",
                "ative": false
            },
            {
                "dia": "13",
                "ative": false
            },
            {
                "dia": "14",
                "ative": false
            },
            {
                "dia": "15",
                "ative": false
            },
            {
                "dia": "16",
                "ative": false
            },
            {
                "dia": "17",
                "ative": false
            },
            {
                "dia": "18",
                "ative": false
            },
            {
                "dia": "19",
                "ative": false
            },
            {
                "dia": "20",
                "ative": false
            },
            {
                "dia": "21",
                "ative": true
            },
            {
                "dia": "22",
                "ative": false
            },
            {
                "dia": "23",
                "ative": false
            },
            {
                "dia": "24",
                "ative": false
            },
            {
                "dia": "25",
                "ative": false
            },
            {
                "dia": "26",
                "ative": false
            },
            {
                "dia": "27",
                "ative": false
            },
            {
                "dia": "28",
                "ative": false
            },
            {
                "dia": "29",
                "ative": false
            },
            {
                "dia": "30",
                "ative": false
            },
            {
                "dia": "31",
                "ative": false
            }
        ],
        "datas": {
            "dias": [
                "6",
                "7",
                "8",
                "10",
                "21"
            ],
            "mes": "5"
        },
        "especialidades": [
            "aa",
            "ccc"
        ]
    }
    return (<>
        teste -
        <div>
            <Calendario dados={obj.dados}/>
        </div>
    </>)
}