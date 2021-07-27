export const LIQUIDITY_ACTIVITY_COLUMNS = [
    {
        title: 'Activity Type',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: 'User Pubkey',
        dataIndex: 'pubkey',
        key: 'pubkey',
        render: (text: string) => <div>{text.substr(0, text.length / 2)} < br /> {text.substr(text.length / 2 + 1)} </div>
    },
    {
        title: 'Match',
        dataIndex: 'match',
        key: 'match',
        render: (html: any) => <div style={{ textAlign: "right" }} dangerouslySetInnerHTML={{ __html: html }} />
    },
    {
        title: 'Odds',
        dataIndex: 'odds',
        key: 'odds',
        render: (html: any) => <div style={{ textAlign: "right" }} dangerouslySetInnerHTML={{ __html: html }
        } />
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        render: (html: any) => <div style={{ textAlign: "right" }} dangerouslySetInnerHTML={{ __html: html }
        } />
    }
]